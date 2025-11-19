import { Metadata } from "next";
import Link from "next/link";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";
import { buildLocalePath } from "@/utils/localePaths";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Online & Zoom Charades Guide – Remote Game Ideas",
    description:
      "How to run charades over Zoom and online meetings using the random and reverse charades generators.",
  },
  es: {
    title: "Guía de charadas online y por Zoom",
    description:
      "Cómo organizar charadas en Zoom o videollamadas usando los modos aleatorio y reverse del generador.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const meta = metaByLocale[locale] ?? metaByLocale.en;

  const canonicalPath = "/online-charades-guide";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function OnlineCharadesGuidePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEn = locale === "en";

  const t = isEn
    ? {
        heading: "Online & Zoom charades guide",
        intro:
          "Run charades over video calls without awkward silence. These formats rely on our random and reverse generators to keep remote teams engaged.",
        section1Title: "Basic tech setup",
        section1Steps: [
          "Ask everyone to join with cameras on and mics muted by default.",
          "Choose a host to share a timer and manage the charades word generator.",
          "Decide whether actors or guessers will be on the spotlight video tile.",
          "Share simple rules in chat before the first round starts.",
        ],
        section2Title: "Recommended online formats",
        formats: [
          {
            title: "Classic Zoom charades",
            items: [
              "Use the random charades generator and copy prompts into a private host chat.",
              "Spotlight the actor; the rest guesses in voice or chat.",
              "Rotate host duties every few rounds so different people manage the prompts.",
            ],
          },
          {
            title: "Reverse charades for loud teams",
            items: [
              "Put the single guesser on spotlight while everyone else acts in gallery view.",
              "Share the word only with actors using private chat or a backchannel.",
              "Keep rounds short (30–45 seconds) to avoid video lag fatigue.",
            ],
          },
        ],
        section3Title: "Tips for remote teams",
        tips: [
          "Use reactions or emojis when someone guesses correctly.",
          "Encourage props within camera frame instead of big physical movement.",
          "Record one highlight round (with consent) to replay at the next retro.",
        ],
        randomLabel: "Open random charades generator",
        reverseLabel: "Open reverse charades game",
        hubLabel: "Read the full charades rules",
      }
    : {
        heading: "Guía de charadas online y por Zoom",
        intro:
          "Organiza charadas por videollamada sin silencios incómodos. Estos formatos se apoyan en los modos aleatorio y reverse para mantener al equipo atento.",
        section1Title: "Configuración técnica básica",
        section1Steps: [
          "Pide que todas las personas conecten cámara y mantengan el micrófono en mute por defecto.",
          "Elige a una persona anfitriona para compartir temporizador y manejar el generador.",
          "Acordad si se mostrará en foco quien actúa o quien adivina.",
          "Envía las reglas básicas por chat antes de la primera ronda.",
        ],
        section2Title: "Formatos recomendados online",
        formats: [
          {
            title: "Charadas clásicas en Zoom",
            items: [
              "Usa el generador aleatorio y copia los prompts a un chat privado del anfitrión.",
              "Pon en foco a la persona que actúa; el resto adivina con voz o chat.",
              "Rota el rol de host cada pocas rondas para que varias personas manejen las cartas.",
            ],
          },
          {
            title: "Reverse charades para equipos ruidosos",
            items: [
              "Pon en foco a quien adivina mientras el resto actúa en vista de galería.",
              "Comparte la palabra solo con quienes actúan usando chat privado.",
              "Mantén rondas cortas (30–45 segundos) para evitar fatiga de pantalla.",
            ],
          },
        ],
        section3Title: "Consejos para equipos remotos",
        tips: [
          "Usa reacciones o emojis cuando alguien acierte.",
          "Anima al uso de props dentro del encuadre en lugar de movimientos grandes.",
          "Graba una ronda destacada (con permiso) para verla en la próxima retrospectiva.",
        ],
        randomLabel: "Abrir generador aleatorio",
        reverseLabel: "Abrir reverse charades",
        hubLabel: "Ver guía completa de charadas",
      };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.heading}</h1>
      <p className="text-gray-700 mb-8">{t.intro}</p>

      <section className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t.section1Title}</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {t.section1Steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.section2Title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.formats.map((format) => (
            <article key={format.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{format.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {format.items.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t.section3Title}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {t.tips.map((tip: string) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-indigo-100 bg-indigo-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {isEn ? "Jump into online-ready generators" : "Abre los generadores listos para online"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.randomLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/random-charades-generator/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open random mode" : "Abrir modo aleatorio"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.reverseLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/reverse-charades-game/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open reverse charades" : "Abrir reverse charades"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.hubLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/how-to-use/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "View rules & tips" : "Ver reglas y consejos"}
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}

