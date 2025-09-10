import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://charades-generator.com'),
  title: {
    default: "Charades Generator - Free Online Charades Words & Ideas",
    template: "%s | Charades Generator",
  },
  description:
    "Free online charades generator with 1000+ words and ideas. Generate instant charades for kids, adults, movies, Disney, animals, actions and more. Perfect for parties and family game nights!",
  keywords:
    "charades generator, charades words, charades ideas, charades for kids, charades movies, party games, family games, disney charades, online charades generator",
  authors: [{ name: "Charades Generator Team" }],
  creator: "Charades Generator",
  publisher: "Charades Generator",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charades-generator.com",
    siteName: "Charades Generator",
    title:
      "Free Charades Generator - Instant Words for Your Game Night",
    description:
      "Generate instant charades words and ideas for kids and adults. Free online charades generator with movies, animals, actions, Disney themes and more.",
    images: [
      {
        url: "/charades-generator.svg",
        width: 1200,
        height: 630,
        alt: "Charades Generator - Free Online Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Charades Generator - Instant Words for Your Game Night",
    description:
      "Generate instant charades words and ideas for kids and adults. Perfect for parties and family fun!",
    images: ["/charades-generator.svg"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Essential resource hints only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        
        
        {/* Viewport optimization for mobile */}
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes" />
        
        {/* Minimal critical CSS for initial render */}
        <style>{`
          *{box-sizing:border-box}
          body{margin:0;font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif;background:var(--background);color:var(--foreground)}
          .critical-nav{position:sticky;top:0;z-index:50;background:white;border-bottom:1px solid #e5e7eb}
          .critical-container{max-width:72rem;margin:0 auto;padding:0 1rem}
          .critical-flex{display:flex;justify-content:space-between;align-items:center;height:4rem}
          .critical-logo{height:2rem;width:auto}
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        
        {/* Analytics - lazy load after page is ready */}
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Load gtag script
              const script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YC6P6CMMW2';
              document.head.appendChild(script);
              
              script.onload = function() {
                gtag('config', 'G-YC6P6CMMW2', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              };
            `,
          }}
        />
        
        {/* AdSense - lowest priority loading */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4855228928819714"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
