import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import SiteLinksStructuredData from "@/components/SiteLinksStructuredData";
import { pickWords } from "@/utils/charades";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charades Generator - Free 1000+ Words & Ideas",
  description:
    "Free charades generator with 1000+ words! Instant charades words for kids, adults, parties. Movies, Disney, animals, actions & more categories.",
  keywords:
    "charades generator, free charades words, charades game, party games, family games, disney charades",
  alternates: {
    canonical: "https://charades-generator.com/",
  },
  openGraph: {
    title: "Charades Generator - Free 1000+ Words & Ideas",
    description:
      "Free charades generator with 1000+ words! Instant charades words for kids, adults, parties. Movies, Disney, animals, actions & more.",
    type: "website",
    url: "https://charades-generator.com/",
  },
  robots: "index, follow",
};

export default function Home() {
  const initialWords = pickWords("all", "all", "all", 3);

  const themedGenerators = [
    {
      title: "Kids Charades Generator",
      href: "/charades-generator-for-kids/",
      description: "Age-appropriate prompts for family nights, classrooms, and rainy-day playdates.",
      badge: "Family favorite",
    },
    {
      title: "Movie Charades Generator",
      href: "/movie-charades-generator/",
      description: "Classic blockbusters to new releases—perfect for film buffs and home theater parties.",
      badge: "Film night",
    },
    {
      title: "Christmas Charades Generator",
      href: "/christmas-charades-generator/",
      description: "Festive prompts, holiday traditions, and family-friendly laughs for December gatherings.",
      badge: "Seasonal hit",
    },
    {
      title: "Funny Charades for Adults",
      href: "/funny-charades-for-adults/",
      description: "From office icebreakers to late-night parties, grab hilarious scenarios on demand.",
      badge: "Party ready",
    },
  ];

  const playGuides = [
    {
      title: "How to Use Charades Generator",
      href: "/how-to-use/",
      description: "Step-by-step setup, scoring ideas, and tips for every group size.",
    },
    {
      title: "Charades FAQ & Troubleshooting",
      href: "/faq/",
      description: "Answers to the most common gameplay questions, house rules, and customization ideas.",
    },
    {
      title: "Feedback & Feature Requests",
      href: "/feedback/",
      description: "Tell us what themes or printable packs you want next—we read every suggestion.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Critical content first for better LCP */}
      <CharadesGeneratorOptimized initialWords={initialWords} />

      {/* Navigation to themed generators */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em]">Explore more</p>
            <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Pick a themed charades generator</h2>
                <p className="text-gray-600 mt-2">
                  Jump straight into curated word banks built for kids, movie buffs, holiday gatherings, or laugh-out-loud adult parties.
                </p>
              </div>
              <Link
                href="/random-charades-generator/"
                className="inline-flex items-center justify-center rounded-md border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                I feel lucky →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {themedGenerators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {item.badge}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-1">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                  Browse prompts
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
        </div>
      </section>

      {/* Guides and resources */}
      <section className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-[0.2em]">Plan & learn</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Guides, rules, and ways to make charades unforgettable</h2>
            <p className="mt-2 text-gray-600">
              Learn new twists, download resources, and share feedback so we can keep improving the experience for your next game night.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {playGuides.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-1">
                  {resource.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-green-600">
                  Read more
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
        </div>
      </section>
      
      {/* Structured data - small, non-blocking */}
      <WebsiteStructuredData />
      <SiteLinksStructuredData />
      <StructuredData
        type="WebApplication"
        name="Charades Generator - Free Words & Ideas"
        description="Charades Generator with 1000+ words database! Free instant charades words for kids, adults, parties. Includes movies, Disney, animals, actions, funny words."
        url="https://charades-generator.com/"
        category="Party Games"
      />
    </div>
  );
}
