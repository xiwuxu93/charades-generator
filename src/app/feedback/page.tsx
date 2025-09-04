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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Help Us Improve
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your feedback is valuable! Tell us how you use our charades generator 
          and what features would make your experience better.
        </p>
      </div>

      <FeedbackForm />
      </div>
    </div>
  );
}
