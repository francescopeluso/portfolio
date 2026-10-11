import type { Metadata } from "next";
import { DM_Mono, Doto, Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { siteConfig, siteUrl } from "./lib/site";
import "./globals.css";

const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });
const doto = Doto({ subsets: ["latin"], weight: "700", variable: "--font-doto" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: "/about" }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Francesco Peluso",
    "artificial intelligence",
    "software engineering",
    "computer engineering",
    "full-stack development",
    "portfolio",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const themeScript = `(() => { const s = localStorage.getItem('theme'); document.documentElement.dataset.theme = s || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); })()`;
const gaId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteUrl.toString(),
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Computer engineer and artificial intelligence student",
  sameAs: [siteConfig.profiles.github, siteConfig.profiles.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Salerno",
  },
  knowsAbout: ["Artificial intelligence", "Software engineering", "Full-stack development"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.variable} ${serif.variable} ${doto.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-shell"><Header />{children}</div>
        <Footer />
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
