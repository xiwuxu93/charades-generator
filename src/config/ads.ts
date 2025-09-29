export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-4855228928819714";

export const AD_UNITS = {
  generatorResponsive: process.env.NEXT_PUBLIC_ADSENSE_UNIT_GENERATOR_RESPONSIVE,
  homeMidpage: process.env.NEXT_PUBLIC_ADSENSE_UNIT_HOME_MIDPAGE,
  articleInline: process.env.NEXT_PUBLIC_ADSENSE_UNIT_ARTICLE_INLINE,
  pageHeader: process.env.NEXT_PUBLIC_ADSENSE_UNIT_PAGE_HEADER,
} as const;

export function isAdUnitConfigured(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
