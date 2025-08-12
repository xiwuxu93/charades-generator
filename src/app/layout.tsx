import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Charades Generator - Free Online Charades Words & Ideas',
    template: '%s | Charades Generator'
  },
  description: 'Free online charades generator with 1000+ words and ideas. Generate instant charades for kids, adults, movies, Disney, animals, actions and more. Perfect for parties and family game nights!',
  keywords: 'charades generator, charades words, charades ideas, charades for kids, charades movies, party games, family games, disney charades, online charades generator',
  authors: [{ name: 'Charades Generator Team' }],
  creator: 'Charades Generator',
  publisher: 'Charades Generator',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://charades-generator.com',
    siteName: 'Charades Generator',
    title: 'Free Charades Generator - Instant Words for Your Game Night',
    description: 'Generate instant charades words and ideas for kids and adults. Free online charades generator with movies, animals, actions, Disney themes and more.',
    images: [
      {
        url: '/charades-generator.png',
        width: 1200,
        height: 630,
        alt: 'Charades Generator - Free Online Game'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Charades Generator - Instant Words for Your Game Night',
    description: 'Generate instant charades words and ideas for kids and adults. Perfect for parties and family fun!',
    images: ['/charades-generator.png']
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#3B82F6'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-YC6P6CMMW2" />
      </body>
    </html>
  );
}
