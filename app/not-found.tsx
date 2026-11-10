// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70svh] flex-col items-start justify-center gap-4 py-16 sm:py-24">
      <p className="text-6xl font-medium text-primary sm:text-7xl" aria-hidden>404</p>
      <h1 className="text-2xl font-medium sm:text-3xl">This page doesn&apos;t exist</h1>
      <p className="max-w-md text-muted">The link may be broken or the page may have moved. Head back to the homepage to keep exploring.</p>
      <Link href="/" className="btn mt-2 w-full sm:w-auto">Back to home</Link>
    </section>
  );
}