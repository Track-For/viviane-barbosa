"use client";

import { useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/data/process";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function Process() {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  useGSAP(
    () => {
      if (!root.current || !viewport.current || !track.current || !progress.current || reduced || !isDesktop) {
        return;
      }

      const distance = () => Math.max(0, track.current!.scrollWidth - viewport.current!.clientWidth);
      const panels = gsap.utils.toArray<HTMLElement>("[data-process-panel]", track.current);
      gsap.set(progress.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(panels, { transformPerspective: 1200, transformOrigin: "center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (processSteps.length - 1),
            duration: { min: 0.18, max: 0.42 },
            delay: 0.06,
            ease: "power1.inOut",
          },
        },
      });

      timeline
        .to(track.current, { x: () => -distance(), duration: 1, ease: "none" }, 0)
        .to(progress.current, { scaleX: 1, duration: 1, ease: "none" }, 0);

      panels.forEach((panel, index) => {
        const entrance = Math.min(0.82, index / Math.max(panels.length - 1, 1));

        timeline.fromTo(
          panel,
          {
            scale: index === 0 ? 0.98 : 0.9,
            rotationY: index === 0 ? 0 : 5,
            autoAlpha: index === 0 ? 1 : 0.58,
          },
          {
            scale: 1,
            rotationY: 0,
            autoAlpha: 1,
            duration: 0.18,
            ease: "power2.out",
          },
          entrance,
        );

        if (index < panels.length - 1) {
          timeline.to(
            panel,
            {
              scale: 0.92,
              rotationY: -3,
              autoAlpha: 0.68,
              duration: 0.2,
              ease: "power2.inOut",
            },
            Math.min(0.8, entrance + 0.24),
          );
        }
      });
    },
    { scope: root, dependencies: [isDesktop, reduced] },
  );

  return (
    <section ref={root} id="como-funciona" className="process-section">
      <div className="site-container process-shell">
        <div className="process-heading">
          <div>
            <SectionLabel>Como funciona</SectionLabel>
            <h2>Do primeiro contato ao início das sessões</h2>
          </div>
          <p>Role para acompanhar cada etapa</p>
        </div>

        <div ref={viewport} className="process-viewport">
          <div ref={track} className="process-track">
            {processSteps.map((step, index) => (
              <article key={step.title} data-process-panel className="process-panel">
                <div className="process-panel__meta">
                  <span>Etapa {String(index + 1).padStart(2, "0")}</span>
                  <span>{String(processSteps.length).padStart(2, "0")}</span>
                </div>
                <span className="process-panel__line" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="process-progress" aria-hidden="true">
          <span ref={progress} />
        </div>
      </div>
    </section>
  );
}
