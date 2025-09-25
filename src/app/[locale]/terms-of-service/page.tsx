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
    ? `${baseUrl}/terms-of-service/`
    : `${baseUrl}/${locale}/terms-of-service/`;

  return {
    title: dictionary.seo.terms.title,
    description: dictionary.seo.terms.description,
    keywords: dictionary.seo.terms.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/terms-of-service/`,
        'es': `${baseUrl}/es/terms-of-service/`,
      }
    },
    openGraph: {
      title: dictionary.seo.terms.title,
      description: dictionary.seo.terms.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function TermsOfServicePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.terms.title}
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          {dictionary.pages.terms.lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section1Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section1Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section2Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section2Content}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.terms.acceptable1}</li>
            <li>{dictionary.pages.terms.acceptable2}</li>
            <li>{dictionary.pages.terms.acceptable3}</li>
            <li>{dictionary.pages.terms.acceptable4}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section3Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section3Content}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.terms.prohibited1}</li>
            <li>{dictionary.pages.terms.prohibited2}</li>
            <li>{dictionary.pages.terms.prohibited3}</li>
            <li>{dictionary.pages.terms.prohibited4}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section4Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section4Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section5Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section5Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section6Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section6Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section7Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section7Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.section8Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.terms.section8Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.terms.contactTitle}
          </h2>
          <p className="text-gray-700">
            {dictionary.pages.terms.contactContent}
          </p>
        </section>
      </div>
    </div>
  );
}
