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
    title: "Classroom Charades Guide – Activities for Teachers",
    description:
      "Classroom-friendly charades ideas, SEL twists, and management tips for teachers using the free charades generator.",
  },
  es: {
    title: "Guía de charadas en el aula – Ideas para docentes",
    description:
      "Ideas de charadas para clase, variantes SEL y consejos de gestión usando el generador gratuito de charadas.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const meta = metaByLocale[locale] ?? metaByLocale.en;

  const canonicalPath = "/classroom-charades-guide";
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

export default async function ClassroomCharadesGuidePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEn = locale === "en";

  const t = isEn
    ? {
        heading: "Classroom charades guide for teachers",
        intro:
          "Use charades as a quick brain break, vocabulary review, or SEL warm-up without losing classroom structure.",
        section1Title: "When classroom charades works best",
        section1Bullets: [
          "2–10 minute breaks between heavy subjects.",
          "End-of-week celebrations tied to curriculum themes.",
          "Language practice in ESL / EFL lessons.",
          "Drama, debate, or public speaking warm-ups.",
        ],
        section2Title: "Setup checklist for teachers",
        section2Steps: [
          "Decide your learning goal: vocabulary, emotions, teamwork, or just movement.",
          "Open the kids or animals charades generator and filter for age-appropriate prompts.",
          "Agree on a simple scoring system or play just for participation.",
          "Set clear noise and movement boundaries for the classroom space.",
        ],
        section3Title: "Sample classroom formats",
        columnA: {
          title: "5-minute brain break",
          items: [
            "Generate 8–10 kid-friendly prompts.",
            "Pick 2–3 volunteers per round; the rest guess from their seats.",
            "Wrap up by asking students to use one acted word in a sentence.",
          ],
        },
        columnB: {
          title: "Vocabulary reinforcement",
          items: [
            "Filter prompts to the topic you are teaching (animals, professions, emotions).",
            "After each correct guess, write the word on the board and underline key syllables.",
            "Ask one follow-up: definition, synonym, or example sentence.",
          ],
        },
        section4Title: "Link to other classroom resources",
        kidsLabel: "Kids charades generator",
        kidsDesc: "Child-friendly prompts for family nights and school groups.",
        randomLabel: "Random charades generator",
        randomDesc: "Mix all categories for reward rounds or end-of-term parties.",
        hubLabel: "Charades rules & full guide",
        hubDesc: "Review the core rules so students focus on learning, not mechanics.",
      }
    : {
        heading: "Guía de charadas en el aula para docentes",
        intro:
          "Usa charadas como descanso activo, repaso de vocabulario o calentamiento SEL sin perder el orden del grupo.",
        section1Title: "Cuándo funciona mejor en clase",
        section1Bullets: [
          "Pausas de 2–10 minutos entre materias exigentes.",
          "Cierres de semana ligados a temas del currículo.",
          "Práctica de idioma en clases de inglés o segunda lengua.",
          "Calentamiento para teatro, debate o exposiciones orales.",
        ],
        section2Title: "Checklist de preparación",
        section2Steps: [
          "Define el objetivo: vocabulario, emociones, trabajo en equipo o solo movimiento.",
          "Abre el generador infantil o de animales y filtra por edad adecuada.",
          "Acordad un sistema sencillo de puntos o juega solo por participación.",
          "Marca límites claros de ruido y movimiento dentro del aula.",
        ],
        section3Title: "Formatos de clase que puedes probar",
        columnA: {
          title: "Pausa activa de 5 minutos",
          items: [
            "Genera 8–10 prompts aptos para niños.",
            "Elige 2–3 voluntarios por ronda; el resto adivina desde su lugar.",
            "Cierra pidiendo una oración usando una de las palabras actuadas.",
          ],
        },
        columnB: {
          title: "Refuerzo de vocabulario",
          items: [
            "Filtra por el tema que estén estudiando (animales, profesiones, emociones).",
            "Tras cada acierto, escribe la palabra en la pizarra y resalta sílabas clave.",
            "Pide una definición, sinónimo o ejemplo en contexto.",
          ],
        },
        section4Title: "Enlaza con otros recursos",
        kidsLabel: "Generador infantil de charadas",
        kidsDesc: "Prompts aptos para peques en familia o en clase.",
        randomLabel: "Generador aleatorio de charadas",
        randomDesc: "Mezcla todas las categorías para rondas de premio o fiestas de curso.",
        hubLabel: "Reglas y guía completa de charadas",
        hubDesc: "Revisa las reglas base para que el foco esté en el aprendizaje, no en la mecánica.",
      };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.heading}</h1>
      <p className="text-gray-700 mb-8">{t.intro}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t.section1Title}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {t.section1Bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t.section2Title}</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {t.section2Steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.section3Title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[t.columnA, t.columnB].map((col) => (
            <div key={col.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{col.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-indigo-100 bg-indigo-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.section4Title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.kidsLabel}</h3>
            <p className="text-xs text-gray-700 mb-3">{t.kidsDesc}</p>
            <Link
              href={buildLocalePath(locale, "/charades-generator-for-kids/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open kids generator" : "Abrir generador infantil"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.randomLabel}</h3>
            <p className="text-xs text-gray-700 mb-3">{t.randomDesc}</p>
            <Link
              href={buildLocalePath(locale, "/random-charades-generator/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open random mode" : "Abrir modo aleatorio"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.hubLabel}</h3>
            <p className="text-xs text-gray-700 mb-3">{t.hubDesc}</p>
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

