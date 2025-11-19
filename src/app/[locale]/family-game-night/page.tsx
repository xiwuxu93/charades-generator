import { Metadata } from "next";
import Link from "next/link";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl } from "@/utils/seo";
import { buildLocalePath } from "@/utils/localePaths";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Family Game Night with Charades – Playbook",
    description:
      "A simple playbook for running family game night with charades, featuring movie, Disney, and kids generators.",
  },
  es: {
    title: "Noche de juegos en familia con charadas – Playbook",
    description:
      "Playbook sencillo para organizar noches de juegos familiares con charadas usando los generadores de pelis, Disney e infantil.",
  },
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const meta = metaByLocale[locale] ?? metaByLocale.en;

  const canonicalPath = "/family-game-night";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      url: canonicalUrl,
      locale: locale === "en" ? "en_US" : "es_ES",
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function FamilyGameNightPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const isEn = locale === "en";

  const t = isEn
    ? {
        heading: "Family game night playbook with charades",
        intro:
          "Use the main charades generator plus the kids, movie, and Disney pages to build an easy repeatable game night plan.",
        section1Title: "Plan the evening in three rounds",
        rounds: [
          {
            title: "Round 1 – Kids first",
            items: [
              "Start with the kids charades generator on easy mode.",
              "Let younger players act while adults guess to build confidence.",
              "Keep the timer generous so everyone gets a win early.",
            ],
          },
          {
            title: "Round 2 – Movie mashup",
            items: [
              "Switch to the movie charades generator for mixed-age prompts.",
              "Alternate actors between kids and adults each turn.",
              "Award bonus points for dramatic movie reenactments.",
            ],
          },
          {
            title: "Round 3 – Disney finale",
            items: [
              "Use the Disney charades generator for the last big round.",
              "Let the biggest Disney fan in the room choose categories.",
              "Close the night with a team performance of a favourite scene.",
            ],
          },
        ],
        section2Title: "House rules that keep things kind",
        rules: [
          "Celebrate attempts, not just correct answers—especially for shy players.",
          "Rotate captains so each person gets to lead at least one round.",
          "Allow one “help” gesture from a teammate when someone is stuck.",
          "Agree on a clear end time so kids can wind down after the game.",
        ],
        section3Title: "Quick links for your next game night",
        homeLabel: "Main charades generator",
        movieLabel: "Movie charades generator",
        disneyLabel: "Disney charades generator",
        kidsLabel: "Kids charades generator",
      }
    : {
        heading: "Playbook de noche de juegos en familia con charadas",
        intro:
          "Combina el generador principal con las páginas de niños, películas y Disney para crear una noche de juegos que puedas repetir cada semana.",
        section1Title: "Planifica la velada en tres rondas",
        rounds: [
          {
            title: "Ronda 1 – Protagonistas los peques",
            items: [
              "Empieza con el generador infantil en nivel fácil.",
              "Deja que actúen los niños mientras las personas adultas adivinan.",
              "Usa tiempos generosos para que todos tengan aciertos al inicio.",
            ],
          },
          {
            title: "Ronda 2 – Mezcla de pelis",
            items: [
              "Cambia al generador de películas para prompts aptos para todas las edades.",
              "Alterna quién actúa entre peques y adultos en cada turno.",
              "Da puntos extra a las recreaciones más dramáticas.",
            ],
          },
          {
            title: "Ronda 3 – Gran final Disney",
            items: [
              "Usa el generador Disney para la ronda final.",
              "Deja que la persona más fan de Disney elija la categoría.",
              "Cierra la noche con una escena colectiva de la peli favorita.",
            ],
          },
        ],
        section2Title: "Reglas de la casa para mantener la armonía",
        rules: [
          "Celebra el intento, no solo el acierto, sobre todo con quienes son más tímidos.",
          "Rota las capitanías para que cada miembro de la familia lidere una ronda.",
          "Permite un gesto de ayuda cuando alguien se bloquee.",
          "Acordad a qué hora termina el juego para favorecer la rutina de sueño.",
        ],
        section3Title: "Enlaces rápidos para tu próxima noche de juegos",
        homeLabel: "Generador principal de charadas",
        movieLabel: "Generador de charadas de películas",
        disneyLabel: "Generador de charadas Disney",
        kidsLabel: "Generador de charadas para niños",
      };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.heading}</h1>
      <p className="text-gray-700 mb-8">{t.intro}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.section1Title}</h2>
        <div className="space-y-4">
          {t.rounds.map((round) => (
            <article key={round.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{round.title}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {round.items.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{t.section2Title}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {t.rules.map((rule: string) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-xl border border-indigo-100 bg-indigo-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.section3Title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.homeLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open main generator" : "Abrir generador principal"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.movieLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/movie-charades-generator/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open movie generator" : "Abrir generador de películas"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.disneyLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/disney-charades-generator/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open Disney generator" : "Abrir generador Disney"}
            </Link>
          </article>
          <article className="rounded-lg bg-white p-4 border border-indigo-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{t.kidsLabel}</h3>
            <Link
              href={buildLocalePath(locale, "/charades-generator-for-kids/")}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              {isEn ? "Open kids generator" : "Abrir generador infantil"}
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}

