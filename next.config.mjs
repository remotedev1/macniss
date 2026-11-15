/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io", port: "" },
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;
