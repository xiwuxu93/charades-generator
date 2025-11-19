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
    function gtag(this: unknown, ...args: unknown[]) {
      window.dataLayer!.push(args);
    }

    gtag("config", "G-YC6P6CMMW2", {
      page_path: pagePath,
    });
    gtag("event", "page_view", {
      page_path: pagePath,
    });

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore ad refresh errors
    }
  }, [pathname, searchParams]);

  return null;
}

