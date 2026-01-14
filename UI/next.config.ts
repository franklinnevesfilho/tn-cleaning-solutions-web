import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  output: "standalone",
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
