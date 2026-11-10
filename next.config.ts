// next.config.ts
import type { NextConfig } from "next";
import { CSP_HEADERS, SECURITY_HEADERS } from "./data/security-headers";

const hasSecret = !!process.env.TURNSTILE_SECRET;
const hasSiteKey = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

if (hasSecret !== hasSiteKey) {
  throw new Error("Set both TURNSTILE_SECRET and NEXT_PUBLIC_TURNSTILE_SITE_KEY, or neither.");
}
if (process.env.VERCEL_ENV === "production" && !hasSecret) {
  throw new Error("TURNSTILE_SECRET and NEXT_PUBLIC_TURNSTILE_SITE_KEY are required for production builds.");
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      { source: "/(.*)", headers: SECURITY_HEADERS },
      // Skipped for the PDF: object-src 'none' breaks Chrome's inline PDF viewer.
      { source: "/((?!resume\\.pdf).*)", headers: CSP_HEADERS },
    ];
  },
};

export default nextConfig;