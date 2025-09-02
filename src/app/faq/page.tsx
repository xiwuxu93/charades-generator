import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Charades Generator FAQ",
  description:
    "Find answers to common questions about our free charades generator. Learn about our word database, how to use filters, game rules, troubleshooting, and more.",
  keywords:
    "charades generator FAQ, charades questions, how to use charades generator, charades game help, charades word generator questions, charades troubleshooting",
  robots: "index, follow",
};

export default function FAQ() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get quick answers to the most common questions about our free charades generator and how to make the most of your game experience.
            </p>
          </div>

          <div className="space-y-8">

            {/* General Questions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
                🎭 General Questions
              </h2>
              <div className="space-y-6">
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">What is Charades Generator?</h3>
                  <p className="text-blue-700">
                    Charades Generator is a free online tool that instantly generates charades words from our database of 1000+ carefully curated words. It&apos;s designed to make charades games more fun and spontaneous by providing you with fresh words across multiple categories, difficulty levels, and age groups.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Is Charades Generator really free?</h3>
                  <p className="text-blue-700">
                    Yes, absolutely! Our charades generator is completely free to use. There are no hidden costs, no premium features, no subscription fees, and no registration required. We believe quality entertainment should be accessible to everyone.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Do I need to create an account or register?</h3>
                  <p className="text-blue-700">
                    No registration required! Just visit our website and start generating charades words immediately. We don&apos;t require any personal information to use our service.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Can I use this on my phone or tablet?</h3>
                  <p className="text-blue-700">
                    Yes! Our website is fully responsive and works perfectly on smartphones, tablets, laptops, and desktop computers. The interface adapts to your screen size for the best experience.
                  </p>
                </div>

              </div>
            </section>

            {/* About Our Database */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-green-500">
                📚 About Our Database
              </h2>
              <div className="space-y-6">
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">How many charades words are in your database?</h3>
                  <p className="text-green-700">
                    Our database contains over 1000 carefully curated charades words across 9 categories: movies, animals, Disney characters, Christmas themes, actions, professions, objects, emotions, and funny words. We regularly update and expand our database based on user feedback.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">How do you choose which words to include?</h3>
                  <p className="text-green-700 mb-3">
                    Every word in our database is carefully selected based on these criteria:
                  </p>
                  <ul className="list-disc list-inside text-green-700 space-y-1 ml-4">
                    <li>Recognizable to most people in the target age group</li>
                    <li>Fun and engaging to act out</li>
                    <li>Appropriate for family-friendly entertainment</li>
                    <li>Tested in real charades games for effectiveness</li>
                    <li>Balanced across different difficulty levels</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Can I see all the words in your database?</h3>
                  <p className="text-green-700">
                    We don&apos;t display our complete database publicly to maintain the surprise element that makes charades fun! However, you can see sample words on our homepage, and our generator gives you unlimited access to randomly selected words from our full collection.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Do you add new words regularly?</h3>
                  <p className="text-green-700">
                    Yes! We continuously update our database with new words based on user feedback, popular culture, and seasonal content. We also review and improve existing categories to ensure the best possible game experience.
                  </p>
                </div>

              </div>
            </section>

            {/* Using the Generator */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-purple-500">
                ⚙️ Using the Generator
              </h2>
              <div className="space-y-6">
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">How does the random generator work?</h3>
                  <p className="text-purple-700">
                    Our generator uses true mathematical randomness to select words from our database. Each word has an equal probability of being selected, and we use smart algorithms to avoid recent duplicates within your session while maintaining genuine unpredictability.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Can I generate multiple words at once?</h3>
                  <p className="text-purple-700">
                    Yes! You can generate anywhere from 1 to 50 words at a time. This is perfect for party hosts who want to prepare words in advance or for extended game sessions. Just adjust the number in the generator and click generate.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">What do the different categories mean?</h3>
                  <div className="text-purple-700 space-y-2">
                    <p><strong>Movies:</strong> Popular films and TV shows</p>
                    <p><strong>Animals:</strong> Creatures from around the world</p>
                    <p><strong>Disney:</strong> Beloved Disney characters and movies</p>
                    <p><strong>Actions:</strong> Things people do (running, dancing, etc.)</p>
                    <p><strong>Christmas:</strong> Holiday-themed words and traditions</p>
                    <p><strong>Professions:</strong> Jobs and occupations</p>
                    <p><strong>Objects:</strong> Everyday items and things</p>
                    <p><strong>Emotions:</strong> Feelings and expressions</p>
                    <p><strong>Funny:</strong> Humorous and silly words</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">How do the difficulty levels work?</h3>
                  <div className="text-purple-700 space-y-2">
                    <p><strong>Easy:</strong> Simple, well-known words that are easy to act out (like &quot;cat&quot; or &quot;running&quot;)</p>
                    <p><strong>Medium:</strong> Moderately challenging words that require more creativity (&quot;confused&quot; or &quot;Titanic&quot;)</p>
                    <p><strong>Hard:</strong> Complex or abstract concepts that are challenging to act out (&quot;democracy&quot; or &quot;nostalgic&quot;)</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Will I get repeated words in the same session?</h3>
                  <p className="text-purple-700">
                    Our smart algorithm avoids showing you the same word multiple times within a single session. However, if you generate hundreds of words or use very specific filters, you might eventually see repeats as we run through our database.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Can I create custom word lists?</h3>
                  <p className="text-purple-700 mb-3">
                    While we don&apos;t currently offer custom word list creation, you can:
                  </p>
                  <ul className="list-disc list-inside text-purple-700 space-y-1 ml-4">
                    <li>Use our category filters to focus on specific themes</li>
                    <li>Generate multiple words and select your favorites</li>
                    <li>Screenshot generated words for offline use</li>
                    <li>Combine words from different generators (Kids, Disney, etc.)</li>
                    <li>Mix our generated words with your own personal words</li>
                  </ul>
                  <p className="text-purple-700 mt-3">
                    We&apos;re always looking for ways to improve - let us know if custom lists would be helpful!
                  </p>
                </div>

              </div>
            </section>

            {/* Game Play Questions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-red-500">
                🎲 Game Play Questions
              </h2>
              <div className="space-y-6">
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">What are the basic rules of charades?</h3>
                  <div className="text-red-700 space-y-2">
                    <p><strong>Basic Rules:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Divide into teams (2 or more people per team)</li>
                      <li>One person acts out a word silently (no talking, no sounds)</li>
                      <li>Their team tries to guess the word within the time limit</li>
                      <li>Teams take turns acting and guessing</li>
                      <li>Score one point for each correctly guessed word</li>
                      <li>Team with the most points wins!</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">How long should each turn be?</h3>
                  <p className="text-red-700">
                    Typically 2-3 minutes per turn works well for most groups. For younger children or beginners, consider 3-4 minutes. For competitive adult groups, 1-2 minutes can make it more challenging. Adjust based on your group&apos;s preferences!
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Can I use props or make sounds?</h3>
                  <p className="text-red-700">
                    Traditional charades rules say no props and no sounds, but you can adapt the rules for your group! Some families allow simple props or sound effects to make the game more accessible for younger children or more fun for casual play.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">What if a word is too difficult?</h3>
                  <p className="text-red-700 mb-3">
                    Several options to handle difficult words:
                  </p>
                  <ul className="list-disc list-inside text-red-700 space-y-1 ml-4">
                    <li><strong>Pass:</strong> Allow the actor to pass and generate a new word</li>
                    <li><strong>Extra Time:</strong> Give the team additional time (30-60 seconds)</li>
                    <li><strong>Team Help:</strong> Let teammates give hints or partial words</li>
                    <li><strong>Break It Down:</strong> Act out syllables or word parts</li>
                    <li><strong>Category Clues:</strong> Allow additional category hints</li>
                  </ul>
                  <p className="text-red-700 mt-3">
                    Remember, the goal is to have fun! Adapt rules to fit your group&apos;s skill level.
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Are there different versions of charades?</h3>
                  <div className="text-red-700 space-y-2">
                    <p><strong>Classic Charades:</strong> Traditional rules with silent acting</p>
                    <p><strong>Reverse Charades:</strong> Multiple people act while one person guesses</p>
                    <p><strong>Speed Charades:</strong> Shorter time limits (30-60 seconds)</p>
                    <p><strong>Sentence Charades:</strong> Act out entire phrases or quotes</p>
                    <p><strong>Themed Tournaments:</strong> Focus on specific categories like movies or books</p>
                    <p><strong>Challenge Modes:</strong> Add restrictions like &quot;no sounds like&quot; or &quot;one hand only&quot;</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Age Groups and Safety */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-yellow-500">
                👶 Age Groups and Safety
              </h2>
              <div className="space-y-6">
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Is this safe for children to use?</h3>
                  <p className="text-yellow-700">
                    Absolutely! All content in our database is family-friendly and appropriate for children. We carefully review every word to ensure there&apos;s no inappropriate, scary, or violent content. Our &quot;Kids&quot; filter provides extra age-appropriate content specifically chosen for younger players.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">What age is appropriate for charades?</h3>
                  <p className="text-yellow-700 mb-3">
                    Charades can be enjoyed by all ages with proper word selection:
                  </p>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1 ml-4">
                    <li><strong>Ages 4-6:</strong> Simple animals, basic actions, favorite characters</li>
                    <li><strong>Ages 7-12:</strong> Disney characters, easy movies, school subjects</li>
                    <li><strong>Ages 13+:</strong> All categories and difficulty levels</li>
                    <li><strong>Mixed Ages:</strong> Use our &quot;All Ages&quot; filter for family-friendly content</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Can teachers use this in classrooms?</h3>
                  <p className="text-yellow-700 mb-3">
                    Absolutely! Many teachers use our generator for educational activities. Here&apos;s how:
                  </p>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1 ml-4">
                    <li><strong>Vocabulary Building:</strong> Act out spelling or vocabulary words</li>
                    <li><strong>Subject Review:</strong> Use history figures, science concepts, etc.</li>
                    <li><strong>Brain Breaks:</strong> 5-10 minute energy boosts between lessons</li>
                    <li><strong>Drama Activities:</strong> Build confidence and expression skills</li>
                    <li><strong>Team Building:</strong> Improve classroom cooperation</li>
                    <li><strong>Indoor Recess:</strong> Active game for bad weather days</li>
                  </ul>
                  <p className="text-yellow-700 mt-3">
                    All content is classroom-appropriate and the &quot;Kids&quot; filter ensures age-suitable words.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">What educational benefits does charades provide?</h3>
                  <div className="text-yellow-700 space-y-3">
                    <p><strong>Communication Skills:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Non-verbal communication and body language</li>
                      <li>Public speaking confidence</li>
                      <li>Active listening skills</li>
                      <li>Vocabulary expansion</li>
                    </ul>
                    
                    <p><strong>Cognitive Development:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Creative problem solving</li>
                      <li>Abstract thinking</li>
                      <li>Memory enhancement</li>
                      <li>Critical thinking skills</li>
                    </ul>
                    
                    <p><strong>Social Skills:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>Teamwork and cooperation</li>
                      <li>Patience and turn-taking</li>
                      <li>Empathy and understanding others</li>
                      <li>Building self-confidence</li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* Technical Questions */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-500">
                💻 Technical Questions
              </h2>
              <div className="space-y-6">
                
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">The generator isn&apos;t working. What should I do?</h3>
                  <div className="text-indigo-700 space-y-2">
                    <p><strong>Try these troubleshooting steps:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Refresh the page and try again</li>
                      <li>Clear your browser cache and cookies</li>
                      <li>Try a different browser (Chrome, Firefox, Safari, Edge)</li>
                      <li>Check your internet connection</li>
                      <li>Try on a different device</li>
                      <li>If the problem persists, contact us through our feedback form</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Does the website work offline?</h3>
                  <p className="text-indigo-700">
                    No, our charades generator requires an internet connection to access our word database and generate new words. However, you can generate multiple words at once and screenshot them for offline use during your game.
                  </p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Can I bookmark specific words or categories?</h3>
                  <p className="text-indigo-700">
                    While you can&apos;t bookmark specific words, you can bookmark our category-specific generators (like Disney Charades or Kids Charades) for quick access to your favorite types of words.
                  </p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Do you have an app?</h3>
                  <p className="text-indigo-700">
                    Currently, we don&apos;t have a dedicated mobile app, but our website works perfectly on mobile devices! You can add our website to your phone&apos;s home screen for quick access that feels like an app.
                  </p>
                </div>

              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-pink-500">
                🔒 Privacy and Data
              </h2>
              <div className="space-y-6">
                
                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-800 mb-3">What information do you collect about me?</h3>
                  <p className="text-pink-700">
                    We collect minimal information to provide our service - primarily basic usage analytics to help us improve the generator. We don&apos;t collect personal information unless you voluntarily provide it through our feedback form. See our Privacy Policy for complete details.
                  </p>
                </div>

                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-800 mb-3">Do you sell my data or show ads?</h3>
                  <p className="text-pink-700">
                    No! We don&apos;t sell your data to third parties, and we don&apos;t show advertisements. Our service is completely free and supported by our commitment to providing quality entertainment for everyone.
                  </p>
                </div>

                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-pink-800 mb-3">Are you COPPA compliant for children?</h3>
                  <p className="text-pink-700">
                    Yes, we design our service with children&apos;s privacy in mind. We don&apos;t collect personal information from children under 13, and our service can be used safely by children with parental supervision.
                  </p>
                </div>

              </div>
            </section>

            {/* Getting More Help */}
            <section className="text-center bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Still Have Questions?</h2>
              <p className="text-lg text-gray-700 mb-6">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/feedback"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                >
                  Contact Us
                </a>
                <a 
                  href="/how-to-use"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                >
                  How-To Guide
                </a>
                <Link 
                  href="/"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                >
                  Try Generator
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}