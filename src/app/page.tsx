import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import WebsiteStructuredData from "@/components/WebsiteStructuredData";
import SiteLinksStructuredData from "@/components/SiteLinksStructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Charades Generator - 1000+ Free Words & Ideas [No Ads]",
  description:
    "Random charades generator with 1000+ words database! Free instant charades words for kids, adults, parties. Movies, Disney, animals, actions, funny words. Perfect random charades word generator for family game nights, team building & classroom activities.",
  keywords:
    "random charades generator, charades word generator, free charades words generator, random charades words, best charades generator online, charades game ideas, instant charades generator, words for charades generator, charades for kids, charades for adults, party games, family night games, group activities, team building games, charades movies, disney charades, animal charades, funny charades, classroom games, charades database",
  alternates: {
    canonical: "https://charades-generator.com",
  },
  openGraph: {
    title: "Random Charades Generator - 1000+ Free Words & Ideas [No Ads]",
    description:
      "Random charades generator with 1000+ words database! Free instant charades words for kids, adults, parties. Movies, Disney, animals, actions, funny words.",
    type: "website",
    url: "https://charades-generator.com",
  },
  robots: "index, follow",
};

export default function Home() {
  return (
    <div className="bg-gray-50">
      <WebsiteStructuredData />
      <SiteLinksStructuredData />
      <StructuredData
        type="WebApplication"
        name="Random Charades Generator - Free Words & Ideas"
        description="Random charades generator with 1000+ words database! Free instant charades words for kids, adults, parties. Includes movies, Disney, animals, actions, funny words."
        url="https://charades-generator.com"
        category="Party Games"
      />
      <FAQStructuredData />
      <CharadesGenerator />
    </div>
  );
}
