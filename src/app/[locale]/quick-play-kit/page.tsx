import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import PrintButton from "@/components/PrintButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import { LabeledAdSlot, PageHeaderAd } from "@/components/ads";
import { AD_UNITS, isAdUnitConfigured } from "@/config/ads";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BASE_URL = "https://charades-generator.com";

interface QuickKitContent {
  title: string;
  description: string;
  updated: string;
  printCta: string;
  copyLink: string;
  copyConfirmation: string;
  copyError: string;
  intro: string[];
  sections: { id: string; title: string; description: string; bullets: string[] }[];
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const kitData = ((dictionary.pages as unknown) as { quickKit: QuickKitContent }).quickKit;
  const canonicalUrl = locale === "en" ? `${BASE_URL}/quick-play-kit/` : `${BASE_URL}/${locale}/quick-play-kit/`;

  return {
    title: kitData.title,
    description: kitData.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE_URL}/quick-play-kit/`,
        es: `${BASE_URL}/es/quick-play-kit/`,
      },
    },
    openGraph: {
      title: kitData.title,
      description: kitData.description,
      url: canonicalUrl,
      type: "website",
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: kitData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: kitData.title,
      description: kitData.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function QuickPlayKitPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const quickKit = ((dictionary.pages as unknown) as { quickKit: QuickKitContent }).quickKit;
  const canonicalUrl = locale === "en" ? `${BASE_URL}/quick-play-kit/` : `${BASE_URL}/${locale}/quick-play-kit/`;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-10 sm:py-12">
        <header className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            {quickKit.updated}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{quickKit.title}</h1>
          <p className="text-gray-600 text-lg">{quickKit.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <PrintButton label={quickKit.printCta} />
            <CopyLinkButton
              url={canonicalUrl}
              label={quickKit.copyLink}
              confirmation={quickKit.copyConfirmation}
              errorMessage={quickKit.copyError}
            />
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {quickKit.intro.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </header>

        <PageHeaderAd />

        {isAdUnitConfigured(AD_UNITS.articleInline) && (
          <LabeledAdSlot
            slot={AD_UNITS.articleInline}
            format="auto"
            responsive
            style={{ display: "block", minHeight: 250 }}
            wrapperClassName="mb-10"
          />
        )}

        <main className="space-y-10">
          {quickKit.sections.map((section: { id: string; title: string; description: string; bullets: string[] }) => (
            <section key={section.id} id={section.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{section.description}</p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-gray-700">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
