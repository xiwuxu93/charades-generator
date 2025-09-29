"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ADSENSE_CLIENT, isAdUnitConfigured } from "@/config/ads";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const [consentEnabled, setConsentEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean((window as Window & { __cgScriptsEnabled?: boolean }).__cgScriptsEnabled);
  });

  useEffect(() => {
    const handler = () => setConsentEnabled(true);
    document.addEventListener("cg-scripts-enabled", handler);
    return () => document.removeEventListener("cg-scripts-enabled", handler);
  }, []);

  useEffect(() => {
    const element = slotRef.current;
    if (!element) return;
    element.removeAttribute("data-adsbygoogle-status");
  }, [slot, pathname]);

  useEffect(() => {
    if (!consentEnabled) return;
    if (!slot || !isAdUnitConfigured(slot)) return;
    const element = slotRef.current;
    if (!element) return;

    const adsGlobal = window as unknown as { adsbygoogle?: unknown[] };
    if (!Array.isArray(adsGlobal.adsbygoogle)) {
      adsGlobal.adsbygoogle = [];
    }

    try {
      adsGlobal.adsbygoogle!.push({});
    } catch (error) {
      console.warn("AdSense push failed", error);
    }
  }, [consentEnabled, slot, pathname]);

  if (!slot || !isAdUnitConfigured(slot)) {
    return null;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const resolvedStyle: CSSProperties = style ?? { display: "block", minHeight: 90 };
  const elementKey = `${slot}-${pathname}`;

  return (
    <ins
      key={elementKey}
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
