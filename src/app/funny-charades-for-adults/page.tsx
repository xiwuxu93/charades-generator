import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funny Charades for Adults - Hilarious Adult Party Game Ideas',
  description: 'Free funny charades generator for adults with 150+ hilarious situations and comedy gold. Perfect for adult parties, game nights, and getting everyone laughing!',
  keywords: 'funny charades for adults, hilarious charades generator, adult party games, comedy charades ideas, funny adult charades, hilarious party games',
  openGraph: {
    title: 'Funny Charades for Adults - Hilarious Adult Party Game Ideas',
    description: 'Free funny charades generator for adults with hilarious situations and comedy gold.',
    type: 'website',
  },
};

export default function FunnyCharadesPage() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50">
      <StructuredData 
        type="Game"
        name="Funny Charades Generator for Adults"
        description="Hilarious charades generator designed for adult parties with funny situations and comedy themes"
        url="https://charades-generator.com/funny-charades-for-adults"
        category="Adult Comedy Game"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">😂🎭</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Funny Charades for Adults
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get ready to laugh until your sides hurt! Our hilarious charades generator features 
            funny adult situations, awkward moments, and comedy gold that will have everyone in stitches.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Adults Love Our Funny Charades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-100 rounded-lg">
              <div className="text-4xl mb-3">🤪</div>
              <h3 className="font-bold text-lg mb-2">Ridiculous Situations</h3>
              <p className="text-gray-700">Act out those awkward adult moments we all experience</p>
            </div>
            <div className="text-center p-4 bg-orange-100 rounded-lg">
              <div className="text-4xl mb-3">😅</div>
              <h3 className="font-bold text-lg mb-2">Relatable Comedy</h3>
              <p className="text-gray-700">From WiFi passwords to parallel parking fails</p>
            </div>
            <div className="text-center p-4 bg-red-100 rounded-lg">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="font-bold text-lg mb-2">Party Perfect</h3>
              <p className="text-gray-700">Guaranteed to be the highlight of your adult game night</p>
            </div>
          </div>
        </div>

        <CharadesGenerator 
          defaultCategory="funny"
          defaultAgeGroup="adults"
          title="Funny Charades for Adults"
          description="Hilarious adult situations and comedy gold! Perfect for getting everyone laughing at your next party."
        />

        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Pro Tips for Maximum Laughs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-purple-800">Acting Tips</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Exaggerate the embarrassing parts</li>
                <li>Use facial expressions to show frustration</li>
                <li>Don&apos;t be afraid to look silly</li>
                <li>Show the before and after of situations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-purple-800">Game Enhancement</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Add props for extra comedy effect</li>
                <li>Give bonus points for creativity</li>
                <li>Allow sound effects (if you want chaos!)</li>
                <li>Take photos/videos of the best performances</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-bold text-lg">Tech Struggles</h4>
            <p className="text-gray-600 text-sm">WiFi passwords, printer issues, smartphone mysteries</p>
          </div>
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🏠</div>
            <h4 className="font-bold text-lg">Adult Life</h4>
            <p className="text-gray-600 text-sm">Doing taxes, assembly instructions, midnight snacks</p>
          </div>
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">😳</div>
            <h4 className="font-bold text-lg">Awkward Moments</h4>
            <p className="text-gray-600 text-sm">Parallel parking, forgetting names, pocket dials</p>
          </div>
        </div>

        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">⚠️ Adults Only Content</h3>
          <p className="text-gray-600">
            This section contains humor designed for mature audiences. While nothing is inappropriate, 
            the situations and comedy are specifically tailored for adult experiences and may not be 
            suitable for children&apos;s parties.
          </p>
        </div>
      </div>
    </div>
  );
}