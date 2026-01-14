import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
