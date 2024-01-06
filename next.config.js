/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ],
    deviceSizes: [375, 425, 575, 768, 828, 1024, 1440, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24,
  },
};

module.exports = nextConfig
