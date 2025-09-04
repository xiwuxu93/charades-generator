import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christmas Charades Generator - Holiday Party Games [2024]",
  description:
    "Free Christmas charades with 60+ festive words! Santa, reindeer, movies, songs for family parties & office holiday gatherings. Easy to hard difficulty.",
  keywords:
    "christmas charades, holiday charades, christmas party games, santa charades, festive charades",
  alternates: {
    canonical: "https://charades-generator.com/christmas-charades-generator",
  },
  openGraph: {
    title: "Christmas Charades Generator - Holiday Party Games [2024]",
    description:
      "Free Christmas charades with 60+ festive words! Santa, reindeer, movies, songs for family parties & office holiday gatherings.",
    type: "website",
    url: "https://charades-generator.com/christmas-charades-generator",
  },
  robots: "index, follow",
};

export default function ChristmasCharadesGenerator() {
  return (
    <div className="bg-gradient-to-b from-red-50 to-green-50 min-h-screen">
      <BreadcrumbStructuredData items={[
        { name: "Home", url: "https://charades-generator.com" },
        { name: "Generators", url: "https://charades-generator.com" },
        { name: "Christmas Charades", url: "https://charades-generator.com/christmas-charades-generator" }
      ]} />
      <StructuredData
        type="WebApplication"
        name="Christmas Charades Generator - Holiday Party Games"
        description="Generate instant Christmas charades words! 60+ festive holiday words for family Christmas parties and office holiday gatherings."
        url="https://charades-generator.com/christmas-charades-generator"
        category="Holiday Party Games"
      />
      <FAQStructuredData />
      
      <CharadesGenerator
        defaultCategory="christmas"
        title="Christmas Charades Generator"
        description="Generate festive Christmas charades words for your holiday parties! Perfect for family gatherings, office parties, and Christmas celebrations."
        hideCategoryFilter={true}
      />
      
      {/* Christmas-specific content sections */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        
        {/* Holiday Party Ideas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Perfect for Christmas Parties
          </h2>
          <p className="text-gray-600 mb-4">
            Looking for more party games? Check out our <a href="/" className="text-red-600 hover:text-red-800 underline">complete charades generator</a> with hundreds of words across all categories and themes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Family Christmas Gatherings</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Christmas Eve entertainment</li>
                <li>• Boxing Day family fun</li>
                <li>• Multi-generational game time</li>
                <li>• Holiday tradition starter</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Office Holiday Parties</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Team building activities</li>
                <li>• Holiday break ice-breakers</li>
                <li>• Corporate party games</li>
                <li>• Secret Santa events</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Christmas Charades Categories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included in Christmas Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Christmas Characters</h3>
              <p className="text-red-700 text-sm">Santa, Mrs. Claus, Elves, Reindeer, Grinch, and more festive characters</p>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Holiday Movies & Songs</h3>
              <p className="text-green-700 text-sm">Classic Christmas movies, carols, and holiday music favorites</p>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Holiday Traditions</h3>
              <p className="text-blue-700 text-sm">Christmas foods, activities, decorations, and holiday customs</p>
            </div>
          </div>
        </div>

        {/* Christmas Charades Rules */}
        <div className="bg-gradient-to-r from-red-100 to-green-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play Christmas Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-800">Holiday Game Setup:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Divide into teams (families vs families works great!)</li>
                <li>Set a festive 2-3 minute timer</li>
                <li>Generate Christmas charades words above</li>
                <li>Act out without speaking - only gestures!</li>
                <li>Team with most correct guesses wins a prize</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-800">Holiday Charades Tips:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use Christmas-themed gestures (ho-ho-ho, gift wrapping)</li>
                <li>Start with easier words for kids</li>
                <li>Mix different difficulty levels for all ages</li>
                <li>Create festive team names and prizes</li>
                <li>Take photos for holiday memories!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Christmas FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Christmas Charades FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many Christmas charades words do you have?</h3>
              <p className="text-gray-600">Our Christmas charades generator includes 60+ carefully selected holiday words covering Christmas characters, movies, songs, food, activities, and traditions perfect for all ages.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Are these Christmas charades suitable for kids?</h3>
              <p className="text-gray-600">Yes! Our Christmas charades include family-friendly options perfect for children, with easy difficulty levels featuring Santa, reindeer, presents, and other familiar holiday concepts.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this for office Christmas parties?</h3>
              <p className="text-gray-600">Absolutely! Christmas charades is perfect for office holiday parties, team building events, and corporate Christmas celebrations. Mix different difficulty levels to engage everyone.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">When is the best time to play Christmas charades?</h3>
              <p className="text-gray-600">Christmas charades works great during December holiday parties, Christmas Eve gatherings, Boxing Day celebrations, New Year&apos;s parties, and any winter holiday event throughout the season.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do you have different difficulty levels for Christmas words?</h3>
              <p className="text-gray-600">Yes! Our Christmas charades generator offers Easy (Santa, Tree), Medium (Caroling, Ornament), and Hard (Mistletoe, Christmas Tradition) difficulty levels to match your group&apos;s needs.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}