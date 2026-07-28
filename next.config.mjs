/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel's build only auto-includes files it can statically trace. Since we
  // read data/content.json and data/messages.json at runtime with a computed
  // path (process.cwd() + ...), it doesn't get picked up automatically for
  // dynamically-rendered routes like /admin — this makes sure it's included.
  experimental: {
    outputFileTracingIncludes: {
      "/**": ["./data/**"],
    },
  },
};

export default nextConfig;
