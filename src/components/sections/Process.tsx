"use client";

import { useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { processSteps } from "@/data/process";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function Process() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  useGSAP(
    () => {
      if (!root.current || reduced || !isDesktop) {
        return;
      }

      const panels = gsap.utils.toArray<HTMLElement>("[data-process-panel]", root.current);

      gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.3}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, index) => {
        if (index === 0) {
          timeline.to({}, { duration: 0.6 });
          return;
        }

        timeline
          .to(panels[index - 1], { autoAlpha: 0, y: -30, duration: 0.35 })
          .to(panel, { autoAlpha: 1, y: 0, duration: 0.45 }, "<0.05")
          .to({}, { duration: 0.55 });
      });
    },
    { scope: root, dependencies: [isDesktop, reduced] },
  );

  return (
    <section ref={root} id="como-funciona" className="process-section">
      <div className="site-container process-shell">
        <div className="process-heading">
          <SectionLabel>Como funciona</SectionLabel>
          <h2>Do primeiro contato ao início das sessões.</h2>
        </div>
        <div className="process-panels">
          {processSteps.map((step) => (
            <article key={step.title} data-process-panel className="process-panel">
              <span className="process-panel__line" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
