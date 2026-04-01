/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  i18n: undefined, // using App Router built-in locale handling
};

export default nextConfig;
