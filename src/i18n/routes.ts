import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from "./config";

export interface RouteConfig {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

export const baseRoutes: RouteConfig[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/charades-generator-for-kids/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/movie-charades-generator/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/disney-charades-generator/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/funny-charades-for-adults/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/christmas-charades-generator/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/random-charades-generator/", changeFrequency: "daily", priority: 0.9 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.6 },
  { path: "/how-to-use/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service/", changeFrequency: "yearly", priority: 0.3 },
];

export function buildLocalizedUrls(path: string): string[] {
  return SUPPORTED_LOCALES.map((locale) => {
    if (locale === DEFAULT_LOCALE) {
      return `https://charades-generator.com${path}`;
    }
    return `https://charades-generator.com/${locale}${path}`;
  });
}

export function getLocalizedRoutes() {
  const entries: Array<{ url: string; locale: Locale; path: string; changeFrequency: RouteConfig["changeFrequency"]; priority: number }> = [];
  baseRoutes.forEach((route) => {
    SUPPORTED_LOCALES.forEach((locale) => {
      const url = locale === DEFAULT_LOCALE
        ? `https://charades-generator.com${route.path}`
        : `https://charades-generator.com/${locale}${route.path}`;
      entries.push({ url, locale, path: route.path, changeFrequency: route.changeFrequency, priority: route.priority });
    });
  });
  return entries;
}
