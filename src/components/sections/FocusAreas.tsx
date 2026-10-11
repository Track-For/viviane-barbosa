"use client";

import { flushSync } from "react-dom";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { focusAreas } from "@/data/focusAreas";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";

export function FocusAreas() {
  const [active, setActive] = useState(0);
  const detail = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const moveCursor = useCallback((index: number, immediate = false) => {
    const button = list.current?.querySelectorAll<HTMLButtonElement>("button")[index];

    if (!button || !cursor.current) {
      return;
    }

    gsap.to(cursor.current, {
      y: button.offsetTop,
      height: button.offsetHeight,
      duration: immediate || reduced ? 0 : 0.42,
      ease: "calm",
      overwrite: "auto",
    });
  }, [reduced]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => moveCursor(active, true));
    const observer = new ResizeObserver(() => moveCursor(active, true));
    const cursorNode = cursor.current;

    if (list.current) {
      observer.observe(list.current);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      if (cursorNode) {
        gsap.killTweensOf(cursorNode);
      }
    };
  }, [active, moveCursor]);

  const selectArea = (index: number) => {
    if (index === active || !detail.current) {
      return;
    }

    if (reduced) {
      setActive(index);
      return;
    }

    const direction = index > active ? 1 : -1;
    const outgoing = detail.current.querySelectorAll("[data-focus-content]");

    gsap.killTweensOf(outgoing);
    gsap
      .timeline({ defaults: { ease: "calm", overwrite: "auto" } })
      .to(outgoing, {
        xPercent: direction * -8,
        autoAlpha: 0,
        filter: "blur(7px)",
        duration: 0.22,
        stagger: 0.025,
      })
      .add(() => flushSync(() => setActive(index)))
      .fromTo(
        detail.current.querySelectorAll("[data-focus-content]"),
        { xPercent: direction * 10, autoAlpha: 0, filter: "blur(8px)" },
        {
          xPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.46,
          stagger: 0.045,
          clearProps: "transform,filter,opacity,visibility",
        },
      );
  };

  const selected = focusAreas[active];

  return (
    <section id="focos" className="section focus-section">
      <div className="site-container">
        <SectionLabel>Psicoterapia e mentoria</SectionLabel>
        <SplitHeading className="section-title">Caminhos para compreender, fortalecer e se expressar.</SplitHeading>

        <div className="focus-layout">
          <div
            ref={list}
            className="focus-list"
            role="tablist"
            aria-label="Focos de atendimento"
            onMouseLeave={() => moveCursor(active)}
          >
            <span ref={cursor} className="focus-list__cursor" aria-hidden="true" />
            {focusAreas.map((area, index) => (
              <button
                key={area.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="focus-detail"
                className={active === index ? "is-active" : undefined}
                onMouseEnter={() => moveCursor(index)}
                onFocus={() => moveCursor(index)}
                onClick={() => selectArea(index)}
              >
                <span>{area.title}</span>
                <ArrowRight aria-hidden="true" size={22} strokeWidth={1.4} />
              </button>
            ))}
          </div>

          <div ref={detail} id="focus-detail" className="focus-detail glass-panel" role="tabpanel">
            <p data-focus-content>{selected.kind}</p>
            <h3 data-focus-content>{selected.title}</h3>
            <span data-focus-content>{selected.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
