/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponents: true,
    serverActions: true,
  },
  images: {
    domains: ['qwiogkombegzgtlyaqsm.supabase.co'],
  },
};

module.exports = nextConfig;
