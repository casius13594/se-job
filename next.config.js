/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['qwiogkombegzgtlyaqsm.supabase.co'],
  },
};

module.exports = nextConfig;
