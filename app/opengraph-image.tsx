// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { SITE } from "@/data/constant";

export const alt = `${SITE.name}, ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#fdfcff",
          padding: 80,
          color: "#1f1f1f",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 500, color: "#0b57d0" }}>
          <div style={{ display: "flex", width: 16, height: 16, borderRadius: 9999, background: "#0b57d0" }} />
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{SITE.name}</div>
          <div style={{ display: "flex", fontSize: 44, lineHeight: 1.25, color: "#444746", marginTop: 24 }}>
            Full stack developer building web, mobile and AI products.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#444746" }}>
          <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
          <span>React · Next.js · FastAPI · Flutter</span>
        </div>
      </div>
    ),
    { ...size },
  );
}