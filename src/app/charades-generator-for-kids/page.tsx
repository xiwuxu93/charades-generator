import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charades Generator for Kids - Free Children\'s Word Game Ideas',
  description: 'Free online charades generator for kids with 500+ child-friendly words. Disney characters, animals, simple actions perfect for children\'s parties. Educational and safe fun!',
  keywords: 'charades generator for kids, kids charades ideas, children charades generator, charades for kids disney, kids party games, educational charades, family charades generator',
  openGraph: {
    title: 'Charades Generator for Kids - Free Children\'s Word Game Ideas',
    description: 'Free online charades generator for kids with Disney characters, animals, and age-appropriate content.',
    type: 'website',
  },
};

export default function KidsCharadesPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      <StructuredData 
        type="Game"
        name="Kids Charades Generator"
        description="Free online charades generator designed specifically for children with age-appropriate words and themes"
        url="https://charades-generator.com/charades-generator-for-kids"
        category="Educational Game"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎭👶</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Charades Generator for Kids
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fun and educational charades words perfect for children! Featuring Disney characters, 
            friendly animals, simple actions, and age-appropriate movies.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Kids Love Our Charades Generator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🏰</div>
              <h3 className="font-bold text-lg mb-2">Disney Magic</h3>
              <p className="text-gray-600">All their favorite Disney characters and movies</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🐾</div>
              <h3 className="font-bold text-lg mb-2">Friendly Animals</h3>
              <p className="text-gray-600">Cute animals they can easily act out</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📚</div>
              <h3 className="font-bold text-lg mb-2">Educational Fun</h3>
              <p className="text-gray-600">Learn while playing with age-appropriate content</p>
            </div>
          </div>
        </div>

        <CharadesGenerator 
          defaultAgeGroup="kids"
          title="Kids Charades Generator"
          description="Safe and fun charades words perfect for children! All content is age-appropriate and educational."
          hideAgeGroupFilter={true}
        />

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tips for Playing Charades with Kids</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-yellow-800">Make it Easy</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Start with simple, one-word charades</li>
                <li>Use familiar characters and animals</li>
                <li>Give gentle hints if they&apos;re stuck</li>
                <li>Focus on fun, not competition</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-yellow-800">Keep it Fun</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Celebrate every attempt</li>
                <li>Let kids act out their favorite characters</li>
                <li>Use props if available</li>
                <li>Take turns and include everyone</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}