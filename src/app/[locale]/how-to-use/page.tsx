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
    ? `${baseUrl}/how-to-use/`
    : `${baseUrl}/${locale}/how-to-use/`;

  return {
    title: dictionary.seo.howToUse.title,
    description: dictionary.seo.howToUse.description,
    keywords: dictionary.seo.howToUse.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/how-to-use/`,
        'es': `${baseUrl}/es/how-to-use/`,
      }
    },
    openGraph: {
      title: dictionary.seo.howToUse.title,
      description: dictionary.seo.howToUse.description,
      type: "article",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function HowToUsePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.howToUse.title}
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.whatIsCharades}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.whatIsCharadesDescription}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.howToPlay}
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>{dictionary.pages.howToUse.step1}</li>
            <li>{dictionary.pages.howToUse.step2}</li>
            <li>{dictionary.pages.howToUse.step3}</li>
            <li>{dictionary.pages.howToUse.step4}</li>
            <li>{dictionary.pages.howToUse.step5}</li>
            <li>{dictionary.pages.howToUse.step6}</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.basicRules}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.rule1}</li>
            <li>{dictionary.pages.howToUse.rule2}</li>
            <li>{dictionary.pages.howToUse.rule3}</li>
            <li>{dictionary.pages.howToUse.rule4}</li>
            <li>{dictionary.pages.howToUse.rule5}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.usingGenerator}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.generatorDescription}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.generatorStep1}</li>
            <li>{dictionary.pages.howToUse.generatorStep2}</li>
            <li>{dictionary.pages.howToUse.generatorStep3}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.tips}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.tip1}</li>
            <li>{dictionary.pages.howToUse.tip2}</li>
            <li>{dictionary.pages.howToUse.tip3}</li>
            <li>{dictionary.pages.howToUse.tip4}</li>
            <li>{dictionary.pages.howToUse.tip5}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.benefits}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.benefitsDescription}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.benefit1}</li>
            <li>{dictionary.pages.howToUse.benefit2}</li>
            <li>{dictionary.pages.howToUse.benefit3}</li>
            <li>{dictionary.pages.howToUse.benefit4}</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {dictionary.pages.howToUse.readyToPlay}
          </h3>
          <p className="text-blue-800 mb-4">
            {dictionary.pages.howToUse.readyToPlayDescription}
          </p>
          <Link
            href={locale === 'en' ? '/' : `/${locale}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {dictionary.pages.howToUse.startGenerating}
          </Link>
        </div>
      </div>
    </div>
  );
}
