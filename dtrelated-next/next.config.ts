import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for large media files
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configure image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Handle large static files
  async headers() {
    return [
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Increase build timeout for large files
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
