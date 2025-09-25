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
    ? `${baseUrl}/charades-generator-for-kids/`
    : `${baseUrl}/${locale}/charades-generator-for-kids/`;

  return {
    title: dictionary.seo.kids.title,
    description: dictionary.seo.kids.description,
    keywords: dictionary.seo.kids.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/charades-generator-for-kids/`,
        'es': `${baseUrl}/es/charades-generator-for-kids/`,
      }
    },
    openGraph: {
      title: dictionary.seo.kids.title,
      description: dictionary.seo.kids.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function CharadesForKidsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/charades-generator-for-kids/`
    : `${baseUrl}/${locale}/charades-generator-for-kids/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.kids.title}
        description={dictionary.pages.kids.description}
        defaultCategory="kids"
        defaultDifficulty="easy"
        defaultAgeGroup="kids"
        hideAgeGroupFilter={true}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.kids.structuredDataName}
        description={dictionary.seo.kids.structuredDataDescription}
        url={canonicalUrl}
        category="Kids Games"
      />
    </div>
  );
}
