import { Metadata } from "next";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

export const metadata: Metadata = {
  title: "How to Use Charades Generator - Complete Guide & Instructions",
  description:
    "Learn how to use our free charades generator effectively. Step-by-step instructions, game rules, tips for different age groups, and how to create the perfect charades game experience.",
  keywords:
    "how to use charades generator, charades game instructions, how to play charades, charades rules, charades generator guide, charades game setup, how to use charades words",
  robots: "index, follow",
};

export default function HowToUse() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BreadcrumbStructuredData items={[
        { name: "Home", url: "https://charades-generator.com" },
        { name: "How to Use", url: "https://charades-generator.com/how-to-use" }
      ]} />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">How to Use Charades Generator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your complete guide to getting the most out of our free charades word generator and creating unforgettable game experiences.
            </p>
          </div>

          <div className="space-y-12">

            {/* Quick Start Guide */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">🚀 Quick Start Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg text-center border-l-4 border-green-500">
                  <div className="text-4xl mb-4">1️⃣</div>
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Visit & Click</h3>
                  <p className="text-green-700">Go to our homepage and click the &quot;Generate Random Words&quot; button. No signup required!</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center border-l-4 border-blue-500">
                  <div className="text-4xl mb-4">2️⃣</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Customize (Optional)</h3>
                  <p className="text-blue-700">Filter by category, difficulty, or age group if desired. Or keep it random for maximum surprise!</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center border-l-4 border-purple-500">
                  <div className="text-4xl mb-4">3️⃣</div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Play & Have Fun</h3>
                  <p className="text-purple-700">Use the generated words for your charades game. Generate more anytime you need fresh words!</p>
                </div>
              </div>
            </section>

            {/* Using the Generator */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">🎛️ Using the Generator</h2>
              
              <div className="space-y-8">
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">Generating Words</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3">Single Word Generation</h4>
                      <ul className="list-disc list-inside text-blue-600 space-y-2">
                        <li>Default setting generates 1 word at a time</li>
                        <li>Perfect for turn-by-turn gameplay</li>
                        <li>Keeps the element of surprise</li>
                        <li>Great for beginners and kids</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3">Batch Generation</h4>
                      <ul className="list-disc list-inside text-blue-600 space-y-2">
                        <li>Generate 2-50 words at once</li>
                        <li>Perfect for preparing game sessions</li>
                        <li>Great for party hosts and teachers</li>
                        <li>Save time during active gameplay</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Filtering Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">By Category</h4>
                      <ul className="list-disc list-inside text-green-600 space-y-1 text-sm">
                        <li>Movies - Films and TV shows</li>
                        <li>Animals - Creatures from around the world</li>
                        <li>Disney - Beloved characters and movies</li>
                        <li>Actions - Things people do</li>
                        <li>Christmas - Holiday-themed words</li>
                        <li>And more...</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">By Difficulty</h4>
                      <ul className="list-disc list-inside text-green-600 space-y-1 text-sm">
                        <li><strong>Easy</strong> - Simple, recognizable words</li>
                        <li><strong>Medium</strong> - Moderate challenge</li>
                        <li><strong>Hard</strong> - Complex or abstract concepts</li>
                        <li><strong>Mixed</strong> - Balanced variety</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3">By Age Group</h4>
                      <ul className="list-disc list-inside text-green-600 space-y-1 text-sm">
                        <li><strong>Kids</strong> - Age-appropriate content</li>
                        <li><strong>Adults</strong> - More sophisticated themes</li>
                        <li><strong>All Ages</strong> - Family-friendly mix</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Complete Charades Rules */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">📋 Complete Charades Rules</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-4">Basic Rules</h3>
                  <ol className="list-decimal list-inside text-yellow-700 space-y-2">
                    <li><strong>Teams:</strong> Divide into two or more teams (at least 2 players per team)</li>
                    <li><strong>Preparation:</strong> Generate words beforehand or use real-time generation</li>
                    <li><strong>Time Limit:</strong> Set 2-3 minutes per turn (1-2 for competitive, 3-4 for kids)</li>
                    <li><strong>Acting:</strong> One person acts out the word using only body language</li>
                    <li><strong>Guessing:</strong> Team members work together to guess the word</li>
                    <li><strong>No Talking:</strong> Actor cannot speak, make sounds, or mouth words</li>
                    <li><strong>No Props:</strong> Use only gestures, facial expressions, and body movements</li>
                    <li><strong>Scoring:</strong> One point per correct guess within time limit</li>
                    <li><strong>Winning:</strong> Team with most points after predetermined rounds wins</li>
                    <li><strong>Fair Play:</strong> If you don&apos;t know the word, you can pass (house rules)</li>
                  </ol>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-4">Standard Gestures</h3>
                  <div className="space-y-3 text-orange-700">
                    <div><strong>Movie/Film:</strong> Pretend to crank an old-fashioned movie camera</div>
                    <div><strong>Book:</strong> Open palms like an open book or turn pages</div>
                    <div><strong>Song:</strong> Cup hand to ear as if singing or point to mouth</div>
                    <div><strong>TV Show:</strong> Draw a rectangle in the air with fingers</div>
                    <div><strong>Play:</strong> Make theatre curtain gestures with hands</div>
                    <div><strong>Person:</strong> Stand with hands on hips in a pose</div>
                    <div><strong>Number of Words:</strong> Hold up corresponding number of fingers</div>
                    <div><strong>Which Word:</strong> Hold up finger for word position (1st, 2nd, etc.)</div>
                    <div><strong>Small Word:</strong> Hold thumb and forefinger close together</div>
                    <div><strong>Sounds Like:</strong> Cup ear with hand and nod</div>
                    <div><strong>Close/Getting Warmer:</strong> Encourage with thumbs up or nodding</div>
                    <div><strong>Correct!</strong> Point to person enthusiastically and nod</div>
                  </div>
                </div>

              </div>
              
              <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">🎯 Advanced Gameplay Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-3">Setup Strategy</h4>
                    <ul className="list-disc list-inside text-indigo-600 space-y-1 text-sm">
                      <li>Start with category gesture to set context</li>
                      <li>Show number of words first</li>
                      <li>Break complex words into syllables or parts</li>
                      <li>Use &quot;sounds like&quot; for difficult words</li>
                      <li>Act out the setting or context before the specific word</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-3">Team Strategy</h4>
                    <ul className="list-disc list-inside text-indigo-600 space-y-1 text-sm">
                      <li>Call out any guess - even wild ones help</li>
                      <li>Pay attention to actor&apos;s reactions to your guesses</li>
                      <li>Build on teammates&apos; partially correct answers</li>
                      <li>Consider multiple meanings or interpretations</li>
                      <li>Watch for confirmation gestures from the actor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Game Setup for Different Scenarios */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">🎯 Game Setup for Different Scenarios</h2>
              
              <div className="space-y-8">
                
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🏠</span> Family Game Night
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Recommended Settings:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Age Group: All Ages</li>
                        <li>Difficulty: Mixed (Easy + Medium)</li>
                        <li>Categories: Disney, Animals, Movies</li>
                        <li>Time Limit: 3 minutes</li>
                        <li>Team Size: 3-5 people</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Pro Tips:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Let kids go first to build confidence</li>
                        <li>Mix teams with adults and children</li>
                        <li>Give encouraging hints when needed</li>
                        <li>Focus on fun over competition</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎉</span> Adult Party
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Recommended Settings:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Age Group: Adults</li>
                        <li>Difficulty: Medium + Hard</li>
                        <li>Categories: Movies, Funny, Actions</li>
                        <li>Time Limit: 2 minutes</li>
                        <li>Team Size: 4-6 people</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Pro Tips:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Make it competitive with prizes</li>
                        <li>Use challenging categories</li>
                        <li>Add penalty rounds for fun</li>
                        <li>Include pop culture references</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🏫</span> Classroom Activity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Recommended Settings:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Age Group: Kids</li>
                        <li>Difficulty: Easy + Medium</li>
                        <li>Categories: Animals, Actions, Objects</li>
                        <li>Time Limit: 3-4 minutes</li>
                        <li>Team Size: 4-5 students</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Educational Benefits:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Vocabulary building</li>
                        <li>Public speaking confidence</li>
                        <li>Creative thinking skills</li>
                        <li>Teamwork and cooperation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🏢</span> Team Building
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Recommended Settings:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Age Group: Adults</li>
                        <li>Difficulty: Mixed</li>
                        <li>Categories: Actions, Professions, Movies</li>
                        <li>Time Limit: 2 minutes</li>
                        <li>Team Size: 5-8 people</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-3">Professional Benefits:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Break down communication barriers</li>
                        <li>Encourage creative thinking</li>
                        <li>Build trust and rapport</li>
                        <li>Create positive shared experiences</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Game Variations */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">🎭 Game Variations & Advanced Play</h2>
              
              <div className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-purple-800 mb-4">Reverse Charades</h3>
                    <p className="text-purple-700 mb-3">Multiple people act while one person guesses!</p>
                    <ul className="list-disc list-inside text-purple-600 space-y-1 text-sm">
                      <li>Perfect for large groups (6+ people)</li>
                      <li>One guesser closes their eyes while others see the word</li>
                      <li>Multiple actors work together to act out the word</li>
                      <li>Great for shy people who prefer not to act alone</li>
                      <li>Creates hilarious coordination challenges</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-semibold text-blue-800 mb-4">Sentence Charades</h3>
                    <p className="text-blue-700 mb-3">Act out entire phrases or famous quotes!</p>
                    <ul className="list-disc list-inside text-blue-600 space-y-1 text-sm">
                      <li>Use famous movie quotes or book titles</li>
                      <li>Break into individual words or act as whole phrase</li>
                      <li>More challenging and creative</li>
                      <li>Perfect for literature or movie buffs</li>
                      <li>Requires advanced charades skills</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">Speed Charades</h3>
                    <p className="text-green-700 mb-3">Fast-paced version with shorter time limits!</p>
                    <ul className="list-disc list-inside text-green-600 space-y-1 text-sm">
                      <li>30-60 second time limits only</li>
                      <li>Use easier words for quick recognition</li>
                      <li>Keep score of successful guesses</li>
                      <li>High energy and excitement</li>
                      <li>Great as party ice-breaker</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-semibold text-orange-800 mb-4">Themed Tournaments</h3>
                    <p className="text-orange-700 mb-3">Create brackets and themed rounds!</p>
                    <ul className="list-disc list-inside text-orange-600 space-y-1 text-sm">
                      <li>Disney Night, 80s Movies, Classic Literature</li>
                      <li>Elimination-style brackets</li>
                      <li>Progressive difficulty levels</li>
                      <li>Prizes for winners</li>
                      <li>Perfect for regular game groups</li>
                    </ul>
                  </div>

                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-4">🏆 Challenge Modes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-yellow-700 mb-2">No &quot;Sounds Like&quot;</h4>
                      <p className="text-yellow-600 text-sm">Ban ear-cupping gestures for extra difficulty</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-yellow-700 mb-2">One-Handed Only</h4>
                      <p className="text-yellow-600 text-sm">Limit actors to using only one hand</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-yellow-700 mb-2">Silent Feet</h4>
                      <p className="text-yellow-600 text-sm">Actors must keep their feet planted</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Advanced Tips */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">💡 Advanced Tips & Strategies</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">For Actors</h3>
                  <ul className="list-disc list-inside text-purple-700 space-y-2">
                    <li><strong>Start Simple:</strong> Use clear, obvious gestures first</li>
                    <li><strong>Break It Down:</strong> Act out word parts or syllables if needed</li>
                    <li><strong>Set the Scene:</strong> Establish context before acting the specific word</li>
                    <li><strong>Be Expressive:</strong> Exaggerate facial expressions and movements</li>
                    <li><strong>Stay Calm:</strong> Don&apos;t panic if people don&apos;t guess immediately</li>
                    <li><strong>Think Associations:</strong> Use related concepts and metaphors</li>
                    <li><strong>Use Your Whole Body:</strong> Don&apos;t limit yourself to hand gestures</li>
                    <li><strong>React to Guesses:</strong> Give feedback through nodding or gesturing</li>
                    <li><strong>Think Literally:</strong> Sometimes the most obvious interpretation works best</li>
                  </ul>
                </div>

                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-pink-800 mb-4">For Guessers</h3>
                  <ul className="list-disc list-inside text-pink-700 space-y-2">
                    <li><strong>Watch Everything:</strong> Pay attention to all gestures and expressions</li>
                    <li><strong>Think Categories:</strong> Start with what type of word it might be</li>
                    <li><strong>Say Everything:</strong> Voice all thoughts - even wrong guesses help</li>
                    <li><strong>Build Collaboratively:</strong> Use teammates&apos; guesses as stepping stones</li>
                    <li><strong>Consider Context:</strong> Think about the actor&apos;s setup and theme gestures</li>
                    <li><strong>Keep Guessing:</strong> Don&apos;t stop until time runs out</li>
                    <li><strong>Stay Positive:</strong> Encourage the actor with your energy</li>
                    <li><strong>Think Multiple Meanings:</strong> Consider different interpretations</li>
                    <li><strong>Watch for Reactions:</strong> Notice when you&apos;re getting close</li>
                  </ul>
                </div>

              </div>
            </section>

            {/* Educational Benefits */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">📚 Educational Benefits & Learning</h2>
              
              <div className="space-y-8">
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-semibold text-emerald-800 mb-6 text-center">Why Charades is Perfect for Learning</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🧠</span> Cognitive Development
                      </h4>
                      <ul className="text-emerald-600 text-sm space-y-1">
                        <li>• Creative problem solving</li>
                        <li>• Abstract thinking skills</li>
                        <li>• Memory enhancement</li>
                        <li>• Quick decision making</li>
                        <li>• Pattern recognition</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🗣️</span> Communication Skills
                      </h4>
                      <ul className="text-emerald-600 text-sm space-y-1">
                        <li>• Non-verbal communication</li>
                        <li>• Public speaking confidence</li>
                        <li>• Active listening</li>
                        <li>• Vocabulary building</li>
                        <li>• Expression and articulation</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🤝</span> Social Skills
                      </h4>
                      <ul className="text-emerald-600 text-sm space-y-1">
                        <li>• Teamwork and cooperation</li>
                        <li>• Patience and turn-taking</li>
                        <li>• Empathy and understanding</li>
                        <li>• Confidence building</li>
                        <li>• Group dynamics</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">🎭</span> Physical & Creative
                      </h4>
                      <ul className="text-emerald-600 text-sm space-y-1">
                        <li>• Body language awareness</li>
                        <li>• Motor skills development</li>
                        <li>• Creative expression</li>
                        <li>• Dramatic skills</li>
                        <li>• Self-confidence</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">📖</span> Academic Benefits
                      </h4>
                      <ul className="text-emerald-600 text-sm space-y-1">
                        <li>• Reading comprehension</li>
                        <li>• Cultural knowledge</li>
                        <li>• Historical understanding</li>
                        <li>• Genre recognition</li>
                        <li>• Critical thinking</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-emerald-700 mb-3 flex items-center">
                        <span className="text-2xl mr-2">😊</span> Emotional Benefits
                      </h4>
                      <ul className="text-emerald-600 text-sm space-y-1">
                        <li>• Stress relief and fun</li>
                        <li>• Laughter and joy</li>
                        <li>• Achievement satisfaction</li>
                        <li>• Social bonding</li>
                        <li>• Positive memories</li>
                      </ul>
                    </div>

                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">🏫 Classroom Integration Ideas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3">Subject Integration</h4>
                      <ul className="list-disc list-inside text-blue-600 space-y-1 text-sm">
                        <li><strong>English:</strong> Vocabulary words, literary characters, authors</li>
                        <li><strong>History:</strong> Historical figures, events, time periods</li>
                        <li><strong>Science:</strong> Animals, body parts, scientific processes</li>
                        <li><strong>Geography:</strong> Countries, landmarks, natural features</li>
                        <li><strong>Math:</strong> Geometric shapes, mathematical operations</li>
                        <li><strong>Foreign Language:</strong> Practice new vocabulary words</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3">Classroom Uses</h4>
                      <ul className="list-disc list-inside text-blue-600 space-y-1 text-sm">
                        <li><strong>Brain Breaks:</strong> 5-10 minute energy boosters</li>
                        <li><strong>Review Sessions:</strong> Make test prep fun and memorable</li>
                        <li><strong>Warm-up Activities:</strong> Start class with engagement</li>
                        <li><strong>End-of-Day Fun:</strong> Positive way to finish lessons</li>
                        <li><strong>Indoor Recess:</strong> Active game when weather is bad</li>
                        <li><strong>Team Building:</strong> Help students work together</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">🔧 Troubleshooting Common Issues</h2>
              
              <div className="space-y-6">
                
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Problem: Words are too difficult</h3>
                  <div className="text-gray-600 space-y-2">
                    <p><strong>Solution:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Switch to &quot;Easy&quot; difficulty setting</li>
                      <li>Choose more familiar categories like Animals or Actions</li>
                      <li>Filter by &quot;Kids&quot; age group for simpler words</li>
                      <li>Increase time limit to 4-5 minutes</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Problem: Words are too easy/repetitive</h3>
                  <div className="text-gray-600 space-y-2">
                    <p><strong>Solution:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Switch to &quot;Hard&quot; difficulty setting</li>
                      <li>Use &quot;All Categories&quot; for maximum variety</li>
                      <li>Try specialized generators (Christmas, Movies, etc.)</li>
                      <li>Generate larger batches to avoid recent repeats</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Problem: Players are struggling to act/guess</h3>
                  <div className="text-gray-600 space-y-2">
                    <p><strong>Solution:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Start with a practice round using easy words</li>
                      <li>Demonstrate standard charades gestures</li>
                      <li>Allow hints or partial words for beginners</li>
                      <li>Create mixed-ability teams</li>
                      <li>Focus on fun rather than strict rules</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Problem: Generator not working properly</h3>
                  <div className="text-gray-600 space-y-2">
                    <p><strong>Solution:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Refresh the page and try again</li>
                      <li>Clear your browser cache and cookies</li>
                      <li>Try a different browser or device</li>
                      <li>Check your internet connection</li>
                      <li>Contact us if the problem persists</li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* Best Practices */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">🌟 Best Practices for Maximum Fun</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3">Before the Game</h3>
                    <ul className="list-disc list-inside text-indigo-700 space-y-2">
                      <li>Pre-generate 20-30 words to avoid interruptions</li>
                      <li>Test your categories with a few sample words</li>
                      <li>Set clear time limits and rules beforehand</li>
                      <li>Arrange seating so everyone can see the actor</li>
                      <li>Have a timer and score sheet ready</li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-teal-800 mb-3">During the Game</h3>
                    <ul className="list-disc list-inside text-teal-700 space-y-2">
                      <li>Keep energy high with enthusiasm and encouragement</li>
                      <li>Rotate actors to keep everyone engaged</li>
                      <li>Take breaks between rounds if needed</li>
                      <li>Celebrate good acting even if words aren&apos;t guessed</li>
                      <li>Take photos or videos to capture funny moments</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-rose-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-rose-800 mb-3">Customization Ideas</h3>
                    <ul className="list-disc list-inside text-rose-700 space-y-2">
                      <li>Create themed nights (Movie Night = Movies only)</li>
                      <li>Add costume elements for extra fun</li>
                      <li>Include props for advanced players</li>
                      <li>Create tournament brackets for competitive groups</li>
                      <li>Mix in personal references for family games</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-800 mb-3">Making It Educational</h3>
                    <ul className="list-disc list-inside text-amber-700 space-y-2">
                      <li>Discuss words afterward to build vocabulary</li>
                      <li>Use it for foreign language practice</li>
                      <li>Connect to current learning topics in school</li>
                      <li>Encourage creativity and expression</li>
                      <li>Use as a reward for completing other activities</li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* Still Need Help */}
            <section className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Still Need Help?</h2>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-lg">
                <p className="text-lg text-gray-700 mb-6">
                  Can&apos;t find what you&apos;re looking for? We&apos;re here to help make your charades experience amazing!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/feedback"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                  >
                    Ask a Question
                  </a>
                  <a 
                    href="/faq"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                  >
                    Check Our FAQ
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}