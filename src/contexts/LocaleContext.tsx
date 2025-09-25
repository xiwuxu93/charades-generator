"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionary";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Dictionary;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = "charades-generator-locale";

function formatTemplate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/{{\s*([^}]+)\s*}}/g, (_, key) => {
    const value = params[key.trim()];
    return value === undefined || value === null ? "" : String(value);
  });
}

function resolvePath(path: string, dictionary: Dictionary): unknown {
  return path.split(".").reduce<unknown>((accumulator, segment) => {
    if (accumulator && typeof accumulator === "object" && segment in (accumulator as Record<string, unknown>)) {
      return (accumulator as Record<string, unknown>)[segment];
    }
    return undefined;
  }, dictionary);
}

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale = DEFAULT_LOCALE }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pathLocale = window.location.pathname.split('/').filter(Boolean)[0] as Locale | undefined;
    if (pathLocale && SUPPORTED_LOCALES.includes(pathLocale)) {
      setLocaleState(pathLocale);
      document.documentElement.lang = pathLocale;
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
      setLocaleState(stored as Locale);
      document.documentElement.lang = stored;
      return;
    }

    const navigatorLocale = window.navigator.language.slice(0, 2) as Locale;
    if (SUPPORTED_LOCALES.includes(navigatorLocale)) {
      setLocaleState(navigatorLocale);
      document.documentElement.lang = navigatorLocale;
    } else {
      document.documentElement.lang = DEFAULT_LOCALE;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo<LocaleContextValue>(() => {
    const translate = (path: string, params?: Record<string, string | number>) => {
      const resolved = resolvePath(path, dictionary);
      if (typeof resolved === "string") {
        return formatTemplate(resolved, params);
      }
      return path;
    };

    return {
      locale,
      setLocale: (nextLocale: Locale) => {
        if (SUPPORTED_LOCALES.includes(nextLocale)) {
          setLocaleState(nextLocale);
        }
      },
      dictionary,
      t: translate,
    };
  }, [dictionary, locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
