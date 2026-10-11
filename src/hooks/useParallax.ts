"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

export function useParallax<T extends HTMLElement>(distance = 32) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!element || reduced) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: -distance },
        {
          y: distance,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [distance]);

  return ref;
}
