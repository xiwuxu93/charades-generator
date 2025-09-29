"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { ADSENSE_CLIENT } from "@/config/ads";

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
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!slot) return;

    const attemptLoad = () => {
      if (hasRequested.current) return;
      if (!slotRef.current) return;
      const ads = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
      if (!Array.isArray(ads)) return;
      try {
        ads.push({});
        hasRequested.current = true;
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

    if (hasRequested.current) {
      return;
    }

    const handleScriptsEnabled = () => {
      ensureBootstrap();
      attemptLoad();
    };

    document.addEventListener("cg-scripts-enabled", handleScriptsEnabled);

    const interval = window.setInterval(() => {
      ensureBootstrap();
      attemptLoad();
      if (hasRequested.current) {
        window.clearInterval(interval);
      }
    }, 1500);

    return () => {
      document.removeEventListener("cg-scripts-enabled", handleScriptsEnabled);
      window.clearInterval(interval);
    };
  }, [slot]);

  if (!slot) {
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
