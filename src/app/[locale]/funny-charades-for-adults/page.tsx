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
    ? `${baseUrl}/funny-charades-for-adults/`
    : `${baseUrl}/${locale}/funny-charades-for-adults/`;

  return {
    title: dictionary.seo.funny.title,
    description: dictionary.seo.funny.description,
    keywords: dictionary.seo.funny.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/funny-charades-for-adults/`,
        'es': `${baseUrl}/es/funny-charades-for-adults/`,
      }
    },
    openGraph: {
      title: dictionary.seo.funny.title,
      description: dictionary.seo.funny.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
    robots: "index, follow",
  };
}

export default async function FunnyCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = funnyContent[locale] ?? funnyContent.en;

  const baseUrl = "https://charades-generator.com";
  const canonicalUrl = locale === 'en'
    ? `${baseUrl}/funny-charades-for-adults/`
    : `${baseUrl}/${locale}/funny-charades-for-adults/`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.funny.title}
        description={dictionary.pages.funny.description}
        defaultCategory="funny"
        defaultDifficulty="medium"
        defaultAgeGroup="adults"
        hideCategoryFilter={true}
        hideAgeGroupFilter={true}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.funny.structuredDataName}
        description={dictionary.seo.funny.structuredDataDescription}
        url={canonicalUrl}
        category="Adult Party Games"
      />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-blue-800">{copy.quickActions.title}</h2>
            <p className="text-blue-700 text-sm md:text-base">{copy.quickActions.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={copy.quickActions.primary.href}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {copy.quickActions.primary.label}
            </Link>
            <Link
              href={copy.quickActions.secondary.href}
              className="inline-flex items-center justify-center rounded-md border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              {copy.quickActions.secondary.label}
            </Link>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.party.title}</h2>
          <p className="text-gray-600 mb-4">
            {copy.party.description.before}{" "}
            <Link href={copy.party.description.href} className="text-orange-600 hover:text-orange-800 underline">
              {copy.party.description.linkText}
            </Link>
            {copy.party.description.after}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.party.columns.map((column) => (
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

        <section id="word-banks" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.playbook.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.playbook.sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
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

        <section className="bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.tips.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.tips.sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: section.headingColor }}>
                  {section.title}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{copy.wordBanks.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            {copy.wordBanks.columns.map((column) => (
              <div key={column.sections[0].heading}>
                {column.sections.map((section) => (
                  <div key={section.heading} className="mb-4 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.heading}</h3>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
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

const funnyContent = {
  en: {
    quickActions: {
      title: "Need laughs fast?",
      description:
        "Spin up a fresh list with the generator above, then use the party playbook and themed word banks below to keep every round fresh and hilarious.",
      primary: {
        label: "Try Random Mode",
        href: "/random-charades-generator/",
      },
      secondary: {
        label: "Jump to Word Banks",
        href: "#word-banks",
      },
    },
    party: {
      title: "Perfect for Adult Entertainment",
      description: {
        before: "Want more variety for your party? Explore our",
        linkText: "main charades generator",
        after: "with thousands of words including movies, books, animals, and more themes.",
        href: "/",
      },
      columns: [
        {
          title: "Adult Party Games",
          items: [
            "Adult birthday party entertainment",
            "Bachelorette and bachelor party fun",
            "Adult game night activities",
            "New Year's Eve party games",
          ],
          background: "#fff7ed",
          headingColor: "#c2410c",
          textColor: "#c2410c",
        },
        {
          title: "Social Gatherings",
          items: [
            "Office happy hour entertainment",
            "Adult friend group activities",
            "Dinner party ice breakers",
            "Adult comedy night entertainment",
          ],
          background: "#fef3c7",
          headingColor: "#b45309",
          textColor: "#b45309",
        },
      ],
    },
    playbook: {
      title: "Adult Charades Party Playbook",
      sections: [
        {
          title: "Setup Checklist",
          items: [
            "• Pick a theme such as office fails, 90s nostalgia, or weekend warriors",
            "• Prep score sheets, a countdown timer, and fun props like wigs or meme cards",
            "• Split friends into teams of 3-6 players to keep the energy high",
            "• Lock in round length (60 seconds keeps things punchy)",
            "• Add a \"steal\" rule so opposing teams can shout the answer for bonus points",
          ],
        },
        {
          title: "Gameplay Variations",
          items: [
            "• Lightning Round: one actor performs three prompts back-to-back",
            "• Reverse Charades: the whole team acts while one person guesses",
            "• Hashtag Mode: teammates shout a social caption when they guess right",
            "• Truth or Charade: losing team pulls a funny dare card",
            "• Office Safe Switch: tap the generator for work-friendly alternatives mid-game",
          ],
        },
      ],
    },
    categoriesTitle: "Hilarious Adult Charades Categories",
    categories: [
      {
        title: "Awkward Situations",
        description: "Embarrassing adult moments we all experience and can laugh about",
        background: "#fee2e2",
        headingColor: "#b91c1c",
        textColor: "#b91c1c",
      },
      {
        title: "Adult Life Struggles",
        description: "Relatable adult problems like taxes, technology fails, and daily life",
        background: "#f3e8ff",
        headingColor: "#7e22ce",
        textColor: "#7e22ce",
      },
      {
        title: "Comedy Gold",
        description: "Funny scenarios and situations perfect for hilarious acting",
        background: "#dbeafe",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
    ],
    tips: {
      title: "Tips for Maximum Laughs",
      sections: [
        {
          title: "Acting for Comedy:",
          headingColor: "#be185d",
          items: [
            "Exaggerate the embarrassing moments",
            "Use facial expressions to show frustration",
            "Don't be afraid to look completely silly",
            "Show the before and after of situations",
            "Use props if available for extra comedy",
          ],
        },
        {
          title: "Party Enhancement:",
          headingColor: "#ca8a04",
          items: [
            "Encourage creative interpretations",
            "Give bonus points for funniest performance",
            "Allow sound effects for extra chaos",
            "Take photos of the best moments",
            "Create themed rounds for variety",
          ],
        },
      ],
    },
    wordBanks: {
      title: "Theme Word Banks & Prompt Ideas",
      columns: [
        {
          sections: [
            {
              heading: "Bachelorette Bash",
              items: [
                "Bridal bouquet juggling",
                "Karaoke mic drop",
                "Forgetting the vows",
                "Sneaking snacks into the rehearsal dinner",
                "Champagne tower disaster",
              ],
            },
            {
              heading: "Weekend Warriors",
              items: [
                "Five-minute planking challenge",
                "Airbnb check-in gone wrong",
                "Trying to assemble flat-pack furniture",
                "Oversleeping the road trip departure",
                "Group yoga fail",
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: "Office & Remote Life",
              items: [
                "Muted during a big presentation",
                "Coffee machine breakdown",
                "Surprise icebreaker on Zoom",
                "Keyboard covered in crumbs",
                "Bringing your pet to the team call",
              ],
            },
            {
              heading: "Comedy Classics",
              items: [
                "Slipping on a banana peel",
                "Juggling deadlines and pizza slices",
                "Mistaking shampoo for conditioner",
                "Awkward first date hug",
                "Laughing uncontrollably at the wrong moment",
              ],
            },
          ],
        },
      ],
    },
    faqTitle: "Funny Adult Charades FAQ",
    faq: [
      {
        question: "What makes these charades funny for adults?",
        answer:
          "Our funny adult charades focus on relatable adult experiences, awkward situations we all face, technology struggles, and embarrassing moments that create instant laughs and recognition among adult players.",
      },
      {
        question: "Are these appropriate for work parties?",
        answer:
          "Yes! While designed for adult humor, all content is office-appropriate and focuses on universal adult experiences like tech troubles, daily life struggles, and funny situations rather than inappropriate content.",
      },
      {
        question: "How is this different from regular charades?",
        answer:
          "Funny adult charades focuses specifically on humor and adult life experiences rather than just movies or animals. The words are chosen to create maximum laughs and relatability among adult players.",
      },
      {
        question: "Can I use this for bachelorette parties?",
        answer:
          "Absolutely! Funny charades is perfect for bachelorette parties, bachelor parties, adult birthday celebrations, and any adult gathering where you want guaranteed laughs and entertainment.",
      },
      {
        question: "What types of funny situations are included?",
        answer:
          "Our database includes tech fails, adult life struggles, embarrassing social situations, relatable daily problems, and universal adult experiences that everyone can laugh about and relate to.",
      },
      {
        question: "Do you provide printable adult charades cards?",
        answer:
          "Yes. Scroll up to the Adult Charades Playbook section to request a free PDF pack with 60 prompts, score sheets, and a party planner. You can also remix the words with the generator for unlimited versions.",
      },
    ],
  },
  es: {
    quickActions: {
      title: "¿Necesitas risas al instante?",
      description:
        "Genera una nueva lista con el botón de arriba y usa la guía de fiesta y los bancos temáticos para mantener cada ronda fresca y divertidísima.",
      primary: {
        label: "Probar modo aleatorio",
        href: "/es/random-charades-generator/",
      },
      secondary: {
        label: "Ir a bancos temáticos",
        href: "#word-banks",
      },
    },
    party: {
      title: "Ideal para entretenimiento adulto",
      description: {
        before: "¿Buscas más variedad para la fiesta? Explora nuestro",
        linkText: "generador principal de charadas",
        after: "con miles de palabras que incluyen películas, libros, animales y muchos temas más.",
        href: "/es/",
      },
      columns: [
        {
          title: "Fiestas para adultos",
          items: [
            "Entretenimiento para cumpleaños",
            "Ideas para despedidas de soltera y soltero",
            "Actividades para noches de juegos",
            "Dinámicas para Año Nuevo",
          ],
          background: "#fff7ed",
          headingColor: "#c2410c",
          textColor: "#c2410c",
        },
        {
          title: "Reuniones sociales",
          items: [
            "Animación para after office",
            "Actividades con amigos adultos",
            "Rompehielos para cenas",
            "Shows de comedia entre amigos",
          ],
          background: "#fef3c7",
          headingColor: "#b45309",
          textColor: "#b45309",
        },
      ],
    },
    playbook: {
      title: "Manual de charadas para adultos",
      sections: [
        {
          title: "Checklist de preparación",
          items: [
            "• Elige un tema: fails de oficina, nostalgia noventera o guerreros de fin de semana",
            "• Ten listas hojas de puntaje, cronómetro y props divertidos como pelucas o memes",
            "• Forma equipos de 3 a 6 personas para mantener la energía",
            "• Define la duración por ronda (60 segundos mantiene el ritmo)",
            "• Agrega la regla de \"robo\": el otro equipo puede gritar la respuesta y sumar puntos",
          ],
        },
        {
          title: "Variaciones de juego",
          items: [
            "• Ronda relámpago: un actor actúa tres prompts seguidos",
            "• Charada inversa: todo el equipo actúa y solo uno adivina",
            "• Modo hashtag: grita un caption cuando aciertes",
            "• Verdad o charada: el equipo perdedor toma una carta de reto",
            "• Modo oficina segura: usa el generador para conseguir alternativas aptas",
          ],
        },
      ],
    },
    categoriesTitle: "Categorías de charadas divertidas",
    categories: [
      {
        title: "Momentos incómodos",
        description: "Situaciones embarazosas que todos hemos vivido",
        background: "#fee2e2",
        headingColor: "#b91c1c",
        textColor: "#b91c1c",
      },
      {
        title: "Caos adulto",
        description: "Problemas cotidianos: impuestos, tecnología y vida diaria",
        background: "#f3e8ff",
        headingColor: "#7e22ce",
        textColor: "#7e22ce",
      },
      {
        title: "Oro cómico",
        description: "Escenarios perfectos para actuar con humor",
        background: "#dbeafe",
        headingColor: "#1d4ed8",
        textColor: "#1d4ed8",
      },
    ],
    tips: {
      title: "Consejos para carcajadas máximas",
      sections: [
        {
          title: "Actuación cómica:",
          headingColor: "#be185d",
          items: [
            "Exagera los momentos embarazosos",
            "Usa expresiones faciales para mostrar frustración",
            "No temas lucir totalmente ridículo",
            "Muestra el antes y después de la escena",
            "Apóyate en props si tienes a mano",
          ],
        },
        {
          title: "Mejoras para la fiesta:",
          headingColor: "#ca8a04",
          items: [
            "Premia las interpretaciones más creativas",
            "Da puntos extra a la actuación más graciosa",
            "Permite efectos de sonido para más caos",
            "Captura fotos de los mejores momentos",
            "Genera rondas temáticas para variar",
          ],
        },
      ],
    },
    wordBanks: {
      title: "Bancos de palabras y prompts",
      columns: [
        {
          sections: [
            {
              heading: "Bachelorette Bash",
              items: [
                "Ramo de novia en el aire",
                "Karaoke con micrófono al piso",
                "Olvidar los votos",
                "Colar snacks en el ensayo",
                "Desastre en la torre de champaña",
              ],
            },
            {
              heading: "Guerreros del fin de semana",
              items: [
                "Reto de plancha de cinco minutos",
                "Check-in fallido en Airbnb",
                "Armar muebles sin instrucciones",
                "Dormirse antes del road trip",
                "Fail colectivo en yoga",
              ],
            },
          ],
        },
        {
          sections: [
            {
              heading: "Oficina y vida remota",
              items: [
                "Micrófono silenciado en la presentación",
                "Cafetera averiada",
                "Icebreaker sorpresa en Zoom",
                "Teclado lleno de migas",
                "Mascota en la videollamada",
              ],
            },
            {
              heading: "Clásicos de comedia",
              items: [
                "Resbalar con una cáscara",
                "Equilibrar deadlines y pizza",
                "Confundir champú con acondicionador",
                "Abrazo incómodo en la primera cita",
                "Risa incontrolable en mal momento",
              ],
            },
          ],
        },
      ],
    },
    faqTitle: "Preguntas frecuentes de charadas divertidas",
    faq: [
      {
        question: "¿Qué hace especiales a estas charadas?",
        answer:
          "Se enfocan en experiencias adultas: situaciones incómodas, fails tecnológicos y momentos vergonzosos que provocan carcajadas instantáneas.",
      },
      {
        question: "¿Sirven para eventos de oficina?",
        answer:
          "Sí. Aunque son para adultos, todo el contenido es apropiado para el trabajo y se centra en experiencias universales, sin caer en lo inapropiado.",
      },
      {
        question: "¿En qué se diferencian de las charadas tradicionales?",
        answer:
          "Estas se concentran en humor y vivencias adultas en lugar de solo películas o animales, garantizando empatía y risas.",
      },
      {
        question: "¿Funcionan para despedidas de soltera?",
        answer:
          "Totalmente. Son un éxito en despedidas, cumpleaños, reuniones nocturnas y cualquier evento adulto donde quieras diversión asegurada.",
      },
      {
        question: "¿Qué tipo de situaciones incluyen?",
        answer:
          "Fails tecnológicos, tropiezos sociales, problemas cotidianos y experiencias universales con las que cualquiera se identifica.",
      },
      {
        question: "¿Tienen cartas imprimibles?",
        answer:
          "Sí. Sube a la sección del manual para solicitar un PDF con 60 prompts, hojas de puntaje y planificador. También puedes generar infinitas variantes desde el generador.",
      },
    ],
  },
} satisfies Record<Locale, {
  quickActions: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  party: {
    title: string;
    description: { before: string; linkText: string; after: string; href: string };
    columns: Array<{
      title: string;
      items: string[];
      background: string;
      headingColor: string;
      textColor: string;
    }>;
  };
  playbook: {
    title: string;
    sections: Array<{
      title: string;
      items: string[];
    }>;
  };
  categoriesTitle: string;
  categories: Array<{
    title: string;
    description: string;
    background: string;
    headingColor: string;
    textColor: string;
  }>;
  tips: {
    title: string;
    sections: Array<{
      title: string;
      headingColor: string;
      items: string[];
    }>;
  };
  wordBanks: {
    title: string;
    columns: Array<{
      sections: Array<{
        heading: string;
        items: string[];
      }>;
    }>;
  };
  faqTitle: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
}>;
