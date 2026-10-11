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
            yPercent: 108,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.1,
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
