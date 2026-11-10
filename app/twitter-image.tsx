// app/twitter-image.tsx
import OpengraphImage from "./opengraph-image";
import { SITE } from "@/data/constant";

export const alt = `${SITE.name}, ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;