import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, DM_Mono, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

import { Grain } from "@/components/layout/Grain";
import { CinematicMotion } from "@/components/layout/CinematicMotion";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollColorShift } from "@/components/layout/ScrollColorShift";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-editorial",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: "%s | Viviane Barbosa",
  },
  description: siteConfig.description,
  applicationName: siteConfig.alternateName,
  authors: [{ name: siteConfig.name, url: "/" }],
  creator: siteConfig.name,
  publisher: siteConfig.alternateName,
  category: "Saúde mental e desenvolvimento profissional",
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    url: "/",
    locale: siteConfig.locale,
    siteName: siteConfig.alternateName,
    title: siteConfig.title,
    description: siteConfig.description,
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
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html
        lang="pt-BR"
        className={`${geist.variable} ${dmMono.variable} ${allura.variable} ${cormorant.variable}`}
      >
        <body>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <ScrollColorShift />
            <CinematicMotion />
            <Header />
            {children}
            <Footer />
            <WhatsAppFloat />
            <Grain />
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
