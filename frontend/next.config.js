/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [{ source: "/article", destination: "/", permanent: true }];
  },
};

module.exports = nextConfig;
