import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Charades Generators": [
      { title: "Free Charades Generator", href: "/" },
      {
        title: "Random Charades Generator",
        href: "/random-charades-generator",
      },
      {
        title: "Kids Charades Generator",
        href: "/charades-generator-for-kids",
      },
      { title: "Movie Charades Generator", href: "/movie-charades-generator" },
      {
        title: "Disney Charades Generator",
        href: "/disney-charades-generator",
      },
      {
        title: "Christmas Charades Generator",
        href: "/christmas-charades-generator",
      },
      { title: "Funny Adult Charades", href: "/funny-charades-for-adults" },
    ],
    "Help & Information": [
      { title: "How to Use", href: "/how-to-use" },
      { title: "FAQ", href: "/faq" },
      { title: "About Us", href: "/about" },
      { title: "Feedback", href: "/feedback" },
    ],
    Legal: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms of Service", href: "/terms-of-service" },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-gray-800">
                Charades Generator
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Free online charades generator with 1000+ words and ideas. Perfect
              for parties, family game nights, and fun gatherings.
            </p>
            <div className="text-sm text-gray-500">
              Generate instant charades for kids, adults, movies, Disney, and
              more!
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-gray-800">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Friendly Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://magicbox.tools" target="_blank">
                  <Image
                    src="https://magicbox.tools/badge-dark.svg"
                    alt="Featured on MagicBox.tools"
                    width="200"
                    height="54"
                  />
                </a>
              </li>
              <li>
                <a href="https://kontext-ai.com/" target="_blank">
                  Kontext AI
                </a>
              </li>
              <li>
                <a
                  href="https://imglab.dev/item/charades-generator-knot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://imglab.dev/svg/badge.svg"
                    alt="Listed on imglab"
                    style="height: 54px; width: auto;"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © {currentYear} Charades Generator. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600">
                Free charades word generator for endless fun!
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
