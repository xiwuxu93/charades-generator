import { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";
import HowToStructuredData from "@/components/HowToStructuredData";
import { buildLocalePath } from "@/utils/localePaths";

const howToExtras = {
  en: {
    teamTitle: "Running charades with teams & large groups",
    teamDescription:
      "When people search how to play charades in teams or with a large group, they’re really asking for structure. Keep games flowing with staggered timers and clear hosting roles.",
    teamTips: [
      "Split into two to four squads of 3-6 players so no one waits more than a couple minutes.",
      "Use alternating 60-second turns and let opposing teams steal for bonus points.",
      "Bring a whiteboard or shared doc to log scores, captains, and standout improv moments.",
      "Recycle unused prompts into a sudden-death pile for lightning tie-breakers.",
    ],
    kitTitle: "Need a printable score & timer sheet?",
    kitDescription: "Download the Quick-Play Kit for round trackers, signal legends, and host cues.",
    kitCta: "Open the Quick-Play Kit",
    reverseTitle: "Reverse charades basics",
    reverseDescription:
      "Reverse charades flips the format: the whole team acts while one person guesses. It’s perfect for loud groups and shows up constantly in “how to play reverse charades” searches.",
    reverseSteps: [
      "Choose one guesser per round and have the rest of the team read the same prompt.",
      "Give actors 15 seconds to plan silent gestures before the timer starts.",
      "If the guesser is stuck, allow the team one tag-in where another member becomes the guesser.",
      "Rotate through every player so everyone experiences acting and guessing.",
    ],
  },
  es: {
    teamTitle: "Cómo gestionar charadas con equipos o grupos grandes",
    teamDescription:
      "Cuando alguien busca cómo jugar charadas en equipos o con grupos grandes, necesita orden. Define turnos, capitanes y temporizadores desde el inicio para que el ritmo no se pierda.",
    teamTips: [
      "Crea dos a cuatro equipos de 3-6 jugadores para evitar esperas largas.",
      "Alterna turnos de 60 segundos y permite que el equipo rival robe el punto si acierta.",
      "Usa una pizarra o documento compartido para anotar puntajes, capitanes y mejores mímicas.",
      "Reserva las palabras no usadas para un desempate relámpago al final.",
    ],
    kitTitle: "¿Necesitas plantillas imprimibles?",
    kitDescription: "Descarga el Quick-Play Kit con tableros de puntuación, señales y recordatorios para el anfitrión.",
    kitCta: "Abrir Quick-Play Kit",
    reverseTitle: "Conceptos básicos de reverse charades",
    reverseDescription:
      "En reverse charades todo el equipo actúa y una sola persona adivina. Es ideal para grupos ruidosos y es una de las preguntas más frecuentes sobre el juego.",
    reverseSteps: [
      "Elige a un adivinador por ronda y permite que el resto lea el mismo prompt.",
      "Da 15 segundos para planear gestos en silencio antes de iniciar el cronómetro.",
      "Si el adivinador se queda bloqueado, permite un “tag-in” para cambiar de rol una vez.",
      "Rota los papeles para que todos actúen y adivinen durante la sesión.",
    ],
  },
} satisfies Record<Locale, {
  teamTitle: string;
  teamDescription: string;
  teamTips: string[];
  kitTitle: string;
  kitDescription: string;
  kitCta: string;
  reverseTitle: string;
  reverseDescription: string;
  reverseSteps: string[];
}>;

const supportingGuides = {
  en: [
    {
      title: "Classroom charades guide",
      description: "Lesson-friendly formats for teachers using kids and random generators.",
      href: "/classroom-charades-guide/",
    },
    {
      title: "Online & Zoom charades",
      description: "Remote-friendly charades ideas powered by random and reverse modes.",
      href: "/online-charades-guide/",
    },
    {
      title: "Family game night playbook",
      description: "Step-by-step plan for running family charades nights at home.",
      href: "/family-game-night/",
    },
  ],
  es: [
    {
      title: "Guía de charadas en el aula",
      description: "Formatos listos para clase usando los modos infantil y aleatorio.",
      href: "/classroom-charades-guide/",
    },
    {
      title: "Charadas online y por Zoom",
      description: "Ideas para videollamadas usando los modos aleatorio y reverse.",
      href: "/online-charades-guide/",
    },
    {
      title: "Playbook de noche de juegos en familia",
      description: "Plan sencillo para noches de charadas en casa con peques y adultos.",
      href: "/family-game-night/",
    },
  ],
} satisfies Record<
  Locale,
  Array<{
    title: string;
    description: string;
    href: string;
  }>
>;

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

  const canonicalPath = "/how-to-use";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.howToUse.title,
    description: dictionary.seo.howToUse.description,
    keywords: dictionary.seo.howToUse.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.howToUse.title,
      description: dictionary.seo.howToUse.description,
      type: "article",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.howToUse.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.howToUse.title,
      description: dictionary.seo.howToUse.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function HowToUsePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const extras = howToExtras[locale] ?? howToExtras.en;
  const quickKitHref = buildLocalePath(locale, "/quick-play-kit/");
  const themedGenerators = dictionary.home?.themedGenerators;
  const guides = supportingGuides[locale] ?? supportingGuides.en;
  const steps = [
    dictionary.pages.howToUse.step1,
    dictionary.pages.howToUse.step2,
    dictionary.pages.howToUse.step3,
    dictionary.pages.howToUse.step4,
    dictionary.pages.howToUse.step5,
    dictionary.pages.howToUse.step6,
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.howToUse.title}
      </h1>

      <HowToStructuredData
        name={dictionary.pages.howToUse.title}
        description={dictionary.seo.howToUse.description}
        steps={steps}
        totalTime="PT10M"
        supplies={["Timer", "Score sheet"]}
        tools={["Charades Generator"]}
      />

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.whatIsCharades}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.whatIsCharadesDescription}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.howToPlay}
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>{dictionary.pages.howToUse.step1}</li>
            <li>{dictionary.pages.howToUse.step2}</li>
            <li>{dictionary.pages.howToUse.step3}</li>
            <li>{dictionary.pages.howToUse.step4}</li>
            <li>{dictionary.pages.howToUse.step5}</li>
            <li>{dictionary.pages.howToUse.step6}</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.basicRules}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.rule1}</li>
            <li>{dictionary.pages.howToUse.rule2}</li>
            <li>{dictionary.pages.howToUse.rule3}</li>
            <li>{dictionary.pages.howToUse.rule4}</li>
            <li>{dictionary.pages.howToUse.rule5}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.usingGenerator}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.generatorDescription}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.generatorStep1}</li>
            <li>{dictionary.pages.howToUse.generatorStep2}</li>
            <li>{dictionary.pages.howToUse.generatorStep3}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.tips}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.tip1}</li>
            <li>{dictionary.pages.howToUse.tip2}</li>
            <li>{dictionary.pages.howToUse.tip3}</li>
            <li>{dictionary.pages.howToUse.tip4}</li>
            <li>{dictionary.pages.howToUse.tip5}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.benefits}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.benefitsDescription}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.howToUse.benefit1}</li>
            <li>{dictionary.pages.howToUse.benefit2}</li>
            <li>{dictionary.pages.howToUse.benefit3}</li>
            <li>{dictionary.pages.howToUse.benefit4}</li>
          </ul>
        </section>

        {themedGenerators && (
          <section className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {dictionary.home.themedHeading}
            </h2>
            <p className="text-gray-700 mb-4">
              {dictionary.home.themedDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {themedGenerators.slice(0, 5).map((generator) => (
                <Link
                  key={generator.href}
                  href={buildLocalePath(locale, generator.href)}
                  className="group flex flex-col rounded-xl border border-blue-100 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {generator.badge}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                    {generator.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 flex-1">
                    {generator.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-blue-600">
                    {dictionary.home.browsePromptsLabel}
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {dictionary.pages.howToUse.playbooksHeading}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.playbooksDescription}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={buildLocalePath(locale, guide.href)}
                className="group flex h-full flex-col rounded-xl bg-white p-4 shadow-sm border border-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-1">{guide.description}</p>
                <span className="mt-3 inline-flex items-center text-sm font-semibold text-blue-600">
                  {dictionary.home.readMoreLabel}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {dictionary.pages.howToUse.gearHeading}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.howToUse.gearDescription}
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{extras.teamTitle}</h2>
          <p className="text-gray-700 mb-4">{extras.teamDescription}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {extras.teamTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <div className="mt-5 rounded-xl border border-green-200 bg-white p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-1">{extras.kitTitle}</h3>
            <p className="text-gray-700 mb-3">{extras.kitDescription}</p>
            <Link
              href={quickKitHref}
              className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              {extras.kitCta}
            </Link>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">{extras.reverseTitle}</h2>
          <p className="text-gray-700 mb-4">{extras.reverseDescription}</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {extras.reverseSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.howToUse.fieldNotesTitle}
          </h2>
          <p className="text-gray-700 mb-6">{dictionary.pages.howToUse.fieldNotesDescription}</p>
          <div className="space-y-6">
            {dictionary.pages.howToUse.fieldNotes.map((note) => (
              <article key={note.heading} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{note.heading}</h3>
                <p className="mt-2 text-gray-600">{note.description}</p>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
                  {note.takeawaysTitle}
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-600">
                  {note.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {dictionary.pages.howToUse.readyToPlay}
          </h3>
          <p className="text-blue-800 mb-4">
            {dictionary.pages.howToUse.readyToPlayDescription}
          </p>
          <Link
            href={buildLocalePath(locale, "/")}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {dictionary.pages.howToUse.startGenerating}
          </Link>
        </div>
      </div>
    </div>
  );
}
