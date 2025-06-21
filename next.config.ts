import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "kinsta.com",
      "miro.medium.com",
      "cdn.prod.website-files.com",
      "media.licdn.com",
      "xyflow.com",
    ],
  },
};

export default nextConfig;
