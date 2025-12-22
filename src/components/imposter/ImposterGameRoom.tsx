"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { getDictionary } from "@/i18n/dictionary";
import { IMPOSTER_PACK_IDS, IMPOSTER_PACKS, type ImposterPackId } from "@/data/imposter-packs";
import QRCodeCanvas from "@/components/QRCodeCanvas";
import { buildLocalePath } from "@/utils/localePaths";

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
  const router = useRouter();
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

  const guideHref = useMemo(() => buildLocalePath(locale, "/imposter-game/"), [locale]);

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

  // Hide global navigation bar and footer while on the play page
  useEffect(() => {
    if (typeof document === "undefined") return;
    const nav = document.querySelector<HTMLElement>(".critical-nav");
    const footer = document.querySelector<HTMLElement>("footer");
    const previousNavDisplay = nav?.style.display;
    const previousFooterDisplay = footer?.style.display;

    if (nav) nav.style.display = "none";
    if (footer) footer.style.display = "none";

    return () => {
      if (nav) nav.style.display = previousNavDisplay ?? "";
      if (footer) footer.style.display = previousFooterDisplay ?? "";
    };
  }, []);

  const content = (
    <>
      <h2 className="text-2xl font-semibold text-slate-100 mb-2 text-center sm:text-left">
        {t.roomTitle}
      </h2>
      <p className="text-slate-400 text-sm text-center sm:text-left">
        {t.roomDescription}
      </p>

      <button
        type="button"
        onClick={() => {
          if (step === "mode") {
            router.push(guideHref);
          } else {
            setStep("mode");
          }
        }}
        className="mt-3 mb-4 inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
      >
        <span className="mr-1.5 text-base leading-none">←</span>
        {t.back}
      </button>

      {step === "mode" && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep("create")}
            className="flex-1 rounded-lg border border-indigo-500 bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/20 hover:bg-indigo-500 transition-all"
          >
            {t.hostButton}
          </button>
          <button
            type="button"
            onClick={() => setStep("join")}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all"
          >
            {t.joinButton}
          </button>
        </div>
      )}

      {step === "create" && (
        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                {t.yourName}
              </label>
              <input
                type="text"
                value={hostName}
                onChange={(event) => setHostName(event.target.value)}
                placeholder={t.hostNamePlaceholder}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                {t.wordPack}
              </label>
              <select
                value={selectedPack}
                onChange={(event) => setSelectedPack(event.target.value as ImposterPackId)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              >
                {packOptions.map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                {t.numberOfImposters}
              </label>
              <select
                value={imposters}
                onChange={(event) => setImposters(Number.parseInt(event.target.value, 10) || 1)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
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
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 hover:bg-indigo-500 disabled:opacity-60 disabled:hover:bg-indigo-600 transition-all"
            >
              {loading ? t.creating : t.createRoom}
            </button>
          </div>
        </div>
      )}

      {step === "join" && (
        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                {t.roomCode}
              </label>
              {roomFromUrl ? (
                <div className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-sm font-mono tracking-widest text-slate-200">
                  {joinRoomId}
                </div>
              ) : (
                <input
                  type="text"
                  value={joinRoomId}
                  onChange={(event) => setJoinRoomId(event.target.value.toUpperCase())}
                  placeholder={t.roomCodePlaceholder}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm uppercase tracking-widest text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                {t.yourName}
              </label>
              <input
                type="text"
                value={joinName}
                onChange={(event) => setJoinName(event.target.value)}
                placeholder={t.playerNamePlaceholder}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={handleJoin}
              disabled={loading}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 hover:bg-indigo-500 disabled:opacity-60 disabled:hover:bg-indigo-600 transition-all"
            >
              {loading ? t.joining : t.joinRoom}
            </button>
          </div>
        </div>
      )}

      {step === "room" && room && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.roomCode}</p>
              <p className="text-3xl font-mono font-bold text-slate-100 tracking-wider">{room.roomId}</p>
              <p className="mt-1 text-xs text-slate-400">
                {t.shareCodeHint}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.youAre}</p>
              <p className="text-lg font-semibold text-slate-100">
                {room.name} · <span className={room.role === "imposter" ? "text-red-400" : "text-cyan-400"}>{room.role === "imposter" ? t.imposter : t.crew}</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {t.round} {room.round} · {t.pack}: {IMPOSTER_PACKS[room.packId]?.label[locale] ?? IMPOSTER_PACKS[room.packId]?.label.en}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 rounded-xl border border-indigo-500/30 bg-indigo-900/20 px-4 py-4 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-300 mb-1">
                {t.yourSecretWord}
              </p>
              <p className="text-3xl font-bold text-indigo-100 break-words">{room.word}</p>
              <p className="mt-2 text-xs text-indigo-300/80">
                {t.secretWordHint}
              </p>
            </div>

            {inviteUrl && (
              <div className="w-full sm:w-64 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-4 flex flex-col items-center backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                  {t.inviteLinkQR}
                </p>
                <div className="p-1.5 bg-white rounded-lg mb-3">
                  <QRCodeCanvas
                    value={inviteUrl}
                    size={120}
                  />
                </div>
                <p className="mb-3 break-all text-[10px] text-slate-500 text-center font-mono">{inviteUrl}</p>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-600 transition-colors"
                >
                  {t.shareInvite}
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {room.isHost && (
              <button
                type="button"
                onClick={handleNextRound}
                disabled={loading}
                className="w-full sm:flex-1 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-400 disabled:opacity-60 disabled:hover:bg-emerald-500 transition-all"
              >
                {loading ? t.starting : t.newRound}
              </button>
            )}
            <button
              type="button"
              onClick={resetState}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-100 hover:border-red-500/60 transition-all"
            >
              {t.leaveRoom}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-900/50">
          {error}
        </p>
      )}
    </>
  );

  return (
    <section className="fixed inset-0 z-[999] bg-slate-950 px-4 py-4 sm:px-6 sm:py-6 overflow-y-auto">
      <div className="min-h-full flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-6 shadow-2xl shadow-black/40 backdrop-blur-md">
          {content}
        </div>
      </div>
    </section>
  );
}
