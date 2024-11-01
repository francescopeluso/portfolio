import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleTagManager } from '@next/third-parties/google'
import { GA_TRACKING_ID } from './lib/ga';
import AnimatedBackground from "./components/AnimatedBackground";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Francesco Peluso",
    default : "Francesco Peluso's Portfolio",
  },
  description: "Hello there. This is my portfolio website, you may find it interesting (maybe).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={GA_TRACKING_ID ? GA_TRACKING_ID : ''} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedBackground className="pointer-events-none -z-10" />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
