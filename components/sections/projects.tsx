// components/sections/projects.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Code, Lock, Maximize2, X } from "lucide-react";
import { FILTERS, GITHUB } from "@/data/constant";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/data/types";
import { cn } from "@/data/utils";

const MAX_TAGS = 3;

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [zoom, setZoom] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const visible = PROJECTS.filter((p) => filter === "all" || p.filters.some((f) => f === filter));

  const toggleTags = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !zoom) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoom]);

  const closeZoom = () => dialogRef.current?.close();

  return (
    <section id="projects" className="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Projects</h2>
            <p className="mt-3 max-w-xl text-muted">Selected work across web, mobile and AI-powered applications.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-medium transition-colors sm:h-9",
                  filter === f.id ? "border-primary bg-primary text-on-primary" : "border-line text-muted hover:bg-surface hover:text-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-muted" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => {
            const extra = p.stack.length - MAX_TAGS;
            const open = expanded.has(p.id);
            const tags = open ? p.stack : p.stack.slice(0, MAX_TAGS);
            return (
              <li key={p.id} className="min-w-0">
                <article className="card group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface hover:shadow-[0_12px_32px_rgb(0_0_0/0.10)]">
                  <div className="p-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        triggerRef.current = e.currentTarget;
                        setZoom(p);
                      }}
                      aria-label={`Enlarge screenshot of ${p.title}`}
                      className="relative block aspect-[2/1] w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-bg"
                    >
                      <Image
                        src={p.image}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                      />
                      <span
                        aria-hidden
                        className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                      >
                        <Maximize2 className="size-3" /> Preview
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-1.5">
                    <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-primary">{p.category}</p>
                    <h3 className="mt-0.5 text-base font-medium leading-snug tracking-tight">{p.title}</h3>
                    <p className="mt-1 line-clamp-3 flex-1 text-[13px] leading-relaxed text-muted">{p.description}</p>

                    <ul className="mt-2.5 flex flex-wrap items-center gap-1" aria-label={`${p.title} tech stack`}>
                      {tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-muted">
                          {t}
                        </li>
                      ))}
                      {extra > 0 && (
                        <li>
                          <button
                            type="button"
                            onClick={() => toggleTags(p.id)}
                            aria-expanded={open}
                            aria-label={open ? `Show fewer technologies for ${p.title}` : `Show ${extra} more technologies for ${p.title}`}
                            className="inline-flex min-h-7 items-center rounded-full bg-primary-container px-2.5 text-[11px] font-medium text-on-primary-container transition-[filter] hover:brightness-95 max-sm:min-h-9 max-sm:px-3"
                          >
                            {open ? "Less" : `+${extra}`}
                          </button>
                        </li>
                      )}
                    </ul>

                    <div className="mt-3 flex gap-2">
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn h-10 flex-1 px-3 text-[13px]">
                          Live demo <ArrowUpRight className="size-3.5" aria-hidden />
                        </a>
                      )}
                      {p.code ? (
                        <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn-outline h-10 flex-1 px-3 text-[13px]">
                          <Code className="size-3.5" aria-hidden /> Source
                        </a>
                      ) : (
                        <span className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-dashed border-line text-[13px] text-muted">
                          <Lock className="size-3.5" aria-hidden /> Private
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex justify-center">
          <a href={GITHUB.href} target="_blank" rel="noopener noreferrer" className="btn-outline max-sm:w-full">
            View all projects on GitHub <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={zoom ? `${zoom.title} preview` : "Project preview"}
        onClose={() => {
          setZoom(null);
          triggerRef.current?.focus();
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none overflow-hidden border-0 bg-transparent p-0 backdrop:bg-black/80"
      >
        {zoom && (
          <div
            role="presentation"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeZoom();
            }}
            className="flex h-full w-full overflow-y-auto overscroll-contain p-4 sm:p-8"
          >
            <button
              type="button"
              onClick={closeZoom}
              aria-label="Close preview"
              className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 grid size-11 place-items-center rounded-full bg-bg text-ink shadow-[0_8px_24px_rgb(0_0_0/0.3)]"
            >
              <X className="size-5" aria-hidden />
            </button>
            <figure className="m-auto flex max-w-full flex-col items-center gap-3 pt-12 sm:pt-0">
              <Image src={zoom.image} alt={zoom.alt} sizes="100vw" className="h-auto max-h-[70svh] w-auto max-w-full rounded-xl object-contain" />
              <figcaption className="max-w-2xl text-center">
                <span className="block text-sm font-medium text-white">{zoom.title}</span>
                <span className="mt-1 block text-[13px] leading-relaxed text-white/80">{zoom.description}</span>
              </figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </section>
  );
}