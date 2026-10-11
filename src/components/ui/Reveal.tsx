"use client";

import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) {
        return;
      }

      gsap.fromTo(
        ref.current,
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          delay,
          ease: "calm",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 86%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay, reduced] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
