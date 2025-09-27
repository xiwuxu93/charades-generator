import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { Metadata } from "next";
import { pickWords } from "@/utils/charades";
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
    ? `${baseUrl}/disney-charades-generator/`
    : `${baseUrl}/${locale}/disney-charades-generator/`;

  return {
    title: dictionary.seo.disney.title,
    description: dictionary.seo.disney.description,
    keywords: dictionary.seo.disney.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/disney-charades-generator/`,
        'es': `${baseUrl}/es/disney-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.disney.title,
      description: dictionary.seo.disney.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${baseUrl}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.disney.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.disney.title,
      description: dictionary.seo.disney.description,
      images: [`${baseUrl}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function DisneyCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = disneyContent[locale] ?? disneyContent.en;
  const initialWords = pickWords("disney", "medium", "all", 3, locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/disney-charades-generator/`
    : `${baseUrl}/${locale}/disney-charades-generator/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.disney.title}
        description={dictionary.pages.disney.description}
        defaultCategory="disney"
        defaultDifficulty="medium"
        defaultAgeGroup="all"
        hideCategoryFilter={true}
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.disney.structuredDataName}
        description={dictionary.seo.disney.structuredDataDescription}
        url={canonicalUrl}
        category="Disney Games"
        locale={locale}
      />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.partyTitle}</h2>
          <p className="text-gray-600 mb-4">
            {copy.partyDescription.before}{" "}
            <Link href={copy.partyDescription.href} className="text-purple-600 hover:text-purple-800 underline">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.charactersTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {copy.characters.map((card) => (
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

        <section className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.tipsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.tips.characterHeadingColor }}>
                {copy.tips.characterTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.tips.characterItems.map((item) => (
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
      </div>
    </div>
  );
}

const disneyContent = {
  en: {
    partyTitle: "Perfect for Disney Themed Parties",
    partyDescription: {
      before: "Love Disney but want even more options? Try our",
      linkText: "full charades generator",
      after: "with Disney plus hundreds of other categories including animals, movies, and books.",
      href: "/",
    },
    partyColumns: [
      {
        title: "Disney Birthday Parties",
        items: [
          "Princess themed birthday celebrations",
          "Disney character costume parties",
          "Frozen and Elsa themed events",
          "Mickey Mouse clubhouse parties",
        ],
        background: "#f3e8ff",
        headingColor: "#7e22ce",
        textColor: "#6b21a8",
      },
      {
        title: "Family Disney Fun",
        items: [
          "Disney movie night entertainment",
          "Disney World trip preparation games",
          "Family Disney trivia nights",
          "Disney vacation planning activities",
        ],
        background: "#fdf2f8",
        headingColor: "#be185d",
        textColor: "#be185d",
      },
    ],
    charactersTitle: "Disney Characters & Movies Included",
    characters: [
      {
        title: "Disney Princesses",
        description: "Elsa, Anna, Moana, Belle, Ariel, Cinderella, and more magical princesses",
        background: "#dbeafe",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
      {
        title: "Classic Characters",
        description: "Mickey Mouse, Donald Duck, Goofy, Pluto, and timeless Disney favorites",
        background: "#fee2e2",
        headingColor: "#b91c1c",
        textColor: "#b91c1c",
      },
      {
        title: "Disney Movies",
        description: "Lion King, Toy Story, Finding Nemo, Frozen, and beloved animated classics",
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#166534",
      },
    ],
    tipsTitle: "How to Act Out Disney Characters",
    tips: {
      characterTitle: "Character Acting:",
      characterItems: [
        "Use signature gestures (Elsa's ice magic)",
        "Show character emotions and personality",
        "Act out famous Disney movie scenes",
        "Use distinctive character mannerisms",
        "Show the character's special powers",
      ],
      characterHeadingColor: "#be185d",
      guessingTitle: "Disney Guessing Tips:",
      guessingItems: [
        "Think about Disney movie themes",
        "Consider character relationships",
        "Look for princess or villain clues",
        "Remember Disney animal characters",
        "Think classic vs modern Disney",
      ],
      guessingHeadingColor: "#7e22ce",
    },
    faqTitle: "Disney Charades FAQ",
    faq: [
      {
        question: "How many Disney characters are included?",
        answer:
          "Our Disney charades generator includes 100+ beloved Disney characters and movies from classic animations to modern hits like Frozen, Moana, and Toy Story, covering princesses, villains, sidekicks, and iconic characters.",
      },
      {
        question: "Are these suitable for Disney-themed birthday parties?",
        answer:
          "Absolutely! Disney charades is perfect for princess parties, Mickey Mouse celebrations, Frozen-themed birthdays, and any Disney character party where kids and families want magical entertainment.",
      },
      {
        question: "Do you include both classic and modern Disney?",
        answer:
          "Yes! Our collection spans from classic Disney like Snow White and Mickey Mouse to modern favorites like Elsa, Moana, and characters from recent Disney and Pixar movies.",
      },
      {
        question: "Can adults enjoy Disney charades too?",
        answer:
          "Definitely! Disney charades appeals to all ages. Adults love acting out their childhood favorites, and the nostalgic characters create fun intergenerational entertainment for the whole family.",
      },
      {
        question: "What Disney movies are represented?",
        answer:
          "Our database includes characters and references from The Lion King, Frozen, Beauty and the Beast, The Little Mermaid, Toy Story, Finding Nemo, Moana, and many more Disney classics and recent releases.",
      },
    ],
  },
  es: {
    partyTitle: "Ideal para fiestas temáticas Disney",
    partyDescription: {
      before: "¿Amas Disney pero quieres todavía más ideas? Visita nuestro",
      linkText: "generador completo de charadas",
      after: "con Disney y cientos de categorías extra como animales, películas y libros.",
      href: "/es/",
    },
    partyColumns: [
      {
        title: "Cumpleaños Disney",
        items: [
          "Celebraciones con princesas",
          "Fiestas con disfraces de personajes",
          "Eventos temáticos de Frozen y Elsa",
          "Fiestas del club de Mickey Mouse",
        ],
        background: "#f3e8ff",
        headingColor: "#7e22ce",
        textColor: "#6b21a8",
      },
      {
        title: "Diversión familiar Disney",
        items: [
          "Dinámicas para noches de película",
          "Juegos para preparar el viaje a Disney",
          "Trivias familiares sobre Disney",
          "Actividades para planear vacaciones mágicas",
        ],
        background: "#fdf2f8",
        headingColor: "#be185d",
        textColor: "#be185d",
      },
    ],
    charactersTitle: "Personajes y películas incluidos",
    characters: [
      {
        title: "Princesas Disney",
        description: "Elsa, Anna, Moana, Bella, Ariel, Cenicienta y muchas más",
        background: "#dbeafe",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
      {
        title: "Clásicos de siempre",
        description: "Mickey, Donald, Goofy, Pluto y los favoritos de toda la vida",
        background: "#fee2e2",
        headingColor: "#b91c1c",
        textColor: "#b91c1c",
      },
      {
        title: "Películas Disney",
        description: "El Rey León, Toy Story, Buscando a Nemo, Frozen y más éxitos animados",
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#166534",
      },
    ],
    tipsTitle: "Cómo actuar personajes de Disney",
    tips: {
      characterTitle: "Interpretación de personajes:",
      characterItems: [
        "Usa gestos icónicos (la magia de hielo de Elsa)",
        "Muestra emociones y personalidad",
        "Recrea escenas famosas de las películas",
        "Imita gestos característicos",
        "Representa poderes o habilidades especiales",
      ],
      characterHeadingColor: "#be185d",
      guessingTitle: "Consejos para adivinar:",
      guessingItems: [
        "Piensa en la temática de la película",
        "Considera relaciones entre personajes",
        "Busca pistas de princesas o villanos",
        "Recuerda personajes animales",
        "Distingue entre clásicos y modernos",
      ],
      guessingHeadingColor: "#7e22ce",
    },
    faqTitle: "Preguntas frecuentes de charadas Disney",
    faq: [
      {
        question: "¿Cuántos personajes hay disponibles?",
        answer:
          "El generador incluye más de 100 personajes y películas: desde clásicos animados hasta éxitos recientes como Frozen, Moana y Toy Story, con princesas, villanos y compañeros inolvidables.",
      },
      {
        question: "¿Sirve para fiestas temáticas Disney?",
        answer:
          "¡Claro! Es perfecto para fiestas de princesas, celebraciones de Mickey, cumpleaños inspirados en Frozen y cualquier evento familiar inspirado en Disney.",
      },
      {
        question: "¿Incluye clásicos y estrenos recientes?",
        answer:
          "Sí. Encontrarás personajes de Blancanieves y Mickey, así como protagonistas de las producciones modernas de Disney y Pixar.",
      },
      {
        question: "¿Los adultos también pueden jugar?",
        answer:
          "Definitivamente. Las charadas Disney encantan a todas las edades: despiertan nostalgia en los adultos y crean momentos compartidos con los más pequeños.",
      },
      {
        question: "¿Qué películas están representadas?",
        answer:
          "Disponemos de referencias de El Rey León, Frozen, La Bella y la Bestia, La Sirenita, Toy Story, Buscando a Nemo, Moana y muchas otras sagas queridas.",
      },
    ],
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
  charactersTitle: string;
  characters: Array<{
    title: string;
    description: string;
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  tipsTitle: string;
  tips: {
    characterTitle: string;
    characterItems: string[];
    characterHeadingColor: string;
    guessingTitle: string;
    guessingItems: string[];
    guessingHeadingColor: string;
  };
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}>;
