import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Ensure proper routing for Vercel deployment
  trailingSlash: false,

  // Enable static optimization
  staticPageGenerationTimeout: 1000,

  // Ensure proper build output
  distDir: '.next',
};

export default nextConfig;