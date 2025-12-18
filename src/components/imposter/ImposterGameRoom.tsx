"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { getDictionary } from "@/i18n/dictionary";
import { IMPOSTER_PACK_IDS, IMPOSTER_PACKS, type ImposterPackId } from "@/data/imposter-packs";
import QRCodeCanvas from "@/components/QRCodeCanvas";

type Role = "imposter" | "crew";

interface RoomState {
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

type Step = "mode" | "create" | "join" | "room";

export default function ImposterGameRoom() {
  const { locale } = useLocale();
  const dictionary = getDictionary(locale);
  const t = dictionary.pages.imposterGame;

  const [step, setStep] = useState<Step>("mode");
  const [room, setRoom] = useState<RoomState | null>(null);
  const [hostName, setHostName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [selectedPack, setSelectedPack] = useState<ImposterPackId>("everyday");
  const [imposters, setImposters] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomFromUrl, setRoomFromUrl] = useState(false);

  const packOptions = useMemo(
    () => IMPOSTER_PACK_IDS.map((id) => ({ id, label: IMPOSTER_PACKS[id].label[locale] || IMPOSTER_PACKS[id].label.en })),
    [locale],
  );

  const inviteUrl = useMemo(() => {
    if (!room?.roomId || typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("room", room.roomId);
    return url.toString();
  }, [room?.roomId]);

  const callApi = useCallback(
    async (body: Record<string, unknown>, options?: { silent?: boolean }) => {
      if (!options?.silent) {
        setLoading(true);
        setError(null);
      }
      try {
        const response = await fetch("/api/imposter/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale, ...body }),
        });
        if (!response.ok) {
          const data = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error || "Request failed");
        }
        const data = (await response.json()) as { room?: RoomState };
        if (data.room) {
          setRoom(data.room);
          setStep("room");
        }
      } catch (err) {
        if (!options?.silent) {
          setError((err as Error).message || "Something went wrong");
        }
      } finally {
        if (!options?.silent) {
          setLoading(false);
        }
      }
    },
    [locale],
  );

  const handleCreate = useCallback(() => {
    if (!hostName.trim()) {
      setError(t.errorNameRequired);
      return;
    }
    void callApi({
      action: "create",
      name: hostName.trim(),
      packId: selectedPack,
      imposters: String(imposters),
    });
  }, [callApi, hostName, selectedPack, imposters, t.errorNameRequired]);

  const handleJoin = useCallback(() => {
    if (!joinName.trim() || !joinRoomId.trim()) {
      setError(t.errorBothRequired);
      return;
    }
    void callApi({
      action: "join",
      roomId: joinRoomId.trim().toUpperCase(),
      name: joinName.trim(),
    });
  }, [callApi, joinName, joinRoomId, t.errorBothRequired]);

  const handleNextRound = useCallback(() => {
    if (!room) return;
    void callApi(
      {
        action: "nextRound",
        roomId: room.roomId,
        playerId: room.playerId,
      },
      { silent: false },
    );
  }, [callApi, room]);

  // Adaptive polling: adjust interval based on tab visibility
  useEffect(() => {
    if (!room) return;

    const getPollInterval = () => {
      // Use longer interval when tab is hidden to save battery
      return document.hidden ? 15000 : 5000;
    };

    let timeoutId: NodeJS.Timeout;

    const schedulePoll = () => {
      const interval = getPollInterval();
      timeoutId = setTimeout(() => {
        void callApi(
          {
            action: "sync",
            roomId: room.roomId,
            playerId: room.playerId,
          },
          { silent: true },
        ).finally(() => {
          // Schedule next poll after current one completes
          schedulePoll();
        });
      }, interval);
    };

    // Start polling
    schedulePoll();

    // Re-schedule on visibility change for immediate adjustment
    const handleVisibilityChange = () => {
      clearTimeout(timeoutId);
      schedulePoll();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [callApi, room]);

  const handleShare = useCallback(async () => {
    if (!inviteUrl) return;
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Imposter game room",
            text: "Join our imposter game room.",
            url: inviteUrl,
          });
          return;
        } catch (error) {
          if ((error as Error).name === "AbortError") {
            return;
          }
        }
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inviteUrl);
        setError(t.inviteCopied);
        return;
      }
      setError(t.shareNotSupported);
    } catch {
      setError(t.shareFailed);
    }
  }, [inviteUrl, t.inviteCopied, t.shareNotSupported, t.shareFailed]);

  // QR code is now generated locally using QRCodeCanvas component

  const resetState = () => {
    setRoom(null);
    setHostName("");
    setJoinName("");
    setJoinRoomId("");
    setImposters(1);
    setSelectedPack("everyday");
    setStep("mode");
    setError(null);
    setRoomFromUrl(false);
  };

  // If the URL contains ?room=CODE, jump straight to the join step with the code prefilled.
  useEffect(() => {
    if (typeof window === "undefined" || room) return;
    try {
      const url = new URL(window.location.href);
      const roomParam = url.searchParams.get("room");
      if (roomParam && roomParam.trim()) {
        setJoinRoomId(roomParam.trim().toUpperCase());
        setRoomFromUrl(true);
        setStep("join");
      }
    } catch {
      // ignore malformed URLs
    }
  }, [room]);

  return (
    <section className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center sm:text-left">
        {t.roomTitle}
      </h2>
      <p className="text-gray-700 mb-4 text-sm text-center sm:text-left">
        {t.roomDescription}
      </p>

      {step === "mode" && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep("create")}
            className="flex-1 rounded-lg border border-blue-500 bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            {t.hostButton}
          </button>
          <button
            type="button"
            onClick={() => setStep("join")}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            {t.joinButton}
          </button>
        </div>
      )}

      {step === "create" && (
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={() => setStep("mode")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {t.back}
          </button>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                {t.yourName}
              </label>
              <input
                type="text"
                value={hostName}
                onChange={(event) => setHostName(event.target.value)}
                placeholder={t.hostNamePlaceholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                {t.wordPack}
              </label>
              <select
                value={selectedPack}
                onChange={(event) => setSelectedPack(event.target.value as ImposterPackId)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {packOptions.map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                {t.numberOfImposters}
              </label>
              <select
                value={imposters}
                onChange={(event) => setImposters(Number.parseInt(event.target.value, 10) || 1)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={1}>{t.impostersOption1}</option>
                <option value={2}>{t.impostersOption2}</option>
                <option value={3}>{t.impostersOption3}</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? t.creating : t.createRoom}
            </button>
          </div>
        </div>
      )}

      {step === "join" && (
        <div className="mt-4 space-y-4">
          <button
            type="button"
            onClick={() => setStep("mode")}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {t.back}
          </button>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                {t.roomCode}
              </label>
              {roomFromUrl ? (
                <div className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm font-mono tracking-widest text-gray-800">
                  {joinRoomId}
                </div>
              ) : (
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(event) => setJoinRoomId(event.target.value.toUpperCase())}
                  placeholder={t.roomCodePlaceholder}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm uppercase tracking-widest focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                {t.yourName}
              </label>
              <input
                type="text"
                value={joinName}
                onChange={(event) => setJoinName(event.target.value)}
                placeholder={t.playerNamePlaceholder}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleJoin}
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
            >
              {loading ? t.joining : t.joinRoom}
            </button>
          </div>
        </div>
      )}

      {step === "room" && room && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{t.roomCode}</p>
              <p className="text-2xl font-mono font-bold text-gray-900">{room.roomId}</p>
              <p className="mt-1 text-xs text-gray-600">
                {t.shareCodeHint}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{t.youAre}</p>
              <p className="text-sm font-semibold text-gray-900">
                {room.name} · {room.role === "imposter" ? t.imposter : t.crew}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                {t.round} {room.round} · {t.pack}: {IMPOSTER_PACKS[room.packId]?.label[locale] ?? IMPOSTER_PACKS[room.packId]?.label.en}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-1">
                {t.yourSecretWord}
              </p>
              <p className="text-2xl font-bold text-indigo-900 break-words">{room.word}</p>
              <p className="mt-2 text-xs text-indigo-800">
                {t.secretWordHint}
              </p>
            </div>

            {inviteUrl && (
              <div className="w-full sm:w-64 rounded-lg border border-gray-200 bg-white px-4 py-3 flex flex-col items-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                  {t.inviteLinkQR}
                </p>
                <QRCodeCanvas
                  value={inviteUrl}
                  size={128}
                  className="mb-2 rounded bg-gray-50"
                />
                <p className="mb-2 break-all text-[11px] text-gray-600">{inviteUrl}</p>
                <button
                  type="button"
                  onClick={handleShare}
                  className="mt-1 inline-flex items-center rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black"
                >
                  {t.shareInvite}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {room.isHost && (
              <button
                type="button"
                onClick={handleNextRound}
                disabled={loading}
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? t.starting : t.newRound}
              </button>
            )}
            <button
              type="button"
              onClick={resetState}
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {t.leaveRoom}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}
