"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const precisePointer = window.matchMedia("(pointer: fine)");

    if (!element || reduced.matches || !precisePointer.matches) {
      return;
    }

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.45,
      ease: "calm",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 0.45,
      ease: "calm",
    });

    const move = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      xTo((event.clientX - bounds.left - bounds.width / 2) * 0.16);
      yTo((event.clientY - bounds.top - bounds.height / 2) * 0.16);
    };

    const leave = () => {
      xTo(0);
      yTo(0);
    };

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);

    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(element);
    };
  }, []);

  return ref;
}
