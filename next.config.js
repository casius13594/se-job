/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'zd3fr300-3000.asse.devtunnels.ms'],
    }
  },
  images: {
    domains: ['qwiogkombegzgtlyaqsm.supabase.co'],
  },
};

module.exports = nextConfig;
