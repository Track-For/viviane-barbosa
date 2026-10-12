"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { media } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const DisplacementImage = dynamic(() => import("@/components/webgl/DisplacementImage"), {
  ssr: false,
});

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || !heading.current || reduced) {
        return;
      }

      const split = SplitText.create(heading.current, {
        type: "lines,words",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            xPercent: (index) => (index % 2 === 0 ? 18 : 0),
            yPercent: (index) => (index % 2 === 0 ? 0 : 110),
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.95,
            delay: 0.72,
            ease: "calm",
          });
        },
      });
      const timeline = gsap.timeline({
        defaults: { ease: "calm" },
        delay: 0.55,
      });

      timeline
        .from("[data-hero-eyebrow]", { y: 18, autoAlpha: 0, duration: 0.55 })
        .from("[data-hero-copy]", { y: 22, autoAlpha: 0, duration: 0.65 }, "-=0.12")
        .from("[data-hero-actions]", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.42");

      return () => split.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} id="inicio" className="hero-section">
      <figure data-hero-visual className="hero-visual">
        <ImageReveal mode="vertical" trigger="load" delay={0.18} className="hero-visual__reveal">
          <div className="hero-visual__frame">
            <DisplacementImage
              src={media.hero.src}
              alt={media.hero.alt}
              blurDataURL={media.hero.blurDataURL}
            />
          </div>
        </ImageReveal>
        <figcaption>
          Imagem provisória. Substituir por {media.hero.replacement}.
        </figcaption>
      </figure>

      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p data-hero-eyebrow className="hero-eyebrow">
            Psicologia 100% online
          </p>
          <h1 ref={heading}>Um espaço seguro para o que você sente</h1>
          <p data-hero-copy className="hero-intro">
            Psicoterapia para compreender padrões, fortalecer sua segurança emocional e construir uma vida mais
            alinhada com quem você é
          </p>
          <div data-hero-actions className="hero-actions">
            <ButtonLink href="#contato" showArrow>
              Agendar conversa
            </ButtonLink>
            <ButtonLink href="#atendimento" variant="secondary">
              Conheça o atendimento
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
