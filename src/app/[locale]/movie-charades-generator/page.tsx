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
    ? `${baseUrl}/movie-charades-generator/`
    : `${baseUrl}/${locale}/movie-charades-generator/`;

  return {
    title: dictionary.seo.movies.title,
    description: dictionary.seo.movies.description,
    keywords: dictionary.seo.movies.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/movie-charades-generator/`,
        'es': `${baseUrl}/es/movie-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.movies.title,
      description: dictionary.seo.movies.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function MovieCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/movie-charades-generator/`
    : `${baseUrl}/${locale}/movie-charades-generator/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.movies.title}
        description={dictionary.pages.movies.description}
        defaultCategory="movies"
        defaultDifficulty="medium"
        defaultAgeGroup="all"
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.movies.structuredDataName}
        description={dictionary.seo.movies.structuredDataDescription}
        url={canonicalUrl}
        category="Movie Games"
      />
    </div>
  );
}
