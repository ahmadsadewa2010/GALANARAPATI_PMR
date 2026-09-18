import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hlnhvzzdn1klucrvustp.supabase.co",
      },
    ],
  },
};

export default nextConfig;