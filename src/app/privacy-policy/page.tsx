import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Charades Generator",
  description:
    "Privacy Policy for Charades Generator. Learn how we protect your privacy and handle your data when using our free online charades word generator.",
  robots: "index, follow",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                Welcome to Charades Generator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website charades-generator.com (the &quot;Service&quot;).
              </p>
              <p className="text-gray-600">
                If you have any questions or concerns about this privacy policy or our practices with regard to your personal information, please contact us at the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
                <li>Submit feedback through our feedback form</li>
                <li>Contact us with questions or comments</li>
                <li>Subscribe to our newsletter (if applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-600 mb-4">
                When you visit our Service, we may automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
                <li>IP address and general location information</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on our Service</li>
                <li>Referring website information</li>
                <li>Usage patterns and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our Service. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use the information we collect for legitimate business purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                <li>Providing and maintaining our charades generator service</li>
                <li>Improving and personalizing user experience</li>
                <li>Responding to your feedback and inquiries</li>
                <li>Analyzing usage patterns to enhance our service</li>
                <li>Detecting and preventing fraud or abuse</li>
                <li>Complying with legal obligations</li>
                <li>Communicating important updates (if you&apos;ve opted in)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing our services</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, acquisition, or sale of business assets</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>
              <p className="text-gray-600">
                Security measures include encryption of data in transit, secure server hosting, regular security updates, and limited access controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Privacy Rights</h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate information</li>
                <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Restriction:</strong> Request limitation of processing</li>
              </ul>
              <p className="text-gray-600 mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our Service is designed to be family-friendly and suitable for users of all ages, including children. However, we do not knowingly collect personal information from children under 13 without parental consent.
              </p>
              <p className="text-gray-600">
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to remove such information and terminate the child&apos;s access if necessary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-600">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers are conducted in accordance with applicable data protection laws and with appropriate safeguards in place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Data Retention</h2>
              <p className="text-gray-600">
                We retain personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements. Usage data and analytics information may be retained for longer periods in anonymized form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Third-Party Links</h2>
              <p className="text-gray-600">
                Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Updates to This Policy</h2>
              <p className="text-gray-600">
                We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>Website:</strong> charades-generator.com<br />
                  <strong>Email:</strong> privacy@charades-generator.com<br />
                  <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 48 hours
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-800 font-medium mb-2">Key Points:</p>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  <li>We collect minimal personal information necessary to provide our service</li>
                  <li>We never sell your personal information to third parties</li>
                  <li>We use industry-standard security measures to protect your data</li>
                  <li>You have control over your personal information and privacy settings</li>
                  <li>Our service is safe and appropriate for users of all ages</li>
                  <li>We are transparent about our data practices and committed to protecting your privacy</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}