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
  // Allow access from network IP (10.0.3.124) in development
  allowedDevOrigins: ["10.0.3.124"],
};

export default nextConfig;
