"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    adsbygoogle?: unknown[];
    __cgLastTrackedPath?: string;
  }
}

export default function RouteTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = searchParams?.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    if (window.__cgLastTrackedPath === pagePath) return;
    window.__cgLastTrackedPath = pagePath;

    window.dataLayer = window.dataLayer || [];
    const gtag =
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag ??
      ((...args: unknown[]) => {
        window.dataLayer!.push(args);
      });

    gtag("event", "page_view", {
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}
