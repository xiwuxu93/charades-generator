"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { buildLocalePath } from "@/utils/localePaths";
import type { Locale } from "@/i18n/config";
import { ADSENSE_CLIENT, AD_UNITS, isAdUnitConfigured } from "@/config/ads";

const CONSENT_COOKIE = "cg-consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // 180 days

type ConsentStatus = "granted" | "denied" | "pending";

interface ConsentCopy {
  title: string;
  description: string;
  accept: string;
  reject: string;
  privacyLinkLabel: string;
}

interface ConsentManagerProps {
  initialStatus: ConsentStatus;
  locale: Locale;
  copy: ConsentCopy;
  isProduction: boolean;
}

function setConsentCookie(value: ConsentStatus) {
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax`;
}

function updateGtag(status: ConsentStatus) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag(this: unknown, ...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  const consentValue = status === "granted" ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: consentValue,
    analytics_storage: consentValue,
    ad_user_data: consentValue,
    ad_personalization: consentValue,
    personalization_storage: consentValue,
  });
}

function ensureDefaultConsent() {
  if (typeof window === "undefined") return;
  if (window.__cgConsentDefaultApplied) {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag(this: unknown, ...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
  window.__cgConsentDefaultApplied = true;
}

declare global {
  interface Window {
    __cgConsentDefaultApplied?: boolean;
    dataLayer?: unknown[][];
    __cgScriptsEnabled?: boolean;
  }
}

export default function ConsentManager({ initialStatus, locale, copy, isProduction }: ConsentManagerProps) {
  const [status, setStatus] = useState<ConsentStatus>(initialStatus);
  const [scriptsEnabled, setScriptsEnabled] = useState<boolean>(isProduction && initialStatus === "granted");
  const hasAdUnitsConfigured = useMemo(
    () => Object.values(AD_UNITS).some((value) => isAdUnitConfigured(value)),
    [],
  );

  useEffect(() => {
    if (!isProduction) return;
    ensureDefaultConsent();
    if (initialStatus === "granted") {
      updateGtag("granted");
    }
  }, [initialStatus, isProduction]);

  useEffect(() => {
    if (!isProduction) return;
    if (status === "granted") {
      updateGtag("granted");
      setScriptsEnabled(true);
    } else if (status === "denied") {
      updateGtag("denied");
      setScriptsEnabled(false);
    }
  }, [status, isProduction]);

  useEffect(() => {
    if (!isProduction) return;
    if (scriptsEnabled) {
      document.dispatchEvent(new CustomEvent("cg-scripts-enabled"));
      if (typeof window !== "undefined") {
        window.__cgScriptsEnabled = true;
      }
    } else if (typeof window !== "undefined") {
      window.__cgScriptsEnabled = false;
    }
  }, [scriptsEnabled, isProduction]);

  useEffect(() => {
    if (!isProduction || !scriptsEnabled) return;
    if (!ADSENSE_CLIENT) return;
    if (!hasAdUnitsConfigured) return;
    if (typeof document === "undefined") return;

    const existing = document.querySelector('script[data-cg-adsense="true"]');
    if (existing) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-cg-adsense", "true");
    document.head.appendChild(script);

    const adsGlobal = window as unknown as { adsbygoogle?: unknown[] };
    if (!Array.isArray(adsGlobal.adsbygoogle)) {
      adsGlobal.adsbygoogle = [];
    }
  }, [isProduction, scriptsEnabled, hasAdUnitsConfigured]);

  const handleAccept = () => {
    setConsentCookie("granted");
    setStatus("granted");
  };

  const handleReject = () => {
    setConsentCookie("denied");
    setStatus("denied");
  };

  const showBanner = status === "pending";

  const privacyHref = useMemo(() => buildLocalePath(locale, "/privacy-policy"), [locale]);

  return (
    <>
      {isProduction && scriptsEnabled && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-YC6P6CMMW2" strategy="afterInteractive" />
          <Script id="gtag-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YC6P6CMMW2', {
                anonymize_ip: true,
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-4xl rounded-t-2xl border border-gray-200 bg-white p-4 shadow-2xl sm:p-6">
          <h2 className="text-base font-semibold text-gray-900">{copy.title}</h2>
          <p className="mt-2 text-sm text-gray-600">{copy.description}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={privacyHref}
              className="text-sm font-medium text-blue-600 underline-offset-2 hover:text-blue-800 hover:underline"
            >
              {copy.privacyLinkLabel}
            </a>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleReject}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
              >
                {copy.reject}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
