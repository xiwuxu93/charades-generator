interface StructuredDataProps {
  type: 'WebApplication' | 'Game' | 'Article';
  name: string;
  description: string;
  url?: string;
  category?: string;
}

export default function StructuredData({ type, name, description, url, category }: StructuredDataProps) {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url || "https://charades-generator.com",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Charades Generator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charades Generator"
    },
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  };

  if (type === 'Game' && category) {
    Object.assign(baseStructure, {
      "genre": category,
      "numberOfPlayers": "2+",
      "playMode": "MultiPlayer"
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(baseStructure)
      }}
    />
  );
}