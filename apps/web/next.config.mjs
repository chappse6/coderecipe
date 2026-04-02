/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/coderecipe",
  experimental: {
    typedRoutes: true,
  },
  i18n: undefined, // using App Router built-in locale handling
};

export default nextConfig;
