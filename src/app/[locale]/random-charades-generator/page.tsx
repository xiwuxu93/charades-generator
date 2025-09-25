import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

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

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/random-charades-generator/`
    : `${baseUrl}/${locale}/random-charades-generator/`;

  return {
    title: dictionary.seo.random.title,
    description: dictionary.seo.random.description,
    keywords: dictionary.seo.random.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/random-charades-generator/`,
        'es': `${baseUrl}/es/random-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.random.title,
      description: dictionary.seo.random.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function RandomCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/random-charades-generator/`
    : `${baseUrl}/${locale}/random-charades-generator/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.random.title}
        description={dictionary.pages.random.description}
        defaultCategory="all"
        defaultDifficulty="all"
        defaultAgeGroup="all"
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.random.structuredDataName}
        description={dictionary.seo.random.structuredDataDescription}
        url={canonicalUrl}
        category="Random Games"
      />
    </div>
  );
}
