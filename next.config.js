/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'img.clerk.com',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'flagcdn.com',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'upload.wikimedia.org',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'encrypted-tbn0.gstatic.com',
      //   pathname: '/**',
      // },
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
};

module.exports = nextConfig;
