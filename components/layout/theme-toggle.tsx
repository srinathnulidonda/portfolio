// components/layout/theme-toggle.tsx
"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const QUERY = "(prefers-color-scheme: dark)";
const THEME_COLOR = { light: "#fdfcff", dark: "#202124" } as const;
const root = () => document.documentElement;

type Theme = keyof typeof THEME_COLOR;

function apply(theme: Theme) {
  root().setAttribute("data-theme", theme);
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute("content", THEME_COLOR[theme]));
}

function hasStoredTheme() {
  try {
    return !!localStorage.getItem("theme");
  } catch {
    return false;
  }
}

function toggle() {
  const next: Theme = root().getAttribute("data-theme") === "dark" ? "light" : "dark";
  apply(next);
  try {
    localStorage.setItem("theme", next);
  } catch { }
}

export default function ThemeToggle({ variant = "icon" }: { variant?: "icon" | "menu" }) {
  useEffect(() => {
    const media = window.matchMedia(QUERY);
    apply(root().getAttribute("data-theme") === "dark" ? "dark" : "light");
    const follow = () => {
      if (hasStoredTheme()) return;
      apply(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={toggle}
        className="flex h-11 items-center gap-2 rounded-xl px-7 text-[0.9rem] font-medium text-ink transition-colors hover:bg-surface"
      >
        <Moon className="size-4 [[data-theme=dark]_&]:hidden" aria-hidden />
        <Sun className="hidden size-4 [[data-theme=dark]_&]:block" aria-hidden />
        <span className="[[data-theme=dark]_&]:hidden">Dark</span>
        <span className="hidden [[data-theme=dark]_&]:inline">Light</span>
        <span className="sr-only">theme</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="hidden size-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface md:grid md:size-11"
    >
      <Moon className="size-5 [[data-theme=dark]_&]:hidden" aria-hidden />
      <Sun className="hidden size-5 [[data-theme=dark]_&]:block" aria-hidden />
    </button>
  );
}