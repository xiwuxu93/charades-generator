import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Kids Charades Generator - Free Children's Charades Words & Game Ideas",
  description:
    "Free kids charades generator with 500+ child-friendly words! Disney characters, animals, simple actions perfect for children's parties, classroom activities. Safe educational fun for ages 4-12. No ads, instant generation!",
  keywords:
    "kids charades generator, childrens charades generator, charades generator for kids, kids charades words, children charades game, kids party games, educational charades, family charades generator, disney charades for kids, animal charades kids, classroom charades activities, preschool charades, elementary school games",
  alternates: {
    canonical: "https://charades-generator.com/charades-generator-for-kids",
  },
  openGraph: {
    title:
      "Kids Charades Generator - Free Children's Charades Words & Game Ideas",
    description:
      "Free kids charades generator with 500+ child-friendly words! Disney, animals, simple actions for children's parties & classroom activities.",
    type: "website",
    url: "https://charades-generator.com/charades-generator-for-kids",
  },
  robots: "index, follow",
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
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Charades Generator for Kids
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fun and educational charades words perfect for children! Featuring
            Disney characters, friendly animals, simple actions, and
            age-appropriate movies.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Kids Love Our Charades Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Disney Magic</h3>
              <p className="text-gray-600">
                All their favorite Disney characters and movies
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Friendly Animals</h3>
              <p className="text-gray-600">
                Cute animals they can easily act out
              </p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Educational Fun</h3>
              <p className="text-gray-600">
                Learn while playing with age-appropriate content
              </p>
            </div>
          </div>
        </div>

        <CharadesGenerator
          defaultAgeGroup="kids"
          title="Kids Charades Generator"
          description="Safe and fun charades words perfect for children! All content is age-appropriate and educational."
          hideAgeGroupFilter={true}
        />

        {/* Age-Based Categories */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfect for Different Ages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="text-3xl mb-2">🧸</div>
              <h3 className="font-semibold text-green-800 mb-2">Ages 4-6 (Preschool)</h3>
              <p className="text-green-700 text-sm">Simple animals, basic actions, favorite toys. Easy one-word charades perfect for little ones!</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="text-3xl mb-2">🎒</div>
              <h3 className="font-semibold text-blue-800 mb-2">Ages 7-9 (Elementary)</h3>
              <p className="text-blue-700 text-sm">Disney characters, school subjects, sports. Perfect for classroom activities and birthday parties!</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-purple-800 mb-2">Ages 10-12 (Tweens)</h3>
              <p className="text-purple-700 text-sm">Popular movies, complex actions, hobbies. Ready for medium difficulty charades words!</p>
            </div>
          </div>
        </div>

        {/* Educational Benefits */}
        <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Educational Benefits of Kids Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-800">🧠 Cognitive Development:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Improves vocabulary and word recognition</li>
                <li>Enhances problem-solving skills</li>
                <li>Develops creative thinking abilities</li>
                <li>Boosts memory and recall</li>
                <li>Practices categorization skills</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-pink-800">🤝 Social & Physical Skills:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Builds confidence in public speaking/performing</li>
                <li>Improves body language and expression</li>
                <li>Encourages teamwork and cooperation</li>
                <li>Develops empathy and perspective-taking</li>
                <li>Promotes active physical movement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Classroom Usage */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🏫 Perfect for Classroom Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="text-2xl mb-2">📖</div>
              <h3 className="font-semibold text-yellow-800 mb-2">Reading Comprehension</h3>
              <p className="text-yellow-700 text-sm">Act out story characters and book themes</p>
            </div>
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="font-semibold text-green-800 mb-2">Science Lessons</h3>
              <p className="text-green-700 text-sm">Animals, plants, weather, and nature concepts</p>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded-lg">
              <div className="text-2xl mb-2">🎭</div>
              <h3 className="font-semibold text-blue-800 mb-2">Drama Class</h3>
              <p className="text-blue-700 text-sm">Build acting skills and creativity</p>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded-lg">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="font-semibold text-purple-800 mb-2">Brain Breaks</h3>
              <p className="text-purple-700 text-sm">Quick energizing activities between lessons</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎲 How to Play Kids Charades - Complete Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-yellow-800">
                🌟 Make it Easy & Fun
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Start with simple, one-word charades</li>
                <li>Use familiar characters and animals they love</li>
                <li>Give gentle hints if they get stuck</li>
                <li>Focus on fun, not winning or losing</li>
                <li>Let them pick their favorite categories</li>
                <li>Use longer time limits (3-5 minutes)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-yellow-800">
                🎉 Keep Everyone Engaged
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Celebrate every attempt with enthusiasm</li>
                <li>Let kids act out their favorite characters</li>
                <li>Use simple props or costumes if available</li>
                <li>Take turns and include everyone equally</li>
                <li>Create small teams to help shy children</li>
                <li>Take photos to capture the fun moments!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ for Parents/Teachers */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Kids Charades FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">What age is appropriate for kids charades?</h3>
              <p className="text-gray-600">Kids charades works great for ages 4-12! Preschoolers can do simple animals and actions, while older kids enjoy Disney characters and more complex words. Our generator has age-appropriate content for all levels.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How do I make charades easier for young children?</h3>
              <p className="text-gray-600">Use familiar animals, simple actions, and favorite characters. Give gentle hints, use longer time limits, and focus on participation over competition. Let them work in teams for support!</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I use this for classroom activities?</h3>
              <p className="text-gray-600">Absolutely! Teachers love using our kids charades generator for vocabulary building, brain breaks, reading comprehension activities, and end-of-day fun. All content is educational and classroom-appropriate.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Are the charades words safe for children?</h3>
              <p className="text-gray-600">Yes! All words in our kids charades generator are carefully selected to be age-appropriate, educational, and safe. No scary, violent, or inappropriate content - just pure fun!</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many kids charades words do you have?</h3>
              <p className="text-gray-600">Our database includes 500+ child-friendly charades words across categories like Disney, animals, simple actions, objects, and emotions - all perfect for kids ages 4-12.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
