import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleTagManager } from '@next/third-parties/google'
import { GA_TRACKING_ID } from './lib/ga';
import BlockCursor from './components/BlockCursor';
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Francesco Peluso",
    default: "Francesco Peluso",
  },
  description: "Francesco Peluso's portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={GA_TRACKING_ID ? GA_TRACKING_ID : ''} />
      <body className={`${geistMono.variable} font-mono`}>
        <BlockCursor />
        <main className="min-h-screen flex items-center justify-center p-3 md:p-6">
          <div className="w-full max-w-5xl border border-white p-5 md:p-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
