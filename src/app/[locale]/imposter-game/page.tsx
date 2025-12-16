import { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import StructuredData from "@/components/StructuredData";
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

  const canonicalPath = "/imposter-game";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.imposter.title,
    description: dictionary.seo.imposter.description,
    keywords: dictionary.seo.imposter.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.imposter.title,
      description: dictionary.seo.imposter.description,
      type: "article",
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
      title: dictionary.seo.imposter.title,
      description: dictionary.seo.imposter.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function ImposterGamePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const content = imposterContent[locale] ?? imposterContent.en;

  const canonicalPath = "/imposter-game";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const homeUrl = buildCanonicalUrl(locale, "/");
  const homeLabel = dictionary.navigation.items.find((item) => item.key === "home")?.title ?? "Home";

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: homeLabel, url: homeUrl },
          { name: dictionary.pages.imposter.title, url: canonicalUrl },
        ]}
      />

      <main className="max-w-4xl mx-auto px-6 py-8 bg-white">
        <section className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {locale === "en" ? "Ready to play?" : "¿Listo para jugar?"}
          </h2>
          <p className="text-gray-700 mb-4 text-sm">
            {locale === "en"
              ? "Open this page on your phone and tap below to launch a clean, mobile-friendly room view for your next imposter round."
              : "Abre esta página en tu móvil y pulsa abajo para abrir una vista limpia y lista para tu próxima ronda de impostor."}
          </p>
          <Link
            href={buildLocalePath(locale, "/imposter-game/play/")}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {locale === "en" ? "Start imposter game" : "Empezar juego del impostor"}
          </Link>
        </section>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {dictionary.pages.imposter.title}
          </h1>
          <p className="text-gray-700">
            {dictionary.pages.imposter.description}
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.whatIsTitle}</h2>
          <p className="text-gray-700 mb-3">{content.whatIsIntro}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {content.whatIsBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.rulesTitle}</h2>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{content.setupTitle}</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
            {content.setupSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{content.playTitle}</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {content.playSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.rolesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.roles.map((role) => (
              <article key={role.title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{role.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{role.description}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {role.tagline}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.wordsTitle}</h2>
          <p className="text-gray-700 mb-4">{content.wordsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.wordGroups.map((group) => (
              <div key={group.title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{group.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-700 mt-4">
            {content.generatorHint.before}{" "}
            <Link
              href={buildLocalePath(locale, "/")}
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              {content.generatorHint.linkText}
            </Link>{" "}
            {content.generatorHint.after}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.useCasesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.useCases.map((useCase) => (
              <article key={useCase.title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {useCase.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <FAQStructuredData items={content.faq ?? []} />
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{content.faqTitle}</h2>
          <div className="space-y-4">
            {content.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-800 mb-1">{item.question}</h3>
                <p className="text-gray-700 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {content.ctaTitle}
          </h2>
          <p className="text-gray-700 mb-3">
            {content.ctaDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={buildLocalePath(locale, "/")}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href={buildLocalePath(locale, "/how-to-use/")}
              className="inline-flex items-center rounded-md border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </section>
      </main>

      <StructuredData
        type="Article"
        name={dictionary.seo.imposter.structuredDataName}
        description={dictionary.seo.imposter.structuredDataDescription}
        url={canonicalUrl}
        category="Party Games"
        locale={locale}
      />
    </div>
  );
}

const imposterContent = {
  en: {
    whatIsTitle: "What is the imposter game?",
    whatIsIntro:
      "The imposter game is a social deduction party game where one or more players secretly receive a different word or role and everyone tries to spot who doesn’t quite fit.",
    whatIsBullets: [
      "Perfect for 4–12 players in living rooms, classrooms, or online calls.",
      "Inspired by games like “Who’s the Impostor?” and “Among Us in real life,” but fully screen-free.",
      "Easy to teach in under two minutes—great as an icebreaker before charades rounds.",
    ],
    rulesTitle: "Imposter game rules: quick start",
    setupTitle: "Setup",
    setupSteps: [
      "Choose a host who won’t play this round or can see everyone’s words.",
      "Pick a category such as foods, animals, or school subjects and prepare a word list.",
      "Select one or two imposter words that are similar but not identical to the main word.",
      "Deal one word face down to each player—most get the main word, imposters get the odd one.",
    ],
    playTitle: "How a round works",
    playSteps: [
      "Go around the circle and have each player describe their word in a single short clue.",
      "After everyone has spoken once, open a brief discussion where players can ask clarifying questions.",
      "Call for a vote: everyone points at who they think is the imposter on a countdown.",
      "Reveal the imposters’ cards. If the group guessed correctly, they win the round—otherwise, the imposters win.",
    ],
    rolesTitle: "Common roles and twists",
    roles: [
      {
        title: "Imposter",
        description:
          "Receives the odd word and tries to blend in with confident but vague clues.",
        tagline: "Bluff without over-explaining.",
      },
      {
        title: "Crew",
        description:
          "Holds the main word and listens closely for clues that don’t quite match.",
        tagline: "Notice tiny inconsistencies.",
      },
      {
        title: "Host",
        description:
          "Prepares word pairs, keeps time, and resolves ties during votes.",
        tagline: "Keep the game flowing.",
      },
    ],
    wordsTitle: "Imposter word and prompt ideas",
    wordsIntro:
      "Start with simple everyday concepts, then move to themed or question-based prompts once everyone understands the flow.",
    wordGroups: [
      {
        title: "Easy everyday pairs",
        items: [
          "Apple vs. Tomato",
          "Cat vs. Tiger",
          "Bus vs. Train",
          "Teacher vs. Principal",
          "Soccer vs. Basketball",
        ],
      },
      {
        title: "Party & classroom themes",
        items: [
          "Pizza vs. Lasagna",
          "Lion vs. Tiger",
          "Science vs. History",
          "Snowman vs. Santa",
          "Concert vs. Theatre",
        ],
      },
      {
        title: "Question prompts",
        items: [
          "“Describe your word without naming it.”",
          "“Say what time of day fits your word best.”",
          "“Explain where you would usually find your word.”",
          "“Give a clue using only one adjective.”",
          "“Say who likes your word the most.”",
        ],
      },
    ],
    generatorHint: {
      before: "Need more ideas?",
      linkText: "use the main charades generator",
      after: "to spin up extra words you can adapt into imposter pairs.",
    },
    useCasesTitle: "Where the imposter game works best",
    useCases: [
      {
        title: "Party warm-ups",
        items: [
          "Break the ice before longer board games or charades sessions.",
          "Run two fast rounds while guests are still arriving.",
          "Use themed word pairs that match your party (movies, holidays, or work jokes).",
        ],
      },
      {
        title: "Classroom activities",
        items: [
          "Reinforce vocabulary in language or ESL lessons.",
          "Practice descriptive sentences without writing on the board.",
          "Let students design their own safe word pairs as homework.",
        ],
      },
      {
        title: "Remote teams",
        items: [
          "Run quick rounds at the start of virtual stand-ups.",
          "Use chat or reactions for voting when cameras are off.",
          "Let different team members host and bring their own themes.",
        ],
      },
    ],
    faqTitle: "Imposter game FAQ",
    faq: [
      {
        question: "How many players do you need for the imposter game?",
        answer:
          "Four to twelve players works best. With fewer than four, it’s hard to hide the imposter; with more than twelve, split into two groups so everyone gets enough speaking time.",
      },
      {
        question: "Is the imposter game kid-friendly?",
        answer:
          "Yes—as long as you choose age-appropriate words. For younger kids, stick to animals, foods, and school objects, and keep descriptions simple.",
      },
      {
        question: "What’s the difference between this and charades?",
        answer:
          "Charades uses silent acting and guesses, while the imposter game focuses on short verbal clues and social deduction. You can easily use the same word lists for both activities.",
      },
    ],
    ctaTitle: "Ready to host your first imposter round?",
    ctaDescription:
      "Start with a handful of simple word pairs, then switch over to charades once everyone is warmed up.",
    ctaPrimary: "Open the charades generator",
    ctaSecondary: "See the full charades guide",
  },
  es: {
    whatIsTitle: "¿Qué es el juego del impostor?",
    whatIsIntro:
      "El juego del impostor es un juego de deducción social donde una o varias personas reciben una palabra distinta y el grupo intenta descubrir quién no encaja del todo.",
    whatIsBullets: [
      "Ideal para 4–12 participantes en salones, aulas o videollamadas.",
      "Inspirado en juegos como “Quién es el impostor” o “Among Us en la vida real”, pero sin pantallas.",
      "Se explica en menos de dos minutos, perfecto como rompehielos antes de las charadas.",
    ],
    rulesTitle: "Reglas del juego del impostor (versión rápida)",
    setupTitle: "Preparación",
    setupSteps: [
      "Elige una persona anfitriona que no juegue esa ronda o que pueda ver todas las palabras.",
      "Escoge una categoría (comidas, animales, asignaturas) y prepara una lista de palabras.",
      "Selecciona una o dos palabras de impostor que sean parecidas pero no iguales a la palabra principal.",
      "Reparte una palabra boca abajo a cada jugador: la mayoría recibe la palabra principal y uno o dos reciben la palabra distinta.",
    ],
    playTitle: "Cómo se juega una ronda",
    playSteps: [
      "Pasad turno y que cada persona describa su palabra con una pista corta.",
      "Después de la primera vuelta, abre un breve debate donde se puedan hacer preguntas aclaratorias.",
      "Haz una votación: a la cuenta de tres, todos señalan a quien creen que es el impostor.",
      "Revela las cartas de impostor. Si el grupo acierta, gana; si no, ganan los impostores.",
    ],
    rolesTitle: "Roles y variaciones más comunes",
    roles: [
      {
        title: "Impostor",
        description:
          "Recibe la palabra diferente e intenta mezclarse con pistas seguras pero poco específicas.",
        tagline: "Engaña sin dar demasiados detalles.",
      },
      {
        title: "Grupo",
        description:
          "Tiene la palabra principal y escucha pistas que no terminan de encajar.",
        tagline: "Detecta las pequeñas incoherencias.",
      },
      {
        title: "Anfitrión",
        description:
          "Prepara parejas de palabras, controla el tiempo y resuelve empates en las votaciones.",
        tagline: "Mantén el ritmo de la partida.",
      },
    ],
    wordsTitle: "Ideas de palabras y prompts para impostor",
    wordsIntro:
      "Empieza con conceptos cotidianos sencillos y después pasa a temas o preguntas cuando el grupo ya entienda la dinámica.",
    wordGroups: [
      {
        title: "Pares cotidianos fáciles",
        items: [
          "Manzana vs. Tomate",
          "Gato vs. Tigre",
          "Autobús vs. Tren",
          "Profesor vs. Director",
          "Fútbol vs. Baloncesto",
        ],
      },
      {
        title: "Temas para fiestas y aulas",
        items: [
          "Pizza vs. Lasaña",
          "León vs. Tigre",
          "Ciencias vs. Historia",
          "Muñeco de nieve vs. Papá Noel",
          "Concierto vs. Teatro",
        ],
      },
      {
        title: "Prompts en forma de pregunta",
        items: [
          "“Describe tu palabra sin nombrarla.”",
          "“Di a qué hora del día encaja mejor tu palabra.”",
          "“Explica dónde se suele encontrar tu palabra.”",
          "“Da una pista usando solo un adjetivo.”",
          "“Cuenta quién disfruta más de tu palabra.”",
        ],
      },
    ],
    generatorHint: {
      before: "¿Necesitas más ideas?",
      linkText: "usa el generador principal de charadas",
      after: "para crear listas de palabras que luego puedas adaptar a parejas de impostor.",
    },
    useCasesTitle: "Dónde brilla el juego del impostor",
    useCases: [
      {
        title: "Arranques de fiesta",
        items: [
          "Rompe el hielo antes de juegos más largos o de las propias charadas.",
          "Juega un par de rondas mientras llegan todas las personas invitadas.",
          "Usa parejas de palabras que encajen con el tema de la fiesta (cine, Navidad, trabajo, etc.).",
        ],
      },
      {
        title: "Actividades en el aula",
        items: [
          "Refuerza vocabulario en clases de lengua o inglés.",
          "Practica descripciones orales sin necesidad de escribir en la pizarra.",
          "Deja que el alumnado invente sus propias parejas seguras como tarea.",
        ],
      },
      {
        title: "Equipos remotos",
        items: [
          "Haz rondas rápidas al inicio de dailies o retrospectivas.",
          "Usa chat o reacciones para votar cuando las cámaras estén apagadas.",
          "Deja que cada persona anfitriona traiga su propio tema de palabras.",
        ],
      },
    ],
    faqTitle: "Preguntas frecuentes sobre el juego del impostor",
    faq: [
      {
        question: "¿Cuántos jugadores se necesitan para el juego del impostor?",
        answer:
          "Lo ideal son entre cuatro y doce personas. Con menos de cuatro es difícil ocultar al impostor; con más de doce, mejor dividir en dos grupos para que todo el mundo pueda hablar.",
      },
      {
        question: "¿Es apto para niños?",
        answer:
          "Sí, siempre que elijas palabras apropiadas para su edad. Para peques, usa animales, comidas y objetos del colegio y mantén las descripciones sencillas.",
      },
      {
        question: "¿En qué se diferencia de las charadas?",
        answer:
          "En las charadas se actúa en silencio, mientras que el juego del impostor se basa en pistas habladas y deducción social. Puedes reutilizar las mismas listas de palabras para ambas actividades.",
      },
    ],
    ctaTitle: "¿Listo para tu primera ronda de impostor?",
    ctaDescription:
      "Empieza con unas pocas parejas sencillas y cambia a charadas cuando el grupo ya esté animado.",
    ctaPrimary: "Abrir el generador de charadas",
    ctaSecondary: "Ver la guía completa de charadas",
  },
} satisfies Record<Locale, {
  whatIsTitle: string;
  whatIsIntro: string;
  whatIsBullets: string[];
  rulesTitle: string;
  setupTitle: string;
  setupSteps: string[];
  playTitle: string;
  playSteps: string[];
  rolesTitle: string;
  roles: Array<{
    title: string;
    description: string;
    tagline: string;
  }>;
  wordsTitle: string;
  wordsIntro: string;
  wordGroups: Array<{
    title: string;
    items: string[];
  }>;
  generatorHint: {
    before: string;
    linkText: string;
    after: string;
  };
  useCasesTitle: string;
  useCases: Array<{
    title: string;
    items: string[];
  }>;
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
}>;
