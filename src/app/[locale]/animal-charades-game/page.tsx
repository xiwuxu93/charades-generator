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

  const canonicalPath = "/animal-charades-game";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.animals.title,
    description: dictionary.seo.animals.description,
    keywords: dictionary.seo.animals.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.animals.title,
      description: dictionary.seo.animals.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.animals.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.animals.title,
      description: dictionary.seo.animals.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function AnimalCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = animalContent[locale] ?? animalContent.en;
  const initialWords = pickWords("animals", "all", "all", 3, locale);

  const canonicalPath = "/animal-charades-game";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return (
    <div className="bg-emerald-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.animals.title}
        description={dictionary.pages.animals.description}
        defaultCategory="animals"
        defaultDifficulty="all"
        defaultAgeGroup="all"
        hideCategoryFilter={true}
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.animals.structuredDataName}
        description={dictionary.seo.animals.structuredDataDescription}
        url={canonicalUrl}
        category="Family Games"
        locale={locale}
      />
      <FAQStructuredData items={copy.faq ?? []} />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-emerald-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{copy.introTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.introLead}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.introCards.map((card) => (
              <div key={card.title} className="p-4 rounded-lg" style={{ backgroundColor: card.background }}>
                <h3 className="font-semibold mb-2" style={{ color: card.headingColor }}>
                  {card.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: card.textColor }}>
                  {card.description}
                </p>
                <ul className="text-xs space-y-1" style={{ color: card.textColor }}>
                  {card.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.gameModesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {copy.gameModes.map((mode) => (
              <div key={mode.title} className="border border-emerald-200 rounded-lg p-4 bg-white">
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">{mode.title}</h3>
                <p className="text-sm text-gray-700 mb-3">{mode.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {mode.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.educatorTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.educatorTips.map((tip) => (
              <div key={tip.title} className="bg-white/80 border border-teal-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-teal-700 mb-2">{tip.title}</h3>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.resourcesTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.resourcesLead}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {copy.resourcesPrimary && (
              <Link
                href={copy.resourcesPrimary.href}
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                {copy.resourcesPrimary.label}
              </Link>
            )}
            <Link
              href={copy.resourcesSecondary.href}
              className="inline-flex items-center justify-center rounded-md border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              {copy.resourcesSecondary.label}
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
            {copy.rulesTitle}
          </h2>
          <p className="text-gray-700 mb-3">
            {copy.rulesDescription}
          </p>
          <Link
            href={buildLocalePath(locale, "/how-to-use/")}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {copy.rulesCta}
          </Link>
        </section>
      </div>
    </div>
  );
}

type AnimalContent = {
  introTitle: string;
  introLead: string;
  introCards: Array<{
    title: string;
    description: string;
    items: string[];
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  gameModesTitle: string;
  gameModes: Array<{
    title: string;
    description: string;
    items: string[];
  }>;
  educatorTitle: string;
  educatorTips: Array<{
    title: string;
    items: string[];
  }>;
  resourcesTitle: string;
  resourcesLead: string;
  resourcesPrimary: { label: string; href: string } | null;
  resourcesSecondary: { label: string; href: string };
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  rulesTitle: string;
  rulesDescription: string;
  rulesCta: string;
};

const animalContent: Record<Locale, AnimalContent> = {
  en: {
    introTitle: "Animal charades keeps every age roaring with laughter",
    introLead:
      "This animal charades generator covers pets, farm favourites, safari icons, and sea creatures so you can host a “guess that animal” showdown in minutes.",
    introCards: [
      {
        title: "Family favourite",
        description: "Mix easy pets with silly wild cards to keep every age engaged.",
        items: [
          "Great for rainy day cabin trips.",
          "Pairs well with bedtime story themes.",
          "Encourage siblings to co-act tricky animals.",
        ],
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#166534",
      },
      {
        title: "Classroom ready",
        description: "Ideal for ESL teachers, science units, and brain breaks.",
        items: [
          "Reinforces animal vocabulary and habitats.",
          "Supports movement while staying on lesson topic.",
          "Quickly adapts into guess-the-sound or drawing rounds.",
        ],
        background: "#e0f2fe",
        headingColor: "#0369a1",
        textColor: "#0369a1",
      },
    ],
    gameModesTitle: "Try these animal charades modes",
    gameModes: [
      {
        title: "Safari scramble",
        description: "Timed rounds where teams act three animals in sequence.",
        items: [
          "Assign one actor per animal to avoid collisions.",
          "Award bonus points for habitat clues woven into the mime.",
          "Use harder words like “platypus” for lightning rounds.",
        ],
      },
      {
        title: "Guess the pet",
        description: "Perfect for classrooms—students act out a secret class pet wish list.",
        items: [
          "Let guessers ask yes/no questions about fur, legs, or sound.",
          "Invite students to write persuasive letters for the pet they acted.",
          "Transition into a research mini-project by habitat or diet.",
        ],
      },
      {
        title: "Animal relay",
        description: "Line up teams and pass the acting baton down the row.",
        items: [
          "Each teammate adds one gesture without repeating previous moves.",
          "Last player guesses; if wrong, the other team can steal.",
          "Rotate lines so everyone tries each position.",
        ],
      },
    ],
    educatorTitle: "Educator & facilitator tips",
    educatorTips: [
      {
        title: "Connect to curriculum",
        items: [
          "After guessing, ask for one fact about the animal’s habitat or diet.",
          "Use the charades list as vocabulary flashcards later in the week.",
          "Map animals on a world map to reinforce geography lessons.",
        ],
      },
      {
        title: "Support mixed abilities",
        items: [
          "Offer animal picture cards alongside the prompt for visual learners.",
          "Let quieter students team up for shared acting roles.",
          "Switch to sound-only guessing rounds when energy dips.",
        ],
      },
    ],
    resourcesTitle: "Keep the animal theme going",
    resourcesLead:
      "Save your favourite prompts or switch to other categories once the animal trivia winds down.",
    resourcesPrimary: null,
    resourcesSecondary: {
      label: "Open random charades generator",
      href: "/random-charades-generator",
    },
    faqTitle: "Animal charades FAQ",
    faq: [
      {
        question: "How many animal prompts are included?",
        answer:
          "The generator includes over 150 animal prompts covering pets, farm animals, jungle creatures, ocean life, birds, reptiles, insects, and even mythical beasts for bonus rounds.",
      },
      {
        question: "What age range enjoys animal charades?",
        answer:
          "Young kids love the physical acting, but teens and adults have just as much fun when you add tougher animals or mash-ups like “penguin on a skateboard.”",
      },
      {
        question: "Can I use animal charades for language learning?",
        answer:
          "Absolutely. Cue the word in your target language, let students act it out, and then repeat the word together. ESL teachers often pair this with spelling bees or writing prompts.",
      },
      {
        question: "How can I make animal charades competitive?",
        answer:
          "Keep a scoreboard, award style points for creative acting, or run bracket-style playoffs. For advanced groups, require the actor to use only tail or wing gestures without full-body movement.",
      },
    ],
    rulesTitle: "Need a refresher on core charades rules?",
    rulesDescription:
      "Before you unleash the animal chaos, review the full charades rules so kids and adults all know how the game works.",
    rulesCta: "Open full charades guide",
  },
  es: {
    introTitle: "Charadas de animales: diversión garantizada para todas las edades",
    introLead:
      "Este generador de charadas de animales incluye mascotas, granja, fauna salvaje y criaturas marinas para que organices un reto “adivina el animal” en minutos.",
    introCards: [
      {
        title: "Favorito de la familia",
        description: "Combina mascotas fáciles con cartas salvajes para mantener la emoción.",
        items: [
          "Ideal para tardes lluviosas o viajes en cabaña.",
          "Puedes enlazarlo con cuentos antes de dormir.",
          "Permite que hermanxs actúen en dúo los animales más complejos.",
        ],
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#166534",
      },
      {
        title: "Listo para el aula",
        description: "Perfecto para docentes ESL, ciencias naturales y descansos activos.",
        items: [
          "Refuerza vocabulario de animales y sus hábitats.",
          "Mantiene al grupo en movimiento sin alejarse del tema.",
          "Se adapta fácil a rondas de sonidos o dibujos.",
        ],
        background: "#e0f2fe",
        headingColor: "#0369a1",
        textColor: "#0369a1",
      },
    ],
    gameModesTitle: "Modos de juego con charadas de animales",
    gameModes: [
      {
        title: "Safari relámpago",
        description: "Rondas cronometradas donde el equipo actúa tres animales seguidos.",
        items: [
          "Asignar un actor distinto por animal para evitar confusiones.",
          "Sumar puntos extra si integran pistas sobre el hábitat.",
          "Reservar animales difíciles como “ornitorrinco” para los desempates.",
        ],
      },
      {
        title: "Adivina la mascota",
        description: "Perfecto para clase: el grupo actúa una lista secreta de mascotas soñadas.",
        items: [
          "Permite preguntas de sí/no sobre pelo, patas o sonido.",
          "Invita a escribir cartas persuasivas para la mascota interpretada.",
          "Continúa con una mini investigación por hábitat o alimentación.",
        ],
      },
      {
        title: "Relevo animal",
        description: "Forma filas y pasa la actuación como una posta.",
        items: [
          "Cada integrante aporta un gesto nuevo sin repetir el anterior.",
          "La última persona adivina; si falla, el otro equipo puede robar el punto.",
          "Rota las posiciones para que todo el mundo pruebe cada rol.",
        ],
      },
    ],
    educatorTitle: "Consejos para docentes y facilitadores",
    educatorTips: [
      {
        title: "Conecta con el currículo",
        items: [
          "Tras adivinar, pide un dato sobre hábitat o alimentación.",
          "Usa la lista como tarjetas de vocabulario el resto de la semana.",
          "Ubica cada animal en el mapa mundi para reforzar geografía.",
        ],
      },
      {
        title: "Apoya diversidad de habilidades",
        items: [
          "Ofrece tarjetas con imágenes junto a la palabra para quienes prefieren visuales.",
          "Permite que estudiantes más tímidos actúen en pareja.",
          "Cuando baje la energía, cambia a rondas usando solo sonidos.",
        ],
      },
    ],
    resourcesTitle: "Sigue con la temática animal",
    resourcesLead:
      "Guarda tus prompts favoritos o cambia de categoría cuando se agote la trivia animal.",
    resourcesPrimary: null,
    resourcesSecondary: {
      label: "Usar el generador aleatorio",
      href: "/es/random-charades-generator",
    },
    faqTitle: "Preguntas frecuentes sobre charadas de animales",
    faq: [
      {
        question: "¿Cuántos prompts de animales incluye?",
        answer:
          "El generador ofrece más de 150 animales entre mascotas, granja, selva, océano, aves, reptiles, insectos e incluso criaturas míticas para rondas bonus.",
      },
      {
        question: "¿Qué edades disfrutan más la dinámica?",
        answer:
          "La infancia se divierte con el movimiento, pero adolescentes y adultos también se enganchan cuando agregas animales difíciles o combinaciones locas como “pingüino en patinete”.",
      },
      {
        question: "¿Sirve para aprendizaje de idiomas?",
        answer:
          "Claro. Presenta la palabra en el idioma meta, deja que el grupo la actúe y repítanla en voz alta. Docentes de ESL suelen complementarlo con dictados o escritura creativa.",
      },
      {
        question: "¿Cómo hago el juego más competitivo?",
        answer:
          "Lleva marcador, premia la creatividad o arma playoffs. Para grupos avanzados, limita los gestos a cola o alas sin usar todo el cuerpo.",
      },
    ],
    rulesTitle: "¿Quieres repasar las reglas básicas?",
    rulesDescription:
      "Antes de convertir el aula en una selva, revisa la guía completa de charadas para que peques y adultos tengan claras las reglas.",
    rulesCta: "Ver guía completa de charadas",
  },
};
