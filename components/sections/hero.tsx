// components/sections/hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, Send } from "lucide-react";
import profile from "@/assets/images/profile.webp";
import { ROLES, SITE, SOCIALS } from "@/data/constant";

function useTyped(words: readonly string[]) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let word = 0;
    let count = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = words[word];
      count += deleting ? -1 : 1;
      setText(full.slice(0, count));
      let delay = deleting ? 35 : 70;
      if (!deleting && count === full.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && count === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

export default function Hero() {
  const typed = useTyped(ROLES);

  return (
    <section id="home" className="flex flex-col">
      <div className="wrap grid items-center gap-12 pb-4 pt-4 lg:grid-cols-[1.3fr_1fr] lg:gap-24 lg:pb-6 lg:pt-6">
        <div className="min-w-0">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-[13px] font-medium leading-snug min-[23rem]:text-sm">
            <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <span className="min-[23rem]:hidden">Open to work</span>
            <span className="hidden min-[23rem]:inline">Open to work: freelance and full-time</span>
          </p>

          <h1 className="mt-6 font-medium tracking-tight">
            <span className="block text-5xl leading-[1.02] sm:text-6xl xl:text-7xl 3xl:text-8xl">{SITE.name}</span>
            <span className="mt-4 block max-w-3xl text-2xl leading-snug text-muted sm:text-3xl xl:text-4xl">
              Full stack developer building web, mobile and AI products.
            </span>
          </h1>

          <p className="mt-8 flex min-h-12 w-fit max-w-full items-center rounded-xl bg-primary-container px-4 text-sm text-on-primary-container min-[23rem]:text-base sm:text-lg">
            <span className="sr-only">{SITE.tagline}</span>
            <span aria-hidden className="truncate">
              I&apos;m into <span className="font-medium">{typed}</span>
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-current align-middle" />
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 min-[26rem]:flex-row">
            <a href="#projects" className="btn h-12 w-full px-7 min-[26rem]:w-auto">
              See my work <ArrowDown className="size-4" aria-hidden />
            </a>
            <a href="#contact" className="btn-outline h-12 w-full px-7 min-[26rem]:w-auto">
              Contact me <Send className="size-4" aria-hidden />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-0" aria-label="Social links">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-sm font-medium text-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md 3xl:max-w-lg">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface">
            <Image src={profile} alt={`${SITE.name}, ${SITE.role}`} fill priority sizes="(min-width: 1024px) 36vw, 80vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}