const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl = new URL(
  configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
);

export const siteConfig = {
  name: "Francesco Peluso",
  title: "Francesco Peluso — Artificial Intelligence & Software Engineering",
  description:
    "Portfolio of Francesco Peluso, a computer engineer focused on artificial intelligence and full-stack software development.",
  email: "francesco.peluso04@gmail.com",
  locale: "en_US",
  profiles: {
    github: "https://github.com/francescopeluso",
    linkedin: "https://linkedin.com/in/francescopeluso04",
  },
} as const;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, siteUrl).toString();
}
