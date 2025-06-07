import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionSourceMaps: false,
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
