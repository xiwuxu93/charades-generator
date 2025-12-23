import Pusher from "pusher";

import type { Room } from "./imposterRoomStore";

const appId = process.env.PUSHER_APP_ID;
const key = process.env.PUSHER_KEY;
const secret = process.env.PUSHER_SECRET;
const cluster = process.env.PUSHER_CLUSTER;

let pusherServer: Pusher | null = null;

if (appId && key && secret && cluster) {
  pusherServer = new Pusher({
    appId,
    key,
    secret,
    cluster,
    useTLS: true,
  });
}

export function getPusherServer() {
  return pusherServer;
}

export function getRoomChannel(roomId: string) {
  return `imposter-room-${roomId}`;
}

export async function notifyRoomUpdated(room: Room) {
  const pusher = getPusherServer();
  if (!pusher) return;

  try {
    await pusher.trigger(getRoomChannel(room.id), "room-updated", {
      roomId: room.id,
      updatedAt: room.updatedAt,
      round: room.round,
      playersCount: room.players.length,
    });
  } catch (error) {
    console.error("[ImposterRealtime] Failed to trigger room-updated event", error);
  }
}

