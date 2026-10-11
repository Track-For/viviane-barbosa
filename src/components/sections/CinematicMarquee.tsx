"use client";

import { useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const phrases = ["Escuta", "Clareza", "Presença", "Segurança emocional", "Autonomia"] as const;

export function CinematicMarquee() {
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!track.current || reducedMotion) {
        return;
      }

      const loop = gsap.to(track.current, {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
      const visibility = ScrollTrigger.create({
        trigger: track.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        onRefresh: (self) => (self.isActive ? loop.play() : loop.pause()),
      });

      if (!visibility.isActive) {
        loop.pause();
      }

      return () => {
        visibility.kill();
        loop.kill();
      };
    },
    { scope: track, dependencies: [reducedMotion] },
  );

  return (
    <section className="cinematic-marquee" aria-label="Escuta, clareza, presença, segurança emocional e autonomia">
      <div ref={track} className="cinematic-marquee__track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div key={group} className="cinematic-marquee__group">
            {phrases.map((phrase) => (
              <span key={`${group}-${phrase}`}>
                {phrase}
                <i aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
