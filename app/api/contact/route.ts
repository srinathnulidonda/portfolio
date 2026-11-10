// app/api/contact/route.ts
import { isIP } from "node:net";
import { after, NextResponse } from "next/server";
import { SITE } from "@/data/constant";
import { validateContact } from "@/data/validate";

export const maxDuration = 30;

const MAX_BODY = 8192;
const MAX_TOKEN = 2048;
const WINDOW_SECONDS = 600;
const MAX_REQUESTS = 5;
const MAX_REQUESTS_UNKNOWN_IP = 30;
const UNKNOWN_IP = "anonymous";
const CONFIRM_DELAY_MS = 1100;
const EMAIL_TIMEOUT_MS = 8000;
const STORE_TIMEOUT_MS = 2000;
const VERIFY_TIMEOUT_MS = 4000;
const MEMORY_LIMIT = 1000;

type Body = { name?: unknown; email?: unknown; message?: unknown; token?: unknown; website?: unknown };

type EmailConfig = {
  serviceId: string;
  ownerTemplate: string;
  confirmTemplate?: string;
  publicKey: string;
  privateKey: string;
};

const str = (v: unknown) => (typeof v === "string" ? v : "");
const oneLine = (v: string) => v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
const multiLine = (v: string) => v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();

const safeFirstName = (name: string) =>
  name.split(/\s+/)[0].replace(/[^\p{L}\p{M}'’-]/gu, "").slice(0, 30) || "there";

const json = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

const stamp = () =>
  `${new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date())} IST`;

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const allowed = new Set([new URL(SITE.url).host, req.headers.get("host") ?? ""]);
    return allowed.has(new URL(origin).host);
  } catch {
    return false;
  }
}

function clientIp(req: Request) {
  const candidate =
    req.headers.get("x-real-ip")?.trim() || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
  return candidate && isIP(candidate) ? candidate : UNKNOWN_IP;
}

function emailConfig(): EmailConfig | null {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const ownerTemplate = process.env.EMAILJS_OWNER_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!serviceId || !ownerTemplate || !publicKey || !privateKey) return null;
  return { serviceId, ownerTemplate, publicKey, privateKey, confirmTemplate: process.env.EMAILJS_CONFIRM_TEMPLATE_ID || undefined };
}

async function readBody(req: Request, limit: number): Promise<string | null> {
  if (!req.body) return "";
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (; ;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const memory = new Map<string, { count: number; reset: number }>();

function memoryCount(ip: string) {
  const now = Date.now();
  if (memory.size >= MEMORY_LIMIT) {
    for (const [key, entry] of memory) if (entry.reset <= now) memory.delete(key);
    if (memory.size >= MEMORY_LIMIT) {
      const oldest = memory.keys().next().value;
      if (oldest !== undefined) memory.delete(oldest);
    }
  }
  const entry = memory.get(ip);
  if (!entry || entry.reset <= now) {
    memory.set(ip, { count: 1, reset: now + WINDOW_SECONDS * 1000 });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

async function storeCount(ip: string): Promise<number | null> {
  const base = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!base || !token) return null;

  try {
    const key = `contact:${ip}`;
    const res = await fetch(`${base}/multi-exec`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, WINDOW_SECONDS, "NX"],
      ]),
      cache: "no-store",
      signal: AbortSignal.timeout(STORE_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("Rate limit store responded with", res.status);
      return null;
    }
    const data = (await res.json()) as { result?: unknown; error?: string }[];
    const count = data[0]?.result;
    if (typeof count === "number" && Number.isFinite(count)) return count;
    console.error("Rate limit store returned an unexpected response:", data[0]?.error ?? data[0]);
  } catch (err) {
    console.error("Rate limit store failed:", err);
  }
  return null;
}

let warnedFallback = false;

async function isLimited(ip: string) {
  const stored = await storeCount(ip);
  if (stored === null && process.env.NODE_ENV === "production" && !warnedFallback) {
    warnedFallback = true;
    console.warn(
      "Rate limiting is using the in-memory fallback, which is per-instance and weak on serverless. Check the UPSTASH_REDIS_REST_* variables.",
    );
  }
  const count = stored ?? memoryCount(ip);
  const limit = ip === UNKNOWN_IP ? MAX_REQUESTS_UNKNOWN_IP : MAX_REQUESTS;
  return count > limit;
}

async function verifyTurnstile(secret: string | undefined, token: string, ip: string) {
  if (!secret) return true;
  if (!token) return false;
  try {
    const form = new URLSearchParams({ secret, response: token });
    if (ip !== UNKNOWN_IP) form.set("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      cache: "no-store",
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error("Turnstile responded with", res.status);
      return false;
    }
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}

async function sendEmail(config: EmailConfig, templateId: string, params: Record<string, string>) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: config.serviceId,
      template_id: templateId,
      user_id: config.publicKey,
      accessToken: config.privateKey,
      template_params: params,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`EmailJS responded with ${res.status}: ${await res.text()}`);
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);

  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ error: "Unsupported media type" }, 415);
  }

  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY) return json({ error: "Payload too large" }, 413);

  let raw: string | null;
  try {
    raw = await readBody(req, MAX_BODY);
  } catch {
    return json({ error: "Bad request" }, 400);
  }
  if (raw === null) return json({ error: "Payload too large" }, 413);

  let body: Body;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "Bad request" }, 400);
    body = parsed as Body;
  } catch {
    return json({ error: "Bad request" }, 400);
  }

  if (str(body.website)) return json({ ok: true });

  const name = oneLine(str(body.name));
  const email = oneLine(str(body.email));
  const message = multiLine(str(body.message));

  const errors = validateContact({ name, email, message });
  if (Object.keys(errors).length) return json({ errors }, 422);

  const config = emailConfig();
  if (!config) {
    console.error("Contact form is not configured. Set the EMAILJS_* environment variables.");
    return json({ error: "Not configured" }, 500);
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET || undefined;
  if (!turnstileSecret && process.env.NODE_ENV === "production") {
    console.error("Contact form is not configured. Set TURNSTILE_SECRET.");
    return json({ error: "Not configured" }, 500);
  }

  const ip = clientIp(req);
  if (await isLimited(ip)) return json({ error: "Rate limited" }, 429);
  if (!(await verifyTurnstile(turnstileSecret, str(body.token).slice(0, MAX_TOKEN), ip))) {
    return json({ error: "Verification failed" }, 403);
  }

  const date = stamp();

  try {
    await sendEmail(config, config.ownerTemplate, { from_name: name, from_email: email, reply_to: email, message, date });
  } catch (err) {
    console.error("Owner email failed:", err);
    return json({ error: "Send failed" }, 502);
  }

  const { confirmTemplate } = config;
  if (confirmTemplate) {
    const firstName = safeFirstName(name);
    after(async () => {
      await new Promise((resolve) => setTimeout(resolve, CONFIRM_DELAY_MS));
      try {
        await sendEmail(config, confirmTemplate, { to_name: firstName, to_email: email, date });
      } catch (err) {
        console.error("Confirmation email failed:", err);
      }
    });
  }

  return json({ ok: true });
}