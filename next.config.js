/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
