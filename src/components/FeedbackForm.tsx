'use client';

import { useState } from 'react';

interface FeedbackData {
  usage_purpose: string;
  primary_scenario: string;
  word_count_preference: string;
  missing_features: string;
  user_type: string;
  satisfaction: string;
  improvement_suggestions: string;
  contact_email: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
    usage_purpose: '',
    primary_scenario: '',
    word_count_preference: '',
    missing_features: '',
    user_type: '',
    satisfaction: '',
    improvement_suggestions: '',
    contact_email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (submitError) setSubmitError('');
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setValidationErrors([]);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json() as {
        success: boolean;
        error?: string;
        details?: string[];
        id?: string;
        message?: string;
      };

      if (result.success) {
        setIsSubmitted(true);
        console.log('Feedback submitted successfully:', result.id);
      } else {
        // Handle validation errors
        if (result.details && Array.isArray(result.details)) {
          setValidationErrors(result.details);
        } else {
          setSubmitError(result.error || 'Failed to submit feedback');
        }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-4">
          Your feedback has been submitted successfully. We really appreciate you taking the time to help us improve!
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              usage_purpose: '',
              primary_scenario: '',
              word_count_preference: '',
              missing_features: '',
              user_type: '',
              satisfaction: '',
              improvement_suggestions: '',
              contact_email: ''
            });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Error Display */}
      {(submitError || validationErrors.length > 0) && (
        <div className="mb-6 p-4 border border-red-300 rounded-md bg-red-50">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There were some issues with your submission:
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {submitError && <p>• {submitError}</p>}
                {validationErrors.map((error, index) => (
                  <p key={index}>• {error}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Usage Purpose - Critical Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            🎯 What do you primarily use our charades generator for? *
          </label>
          <div className="space-y-2">
            {[
              'Get multiple words for offline charades game',
              'Find inspiration for charades words',
              'Print out words for party games',
              'Online interactive charades play',
              'Educational/classroom activities',
              'Other'
            ].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="usage_purpose"
                  value={option}
                  checked={formData.usage_purpose === option}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Primary Scenario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            🏠 Where do you typically play charades? *
          </label>
          <select
            name="primary_scenario"
            value={formData.primary_scenario}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select scenario...</option>
            <option value="family_home">Family gatherings at home</option>
            <option value="friends_party">Friends party/social gathering</option>
            <option value="classroom">Classroom/educational setting</option>
            <option value="office_team">Office team building</option>
            <option value="online_remote">Online/remote with video calls</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Word Count Preference - Key Product Decision Data */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            📊 How many words do you typically want at once? *
          </label>
          <div className="space-y-2">
            {[
              'Just 1 word at a time',
              '5-10 words for multiple rounds',
              '10-20 words for longer games',
              '20+ words for parties/events',
              'It depends on the situation'
            ].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="word_count_preference"
                  value={option}
                  checked={formData.word_count_preference === option}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* User Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            👥 Which best describes you?
          </label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select...</option>
            <option value="parent">Parent organizing family games</option>
            <option value="teacher">Teacher/educator</option>
            <option value="party_organizer">Party/event organizer</option>
            <option value="casual_gamer">Casual game player</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Missing Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ⭐ What features are you missing that would make this more useful?
          </label>
          <textarea
            name="missing_features"
            value={formData.missing_features}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., timer function, printable cards, custom word lists, difficulty indicators..."
          />
        </div>

        {/* Satisfaction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            😊 How satisfied are you with the current charades generator?
          </label>
          <div className="flex space-x-4">
            {[
              { value: '5', label: '😍 Love it' },
              { value: '4', label: '😊 Good' },
              { value: '3', label: '😐 Okay' },
              { value: '2', label: '😕 Needs work' },
              { value: '1', label: '😞 Not satisfied' }
            ].map((rating) => (
              <label key={rating.value} className="flex items-center">
                <input
                  type="radio"
                  name="satisfaction"
                  value={rating.value}
                  checked={formData.satisfaction === rating.value}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{rating.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* General Improvements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            💡 Any other suggestions for improvement?
          </label>
          <textarea
            name="improvement_suggestions"
            value={formData.improvement_suggestions}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share any ideas, issues, or suggestions..."
          />
        </div>

        {/* Optional Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            📧 Email (optional - if you&apos;d like us to follow up)
          </label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? '📤 Submitting...' : '🚀 Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}