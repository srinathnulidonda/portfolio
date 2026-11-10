// data/utils.ts
import { CHAT, GITHUB, LINKEDIN, SITE, SKILLS } from "./constant";
import { PROJECTS } from "./projects";
import type { ChatLink, ChatReply, Project, ProjectFilter, SkillGroup } from "./types";

export const cn = (...values: (string | false | null | undefined)[]) => values.filter(Boolean).join(" ");

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

const term = (t: string) => new RegExp(`(?:^|[^a-z0-9])${escapeRe(t.toLowerCase())}(?![a-z0-9])`, "i");

const SKILL_ALIASES: Record<string, string[]> = {
  "Next.js": ["nextjs", "next js"],
  React: ["reactjs", "react js"],
  "Tailwind CSS": ["tailwind"],
  "REST APIs": ["rest api", "restful"],
  "Scikit-learn": ["sklearn", "scikit learn"],
  PostgreSQL: ["postgres"],
  "AI / LLM Integration": ["llm", "llms", "ai integration"],
};

const SKILL_ENTRIES = SKILLS.flatMap((g) =>
  g.items.map((item) => {
    const names = [item.replace(/\d+$/, ""), ...(SKILL_ALIASES[item] ?? [])];
    return {
      item,
      group: g.label,
      size: Math.max(...names.map((n) => n.length)),
      re: new RegExp(names.map((n) => term(n).source).join("|"), "i"),
    };
  }),
).sort((a, b) => b.size - a.size);

/* Button labels. Every label here must be understood by getChatReply below. */
const BTN = {
  about: "About Srinath",
  projects: "View Projects",
  allProjects: "All Projects",
  contact: "Contact Info",
  skills: "Skills",
  hire: "Hire Srinath",
  resume: "View Resume",
} as const;

const FILTER_ORDER: ProjectFilter[] = ["web", "mobile", "ml"];
const FILTER_LABEL: Record<ProjectFilter, string> = { web: "Web apps", mobile: "Mobile apps", ml: "AI/ML projects" };
const FILTER_BUTTON: Record<ProjectFilter, string> = { web: "Web Apps", mobile: "Mobile Apps", ml: "AI/ML Projects" };

const PROJECT_QUICK = new Map<string, ProjectFilter | undefined>([
  ["web apps", "web"],
  ["mobile apps", "mobile"],
  ["ai/ml projects", "ml"],
  ["all projects", undefined],
]);

/* Show project names as buttons only when the list is short enough to be useful. */
const PICK_LIMIT = 4;

const GREETING_RE = /^(hi|hello|hey)\b/;
const THANKS_RE = /^(thanks?|thank you|thx|ty)\b/;
const RESUME_RE = /\b(resume|cv)\b/;
const SKILL_QUESTION_RE = /\b(know|knows|use|uses|using|used|experience|experienced|familiar|proficient|skilled|work with|works with)\b/;
const HIRE_RE = /\b(hire|hiring|job|jobs|freelance|available|availability|opportunit\w*|collaborat\w*|recruit\w*)\b/;
const CONTACT_RE = /\b(contact|reach|e-?mail|linkedin|github|connect|touch|call|phone|whatsapp)\b/;
const SKILLS_RE = /\b(skills?|stack|tech|technologies|languages?|frameworks?)\b/;
const PROJECTS_RE = /\b(projects?|portfolio|built|apps?|websites?)\b/;
const ABOUT_RE = /\b(?:about|who|bio|background|story|tell me|experience(?! (?:with|in|using|of)\b))\b/;
const LOCATION_RE = /\b(where|location|located|based|city|hyderabad)\b/;

const WHATSAPP: ChatLink = { label: "WhatsApp", href: `https://wa.me/${SITE.whatsapp}` };

function projectPicks(list: Project[]): string[] {
  return list.length > 0 && list.length <= PICK_LIMIT ? list.map((p) => p.title) : [];
}

function projectsReply(filter?: ProjectFilter): ChatReply {
  const keys = filter ? [filter] : FILTER_ORDER;
  const text = keys
    .map((k) => {
      const list = PROJECTS.filter((p) => p.filters.includes(k));
      return `${FILTER_LABEL[k]} (${list.length})\n${list.map((p) => `• ${p.title}`).join("\n")}`;
    })
    .join("\n\n");

  if (!filter) {
    return {
      text: `${text}\n\nPick a category, or ask about any project by name.`,
      quick: FILTER_ORDER.map((k) => FILTER_BUTTON[k]),
    };
  }

  const picks = projectPicks(PROJECTS.filter((p) => p.filters.includes(filter)));
  if (picks.length) {
    return { text: `${text}\n\nTap a project for details.`, quick: [...picks, BTN.allProjects] };
  }
  const others = FILTER_ORDER.filter((k) => k !== filter).map((k) => FILTER_BUTTON[k]);
  return { text: `${text}\n\nAsk about any project by name for details.`, quick: [...others, BTN.allProjects] };
}

function skillsReply(groups: SkillGroup[], intro?: string): ChatReply {
  const list = groups.map((g) => `${g.label}\n${g.items.join(", ")}`).join("\n\n");
  const quick =
    groups.length === 1 ? SKILLS.filter((g) => g !== groups[0]).map((g) => g.label) : [BTN.projects, BTN.hire];
  return { text: intro ? `${intro}\n\n${list}` : list, quick };
}

export function getChatReply(input: string): ChatReply {
  const msg = normalize(input);
  const email: ChatLink = { label: "Email", href: `mailto:${SITE.email}` };

  if (PROJECT_QUICK.has(msg)) return projectsReply(PROJECT_QUICK.get(msg));

  const group = SKILLS.find((g) => g.key === msg || normalize(g.label) === msg);
  if (group) return skillsReply([group]);

  if (GREETING_RE.test(msg) && msg.split(" ").length <= 3) {
    return { text: CHAT.greeting, quick: [...CHAT.initial] };
  }

  if (THANKS_RE.test(msg)) {
    return { text: "You're welcome! Let me know if there is anything else you'd like to know.", quick: [BTN.hire, BTN.contact] };
  }

  if (RESUME_RE.test(msg)) {
    return {
      text: "Here is Srinath's resume. It opens in a new tab.",
      links: [{ label: "Open resume", href: SITE.resume }],
      quick: [BTN.hire, BTN.projects],
    };
  }

  const project = PROJECTS.find((p) => p.aliases.some((a) => term(a).test(msg)));
  if (project) {
    const links: ChatLink[] = [];
    if (project.live) links.push({ label: "Live demo", href: project.live });
    if (project.code) links.push({ label: "Source code", href: project.code });
    const note = project.code ? "" : "\n\nThis is a private project with no public source.";
    return {
      text: `${project.title}\n${project.category}\n\n${project.description}\n\nBuilt with\n${project.stack.join(", ")}${note}`,
      links,
      quick: [BTN.allProjects, BTN.hire],
    };
  }

  const asksSkill = SKILL_QUESTION_RE.test(msg);
  if (asksSkill) {
    const hit = SKILL_ENTRIES.find((s) => s.re.test(msg));
    if (hit) {
      const used = PROJECTS.filter((p) => p.stack.some((s) => s.toLowerCase() === hit.item.toLowerCase()));
      const picks = projectPicks(used);
      const usedText = used.length ? `\n\nUsed in\n${used.map((p) => `• ${p.title}`).join("\n")}` : "";
      return {
        text: `Yes, Srinath works with ${hit.item} (${hit.group}).${usedText}`,
        quick: picks.length ? picks : [BTN.skills, BTN.projects],
      };
    }
  }

  if (HIRE_RE.test(msg)) {
    return {
      text: `Open to work\nFull-time roles, freelance projects and consulting. Based in ${SITE.location}.\n\nEmail is the quickest way to reach him. He usually replies within 24 hours on business days.`,
      links: [email, WHATSAPP, { label: "Resume", href: SITE.resume }],
    };
  }

  if (CONTACT_RE.test(msg)) {
    return {
      text: "Here is how to reach Srinath. He usually replies within 24 hours on business days.",
      links: [
        email,
        WHATSAPP,
        { label: LINKEDIN.label, href: LINKEDIN.href },
        { label: GITHUB.label, href: GITHUB.href },
      ],
      quick: [BTN.hire, BTN.resume],
    };
  }

  if (SKILLS_RE.test(msg)) return skillsReply(SKILLS);
  if (PROJECTS_RE.test(msg)) return projectsReply();

  if (ABOUT_RE.test(msg)) {
    return {
      text: `About Srinath\n${SITE.summary}\n\nWhat he works with\nReact and Next.js, FastAPI and Flask, Flutter, and AI/ML.`,
      quick: [BTN.projects, BTN.skills, BTN.hire],
    };
  }

  if (LOCATION_RE.test(msg)) {
    return {
      text: `Location\n${SITE.location}`,
      quick: [BTN.hire, BTN.contact],
    };
  }

  if (asksSkill) {
    return {
      ...skillsReply(SKILLS, "I don't see that listed. Here is what Srinath works with. For anything else, just ask him directly."),
      links: [email],
      quick: [BTN.projects, BTN.hire],
    };
  }

  return {
    text: "I'm not sure about that one. I can tell you about Srinath's background, projects and skills, or how to hire him. For anything else, email him directly.",
    links: [email],
    quick: [...CHAT.initial],
  };
}