import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import Link from "next/link";
import { Metadata } from "next";
import { pickWords } from "@/utils/charades";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
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

  const canonicalPath = "/movie-charades-generator";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const homeUrl = buildCanonicalUrl(locale, "/");

  return {
    title: dictionary.seo.movies.title,
    description: dictionary.seo.movies.description,
    keywords: dictionary.seo.movies.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.movies.title,
      description: dictionary.seo.movies.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.movies.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.movies.title,
      description: dictionary.seo.movies.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function MovieCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = movieContent[locale] ?? movieContent.en;
  const initialWords = pickWords("movies", "medium", "all", 3, locale);

  const canonicalPath = "/movie-charades-generator";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);
  const homeUrl = buildCanonicalUrl(locale, "/");

  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData
        items={[
          { name: locale === 'en' ? 'Home' : 'Inicio', url: homeUrl },
          { name: dictionary.pages.movies.title, url: canonicalUrl },
        ]}
      />
      <CharadesGeneratorOptimized
        title={dictionary.pages.movies.title}
        description={dictionary.pages.movies.description}
        defaultCategory="movies"
        defaultDifficulty="medium"
        defaultAgeGroup="all"
        hideCategoryFilter={true}
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.movies.structuredDataName}
        description={dictionary.seo.movies.structuredDataDescription}
        url={canonicalUrl}
        category="Movie Games"
        locale={locale}
      />
      <FAQStructuredData items={copy.faq ?? []} />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.partyTitle}</h2>
          <p className="text-gray-600 mb-4">
            {copy.partyDescription.before}{" "}
            <Link href={copy.partyDescription.href} className="text-blue-600 hover:text-blue-800 underline">
              {copy.partyDescription.linkText}
            </Link>
            {copy.partyDescription.after}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.partyColumns.map((column) => (
              <div key={column.title} className="p-4 rounded-lg" style={{ backgroundColor: column.background }}>
                <h3 className="font-semibold mb-2" style={{ color: column.headingColor }}>
                  {column.title}
                </h3>
                <ul className="text-sm space-y-1" style={{ color: column.textColor }}>
                  {column.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.categoriesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {copy.categories.map((card) => (
              <div key={card.title} className="text-center p-4 rounded-lg" style={{ backgroundColor: card.background }}>
                <h3 className="font-semibold mb-2" style={{ color: card.headingColor }}>
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: card.textColor }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.tipsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.tips.actingHeadingColor }}>
                {copy.tips.actingTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.tips.actingItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.tips.guessingHeadingColor }}>
                {copy.tips.guessingTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.tips.guessingItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{copy.faqTitle}</h2>
          <div className="space-y-4">
            {copy.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
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

        <section className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{locale === 'en' ? 'Keep exploring' : 'Sigue explorando'}</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href={buildLocalePath(locale, "/word-charades-generator/")}
              className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-gray-800 hover:bg-gray-100">
              {locale === 'en' ? 'Word Generator' : 'Generador de palabras'}
            </Link>
            <Link href={buildLocalePath(locale, "/reverse-charades-game/")}
              className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-gray-800 hover:bg-gray-100">
              {locale === 'en' ? 'Reverse charades' : 'Reverse charades'}
            </Link>
            <Link href={buildLocalePath(locale, "/how-to-use/")}
              className="inline-flex items-center rounded-md border border-gray-300 px-2 py-1 text-gray-800 hover:bg-gray-100">
              {locale === 'en' ? 'How to play' : 'Cómo jugar'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const movieContent = {
  en: {
    partyTitle: "Perfect for Movie Night Parties",
    partyDescription: {
      before: "Beyond movies? Discover our",
      linkText: "complete charades generator",
      after: "featuring books, TV shows, animals, actions, and dozens of other entertaining categories so you can build the ultimate charades movie game lineup.",
      href: "/",
    },
    partyColumns: [
      {
        title: "Hollywood Blockbusters",
        items: [
          "Classic action movies and superhero films",
          "Romantic comedies and drama favorites",
          "Horror movies and thriller classics",
          "Animation and family-friendly films",
        ],
        background: "#eff6ff",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
      {
        title: "Film Charades Events",
        items: [
          "Movie night party entertainment",
          "Cinema-themed birthday parties",
          "Film buff gatherings and trivia nights",
          "Award show viewing parties",
        ],
        background: "#fee2e2",
        headingColor: "#b91c1c",
        textColor: "#b91c1c",
      },
    ],
    categoriesTitle: "What's Included in Movie Charades",
    categories: [
      {
        title: "Classic Movies",
        description: "Timeless films from Hollywood's golden age to modern classics",
        background: "#ede9fe",
        headingColor: "#6b21a8",
        textColor: "#6b21a8",
      },
      {
        title: "Popular Blockbusters",
        description: "Recent hits and box office favorites everyone knows",
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#166534",
      },
      {
        title: "Animated Films",
        description: "Family favorites from Disney, Pixar, and animation studios",
        background: "#ffedd5",
        headingColor: "#9a3412",
        textColor: "#9a3412",
      },
    ],
    tipsTitle: "How to Act Out Movie Titles",
    tips: {
      actingTitle: "Acting Techniques:",
      actingItems: [
        "Act out iconic scenes from the movie",
        "Show the movie genre first (action, romance, etc.)",
        "Use character gestures and mannerisms",
        "Recreate memorable movie moments",
        "Show the movie's emotional tone",
      ],
      actingHeadingColor: "#1d4ed8",
      guessingTitle: "Guessing Strategy:",
      guessingItems: [
        "Think about popular movies from different decades",
        "Consider the actor's famous roles",
        "Look for genre clues in the performance",
        "Pay attention to the number of words shown",
        "Ask about specific movie elements",
      ],
      guessingHeadingColor: "#1e293b",
    },
    faqTitle: "Movie Charades FAQ",
    faq: [
      {
        question: "How many movie titles are in your database?",
        answer:
          "Our movie charades generator includes 200+ carefully selected film titles spanning from classic Hollywood movies to modern blockbusters across all genres including action, comedy, drama, horror, and animation.",
      },
      {
        question: "Are these movies suitable for all ages?",
        answer:
          "Yes! Our movie charades collection includes family-friendly options perfect for all ages, with popular animated films, classic comedies, and well-known movies that everyone can enjoy and recognize.",
      },
      {
        question: "Can I use this for movie-themed parties?",
        answer:
          "Absolutely! Movie charades is perfect for film-themed parties, movie night entertainment, cinema birthday celebrations, and any gathering where movie lovers come together for fun.",
      },
      {
        question: "What types of movies are included?",
        answer:
          "Our database covers action movies, romantic comedies, animated films, horror classics, sci-fi blockbusters, drama favorites, superhero movies, and timeless cinema classics from every era.",
      },
    ],
    rulesTitle: "Need a refresher on charades rules?",
    rulesDescription:
      "If some players are new to charades, walk them through the basic rules and variations before you start your movie rounds.",
    rulesCta: "View full charades rules",
  },
  es: {
    partyTitle: "Ideal para noches de cine",
    partyDescription: {
      before: "¿Quieres más que películas? Descubre nuestro",
      linkText: "generador completo de charadas",
      after: "con libros, series, animales, acciones y decenas de categorías para armar el mejor juego de charadas de películas.",
      href: "/es/",
    },
    partyColumns: [
      {
        title: "Estrenos y éxitos",
        items: [
          "Películas de acción y superhéroes",
          "Comedias románticas y dramas",
          "Terror clásico y thrillers",
          "Animación y cine familiar",
        ],
        background: "#eff6ff",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
      {
        title: "Eventos cinéfilos",
        items: [
          "Entretenimiento para noches de película",
          "Cumpleaños temáticos de cine",
          "Reuniones de amantes del séptimo arte",
          "Fiestas para ver premiaciones",
        ],
        background: "#fee2e2",
        headingColor: "#b91c1c",
        textColor: "#b91c1c",
      },
    ],
    categoriesTitle: "Qué incluye nuestro charadas de cine",
    categories: [
      {
        title: "Clásicos",
        description: "Películas inolvidables desde la época dorada hasta la actualidad",
        background: "#ede9fe",
        headingColor: "#6b21a8",
        textColor: "#6b21a8",
      },
      {
        title: "Taquillazos",
        description: "Éxitos recientes y favoritos de la taquilla que todos conocen",
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#166534",
      },
      {
        title: "Animación",
        description: "Favoritas de Disney, Pixar y estudios de animación",
        background: "#ffedd5",
        headingColor: "#9a3412",
        textColor: "#9a3412",
      },
    ],
    tipsTitle: "Cómo actuar títulos de películas",
    tips: {
      actingTitle: "Técnicas de actuación:",
      actingItems: [
        "Recrea escenas icónicas de la película",
        "Muestra primero el género (acción, romance, etc.)",
        "Usa gestos y manerismos de los personajes",
        "Representa momentos memorables",
        "Transmite el tono emocional del film",
      ],
      actingHeadingColor: "#1d4ed8",
      guessingTitle: "Estrategias para adivinar:",
      guessingItems: [
        "Piensa en películas populares de distintas décadas",
        "Recuerda los papeles famosos del actor",
        "Detecta pistas de género en la interpretación",
        "Observa cuántas palabras indica el actor",
        "Pregunta por elementos específicos de la trama",
      ],
      guessingHeadingColor: "#1e293b",
    },
    faqTitle: "Preguntas frecuentes sobre charadas de cine",
    faq: [
      {
        question: "¿Cuántos títulos tienen?",
        answer:
          "El generador cuenta con más de 200 películas cuidadosamente seleccionadas, desde clásicos de Hollywood hasta estrenos modernos de acción, comedia, drama, terror y animación.",
      },
      {
        question: "¿Son aptas para todas las edades?",
        answer:
          "Sí. Incluimos opciones familiares, animación popular, comedias conocidas y películas que cualquier grupo reconocerá.",
      },
      {
        question: "¿Sirve para fiestas temáticas de cine?",
        answer:
          "Por supuesto. Es perfecto para reuniones cinéfilas, cumpleaños inspirados en el cine, noches de trivia y eventos durante entregas de premios.",
      },
      {
        question: "¿Qué géneros cubren?",
        answer:
          "Encontrarás acción, comedia romántica, animación, terror clásico, ciencia ficción, dramas, superhéroes y clásicos eternos de todas las épocas.",
      },
    ],
    rulesTitle: "¿Necesitas repasar las reglas de charadas?",
    rulesDescription:
      "Si hay personas nuevas en el juego, dedica un minuto a revisar las reglas básicas y las variantes antes de empezar las rondas de películas.",
    rulesCta: "Ver reglas completas de charadas",
  },
} satisfies Record<Locale, {
  partyTitle: string;
  partyDescription: {
    before: string;
    linkText: string;
    after: string;
    href: string;
  };
  partyColumns: Array<{
    title: string;
    items: string[];
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  categoriesTitle: string;
  categories: Array<{
    title: string;
    description: string;
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  tipsTitle: string;
  tips: {
    actingTitle: string;
    actingItems: string[];
    actingHeadingColor: string;
    guessingTitle: string;
    guessingItems: string[];
    guessingHeadingColor: string;
  };
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  rulesTitle: string;
  rulesDescription: string;
  rulesCta: string;
}>;
