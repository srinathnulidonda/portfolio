// components/ui/turnstile.tsx
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { TURNSTILE_SITE_KEY } from "@/data/constant";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function Turnstile({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const callback = useRef(onToken);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    callback.current = onToken;
  });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!ready || !el || !window.turnstile) return;
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    widget.current = window.turnstile.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: dark ? "dark" : "light",
      size: el.clientWidth < 300 ? "compact" : "flexible",
      appearance: "interaction-only",
      language: "auto",
      retry: "auto",
      "refresh-expired": "auto",
      "refresh-timeout": "auto",
      callback: (token: string) => callback.current(token),
      "expired-callback": () => callback.current(""),
      "timeout-callback": () => callback.current(""),
      "error-callback": () => callback.current(""),
    });
    return () => {
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = undefined;
    };
  }, [ready]);

  useEffect(() => {
    if (widget.current) window.turnstile?.reset(widget.current);
  }, [resetKey]);

  return (
    <>
      {near && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => {
            setFailed(false);
            setReady(true);
          }}
          onError={() => setFailed(true)}
        />
      )}
      <div ref={box} className="max-w-full" />
      {failed && (
        <p role="alert" className="text-sm text-danger">
          Verification could not load. Turn off any content blocker and refresh the page, or email me directly.
        </p>
      )}
    </>
  );
}