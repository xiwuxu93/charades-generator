import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movie Charades Generator - Free Film & Cinema Word Ideas',
  description: 'Free movie charades generator with 200+ films from Hollywood classics to modern blockbusters. Perfect for movie night parties, film buffs, and cinema lovers!',
  keywords: 'movie charades generator, film charades ideas, charades movies list, movie title charades, cinema charades generator, hollywood charades game',
  openGraph: {
    title: 'Movie Charades Generator - Free Film & Cinema Word Ideas',
    description: 'Free movie charades generator with films from Hollywood classics to modern blockbusters.',
    type: 'website',
  },
};

export default function MovieCharadesPage() {
  return (
    <div className="bg-gradient-to-br from-red-50 to-yellow-50">
      <StructuredData 
        type="Game"
        name="Movie Charades Generator"
        description="Free online charades generator featuring classic and modern movies across all genres"
        url="https://charades-generator.com/movie-charades-generator"
        category="Movie Trivia Game"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎬🍿</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Movie Charades Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lights, camera, action! Act out classic Hollywood films, modern blockbusters, 
            animated favorites, and indie gems. Perfect for movie lovers and film buffs!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie Genres We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ color: '#11191f' }}>
            <div className="text-center p-3 bg-red-100 rounded-lg">
              <div className="text-2xl mb-2">🦸</div>
              <p className="font-semibold">Action & Superhero</p>
            </div>
            <div className="text-center p-3 bg-pink-100 rounded-lg">
              <div className="text-2xl mb-2">💕</div>
              <p className="font-semibold">Romance</p>
            </div>
            <div className="text-center p-3 bg-purple-100 rounded-lg">
              <div className="text-2xl mb-2">👻</div>
              <p className="font-semibold">Horror & Thriller</p>
            </div>
            <div className="text-center p-3 bg-yellow-100 rounded-lg">
              <div className="text-2xl mb-2">😂</div>
              <p className="font-semibold">Comedy</p>
            </div>
            <div className="text-center p-3 bg-blue-100 rounded-lg">
              <div className="text-2xl mb-2">🎭</div>
              <p className="font-semibold">Drama</p>
            </div>
            <div className="text-center p-3 bg-green-100 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <p className="font-semibold">Animation</p>
            </div>
            <div className="text-center p-3 bg-orange-100 rounded-lg">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-semibold">Sci-Fi</p>
            </div>
            <div className="text-center p-3 bg-gray-100 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <p className="font-semibold">Classics</p>
            </div>
          </div>
        </div>

        <CharadesGenerator 
          defaultCategory="movies"
          title="Movie Charades Generator"
          description="Hollywood classics to modern blockbusters! Act out your favorite films from action to romance, comedy to drama."
          hideCategoryFilter={true}
        />

        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pro Tips for Movie Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-red-800">Acting Techniques</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Use iconic scenes or memorable moments</li>
                <li>Focus on distinctive character traits</li>
                <li>Recreate famous movie poses</li>
                <li>Show the movie&apos;s genre first (action, romance, etc.)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-red-800">Guessing Strategies</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Think about popular movies from different eras</li>
                <li>Consider the actor&apos;s signature roles</li>
                <li>Look for genre clues in the performance</li>
                <li>Pay attention to the number of words being shown</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}