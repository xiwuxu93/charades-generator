import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";
import ImposterGameRoom from "@/components/imposter/ImposterGameRoom";

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

  const canonicalPath = "/imposter-game/play";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: `${dictionary.seo.imposter.title} - Room`,
    description: dictionary.seo.imposter.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: `${dictionary.seo.imposter.title} - Room`,
      description: dictionary.seo.imposter.description,
      type: "website",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.imposter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dictionary.seo.imposter.title} - Room`,
      description: dictionary.seo.imposter.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function ImposterGamePlayPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-6">
        <ImposterGameRoom />
      </main>
    </div>
  );
}

