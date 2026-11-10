// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Shell from "@/components/layout/shell";
import Analytics from "@/components/layout/analytics";
import JsonLd from "@/components/json-ld";
import { SITE } from "@/data/constant";
import { THEME_SCRIPT } from "@/data/theme-script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: `${SITE.name} Portfolio`,
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: `${SITE.name} Portfolio`,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: SITE.title,
    description: SITE.description,
  },
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }] },
  verification: bingVerification ? { other: { "msvalidate.01": bingVerification } } : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfcff" },
    { media: "(prefers-color-scheme: dark)", color: "#202124" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Shell>{children}</Shell>
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}