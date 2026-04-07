/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    domains: ["cdn.prod.website-files.com"],
  },
};

module.exports = nextConfig;
