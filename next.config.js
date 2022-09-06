/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    outputStandalone: true,
  },
  env: {
    customKey: 'my-value',
    API_DOMAIN_PROD: 'http://localhost:9085', // http://140.122.82.98
    API_DOMAIN_STAG: 'http://140.122.82.98:9085',
    API_DOMAIN_DEV: 'http://localhost:9085'
  },
}

module.exports = nextConfig
