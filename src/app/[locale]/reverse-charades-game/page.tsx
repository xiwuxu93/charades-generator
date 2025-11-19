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

  const canonicalPath = "/reverse-charades-game";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.reverse.title,
    description: dictionary.seo.reverse.description,
    keywords: dictionary.seo.reverse.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.reverse.title,
      description: dictionary.seo.reverse.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.reverse.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.reverse.title,
      description: dictionary.seo.reverse.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function ReverseCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = reverseContent[locale] ?? reverseContent.en;
  const initialWords = pickWords("all", "medium", "all", 3, locale);

  const canonicalPath = "/reverse-charades-game";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const quickPlayHref = locale === "en" ? "/quick-play-kit" : `/${locale}/quick-play-kit`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.reverse.title}
        description={dictionary.pages.reverse.description}
        defaultCategory="all"
        defaultDifficulty="medium"
        defaultAgeGroup="all"
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.reverse.structuredDataName}
        description={dictionary.seo.reverse.structuredDataDescription}
        url={canonicalUrl}
        category="Team Games"
        locale={locale}
      />
      <FAQStructuredData items={copy.faq ?? []} />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.introTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.introLead}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {copy.introBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.rulesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{copy.rulesSetupTitle}</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {copy.rulesSetupSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{copy.rulesPlayTitle}</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {copy.rulesPlaySteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.teamTipsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.teamTips.map((column) => (
              <div key={column.title} className="bg-white/80 border border-indigo-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">{column.title}</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {column.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{copy.resourcesTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.resourcesDescription}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={quickPlayHref}
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              {copy.resourcesPrimaryCta}
            </Link>
            <Link
              href={locale === "en" ? "/charades-generator-for-kids" : `/${locale}/charades-generator-for-kids`}
              className="inline-flex items-center justify-center rounded-md border border-green-500 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
            >
              {copy.resourcesSecondaryCta}
            </Link>
          </div>
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

const reverseContent = {
  en: {
    introTitle: "Why reverse charades is the loudest party upgrade",
    introLead:
      "Reverse charades flips the classic format: the entire team performs the clue while one teammate guesses. It’s perfect when a search for “reverse charades game” really means “how do I keep a big group moving?”",
    introBullets: [
      "Great for 6–24 players who love acting together.",
      "Removes stage fright—no one performs alone.",
      "Keeps the pace fast because actors can riff off each other.",
      "Team energy makes even tough prompts easier to solve.",
    ],
    rulesTitle: "Reverse charades game plan",
    rulesSetupTitle: "Setup (2 minutes)",
    rulesSetupSteps: [
      "Split everyone into teams of 3–8 players and agree on 60-second rounds.",
      "Choose the first guesser for each team; the rest will act together.",
      "Use the generator to create a batch of 20–30 prompts and keep them hidden.",
      "Decide on steal rules: can opposing teams shout the answer for a bonus?",
    ],
    rulesPlayTitle: "During play",
    rulesPlaySteps: [
      "Actors sneak a look at the prompt, huddle for five silent seconds, then start miming.",
      "Guessers can ask yes/no questions, but actors must stay silent—only gestures allowed.",
      "If the guesser stalls, allow a single “tap out” where another teammate takes over guessing.",
      "Rotate guessers each round so everyone experiences both roles before regenerating words.",
    ],
    teamTipsTitle: "Team tweaks that keep rounds memorable",
    teamTips: [
      {
        title: "Large group hosting",
        items: [
          "Keep a scoreboard visible for the whole room (whiteboard or shared doc).",
          "Schedule a hydration or snack break every three rounds to reset the hype.",
          "Use the Quick-Play Kit timer sheet so captains know when to swap roles.",
        ],
      },
      {
        title: "Prompt strategy",
        items: [
          "Tag prompts by difficulty and shuffle in a hard word every other round.",
          "Mark any “tricky to act” cards for the bonus lightning round at the end.",
          "Save a final mega-card where both teams act simultaneously for double points.",
        ],
      },
    ],
    resourcesTitle: "Helpful printables for team play",
    resourcesDescription:
      "Need a scoreboard, gesture legend, or quick rule reminder? Our Quick-Play Kit handles the admin work so you can focus on high-energy rounds.",
    resourcesPrimaryCta: "Download Quick-Play Kit",
    resourcesSecondaryCta: "Need kids prompts instead?",
    faqTitle: "Reverse charades FAQ",
    faq: [
      {
        question: "What’s the main difference between reverse charades and classic charades?",
        answer:
          "In reverse charades, everyone except one teammate acts. The guesser has to decode the group’s combined gestures, which keeps shy players comfortable and makes the room louder—in the best way.",
      },
      {
        question: "How many prompts should I prepare for a reverse charades game?",
        answer:
          "Plan for 6–8 prompts per team per match. A 20-word batch covers four rounds comfortably, while 40 words support a full tournament with playoffs.",
      },
      {
        question: "What are the best prompts for reverse charades?",
        answer:
          "Choose clues with distinct actions or visual hooks—movie titles, professions, animals, and emotions work well. Toss in a few hard charades ideas as bonus cards to keep things competitive.",
      },
      {
        question: "Can reverse charades work with remote or hybrid teams?",
        answer:
          "Yes. Share the prompt privately with in-room actors, place remote teammates on the guessing side, and use our copy-to-clipboard button to send fresh words into chat without revealing them.",
      },
    ],
    rulesCtaTitle: "Need classic charades rules too?",
    rulesCtaDescription:
      "If some players are brand new to charades, quickly walk through the standard rules before switching into the louder reverse mode.",
    rulesCtaLabel: "Open full charades guide",
  },
  es: {
    introTitle: "Por qué reverse charades sube el volumen de cualquier fiesta",
    introLead:
      "Reverse charades invierte el formato clásico: todo el equipo actúa y una sola persona adivina. Ideal cuando buscas “reverse charades” porque necesitas dinamizar grupos grandes sin nervios escénicos.",
    introBullets: [
      "Perfecto para 6 a 24 participantes que disfrutan actuar en conjunto.",
      "Elimina la timidez: nadie se queda solo frente al público.",
      "La ronda avanza rápido porque las personas se apoyan mutuamente.",
      "La energía grupal hace más fáciles incluso las pistas difíciles.",
    ],
    rulesTitle: "Plan maestro para reverse charades",
    rulesSetupTitle: "Preparación (2 minutos)",
    rulesSetupSteps: [
      "Divide en equipos de 3 a 8 personas y acuerda rondas de 60 segundos.",
      "Elige a la primera persona que adivinará en cada equipo; el resto actuará junto.",
      "Genera un lote de 20-30 palabras y mantenlas ocultas hasta cada turno.",
      "Define si los equipos rivales pueden robar el punto al acertar primero.",
    ],
    rulesPlayTitle: "Durante la partida",
    rulesPlaySteps: [
      "Quienes actúan leen la palabra, planean en silencio cinco segundos y empiezan a mimar.",
      "La persona que adivina puede hacer preguntas de sí/no, pero nadie debe hablar ni hacer sonidos.",
      "Si el adivinador se bloquea, permite un único “tap out” para cambiar de rol.",
      "Rota a quien adivina cada ronda para que todas las personas vivan ambos papeles antes de generar nuevas cartas.",
    ],
    teamTipsTitle: "Consejos para equipos imparables",
    teamTips: [
      {
        title: "Gestión de grupos grandes",
        items: [
          "Mantén un marcador visible (pizarra o documento compartido).",
          "Programa un descanso breve cada tres rondas para recuperar energía.",
          "Usa las plantillas del Quick-Play Kit para coordinar temporizadores y roles.",
        ],
      },
      {
        title: "Estrategia con prompts",
        items: [
          "Etiqueta las cartas por dificultad e intercala una difícil cada dos rondas.",
          "Reserva las palabras más complejas para una ronda relámpago de bonos.",
          "Cierra con una mega carta donde ambos equipos actúan a la vez por puntos dobles.",
        ],
      },
    ],
    resourcesTitle: "Recursos útiles para equipos",
    resourcesDescription:
      "¿Necesitas marcador, leyenda de gestos o recordatorio de reglas? El Quick-Play Kit se encarga de la logística para que te concentres en la energía del grupo.",
    resourcesPrimaryCta: "Descargar Quick-Play Kit",
    resourcesSecondaryCta: "¿Buscas prompts infantiles?",
    faqTitle: "Preguntas frecuentes sobre reverse charades",
    faq: [
      {
        question: "¿Cuál es la diferencia clave entre reverse charades y charadas clásicas?",
        answer:
          "En reverse charades todo el equipo actúa y solo una persona adivina. Así reduces la timidez individual, subes el volumen del grupo y mantienes la atención concentrada en cada pista.",
      },
      {
        question: "¿Cuántas palabras preparo para reverse charades?",
        answer:
          "Calcula 6-8 prompts por equipo para un encuentro corto. Un lote de 20 palabras rinde cuatro rondas; con 40 cubres un torneo con semifinales y final.",
      },
      {
        question: "¿Qué tipo de prompts funcionan mejor?",
        answer:
          "Elige pistas con acciones claras o referencias visuales: películas, profesiones, animales y emociones son apuestas seguras. Añade algunas ideas difíciles como cartas bonus para quienes buscan reto extra.",
      },
      {
        question: "¿Reverse charades sirve en equipos remotos o híbridos?",
        answer:
          "Sí. Comparte el prompt en privado con quienes actúan en sala, deja que las personas remotas adivinen y usa el botón de copiar lista para enviar palabras frescas por chat sin revelar la carta.",
      },
    ],
    rulesCtaTitle: "¿También necesitas las reglas clásicas?",
    rulesCtaDescription:
      "Si hay personas nuevas en el juego, repasa rápido las reglas de charadas tradicionales antes de pasar al modo más ruidoso de reverse charades.",
    rulesCtaLabel: "Abrir guía completa de charadas",
  },
} satisfies Record<
  Locale,
  {
    introTitle: string;
    introLead: string;
    introBullets: string[];
    rulesTitle: string;
    rulesSetupTitle: string;
    rulesSetupSteps: string[];
    rulesPlayTitle: string;
    rulesPlaySteps: string[];
    teamTipsTitle: string;
    teamTips: Array<{ title: string; items: string[] }>;
    resourcesTitle: string;
    resourcesDescription: string;
    resourcesPrimaryCta: string;
    resourcesSecondaryCta: string;
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
    rulesCtaTitle: string;
    rulesCtaDescription: string;
    rulesCtaLabel: string;
  }
>;
