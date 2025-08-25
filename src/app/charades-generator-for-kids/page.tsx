import CharadesGenerator from "@/components/CharadesGenerator";
import StructuredData from "@/components/StructuredData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Charades Generator for Kids - Free Children's Word Game Ideas [No Ads]",
  description:
    "Free online charades generator for kids with 500+ child-friendly words. Disney characters, animals, simple actions perfect for children's parties. Educational and safe fun!",
  keywords:
    "charades generator for kids, kids charades ideas, children charades generator, charades for kids disney, kids party games, educational charades, family charades generator",
  alternates: {
    canonical: "https://charades-generator.com/charades-generator-for-kids",
  },
  openGraph: {
    title:
      "Charades Generator for Kids - Free Children's Word Game Ideas [No Ads]",
    description:
      "Free online charades generator for kids with Disney characters, animals, and age-appropriate content.",
    type: "website",
    url: "https://charades-generator.com/charades-generator-for-kids",
  },
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

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Tips for Playing Charades with Kids
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-yellow-800">
                Make it Easy
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Start with simple, one-word charades</li>
                <li>Use familiar characters and animals</li>
                <li>Give gentle hints if they&apos;re stuck</li>
                <li>Focus on fun, not competition</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-yellow-800">
                Keep it Fun
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Celebrate every attempt</li>
                <li>Let kids act out their favorite characters</li>
                <li>Use props if available</li>
                <li>Take turns and include everyone</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
