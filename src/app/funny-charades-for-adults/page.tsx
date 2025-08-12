import CharadesGenerator from '@/components/CharadesGenerator';
import StructuredData from '@/components/StructuredData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Funny Charades for Adults - Hilarious Adult Party Game Ideas',
  description: 'Free funny charades generator for adults with 150+ hilarious situations and comedy gold. Perfect for adult parties, game nights, and getting everyone laughing!',
  keywords: 'funny charades for adults, hilarious charades generator, adult party games, comedy charades ideas, funny adult charades, hilarious party games',
  alternates: {
    canonical: 'https://charades-generator.com/funny-charades-for-adults',
  },
  openGraph: {
    title: 'Funny Charades for Adults - Hilarious Adult Party Game Ideas',
    description: 'Free funny charades generator for adults with hilarious situations and comedy gold.',
    type: 'website',
    url: 'https://charades-generator.com/funny-charades-for-adults',
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
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"/>
            </svg>
          </div>
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
            <div className="text-center p-6 bg-yellow-100 rounded-lg border-l-4 border-yellow-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Ridiculous Situations</h3>
              <p className="text-gray-700">Act out those awkward adult moments we all experience</p>
            </div>
            <div className="text-center p-6 bg-orange-100 rounded-lg border-l-4 border-orange-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Relatable Comedy</h3>
              <p className="text-gray-700">From WiFi passwords to parallel parking fails</p>
            </div>
            <div className="text-center p-6 bg-red-100 rounded-lg border-l-4 border-red-400">
              <div className="w-12 h-12 mx-auto mb-3 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
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
          hideCategoryFilter={true}
          hideAgeGroupFilter={true}
        />

        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pro Tips for Maximum Laughs</h2>
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
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-yellow-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Tech Struggles</h4>
            <p className="text-gray-600 text-sm">WiFi passwords, printer issues, smartphone mysteries</p>
          </div>
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Adult Life</h4>
            <p className="text-gray-600 text-sm">Doing taxes, assembly instructions, midnight snacks</p>
          </div>
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Awkward Moments</h4>
            <p className="text-gray-600 text-sm">Parallel parking, forgetting names, pocket dials</p>
          </div>
        </div>

        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Adults Only Content</h3>
              <p className="text-gray-600">
                This section contains humor designed for mature audiences. While nothing is inappropriate, 
                the situations and comedy are specifically tailored for adult experiences and may not be 
                suitable for children&apos;s parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}