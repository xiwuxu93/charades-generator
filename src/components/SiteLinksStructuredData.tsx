export default function SiteLinksStructuredData() {
  const siteLinksData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://charades-generator.com",
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://charades-generator.com/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "hasPart": [
      {
        "@type": "WebPage",
        "@id": "https://charades-generator.com/#generators",
        "name": "Charades Generators",
        "description": "Collection of specialized charades generators",
        "url": "https://charades-generator.com",
        "mainEntity": [
          {
            "@type": "WebApplication",
            "name": "Kids Charades Generator",
            "url": "https://charades-generator.com/charades-generator-for-kids",
            "description": "Child-friendly charades words"
          },
          {
            "@type": "WebApplication", 
            "name": "Movie Charades Generator",
            "url": "https://charades-generator.com/movie-charades-generator",
            "description": "Movie and TV show charades"
          },
          {
            "@type": "WebApplication",
            "name": "Disney Charades Generator", 
            "url": "https://charades-generator.com/disney-charades-generator",
            "description": "Disney character charades"
          },
          {
            "@type": "WebApplication",
            "name": "Christmas Charades Generator",
            "url": "https://charades-generator.com/christmas-charades-generator", 
            "description": "Holiday-themed charades"
          },
          {
            "@type": "WebApplication",
            "name": "Random Charades Generator",
            "url": "https://charades-generator.com/random-charades-generator",
            "description": "Completely random charades words"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://charades-generator.com/#help",
        "name": "Help & Information",
        "description": "Guides and information about playing charades",
        "url": "https://charades-generator.com/how-to-use",
        "mainEntity": [
          {
            "@type": "Article",
            "name": "How to Use Charades Generator",
            "url": "https://charades-generator.com/how-to-use",
            "description": "Complete guide to using our charades generator"
          },
          {
            "@type": "WebPage",
            "name": "Frequently Asked Questions",
            "url": "https://charades-generator.com/faq", 
            "description": "Common questions about charades and our generator"
          },
          {
            "@type": "Article",
            "name": "About Charades Generator", 
            "url": "https://charades-generator.com/about",
            "description": "Learn about our free charades generator service"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteLinksData)
      }}
    />
  );
}