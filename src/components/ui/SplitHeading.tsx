"use client";

import { useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function SplitHeading({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) {
        return;
      }

      const split = SplitText.create(ref.current, {
        type: "lines,words",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            xPercent: (index) => (index % 2 === 0 ? 18 : 0),
            yPercent: (index) => (index % 2 === 0 ? 0 : 108),
            autoAlpha: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "calm",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 84%",
              once: true,
            },
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
