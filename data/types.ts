// data/types.ts
import type { StaticImageData } from "next/image";

export type ProjectFilter = "web" | "mobile" | "ml";

export type Project = {
  id: string;
  title: string;
  aliases: string[];
  category: string;
  filters: ProjectFilter[];
  description: string;
  stack: string[];
  image: StaticImageData;
  alt: string;
  live: string | null;
  code: string | null;
};

export type SkillGroup = { key: string; label: string; items: string[] };

export type ChatLink = { label: string; href: string };

export type ChatReply = { text: string; links?: ChatLink[]; quick?: string[] };

export type ChatMessage = { id?: string; from: "user" | "bot"; reply: ChatReply };

export type ContactValues = { name: string; email: string; message: string };

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;