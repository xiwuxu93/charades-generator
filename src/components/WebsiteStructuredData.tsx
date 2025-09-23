export default function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Charades Generator",
    "alternateName": "Free Charades Word Generator",
    "url": "https://charades-generator.com/",
    "description": "Free online charades generator with 1000+ words. Generate instant charades words for parties, family game nights, kids, adults, movies, Disney, Christmas and more.",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Charades Generator",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Random charades word generation",
        "Multiple categories (movies, animals, Disney, Christmas, etc.)",
        "Difficulty levels (easy, medium, hard)",
        "Age-appropriate content",
        "Batch generation (1-50 words)",
        "Mobile-friendly interface",
        "No registration required"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://charades-generator.com/#organization",
      "name": "Charades Generator",
      "url": "https://charades-generator.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://charades-generator.com/logo.svg",
        "width": 160,
        "height": 62
      },
      "sameAs": []
    }
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://charades-generator.com/#organization",
    "name": "Charades Generator",
    "url": "https://charades-generator.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://charades-generator.com/logo.svg",
      "width": 160,
      "height": 62
    },
    "description": "Provider of free online charades word generation tools for entertainment and educational purposes.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@charades-generator.com"
    },
    "areaServed": "Worldwide",
    "serviceType": "Entertainment Software"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
    </>
  );
}
