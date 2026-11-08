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
  // Basic security headers for every page (HTTPS/HSTS is already handled by Vercel).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
