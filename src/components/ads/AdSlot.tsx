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
    const handleScriptsEnabled = () => {
      setConsentEnabled(true);
    };

    document.addEventListener("cg-scripts-enabled", handleScriptsEnabled);

    return () => {
      document.removeEventListener("cg-scripts-enabled", handleScriptsEnabled);
    };
  }, []);

  useEffect(() => {
    if (!consentEnabled) return;
    if (!slot || !isAdUnitConfigured(slot)) return;
    const element = slotRef.current;
    if (!element) return;

    // 清理之前的广告状态
    element.removeAttribute("data-adsbygoogle-status");
    element.innerHTML = "";

    const adsGlobal = window as unknown as { adsbygoogle?: unknown[] };
    if (!Array.isArray(adsGlobal.adsbygoogle)) {
      adsGlobal.adsbygoogle = [];
    }

    // 使用 setTimeout 确保 DOM 完全渲染后再推送广告
    const timeoutId = setTimeout(() => {
      try {
        // 检查元素是否仍然存在于 DOM 中
        if (element.isConnected) {
          adsGlobal.adsbygoogle!.push({});
        }
      } catch (error) {
        console.warn("AdSense push failed:", error);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
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
