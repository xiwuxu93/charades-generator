import type { Locale } from "@/i18n/config";
import type { ImposterPackId } from "@/data/imposter-packs";

export type Role = "imposter" | "crew";

export interface Player {
  id: string;
  name: string;
  role?: Role;
  word?: string;
}

export interface Room {
  id: string;
  locale: Locale;
  players: Player[];
  mainWord: string;
  imposterWord: string;
  updatedAt: number;
  packId: ImposterPackId;
  imposters: number;
  round: number;
  hostId: string;
}

export interface ImposterRoomStore {
  getRoom(id: string): Promise<Room | null>;
  saveRoom(room: Room): Promise<void>;
  deleteRoom(id: string): Promise<void>;
}

// Room TTL: 24 hours of inactivity
const ROOM_TTL_MS = 24 * 60 * 60 * 1000;
// Cleanup interval: every 1 hour
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000;

function isRoomExpired(room: Room): boolean {
  return Date.now() - room.updatedAt > ROOM_TTL_MS;
}

function normalizeRoomId(id: string): string {
  return id.trim().toUpperCase();
}

function cloneRoom(room: Room): Room {
  return {
    ...room,
    players: room.players.map((player) => ({ ...player })),
  };
}

function createInMemoryImposterRoomStore(): ImposterRoomStore {
  const rooms = new Map<string, Room>();
  let cleanupInterval: NodeJS.Timeout | null = null;

  // Start periodic cleanup
  const startCleanup = () => {
    if (cleanupInterval) return;

    cleanupInterval = setInterval(() => {
      const expiredRooms: string[] = [];

      for (const [id, room] of rooms.entries()) {
        if (isRoomExpired(room)) {
          expiredRooms.push(id);
        }
      }

      expiredRooms.forEach(id => rooms.delete(id));

      if (expiredRooms.length > 0) {
        console.log(`[ImposterRoomStore] Cleaned up ${expiredRooms.length} expired rooms`);
      }
    }, CLEANUP_INTERVAL_MS);

    // Ensure cleanup doesn't prevent process exit
    if (cleanupInterval.unref) {
      cleanupInterval.unref();
    }
  };

  // Start cleanup on first use
  startCleanup();

  return {
    async getRoom(id: string): Promise<Room | null> {
      const room = rooms.get(normalizeRoomId(id));
      if (!room) return null;

      // Check if room has expired
      if (isRoomExpired(room)) {
        rooms.delete(normalizeRoomId(id));
        return null;
      }

      return cloneRoom(room);
    },
    async saveRoom(room: Room): Promise<void> {
      const normalizedId = normalizeRoomId(room.id);
      rooms.set(normalizedId, { ...cloneRoom(room), id: normalizedId });
    },
    async deleteRoom(id: string): Promise<void> {
      rooms.delete(normalizeRoomId(id));
    },
  };
}

function createCloudflareImposterRoomStore(baseUrl: string, apiKey: string): ImposterRoomStore {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

  async function fetchJson(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    return { response, data: await response.json().catch(() => null) };
  }

  return {
    async getRoom(id: string): Promise<Room | null> {
      const roomId = normalizeRoomId(id);
      const url = `${normalizedBaseUrl}/rooms/${encodeURIComponent(roomId)}`;
      const { response, data } = await fetchJson(url, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Cloudflare KV getRoom failed with status ${response.status}`);
      }

      if (!data || typeof data !== "object") {
        return null;
      }

      const room = data as Room;
      if (!room.id || !Array.isArray(room.players)) {
        return null;
      }

      return {
        ...room,
        id: normalizeRoomId(room.id),
        players: room.players.map((player) => ({ ...player })),
      };
    },

    async saveRoom(room: Room): Promise<void> {
      const normalizedId = normalizeRoomId(room.id);
      const payload: Room = {
        ...cloneRoom(room),
        id: normalizedId,
      };

      const url = `${normalizedBaseUrl}/rooms/${encodeURIComponent(normalizedId)}`;
      const { response } = await fetchJson(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Cloudflare KV saveRoom failed with status ${response.status}`);
      }
    },

    async deleteRoom(id: string): Promise<void> {
      const roomId = normalizeRoomId(id);
      const url = `${normalizedBaseUrl}/rooms/${encodeURIComponent(roomId)}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (!response.ok && response.status !== 404) {
        throw new Error(`Cloudflare KV deleteRoom failed with status ${response.status}`);
      }
    },
  };
}

let store: ImposterRoomStore | null = null;

export function getImposterRoomStore(): ImposterRoomStore {
  if (!store) {
    const baseUrl = process.env.CF_ROOMS_API_URL;
    const apiKey = process.env.CF_ROOMS_API_KEY;
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction && baseUrl && apiKey) {
      store = createCloudflareImposterRoomStore(baseUrl, apiKey);
    } else {
      store = createInMemoryImposterRoomStore();
    }
  }

  return store;
}

function generateSecureRoomId(): string {
  // Use crypto.randomUUID() and take first 6 chars after removing hyphens
  // This provides ~2.8 trillion combinations (16^6) vs 2.2 billion from base36
  const uuid = crypto.randomUUID().replace(/-/g, "");
  return uuid.slice(0, 6).toUpperCase();
}

export function createEmptyRoom(locale: Locale, packId: ImposterPackId, imposters: number): Room {
  const id = generateSecureRoomId();

  return {
    id,
    locale,
    players: [],
    mainWord: "",
    imposterWord: "",
    updatedAt: Date.now(),
    packId,
    imposters,
    round: 0,
    hostId: "",
  };
}
