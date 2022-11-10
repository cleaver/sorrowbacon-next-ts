/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: false,
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
