"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { flushSync } from "react-dom";
import { useRef, useState } from "react";

import { media } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

const TherapeuticLightField = dynamic(() => import("@/components/webgl/TherapeuticLightField"), {
  ssr: false,
});

const perspectives = [
  {
    title: "Compreender",
    text: "Olhar com cuidado para o que está por trás dos padrões que geram ansiedade, insegurança ou desconexão de si.",
  },
  {
    title: "Fortalecer",
    text: "Construir segurança emocional respeitando sua história, seu contexto e o tempo necessário para elaborar.",
  },
  {
    title: "Expressar",
    text: "Encontrar mais clareza e segurança para comunicar o que você pensa, sente e precisa.",
  },
] as const;

export function ShaderStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const perspective = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!root.current || !stage.current || reducedMotion) {
        return;
      }

      const mediaQuery = gsap.matchMedia();

      mediaQuery.add("(min-width: 901px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.85}`,
            pin: stage.current,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
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
            { yPercent: 12, autoAlpha: 0.42 },
            { yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "none" },
            0.4,
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

  const selectPerspective = (next: number) => {
    if (!perspective.current || next === active) {
      return;
    }

    const normalized = (next + perspectives.length) % perspectives.length;

    if (reducedMotion) {
      setActive(normalized);
      return;
    }

    const content = perspective.current.querySelectorAll("[data-perspective-content]");
    gsap.killTweensOf(content);
    gsap
      .timeline({ defaults: { ease: "calm", overwrite: "auto" } })
      .to(content, { xPercent: -8, autoAlpha: 0, duration: 0.2, stagger: 0.025 })
      .add(() => flushSync(() => setActive(normalized)))
      .fromTo(
        perspective.current.querySelectorAll("[data-perspective-content]"),
        { xPercent: 9, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.48, stagger: 0.045 },
      );
  };

  const selected = perspectives[active];

  return (
    <section ref={root} className="shader-story" aria-labelledby="shader-story-title">
      <div ref={stage} className="shader-story__stage">
        <div className="shader-story__atmosphere" aria-hidden="true">
          <TherapeuticLightField />
        </div>

        <div className="site-container shader-story__layout">
          <div className="shader-story__heading">
            <p>Cuidado que ganha forma</p>
            <h2 id="shader-story-title">
              Entre escuta
              <span className="shader-story__inline-media" aria-hidden="true">
                <Image src={media.portrait.src} alt="" fill sizes="8rem" />
              </span>
              e clareza existe espaço
              <span className="shader-story__inline-media shader-story__inline-media--wide" aria-hidden="true">
                <Image src={media.optional.src} alt="" fill sizes="11rem" />
              </span>
              para você
            </h2>
          </div>

          <div ref={perspective} className="shader-story__perspective glass-panel" aria-live="polite">
            <div className="shader-story__perspective-meta">
              <span>Perspectivas do trabalho</span>
              <span>{String(active + 1).padStart(2, "0")} / {String(perspectives.length).padStart(2, "0")}</span>
            </div>
            <div>
              <h3 data-perspective-content>{selected.title}</h3>
              <p data-perspective-content>{selected.text}</p>
            </div>
            <div className="shader-story__controls">
              <button type="button" onClick={() => selectPerspective(active - 1)} aria-label="Perspectiva anterior">
                <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
              <span aria-hidden="true">
                <i style={{ transform: `scaleX(${(active + 1) / perspectives.length})` }} />
              </span>
              <button type="button" onClick={() => selectPerspective(active + 1)} aria-label="Próxima perspectiva">
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
