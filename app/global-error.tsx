// app/global-error.tsx
"use client";

import { useEffect } from "react";
import { Roboto } from "next/font/google";
import { THEME_SCRIPT } from "@/data/theme-script";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={roboto.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="robots" content="noindex" />
        <title>Something went wrong</title>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <section role="alert" className="wrap flex min-h-svh flex-col items-start justify-center gap-4 py-16 sm:py-24">
          <h1 className="text-2xl font-medium sm:text-3xl">Something went wrong</h1>
          <p className="max-w-md text-muted">The page failed to load. Try again, or reload in a moment.</p>
          {error.digest && (
            <p className="text-xs text-muted">
              Reference: <code className="break-all">{error.digest}</code>
            </p>
          )}
          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button type="button" onClick={reset} className="btn">Try again</button>
            <button type="button" onClick={() => window.location.reload()} className="btn-outline">Reload page</button>
          </div>
        </section>
      </body>
    </html>
  );
}