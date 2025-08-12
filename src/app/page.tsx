import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import FAQStructuredData from '@/components/FAQStructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Charades Generator Online - 1000+ Free Words & Ideas for Game Night',
  description: 'Generate instant charades words from 1000+ database. Best free online charades generator for kids, adults, parties. Includes movies, Disney, animals, actions, funny words. Perfect for family game nights, team building & classroom activities.',
  keywords: 'best charades generator online, free charades words generator, charades game ideas, instant charades generator, charades for kids, charades for adults, party games, family night games, group activities, team building games, charades movies, disney charades, animal charades, funny charades, classroom games, charades database',
  alternates: {
    canonical: 'https://charades-generator.com',
  },
  openGraph: {
    title: 'Best Charades Generator Online - 1000+ Free Words & Ideas',
    description: 'Generate instant charades words from 1000+ database. Best free online charades generator for kids, adults, parties. Includes movies, Disney, animals, actions, funny words.',
    type: 'website',
    url: 'https://charades-generator.com',
  },
  robots: 'index, follow',
};

export default function Home() {
  return (
    <div className="bg-gray-50">
      <StructuredData 
        type="WebApplication"
        name="Best Charades Generator Online - Free Words & Ideas"
        description="Generate instant charades words from 1000+ database. Best free online charades generator for kids, adults, parties. Includes movies, Disney, animals, actions, funny words."
        url="https://charades-generator.com"
        category="Party Games"
      />
      <FAQStructuredData />
      <CharadesGenerator />
    </div>
  );
}
