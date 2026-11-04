import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import type { ReactNode } from "react";
import { ArtesanalHeader } from "@/components/layout/ArtesanalHeader";
import { ArtesanalFooter } from "@/components/layout/ArtesanalFooter";
import { getSiteUrl, siteConfig } from "@/lib/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { Grain } from "@/components/layout/Grain";
import "./artesanal.css";
import "./artesanal-motion.css";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-editorial", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: siteConfig.title, template: "%s | Artesanal" },
  description: siteConfig.description,
  applicationName: siteConfig.alternateName,
  authors: [{ name: "Rúbia Pinheiro" }],
  creator: siteConfig.name,
  publisher: siteConfig.alternateName,
  category: "Consultoria e gestão de clínicas",
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/", languages: { "pt-BR": "/" } },
  icons: { icon: "/icon.svg" },
  openGraph: { type: "website", url: "/", locale: "pt_BR", siteName: siteConfig.alternateName, title: siteConfig.title, description: siteConfig.description },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: siteConfig.themeColor };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR" className={`${geist.variable} ${cormorant.variable}`}><body><SmoothScroll><Preloader /><ScrollProgress /><ArtesanalHeader />{children}<ArtesanalFooter /><Grain /></SmoothScroll></body></html>;
}
