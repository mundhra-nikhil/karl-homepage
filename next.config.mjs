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
};

export default nextConfig;
