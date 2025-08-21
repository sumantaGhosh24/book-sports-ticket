/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "j4yuvj65gs.ufs.sh",
      },
    ],
  },
};

module.exports = nextConfig;
