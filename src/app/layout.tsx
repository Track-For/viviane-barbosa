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
import { getSiteUrl } from "@/lib/site";
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
    default: "Viviane Barbosa | Psicóloga",
    template: "%s | Viviane Barbosa",
  },
  description:
    "Psicoterapia em português para brasileiras no exterior e Mentoria de Comunicação para mulheres empreendedoras.",
  applicationName: "Viviane Barbosa Psicologia",
  keywords: [
    "psicóloga",
    "psicoterapia para brasileiras no exterior",
    "solidão no exterior",
    "crise de ansiedade",
    "mentoria de comunicação para empreendedoras",
    "posicionamento e vendas",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Viviane Barbosa | Psicóloga",
    description:
      "Acolhimento para brasileiras no exterior e mentoria para empreendedoras que querem comunicar e liderar com autenticidade.",
    images: [
      {
        url: "/images/consultorio-diva-mar-paleta.webp",
        alt: "Divã em um ambiente acolhedor com vista para o mar",
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
  themeColor: "#f5f1eb",
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
