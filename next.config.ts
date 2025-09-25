import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
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
};

export default nextConfig;
