export default function FAQStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many charades words are in your database?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our charades generator includes over 1000 carefully curated words across multiple categories including movies, animals, Disney characters, actions, professions, and more."
        }
      },
      {
        "@type": "Question", 
        "name": "Is this charades generator really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our online charades generator is completely free to use. No registration, no downloads, no hidden fees. Just instant charades fun for everyone."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for kids' charades games?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Absolutely! We have a dedicated kids-friendly filter that shows age-appropriate charades words. Perfect for family game nights, classroom activities, and children's parties."
        }
      },
      {
        "@type": "Question",
        "name": "What categories of charades words do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer multiple categories including movies, animals, Disney characters, actions, professions, objects, emotions, and funny words. You can filter by category, difficulty, and age group."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData)
      }}
    />
  );
}