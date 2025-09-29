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
  const [adsenseLoaded, setAdsenseLoaded] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean((window as Window & { __cgAdsenseScriptLoaded?: boolean }).__cgAdsenseScriptLoaded);
  });

  useEffect(() => {
    const handleScriptsEnabled = () => {
      console.log("Scripts enabled event received");
      setConsentEnabled(true);
    };
    const handleAdsenseLoaded = () => {
      console.log("AdSense loaded event received");
      setAdsenseLoaded(true);
    };

    document.addEventListener("cg-scripts-enabled", handleScriptsEnabled);
    document.addEventListener("cg-adsense-loaded", handleAdsenseLoaded);

    return () => {
      document.removeEventListener("cg-scripts-enabled", handleScriptsEnabled);
      document.removeEventListener("cg-adsense-loaded", handleAdsenseLoaded);
    };
  }, []);

  useEffect(() => {
    console.log(`AdSlot effect: consent=${consentEnabled}, adsense=${adsenseLoaded}, slot=${slot}, path=${pathname}`);

    if (!consentEnabled || !adsenseLoaded) return;
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
          console.log(`Pushing ad for slot: ${slot} on path: ${pathname}`);
          adsGlobal.adsbygoogle!.push({});
          console.log(`Ad pushed successfully for slot: ${slot}`);
        } else {
          console.warn(`Element not connected for slot: ${slot}`);
        }
      } catch (error) {
        console.error("AdSense push failed", { slot, pathname, error });
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [consentEnabled, adsenseLoaded, slot, pathname]);

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
