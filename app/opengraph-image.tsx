import { ImageResponse } from "next/og";
import { SocialCard } from "./components/SocialCard";
import { siteConfig } from "./lib/site";

export const alt = "Francesco Peluso — Artificial Intelligence and Software Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <SocialCard
      eyebrow="portfolio · selected work · writing"
      title="francesco peluso"
      description={siteConfig.description}
    />,
    size,
  );
}
