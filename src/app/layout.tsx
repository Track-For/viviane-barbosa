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
    "Psicoterapia online e Mentoria de Comunicação para compreender padrões, fortalecer a segurança emocional e se posicionar com clareza.",
  applicationName: "Viviane Barbosa Psicologia",
  keywords: [
    "psicóloga",
    "psicoterapia",
    "mentoria de comunicação",
    "segurança emocional",
    "atendimento psicológico online",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Viviane Barbosa | Psicóloga",
    description:
      "Psicoterapia online e Mentoria de Comunicação para compreender padrões, fortalecer a segurança emocional e se posicionar com clareza.",
    images: [
      {
        url: "/images/consultorio-apoio-paleta.png",
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
  themeColor: "#f5f1eb",
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
