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
    ? `${baseUrl}/charades-generator-for-kids/`
    : `${baseUrl}/${locale}/charades-generator-for-kids/`;

  return {
    title: dictionary.seo.kids.title,
    description: dictionary.seo.kids.description,
    keywords: dictionary.seo.kids.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/charades-generator-for-kids/`,
        'es': `${baseUrl}/es/charades-generator-for-kids/`,
      }
    },
    openGraph: {
      title: dictionary.seo.kids.title,
      description: dictionary.seo.kids.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function CharadesForKidsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = kidsContent[locale] ?? kidsContent.en;

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/charades-generator-for-kids/`
    : `${baseUrl}/${locale}/charades-generator-for-kids/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.kids.title}
        description={dictionary.pages.kids.description}
        defaultCategory="kids"
        defaultDifficulty="easy"
        defaultAgeGroup="kids"
        hideAgeGroupFilter={true}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.kids.structuredDataName}
        description={dictionary.seo.kids.structuredDataDescription}
        url={canonicalUrl}
        category="Kids Games"
      />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">{copy.introTitle}</h2>
          <p className="text-blue-700 text-sm sm:text-base">{copy.introDescription}</p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.activitiesTitle}</h2>
          <p className="text-gray-600 mb-4">
            {copy.activitiesDescription.before}{" "}
            <Link href={copy.activitiesDescription.href} className="text-green-600 hover:text-green-800 underline">
              {copy.activitiesDescription.linkText}
            </Link>
            {copy.activitiesDescription.after}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.activitiesColumns.map((column) => (
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.safeTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {copy.safeCategories.map((card) => (
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

        <section className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.benefitsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.benefits.learningHeadingColor }}>
                {copy.benefits.learningTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.benefits.learningItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: copy.benefits.physicalHeadingColor }}>
                {copy.benefits.physicalTitle}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {copy.benefits.physicalItems.map((item) => (
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

const kidsContent = {
  en: {
    introTitle: "Your childrens charades generator toolkit",
    introDescription:
      "Use this childrens charades generator to instantly pull age-appropriate prompts for birthday parties, classroom brain breaks, family gatherings, and rainy day fun. Bookmark it whenever you need new words fast!",
    activitiesTitle: "Perfect for Children's Activities",
    activitiesDescription: {
      before: "Need more options for family fun? Visit our",
      linkText: "complete charades generator",
      after: "with age-appropriate filters and thousands of family-friendly words.",
      href: "/",
    },
    activitiesColumns: [
      {
        title: "Kids Birthday Parties",
        items: [
          "Children's birthday entertainment",
          "Preschool party games and activities",
          "Elementary school celebrations",
          "Kids sleepover party fun",
        ],
        background: "#ecfdf5",
        headingColor: "#166534",
        textColor: "#15803d",
      },
      {
        title: "Educational Settings",
        items: [
          "Classroom brain break activities",
          "Homeschool learning games",
          "After-school program entertainment",
          "Summer camp activities",
        ],
        background: "#eff6ff",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
    ],
    safeTitle: "Safe & Educational Charades for Kids",
    safeCategories: [
      {
        title: "Friendly Animals",
        description: "Cute animals kids love - dogs, cats, elephants, and zoo favorites",
        background: "#fef9c3",
        headingColor: "#854d0e",
        textColor: "#a16207",
      },
      {
        title: "Simple Actions",
        description: "Easy actions kids can act out - running, dancing, sleeping, eating",
        background: "#f3e8ff",
        headingColor: "#6b21a8",
        textColor: "#7e22ce",
      },
      {
        title: "Kid-Friendly Objects",
        description: "Toys, foods, and everyday items children recognize and enjoy",
        background: "#fce7f3",
        headingColor: "#9d174d",
        textColor: "#be185d",
      },
    ],
    benefitsTitle: "Educational Benefits of Kids Charades",
    benefits: {
      learningTitle: "Learning Skills:",
      learningItems: [
        "Improves vocabulary and word recognition",
        "Develops creative thinking abilities",
        "Enhances problem-solving skills",
        "Builds confidence and self-expression",
        "Practices social interaction skills",
      ],
      learningHeadingColor: "#c2410c",
      physicalTitle: "Physical Development:",
      physicalItems: [
        "Encourages physical movement and activity",
        "Develops body awareness and coordination",
        "Improves gross and fine motor skills",
        "Promotes healthy active play",
        "Builds confidence in physical expression",
      ],
      physicalHeadingColor: "#a16207",
    },
    faqTitle: "Kids Charades FAQ",
    faq: [
      {
        question: "What age is appropriate for kids charades?",
        answer:
          "Our kids charades generator is perfect for ages 4-12! We include simple words for preschoolers, elementary-friendly content for ages 7-9, and slightly more challenging words for tweens, all completely age-appropriate.",
      },
      {
        question: "Are all charades words safe for children?",
        answer:
          "Yes! Every word in our kids charades database is carefully selected to be completely child-safe, educational, and appropriate for family entertainment. No scary, violent, or inappropriate content included.",
      },
      {
        question: "Can teachers use this for classroom activities?",
        answer:
          "Absolutely! Teachers love using our kids charades for brain breaks, vocabulary building, reading comprehension activities, and end-of-day fun. All content is educational and classroom-appropriate.",
      },
      {
        question: "How do I make charades easier for younger children?",
        answer:
          "For preschoolers and young kids, use familiar animals and simple actions, give gentle hints, use longer time limits, and focus on participation rather than competition. Let them work in teams for extra support!",
      },
      {
        question: "What categories work best for children?",
        answer:
          "Kids love animals (especially pets and zoo animals), simple actions, Disney characters, everyday objects, and emotions. Our generator focuses on these child-friendly categories.",
      },
    ],
  },
  es: {
    introTitle: "Tu kit para charadas infantiles",
    introDescription:
      "Usa este generador de charadas para niños y consigue al instante palabras aptas para cumpleaños, descansos activos en clase, reuniones familiares y tardes lluviosas. ¡Guárdalo en favoritos para tener ideas nuevas siempre!",
    activitiesTitle: "Ideal para actividades infantiles",
    activitiesDescription: {
      before: "¿Quieres más opciones familiares? Visita nuestro",
      linkText: "generador completo de charadas",
      after: "con filtros por edad y miles de palabras aptas para todos.",
      href: "/es/",
    },
    activitiesColumns: [
      {
        title: "Fiestas de cumpleaños",
        items: [
          "Animación para cumpleaños infantiles",
          "Juegos y actividades para preescolar",
          "Celebraciones en primaria",
          "Diversión para pijamadas",
        ],
        background: "#ecfdf5",
        headingColor: "#166534",
        textColor: "#15803d",
      },
      {
        title: "Entornos educativos",
        items: [
          "Descansos activos en el aula",
          "Dinámicas para homeschool",
          "Entretenimiento en actividades extraescolares",
          "Programas para campamentos de verano",
        ],
        background: "#eff6ff",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
    ],
    safeTitle: "Charadas seguras y educativas",
    safeCategories: [
      {
        title: "Animales amigables",
        description: "Mascotas y animales del zoológico que los niños adoran",
        background: "#fef9c3",
        headingColor: "#854d0e",
        textColor: "#a16207",
      },
      {
        title: "Acciones sencillas",
        description: "Movimientos fáciles de representar: correr, bailar, dormir, comer",
        background: "#f3e8ff",
        headingColor: "#6b21a8",
        textColor: "#7e22ce",
      },
      {
        title: "Objetos cotidianos",
        description: "Juguetes, comidas y cosas diarias que reconocen al instante",
        background: "#fce7f3",
        headingColor: "#9d174d",
        textColor: "#be185d",
      },
    ],
    benefitsTitle: "Beneficios educativos de las charadas",
    benefits: {
      learningTitle: "Habilidades de aprendizaje:",
      learningItems: [
        "Mejoran vocabulario y reconocimiento de palabras",
        "Estimulan el pensamiento creativo",
        "Refuerzan la resolución de problemas",
        "Fortalecen la confianza y expresión",
        "Practican la interacción social",
      ],
      learningHeadingColor: "#c2410c",
      physicalTitle: "Desarrollo físico:",
      physicalItems: [
        "Invitan a moverse y mantenerse activos",
        "Desarrollan conciencia corporal y coordinación",
        "Mejoran habilidades motoras gruesas y finas",
        "Promueven el juego saludable",
        "Dan confianza para expresarse con el cuerpo",
      ],
      physicalHeadingColor: "#a16207",
    },
    faqTitle: "Preguntas frecuentes sobre charadas infantiles",
    faq: [
      {
        question: "¿Para qué edades es ideal el juego?",
        answer:
          "Nuestro generador funciona perfecto entre los 4 y 12 años. Hay palabras sencillas para preescolar, contenido para primaria y retos ligeros para preadolescentes, siempre 100% apropiado.",
      },
      {
        question: "¿Todas las palabras son seguras para niños?",
        answer:
          "Sí. Cada entrada se selecciona de forma cuidadosa para que sea educativa, divertida y apta para la familia. No incluimos contenido violento, aterrador ni inapropiado.",
      },
      {
        question: "¿Los docentes pueden usarlo en clase?",
        answer:
          "Claro. Docentes y facilitadores lo usan para breaks activos, ampliar vocabulario, reforzar comprensión lectora y cerrar el día con una dinámica entretenida.",
      },
      {
        question: "¿Cómo lo adapto para los más pequeños?",
        answer:
          "Elige animales y acciones conocidas, ofrece pistas amables, usa tiempos más largos y prioriza la participación antes que la competencia. Los equipos colaborativos ayudan mucho.",
      },
      {
        question: "¿Qué categorías disfrutan más?",
        answer:
          "Les encantan los animales, acciones simples, personajes Disney, objetos diarios y emociones básicas. Nuestro generador prioriza precisamente esas categorías.",
      },
    ],
  },
} satisfies Record<Locale, {
  introTitle: string;
  introDescription: string;
  activitiesTitle: string;
  activitiesDescription: {
    before: string;
    linkText: string;
    after: string;
    href: string;
  };
  activitiesColumns: Array<{
    title: string;
    items: string[];
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  safeTitle: string;
  safeCategories: Array<{
    title: string;
    description: string;
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  benefitsTitle: string;
  benefits: {
    learningTitle: string;
    learningItems: string[];
    learningHeadingColor: string;
    physicalTitle: string;
    physicalItems: string[];
    physicalHeadingColor: string;
  };
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}>;
