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
      },
      {
        protocol: "http",
        hostname: "strapi",
      },
      {
        protocol: "https",
        hostname: "sb.pimpsmooth.com",
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
