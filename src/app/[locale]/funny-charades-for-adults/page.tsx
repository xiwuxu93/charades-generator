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
    ? `${baseUrl}/funny-charades-for-adults/`
    : `${baseUrl}/${locale}/funny-charades-for-adults/`;

  return {
    title: dictionary.seo.funny.title,
    description: dictionary.seo.funny.description,
    keywords: dictionary.seo.funny.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/funny-charades-for-adults/`,
        'es': `${baseUrl}/es/funny-charades-for-adults/`,
      }
    },
    openGraph: {
      title: dictionary.seo.funny.title,
      description: dictionary.seo.funny.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function FunnyCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/funny-charades-for-adults/`
    : `${baseUrl}/${locale}/funny-charades-for-adults/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.funny.title}
        description={dictionary.pages.funny.description}
        defaultCategory="funny"
        defaultDifficulty="medium"
        defaultAgeGroup="adults"
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.funny.structuredDataName}
        description={dictionary.seo.funny.structuredDataDescription}
        url={canonicalUrl}
        category="Adult Party Games"
      />
    </div>
  );
}
