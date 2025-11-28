import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imglab.dev',
        pathname: '/svg/**',
      },
      {
        protocol: 'https',
        hostname: 'fwfw.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'acidtools.com',
        pathname: '/assets/images/**',
      },
    ],
  },
  // Cloudflare Workers configuration
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  // Enable Server Components for SSR
  serverExternalPackages: [],
  // Optimize for CF Workers environment
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds for now
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/word-charades-generator",
        destination: "/",
        permanent: true,
      },
      {
        source: "/word-charades-generator/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/word-charades-generator",
        destination: "/es/",
        permanent: true,
      },
      {
        source: "/es/word-charades-generator/",
        destination: "/es/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
