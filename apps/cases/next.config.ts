import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@910studio/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
