import Link from "next/link";
import { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import StructuredData from "@/components/StructuredData";
import { buildLocalePath } from "@/utils/localePaths";
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
    keywords: dictionary.seo.imposter.keywords,
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
  const dictionary = getDictionary(locale);
  const t = dictionary.pages.imposterGame;

  const canonicalPath = "/imposter-game/play";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const guideCanonicalUrl = buildCanonicalUrl(locale, "/imposter-game");
  const homeUrl = buildCanonicalUrl(locale, "/");
  const homeLabel = dictionary.navigation.items.find((item) => item.key === "home")?.title ?? "Home";
  const guideHref = buildLocalePath(locale, "/imposter-game/");
  const generatorHref = buildLocalePath(locale, "/");

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <BreadcrumbStructuredData
        items={[
          { name: homeLabel, url: homeUrl },
          { name: dictionary.pages.imposter.title, url: guideCanonicalUrl },
          { name: t.roomTitle, url: canonicalUrl },
        ]}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <header className="mb-6 sm:mb-8 text-center">
          <p className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-700 mb-3">
            {locale === "en" ? "Live imposter game room" : "Sala de juego del impostor"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            {t.roomTitle}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            {t.roomDescription}
          </p>
        </header>

        <section className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 font-medium shadow-sm ring-1 ring-slate-900/5">
              {locale === "en"
                ? "Best with 4–12 players · each on their own phone"
                : "Ideal para 4–12 jugadores · cada quien con su móvil"}
            </span>
            <span className="inline-flex items-center rounded-full bg-slate-900 text-slate-100 px-3 py-1 font-medium shadow-sm">
              {locale === "en" ? "Talk out loud · no extra app" : "Hablen en voz alta · sin app extra"}
            </span>
          </div>
          <Link
            href={guideHref}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H4" />
            </svg>
            {locale === "en" ? "Back to rules & word ideas" : "Volver a reglas e ideas de palabras"}
          </Link>
        </section>

        <section className="relative mb-6">
          <div
            className="pointer-events-none absolute -inset-x-4 -top-4 bottom-0 rounded-3xl bg-gradient-to-b from-indigo-500/10 via-white to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <ImposterGameRoom />
            <p className="mt-3 text-[11px] text-slate-500 text-center">
              {locale === "en"
                ? "Everyone joins from their own device. Keep the clues and voting out loud in the room or call."
                : "Cada persona se une desde su dispositivo. Mantén las pistas y las votaciones en voz alta en la sala o videollamada."}
            </p>
          </div>
        </section>

        <section className="mt-6 text-center text-[11px] sm:text-xs text-slate-500">
          <p>
            {locale === "en"
              ? "Need more prompt ideas for your next round?"
              : "¿Necesitas más ideas de palabras para la siguiente ronda?"}{" "}
            <Link
              href={generatorHref}
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {locale === "en"
                ? "Open the main charades generator"
                : "Abre el generador principal de charadas"}
            </Link>
            .
          </p>
        </section>
      </main>

      <StructuredData
        type="WebApplication"
        name={`${dictionary.seo.imposter.structuredDataName} - Play Room`}
        description={dictionary.seo.imposter.structuredDataDescription}
        url={canonicalUrl}
        category="Party Games"
        locale={locale}
      />
    </div>
  );
}
