import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Charades Generator",
  description:
    "Terms of Service for Charades Generator. Read our terms and conditions for using our free charades word generator and related services.",
  robots: "index, follow",
};

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
          
          <p className="text-gray-600 mb-4">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <p className="text-gray-600 mb-6 p-4 bg-green-50 rounded-lg">
            Ready to use our service? <a href="/" className="text-green-600 hover:text-green-800 underline">Start using our charades generator</a> to create fun experiences while following these simple terms.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                Welcome to Charades Generator! These Terms of Service (&quot;Terms&quot;) govern your use of our website located at charades-generator.com (the &quot;Service&quot;) operated by Charades Generator (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
              </p>
              <p className="text-gray-600">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                Charades Generator is a free online tool that provides:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                <li>Random charades word generation from our curated database</li>
                <li>Multiple categories including movies, animals, Disney, Christmas, actions, and more</li>
                <li>Difficulty levels suitable for different age groups</li>
                <li>Specialized generators for kids, families, and adults</li>
                <li>Educational content and game instructions</li>
                <li>Feedback and support features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acceptable Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">3.1 Permitted Uses</h3>
              <p className="text-gray-600 mb-4">You may use our Service for:</p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Personal entertainment and family game nights</li>
                <li>Educational purposes in classrooms and schools</li>
                <li>Party planning and social gatherings</li>
                <li>Team building activities in professional settings</li>
                <li>Any lawful recreational or educational purpose</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">3.2 Prohibited Uses</h3>
              <p className="text-gray-600 mb-4">You may NOT use our Service to:</p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>Violate any applicable local, state, national, or international law</li>
                <li>Transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                <li>Impersonate or attempt to impersonate our company, employees, or other users</li>
                <li>Use the Service in any way that could disable, overburden, or impair the Service</li>
                <li>Use any robot, spider, or other automatic device to access the Service</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Copy, redistribute, or create derivative works from our content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.1 Our Content</h3>
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Charades Generator and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.2 Generated Content</h3>
              <p className="text-gray-600 mb-4">
                The charades words generated by our Service are provided for your personal use in games and activities. While many words are common terms, our specific database compilation, categorization, and presentation are proprietary.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">4.3 User Content</h3>
              <p className="text-gray-600">
                Any feedback, suggestions, or other content you provide to us may be used by us without restriction for the purpose of improving our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. User Accounts and Privacy</h2>
              <p className="text-gray-600 mb-4">
                Currently, our Service does not require user account creation. We collect minimal information as outlined in our Privacy Policy. By using our Service, you also agree to our Privacy Policy.
              </p>
              <p className="text-gray-600">
                If we introduce user accounts in the future, you will be responsible for safeguarding any passwords or access credentials associated with your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-4">
                Our Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no representations or warranties of any kind, express or implied, about:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                <li>The completeness, accuracy, or reliability of the Service</li>
                <li>The suitability of generated content for your specific needs</li>
                <li>The availability or continuity of the Service</li>
                <li>The absence of viruses or other harmful components</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by applicable law, Charades Generator and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
              <p className="text-gray-600">
                Our total liability to you for any damages shall not exceed the amount you have paid us in the twelve (12) months prior to the event giving rise to the liability, or $100, whichever is less.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Indemnification</h2>
              <p className="text-gray-600">
                You agree to defend, indemnify, and hold harmless Charades Generator and its affiliates from and against any claims, damages, costs, and expenses (including reasonable attorney fees) arising from or relating to your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="text-gray-600">
                Upon termination, your right to use the Service will cease immediately. If you wish to terminate your use of the Service, you may simply discontinue using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Changes to Service and Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">10.1 Service Changes</h3>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">10.2 Terms Changes</h3>
              <p className="text-gray-600">
                We reserve the right to update or change our Terms of Service at any time. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Changes become effective immediately upon posting.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in that jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Severability</h2>
              <p className="text-gray-600">
                If any provision of these Terms is deemed invalid or unenforceable, such provision shall be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Age Requirements</h2>
              <p className="text-gray-600">
                Our Service is designed to be family-friendly and suitable for all ages. However, users under 13 should use the Service under parental supervision. Users between 13-18 should have parental consent to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Website:</strong> charades-generator.com<br />
                  <strong>Email:</strong> support@charades-generator.com<br />
                  <strong>Response Time:</strong> We aim to respond to all legal inquiries within 72 hours
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-green-800 font-medium mb-2">Key Points:</p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Our Service is free and designed for entertainment and educational purposes</li>
                  <li>Use the Service responsibly and lawfully</li>
                  <li>Respect our intellectual property rights</li>
                  <li>We provide the Service &quot;as is&quot; without warranties</li>
                  <li>Our liability is limited as described above</li>
                  <li>Terms may be updated from time to time</li>
                  <li>The Service is suitable for all ages with appropriate supervision</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}