// components/sections/contact.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import Turnstile from "@/components/ui/turnstile";
import { GITHUB, LINKEDIN, SITE, TURNSTILE_SITE_KEY } from "@/data/constant";
import { cn } from "@/data/utils";
import { EMAIL_MAX, MESSAGE_MAX, NAME_MAX, validateContact } from "@/data/validate";
import type { ContactErrors, ContactValues } from "@/data/types";

type Status = "idle" | "sending" | "success" | "error" | "limited" | "captcha";

const REQUEST_TIMEOUT_MS = 25000;
const EMPTY: ContactValues = { name: "", email: "", message: "" };
const ORDER = ["name", "email", "message"] as const;

const FIELDS = [
  { key: "name", label: "Full name", type: "text", autoComplete: "name", autoCapitalize: "words", spellCheck: true, enterKeyHint: "next", maxLength: NAME_MAX },
  { key: "email", label: "Email address", type: "email", autoComplete: "email", autoCapitalize: "none", spellCheck: false, enterKeyHint: "next", maxLength: EMAIL_MAX },
] as const;

const LINKS = [
  { label: "Email", detail: SITE.email, href: `mailto:${SITE.email}` },
  { label: LINKEDIN.label, detail: "Connect professionally", href: LINKEDIN.href },
  { label: GITHUB.label, detail: GITHUB.href.replace("https://", ""), href: GITHUB.href },
];

const fieldId = (key: keyof ContactValues) => `contact-${key}`;

function timeoutSignal(ms: number): AbortSignal {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) return AbortSignal.timeout(ms);
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

const control =
  "peer block w-full rounded-xl border bg-transparent px-4 text-base text-ink outline-none transition-colors placeholder:text-transparent focus:ring-1";

const controlState = (invalid: boolean) =>
  invalid
    ? "border-danger focus:ring-danger"
    : "border-line-strong hover:border-muted focus:border-primary focus:ring-primary";

const floatLabel =
  "pointer-events-none absolute left-3 -translate-y-1/2 bg-surface px-1.5 transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-autofill:top-0 peer-autofill:text-xs";

const labelColor = (invalid: boolean) => (invalid ? "text-danger" : "text-muted peer-focus:text-primary");

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-danger">
      <AlertCircle className="size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const successRef = useRef<HTMLDivElement>(null);
  const needsCaptcha = !!TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (key: keyof ContactValues, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status !== "sending") setStatus("idle");
  };

  const resetCaptcha = () => {
    setToken("");
    setCaptchaKey((k) => k + 1);
  };

  const focusFirstInvalid = (found: ContactErrors) => {
    const firstInvalid = ORDER.find((k) => found[k]);
    if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
    return !!firstInvalid;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    if (website) {
      setStatus("success");
      return;
    }

    const found = validateContact(values);
    setErrors(found);
    if (focusFirstInvalid(found)) return;

    if (needsCaptcha && !token) {
      setStatus("captcha");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, token, website }),
        signal: timeoutSignal(REQUEST_TIMEOUT_MS),
      });

      if (res.status === 422) {
        const data = (await res.json().catch(() => null)) as { errors?: ContactErrors } | null;
        if (data?.errors) {
          setErrors(data.errors);
          focusFirstInvalid(data.errors);
        }
        setStatus("idle");
        return;
      }
      if (res.status === 429) {
        setStatus("limited");
        resetCaptcha();
        return;
      }
      if (res.status === 403) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setStatus(data?.error === "Verification failed" ? "captcha" : "error");
        resetCaptcha();
        return;
      }
      if (!res.ok) throw new Error(`Request failed with ${res.status}`);

      setValues(EMPTY);
      setStatus("success");
      resetCaptcha();
    } catch (err) {
      console.error("Contact form submit failed:", err);
      setStatus("error");
      resetCaptcha();
    }
  }

  const sending = status === "sending";
  const messageId = fieldId("message");

  return (
    <section id="contact" className="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="min-w-0">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Get in touch</h2>
          <p className="mt-3 max-w-md leading-relaxed text-muted">
            Have a project, a role or a question? Send a message and I&apos;ll get back to you.
          </p>
          <ul className="mt-8 space-y-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="card flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5"
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{l.label}</span>
                    <span className="block truncate text-sm text-muted">{l.detail}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-primary" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Clock className="size-4 shrink-0 text-primary" aria-hidden />
            I usually reply within 24 hours on business days.
          </p>
        </div>

        {status === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="flex min-w-0 flex-col items-center justify-center rounded-3xl border border-line bg-surface px-5 py-12 text-center outline-none sm:px-8 sm:py-14"
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary-container text-on-primary-container">
              <CheckCircle2 className="size-7" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-medium tracking-tight">Message sent</h3>
            <p className="mt-2 max-w-sm text-muted">
              Thanks for reaching out. I&apos;ll reply as soon as I can. A confirmation may arrive in your inbox, so check spam if you don&apos;t see it.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-6 max-sm:w-full">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="min-w-0 rounded-3xl border border-line bg-surface p-5 sm:p-8">
            <h3 className="text-xl font-medium tracking-tight">Send a message</h3>
            <p className="mt-1 text-sm text-muted">Fill in the details below and I&apos;ll get back to you.</p>

            <div className="mt-8 space-y-5">
              {FIELDS.map((f) => {
                const id = fieldId(f.key);
                const invalid = !!errors[f.key];
                return (
                  <div key={f.key} className="space-y-1.5">
                    <div className="relative">
                      <input
                        id={id}
                        name={f.key}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        autoCapitalize={f.autoCapitalize}
                        spellCheck={f.spellCheck}
                        enterKeyHint={f.enterKeyHint}
                        maxLength={f.maxLength}
                        placeholder=" "
                        value={values[f.key]}
                        onChange={(e) => update(f.key, e.target.value)}
                        aria-required="true"
                        aria-invalid={invalid}
                        aria-describedby={invalid ? `${id}-error` : undefined}
                        className={cn(control, "h-14", controlState(invalid))}
                      />
                      <label
                        htmlFor={id}
                        className={cn(floatLabel, "top-1/2 text-base peer-focus:text-xs", labelColor(invalid))}
                      >
                        {f.label}
                      </label>
                    </div>
                    <FieldError id={`${id}-error`} message={errors[f.key]} />
                  </div>
                );
              })}

              <div className="hidden" aria-hidden>
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="space-y-1.5">
                <div className="relative">
                  <textarea
                    id={messageId}
                    name="message"
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    placeholder=" "
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    autoComplete="off"
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `${messageId}-error` : undefined}
                    className={cn(control, "min-h-28 resize-y py-4 leading-relaxed sm:min-h-32", controlState(!!errors.message))}
                  />
                  <label
                    htmlFor={messageId}
                    className={cn(floatLabel, "top-7 text-base peer-focus:text-xs", labelColor(!!errors.message))}
                  >
                    Message
                  </label>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-h-5 flex-1">
                    <FieldError id={`${messageId}-error`} message={errors.message} />
                  </div>
                  <p className="shrink-0 text-xs tabular-nums text-muted">
                    {values.message.length}/{MESSAGE_MAX}
                  </p>
                </div>
              </div>

              {needsCaptcha && <Turnstile onToken={setToken} resetKey={captchaKey} />}
            </div>

            <div role="status" aria-live="polite">
              {(status === "error" || status === "limited" || status === "captcha") && (
                <p className="mt-4 flex items-start gap-3 rounded-xl border border-danger px-4 py-3 text-sm text-danger">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {status === "limited" ? (
                    <span>You have sent several messages recently. Please wait a few minutes and try again.</span>
                  ) : status === "captcha" ? (
                    <span>Verification has not finished yet. Wait a moment, then send your message again.</span>
                  ) : (
                    <span>
                      The message could not be sent. Try again, or email{" "}
                      <a href={`mailto:${SITE.email}`} className="break-all underline">{SITE.email}</a> directly.
                    </span>
                  )}
                </p>
              )}
            </div>

            <button type="submit" disabled={sending} className="btn mt-6 h-12 w-full disabled:opacity-60 sm:w-auto sm:px-8">
              {sending ? (
                <>
                  Sending <Loader2 className="size-4 animate-spin" aria-hidden />
                </>
              ) : (
                <>
                  Send message <Send className="size-4" aria-hidden />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}