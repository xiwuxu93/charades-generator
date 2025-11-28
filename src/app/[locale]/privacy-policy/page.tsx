import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";

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

  const canonicalPath = "/privacy-policy";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.privacy.title,
    description: dictionary.seo.privacy.description,
    keywords: dictionary.seo.privacy.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.privacy.title,
      description: dictionary.seo.privacy.description,
      type: "website",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.privacy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.privacy.title,
      description: dictionary.seo.privacy.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.privacy.title}
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          {dictionary.pages.privacy.lastUpdated}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section1Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section1Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section2Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section2Content}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.privacy.dataType1}</li>
            <li>{dictionary.pages.privacy.dataType2}</li>
            <li>{dictionary.pages.privacy.dataType3}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section3Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section3Content}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.privacy.use1}</li>
            <li>{dictionary.pages.privacy.use2}</li>
            <li>{dictionary.pages.privacy.use3}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section4Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section4Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section5Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section5Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section6Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section6Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.section7Title}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.privacy.section7Content}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.privacy.contactTitle}
          </h2>
          <p className="text-gray-700">
            {dictionary.pages.privacy.contactContent}
          </p>
        </section>
      </div>
    </div>
  );
}
