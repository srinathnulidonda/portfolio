// components/chat/chat-widget.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Layers,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { CHAT, SITE } from "@/data/constant";
import { cn, getChatReply } from "@/data/utils";
import type { ChatLink, ChatMessage } from "@/data/types";

const KEY = "chat-history";
const PANEL_ID = "chat-panel";
const AVATAR_SRC = "/chat.webp";
const MAX_INPUT = 200;
const MAX_HISTORY = 50;
const GREETING: ChatMessage = {
  id: "greeting",
  from: "bot",
  reply: { text: CHAT.greeting, quick: [...CHAT.initial] },
};
const WHATSAPP = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Srinath! I visited your portfolio and I'd like to discuss a project.")}`;

const QUICK: Record<string, { icon: LucideIcon; hint: string }> = {
  "About Srinath": { icon: User, hint: "Background and what he does" },
  "View Projects": { icon: Layers, hint: "Web, mobile and AI work" },
  "Contact Info": { icon: Mail, hint: "Email, GitHub and LinkedIn" },
  Skills: { icon: Sparkles, hint: "Tools and technologies" },
};

const FLOAT = [
  "[@media(min-width:40rem)_and_(min-height:34rem)]:absolute",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:bottom-[4.5rem]",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:left-auto",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:right-0",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:top-auto",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:h-[min(37rem,calc(100dvh-11rem))]",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:w-[24.5rem]",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:origin-bottom-right",
  "[@media(min-width:40rem)_and_(min-height:34rem)]:rounded-[1.75rem]",
].join(" ");

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const isLink = (l: unknown): l is ChatLink => {
  const x = l as Partial<ChatLink> | null;
  return !!x && typeof x.label === "string" && typeof x.href === "string" && /^(https?:\/\/|mailto:|\/(?!\/))/.test(x.href);
};

const isMessage = (m: unknown): m is ChatMessage => {
  const x = m as Partial<ChatMessage> | null;
  const r = x?.reply;
  return (
    !!x &&
    (x.id === undefined || typeof x.id === "string") &&
    (x.from === "user" || x.from === "bot") &&
    typeof r?.text === "string" &&
    (r.quick === undefined || (Array.isArray(r.quick) && r.quick.every((q) => typeof q === "string"))) &&
    (r.links === undefined || (Array.isArray(r.links) && r.links.every(isLink)))
  );
};

function Avatar({ className }: { className: string }) {
  return (
    <Image
      src={AVATAR_SRC}
      alt=""
      width={96}
      height={96}
      className={cn("shrink-0 rounded-full object-cover object-top", className)}
    />
  );
}

function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-2.5">
      {text.split("\n\n").map((block, i) => {
        const [first, ...rest] = block.split("\n");
        const heading = rest.length > 0 && first.length <= 40 && !/[.!?:,]$/.test(first);
        return (
          <p key={i} className="whitespace-pre-line">
            {heading ? (
              <>
                <strong className="mb-0.5 block text-[13px] font-semibold tracking-tight">{first}</strong>
                {rest.join("\n")}
              </>
            ) : (
              block
            )}
          </p>
        );
      })}
    </div>
  );
}

const headerButton =
  "grid size-10 place-items-center rounded-full transition-colors hover:bg-on-primary/15 focus-visible:outline-on-primary";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [ready, setReady] = useState(false);
  const [nudge, setNudge] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setMessages(
          parsed
            .filter(isMessage)
            .slice(-MAX_HISTORY)
            .map((m) => (m.id ? m : { ...m, id: uid() })),
        );
      }
    } catch { }
    setReady(true);
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(messages));
    } catch { }
  }, [messages, ready]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: open && !reduce ? "smooth" : "auto" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const focus = setTimeout(() => {
      if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
      else panelRef.current?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("dialog[open]")) {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focus);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function toggle() {
    if (!open && !messages.length) setMessages([GREETING]);
    setNudge(false);
    setOpen(!open);
  }

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function reset() {
    clearTimeout(timer.current);
    setTyping(false);
    setInput("");
    setMessages([GREETING]);
  }

  function send(text: string) {
    const value = text.trim();
    if (!value || typing) return;
    setMessages((m) => [...m, { id: uid(), from: "user" as const, reply: { text: value } }].slice(-MAX_HISTORY));
    setInput("");
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: uid(), from: "bot" as const, reply: getChatReply(value) }].slice(-MAX_HISTORY));
      setTyping(false);
    }, 600);
  }

  const last = messages.length - 1;
  const fresh = messages.length === 1 && messages[0].from === "bot";

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 sm:bottom-[max(3rem,env(safe-area-inset-bottom))]">
      <div
        ref={panelRef}
        id={PANEL_ID}
        role="dialog"
        tabIndex={-1}
        aria-label={`${CHAT.name} chat`}
        className={cn(
          "fixed z-10 bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] right-[max(0.75rem,env(safe-area-inset-right))] h-[min(30rem,calc(100dvh-1.5rem))] flex origin-bottom flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-[0_24px_64px_rgb(0_0_0/0.22)] outline-none transition-[opacity,transform,visibility] duration-200",
          FLOAT,
          open ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-3 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 bg-primary px-4 py-2.5 text-on-primary sm:py-3">
          <div className="relative shrink-0">
            <Avatar className="size-10 ring-2 ring-on-primary/30 sm:size-11" />
            <span
              aria-hidden
              className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-primary bg-emerald-400"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium leading-tight">{CHAT.name}</p>
            <p className="mt-0.5 truncate text-xs opacity-90">{CHAT.role} · Instant answers</p>
          </div>
          <button type="button" onClick={reset} aria-label="Restart conversation" title="Restart conversation" className={headerButton}>
            <RotateCcw className="size-4" aria-hidden />
          </button>
          <button type="button" onClick={close} aria-label="Close chat" className={headerButton}>
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div
          ref={bodyRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-surface [scrollbar-color:var(--line-strong)_transparent] [scrollbar-width:thin]"
        >
          {fresh ? (
            <div className="flex min-h-full flex-col justify-center bg-linear-to-b from-primary-container/50 to-transparent px-4 py-4 sm:py-6">
              <p className="px-1 text-[13px] leading-relaxed text-ink">{messages[0].reply.text}</p>
              <p className="mt-4 px-1 text-[11px] font-semibold uppercase tracking-wide text-muted">Suggested</p>
              <div className="mt-2 grid gap-1.5 sm:gap-2">
                {(messages[0].reply.quick ?? []).map((q) => {
                  const { icon: Icon, hint } = QUICK[q] ?? { icon: Sparkles, hint: "" };
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-line bg-bg p-2 text-left transition-colors hover:border-primary hover:bg-primary-container sm:p-2.5"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary-container transition-colors group-hover:bg-bg sm:size-9">
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium text-ink group-hover:text-on-primary-container">{q}</span>
                        {hint && (
                          <span className="block truncate text-xs text-muted group-hover:text-on-primary-container/80">{hint}</span>
                        )}
                      </span>
                      <ChevronRight
                        className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-on-primary-container"
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3 px-3 py-4 sm:space-y-4 sm:px-4 sm:py-5">
              {messages.map((m, i) => {
                const bot = m.from === "bot";
                return (
                  <div
                    key={m.id ?? i}
                    className={cn(
                      "flex animate-chat-in flex-col gap-2",
                      bot ? "origin-bottom-left items-start" : "origin-bottom-right items-end",
                    )}
                  >
                    <div className={cn("flex w-full items-end gap-2", bot ? "justify-start" : "justify-end")}>
                      {bot && <Avatar className="size-7" />}
                      <div
                        className={cn(
                          "min-w-0 max-w-[85%] px-4 py-2.5 text-sm leading-relaxed [overflow-wrap:anywhere]",
                          bot
                            ? "rounded-2xl rounded-bl-md border border-line bg-bg text-ink shadow-sm"
                            : "whitespace-pre-line rounded-2xl rounded-br-md bg-primary text-on-primary",
                        )}
                      >
                        {bot ? <RichText text={m.reply.text} /> : m.reply.text}
                        {!!m.reply.links?.length && (
                          <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
                            {m.reply.links.map((l) => (
                              <a
                                key={`${l.label}-${l.href}`}
                                href={l.href}
                                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="inline-flex min-h-8 items-center gap-1 rounded-full bg-primary-container px-3 py-1 text-xs font-medium text-on-primary-container transition-[filter] hover:brightness-95 max-sm:min-h-10 max-sm:px-3.5"
                              >
                                {l.label}
                                <ArrowUpRight className="size-3" aria-hidden />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {bot && i === last && !typing && m.reply.quick && (
                      <div className="flex flex-wrap gap-2 pl-9">
                        {m.reply.quick.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => send(q)}
                            className="min-h-8 rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-on-primary max-sm:min-h-10"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {typing && (
                <div className="flex origin-bottom-left animate-chat-in items-end gap-2">
                  <Avatar className="size-7" />
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-bg px-4 py-3.5 shadow-sm">
                    <span className="sr-only">Typing</span>
                    <span aria-hidden className="size-1.5 animate-bounce rounded-full bg-muted" />
                    <span aria-hidden className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                    <span aria-hidden className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-line bg-bg px-3 pb-2 pt-2.5 sm:pb-2.5 sm:pt-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 rounded-full border border-line-strong bg-surface py-1 pl-4 pr-1 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX_INPUT}
              placeholder="Type a message"
              aria-label="Chat message"
              enterKeyHint="send"
              autoComplete="off"
              className="h-10 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted sm:text-sm"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              aria-label="Send message"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-[filter,opacity,transform] hover:brightness-110 active:scale-95 disabled:opacity-40"
            >
              <Send className="size-4" aria-hidden />
            </button>
          </form>
          <div className="mt-1.5 flex items-center justify-between gap-3 px-1 text-[11px] text-muted sm:mt-2">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center gap-1 font-medium text-primary hover:underline"
            >
              Prefer WhatsApp? <ArrowUpRight className="size-3" aria-hidden />
            </a>
            <span className="tabular-nums">{input.length > 150 ? `${input.length}/${MAX_INPUT}` : "Replies are automated"}</span>
          </div>
        </div>
      </div>

      {nudge && !open && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-primary/30 [animation-iteration-count:3]"
        />
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={PANEL_ID}
        aria-label={open ? "Close chat" : `Open ${CHAT.name} chat`}
        className={cn(
          "relative flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary text-on-primary shadow-[0_8px_24px_rgb(0_0_0/0.25)] transition-transform hover:scale-105 active:scale-95",
          open ? "w-14" : "w-14 sm:w-auto sm:pl-5 sm:pr-6",
        )}
      >
        {open ? (
          <X className="relative size-6" aria-hidden />
        ) : (
          <>
            <MessageCircle className="relative size-6" aria-hidden />
            <span className="relative hidden text-sm font-medium sm:inline">Chat with me</span>
          </>
        )}
      </button>
    </div>
  );
}