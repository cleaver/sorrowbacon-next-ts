/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
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

module.exports = nextConfig;
