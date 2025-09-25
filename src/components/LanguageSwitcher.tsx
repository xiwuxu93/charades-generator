"use client";

import { useRouter, usePathname } from "next/navigation";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { useLocale } from "@/contexts/LocaleContext";

const OPTIONS = SUPPORTED_LOCALES.map((value) => ({
  value,
  label: getDictionary(value).localeName,
}));

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    setLocale(nextLocale);

    if (!pathname) return;

    const segments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as Locale);

    if (nextLocale === DEFAULT_LOCALE) {
      if (hasLocalePrefix) {
        segments.shift();
      }
    } else {
      if (hasLocalePrefix) {
        segments[0] = nextLocale;
      } else {
        segments.unshift(nextLocale);
      }
    }

    const trailingSlash = pathname.endsWith('/') ? '/' : '';
    let nextPath = segments.length ? `/${segments.join('/')}` : '/';

    if (nextPath !== '/' && trailingSlash === '/') {
      nextPath = `${nextPath}/`;
    } else if (nextPath !== '/' && trailingSlash !== '/' && nextPath.endsWith('/')) {
      nextPath = nextPath.slice(0, -1);
    }

    nextPath = nextPath.replace(/\/+/g, '/').replace(/\/\/+/g, '/');

    router.push(nextPath);
  };

  return (
    <label className="flex items-center space-x-2 text-sm text-gray-600">
      <span>{t("languageSwitcher.label")}</span>
      <select
        value={locale}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
