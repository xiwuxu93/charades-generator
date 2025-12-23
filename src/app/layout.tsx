import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import ConsentManager from "@/components/ConsentManager";
import RouteTracking from "@/components/RouteTracking";
import { ensureUrlCanParse } from "@/utils/polyfills";
import "./globals.css";

const LOCALE_COOKIE = "site-locale";
const CONSENT_COOKIE = "cg-consent";

const CONSENT_REQUIRED_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IS",
  "IE",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
  "ES",
  "GB",
  "UK",
  "CH",
  "GG",
  "IM",
  "JE",
]);

const CONSENT_REQUIRED_LOCALES = new Set<Locale>(["es"]);

function getCountryFromHeaders(headerStore: Headers) {
  const candidates = [
    "cf-ipcountry",
    "x-vercel-ip-country",
    "x-forwarded-country",
    "x-country-code",
  ];

  for (const key of candidates) {
    const value = headerStore.get(key);
    if (!value) continue;
    const normalized = value.trim().toUpperCase();
    if (normalized && normalized !== "T1" && normalized !== "XX") {
      return normalized;
    }
  }

  return undefined;
}

function regionRequiresConsent(countryCode: string | undefined, locale: Locale) {
  if (countryCode && CONSENT_REQUIRED_COUNTRIES.has(countryCode)) {
    return true;
  }

  return CONSENT_REQUIRED_LOCALES.has(locale);
}

function resolveLocale(cookieLocale: string | undefined, headerLocale: string | null): Locale {
  const fallback = cookieLocale ?? headerLocale ?? DEFAULT_LOCALE;
  return isLocale(fallback) ? fallback : DEFAULT_LOCALE;
}

function localeToHtmlAttributes(locale: Locale) {
  switch (locale) {
    case "es":
      return { lang: "es", dir: "ltr" as const };
    default:
      return { lang: "en", dir: "ltr" as const };
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://charades-generator.com"),
  title: {
    default: "Charades Generator - Free Online Charades Words & Ideas",
    template: "%s | Charades Generator",
  },
  description:
    "Free online charades generator with 1000+ words and ideas. Generate instant charades for kids, adults, movies, Disney, animals, actions and more. Perfect for parties and family game nights!",
  keywords:
    "charades generator, charades words, charades ideas, charades for kids, charades movies, party games, family games, disney charades, online charades generator",
  authors: [{ name: "Charades Generator Team" }],
  creator: "Charades Generator",
  publisher: "Charades Generator",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charades-generator.com/",
    siteName: "Charades Generator",
    title: "Free Charades Generator - Instant Words for Your Game Night",
    description:
      "Generate instant charades words and ideas for kids and adults. Free online charades generator with movies, animals, actions, Disney themes and more.",
    images: [
      {
        url: "/charades-generator-og.png",
        width: 1200,
        height: 630,
        alt: "Charades Generator - Free Online Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Charades Generator - Instant Words for Your Game Night",
    description:
      "Generate instant charades words and ideas for kids and adults. Perfect for parties and family fun!",
    images: ["/charades-generator-og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#3B82F6",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ensureUrlCanParse();
  const isProduction = process.env.NODE_ENV === "production";
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value, headerStore.get("x-site-locale"));
  const countryCode = getCountryFromHeaders(headerStore);
  const consentCookie = cookieStore.get(CONSENT_COOKIE)?.value;
  const consentStatus = (() => {
    if (consentCookie === "granted" || consentCookie === "denied") {
      return consentCookie;
    }
    // Only require explicit consent in regions/locales where it's legally needed;
    // elsewhere (e.g. US) allow analytics/ads to load by default.
    return regionRequiresConsent(countryCode, locale) ? "pending" : "granted";
  })();
  const dictionary = getDictionary(locale);
  const htmlAttributes = localeToHtmlAttributes(locale);

  return (
    <html lang={htmlAttributes.lang} dir={htmlAttributes.dir} data-locale={locale}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />

        {/* Minimal critical CSS for initial render */}
        <style>{`
          *{box-sizing:border-box}
          body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--background);color:var(--foreground)}
          .critical-nav{position:sticky;top:0;z-index:50;background:white;border-bottom:1px solid #e5e7eb}
          .critical-container{max-width:72rem;margin:0 auto;padding:0 1rem}
          .critical-flex{display:flex;justify-content:space-between;align-items:center;height:4rem}
          .critical-logo{height:4rem;width:auto}
        `}</style>
      </head>
      <body className="antialiased">
        {children}
        <ConsentManager
          initialStatus={consentStatus}
          locale={locale}
          copy={dictionary.consent}
          isProduction={isProduction}
        />
        <RouteTracking />
      </body>
    </html>
  );
}
