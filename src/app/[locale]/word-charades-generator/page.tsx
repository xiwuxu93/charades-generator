import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";
import { pickWords } from "@/utils/charades";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const canonicalPath = "/word-charades-generator";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const homeUrl = buildCanonicalUrl(locale, "/");

  return {
    title: dictionary.seo.wordGenerator.title,
    description: dictionary.seo.wordGenerator.description,
    keywords: dictionary.seo.wordGenerator.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.wordGenerator.title,
      description: dictionary.seo.wordGenerator.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.wordGenerator.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.wordGenerator.title,
      description: dictionary.seo.wordGenerator.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function WordCharadesGeneratorPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const initialWords = pickWords("all", "all", "all", 3, locale);

  const canonicalPath = "/word-charades-generator";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const homeUrl = buildCanonicalUrl(locale, "/");

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: locale === 'en' ? 'Home' : 'Inicio', url: homeUrl },
          { name: dictionary.pages.wordGenerator.title, url: canonicalUrl },
        ]}
      />
      <CharadesGeneratorOptimized
        title={dictionary.pages.wordGenerator.title}
        description={dictionary.pages.wordGenerator.description}
        defaultCategory="all"
        defaultDifficulty="all"
        defaultAgeGroup="all"
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.wordGenerator.structuredDataName}
        description={dictionary.seo.wordGenerator.structuredDataDescription}
        url={canonicalUrl}
        category="Party Games"
        locale={locale}
      />
    </div>
  );
}
