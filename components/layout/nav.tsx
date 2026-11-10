// components/layout/nav.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./theme-toggle";
import { NAV, NAV_LINKS, SITE } from "@/data/constant";
import { cn } from "@/data/utils";

const spyIds = NAV.map((n) => n.id);

const glass = "bg-bg/75 shadow-[0_8px_30px_rgb(0_0_0/0.08)] backdrop-blur-xl backdrop-saturate-150";

export default function Nav() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!document.getElementById(spyIds[0])) {
        setActive("");
        return;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(spyIds[spyIds.length - 1]);
        return;
      }
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const id of spyIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 48rem)");
    const onChange = () => {
      if (media.matches) setMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const linkClass = (isActive: boolean) =>
    cn(
      "h-11 items-center rounded-full px-3.5 text-[0.85rem] font-medium transition-colors md:px-4 md:text-[0.95rem]",
      isActive ? "bg-primary-container text-on-primary-container" : "text-ink hover:bg-surface",
    );

  return (
    <header ref={headerRef}>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-3 md:h-20 md:gap-4">
          <Link
            href="/#home"
            aria-label={SITE.name}
            className={cn(
              "pointer-events-auto flex h-12 min-w-0 max-w-[calc(100%-10rem)] items-center rounded-full px-3 md:h-14 md:max-w-[calc(100%-28rem)] md:px-4",
              glass,
            )}
          >
            <Image
              src="/logo.webp"
              alt={`${SITE.name} logo`}
              width={160}
              height={40}
              priority
              className="h-4 w-auto max-w-full object-contain sm:h-6 lg:h-7"
            />
          </Link>

          <nav
            aria-label="Primary"
            className={cn("pointer-events-auto flex h-12 shrink-0 items-center gap-1 rounded-full p-0.5 md:h-14 md:p-1.5", glass)}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(link.cta ? "inline-flex" : "hidden md:inline-flex", linkClass(isActive))}
                >
                  {link.label}
                </a>
              );
            })}
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface md:hidden"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth={2} strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </nav>
        </div>

        {menuOpen && (
          <div className="wrap md:hidden">
            <nav
              id="mobile-menu"
              aria-label="Mobile"
              className="pointer-events-auto -mt-1 ml-auto grid max-h-[calc(100dvh-6rem-env(safe-area-inset-top))] w-max min-w-44 gap-0.5 overflow-y-auto overscroll-contain rounded-2xl border border-line bg-bg/90 p-1.5 shadow-[0_8px_30px_rgb(0_0_0/0.08)] backdrop-blur-xl backdrop-saturate-150"
            >
              {NAV_LINKS.filter((l) => !l.cta).map((link) => {
                const isActive = active === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex h-11 items-center rounded-xl px-7 text-[0.9rem] font-medium transition-colors",
                      isActive ? "bg-primary-container text-on-primary-container" : "text-ink hover:bg-surface",
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div aria-hidden="true" className="mx-3 my-1 h-px bg-line" />
              <ThemeToggle variant="menu" />
            </nav>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="h-[calc(3.75rem+env(safe-area-inset-top))] md:h-[calc(4.5rem+env(safe-area-inset-top))]" />
    </header>
  );
}