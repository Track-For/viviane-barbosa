import type { Metadata, Viewport } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

import { Grain } from "@/components/layout/Grain";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollColorShift } from "@/components/layout/ScrollColorShift";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Viviane Barbosa | Psicóloga",
    template: "%s | Viviane Barbosa",
  },
  description:
    "Atendimento psicológico online e presencial, com escuta, clareza e acolhimento.",
  applicationName: "Viviane Barbosa Psicologia",
  keywords: ["psicóloga", "psicoterapia", "atendimento psicológico online", "psicologia"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Viviane Barbosa | Psicóloga",
    description: "Atendimento psicológico online e presencial, com escuta, clareza e acolhimento.",
    images: [
      {
        url: "/images/consultorio-apoio.png",
        alt: "Ambiente de atendimento psicológico",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e8edeb" },
    { media: "(prefers-color-scheme: dark)", color: "#101916" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="pt-BR" className={`${manrope.variable} ${dmMono.variable}`}>
        <body>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <ScrollColorShift />
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
