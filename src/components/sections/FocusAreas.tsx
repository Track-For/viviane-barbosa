"use client";

import { flushSync } from "react-dom";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { focusAreas } from "@/data/focusAreas";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Flip, gsap } from "@/lib/gsap";

export function FocusAreas() {
  const [active, setActive] = useState(0);
  const detail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const selectArea = (index: number) => {
    if (index === active || !detail.current) {
      return;
    }

    if (reduced) {
      setActive(index);
      return;
    }

    const state = Flip.getState(detail.current);
    flushSync(() => setActive(index));
    Flip.from(state, {
      duration: 0.62,
      ease: "calm",
      scale: false,
    });
    gsap.fromTo(
      detail.current.querySelectorAll("[data-focus-content]"),
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.06, ease: "calm" },
    );
  };

  const selected = focusAreas[active];

  return (
    <section id="focos" className="section focus-section">
      <div className="site-container">
        <SectionLabel>Possibilidades de cuidado</SectionLabel>
        <SplitHeading className="section-title">O que pode ser trabalhado em terapia.</SplitHeading>

        <div className="focus-layout">
          <div className="focus-list" role="tablist" aria-label="Focos de atendimento">
            {focusAreas.map((area, index) => (
              <button
                key={area.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="focus-detail"
                className={active === index ? "is-active" : undefined}
                onClick={() => selectArea(index)}
              >
                <span>{area.title}</span>
                <ArrowRight aria-hidden="true" size={22} strokeWidth={1.4} />
              </button>
            ))}
          </div>

          <div ref={detail} id="focus-detail" className="focus-detail glass-panel" role="tabpanel">
            <p data-focus-content>Conteúdo a validar</p>
            <h3 data-focus-content>{selected.title}</h3>
            <span data-focus-content>{selected.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
