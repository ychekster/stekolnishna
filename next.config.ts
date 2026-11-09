/**
 * Next.js configuration.
 *
 * Extra allowed origins come from the ALLOWED_ORIGINS env variable (comma-separated
 * host patterns, e.g. "*.trycloudflare.com"). Next.js rejects dev-asset requests and
 * Server Action calls whose Origin differs from the server host — which is exactly what
 * happens when the site is opened through a tunnel or a reverse proxy.
 *
 * The Server Action body limit is raised from the 1 MB default for the order form's
 * attachments: 5 files × 10 MB (src/lib/leads/uploads.ts) plus the text fields.
 */
import type { NextConfig } from "next";

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: allowedOrigins,
  experimental: {
    serverActions: {
      allowedOrigins,
      bodySizeLimit: "52mb",
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
