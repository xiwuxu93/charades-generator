export default function SiteLinksStructuredData() {
  const siteLinksData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Charades Generator Site Navigation",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Free Charades Generator",
        "url": "https://charades-generator.com/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Random Charades Generator",
        "url": "https://charades-generator.com/random-charades-generator/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Kids Charades Generator",
        "url": "https://charades-generator.com/charades-generator-for-kids/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Movie Charades Generator",
        "url": "https://charades-generator.com/movie-charades-generator/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Disney Charades Generator",
        "url": "https://charades-generator.com/disney-charades-generator/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "Christmas Charades Generator",
        "url": "https://charades-generator.com/christmas-charades-generator/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 7,
        "name": "How to Use Charades",
        "url": "https://charades-generator.com/how-to-use/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 8,
        "name": "FAQ",
        "url": "https://charades-generator.com/faq/"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 9,
        "name": "About",
        "url": "https://charades-generator.com/about/"
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
