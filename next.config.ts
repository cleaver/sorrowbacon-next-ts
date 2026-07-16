import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_SERVER: process.env.API_SERVER || "http://cascade:4000",
  },
  images: {
    unoptimized: false,
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        protocol: "http",
        hostname: "cascade",
        port: "4000",
      },
      {
        protocol: "https",
        hostname: "sbcms.pimpsmooth.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/archive",
        destination: "/archive/1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;