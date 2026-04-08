import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleTagManager } from '@next/third-parties/google'
import { GA_TRACKING_ID } from './lib/ga';
import BlockCursor from './components/BlockCursor';
import StarField from './components/StarField';
import StatusBar from './components/StatusBar';
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Francesco Peluso",
    default: "Francesco's little corner of the web",
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
        <StarField />
        <main className="min-h-screen flex items-center justify-center p-3 md:p-6">
          <div className="w-full max-w-5xl border border-white flex flex-col bg-black relative z-10">
            <div className="border-b border-white px-4 py-1.5 flex items-center justify-between text-xs select-none">
              <span className="opacity-50">francescopeluso@portfolio:~$</span>
              <span className="opacity-30 hidden md:block italic">amaze amaze amaze !!</span>
            </div>
            <div className="p-5 md:p-12">
              {children}
            </div>
            <StatusBar />
          </div>
        </main>
      </body>
    </html>
  );
}
