import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import FAQStructuredData from "@/components/FAQStructuredData";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";
import { Metadata } from "next";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { pickWords } from "@/utils/charades";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";

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

  const canonicalPath = "/emotion-charades";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.emotions.title,
    description: dictionary.seo.emotions.description,
    keywords: dictionary.seo.emotions.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.emotions.title,
      description: dictionary.seo.emotions.description,
      type: "website",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.emotions.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.emotions.title,
      description: dictionary.seo.emotions.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function EmotionCharadesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const copy = emotionContent[locale] ?? emotionContent.en;
  const initialWords = pickWords("emotions", "all", "all", 3, locale);

  const canonicalPath = "/emotion-charades";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return (
    <div className="bg-rose-50 min-h-screen">
      <CharadesGeneratorOptimized
        title={dictionary.pages.emotions.title}
        description={dictionary.pages.emotions.description}
        defaultCategory="emotions"
        defaultDifficulty="all"
        defaultAgeGroup="all"
        hideCategoryFilter={true}
        initialWords={initialWords}
      />

      <StructuredData
        type="WebApplication"
        name={dictionary.seo.emotions.structuredDataName}
        description={dictionary.seo.emotions.structuredDataDescription}
        url={canonicalUrl}
        category="Educational Games"
        locale={locale}
      />
      <FAQStructuredData items={copy.faq ?? []} />

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-rose-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{copy.introTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.introLead}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.introColumns.map((column) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.activitiesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {copy.activities.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-700">{card.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-slate-600">
                  {card.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-rose-100 to-amber-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.tipsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.tips.map((tip) => (
              <div key={tip.title} className="bg-white/80 border border-rose-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-rose-700 mb-2">{tip.title}</h3>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.integrationTitle}</h2>
          <p className="text-gray-700 mb-4">{copy.integrationLead}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.integrationCards.map((card) => (
              <div key={card.title} className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                <h3 className="font-semibold text-amber-800 mb-2">{card.title}</h3>
                <ul className="space-y-1 text-sm text-amber-900">
                  {card.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            {copy.integrationFooter.before}{" "}
            <Link href={copy.integrationFooter.href} className="text-rose-600 hover:text-rose-800 underline">
              {copy.integrationFooter.linkText}
            </Link>{" "}
            {copy.integrationFooter.after}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
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
      </div>
    </div>
  );
}

const emotionContent = {
  en: {
    introTitle: "Emotion charades builds empathy while kids keep moving",
    introLead:
      "Use this emotion charades generator when you want to reinforce SEL concepts, warm up a counseling group, or help families talk about feelings without a worksheet.",
    introColumns: [
      {
        title: "Why facilitators love it",
        items: [
          "Opens conversations about body language and tone.",
          "Normalises big feelings with playful acting.",
          "Encourages vocabulary growth beyond “happy” and “sad”.",
          "Pairs perfectly with reflective journaling or drawing.",
        ],
        background: "#ffe4e6",
        headingColor: "#be123c",
        textColor: "#be123c",
      },
      {
        title: "Where it works best",
        items: [
          "Elementary and middle school SEL blocks.",
          "Youth group icebreakers before serious topics.",
          "Speech therapy and social skills groups.",
          "Family dinners or cabin retreats on rainy days.",
        ],
        background: "#fef3c7",
        headingColor: "#b45309",
        textColor: "#b45309",
      },
    ],
    activitiesTitle: "Emotion charades activity ideas",
    activities: [
      {
        title: "Feelings freeze dance",
        description: "Play music, pause suddenly, and act out the next emotion from your list.",
        items: [
          "Encourage dramatic facial expressions.",
          "Let students guess before revealing the card.",
          "Add a journaling prompt: “When did you feel this last?”",
        ],
      },
      {
        title: "Counseling reflections",
        description: "After each round, invite the group to share a story tied to the emotion.",
        items: [
          "Keep responses optional for quieter participants.",
          "Validate every feeling as normal and manageable.",
          "Summarise coping strategies mentioned by the group.",
        ],
      },
      {
        title: "Family conversation cards",
        description: "Hand each player one acted emotion to discuss at dinner.",
        items: [
          "Ask “What helps when you feel this?”",
          "Let kids draw the emotion for the fridge.",
          "Share a grown-up example to model vulnerability.",
        ],
      },
    ],
    tipsTitle: "Tips for meaningful emotion charades",
    tips: [
      {
        title: "Set expectations gently",
        items: [
          "Explain that different people show the same feeling in different ways.",
          "Allow passes if an emotion is too personal in the moment.",
          "Rotate between easy, medium, and hard emotions to avoid overwhelm.",
        ],
      },
      {
        title: "Debrief every round",
        items: [
          "Ask how body language gave away the feeling.",
          "Connect the emotion to coping skills or breathing exercises.",
          "Record favourite prompts to revisit progress later.",
        ],
      },
    ],
    integrationTitle: "Link emotion charades to your broader program",
    integrationLead:
      "Keep the momentum by weaving charades into journals, morning meetings, or therapy plans.",
    integrationCards: [
      {
        title: "Classroom ideas",
        items: [
          "Start Monday meetings with a three-card warm-up.",
          "Use emotion cards as exit tickets (“Show how you feel leaving class”).",
          "Pair with literature discussions to map how characters feel.",
        ],
      },
      {
        title: "Counseling & SEL groups",
        items: [
          "Match charades rounds with feelings thermometers.",
          "Log who chooses which emotion to track participation.",
          "Blend with mindfulness—act the feeling, then practice grounding.",
        ],
      },
    ],
    integrationFooter: {
      before: "Need a general word bank after your SEL block?",
      linkText: "Jump back to the main charades generator",
      after: "and keep the game night going with mixed prompts.",
      href: "/",
    },
    faqTitle: "Emotion charades FAQ",
    faq: [
      {
        question: "How do I introduce emotion charades to students?",
        answer:
          "Model two or three emotions yourself first. Highlight exaggerated facial expressions and invite the class to describe what they saw. Then let teams volunteer to act out the next cards.",
      },
      {
        question: "Which age groups benefit most?",
        answer:
          "Grades 2–8 respond especially well, but teens appreciate the reflection component when you pair acting with journaling or group discussion. Adults can use the same deck for team empathy training.",
      },
      {
        question: "How can I support neurodivergent players?",
        answer:
          "Offer alternative communication options like drawing or using a prop, allow extra planning time, and make passes totally acceptable. Break larger groups into smaller pods to reduce sensory load.",
      },
      {
        question: "Can I mix emotion charades with other categories?",
        answer:
          "Yes. Blend in actions, animals, or objects for reward rounds, or use the random charades generator for closing games once the SEL goal is met.",
      },
    ],
  },
  es: {
    introTitle: "Charadas de emociones para practicar empatía en movimiento",
    introLead:
      "Usa este generador de charadas de emociones cuando quieras reforzar aprendizajes SEL, abrir una sesión de consejería o conversar sobre sentimientos en familia sin recurrir a una ficha rígida.",
    introColumns: [
      {
        title: "Por qué funciona",
        items: [
          "Abre la conversación sobre lenguaje corporal y tono.",
          "Normaliza las emociones intensas a través del juego.",
          "Amplía el vocabulario más allá de “feliz” y “triste”.",
          "Combina perfecto con diarios o dibujos reflexivos.",
        ],
        background: "#ffe4e6",
        headingColor: "#be123c",
        textColor: "#be123c",
      },
      {
        title: "Dónde aplicarlo",
        items: [
          "Bloques SEL en primaria y secundaria.",
          "Rompedores de hielo antes de temas sensibles.",
          "Terapia del habla y grupos de habilidades sociales.",
          "Reuniones familiares o convivencias bajo techo.",
        ],
        background: "#fef3c7",
        headingColor: "#b45309",
        textColor: "#b45309",
      },
    ],
    activitiesTitle: "Ideas de actividades con charadas de emociones",
    activities: [
      {
        title: "Danza de sentimientos",
        description: "Pon música, pausa de repente y actúa la emoción siguiente.",
        items: [
          "Anima a exagerar gestos y expresiones.",
          "Deja que la clase adivine antes de mostrar la carta.",
          "Añade un prompt de diario: “¿Cuándo sentiste esto por última vez?”",
        ],
      },
      {
        title: "Reflexión en consejería",
        description: "Tras cada ronda, invita a compartir una historia vinculada a la emoción.",
        items: [
          "Haz que la participación sea opcional para quienes prefieren escuchar.",
          "Valida cada emoción como natural y manejable.",
          "Resume las estrategias de afrontamiento mencionadas por el grupo.",
        ],
      },
      {
        title: "Cartas para la mesa",
        description: "Entrega una emoción a cada persona para comentarla durante la comida.",
        items: [
          "Pregunta “¿Qué te ayuda cuando sientes esto?”",
          "Permite que dibujen la emoción para pegarla en la nevera.",
          "Comparte un ejemplo adulto para modelar vulnerabilidad.",
        ],
      },
    ],
    tipsTitle: "Consejos para que la dinámica sea significativa",
    tips: [
      {
        title: "Define expectativas con calma",
        items: [
          "Explica que cada persona expresa sentimientos de forma distinta.",
          "Permite pasar la carta si alguien no quiere representarla.",
          "Alterna emociones fáciles, medias y complejas para evitar saturación.",
        ],
      },
      {
        title: "Cierra cada ronda con reflexión",
        items: [
          "Pregunta qué gestos delataron la emoción.",
          "Relaciona el sentimiento con técnicas de regulación o respiración.",
          "Registra los prompts favoritos para revisar avances más adelante.",
        ],
      },
    ],
    integrationTitle: "Integra charadas de emociones a tu programa SEL",
    integrationLead:
      "Mantén el impulso enlazando charadas con diarios, reuniones matutinas o planes terapéuticos.",
    integrationCards: [
      {
        title: "En el aula",
        items: [
          "Inicia los lunes con un calentamiento de tres cartas.",
          "Usa emociones como ticket de salida (“Muestra cómo te vas de la clase”).",
          "Relaciona las cartas con personajes de literatura para analizar su arco emocional.",
        ],
      },
      {
        title: "Consejería y grupos SEL",
        items: [
          "Combina las rondas con termómetros de emociones.",
          "Registra quién elige cada emoción para asegurar participación equitativa.",
          "Une la mímica con mindfulness: actúa la emoción y luego practica anclaje.",
        ],
      },
    ],
    integrationFooter: {
      before: "¿Necesitas un banco mixto después del bloque SEL?",
      linkText: "Vuelve al generador principal de charadas",
      after: "y continúa la sesión con prompts variados.",
      href: "/es/",
    },
    faqTitle: "Preguntas frecuentes sobre charadas de emociones",
    faq: [
      {
        question: "¿Cómo presento charadas de emociones en clase?",
        answer:
          "Modela dos o tres emociones primero y pide que describan qué gestos observaron. Luego deja que equipos voluntarios actúen las siguientes cartas manteniendo el ambiente seguro.",
      },
      {
        question: "¿Qué edades aprovechan más la dinámica?",
        answer:
          "Funciona muy bien de 2.º a 8.º grado, pero adolescentes y adultos también la disfrutan cuando sumas escritura o debate. Es útil en entrenamientos de empatía corporativa.",
      },
      {
        question: "¿Cómo apoyo a participantes neurodivergentes?",
        answer:
          "Ofrece opciones alternativas como dibujar o usar un objeto, da más tiempo para planear y deja claro que pasar la carta es válido. Divide el grupo en pods pequeños para bajar la carga sensorial.",
      },
      {
        question: "¿Puedo mezclar emociones con otras categorías?",
        answer:
          "Sí. Alterna con acciones, animales u objetos como rondas de recompensa o usa el generador aleatorio para cerrar la actividad una vez cubierto el objetivo SEL.",
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    introTitle: string;
    introLead: string;
    introColumns: Array<{
      title: string;
      items: string[];
      background: string;
      headingColor: string;
      textColor: string;
    }>;
    activitiesTitle: string;
    activities: Array<{
      title: string;
      description: string;
      items: string[];
    }>;
    tipsTitle: string;
    tips: Array<{
      title: string;
      items: string[];
    }>;
    integrationTitle: string;
    integrationLead: string;
    integrationCards: Array<{
      title: string;
      items: string[];
    }>;
    integrationFooter: {
      before: string;
      linkText: string;
      after: string;
      href: string;
    };
    faqTitle: string;
    faq: Array<{ question: string; answer: string }>;
  }
>;
