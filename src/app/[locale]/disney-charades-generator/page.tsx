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
    ? `${baseUrl}/disney-charades-generator/`
    : `${baseUrl}/${locale}/disney-charades-generator/`;

  return {
    title: dictionary.seo.disney.title,
    description: dictionary.seo.disney.description,
    keywords: dictionary.seo.disney.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/disney-charades-generator/`,
        'es': `${baseUrl}/es/disney-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.disney.title,
      description: dictionary.seo.disney.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function DisneyCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/disney-charades-generator/`
    : `${baseUrl}/${locale}/disney-charades-generator/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.disney.title}
        description={dictionary.pages.disney.description}
        defaultCategory="disney"
        defaultDifficulty="medium"
        defaultAgeGroup="all"
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.disney.structuredDataName}
        description={dictionary.seo.disney.structuredDataDescription}
        url={canonicalUrl}
        category="Disney Games"
      />
    </div>
  );
}
