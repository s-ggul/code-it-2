/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
  experimental: {
    esmExternals: "loose",
  },
  output: "standalone",
};
module.exports = nextConfig;
