// app/error.tsx
"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section role="alert" className="wrap flex min-h-[70svh] flex-col items-start justify-center gap-4 py-16 sm:py-24">
      <h1 className="text-2xl font-medium sm:text-3xl">Something went wrong</h1>
      <p className="max-w-md text-muted">An unexpected error occurred. Try again, or head back to the homepage.</p>
      {error.digest && (
        <p className="text-xs text-muted">
          Reference: <code className="break-all">{error.digest}</code>
        </p>
      )}
      <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <button type="button" onClick={reset} className="btn">Try again</button>
        <a href="/" className="btn-outline">Back to home</a>
      </div>
    </section>
  );
}