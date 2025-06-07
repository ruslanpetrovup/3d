/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api.kitofu.shop/:path*', // Предполагаем, что бэкенд работает на порту 3001
      },
    ];
  },
  images: {
    domains: ['api.kitofu.shop', process.env.NEXT_PUBLIC_API_URL?.replace(/^https?:\/\//, '')].filter(Boolean),
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.kitofu.shop',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig; 