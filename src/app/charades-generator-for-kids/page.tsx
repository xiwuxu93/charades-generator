import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids Charades Generator - Free Children's Game Words",
  description:
    "Free kids charades with 500+ child-friendly words! Childrens charades generator for parties, Disney characters, animals, and classroom activities.",
  keywords:
    "kids charades, children charades, kids party games, educational charades, animal charades kids",
  alternates: {
    canonical: "https://charades-generator.com/charades-generator-for-kids/",
  },
  openGraph: {
    title: "Kids Charades Generator - Free Children's Game Words",
    description:
      "Free kids charades with 500+ child-friendly words! Childrens charades generator for parties, Disney, animals, and classroom activities.",
    type: "website",
    url: "https://charades-generator.com/charades-generator-for-kids/",
  },
  robots: "index, follow",
};

export default function KidsCharadesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData items={[
        { name: "Home", url: "https://charades-generator.com/" },
        { name: "Generators", url: "https://charades-generator.com/" },
        { name: "Kids Charades", url: "https://charades-generator.com/charades-generator-for-kids/" }
      ]} />
      <StructuredData
        type="Game"
        name="Kids Charades Generator"
        description="Free online charades generator designed specifically for children with age-appropriate words and themes"
        url="https://charades-generator.com/charades-generator-for-kids/"
        category="Educational Game"
      />
      
      <CharadesGenerator
        defaultAgeGroup="kids"
        title="Kids Charades Generator"
        description="Safe and fun charades words perfect for children! All content is age-appropriate and educational."
        hideAgeGroupFilter={true}
      />

      {/* Kids charades specific content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Your childrens charades generator toolkit</h2>
          <p className="text-blue-700 text-sm sm:text-base">
            Use this childrens charades generator to instantly pull age-appropriate prompts for birthday parties, classroom brain breaks, family gatherings, and rainy day fun. Bookmark it whenever you need new words fast!
          </p>
        </div>
        
        {/* Kids Party Ideas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Perfect for Children&apos;s Activities
          </h2>
          <p className="text-gray-600 mb-4">
            Need more options for family fun? Visit our <Link href="/" className="text-green-600 hover:text-green-800 underline">complete charades generator</Link> with age-appropriate filters and thousands of family-friendly words.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Kids Birthday Parties</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Children&apos;s birthday entertainment</li>
                <li>• Preschool party games and activities</li>
                <li>• Elementary school celebrations</li>
                <li>• Kids sleepover party fun</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Educational Settings</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Classroom brain break activities</li>
                <li>• Homeschool learning games</li>
                <li>• After-school program entertainment</li>
                <li>• Summer camp activities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Age-Appropriate Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Safe & Educational Charades for Kids</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Friendly Animals</h3>
              <p className="text-yellow-700 text-sm">Cute animals kids love - dogs, cats, elephants, and zoo favorites</p>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Simple Actions</h3>
              <p className="text-purple-700 text-sm">Easy actions kids can act out - running, dancing, sleeping, eating</p>
            </div>
            <div className="text-center p-4 bg-pink-100 rounded-lg">
              <h3 className="font-semibold text-pink-800 mb-2">Kid-Friendly Objects</h3>
              <p className="text-pink-700 text-sm">Toys, foods, and everyday items children recognize and enjoy</p>
            </div>
          </div>
        </div>

        {/* Educational Benefits */}
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Educational Benefits of Kids Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-800">Learning Skills:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Improves vocabulary and word recognition</li>
                <li>Develops creative thinking abilities</li>
                <li>Enhances problem-solving skills</li>
                <li>Builds confidence and self-expression</li>
                <li>Practices social interaction skills</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-yellow-800">Physical Development:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Encourages physical movement and activity</li>
                <li>Develops body awareness and coordination</li>
                <li>Improves gross and fine motor skills</li>
                <li>Promotes healthy active play</li>
                <li>Builds confidence in physical expression</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Kids Charades FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Kids Charades FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What age is appropriate for kids charades?</h3>
              <p className="text-gray-600">Our kids charades generator is perfect for ages 4-12! We include simple words for preschoolers (4-6), elementary-friendly content for ages 7-9, and slightly more challenging words for tweens (10-12), all completely age-appropriate.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Are all charades words safe for children?</h3>
              <p className="text-gray-600">Yes! Every word in our kids charades database is carefully selected to be completely child-safe, educational, and appropriate for family entertainment. No scary, violent, or inappropriate content included.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can teachers use this for classroom activities?</h3>
              <p className="text-gray-600">Absolutely! Teachers love using our kids charades for brain breaks, vocabulary building, reading comprehension activities, and end-of-day fun. All content is educational and classroom-appropriate.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I make charades easier for younger children?</h3>
              <p className="text-gray-600">For preschoolers and young kids, use familiar animals and simple actions, give gentle hints, use longer time limits, and focus on participation rather than competition. Let them work in teams for extra support!</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What categories work best for children?</h3>
              <p className="text-gray-600">Kids love animals (especially pets and zoo animals), simple actions (running, sleeping, eating), Disney characters, everyday objects, and emotions. Our generator focuses on these child-friendly categories.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
