import { Metadata } from "next";
import Link from "next/link";
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
    ? `${baseUrl}/faq/`
    : `${baseUrl}/${locale}/faq/`;

  return {
    title: dictionary.seo.faq.title,
    description: dictionary.seo.faq.description,
    keywords: dictionary.seo.faq.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/faq/`,
        'es': `${baseUrl}/es/faq/`,
      }
    },
    openGraph: {
      title: dictionary.seo.faq.title,
      description: dictionary.seo.faq.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function FAQPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const faqs = [
    {
      question: dictionary.pages.faq.q1,
      answer: dictionary.pages.faq.a1,
    },
    {
      question: dictionary.pages.faq.q2,
      answer: dictionary.pages.faq.a2,
    },
    {
      question: dictionary.pages.faq.q3,
      answer: dictionary.pages.faq.a3,
    },
    {
      question: dictionary.pages.faq.q4,
      answer: dictionary.pages.faq.a4,
    },
    {
      question: dictionary.pages.faq.q5,
      answer: dictionary.pages.faq.a5,
    },
    {
      question: dictionary.pages.faq.q6,
      answer: dictionary.pages.faq.a6,
    },
    {
      question: dictionary.pages.faq.q7,
      answer: dictionary.pages.faq.a7,
    },
    {
      question: dictionary.pages.faq.q8,
      answer: dictionary.pages.faq.a8,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.faq.title}
      </h1>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {faq.question}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">
          {dictionary.pages.faq.stillHaveQuestions}
        </h3>
        <p className="text-blue-800 mb-4">
          {dictionary.pages.faq.contactDescription}
        </p>
        <Link
          href={locale === 'en' ? '/feedback/' : `/${locale}/feedback/`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {dictionary.pages.faq.contactUs}
        </Link>
      </div>
    </div>
  );
}
