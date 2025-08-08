import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disney Charades Generator - Free Disney Characters & Movies',
  description: 'Free Disney charades generator with 100+ beloved characters and movies. Frozen, Mickey Mouse, Moana, Lion King and more! Perfect for Disney fans and kids parties.',
  keywords: 'disney charades generator, disney characters charades, frozen charades ideas, mickey mouse charades, disney movie charades, disney party games generator',
  openGraph: {
    title: 'Disney Charades Generator - Free Disney Characters & Movies',
    description: 'Free Disney charades generator with beloved characters and classic movies.',
    type: 'website',
  },
};

export default function DisneyCharadesPage() {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <StructuredData 
        type="Game"
        name="Disney Charades Generator"
        description="Free Disney-themed charades generator featuring beloved characters and movies from the magical world of Disney"
        url="https://charades-generator.com/disney-charades-generator"
        category="Disney Family Game"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏰✨</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Disney Charades Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter the magical world of Disney! Act out beloved characters, classic movies, 
            and enchanting stories from Mickey Mouse to Frozen and everything in between.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Disney Magic Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="font-bold text-lg mb-2">Disney Princesses</h3>
              <p className="text-gray-700 text-sm">Elsa, Anna, Moana, Belle, Ariel, and more magical princesses</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-b from-red-100 to-red-200 rounded-lg">
              <div className="text-4xl mb-3">🐭</div>
              <h3 className="font-bold text-lg mb-2">Classic Characters</h3>
              <p className="text-gray-700 text-sm">Mickey Mouse, Donald Duck, Goofy, and timeless favorites</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-b from-purple-100 to-purple-200 rounded-lg">
              <div className="text-4xl mb-3">🦁</div>
              <h3 className="font-bold text-lg mb-2">Animated Movies</h3>
              <p className="text-gray-700 text-sm">Lion King, Toy Story, Finding Nemo, and animated classics</p>
            </div>
          </div>
        </div>

        <CharadesGenerator 
          defaultCategory="disney"
          title="Disney Charades Generator"
          description="Magical Disney characters and movies! Act out your favorite Disney heroes, princesses, and classic stories."
          hideCategoryFilter={true}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🎭 Acting Disney Characters</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Elsa:</strong> Pretend to create ice magic with your hands</li>
              <li><strong>Mickey Mouse:</strong> Make big round ears with your hands</li>
              <li><strong>Simba:</strong> Roar like a lion and show a mane</li>
              <li><strong>Buzz Lightyear:</strong> Strike a heroic pose and &quot;fly&quot;</li>
              <li><strong>Ariel:</strong> Swim like a mermaid and brush your hair</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 Disney Party Tips</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Play Disney music in the background</li>
              <li>Encourage costumes or Disney accessories</li>
              <li>Mix classic and modern Disney content</li>
              <li>Create teams based on Disney movies</li>
              <li>Award &quot;magical&quot; prizes for participation</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Perfect for Disney Fans!</h3>
          <p className="text-gray-600">
            Whether you&apos;re planning a Disney-themed party, family game night, or just want to relive 
            the magic, our Disney charades generator brings the enchantment right to your living room!
          </p>
        </div>
      </div>
    </div>
  );
}