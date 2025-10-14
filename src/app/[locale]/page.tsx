import HomeLanding from "@/components/HomeLanding";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import SiteLinksStructuredData from "@/components/SiteLinksStructuredData";
import { Metadata } from "next";
import { pickWords } from "@/utils/charades";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";

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

  const canonicalPath = "/";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const alternateLanguages = buildAlternateLanguages(canonicalPath);

  return {
    title: dictionary.seo.home.title,
    description: dictionary.seo.home.description,
    keywords: dictionary.seo.home.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dictionary.seo.home.title,
      description: dictionary.seo.home.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.home.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.home.title,
      description: dictionary.seo.home.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const initialWords = pickWords("all", "all", "all", 3, locale);

  const canonicalPath = "/";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeLanding initialWords={initialWords} dictionary={dictionary} locale={locale} />

      <WebsiteStructuredData locale={locale} dictionary={dictionary} />
      <SiteLinksStructuredData locale={locale} dictionary={dictionary} />
      <StructuredData
        type="WebApplication"
        name={dictionary.seo.home.structuredDataName}
        description={dictionary.seo.home.structuredDataDescription}
        url={canonicalUrl}
        category="Party Games"
        locale={locale}
      />
      <FAQStructuredData items={dictionary.home.generatorDeepDive.faq.items ?? []} />
    </div>
  );
}
