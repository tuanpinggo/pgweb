/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: process.env.IMAGE_STORAGE_URL,
      //   port: "",
      //   pathname: "/**",
      // },
      {
        protocol: "https",
        hostname: "cdn.pinggo.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms-retailer.pinggo.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-cdn.pinggo.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.vietqr.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
