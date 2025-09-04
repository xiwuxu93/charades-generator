import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disney Charades Generator - Free Characters & Movies",
  description:
    "Free Disney charades with 100+ characters! Frozen, Mickey Mouse, Moana, Lion King & more. Perfect for Disney parties & kids birthday celebrations.",
  keywords:
    "disney charades, disney characters, frozen charades, mickey mouse charades, disney party games",
  alternates: {
    canonical: "https://charades-generator.com/disney-charades-generator",
  },
  openGraph: {
    title: "Disney Charades Generator - Free Characters & Movies",
    description:
      "Free Disney charades with 100+ characters! Frozen, Mickey Mouse, Moana, Lion King & more. Perfect for Disney parties & kids celebrations.",
    type: "website",
    url: "https://charades-generator.com/disney-charades-generator",
  },
};

export default function DisneyCharadesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <StructuredData
        type="Game"
        name="Disney Charades Generator"
        description="Free Disney-themed charades generator featuring beloved characters and movies from the magical world of Disney"
        url="https://charades-generator.com/disney-charades-generator"
        category="Disney Family Game"
      />

      <CharadesGenerator
        defaultCategory="disney"
        title="Disney Charades Generator"
        description="Magical Disney characters and movies! Act out your favorite Disney heroes, princesses, and classic stories."
        hideCategoryFilter={true}
      />
      
      {/* Disney charades specific content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        
        {/* Disney Party Ideas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Perfect for Disney Themed Parties
          </h2>
          <p className="text-gray-600 mb-4">
            Love Disney but want even more options? Try our <a href="/" className="text-purple-600 hover:text-purple-800 underline">full charades generator</a> with Disney plus hundreds of other categories including animals, movies, and books.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Disney Birthday Parties</h3>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Princess themed birthday celebrations</li>
                <li>• Disney character costume parties</li>
                <li>• Frozen and Elsa themed events</li>
                <li>• Mickey Mouse clubhouse parties</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">Family Disney Fun</h3>
              <ul className="text-pink-700 text-sm space-y-1">
                <li>• Disney movie night entertainment</li>
                <li>• Disney World trip preparation games</li>
                <li>• Family Disney trivia nights</li>
                <li>• Disney vacation planning activities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disney Characters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Disney Characters & Movies Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Disney Princesses</h3>
              <p className="text-blue-700 text-sm">Elsa, Anna, Moana, Belle, Ariel, Cinderella, and more magical princesses</p>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Classic Characters</h3>
              <p className="text-red-700 text-sm">Mickey Mouse, Donald Duck, Goofy, Pluto, and timeless Disney favorites</p>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Disney Movies</h3>
              <p className="text-green-700 text-sm">Lion King, Toy Story, Finding Nemo, Frozen, and beloved animated classics</p>
            </div>
          </div>
        </div>

        {/* Disney Charades Tips */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Act Out Disney Characters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-pink-800">Character Acting:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use signature gestures (Elsa's ice magic)</li>
                <li>Show character emotions and personality</li>
                <li>Act out famous Disney movie scenes</li>
                <li>Use distinctive character mannerisms</li>
                <li>Show the character's special powers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-800">Disney Guessing Tips:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Think about Disney movie themes</li>
                <li>Consider character relationships</li>
                <li>Look for princess or villain clues</li>
                <li>Remember Disney animal characters</li>
                <li>Think classic vs modern Disney</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disney Charades FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Disney Charades FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many Disney characters are included?</h3>
              <p className="text-gray-600">Our Disney charades generator includes 100+ beloved Disney characters and movies from classic animations to modern hits like Frozen, Moana, and Toy Story, covering princesses, villains, sidekicks, and iconic characters.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Are these suitable for Disney-themed birthday parties?</h3>
              <p className="text-gray-600">Absolutely! Disney charades is perfect for princess parties, Mickey Mouse celebrations, Frozen-themed birthdays, and any Disney character party where kids and families want magical entertainment.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do you include both classic and modern Disney?</h3>
              <p className="text-gray-600">Yes! Our collection spans from classic Disney like Snow White and Mickey Mouse to modern favorites like Elsa, Moana, and characters from recent Disney and Pixar movies.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can adults enjoy Disney charades too?</h3>
              <p className="text-gray-600">Definitely! Disney charades appeals to all ages. Adults love acting out their childhood favorites, and the nostalgic characters create fun intergenerational entertainment for the whole family.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What Disney movies are represented?</h3>
              <p className="text-gray-600">Our database includes characters and references from The Lion King, Frozen, Beauty and the Beast, The Little Mermaid, Toy Story, Finding Nemo, Moana, and many more Disney classics and recent releases.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
