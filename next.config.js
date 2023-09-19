/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.iplace.com.br",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
      },
    ],
  },
};
