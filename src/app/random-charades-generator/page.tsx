import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Charades Generator - Instant Random Words for Party Games",
  description:
    "True random charades generator! Get instant random charades words from 1000+ database. Perfect for spontaneous party games, team building, family fun. Generate 1-50 random charades words instantly. No ads, completely free!",
  keywords:
    "random charades generator, random charades words, charades word generator, instant random charades, true random generator, random party games, spontaneous charades, random game generator, mixed category charades, surprise charades words",
  alternates: {
    canonical: "https://charades-generator.com/random-charades-generator/",
  },
  openGraph: {
    title: "Random Charades Generator - Instant Random Words for Party Games",
    description:
      "True random charades generator! Get instant random charades words from 1000+ database. Perfect for spontaneous party games and family fun.",
    type: "website",
    url: "https://charades-generator.com/random-charades-generator/",
  },
  robots: "index, follow",
};

export default function RandomCharadesGenerator() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <StructuredData
        type="WebApplication"
        name="Random Charades Generator - Instant Random Words"
        description="True random charades generator! Get instant random charades words from 1000+ database. Perfect for spontaneous party games and family fun."
        url="https://charades-generator.com/random-charades-generator/"
        category="Random Party Games"
      />

      <CharadesGenerator
        defaultCategory="all"
        title="Random Charades Generator"
        description="Get completely random charades words from ALL categories! Perfect for unpredictable party fun and spontaneous game sessions."
        hideCategoryFilter={true}
      />
    </div>
  );
}
