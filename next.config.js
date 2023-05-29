/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: `https`,
        hostname: `oaidalleapiprodscus.blob.core.windows.net`, // DALLE API host
      },
      {
        hostname: `images.pexels.com` // temporary for testing
      }
    ]
  }
};

module.exports = nextConfig;
