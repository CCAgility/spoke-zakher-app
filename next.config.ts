import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.zyrosite.com',
      },
      {
        protocol: 'https',
        hostname: 'directus-cms-159885988938.us-central1.run.app',
      }
    ],
  },
};

export default nextConfig;
