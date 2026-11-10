// data/constant.ts
import type { SkillGroup } from "./types";

export const SITE = {
  name: "Srinath Nulidonda",
  role: "Full Stack Developer",
  title: "Srinath Nulidonda | Full Stack Developer",
  description:
    "Full Stack Developer from Hyderabad, India. Srinath Nulidonda builds web apps with React, Next.js and FastAPI, mobile apps with Flutter, and AI/ML products.",
  summary:
    "Full Stack Developer from Hyderabad, India. I turn complex requirements into clean, scalable, production-ready web and mobile applications.",
  tagline: "Full stack development, mobile apps and AI/ML.",
  keywords: [
    "Srinath Nulidonda",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "FastAPI",
    "Flutter Developer",
    "AI Engineer",
    "Machine Learning",
    "TypeScript",
    "Portfolio",
    "Hyderabad",
  ],
  url: "https://srinathnulidonda.vercel.app",
  email: "srinathnulidonda@gmail.com",
  location: "Hyderabad, India",
  address: { locality: "Hyderabad", region: "Telangana", country: "IN" },
  whatsapp: "917013850214",
  resume: "/resume.pdf",
  twitter: "@srinath2973",
  gtm: "GTM-M64FLCFG",
} as const;

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const NAV_LINKS = NAV.map((n) => ({
  id: n.id,
  href: `/#${n.id}`,
  label: n.label,
  cta: n.id === "contact",
}));

export const GITHUB = { label: "GitHub", href: "https://github.com/Srinathnulidonda" } as const;
export const LINKEDIN = { label: "LinkedIn", href: "https://www.linkedin.com/in/srinathnulidonda" } as const;

export const SOCIALS = [
  GITHUB,
  LINKEDIN,
  { label: "X", href: "https://x.com/srinath2973" },
  { label: "Instagram", href: "https://www.instagram.com/nani_29sr/" },
] as const;

export const ROLES = [
  "Full Stack Development",
  "React & Next.js",
  "AI-Powered Applications",
  "Mobile App Development",
  "Backend Engineering",
  "Machine Learning",
  "Problem Solving",
] as const;

export const SERVICES = [
  { label: "Full Stack Web", detail: "React, Next.js, FastAPI" },
  { label: "Mobile Apps", detail: "Flutter and Dart" },
  { label: "AI & ML", detail: "Scikit-learn and LLM integration" },
  { label: "Deployment", detail: "Vercel and Render" },
] as const;

export const SKILLS: SkillGroup[] = [
  { key: "frontend", label: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { key: "backend", label: "Backend", items: ["Python", "FastAPI", "Flask", "REST APIs"] },
  { key: "ai/ml", label: "AI / ML", items: ["Scikit-learn", "Pandas", "AI / LLM Integration"] },
  { key: "mobile", label: "Mobile", items: ["Flutter", "Dart"] },
  { key: "tools", label: "Database & Tools", items: ["PostgreSQL", "Redis", "Firebase", "Git", "GitHub", "Vercel"] },
];

export const FILTERS = [
  { id: "all", label: "All projects" },
  { id: "web", label: "Web apps" },
  { id: "mobile", label: "Mobile apps" },
  { id: "ml", label: "AI / ML" },
] as const;

export const CHAT = {
  name: "Ask Srinath",
  role: "Portfolio guide",
  greeting: "Hi! I can walk you through Srinath's projects, skills and background, or help you get in touch.",
  initial: ["About Srinath", "View Projects", "Contact Info", "Skills"],
} as const;

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";