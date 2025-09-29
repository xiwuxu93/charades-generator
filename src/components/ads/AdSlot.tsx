"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ADSENSE_CLIENT, isAdUnitConfigured } from "@/config/ads";

export interface AdSlotProps {
  slot?: string;
  className?: string;
  style?: CSSProperties;
  format?: string;
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
}

export default function AdSlot({
  slot,
  className,
  style,
  format,
  layout,
  layoutKey,
  responsive = true,
}: AdSlotProps) {
  const slotRef = useRef<HTMLModElement | null>(null);
  const loadAttempts = useRef(0);
  const [consentEnabled, setConsentEnabled] = useState<boolean>(
    typeof window !== "undefined" ? Boolean((window as Window & { __cgScriptsEnabled?: boolean }).__cgScriptsEnabled) : false,
  );

  useEffect(() => {
    loadAttempts.current = 0;
    if (slotRef.current) {
      slotRef.current.removeAttribute("data-cg-requested");
    }
  }, [slot]);

  useEffect(() => {
    if (!slot) return;

    const hasCompletedRender = () => slotRef.current?.getAttribute("data-adsbygoogle-status") === "done";
    const hasPendingRequest = () => slotRef.current?.getAttribute("data-cg-requested") === "true";

    const attemptLoad = () => {
      if (!slotRef.current) return;
      if (hasCompletedRender()) return;

      const ads = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
      if (!Array.isArray(ads)) return;

      try {
        if (!hasPendingRequest()) {
          slotRef.current.setAttribute("data-cg-requested", "true");
        }
        ads.push({});
        loadAttempts.current += 1;
      } catch {
        // Ignore errors and retry later
      }
    };

    const ensureBootstrap = () => {
      const target = window as unknown as { adsbygoogle?: unknown[] };
      if (!Array.isArray(target.adsbygoogle)) {
        target.adsbygoogle = [];
      }
    };

    ensureBootstrap();
    attemptLoad();

    const handleScriptsEnabled = () => {
      ensureBootstrap();
      attemptLoad();
      setConsentEnabled(true);
    };

    document.addEventListener("cg-scripts-enabled", handleScriptsEnabled);

    return () => {
      document.removeEventListener("cg-scripts-enabled", handleScriptsEnabled);
    };
  }, [slot]);

  useEffect(() => {
    if (!consentEnabled) return;
    if (!slotRef.current) return;

    const ads = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
    if (!Array.isArray(ads)) {
      return;
    }

    const hasCompletedRender = () => slotRef.current?.getAttribute("data-adsbygoogle-status") === "done";
    const initialAttempts = loadAttempts.current;
    const interval = window.setInterval(() => {
      if (!slotRef.current) {
        window.clearInterval(interval);
        return;
      }

       if (hasCompletedRender()) {
         window.clearInterval(interval);
         return;
       }

      ads.push({});
      loadAttempts.current += 1;

      if (loadAttempts.current > initialAttempts + 3) {
        window.clearInterval(interval);
      }
    }, 1500);

    return () => {
      window.clearInterval(interval);
    };
  }, [consentEnabled]);

  if (!slot || !isAdUnitConfigured(slot)) {
    return null;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const resolvedStyle: CSSProperties = style ?? { display: "block", minHeight: 90 };

  return (
    <ins
      className={`adsbygoogle${className ? ` ${className}` : ""}`}
      ref={slotRef}
      style={resolvedStyle}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-adtest={isProduction ? undefined : "on"}
      data-full-width-responsive={responsive ? "true" : undefined}
    />
  );
}
