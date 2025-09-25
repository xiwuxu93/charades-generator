import FeedbackForm from "@/components/FeedbackForm";
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
    ? `${baseUrl}/feedback/`
    : `${baseUrl}/${locale}/feedback/`;

  return {
    title: dictionary.seo.feedback.title,
    description: dictionary.seo.feedback.description,
    keywords: dictionary.seo.feedback.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/feedback/`,
        'es': `${baseUrl}/es/feedback/`,
      }
    },
    openGraph: {
      title: dictionary.seo.feedback.title,
      description: dictionary.seo.feedback.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function FeedbackPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.feedback.title}
      </h1>

      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          {dictionary.pages.feedback.description}
        </p>
        <p className="text-gray-700">
          {dictionary.pages.feedback.helpImprove}
        </p>
      </div>

    </div>
  );
}
