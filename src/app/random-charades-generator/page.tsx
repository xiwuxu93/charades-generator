import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import FAQStructuredData from "@/components/FAQStructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Charades Generator - Instant Random Words for Party Games",
  description:
    "True random charades generator! Get instant random charades words from 1000+ database. Perfect for spontaneous party games, team building, family fun. Generate 1-50 random charades words instantly. No ads, completely free!",
  keywords:
    "random charades generator, random charades words, charades word generator, instant random charades, true random generator, random party games, spontaneous charades, random game generator, mixed category charades, surprise charades words",
  alternates: {
    canonical: "https://charades-generator.com/random-charades-generator",
  },
  openGraph: {
    title: "Random Charades Generator - Instant Random Words for Party Games",
    description:
      "True random charades generator! Get instant random charades words from 1000+ database. Perfect for spontaneous party games and family fun.",
    type: "website",
    url: "https://charades-generator.com/random-charades-generator",
  },
  robots: "index, follow",
};

export default function RandomCharadesGenerator() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <StructuredData
        type="WebApplication"
        name="Random Charades Generator - Instant Random Words"
        description="True random charades generator! Get instant random charades words from 1000+ database. Perfect for spontaneous party games and family fun."
        url="https://charades-generator.com/random-charades-generator"
        category="Random Party Games"
      />
      <FAQStructuredData />
      
      <CharadesGenerator
        defaultCategory="all"
        title="🎲 True Random Charades Generator"
        description="Get completely random charades words from ALL categories! Perfect for unpredictable party fun and spontaneous game sessions."
        hideCategoryFilter={true}
      />
      
      {/* Random Generator specific content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        
        {/* What Makes It Random */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            🎯 True Random Charades Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-2">🎲 Completely Unpredictable</h3>
              <ul className="text-indigo-700 text-sm space-y-1">
                <li>• Mix of ALL categories in each session</li>
                <li>• No pattern or sequence prediction</li>
                <li>• Fresh surprises every single time</li>
                <li>• Equal chance for every word in database</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">⚡ Instant Variety</h3>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Movies next to animals next to Disney</li>
                <li>• Easy words mixed with challenging ones</li>
                <li>• Kids content alongside adult themes</li>
                <li>• Perfect for diverse groups</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Perfect Scenarios */}
        <div className="bg-gradient-to-r from-pink-100 to-indigo-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 Perfect for Random Fun</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-pink-400">
              <div className="text-3xl mb-2">🎉</div>
              <h3 className="font-semibold text-pink-800 mb-2">Spontaneous Parties</h3>
              <p className="text-pink-700 text-sm">Last-minute gatherings need unpredictable fun</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-indigo-400">
              <div className="text-3xl mb-2">🏢</div>
              <h3 className="font-semibold text-indigo-800 mb-2">Team Ice-Breakers</h3>
              <p className="text-indigo-700 text-sm">Mixed groups with varied interests</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-purple-400">
              <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
              <h3 className="font-semibold text-purple-800 mb-2">Multi-Gen Families</h3>
              <p className="text-purple-700 text-sm">Something for everyone in every round</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-400">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold text-green-800 mb-2">Repeat Players</h3>
              <p className="text-green-700 text-sm">Impossible to predict or get bored</p>
            </div>
          </div>
        </div>

        {/* Random Generator Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Random Generator Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-yellow-800 mb-2">Instant Generation</h3>
              <p className="text-yellow-700 text-sm">Generate 1-50 random words in one click. No delays, no thinking required.</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🔀</div>
              <h3 className="font-semibold text-green-800 mb-2">Smart Shuffling</h3>
              <p className="text-green-700 text-sm">Advanced algorithm ensures no recent repeats while maintaining true randomness.</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-blue-800 mb-2">All Difficulty Levels</h3>
              <p className="text-blue-700 text-sm">Easy, medium, and hard words randomly mixed. Perfect challenge balance.</p>
            </div>
          </div>
        </div>

        {/* How Random Works */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔬 How Our Random Algorithm Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-800">🎯 True Randomness:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Mathematical random number generation</li>
                <li>No weighted categories or bias</li>
                <li>Every word has equal probability</li>
                <li>Cryptographically secure randomness</li>
                <li>No predictable patterns or sequences</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-800">🧠 Smart Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Avoids recent duplicates within session</li>
                <li>Mixes all categories automatically</li>
                <li>Balances difficulty levels naturally</li>
                <li>Includes age-appropriate variety</li>
                <li>Fresh experience every time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Random FAQ */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Random Charades Generator FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How random is your charades generator?</h3>
              <p className="text-gray-600">Our random charades generator uses true mathematical randomness with cryptographic-quality random number generation. Every word in our 1000+ database has an equal probability of being selected, ensuring genuine unpredictability.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Can I get random words from all categories at once?</h3>
              <p className="text-gray-600">Yes! Our random generator pulls from ALL categories simultaneously - movies, animals, Disney, actions, objects, emotions, professions, funny words, and Christmas themes all mixed together for maximum variety.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Will I get repeated words in the same session?</h3>
              <p className="text-gray-600">Our smart algorithm avoids recent duplicates within each session while maintaining true randomness. You&apos;ll get fresh words each time you generate, but the selection process remains completely unpredictable.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How many random charades words can I generate at once?</h3>
              <p className="text-gray-600">You can generate anywhere from 1 to 50 random charades words in a single click! Perfect for quick games or preparing large batches for extended party sessions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is this better than filtered charades generators?</h3>
              <p className="text-gray-600">Random generators are perfect when you want pure surprise and variety! While filtered generators let you choose themes, our random generator creates unpredictable excitement and works great for diverse groups with mixed preferences.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}