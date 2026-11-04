"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { media } from "@/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { CardRiseMotion } from "@/components/webgl/CardRiseShader";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CardRiseShader = dynamic(() => import("@/components/webgl/CardRiseShader"), {
  ssr: false,
});

const perspectives = [
  {
    title: "Solidão longe de casa",
    text: "Mesmo cercada de pessoas, viver fora pode trazer saudade, desenraizamento e a sensação de que ninguém compreende por inteiro o que você atravessa",
  },
  {
    title: "Crise do guerreiro",
    text: "A persona que ajuda você a dar conta de tudo também pode afastá-la de si, alimentar a exaustão e abrir caminho para o burnout",
  },
  {
    title: "Liderar pessoas, não só processos",
    text: "Processos pedem organização. Pessoas pedem presença, escuta e comunicação clara, inclusive na hora de posicionar sua marca e vender",
  },
] as const;

export function ShaderStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [loadShader, setLoadShader] = useState(false);
  const motion = useRef<CardRiseMotion>({
    cards: Array.from({ length: 3 }, () => ({ y: 1.15, angle: 0, scale: 0.82, alpha: 0, progress: 0 })),
  });

  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion) return;
    if (!("IntersectionObserver" in window)) {
      setLoadShader(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadShader(true);
        observer.disconnect();
      }
    }, { rootMargin: "100% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useGSAP(() => {
    const section = root.current;
    const viewport = stage.current;
    if (!section || !viewport || reducedMotion) return;
    const mediaQuery = gsap.matchMedia();
    mediaQuery.add({
      desktop: "(min-width: 901px) and (min-height: 480px)",
      mobile: "(max-width: 900px) and (min-height: 601px)",
    }, (context) => {
      const desktop = Boolean(context.conditions?.desktop);
      // CSS sticky reserves the scroll distance without inserting pin spacers.
      section.dataset.animated = "true";
      const cards = Array.from(section.querySelectorAll<HTMLElement>(".story-card"));
      const states = motion.current.cards;
      const renderCards = () => {
        states.forEach((card, index) => {
          cards[index].style.transform = `translate3d(0, ${card.y * viewport.clientHeight}px, 0) rotate(${card.angle}deg) scale(${card.scale})`;
          cards[index].style.opacity = String(card.alpha);
          cards[index].style.visibility = card.alpha > 0 ? "visible" : "hidden";
        });
        motion.current.draw?.();
      };
      states.forEach((card, index) => Object.assign(card, {
        y: 1.15 + index * 0.12,
        angle: (desktop ? [-125, 110, -100] : [-65, 60, -55])[index],
        scale: 0.82, alpha: 0, progress: 0,
      }));
      renderCards();
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: renderCards,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onRefresh: renderCards,
          onToggle: (self) => {
            cards.forEach((card) => { card.style.willChange = self.isActive ? "transform, opacity" : ""; });
          },
        },
      });
      timeline
        // Start below the stage: no CSS transform to compound with GSAP's yPercent.
        .fromTo(".story-wash", { y: 0, yPercent: 0 }, { yPercent: -100, duration: 1.65 }, 0.2)
        .addLabel("colorFilled", 1.85)
        .fromTo(".story-highlight", { backgroundSize: "0% 100%", color: "#292c27" },
          { backgroundSize: "100% 100%", color: "#fffaf3", duration: 0.45 }, "colorFilled+=0.25")
        .fromTo(".story-intro", { filter: "blur(0px)", scale: 1, opacity: 1 },
          { filter: `blur(${desktop ? 12 : 7}px)`, scale: 0.94, opacity: 0.22, duration: 0.8 }, 2.9);
      states.forEach((card, index) => {
        const start = 2.95 + index * 0.2;
        timeline.to(card, { alpha: 1, duration: 0.25 }, start)
          .to(card, { y: 0, scale: 1, progress: 1, duration: 1.55, ease: "power2.out" }, start)
          .to(card, { angle: 0, duration: 1.55, ease: "power1.inOut" }, start);
      });
      // Hold the settled cards long enough to read before leaving the section.
      timeline.to({}, { duration: 0.75 });
      let active = true;
      document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => {
        active = false;
        delete section.dataset.animated;
        cards.forEach((card) => {
          ["transform", "opacity", "visibility", "will-change"].forEach((property) => card.style.removeProperty(property));
        });
      };
    });
    return () => mediaQuery.revert();
  }, { scope: root, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section ref={root} className="shader-story story-sequence" aria-labelledby="shader-story-title">
      <div ref={stage} className="story-stage">
        <div className="story-wash" aria-hidden="true" />
        <div className="story-intro">
          <p className="story-eyebrow">Quando sobreviver vira personagem</p>
          <h2 id="shader-story-title">
            Quando ser forte{" "}
            <span className="story-inline-media" aria-hidden="true">
              <Image src={media.portrait.src} alt="" fill sizes="(max-width: 900px) 70px, 120px" />
            </span>{" "}
            vira um papel, é hora de{" "}
            <span className="story-highlight">voltar{" "}
              <span className="story-inline-media story-inline-media--wide" aria-hidden="true">
                <Image src={media.optional.src} alt="" fill sizes="(max-width: 900px) 90px, 150px" />
              </span>{" "}
              para si
            </span>
          </h2>
        </div>
        {loadShader && !reducedMotion && <CardRiseShader stage={stage} motion={motion} />}
        <div className="story-deck" aria-label="Situações acolhidas no trabalho">
          {perspectives.map((item, index) => (
            <article key={item.title} className="story-card">
              <span className="story-card__number">{String(index + 1).padStart(2, "0")}</span>
              <div className="story-card__copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
