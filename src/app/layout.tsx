import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";

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
  title: {
    default: "Viviane Barbosa | Psicóloga",
    template: "%s | Viviane Barbosa",
  },
  description:
    "Atendimento psicológico online e presencial, com escuta, clareza e acolhimento.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="pt-BR" className={`${manrope.variable} ${dmMono.variable}`}>
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}
