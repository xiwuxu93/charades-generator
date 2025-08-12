import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disney Charades Generator - Free Disney Characters & Movies',
  description: 'Free Disney charades generator with 100+ beloved characters and movies. Frozen, Mickey Mouse, Moana, Lion King and more! Perfect for Disney fans and kids parties.',
  keywords: 'disney charades generator, disney characters charades, frozen charades ideas, mickey mouse charades, disney movie charades, disney party games generator',
  alternates: {
    canonical: 'https://charades-generator.com/disney-charades-generator',
  },
  openGraph: {
    title: 'Disney Charades Generator - Free Disney Characters & Movies',
    description: 'Free Disney charades generator with beloved characters and classic movies.',
    type: 'website',
    url: 'https://charades-generator.com/disney-charades-generator',
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
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd"/>
            </svg>
          </div>
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
            <div className="text-center p-6 bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg border-l-4 border-blue-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Disney Princesses</h3>
              <p className="text-gray-700 text-sm">Elsa, Anna, Moana, Belle, Ariel, and more magical princesses</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-red-100 to-red-200 rounded-lg border-l-4 border-red-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Classic Characters</h3>
              <p className="text-gray-700 text-sm">Mickey Mouse, Donald Duck, Goofy, and timeless favorites</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-b from-purple-100 to-purple-200 rounded-lg border-l-4 border-purple-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
                </svg>
              </div>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acting Disney Characters</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Elsa:</strong> Pretend to create ice magic with your hands</li>
              <li><strong>Mickey Mouse:</strong> Make big round ears with your hands</li>
              <li><strong>Simba:</strong> Roar like a lion and show a mane</li>
              <li><strong>Buzz Lightyear:</strong> Strike a heroic pose and &quot;fly&quot;</li>
              <li><strong>Ariel:</strong> Swim like a mermaid and brush your hair</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Disney Party Tips</h2>
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