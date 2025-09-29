import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import PlaybookSubmissionForm from "@/components/PlaybookSubmissionForm";
import { LabeledAdSlot, PageHeaderAd } from "@/components/ads";
import { AD_UNITS, isAdUnitConfigured } from "@/config/ads";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://charades-generator.com";

function getLanguageTag(locale: Locale) {
  switch (locale) {
    case "es":
      return "es-ES";
    default:
      return "en-US";
  }
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const canonicalUrl = locale === "en" ? `${BASE_URL}/contact/` : `${BASE_URL}/${locale}/contact/`;

  return {
    title: dictionary.seo.contact.title,
    description: dictionary.seo.contact.description,
    keywords: dictionary.seo.contact.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/contact/`,
        es: `${BASE_URL}/es/contact/`,
      },
    },
    openGraph: {
      title: dictionary.seo.contact.title,
      description: dictionary.seo.contact.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.contact.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.contact.title,
      description: dictionary.seo.contact.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const canonicalUrl = locale === "en" ? `${BASE_URL}/contact/` : `${BASE_URL}/${locale}/contact/`;
  const languageTag = getLanguageTag(locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: dictionary.pages.contact.title,
    description: dictionary.seo.contact.description,
    url: canonicalUrl,
    inLanguage: languageTag,
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "main",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: dictionary.pages.contact.email,
      availableLanguage: [languageTag],
      areaServed: "Worldwide",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      },
    },
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {dictionary.pages.contact.title}
      </h1>

      <PageHeaderAd />
      <p className="text-gray-700 mb-4">{dictionary.pages.contact.intro}</p>
      <p className="text-sm text-gray-500 mb-8">{dictionary.pages.contact.responseTime}</p>

      <div className="mb-8">
        <a
          href={`mailto:${dictionary.pages.contact.email}`}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          {dictionary.pages.contact.email}
        </a>
      </div>

      <div className="space-y-6 mb-10">
        {dictionary.pages.contact.sections.map((section) => (
          <section key={section.heading} className="border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{section.heading}</h2>
            <p className="text-gray-600 text-sm md:text-base">{section.body}</p>
          </section>
        ))}
      </div>

      {isAdUnitConfigured(AD_UNITS.articleInline) && (
        <LabeledAdSlot
          slot={AD_UNITS.articleInline}
          format="auto"
          responsive
          style={{ display: "block", minHeight: 250 }}
          wrapperClassName="mb-10"
        />
      )}

      <section className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          {dictionary.pages.contact.nextStepsHeading}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-blue-800 text-sm md:text-base">
          {dictionary.pages.contact.nextSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {dictionary.pages.contact.playbookHeading}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{dictionary.pages.contact.playbookDescription}</p>
        <PlaybookSubmissionForm
          email={dictionary.pages.contact.email}
          formCopy={dictionary.pages.contact.form}
        />
      </section>
    </main>
  );
}
