import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetadata): Metadata {
  const common = {
    title,
    description,
    url: path,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: type === "article"
      ? {
          ...common,
          type: "article",
          publishedTime,
          authors: [siteConfig.name],
        }
      : { ...common, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
