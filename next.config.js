/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          port: '',
          pathname: '/images/**',
        },
      ],
    },
    // Optional: Improve production performance
    productionBrowserSourceMaps: false,
    // Optional: Enable React Strict Mode in dev (already default in Next.js 14)
    reactStrictMode: true,
  }
  
  module.exports = nextConfig