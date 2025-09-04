import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Charades Generator - Free Film & Cinema Words",
  description:
    "Free movie charades with 200+ films! Hollywood classics to modern blockbusters. Perfect for movie night parties & cinema lovers.",
  keywords:
    "movie charades, film charades, movie title charades, cinema charades, hollywood charades",
  alternates: {
    canonical: "https://charades-generator.com/movie-charades-generator",
  },
  openGraph: {
    title: "Movie Charades Generator - Free Film & Cinema Words",
    description:
      "Free movie charades with 200+ films! Hollywood classics to modern blockbusters. Perfect for movie night parties & cinema lovers.",
    type: "website",
    url: "https://charades-generator.com/movie-charades-generator",
  },
};

export default function MovieCharadesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <StructuredData
        type="Game"
        name="Movie Charades Generator"
        description="Free online charades generator featuring classic and modern movies across all genres"
        url="https://charades-generator.com/movie-charades-generator"
        category="Movie Trivia Game"
      />

      <CharadesGenerator
        defaultCategory="movies"
        title="Movie Charades Generator"
        description="Hollywood classics to modern blockbusters! Act out your favorite films from action to romance, comedy to drama."
        hideCategoryFilter={true}
      />
      
      {/* Movie charades specific content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        
        {/* Movie Genres Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Perfect for Movie Night Parties
          </h2>
          <p className="text-gray-600 mb-4">
            Beyond movies? Discover our <a href="/" className="text-blue-600 hover:text-blue-800 underline">complete charades generator</a> featuring books, TV shows, animals, actions, and dozens of other entertaining categories.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Hollywood Blockbusters</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Classic action movies and superhero films</li>
                <li>• Romantic comedies and drama favorites</li>
                <li>• Horror movies and thriller classics</li>
                <li>• Animation and family-friendly films</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Film Charades Events</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Movie night party entertainment</li>
                <li>• Cinema-themed birthday parties</li>
                <li>• Film buff gatherings and trivia nights</li>
                <li>• Award show viewing parties</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Movie Categories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included in Movie Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Classic Movies</h3>
              <p className="text-purple-700 text-sm">Timeless films from Hollywood's golden age to modern classics</p>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Popular Blockbusters</h3>
              <p className="text-green-700 text-sm">Recent hits and box office favorites everyone knows</p>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Animated Films</h3>
              <p className="text-orange-700 text-sm">Family favorites from Disney, Pixar, and animation studios</p>
            </div>
          </div>
        </div>

        {/* Acting Tips */}
        <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Act Out Movie Titles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Acting Techniques:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Act out iconic scenes from the movie</li>
                <li>Show the movie genre first (action, romance, etc.)</li>
                <li>Use character gestures and mannerisms</li>
                <li>Recreate memorable movie moments</li>
                <li>Show the movie's emotional tone</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Guessing Strategy:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Think about popular movies from different decades</li>
                <li>Consider the actor's famous roles</li>
                <li>Look for genre clues in the performance</li>
                <li>Pay attention to the number of words shown</li>
                <li>Ask about specific movie elements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Movie Charades FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Movie Charades FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many movie titles are in your database?</h3>
              <p className="text-gray-600">Our movie charades generator includes 200+ carefully selected film titles spanning from classic Hollywood movies to modern blockbusters across all genres including action, comedy, drama, horror, and animation.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Are these movies suitable for all ages?</h3>
              <p className="text-gray-600">Yes! Our movie charades collection includes family-friendly options perfect for all ages, with popular animated films, classic comedies, and well-known movies that everyone can enjoy and recognize.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this for movie-themed parties?</h3>
              <p className="text-gray-600">Absolutely! Movie charades is perfect for film-themed parties, movie night entertainment, cinema birthday celebrations, and any gathering where movie lovers come together for fun.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What types of movies are included?</h3>
              <p className="text-gray-600">Our database covers action movies, romantic comedies, animated films, horror classics, sci-fi blockbusters, drama favorites, superhero movies, and timeless cinema classics from every era.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
