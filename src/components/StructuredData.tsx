import type { Locale } from "@/i18n/config";
import { DEFAULT_LOCALE } from "@/i18n/config";

interface StructuredDataProps {
  type: "WebApplication" | "Game" | "Article";
  name: string;
  description: string;
  url?: string;
  category?: string;
  locale?: Locale;
}

interface BaseStructure {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  isAccessibleForFree: boolean;
  inLanguage: string;
  "@id"?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
  };
  genre?: string;
  numberOfPlayers?: string;
  playMode?: string;
}

function getLanguageTag(locale: Locale) {
  switch (locale) {
    case "es":
      return "es-ES";
    default:
      return "en-US";
  }
}

export default function StructuredData({ type, name, description, url, category, locale = DEFAULT_LOCALE }: StructuredDataProps) {
  const languageTag = getLanguageTag(locale);
  const baseStructure: BaseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url || "https://charades-generator.com/",
    "isAccessibleForFree": true,
    "inLanguage": languageTag,
    "author": {
      "@type": "Organization",
      "name": "Charades Generator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charades Generator"
    },
    "@id": `${url || "https://charades-generator.com/"}#${type.toLowerCase()}`,
  };

  // Add fields specific to WebApplication type
  if (type === 'WebApplication') {
    baseStructure.applicationCategory = "GameApplication";
    baseStructure.operatingSystem = "Any";
    baseStructure.offers = {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    };
  }

  if (type === 'Game' && category) {
    baseStructure.genre = category;
    baseStructure.numberOfPlayers = "2+";
    baseStructure.playMode = "MultiPlayer";
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseStructure)
      }}
    />
  );
}
