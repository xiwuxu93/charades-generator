import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';

const EXTERNAL_PROTOCOLS = [/^https?:\/\//i];

export function buildLocalePath(locale: Locale, path: string): string {
  if (EXTERNAL_PROTOCOLS.some((regex) => regex.test(path))) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  const cleaned = normalized.replace(/\/+/g, '/');
  if (locale === DEFAULT_LOCALE) {
    return cleaned.replace(/\/+/g, '/');
  }

  const prefixed = `/${locale}${cleaned}`;
  return prefixed.replace(/\/+/g, '/');
}
