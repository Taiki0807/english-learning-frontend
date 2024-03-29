/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: [
      'english-learning-backend.fly.dev',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
