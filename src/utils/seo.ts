import type { Locale } from "@/i18n/config";

export const BASE_URL = "https://charades-generator.com";

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  const prefixed = path.startsWith("/") ? path : `/${path}`;
  const condensed = prefixed.replace(/\/+/g, "/");

  if (condensed === "/") {
    return "/";
  }

  return condensed.endsWith("/") ? condensed : `${condensed}/`;
}

export function buildCanonicalUrl(locale: Locale, path: string): string {
  const normalized = normalizePath(path);

  if (locale === "en") {
    if (normalized === "/") {
      return `${BASE_URL}/`;
    }
    return `${BASE_URL}${normalized}`;
  }

  if (normalized === "/") {
    return `${BASE_URL}/${locale}/`;
  }

  return `${BASE_URL}/${locale}${normalized}`;
}

export function buildAlternateLanguages(path: string): Record<string, string> {
  const englishUrl = buildCanonicalUrl("en", path);
  const spanishUrl = buildCanonicalUrl("es", path);

  return {
    en: englishUrl,
    es: spanishUrl,
    "x-default": englishUrl,
  };
}

