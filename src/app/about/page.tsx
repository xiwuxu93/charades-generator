import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

export const metadata: Metadata = {
  title: "About Charades Generator - Free Online Party Game Tool",
  description:
    "Learn about Charades Generator - the free online tool that makes party games fun and easy. Our mission: bringing families together through games.",
  keywords:
    "about charades generator, party game website, family entertainment, online game generator",
  robots: "index, follow",
};

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData items={[
        { name: "Home", url: "https://charades-generator.com" },
        { name: "About", url: "https://charades-generator.com/about" }
      ]} />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Charades Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              We&apos;re passionate about bringing people together through fun, interactive games. Our free charades generator makes it easy to create memorable moments with family and friends.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to get started? <Link href="/" className="text-blue-600 hover:text-blue-800 underline">Try our charades generator</Link> and discover thousands of carefully curated words perfect for any occasion.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Our Mission */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Mission</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  To make quality entertainment accessible to everyone by providing free, easy-to-use tools that bring people together. We believe that laughter, creativity, and connection should never be behind a paywall.
                </p>
              </div>
            </section>

            {/* Our Story */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">The Beginning</h3>
                  <p className="text-gray-600 mb-4">
                    Charades Generator was born from a simple problem: running out of good charades words during family game nights. We realized that many families and party hosts faced the same challenge - thinking up fresh, engaging words on the spot.
                  </p>
                  <p className="text-gray-600">
                    What started as a personal project to solve our own entertainment needs quickly grew into something much bigger when we realized how many people could benefit from a reliable, comprehensive charades word database.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Growing Impact</h3>
                  <p className="text-gray-600 mb-4">
                    Today, Charades Generator serves thousands of families, teachers, party hosts, and friends around the world. From birthday parties to classroom activities, from office team building to holiday gatherings, our tool has become a trusted companion for creating fun memories.
                  </p>
                  <p className="text-gray-600">
                    We&apos;re proud to be part of countless celebrations, educational experiences, and bonding moments across the globe.
                  </p>
                </div>
              </div>
            </section>

            {/* What Makes Us Different */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Makes Us Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🆓</div>
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Completely Free</h3>
                  <p className="text-green-700">No hidden costs, no premium features, no subscription fees. Quality entertainment should be accessible to everyone.</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Family-First Design</h3>
                  <p className="text-blue-700">Every word is carefully chosen to be appropriate for all ages. Safe, fun, and educational content for the whole family.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Purpose-Built</h3>
                  <p className="text-purple-700">Not just random words, but carefully curated content tested in real game scenarios to ensure maximum fun.</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Instant & Easy</h3>
                  <p className="text-yellow-700">No registration, no downloads, no complexity. Generate perfect charades words in seconds.</p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Globally Accessible</h3>
                  <p className="text-red-700">Available 24/7 from anywhere in the world. No geographic restrictions or language barriers.</p>
                </div>
                <div className="bg-indigo-50 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🔄</div>
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Always Improving</h3>
                  <p className="text-indigo-700">Regular updates, new categories, and continuous improvements based on user feedback.</p>
                </div>
              </div>
            </section>

            {/* Our Database */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Charades Database</h2>
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-800 mb-4">Quality Over Quantity</h3>
                    <p className="text-gray-700 mb-4">
                      Our 1000+ word database isn&apos;t just a random collection. Every single word is:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Tested in real charades games</li>
                      <li>Appropriate for the target age group</li>
                      <li>Fun and engaging to act out</li>
                      <li>Recognizable to most players</li>
                      <li>Balanced across difficulty levels</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-pink-800 mb-4">Diverse Categories</h3>
                    <p className="text-gray-700 mb-4">
                      We cover every type of charades game you might want to play:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Classic movies and modern hits</li>
                      <li>Beloved Disney characters</li>
                      <li>Animals from around the world</li>
                      <li>Actions and emotions</li>
                      <li>Professions and objects</li>
                      <li>Seasonal content like Christmas themes</li>
                      <li>Age-appropriate content for kids</li>
                      <li>Challenging words for adults</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Who We Serve */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Who We Serve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border-l-4 border-green-500 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">🏠 Families & Friends</h3>
                  <p className="text-gray-600 mb-3">
                    Making family game nights more fun and spontaneous. Perfect for holiday gatherings, birthday parties, and quality time together.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Multi-generational content</li>
                    <li>• Safe for all family members</li>
                    <li>• Creates lasting memories</li>
                  </ul>
                </div>
                <div className="bg-white border-l-4 border-blue-500 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">🏫 Teachers & Educators</h3>
                  <p className="text-gray-600 mb-3">
                    Supporting classroom learning with engaging, educational activities. Perfect for vocabulary building, drama class, and brain breaks.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Educational value</li>
                    <li>• Age-appropriate content</li>
                    <li>• Easy classroom integration</li>
                  </ul>
                </div>
                <div className="bg-white border-l-4 border-purple-500 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">🎉 Party Hosts</h3>
                  <p className="text-gray-600 mb-3">
                    Making social gatherings more entertaining and interactive. Great ice-breakers and group activities for any celebration.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Instant party entertainment</li>
                    <li>• No preparation needed</li>
                    <li>• Engages all personality types</li>
                  </ul>
                </div>
                <div className="bg-white border-l-4 border-orange-500 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">🏢 Team Leaders</h3>
                  <p className="text-gray-600 mb-3">
                    Facilitating team building and creating positive workplace culture. Professional yet fun activities for office events.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Team bonding activities</li>
                    <li>• Break the ice at meetings</li>
                    <li>• Improve workplace culture</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Our Commitment */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Commitment to You</h2>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">🔒 Privacy & Safety</h3>
                    <p className="text-gray-600 mb-4">
                      We collect minimal data and never sell your information. Our service is designed with privacy by default.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">🆓 Always Free</h3>
                    <p className="text-gray-600">
                      Our core service will always be completely free. We believe fun shouldn&apos;t have a price tag.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">📈 Continuous Improvement</h3>
                    <p className="text-gray-600 mb-4">
                      We regularly update our database and features based on user feedback and game testing.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">🌟 Quality Content</h3>
                    <p className="text-gray-600">
                      Every word in our database is personally reviewed to ensure it meets our standards for fun and appropriateness.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Join Our Community */}
            <section className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Join Our Community</h2>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg">
                <p className="text-lg text-gray-700 mb-6">
                  Become part of a global community that believes in the power of play, laughter, and human connection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/feedback"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                  >
                    Share Your Feedback
                  </a>
                  <Link 
                    href="/"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                  >
                    Try Our Generator
                  </Link>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Get in Touch</h2>
              <div className="bg-white border rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-6">
                  Have questions, suggestions, or just want to say hello? We&apos;d love to hear from you!
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>General Inquiries:</strong> support@charades-generator.com</p>
                  <p><strong>Technical Support:</strong> support@charades-generator.com</p>
                  <p><strong>Feedback & Suggestions:</strong> support@charades-generator.com</p>
                  <p className="text-sm text-gray-500 mt-4">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}