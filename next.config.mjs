/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/karl-product-website",
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kanerika.com",
      },
    ],
  },
  allowedDevOrigins: ["10.0.3.167", "localhost:3000"],
};

export default nextConfig;
