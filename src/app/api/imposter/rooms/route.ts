import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import {
  DEFAULT_IMPOSTER_PACK_ID,
  type ImposterPackId,
  normalizeImposterPackId,
  pickPairFromPack,
} from "@/data/imposter-packs";
import {
  createEmptyRoom,
  getImposterRoomStore,
  type Player,
  type Role,
  type Room,
} from "@/lib/imposterRoomStore";
import { RateLimiter, getClientIdentifier } from "@/lib/rateLimit";
import { notifyRoomUpdated } from "@/lib/realtime";

export const dynamic = "force-dynamic";

// Rate limiter: 30 requests per minute per IP
const rateLimiter = new RateLimiter({
  maxRequests: 30,
  windowMs: 60 * 1000, // 1 minute
});

interface ClientRoomState {
  roomId: string;
  playerId: string;
  name: string;
  role: Role | null;
  word: string | null;
  isHost: boolean;
  round: number;
  packId: ImposterPackId;
  imposters: number;
  playersCount: number;
}

const store = getImposterRoomStore();

// Maximum retries for room ID collision
const MAX_ROOM_ID_RETRIES = 5;

async function createUniqueRoom(
  locale: string,
  packId: ImposterPackId,
  imposters: number
): Promise<Room> {
  for (let attempt = 0; attempt < MAX_ROOM_ID_RETRIES; attempt++) {
    const room = createEmptyRoom(locale as any, packId, imposters);

    // Check if room ID already exists
    const existing = await store.getRoom(room.id);
    if (!existing) {
      return room;
    }

    // Collision detected, log and retry
    console.warn(`[ImposterAPI] Room ID collision detected: ${room.id}, retrying...`);
  }

  throw new Error("Failed to generate unique room ID after maximum retries");
}

function assignRolesForRound(room: Room) {
  const players = room.players;
  if (!players.length) return;

  const totalPlayers = players.length;
  const desiredImposters = Math.max(
    1,
    Math.min(room.imposters, totalPlayers - 1 || 1)
  );

  const shuffled = [...players].sort(() => Math.random() - 0.5);

  shuffled.forEach((player, index) => {
    if (index < desiredImposters) {
      player.role = "imposter";
      player.word = room.imposterWord;
    } else {
      player.role = "crew";
      player.word = room.mainWord;
    }
  });

  room.updatedAt = Date.now();
}

function serializePlayer(room: Room, playerId: string) {
  const player = room.players.find((entry) => entry.id === playerId);
  if (!player) return null;
  return {
    roomId: room.id,
    playerId: player.id,
    name: player.name,
    role: player.role ?? null,
    word: player.word ?? null,
    isHost: room.hostId === player.id,
    round: room.round,
    packId: room.packId,
    imposters: room.imposters,
    playersCount: room.players.length,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientId = getClientIdentifier(request.headers);
    const rateLimit = rateLimiter.check(clientId);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.reset.toString(),
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const action = typeof body?.action === "string" ? body.action : "";
    const rawLocale =
      typeof body?.locale === "string" ? body.locale : DEFAULT_LOCALE;
    const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (action === "create") {
      if (!name) {
        return NextResponse.json(
          { error: "Name is required" },
          { status: 400 }
        );
      }
      const packId = normalizeImposterPackId(body?.packId);
      let imposters = Number.parseInt(body?.imposters as string, 10);
      if (Number.isNaN(imposters)) imposters = 1;
      imposters = Math.min(Math.max(imposters, 1), 3);

      // Create room with collision detection
      const room = await createUniqueRoom(locale, packId, imposters);

      const playerId = crypto.randomUUID();
      const host: Player = { id: playerId, name };
      room.players.push(host);
      room.hostId = playerId;
      room.updatedAt = Date.now();
      await store.saveRoom(room);
      await notifyRoomUpdated(room);
      const payload = serializePlayer(room, playerId);
      return NextResponse.json({ room: payload });
    }

    if (action === "join") {
      const roomId = typeof body?.roomId === "string" ? body.roomId.trim() : "";
      if (!roomId || !name) {
        return NextResponse.json(
          { error: "Room ID and name are required" },
          { status: 400 }
        );
      }
      const room = await store.getRoom(roomId);
      if (!room) {
        return NextResponse.json(
          { error: "Room not found or has expired" },
          { status: 404 }
        );
      }
      const playerId = crypto.randomUUID();
      const player: Player = { id: playerId, name };
      room.players.push(player);
      room.updatedAt = Date.now();
      await store.saveRoom(room);
      await notifyRoomUpdated(room);
      const payload = serializePlayer(room, playerId);
      return NextResponse.json({ room: payload });
    }

    if (action === "nextRound") {
      const roomId = typeof body?.roomId === "string" ? body.roomId.trim() : "";
      const playerId =
        typeof body?.playerId === "string" ? body.playerId.trim() : "";
      if (!roomId || !playerId) {
        return NextResponse.json(
          { error: "Room ID and player ID are required" },
          { status: 400 }
        );
      }
      const room = await store.getRoom(roomId);
      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }
      if (room.hostId !== playerId) {
        return NextResponse.json(
          { error: "Only the host can start the next round" },
          { status: 403 }
        );
      }
      const pair = pickPairFromPack(room.packId);
      room.mainWord = pair.main;
      room.imposterWord = pair.imposter;
      room.round += 1;
      assignRolesForRound(room);
      await store.saveRoom(room);
      const payload = serializePlayer(room, playerId);
      if (!payload) {
        return NextResponse.json(
          { error: "Player not found" },
          { status: 404 }
        );
      }
      await notifyRoomUpdated(room);
      return NextResponse.json({ room: payload });
    }

    if (action === "sync") {
      const roomId = typeof body?.roomId === "string" ? body.roomId.trim() : "";
      const playerId =
        typeof body?.playerId === "string" ? body.playerId.trim() : "";
      if (!roomId || !playerId) {
        return NextResponse.json(
          { error: "Room ID and player ID are required" },
          { status: 400 }
        );
      }
      const room = await store.getRoom(roomId);
      if (!room) {
        return NextResponse.json({ error: "Room not found" }, { status: 404 });
      }
      const payload = serializePlayer(room, playerId);
      if (!payload) {
        return NextResponse.json(
          { error: "Player not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ room: payload });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (err) {
    console.error("Imposter room API error:", err);
    return NextResponse.json(
      { error: "Unable to update room" },
      { status: 500 }
    );
  }
}
