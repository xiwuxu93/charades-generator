interface StructuredDataProps {
  type: 'WebApplication' | 'Game' | 'Article';
  name: string;
  description: string;
  url?: string;
  category?: string;
}

export default function StructuredData({ type, name, description, url, category }: StructuredDataProps) {
  const baseStructure: any = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url || "https://charades-generator.com",
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  };

  // Add fields specific to WebApplication type
  if (type === 'WebApplication') {
    Object.assign(baseStructure, {
      "applicationCategory": "GameApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    });
  }

  // Add author and publisher for all types
  Object.assign(baseStructure, {
    "author": {
      "@type": "Organization",
      "name": "Charades Generator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charades Generator"
    }
  });

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