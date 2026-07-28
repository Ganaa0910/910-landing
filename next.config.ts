import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* /studio folded into the one-pager. Redirect rather than 404 so its
     existing search equity lands somewhere. /work is a real page again. */
  redirects: async () => [
    { source: "/studio", destination: "/", permanent: true },
    { source: "/works", destination: "/work", permanent: true },
  ],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
      ],
    },
    {
      source: "/things-that.svg",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/OG.png",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
