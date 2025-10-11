import HomeLanding from "@/components/HomeLanding";
import StructuredData from "@/components/StructuredData";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import SiteLinksStructuredData from "@/components/SiteLinksStructuredData";
import { Metadata } from "next";
import { pickWords } from "@/utils/charades";
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
  const canonicalUrl = locale === 'en' ? `${baseUrl}/` : `${baseUrl}/${locale}/`;

  return {
    title: dictionary.seo.home.title,
    description: dictionary.seo.home.description,
    keywords: dictionary.seo.home.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/`,
        'es': `${baseUrl}/es/`,
      }
    },
    openGraph: {
      title: dictionary.seo.home.title,
      description: dictionary.seo.home.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${baseUrl}/charades-generator-og.png`,
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
      images: [`${baseUrl}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const initialWords = pickWords("all", "all", "all", 3, locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en' ? `${baseUrl}/` : `${baseUrl}/${locale}/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeLanding initialWords={initialWords} />

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
    </div>
  );
}
