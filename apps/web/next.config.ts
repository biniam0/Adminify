/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "picsum.photos",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

export default nextConfig;
