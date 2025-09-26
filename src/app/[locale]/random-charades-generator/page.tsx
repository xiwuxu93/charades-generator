import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
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
    ? `${baseUrl}/random-charades-generator/`
    : `${baseUrl}/${locale}/random-charades-generator/`;

  return {
    title: dictionary.seo.random.title,
    description: dictionary.seo.random.description,
    keywords: dictionary.seo.random.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/random-charades-generator/`,
        'es': `${baseUrl}/es/random-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.random.title,
      description: dictionary.seo.random.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function RandomCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = randomContent[locale] ?? randomContent.en;

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/random-charades-generator/`
    : `${baseUrl}/${locale}/random-charades-generator/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.random.title}
        description={dictionary.pages.random.description}
        defaultCategory="all"
        defaultDifficulty="all"
        defaultAgeGroup="all"
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.random.structuredDataName}
        description={dictionary.seo.random.structuredDataDescription}
        url={canonicalUrl}
        category="Random Games"
      />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.differenceTitle}</h2>
          <p className="text-gray-600 mb-4">{copy.differenceLead}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            {copy.differenceBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-gray-600">
            {copy.differenceFooter.before}{" "}
            <Link href={copy.differenceFooter.href} className="text-indigo-600 hover:text-indigo-800 underline">
              {copy.differenceFooter.linkText}
            </Link>
            {copy.differenceFooter.after}
          </p>
        </section>

        <section className="bg-gradient-to-r from-indigo-100 to-sky-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.presetsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {copy.presets.map((preset) => (
              <div key={preset.title} className="bg-white/70 rounded-xl border border-indigo-200 p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">{preset.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{preset.description}</p>
                <p className="text-xs uppercase tracking-wider text-indigo-500 font-semibold">{preset.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.useCasesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {copy.useCases.map((column) => (
              <div key={column.title} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">{column.title}</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {column.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.tipsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.tips.map((tip) => (
              <div key={tip.title} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{tip.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {tip.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.faqTitle}</h2>
          <div className="space-y-4">
            {copy.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const randomContent = {
  en: {
    differenceTitle: "What makes Random mode different?",
    differenceLead:
      "Hit shuffle and the generator pulls fresh prompts from every category, difficulty, and age group—no two batches are ever the same.",
    differenceBullets: [
      "Uses the full 1000+ word bank with every click for genuine variety.",
      "Ignores theme filters by default so movie, Disney, actions, and seasonal prompts collide in one mix.",
      "Supports 1–50-word bursts, perfect for on-the-fly game packs or last-second tie breakers.",
      "Balances easy, medium, and hard ideas so mixed skill groups stay engaged.",
    ],
    differenceFooter: {
      before: "Need a curated experience instead? Jump back to the",
      linkText: "main charades generator",
      after: "for themed filters and age-specific lists.",
      href: "/",
    },
    presetsTitle: "Random shuffle presets",
    presets: [
      {
        title: "Single Surprise",
        description: "Generate one mystery prompt at a time for lightning rounds and tie-breakers.",
        note: "Keep everyone guessing",
      },
      {
        title: "5-Word Warm Up",
        description: "Queue a short batch to kick off game night or energize a work stand-up.",
        note: "Great for small teams",
      },
      {
        title: "50-Card Chaos Pack",
        description: "Build an entire night’s deck in one click—perfect for printing or saving to notes.",
        note: "Full-party arsenal",
      },
    ],
    useCasesTitle: "Where random mode shines",
    useCases: [
      {
        title: "Party openers",
        items: [
          "Icebreakers when guests first arrive",
          "Quick rounds between board games",
          "Late-night tie-breakers when scores are close",
        ],
      },
      {
        title: "Team building",
        items: [
          "Remote stand-ups that need energy",
          "Creative brainstorm warm-ups",
          "Cross-team mixers without awkward silences",
        ],
      },
      {
        title: "Classroom & youth groups",
        items: [
          "Drama class improv prompts",
          "Friday reward activities",
          "Youth group mixers that don't feel scripted",
        ],
      },
    ],
    tipsTitle: "Tips for maximum randomness",
    tips: [
      {
        title: "Keep it unpredictable",
        items: [
          "Leave filters on \"All\" to preserve the shuffle effect.",
          "Switch batch size every round so players can’t plan ahead.",
          "Use the custom amount input to surprise teams with mega-rounds.",
        ],
      },
      {
        title: "Mix with other modes",
        items: [
          "Start random, then jump to themed generators for finals.",
          "Pair random prompts with charade charlie cards or props for extra chaos.",
          "Let winners choose the next batch size to keep momentum high.",
        ],
      },
    ],
    faqTitle: "Random Generator FAQ",
    faq: [
      {
        question: "Does random mode repeat words?",
        answer:
          "We shuffle the entire database on every request. You may eventually see repeats in long sessions, but the pool is large enough that duplicates are rare in short games.",
      },
      {
        question: "Can I still filter categories?",
        answer:
          "Yes. The filters are optional—leave them on \"All\" for pure chaos, or narrow to a couple of categories if your group wants a gentle theme.",
      },
      {
        question: "What’s the best batch size for parties?",
        answer:
          "Try 10 words for warm-ups, 20 for standard rounds, and 50 if you want to print or save a full playlist for the night.",
      },
      {
        question: "How is this different from the homepage generator?",
        answer:
          "The homepage highlights curated themes. Random mode removes the guardrails so every click blends movies, actions, emojis, holidays, and more into one unpredictable list.",
      },
    ],
  },
  es: {
    differenceTitle: "¿Qué hace único al modo aleatorio?",
    differenceLead:
      "Pulsa mezclar y el generador trae palabras frescas de todas las categorías, dificultades y edades; ninguna tanda se repite.",
    differenceBullets: [
      "Usa el banco completo de más de 1000 palabras en cada clic para una verdadera variedad.",
      "Ignora los filtros temáticos por defecto, así películas, Disney, acciones y fiestas aparecen juntos.",
      "Permite ráfagas de 1 a 50 palabras, ideal para preparar partidas express o desempates sorpresa.",
      "Equilibra ideas fáciles, medias y difíciles para que grupos mixtos sigan enganchados.",
    ],
    differenceFooter: {
      before: "¿Prefieres una experiencia curada? Vuelve al",
      linkText: "generador principal de charadas",
      after: "para elegir filtros temáticos y listas por edades.",
      href: "/es/",
    },
    presetsTitle: "Presets de mezcla aleatoria",
    presets: [
      {
        title: "Sorpresa individual",
        description: "Genera un solo prompt misterioso para rondas relámpago o desempates.",
        note: "Mantén la intriga",
      },
      {
        title: "Calentamiento de 5 palabras",
        description: "Crea una tanda corta para iniciar la noche de juegos o animar una reunión.",
        note: "Ideal para equipos pequeños",
      },
      {
        title: "Paquete caos de 50",
        description: "Consigue un mazo completo en un clic: perfecto para imprimir o guardar en notas.",
        note: "Arsenal para toda la fiesta",
      },
    ],
    useCasesTitle: "Dónde brilla el modo aleatorio",
    useCases: [
      {
        title: "Arranques de fiesta",
        items: [
          "Rompehielos cuando llegan los invitados",
          "Rondas rápidas entre otros juegos",
          "Desempates nocturnos cuando el marcador está cerrado",
        ],
      },
      {
        title: "Team building",
        items: [
          "Daily stand-ups remotos con energía",
          "Calentamientos creativos para brainstorms",
          "Mixers entre áreas sin silencios incómodos",
        ],
      },
      {
        title: "Aulas y grupos juveniles",
        items: [
          "Improvisación en clases de teatro",
          "Actividad recompensa de viernes",
          "Dinámicas para grupos juveniles que no suenen guionadas",
        ],
      },
    ],
    tipsTitle: "Consejos para un caos máximo",
    tips: [
      {
        title: "Mantén la imprevisibilidad",
        items: [
          "Deja los filtros en \"Todo\" para conservar el efecto shuffle.",
          "Cambia el tamaño de la tanda en cada ronda para que nadie se anticipe.",
          "Usa la cantidad personalizada para sorprender con megarrondas.",
        ],
      },
      {
        title: "Combina con otros modos",
        items: [
          "Empieza aleatorio y termina con generadores temáticos para la final.",
          "Añade props o cartas impresas y duplica las carcajadas.",
          "Deja que el equipo ganador elija la siguiente tanda para mantener el ritmo.",
        ],
      },
    ],
    faqTitle: "Preguntas frecuentes del modo aleatorio",
    faq: [
      {
        question: "¿Repite palabras el modo aleatorio?",
        answer:
          "Barajamos toda la base en cada solicitud. Con sesiones muy largas podrías ver repeticiones, pero el pool es lo bastante grande como para que no se note en partidas cortas.",
      },
      {
        question: "¿Puedo seguir usando filtros?",
        answer:
          "Sí. Los filtros son opcionales: déjalos en \"Todo\" para caos puro o limita a ciertas categorías si tu grupo prefiere un hilo conductor.",
      },
      {
        question: "¿Cuál es el mejor tamaño de tanda?",
        answer:
          "Prueba con 10 palabras para calentar, 20 para rondas estándar y 50 si quieres imprimir o guardar una playlist completa.",
      },
      {
        question: "¿En qué se diferencia del generador principal?",
        answer:
          "La portada resalta temas curados. El modo aleatorio quita esas barandillas y mezcla películas, acciones, emojis, festividades y más en cada clic.",
      },
    ],
  },
} satisfies Record<Locale, {
  differenceTitle: string;
  differenceLead: string;
  differenceBullets: string[];
  differenceFooter: {
    before: string;
    linkText: string;
    after: string;
    href: string;
  };
  presetsTitle: string;
  presets: Array<{
    title: string;
    description: string;
    note: string;
  }>;
  useCasesTitle: string;
  useCases: Array<{
    title: string;
    items: string[];
  }>;
  tipsTitle: string;
  tips: Array<{
    title: string;
    items: string[];
  }>;
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}>;
