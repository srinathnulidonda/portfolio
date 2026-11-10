// components/json-ld.tsx
import profile from "@/assets/images/profile.webp";
import { SERVICES, SITE, SKILLS, SOCIALS } from "@/data/constant";
import { PROJECTS } from "@/data/projects";

const TOPICS = ["Full Stack Development", "Web Development", "Mobile App Development", "Machine Learning"];

export default function JsonLd() {
  const personId = `${SITE.url}/#person`;
  const siteId = `${SITE.url}/#website`;
  const pageId = `${SITE.url}/#profilepage`;
  const photoId = `${SITE.url}/#photo`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": siteId,
        name: `${SITE.name} Portfolio`,
        url: SITE.url,
        description: `Portfolio of ${SITE.name}, ${SITE.role}`,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": siteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        primaryImageOfPage: { "@id": photoId },
      },
      {
        "@type": "ImageObject",
        "@id": photoId,
        url: new URL(profile.src, SITE.url).href,
        contentUrl: new URL(profile.src, SITE.url).href,
        width: profile.width,
        height: profile.height,
        caption: `${SITE.name}, ${SITE.role}`,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        jobTitle: SITE.role,
        url: SITE.url,
        email: SITE.email,
        image: { "@id": photoId },
        description: SITE.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        sameAs: SOCIALS.map((s) => s.href),
        knowsAbout: [...new Set([...TOPICS, ...SKILLS.flatMap((g) => g.items)])],
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.label,
            description: `${s.label} using ${s.detail}`,
            provider: { "@id": personId },
          },
        })),
        mainEntityOfPage: { "@id": pageId },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE.url}/#projects`,
        name: `Projects by ${SITE.name}`,
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.description,
            creator: { "@id": personId },
            keywords: p.stack.join(", "),
            ...(p.live && { url: p.live }),
            ...(p.code && { sameAs: p.code }),
          },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}