"use client";

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const win = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[][];
  };

  const gtag =
    typeof win.gtag === "function"
      ? win.gtag
      : (...args: unknown[]) => {
          win.dataLayer = win.dataLayer || [];
          win.dataLayer.push(args);
        };

  gtag("event", eventName, params ?? {});
}

