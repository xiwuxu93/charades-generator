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
  const [consentEnabled, setConsentEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setConsentEnabled(Boolean((window as Window & { __cgScriptsEnabled?: boolean }).__cgScriptsEnabled));

    const handler = () => setConsentEnabled(true);
    document.addEventListener("cg-scripts-enabled", handler);
    return () => {
      document.removeEventListener("cg-scripts-enabled", handler);
    };
  }, []);

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;
    el.removeAttribute("data-ad-slot-initialized");
    el.removeAttribute("data-adsbygoogle-status");
  }, [slot]);

  useEffect(() => {
    if (!consentEnabled) return;
    if (!slot || !isAdUnitConfigured(slot)) return;

    const el = slotRef.current;
    if (!el) return;

    if (el.getAttribute("data-adsbygoogle-status") === "done") {
      return;
    }

    if (el.getAttribute("data-ad-slot-initialized") === "true") {
      return;
    }

    const adsGlobal = window as unknown as { adsbygoogle?: unknown[] };
    if (!Array.isArray(adsGlobal.adsbygoogle)) {
      adsGlobal.adsbygoogle = [];
    }

    el.setAttribute("data-ad-slot-initialized", "true");

    try {
      adsGlobal.adsbygoogle!.push({});
    } catch (error) {
      el.removeAttribute("data-ad-slot-initialized");
      console.warn("AdSense push failed", error);
    }

    return () => {
      if (el.getAttribute("data-adsbygoogle-status") !== "done") {
        el.removeAttribute("data-ad-slot-initialized");
      }
    };
  }, [consentEnabled, slot]);

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
