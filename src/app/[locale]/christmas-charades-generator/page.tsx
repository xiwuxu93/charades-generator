import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";

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
    ? `${baseUrl}/christmas-charades-generator/`
    : `${baseUrl}/${locale}/christmas-charades-generator/`;

  return {
    title: dictionary.seo.christmas.title,
    description: dictionary.seo.christmas.description,
    keywords: dictionary.seo.christmas.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/christmas-charades-generator/`,
        'es': `${baseUrl}/es/christmas-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.christmas.title,
      description: dictionary.seo.christmas.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function ChristmasCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/christmas-charades-generator/`
    : `${baseUrl}/${locale}/christmas-charades-generator/`;

  return (
    <div className="bg-gradient-to-b from-red-50 to-green-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.christmas.title}
        description={dictionary.pages.christmas.description}
        defaultCategory="christmas"
        hideCategoryFilter={true}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.christmas.structuredDataName}
        description={dictionary.seo.christmas.structuredDataDescription}
        url={canonicalUrl}
        category="Holiday Games"
      />
    </div>
  );
}
