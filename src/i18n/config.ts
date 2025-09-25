export const SUPPORTED_LOCALES = ["en", "es"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export const DEFAULT_LOCALE: Locale = "en";
