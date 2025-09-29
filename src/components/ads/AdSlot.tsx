"use client";

import { useEffect, useRef, useState, useId } from "react";
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
  const id = useId();
  const [consentEnabled, setConsentEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean((window as Window & { __cgScriptsEnabled?: boolean }).__cgScriptsEnabled);
  });
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const handleScriptsEnabled = () => {
      setConsentEnabled(true);
    };

    document.addEventListener("cg-scripts-enabled", handleScriptsEnabled);

    return () => {
      document.removeEventListener("cg-scripts-enabled", handleScriptsEnabled);
    };
  }, []);

  // 监听路径变化，强制刷新广告
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [pathname]);

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

    // 延迟推送广告，确保页面完全加载
    const timeoutId = setTimeout(() => {
      try {
        // 双重检查元素状态
        if (element.isConnected && element.offsetParent !== null) {
          // 重新设置所有必要的属性
          element.setAttribute("data-ad-client", ADSENSE_CLIENT);
          element.setAttribute("data-ad-slot", slot);
          if (format) element.setAttribute("data-ad-format", format);
          if (layout) element.setAttribute("data-ad-layout", layout);
          if (layoutKey) element.setAttribute("data-ad-layout-key", layoutKey);
          if (responsive) element.setAttribute("data-full-width-responsive", "true");

          adsGlobal.adsbygoogle!.push({});
        }
      } catch (error) {
        console.warn("AdSense push failed:", error);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [consentEnabled, slot, pathname, format, layout, layoutKey, responsive, refreshKey]);

  if (!slot || !isAdUnitConfigured(slot)) {
    return null;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const resolvedStyle: CSSProperties = style ?? { display: "block", minHeight: 90 };
  const elementKey = `${slot}-${pathname}-${id}`;

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
