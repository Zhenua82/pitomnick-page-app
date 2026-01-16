/** @type {import('next').NextConfig} */
const repo = 'pitomnick-page-app';

const nextConfig = {
  output: 'export',
  trailingSlash: true,

  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' }
    ],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;