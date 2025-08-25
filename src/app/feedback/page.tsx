import { Metadata } from "next";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "User Feedback - Help Us Improve | Charades Generator [No Ads]",
  description:
    "Share your feedback to help us improve the best free charades generator. Tell us what features you need and how you use charades words.",
  keywords:
    "charades feedback, user survey, charades generator feedback, product improvement",
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📝 Help Us Improve!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your feedback is incredibly valuable! Tell us how you use our
            charades generator and what features would make your experience even
            better.
          </p>
        </div>

        <FeedbackForm />

        {/* Why Your Feedback Matters */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎯 Why Your Feedback Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Better Features
              </h3>
              <p className="text-gray-600 text-sm">
                Help us prioritize which features to build next based on real
                user needs
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎮</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Improved Experience
              </h3>
              <p className="text-gray-600 text-sm">
                Tell us about any issues or improvements to make the generator
                more useful
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 text-sm">
                Join a community of charades enthusiasts helping shape the
                future of the game
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
