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

interface FeedbackFormProps {
  locale?: string;
}

const translations = {
  en: {
    thankYouTitle: "Thank You!",
    thankYouMessage: "Your feedback has been submitted successfully. We really appreciate you taking the time to help us improve!",
    submitAnother: "Submit Another Feedback",
    issuesTitle: "There were some issues with your submission:",
    usagePurpose: "🎯 What do you primarily use our charades generator for? *",
    usageOptions: [
      'Get multiple words for offline charades game',
      'Find inspiration for charades words',
      'Print out words for party games',
      'Online interactive charades play',
      'Educational/classroom activities',
      'Other'
    ],
    primaryScenario: "🏠 Where do you typically play charades? *",
    scenarioSelect: "Select scenario...",
    scenarioOptions: [
      { value: "family_home", label: "Family gatherings at home" },
      { value: "friends_party", label: "Friends party/social gathering" },
      { value: "classroom", label: "Classroom/educational setting" },
      { value: "office_team", label: "Office team building" },
      { value: "online_remote", label: "Online/remote with video calls" },
      { value: "other", label: "Other" }
    ],
    wordCount: "📊 How many words do you typically want at once? *",
    wordCountOptions: [
      'Just 1 word at a time',
      '5-10 words for multiple rounds',
      '10-20 words for longer games',
      '20+ words for parties/events',
      'It depends on the situation'
    ],
    userType: "👥 Which best describes you?",
    userTypeSelect: "Select...",
    userTypeOptions: [
      { value: "parent", label: "Parent organizing family games" },
      { value: "teacher", label: "Teacher/educator" },
      { value: "party_organizer", label: "Party/event organizer" },
      { value: "casual_gamer", label: "Casual game player" },
      { value: "other", label: "Other" }
    ],
    missingFeatures: "⭐ What features are you missing that would make this more useful?",
    featurePlaceholder: "e.g., timer function, printable cards, custom word lists, difficulty indicators...",
    satisfaction: "😊 How satisfied are you with the current charades generator?",
    satisfactionOptions: [
      { value: '5', label: '😍 Love it' },
      { value: '4', label: '😊 Good' },
      { value: '3', label: '😐 Okay' },
      { value: '2', label: '😕 Needs work' },
      { value: '1', label: '😞 Not satisfied' }
    ],
    improvements: "💡 Any other suggestions for improvement?",
    improvementsPlaceholder: "Share any ideas, issues, or suggestions...",
    email: "📧 Email (optional - if you'd like us to follow up)",
    emailPlaceholder: "your@email.com",
    submitting: "📤 Submitting...",
    submit: "🚀 Submit Feedback",
    networkError: "Network error. Please check your connection and try again."
  },
  es: {
    thankYouTitle: "¡Gracias!",
    thankYouMessage: "Tus comentarios han sido enviados exitosamente. ¡Realmente apreciamos que te hayas tomado el tiempo para ayudarnos a mejorar!",
    submitAnother: "Enviar Otro Comentario",
    issuesTitle: "Hubo algunos problemas con tu envío:",
    usagePurpose: "🎯 ¿Para qué usas principalmente nuestro generador de charadas? *",
    usageOptions: [
      'Obtener múltiples palabras para juego offline de charadas',
      'Encontrar inspiración para palabras de charadas',
      'Imprimir palabras para juegos de fiesta',
      'Juego interactivo online de charadas',
      'Actividades educativas/aula',
      'Otro'
    ],
    primaryScenario: "🏠 ¿Dónde juegas típicamente charadas? *",
    scenarioSelect: "Seleccionar escenario...",
    scenarioOptions: [
      { value: "family_home", label: "Reuniones familiares en casa" },
      { value: "friends_party", label: "Fiesta de amigos/reunión social" },
      { value: "classroom", label: "Aula/entorno educativo" },
      { value: "office_team", label: "Construcción de equipo en oficina" },
      { value: "online_remote", label: "Online/remoto con videollamadas" },
      { value: "other", label: "Otro" }
    ],
    wordCount: "📊 ¿Cuántas palabras quieres típicamente de una vez? *",
    wordCountOptions: [
      'Solo 1 palabra a la vez',
      '5-10 palabras para múltiples rondas',
      '10-20 palabras para juegos más largos',
      '20+ palabras para fiestas/eventos',
      'Depende de la situación'
    ],
    userType: "👥 ¿Cuál te describe mejor?",
    userTypeSelect: "Seleccionar...",
    userTypeOptions: [
      { value: "parent", label: "Padre organizando juegos familiares" },
      { value: "teacher", label: "Maestro/educador" },
      { value: "party_organizer", label: "Organizador de fiestas/eventos" },
      { value: "casual_gamer", label: "Jugador casual" },
      { value: "other", label: "Otro" }
    ],
    missingFeatures: "⭐ ¿Qué características te faltan que harían esto más útil?",
    featurePlaceholder: "ej., función de temporizador, tarjetas imprimibles, listas de palabras personalizadas, indicadores de dificultad...",
    satisfaction: "😊 ¿Qué tan satisfecho estás con el generador actual de charadas?",
    satisfactionOptions: [
      { value: '5', label: '😍 Me encanta' },
      { value: '4', label: '😊 Bueno' },
      { value: '3', label: '😐 Regular' },
      { value: '2', label: '😕 Necesita trabajo' },
      { value: '1', label: '😞 No satisfecho' }
    ],
    improvements: "💡 ¿Alguna otra sugerencia para mejorar?",
    improvementsPlaceholder: "Comparte cualquier idea, problema o sugerencia...",
    email: "📧 Email (opcional - si te gustaría que te contactemos)",
    emailPlaceholder: "tu@email.com",
    submitting: "📤 Enviando...",
    submit: "🚀 Enviar Comentarios",
    networkError: "Error de red. Por favor verifica tu conexión e intenta de nuevo."
  }
};

export default function FeedbackForm({ locale = 'en' }: FeedbackFormProps) {
  const t = translations[locale as keyof typeof translations] || translations.en;

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
      setSubmitError(t.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.thankYouTitle}</h2>
        <p className="text-gray-600 mb-4">
          {t.thankYouMessage}
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
          {t.submitAnother}
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
                {t.issuesTitle}
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
            {t.usagePurpose}
          </label>
          <div className="space-y-2">
            {t.usageOptions.map((option) => (
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
            {t.primaryScenario}
          </label>
          <select
            name="primary_scenario"
            value={formData.primary_scenario}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">{t.scenarioSelect}</option>
            {t.scenarioOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Word Count Preference - Key Product Decision Data */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.wordCount}
          </label>
          <div className="space-y-2">
            {t.wordCountOptions.map((option) => (
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
            {t.userType}
          </label>
          <select
            name="user_type"
            value={formData.user_type}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t.userTypeSelect}</option>
            {t.userTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Missing Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.missingFeatures}
          </label>
          <textarea
            name="missing_features"
            value={formData.missing_features}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.featurePlaceholder}
          />
        </div>

        {/* Satisfaction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.satisfaction}
          </label>
          <div className="flex space-x-4">
            {t.satisfactionOptions.map((rating) => (
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
            {t.improvements}
          </label>
          <textarea
            name="improvement_suggestions"
            value={formData.improvement_suggestions}
            onChange={handleInputChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.improvementsPlaceholder}
          />
        </div>

        {/* Optional Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.email}
          </label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.emailPlaceholder}
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
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>
      </form>
    </div>
  );
}