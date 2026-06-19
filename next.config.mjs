/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kanerika.com",
      },
    ],
  },
};

export default nextConfig;
