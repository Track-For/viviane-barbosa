"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
const DisplacementImage = dynamic(() => import("@/components/webgl/DisplacementImage"), { ssr: false });
export function ArtesanalHeroImage() {
  const reduced = useReducedMotion();
  return <ImageReveal mode="vertical" trigger="load" delay={.7} className="art-hero-reveal"><div className="displacement-image">
    <Image src="/images/artesanal/ambiente.webp" alt="Composição de cerâmica artesanal, flores secas e luz natural em tons de areia" fill priority sizes="(max-width: 900px) 100vw, 47vw" />
    {!reduced && <DisplacementImage src="/images/artesanal/ambiente.webp" />}
  </div></ImageReveal>;
}
