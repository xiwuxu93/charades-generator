"use client";

import { useEffect, useRef } from "react";
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

function enqueueAdRender(ins: HTMLElement) {
  if (!(window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
    (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle = [];
  }
  (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle.push({});
  ins.dataset.adsRequested = "true";
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

  useEffect(() => {
    const ins = slotRef.current;
    if (!ins) return;

    ins.removeAttribute("data-adsbygoogle-status");
    ins.dataset.adsRequested = "false";

    const render = () => {
      if (!slot) return;
      if (!isAdUnitConfigured(slot)) return;
      if (ins.dataset.adsbygoogleStatus === "done") return;
      if (ins.dataset.adsRequested === "true") return;
      enqueueAdRender(ins);
    };

    if ((window as Window & { __cgScriptsEnabled?: boolean }).__cgScriptsEnabled) {
      render();
    }

    const handler = () => render();
    document.addEventListener("cg-scripts-enabled", handler);
    return () => {
      document.removeEventListener("cg-scripts-enabled", handler);
    };
  }, [slot]);

  if (!slot || !isAdUnitConfigured(slot)) {
    return null;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const resolvedStyle: CSSProperties = style ?? { display: "block", minHeight: 90 };

  return (
    <ins
      key={slot}
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
