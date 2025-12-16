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

export const dynamic = "force-dynamic";

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
      const room = createEmptyRoom(locale, packId, imposters);
      const playerId = Math.random().toString(36).slice(2, 10);
      const host: Player = { id: playerId, name };
      room.players.push(host);
      room.hostId = playerId;
      room.updatedAt = Date.now();
      await store.saveRoom(room);
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
      const playerId = Math.random().toString(36).slice(2, 10);
      const player: Player = { id: playerId, name };
      room.players.push(player);
      room.updatedAt = Date.now();
      await store.saveRoom(room);
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
  } catch (error) {
    console.error("Imposter room API error:", error);
    return NextResponse.json(
      { error: "Unable to update room" },
      { status: 500 }
    );
  }
}
