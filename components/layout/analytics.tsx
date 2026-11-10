// components/layout/analytics.tsx
"use client";

import { useSyncExternalStore } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { SITE } from "@/data/constant";

type Consent = "granted" | "denied" | "pending" | null;

const KEY = "analytics-consent";
const enabled = process.env.NODE_ENV === "production" && !!SITE.gtm;
const listeners = new Set<() => void>();
let fallback: Consent = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function read(): Consent {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "granted" || stored === "denied") return stored;
  } catch { }
  return fallback;
}

function notify() {
  listeners.forEach((cb) => cb());
}

function choose(value: "granted" | "denied") {
  fallback = value;
  try {
    localStorage.setItem(KEY, value);
  } catch { }
  notify();
}

function clear() {
  const wasGranted = read() === "granted";
  fallback = null;
  try {
    localStorage.removeItem(KEY);
  } catch { }
  if (wasGranted) {
    window.location.reload();
    return;
  }
  notify();
}

export function AnalyticsPreferences({ className }: { className?: string }) {
  if (!enabled) return null;
  return (
    <button type="button" onClick={clear} className={className}>
      Analytics preferences
    </button>
  );
}

export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, read, (): Consent => "pending");

  if (!enabled) return null;
  if (consent === "granted") return <GoogleTagManager gtmId={SITE.gtm} />;
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] left-[max(1rem,env(safe-area-inset-left))] right-[max(1rem,env(safe-area-inset-right))] z-40 rounded-2xl border border-line bg-bg p-4 shadow-[0_12px_32px_rgb(0_0_0/0.18)] sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-auto sm:max-w-sm"
    >
      <p className="text-sm leading-relaxed text-muted">
        This site uses Google Tag Manager for anonymous usage analytics. Allow it?
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose("granted")} className="btn h-11 flex-1 px-5 text-sm sm:flex-none">Allow</button>
        <button type="button" onClick={() => choose("denied")} className="btn-outline h-11 flex-1 px-5 text-sm sm:flex-none">Decline</button>
      </div>
    </div>
  );
}