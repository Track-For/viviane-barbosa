"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";

import { media } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

const TherapeuticLightField = dynamic(() => import("@/components/webgl/TherapeuticLightField"), {
  ssr: false,
});

const perspectives = [
  {
    title: "Solidão longe de casa",
    text: "Mesmo cercada de pessoas, viver fora pode trazer saudade, desenraizamento e a sensação de que ninguém compreende por inteiro o que você atravessa.",
  },
  {
    title: "Crise do guerreiro",
    text: "A persona que ajuda você a dar conta de tudo também pode afastá-la de si, alimentar a exaustão e abrir caminho para o burnout.",
  },
  {
    title: "Liderar pessoas, não só processos",
    text: "Processos pedem organização. Pessoas pedem presença, escuta e comunicação clara — inclusive na hora de posicionar sua marca e vender.",
  },
] as const;

export function ShaderStory() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reducedMotion) {
        return;
      }

      const mediaQuery = gsap.matchMedia();

      mediaQuery.add("(min-width: 901px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            end: "bottom 34%",
            scrub: 0.75,
          },
        });

        timeline
          .fromTo(
            ".shader-story__atmosphere",
            { scale: 1.035, autoAlpha: 0.4 },
            { scale: 1, autoAlpha: 0.88, duration: 0.5, ease: "none" },
            0,
          )
          .fromTo(
            ".shader-story__heading > *",
            { yPercent: 18, autoAlpha: 0.55 },
            { yPercent: 0, autoAlpha: 1, stagger: 0.055, duration: 0.28, ease: "none" },
            0.05,
          )
          .fromTo(
            ".shader-story__inline-media",
            { scale: 0.55, rotate: 8 },
            { scale: 1, rotate: 0, stagger: 0.05, duration: 0.26, ease: "none" },
            0.15,
          )
          .fromTo(
            ".shader-story__perspective",
            { xPercent: 8, autoAlpha: 0.25 },
            { xPercent: 0, autoAlpha: 1, stagger: 0.08, duration: 0.38, ease: "none" },
            0.3,
          )
          .to(
            ".shader-story__atmosphere",
            { scale: 1.025, autoAlpha: 1, duration: 0.35, ease: "none" },
            0.65,
          )
          .to(
            ".shader-story__heading",
            { yPercent: -3, autoAlpha: 0.82, duration: 0.35, ease: "none" },
            0.65,
          );
      });

      return () => mediaQuery.revert();
    },
    { scope: root, dependencies: [reducedMotion] },
  );

  return (
    <section ref={root} className="shader-story" aria-labelledby="shader-story-title">
      <div className="shader-story__stage">
        <div className="shader-story__atmosphere" aria-hidden="true">
          <TherapeuticLightField />
        </div>

        <div className="site-container shader-story__layout">
          <div className="shader-story__heading">
            <p>Quando sobreviver vira personagem</p>
            <h2 id="shader-story-title">
              Quando ser forte
              <span className="shader-story__inline-media" aria-hidden="true">
                <Image src={media.portrait.src} alt="" fill sizes="8rem" />
              </span>
              vira um papel, é hora de voltar
              <span className="shader-story__inline-media shader-story__inline-media--wide" aria-hidden="true">
                <Image src={media.optional.src} alt="" fill sizes="11rem" />
              </span>
              para si
            </h2>
          </div>

          <div className="shader-story__perspectives" aria-label="Situações acolhidas no trabalho">
            {perspectives.map((item, index) => (
              <article key={item.title} className="shader-story__perspective glass-panel">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
