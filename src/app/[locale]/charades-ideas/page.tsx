import Link from "next/link";
import { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import CharadesAudienceLists from "@/components/CharadesAudienceLists";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";
import { buildLocalePath } from "@/utils/localePaths";
import { trackEvent } from "@/lib/analytics";

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

  const canonicalPath = "/charades-ideas";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.ideas.title,
    description: dictionary.seo.ideas.description,
    keywords: dictionary.seo.ideas.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.ideas.title,
      description: dictionary.seo.ideas.description,
      type: "article",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.ideas.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.ideas.title,
      description: dictionary.seo.ideas.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function CharadesIdeasPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = ideasContent[locale] ?? ideasContent.en;

  const canonicalPath = "/charades-ideas";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const homeUrl = buildCanonicalUrl(locale, "/");
  const homeLabel =
    dictionary.navigation.items.find((item) => item.key === "home")?.title ??
    (locale === "es" ? "Inicio" : "Home");

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: homeLabel, url: homeUrl },
          { name: dictionary.pages.ideas.title, url: canonicalUrl },
        ]}
      />

      <StructuredData
        type="Article"
        name={dictionary.seo.ideas.structuredDataName}
        description={dictionary.seo.ideas.structuredDataDescription}
        url={canonicalUrl}
        category="Charades Ideas"
        locale={locale}
      />

      <FAQStructuredData items={copy.faq} />

      <div className="max-w-4xl mx-auto px-6 pb-10 pt-8">
        <section className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em]">
            {copy.tagline}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            {dictionary.pages.ideas.title}
          </h1>
          <p className="mt-3 text-gray-700">{copy.introLead}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={buildLocalePath(locale, "/")}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {copy.primaryCta}
            </Link>
            <a
              href="#word-lists"
              className="inline-flex items-center justify-center rounded-md border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              {copy.secondaryCta}
            </a>
          </div>
        </section>

        <CharadesAudienceLists
          locale={locale}
          title={copy.audienceSectionTitle}
          description={copy.audienceSectionDescription}
          audiences={copy.audiences}
        />

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {copy.themesSectionTitle}
          </h2>
          <p className="text-gray-700 mb-4">{copy.themesSectionDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.themes.map((theme) => (
              <article
                key={theme.key}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 mb-1">
                  {theme.title}
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  {theme.description}
                </p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {copy.sampleLabel}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-3">
                  {theme.samples.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={buildLocalePath(locale, theme.href)}
                  className="inline-flex items-center text-sm font-semibold text-blue-600"
                >
                  {copy.themeCta}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {copy.generatorSectionTitle}
          </h2>
          <p className="text-gray-800 mb-3">{copy.generatorSectionDescription}</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-indigo-900">
            {copy.generatorTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <div className="mt-4">
            <Link
              href={buildLocalePath(locale, "/")}
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {copy.generatorCta}
            </Link>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {copy.faqTitle}
          </h2>
          <div className="space-y-4">
            {copy.faq.map((item) => (
              <article key={item.question}>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.question}
                </h3>
                <p className="text-gray-700 text-sm">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const ideasContent = {
  en: {
    tagline: "WORD LISTS & PROMPTS",
    introLead:
      "Grab ready-made charades ideas by audience, then open the generator when you want more words or custom mixes.",
    primaryCta: "Generate new charades words",
    secondaryCta: "See ready-made word lists",
    audienceSectionTitle: "Ready-made charades word lists",
    audienceSectionDescription:
      "Use these lists as-is for a quick game, or treat them as a starter pack before you build a custom batch in the generator.",
    audiences: [
      {
        key: "kids",
        title: "Charades ideas for kids",
        description:
          "Short, visual prompts that are easy to act and safe for classrooms or family nights.",
        items: [
          "Brushing your teeth",
          "Feeding a pet",
          "Flying like a bird",
          "Baking cookies",
          "Riding a bike",
          "Sneezing loudly",
          "Opening a birthday present",
          "Walking through sticky mud",
          "Building a snowman",
          "Blowing up a balloon",
        ],
      },
      {
        key: "adults",
        title: "Funny charades ideas for adults",
        description:
          "Relatable, slightly chaotic scenarios that work well for office parties or late-night game nights.",
        items: [
          "Forgetting your online meeting is unmuted",
          "Trying to remember a password",
          "Carrying way too many grocery bags",
          "Arguing with a navigation app",
          "Realising your camera was on the whole time",
          "Spilling coffee on important papers",
          "Trying to open a stubborn jar",
          "Dancing when you think nobody is watching",
        ],
      },
      {
        key: "family",
        title: "Family charades ideas",
        description:
          "Mixed-age prompts that everyone from grandparents to teens can enjoy.",
        items: [
          "Setting up a picnic",
          "Taking a family photo",
          "Camping in a tent",
          "Singing happy birthday",
          "Playing hide and seek",
          "Teaching someone to ride a bike",
          "Roasting marshmallows",
          "Putting up holiday decorations",
        ],
      },
      {
        key: "classroom",
        title: "Classroom & ESL charades ideas",
        description:
          "Action-focused prompts that double as vocabulary practice in SEL or language lessons.",
        items: [
          "Raising your hand to ask a question",
          "Looking for a lost pencil",
          "Reading a very exciting book",
          "Whispering a secret to a friend",
          "Packing a school bag",
          "Waiting for the school bus",
          "Answering a tricky test question",
          "Trying not to fall asleep in class",
        ],
      },
    ],
    themesSectionTitle: "Charades ideas by theme",
    themesSectionDescription:
      "If your group already has a favorite vibe, start with a themed bank here and expand it in the matching generator page.",
    sampleLabel: "Sample prompts",
    themeCta: "Open themed generator",
    themes: [
      {
        key: "movies",
        title: "Movie charades ideas",
        href: "/movie-charades-generator/",
        description:
          "Great for film nights and movie marathons where everyone loves quoting scenes.",
        samples: [
          "Running from a dinosaur",
          "Winning an Oscar",
          "Escaping from a haunted house",
          "Sneaking into the cinema",
        ],
      },
      {
        key: "disney",
        title: "Disney charades ideas",
        href: "/disney-charades-generator/",
        description:
          "Magical prompts pulled from beloved characters, locations, and songs.",
        samples: [
          "Flying on a magic carpet",
          "Losing a glass slipper",
          "Talking to forest animals",
          "Lifting a lion cub on a rock",
        ],
      },
      {
        key: "christmas",
        title: "Christmas charades ideas",
        href: "/christmas-charades-generator/",
        description:
          "Festive prompts that work for December family gatherings and office parties.",
        samples: [
          "Decorating a Christmas tree",
          "Sledding down a snowy hill",
          "Wrapping presents in a hurry",
          "Drinking hot chocolate by the fire",
        ],
      },
      {
        key: "reverse",
        title: "Reverse charades ideas",
        href: "/reverse-charades-game/",
        description:
          "Team-based actions that are especially funny when everyone acts at once.",
        samples: [
          "Riding a roller coaster",
          "Acting out a rock band",
          "Being stuck in an elevator",
          "Pretending the floor is lava",
        ],
      },
    ],
    generatorSectionTitle: "Use the generator to build bigger lists",
    generatorSectionDescription:
      "Once you’ve tested a few of these ideas, the generator helps you extend sessions without running out of cards.",
    generatorTips: [
      "Start with a small batch (10–15 words) to see what your group enjoys before generating more.",
      "Switch categories, difficulty, or age group between rounds to keep the energy from getting stale.",
      "Use the copy button on the homepage generator to paste word lists into Notes, Docs, or chat apps.",
    ],
    generatorCta: "Open generator and create a batch",
    faqTitle: "Charades ideas & word list FAQ",
    faq: [
      {
        question: "How many charades ideas do I need for one game night?",
        answer:
          "For a short 20–30 minute game, plan on 15–25 prompts. For a longer family night or party, 40–60 prompts spread across themes gives you enough variety without repeating too often.",
      },
      {
        question: "Can I print these charades word lists?",
        answer:
          "Yes. You can copy any list on this page into a document to print, or use the generator’s copy button to export the exact batch you want to a notes app or PDF before printing.",
      },
      {
        question: "What’s the difference between “ideas” pages and the generator?",
        answer:
          "Ideas pages offer curated, ready-made lists you can use immediately. The generator, on the other hand, lets you filter by category, difficulty, and age group to create unlimited new combinations whenever you need more words.",
      },
      {
        question: "Where do I find more themed charades ideas?",
        answer:
          "Use the theme cards above to jump into focused generators like movies, Disney, Christmas, kids, or hard charades. Each themed page includes its own examples plus a tuned generator preset.",
      },
    ],
  },
  es: {
    tagline: "LISTAS DE PALABRAS E IDEAS",
    introLead:
      "Aquí encontrarás ideas de charadas listas para usar según el tipo de grupo. Cuando necesites más variedad, abre el generador para crear tandas nuevas.",
    primaryCta: "Generar nuevas palabras de charadas",
    secondaryCta: "Ver listas ya preparadas",
    audienceSectionTitle: "Listas de palabras para charadas",
    audienceSectionDescription:
      "Usa estas listas tal cual para una partida rápida o como base antes de crear tandas personalizadas en el generador.",
    audiences: [
      {
        key: "kids",
        title: "Ideas de charadas para niños",
        description:
          "Pistas cortas y visuales, fáciles de actuar y seguras para aulas o noches familiares.",
        items: [
          "Cepillarse los dientes",
          "Dar de comer a una mascota",
          "Volar como un pájaro",
          "Hornear galletas",
          "Montar en bicicleta",
          "Estornudar muy fuerte",
          "Abrir un regalo de cumpleaños",
          "Caminar por barro pegajoso",
          "Construir un muñeco de nieve",
          "Inflar un globo",
        ],
      },
      {
        key: "adults",
        title: "Ideas divertidas para adultos",
        description:
          "Situaciones cotidianas algo caóticas que funcionan bien en fiestas de oficina o noches de juego.",
        items: [
          "Olvidar que el micrófono está abierto",
          "Intentar recordar una contraseña",
          "Cargar demasiadas bolsas de la compra",
          "Discutir con la app de navegación",
          "Descubrir que la cámara estuvo encendida",
          "Derramar café sobre papeles importantes",
          "Intentar abrir un frasco muy duro",
          "Bailar cuando crees que nadie te ve",
        ],
      },
      {
        key: "family",
        title: "Ideas de charadas en familia",
        description:
          "Prompts que funcionan con personas mayores, adolescentes y peques en la misma mesa.",
        items: [
          "Preparar un picnic",
          "Tomar una foto familiar",
          "Acampar en una tienda",
          "Cantar cumpleaños feliz",
          "Jugar a las escondidas",
          "Enseñar a alguien a montar en bici",
          "Tostar malvaviscos",
          "Colocar decoraciones de fiesta",
        ],
      },
      {
        key: "classroom",
        title: "Ideas de charadas para el aula",
        description:
          "Pistas basadas en acciones que sirven como práctica de vocabulario en clases de lengua o SEL.",
        items: [
          "Levantar la mano para hacer una pregunta",
          "Buscar un lápiz perdido",
          "Leer un libro muy emocionante",
          "Susurrar un secreto a un compañero",
          "Preparar la mochila escolar",
          "Esperar el autobús del colegio",
          "Responder una pregunta difícil del examen",
          "Luchar por no dormirse en clase",
        ],
      },
    ],
    themesSectionTitle: "Ideas de charadas por temática",
    themesSectionDescription:
      "Si tu grupo ya tiene un tema favorito, empieza por una banca temática aquí y luego amplíala en la página de generador correspondiente.",
    sampleLabel: "Ejemplos de prompts",
    themeCta: "Abrir generador temático",
    themes: [
      {
        key: "movies",
        title: "Ideas de charadas de películas",
        href: "/movie-charades-generator/",
        description:
          "Perfectas para noches de cine y maratones de películas en casa.",
        samples: [
          "Huir de un dinosaurio",
          "Ganar un premio Óscar",
          "Escapar de una casa encantada",
          "Colarse en el cine sin hacer ruido",
        ],
      },
      {
        key: "disney",
        title: "Ideas de charadas Disney",
        href: "/disney-charades-generator/",
        description:
          "Prompts mágicos inspirados en personajes, lugares y canciones conocidas.",
        samples: [
          "Volar en una alfombra mágica",
          "Perder un zapato de cristal",
          "Hablar con animales del bosque",
          "Levantar a un cachorro de león en una roca",
        ],
      },
      {
        key: "christmas",
        title: "Ideas de charadas navideñas",
        href: "/christmas-charades-generator/",
        description:
          "Pistas festivas para reuniones familiares de diciembre y fiestas de oficina.",
        samples: [
          "Decorar el árbol de Navidad",
          "Bajar en trineo por una colina nevada",
          "Envolver regalos con prisa",
          "Beber chocolate caliente junto al fuego",
        ],
      },
      {
        key: "reverse",
        title: "Ideas para reverse charades",
        href: "/reverse-charades-game/",
        description:
          "Acciones pensadas para que todo el equipo actúe al mismo tiempo.",
        samples: [
          "Montar en montaña rusa",
          "Actuar como una banda de rock",
          "Quedarse atrapados en un ascensor",
          "Imaginar que el suelo es lava",
        ],
      },
    ],
    generatorSectionTitle: "Amplía las listas con el generador",
    generatorSectionDescription:
      "Cuando veas qué ideas funcionan con tu grupo, el generador te ayuda a extender la partida sin quedarte sin cartas.",
    generatorTips: [
      "Empieza con un lote pequeño (10–15 palabras) para probar qué gusta antes de generar más.",
      "Cambia de categoría, dificultad o público entre rondas para que la energía no caiga.",
      "Usa el botón de copiar en la página principal para pegar listas en notas, documentos o apps de chat.",
    ],
    generatorCta: "Abrir el generador y crear un lote",
    faqTitle: "Preguntas frecuentes sobre ideas y listas",
    faq: [
      {
        question: "¿Cuántas ideas de charadas necesito para una noche de juegos?",
        answer:
          "Para una partida corta de 20–30 minutos, bastan 15–25 prompts. Para una noche completa en familia o con amistades, prepara entre 40 y 60 palabras repartidas en varias temáticas.",
      },
      {
        question: "¿Puedo imprimir estas listas de palabras?",
        answer:
          "Sí. Puedes copiar cualquier lista de esta página a un documento para imprimirla o usar el botón de copiar del generador para exportar exactamente las palabras que quieras a una app de notas o PDF.",
      },
      {
        question: "¿En qué se diferencia esta página del generador?",
        answer:
          "Aquí encuentras listas curadas listas para jugar. El generador, en cambio, te permite filtrar por categoría, dificultad y público para crear combinaciones nuevas cada vez que necesites más palabras.",
      },
      {
        question: "¿Dónde encuentro más ideas temáticas de charadas?",
        answer:
          "Usa las tarjetas de temática de arriba para ir a generadores específicos como películas, Disney, Navidad, niños o charadas difíciles. Cada página incluye ejemplos propios y presets ajustados.",
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    tagline: string;
    introLead: string;
    primaryCta: string;
    secondaryCta: string;
    audienceSectionTitle: string;
    audienceSectionDescription: string;
    audiences: Array<{
      key: string;
      title: string;
      description: string;
      items: string[];
    }>;
    themesSectionTitle: string;
    themesSectionDescription: string;
    sampleLabel: string;
    themeCta: string;
    themes: Array<{
      key: string;
      title: string;
      href: string;
      description: string;
      samples: string[];
    }>;
    generatorSectionTitle: string;
    generatorSectionDescription: string;
    generatorTips: string[];
    generatorCta: string;
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
  }
>;
