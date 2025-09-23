import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import StructuredData from "@/components/StructuredData";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import SiteLinksStructuredData from "@/components/SiteLinksStructuredData";
import { pickWords } from "@/utils/charades";
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Critical content first for better LCP */}
      <CharadesGeneratorOptimized initialWords={initialWords} />
      
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
