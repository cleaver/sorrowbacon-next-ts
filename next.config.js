/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/archive',
        destination: '/archive/1',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
