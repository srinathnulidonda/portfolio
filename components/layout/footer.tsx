// components/layout/footer.tsx
import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { AnalyticsPreferences } from "./analytics";
import { NAV, SITE, SOCIALS } from "@/data/constant";

const linkClass = "inline-flex min-h-11 items-center gap-1 transition-colors hover:text-primary md:min-h-0";
const headingClass = "text-xs font-semibold uppercase tracking-wide text-ink";
const listClass = "mt-1 text-sm text-muted md:mt-3 md:space-y-2";
const barLink = "inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors hover:text-primary sm:min-h-9";

export default async function Footer() {
  "use cache";
  cacheLife("hours");

  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-6 pb-4 pt-8 md:grid-cols-[1.6fr_1fr_1fr] md:gap-y-8 lg:gap-12 lg:pb-5 lg:pt-10">
        <div className="col-span-2 min-w-0 max-w-sm md:col-span-1">
          <Link
            href="/#home"
            aria-label={SITE.name}
            className="inline-flex min-h-11 items-center md:min-h-0"
          >
            <Image
              src="/logo.webp"
              alt={`${SITE.name} logo`}
              width={160}
              height={40}
              className="h-6 w-auto object-contain sm:h-7"
            />
          </Link>
          <p className="mt-1 text-sm font-medium text-primary md:mt-2">{SITE.role}</p>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
            Building web apps, mobile apps and AI-powered products with modern tools.
          </p>
        </div>

        <nav aria-label="Footer" className="min-w-0">
          <h2 className={headingClass}>Quick links</h2>
          <ul className={listClass}>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`/#${n.id}`} className={linkClass}>{n.label}</a>
              </li>
            ))}
            <li>
              <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Resume <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
              </a>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className={headingClass}>Elsewhere</h2>
          <ul className={listClass}>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {s.label} <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE.email}`} className={linkClass}>Email</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line pb-[env(safe-area-inset-bottom)]">
        <div className="wrap">
          <div className="flex flex-col items-start gap-0.5 py-2 text-xs text-muted max-sm:pr-16 sm:flex-row sm:items-center sm:justify-between sm:py-2.5">
            <p className="text-pretty leading-relaxed">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5">
              <AnalyticsPreferences className={barLink} />
              <a href="/#home" className={barLink}>
                Back to top <ArrowUp className="size-3.5 shrink-0" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}