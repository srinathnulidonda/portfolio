// components/sections/about.tsx
import { Brain, Cloud, Laptop, Smartphone, type LucideIcon } from "lucide-react";
import { SERVICES, SITE, SKILLS } from "@/data/constant";

const ICONS: Record<string, LucideIcon> = {
  "Full Stack Web": Laptop,
  "Mobile Apps": Smartphone,
  "AI & ML": Brain,
  Deployment: Cloud,
};

export default function About() {
  return (
    <section id="about" className="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div className="wrap">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">About me</h2>
            <p className="mt-3 max-w-xl text-muted">Who I am, what I build and the tools I use.</p>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn col-span-2 h-11 px-5 text-sm sm:col-span-1 sm:h-10"
            >
              View resume
            </a>
            <a href="#projects" className="btn-outline h-11 px-5 text-sm sm:h-10">View work</a>
            <a href="#contact" className="btn-outline h-11 px-5 text-sm sm:h-10">Let&apos;s talk</a>
          </div>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <p className="max-w-xl text-balance text-2xl font-semibold leading-[1.2] tracking-[-0.02em] sm:text-3xl xl:text-[2.125rem]">
              I design and build <span className="text-primary">clean, user-first interfaces</span> that simplify complexity into{" "}
              <span className="text-primary">clear, effortless experiences.</span>
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">{SITE.summary}</p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2" aria-label="Services">
              {SERVICES.map((s) => {
                const Icon = ICONS[s.label] ?? Laptop;
                return (
                  <li key={s.label} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary-container">
                      <Icon className="size-[1.125rem]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block text-xs text-muted">{s.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="w-full min-w-0 rounded-2xl border border-line px-4 sm:rounded-3xl sm:px-6">
            {SKILLS.map((g) => (
              <div
                key={g.key}
                className="grid gap-2.5 border-b border-line py-4 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
              >
                <h3 className="text-[11px] font-semibold uppercase leading-tight tracking-wide text-muted sm:py-1">{g.label}</h3>
                <ul className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2" aria-label={`${g.label} skills`}>
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center rounded-full border border-line px-3 py-1.5 text-[13px] font-medium leading-none text-ink sm:py-1 sm:text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}