/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "media.discordapp.com"],
  },
};

module.exports = nextConfig;
