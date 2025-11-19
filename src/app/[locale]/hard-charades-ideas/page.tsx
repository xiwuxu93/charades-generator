import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import FAQStructuredData from "@/components/FAQStructuredData";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pickWords } from "@/utils/charades";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";
import { buildLocalePath } from "@/utils/localePaths";

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

  const canonicalPath = "/hard-charades-ideas";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.hard.title,
    description: dictionary.seo.hard.description,
    keywords: dictionary.seo.hard.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.hard.title,
      description: dictionary.seo.hard.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.hard.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.hard.title,
      description: dictionary.seo.hard.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function HardCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = hardContent[locale] ?? hardContent.en;
  const initialWords = pickWords("all", "hard", "all", 3, locale);

  const canonicalPath = "/hard-charades-ideas";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return (
    <div className="bg-slate-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.hard.title}
        description={dictionary.pages.hard.description}
        defaultCategory="all"
        defaultDifficulty="hard"
        defaultAgeGroup="adults"
        hideAgeGroupFilter={false}
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.hard.structuredDataName}
        description={dictionary.seo.hard.structuredDataDescription}
        url={canonicalUrl}
        category="Party Games"
        locale={locale}
      />
      <FAQStructuredData items={copy.faq ?? []} />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-slate-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{copy.introTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.introLead}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {copy.introBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.categoriesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {copy.categories.map((category) => (
              <div key={category.title} className="bg-slate-900 text-slate-100 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-sm mb-2">{category.description}</p>
                <ul className="space-y-1 text-xs text-slate-200">
                  {category.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.hostTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.hostTips.map((tip) => (
              <div key={tip.title} className="bg-white border border-slate-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{tip.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {tip.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.variantsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.variants.map((variant) => (
              <div key={variant.title} className="border border-slate-200 rounded-lg p-4 bg-white">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{variant.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{variant.description}</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  {variant.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            {copy.variantsFooter.before}{" "}
            <Link href={copy.variantsFooter.href} className="text-indigo-600 hover:text-indigo-800 underline">
              {copy.variantsFooter.linkText}
            </Link>{" "}
            {copy.variantsFooter.after}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.faqTitle}</h2>
          <div className="space-y-4">
            {copy.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {copy.rulesCtaTitle}
          </h2>
          <p className="text-gray-700 mb-3">
            {copy.rulesCtaDescription}
          </p>
          <Link
            href={buildLocalePath(locale, "/how-to-use/")}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {copy.rulesCtaLabel}
          </Link>
        </section>
      </div>
    </div>
  );
}

const hardContent = {
  en: {
    introTitle: "Hard charades ideas for players who’ve seen everything",
    introLead:
      "Level up your next game night with multi-word mashups, abstract concepts, and niche pop culture references that reward clever acting.",
    introBullets: [
      "Perfect for veteran charades crews who need fresh chaos.",
      "Pairs with tournaments, office championships, or trivia crossovers.",
      "Includes compound phrases, idioms, and lightning-round curveballs.",
      "Easy to mix with the main generator once you want a breather.",
    ],
    categoriesTitle: "Hard charades prompt buckets",
    categories: [
      {
        title: "Abstract actions",
        description: "Ideas that require storytelling, not just gestures.",
        items: ["Winning an imaginary argument", "Forgetting why you entered a room", "Explaining quantum physics to a toddler"],
      },
      {
        title: "Pop culture deep cuts",
        description: "References your group will either love or fake their way through.",
        items: ["That one scene from Inception", "A viral dance from five years ago", "The villain monologue everyone quotes"],
      },
      {
        title: "Impossible combos",
        description: "Two concepts mashed together for maximum chaos.",
        items: ["Astronaut doing yoga", "Penguin hosting a cooking show", "Vampire stuck in rush hour traffic"],
      },
    ],
    hostTitle: "Host strategies for advanced rounds",
    hostTips: [
      {
        title: "Set expectations",
        items: [
          "Explain that partially correct guesses still earn clues—keep momentum high.",
          "Allow the actor to break the phrase into parts (first word, second word) before acting the whole thing.",
          "Encourage props or quick costume swaps if you’re playing at home.",
        ],
      },
      {
        title: "Keep scoring fair",
        items: [
          "Award style points for jaw-dropping physical comedy.",
          "Add bonus cards worth double if guessed within 30 seconds.",
          "Rotate judges when disputes arise so everyone stays invested.",
        ],
      },
    ],
    variantsTitle: "Challenge modes to try",
    variants: [
      {
        title: "Two-actor tag team",
        description: "Pair players and let them swap the spotlight mid-clue.",
        items: [
          "After 30 seconds, the partner must take over instantly.",
          "Great for mash-up prompts that need multiple gestures.",
          "Keep score of successful tag assists for bragging rights.",
        ],
      },
      {
        title: "Lightning gauntlet",
        description: "Guess five hard charades ideas in 90 seconds.",
        items: [
          "Only the first correct guess counts—no repeats.",
          "Use this to settle ties or crown the night’s MVP.",
          "Record the streak on your scoreboard to track personal bests.",
        ],
      },
    ],
    variantsFooter: {
      before: "Need to cool down after the gauntlet?",
      linkText: "Switch to the random charades generator",
      after: "for a lighter mix before the night wraps.",
      href: "/random-charades-generator",
    },
    faqTitle: "Hard charades FAQ",
    faq: [
      {
        question: "How do I make charades harder without frustrating people?",
        answer:
          "Mix in difficult prompts gradually. Start with one hard card per round, then increase as teams warm up. Give actors limited verbal cues like “two words” or “movie quote” to keep things achievable.",
      },
      {
        question: "Can I pre-build a deck of hard charades ideas?",
        answer:
          "Yes. Generate 30–40 words, copy the list, and drop it into a doc or printable cards. Organise them by theme—abstract, pop culture, combos—so you can escalate difficulty.",
      },
      {
        question: "What’s the best scoring system for advanced players?",
        answer:
          "Use standard points for correct answers, bonus points for under-30-second guesses, and subtract a point for skipped cards. Decide the rules up front and track them on our Quick-Play Kit sheets.",
      },
      {
        question: "Can these prompts work in reverse charades?",
        answer:
          "Definitely. Reverse charades plus hard prompts equals hilarious chaos—just brief the acting squad so they plan a multi-step approach before the timer starts.",
      },
    ],
    rulesCtaTitle: "Need to align on rules before going hard mode?",
    rulesCtaDescription:
      "When prompts get tricky, clear rules keep the night fun instead of frustrating. Review the standard charades guide before cranking difficulty up.",
    rulesCtaLabel: "Open full charades guide",
  },
  es: {
    introTitle: "Ideas difíciles para charadas cuando ya dominas el juego",
    introLead:
      "Eleva tu próxima noche de charadas con mezclas de varias palabras, conceptos abstractos y referencias pop que premian la actuación creativa.",
    introBullets: [
      "Perfecto para grupos veteranos que necesitan caos fresco.",
      "Funciona con torneos, dinámicas corporativas o noches de trivia.",
      "Incluye frases compuestas, modismos y cartas relámpago retadoras.",
      "Puedes volver al generador principal cuando quieras un respiro.",
    ],
    categoriesTitle: "Bloques de prompts avanzados",
    categories: [
      {
        title: "Acciones abstractas",
        description: "Ideas que exigen narrativa, no solo gestos.",
        items: ["Ganar una discusión imaginaria", "Olvidar por qué entraste a la habitación", "Explicar física cuántica a un niño"],
      },
      {
        title: "Referencias pop",
        description: "Guiños que tu grupo amará o fingirá entender.",
        items: ["Esa escena de Inception", "Un baile viral de hace cinco años", "El monólogo del villano que todos citan"],
      },
      {
        title: "Combinaciones imposibles",
        description: "Dos conceptos mezclados para máxima locura.",
        items: ["Astronauta haciendo yoga", "Pingüino conduciendo un programa de cocina", "Vampiro atrapado en hora pico"],
      },
    ],
    hostTitle: "Estrategias de anfitrión para rondas extremas",
    hostTips: [
      {
        title: "Define expectativas",
        items: [
          "Explica que los aciertos parciales siguen sumando pistas, así mantienes el ritmo.",
          "Permite dividir la frase (primera palabra, segunda palabra) antes de actuarla completa.",
          "Anima a usar props o cambios rápidos de vestuario si juegan en casa.",
        ],
      },
      {
        title: "Mantén la puntuación justa",
        items: [
          "Otorga puntos de estilo por actuación épica.",
          "Añade cartas bonus que valen doble si se aciertan en menos de 30 segundos.",
          "Rota a las personas jueces cuando haya dudas para que todos sigan involucrados.",
        ],
      },
    ],
    variantsTitle: "Modos de reto que puedes probar",
    variants: [
      {
        title: "Tag team de dos actores",
        description: "Forma parejas y deja que intercambien el protagonismo a mitad de pista.",
        items: [
          "Tras 30 segundos, la pareja debe continuar sin pausa.",
          "Ideal para cartas mixtas que requieren varios gestos.",
          "Lleva registro de asistencias exitosas para presumir al final.",
        ],
      },
      {
        title: "Guante relámpago",
        description: "Adivina cinco ideas difíciles en 90 segundos.",
        items: [
          "Solo cuenta el primer acierto; no se repiten cartas.",
          "Úsalo para desempates o coronar a la persona MVP.",
          "Apunta el récord en el marcador para futuras revanchas.",
        ],
      },
    ],
    variantsFooter: {
      before: "¿Necesitas bajar la intensidad?",
      linkText: "Pasa al generador aleatorio de charadas",
      after: "y mezcla prompts más ligeros antes de cerrar la noche.",
      href: "/es/random-charades-generator",
    },
    faqTitle: "Preguntas frecuentes sobre charadas difíciles",
    faq: [
      {
        question: "¿Cómo hago el juego más difícil sin frustrar al grupo?",
        answer:
          "Introduce cartas difíciles poco a poco. Empieza con una por ronda y aumenta conforme calientan motores. Permite pistas verbales mínimas como “dos palabras” o “frase” para mantenerlo jugable.",
      },
      {
        question: "¿Puedo preparar un mazo avanzado con anticipación?",
        answer:
          "Sí. Genera 30-40 palabras, copia la lista y pégala en un documento o cartas imprimibles. Ordénalas por tema (abstractas, pop, combinadas) para escalar dificultad.",
      },
      {
        question: "¿Qué sistema de puntos recomiendas?",
        answer:
          "Usa puntos estándar por acierto, bonus por adivinar en menos de 30 segundos y resta un punto por cartas saltadas. Deja claras las reglas al inicio y apóyate en las hojas del Quick-Play Kit.",
      },
      {
        question: "¿Sirven estos prompts para reverse charades?",
        answer:
          "Totalmente. Reverse charades sumado a cartas difíciles genera caos hilarante, solo pide al equipo actor que planifique un guion rápido antes de iniciar el cronómetro.",
      },
    ],
    rulesCtaTitle: "¿Quieres alinear reglas antes del modo experto?",
    rulesCtaDescription:
      "Cuando las cartas se complican, tener reglas claras evita frustraciones. Revisa la guía general de charadas antes de subir la dificultad.",
    rulesCtaLabel: "Ver guía completa de charadas",
  },
} satisfies Record<
  Locale,
  {
    introTitle: string;
    introLead: string;
    introBullets: string[];
    categoriesTitle: string;
    categories: Array<{ title: string; description: string; items: string[] }>;
    hostTitle: string;
    hostTips: Array<{ title: string; items: string[] }>;
    variantsTitle: string;
    variants: Array<{ title: string; description: string; items: string[] }>;
    variantsFooter: { before: string; linkText: string; after: string; href: string };
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
    rulesCtaTitle: string;
    rulesCtaDescription: string;
    rulesCtaLabel: string;
  }
>;
