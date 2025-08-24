/* app/layout.tsx */
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kinetic Clips — Short-form ads that convert",
  description:
    "A short-form commerce studio producing UGC ads and affiliate videos. $99 trial, 48-hour delivery.",
  metadataBase: new URL("https://kineticclips.com"),
  openGraph: {
    title: "Kinetic Clips — Short-form ads that convert",
    description:
      "A short-form commerce studio producing UGC ads and affiliate videos. $99 trial, 48-hour delivery.",
    url: "https://kineticclips.com",
    siteName: "Kinetic Clips",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic Clips — Short-form ads that convert",
    description:
      "UGC ads and affiliate videos engineered for hooks, watch-time, and ROAS. $99 trial, 48-hour delivery.",
    creator: "@kineticclips",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-[rgb(var(--kc-bg))] text-[rgb(var(--kc-fg))] antialiased">
        {children}
      </body>
    </html>
  );
}
