import { Metadata } from "next";
import Link from "next/link";
import { pickWords } from "@/utils/charades";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";

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
    ? `${baseUrl}/christmas-charades-generator/`
    : `${baseUrl}/${locale}/christmas-charades-generator/`;

  return {
    title: dictionary.seo.christmas.title,
    description: dictionary.seo.christmas.description,
    keywords: dictionary.seo.christmas.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/christmas-charades-generator/`,
        'es': `${baseUrl}/es/christmas-charades-generator/`,
      }
    },
    openGraph: {
      title: dictionary.seo.christmas.title,
      description: dictionary.seo.christmas.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${baseUrl}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.christmas.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.christmas.title,
      description: dictionary.seo.christmas.description,
      images: [`${baseUrl}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function ChristmasCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = christmasContent[locale] ?? christmasContent.en;
  const initialWords = pickWords("christmas", "medium", "all", 3, locale);

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/christmas-charades-generator/`
    : `${baseUrl}/${locale}/christmas-charades-generator/`;

  return (
    <div className="bg-gradient-to-b from-red-50 to-green-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.christmas.title}
        description={dictionary.pages.christmas.description}
        defaultCategory="christmas"
        hideCategoryFilter={true}
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.christmas.structuredDataName}
        description={dictionary.seo.christmas.structuredDataDescription}
        url={canonicalUrl}
        category="Holiday Games"
        locale={locale}
      />
      <FAQStructuredData items={copy.faq ?? []} />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.calloutTitle}</h2>
          <p className="text-gray-600 mb-4">
            {copy.calloutDescription.before}{" "}
            <Link href={copy.calloutDescription.href} className="text-red-600 hover:text-red-800 underline">
              {copy.calloutDescription.linkText}
            </Link>
            {copy.calloutDescription.after}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.calloutColumns.map((column) => (
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
            {copy.categories.map((item) => (
              <div key={item.title} className="text-center p-4 rounded-lg" style={{ backgroundColor: item.background }}>
                <h3 className="font-semibold mb-2" style={{ color: item.headingColor }}>
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: item.textColor }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-red-100 to-green-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.howToTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.howTo.setupHeadingColor }}>
                {copy.howTo.setupTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.howTo.setupItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.howTo.tipsHeadingColor }}>
                {copy.howTo.tipsTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.howTo.tipsItems.map((item) => (
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

const christmasContent = {
  en: {
    calloutTitle: "Perfect for Christmas Parties",
    calloutDescription: {
      before: "Looking for more party games? Check out our",
      linkText: "complete charades generator",
      after: "with hundreds of words across all categories and themes.",
      href: "/",
    },
    calloutColumns: [
      {
        title: "Family Christmas Gatherings",
        items: [
          "Christmas Eve entertainment",
          "Boxing Day family fun",
          "Multi-generational game time",
          "Holiday tradition starter",
        ],
        background: "#fef3f2",
        headingColor: "#991b1b",
        textColor: "#b91c1c",
      },
      {
        title: "Office Holiday Parties",
        items: [
          "Team building activities",
          "Holiday break ice-breakers",
          "Corporate party games",
          "Secret Santa events",
        ],
        background: "#f0fdf4",
        headingColor: "#166534",
        textColor: "#15803d",
      },
    ],
    categoriesTitle: "What's Included in Christmas Charades",
    categories: [
      {
        title: "Christmas Characters",
        description: "Santa, Mrs. Claus, Elves, Reindeer, Grinch, and more festive characters",
        background: "#fee2e2",
        headingColor: "#991b1b",
        textColor: "#b91c1c",
      },
      {
        title: "Holiday Movies & Songs",
        description: "Classic Christmas movies, carols, and holiday music favorites",
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#15803d",
      },
      {
        title: "Holiday Traditions",
        description: "Christmas foods, activities, decorations, and holiday customs",
        background: "#dbeafe",
        headingColor: "#1d4ed8",
        textColor: "#2563eb",
      },
    ],
    howToTitle: "How to Play Christmas Charades",
    howTo: {
      setupTitle: "Holiday Game Setup:",
      setupItems: [
        "Divide into teams (families vs families works great!)",
        "Set a festive 2-3 minute timer",
        "Generate Christmas charades words above",
        "Act out without speaking - only gestures!",
        "Team with most correct guesses wins a prize",
      ],
      setupHeadingColor: "#991b1b",
      tipsTitle: "Holiday Charades Tips:",
      tipsItems: [
        "Use Christmas-themed gestures (ho-ho-ho, gift wrapping)",
        "Start with easier words for kids",
        "Mix different difficulty levels for all ages",
        "Create festive team names and prizes",
        "Take photos for holiday memories!",
      ],
      tipsHeadingColor: "#166534",
    },
    faqTitle: "Christmas Charades FAQ",
    faq: [
      {
        question: "How many Christmas charades words do you have?",
        answer:
          "Our Christmas charades generator includes 60+ carefully selected holiday words covering Christmas characters, movies, songs, food, activities, and traditions perfect for all ages.",
      },
      {
        question: "Are these Christmas charades suitable for kids?",
        answer:
          "Yes! Our Christmas charades include family-friendly options perfect for children, with easy difficulty levels featuring Santa, reindeer, presents, and other familiar holiday concepts.",
      },
      {
        question: "Can I use this for office Christmas parties?",
        answer:
          "Absolutely! Christmas charades is perfect for office holiday parties, team building events, and corporate Christmas celebrations. Mix different difficulty levels to engage everyone.",
      },
      {
        question: "When is the best time to play Christmas charades?",
        answer:
          "Christmas charades works great during December holiday parties, Christmas Eve gatherings, Boxing Day celebrations, New Year's parties, and any winter holiday event throughout the season.",
      },
      {
        question: "Do you have different difficulty levels for Christmas words?",
        answer:
          "Yes! Our Christmas charades generator offers Easy (Santa, Tree), Medium (Caroling, Ornament), and Hard (Mistletoe, Christmas Tradition) difficulty levels to match your group's needs.",
      },
    ],
  },
  es: {
    calloutTitle: "Ideal para fiestas navideñas",
    calloutDescription: {
      before: "¿Buscas más juegos para tus reuniones? Visita nuestro",
      linkText: "generador completo de charadas",
      after: "con cientos de palabras en todas las categorías y temáticas.",
      href: "/es/",
    },
    calloutColumns: [
      {
        title: "Reuniones familiares de Navidad",
        items: [
          "Animación para la Nochebuena",
          "Diversión familiar en el Boxing Day",
          "Juego para todas las generaciones",
          "Tradición festiva para comenzar",
        ],
        background: "#fef3f2",
        headingColor: "#991b1b",
        textColor: "#b91c1c",
      },
      {
        title: "Fiestas navideñas en la oficina",
        items: [
          "Dinámicas de integración",
          "Rompehielos para el receso",
          "Juegos corporativos",
          "Eventos de amigo secreto",
        ],
        background: "#f0fdf4",
        headingColor: "#166534",
        textColor: "#15803d",
      },
    ],
    categoriesTitle: "Qué incluye nuestro charadas navideño",
    categories: [
      {
        title: "Personajes navideños",
        description: "Santa, Señora Claus, duendes, renos, Grinch y más personajes festivos",
        background: "#fee2e2",
        headingColor: "#991b1b",
        textColor: "#b91c1c",
      },
      {
        title: "Películas y canciones",
        description: "Clásicos navideños, villancicos y música de temporada",
        background: "#dcfce7",
        headingColor: "#166534",
        textColor: "#15803d",
      },
      {
        title: "Tradiciones festivas",
        description: "Comidas, actividades, decoraciones y costumbres de la época",
        background: "#dbeafe",
        headingColor: "#1d4ed8",
        textColor: "#2563eb",
      },
    ],
    howToTitle: "Cómo jugar charadas navideñas",
    howTo: {
      setupTitle: "Preparación del juego:",
      setupItems: [
        "Dividan en equipos (familia contra familia funciona genial)",
        "Configuren un temporizador festivo de 2-3 minutos",
        "Generen las palabras navideñas arriba",
        "Actúen sin hablar, solo con gestos",
        "El equipo con más aciertos gana un premio",
      ],
      setupHeadingColor: "#991b1b",
      tipsTitle: "Consejos navideños:",
      tipsItems: [
        "Usen gestos temáticos (ho-ho-ho, envolver regalos)",
        "Empiecen con palabras fáciles para los peques",
        "Combinen dificultades para todas las edades",
        "Inventen nombres y premios festivos",
        "Saquen fotos para recordar la noche",
      ],
      tipsHeadingColor: "#166534",
    },
    faqTitle: "Preguntas frecuentes sobre charadas navideñas",
    faq: [
      {
        question: "¿Cuántas palabras navideñas tienen?",
        answer:
          "Nuestro generador incluye más de 60 palabras festivas cuidadosamente seleccionadas: personajes, películas, canciones, comida, actividades y tradiciones para todas las edades.",
      },
      {
        question: "¿Son aptas para niños?",
        answer:
          "¡Sí! Las charadas navideñas incluyen opciones familiares con niveles fáciles protagonizados por Santa, renos, regalos y conceptos que los niños reconocen al instante.",
      },
      {
        question: "¿Sirve para fiestas de oficina?",
        answer:
          "Por supuesto. Es ideal para celebraciones corporativas, dinámicas de integración y eventos de fin de año. Combina distintos niveles de dificultad para mantener a todos participando.",
      },
      {
        question: "¿Cuándo es mejor jugar?",
        answer:
          "Funciona excelente en fiestas de diciembre, reuniones de Nochebuena, celebraciones del Boxing Day, Año Nuevo y cualquier evento invernal durante la temporada.",
      },
      {
        question: "¿Ofrecen niveles de dificultad?",
        answer:
          "Sí. El generador navideño tiene niveles Fácil (Santa, Árbol), Medio (Villancico, Adorno) y Difícil (Muérdago, Tradición navideña) para adaptarse a cada grupo.",
      },
    ],
  },
} satisfies Record<Locale, {
  calloutTitle: string;
  calloutDescription: {
    before: string;
    linkText: string;
    after: string;
    href: string;
  };
  calloutColumns: Array<{
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
  howToTitle: string;
  howTo: {
    setupTitle: string;
    setupItems: string[];
    setupHeadingColor: string;
    tipsTitle: string;
    tipsItems: string[];
    tipsHeadingColor: string;
  };
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}>;
