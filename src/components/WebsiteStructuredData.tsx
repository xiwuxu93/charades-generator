import type { Locale } from "@/i18n/config";
import { DEFAULT_LOCALE } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

interface WebsiteStructuredDataProps {
  locale?: Locale;
  dictionary: Dictionary;
  baseUrl?: string;
}

function getLanguageTag(locale: Locale) {
  switch (locale) {
    case "es":
      return "es-ES";
    default:
      return "en-US";
  }
}

export default function WebsiteStructuredData({
  locale = DEFAULT_LOCALE,
  dictionary,
  baseUrl = "https://charades-generator.com",
}: WebsiteStructuredDataProps) {
  const languageTag = getLanguageTag(locale);
  const siteName = dictionary.footer.brandTitle;
  const description = dictionary.seo.home.description;
  const alternateName = locale === "es" ? "Generador de Charadas Gratis" : "Free Charades Word Generator";

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "alternateName": alternateName,
    "url": `${baseUrl}/`,
    "description": description,
    "inLanguage": languageTag,
    "isAccessibleForFree": true,
    "@id": `${baseUrl}/#website`,
    "mainEntity": {
      "@type": "WebApplication",
      "@id": `${baseUrl}/#webapp`,
      "name": siteName,
      "applicationCategory": "GameApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Random charades word generation",
        "Multiple categories (movies, animals, Disney, Christmas, etc.)",
        "Difficulty levels (easy, medium, hard)",
        "Age-appropriate content",
        "Batch generation (1-50 words)",
        "Mobile-friendly interface",
        "No registration required"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": siteName,
      "url": `${baseUrl}/`,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.svg`,
        "width": 160,
        "height": 62
      },
      "sameAs": []
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": siteName,
    "url": `${baseUrl}/`,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.svg`,
      "width": 160,
      "height": 62
    },
    "description": description,
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@charades-generator.com",
      "availableLanguage": [languageTag]
    },
    "areaServed": "Worldwide",
    "serviceType": "Entertainment Software"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
    </>
  );
}
