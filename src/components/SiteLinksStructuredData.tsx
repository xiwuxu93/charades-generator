import type { Locale } from "@/i18n/config";
import { DEFAULT_LOCALE } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { buildLocalePath } from "@/utils/localePaths";

interface SiteLinksStructuredDataProps {
  locale?: Locale;
  dictionary: Dictionary;
  baseUrl?: string;
}

function toAbsoluteUrl(baseUrl: string, locale: Locale, path: string) {
  const localized = buildLocalePath(locale, path);
  if (/^https?:\/\//i.test(localized)) {
    return localized.endsWith("/") ? localized : `${localized}/`;
  }
  const normalised = localized.endsWith("/") ? localized : `${localized}/`;
  return `${baseUrl}${normalised}`;
}

export default function SiteLinksStructuredData({
  locale = DEFAULT_LOCALE,
  dictionary,
  baseUrl = "https://charades-generator.com",
}: SiteLinksStructuredDataProps) {
  const navigationItems = dictionary.navigation.items.map((item, index) => ({
    "@type": "SiteNavigationElement",
    position: index + 1,
    name: item.title,
    url: toAbsoluteUrl(baseUrl, locale, item.href),
  }));

  const supplementalLinks = [
    { title: dictionary.pages.faq?.title, href: "/faq" },
    { title: dictionary.pages.about?.title, href: "/about" },
    { title: dictionary.pages.howToUse?.title, href: "/how-to-use" },
    { title: dictionary.pages.contact?.title, href: "/contact" },
    { title: dictionary.pages.privacy?.title, href: "/privacy-policy" },
    { title: dictionary.pages.terms?.title, href: "/terms-of-service" },
  ].filter((link): link is { title: string; href: string } => Boolean(link.title));

  const expandedList = [
    ...navigationItems,
    ...supplementalLinks.map((link, index) => ({
      "@type": "SiteNavigationElement",
      position: navigationItems.length + index + 1,
      name: link.title,
      url: toAbsoluteUrl(baseUrl, locale, link.href),
    })),
  ];

  const siteLinksData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${dictionary.footer.brandTitle} Site Navigation`,
    "itemListElement": expandedList,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteLinksData),
      }}
    />
  );
}
