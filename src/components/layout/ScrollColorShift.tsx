"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const lightPalette = {
  "--page": "#efe8e2",
  "--surface": "#f8f4f0",
  "--surface-strong": "#e5d6cc",
  "--line": "rgb(56 46 42 / 0.16)",
  "--glass": "rgb(248 244 240 / 0.74)",
};

const darkPalette = {
  "--page": "#1a1412",
  "--surface": "#241b18",
  "--surface-strong": "#33241f",
  "--line": "rgb(243 238 235 / 0.14)",
  "--glass": "rgb(31 23 20 / 0.78)",
};

export function ScrollColorShift() {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const original = Object.fromEntries(
        Object.keys(lightPalette).map((property) => [property, styles.getPropertyValue(property).trim()]),
      );
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const destination = dark ? darkPalette : lightPalette;

      const apply = (palette: Record<string, string>, tone: "base" | "warm") => {
        root.dataset.scrollTone = tone;
        gsap.to(root, {
          ...palette,
          duration: reduced ? 0.01 : 0.9,
          ease: "calm",
          overwrite: "auto",
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: () => ScrollTrigger.maxScroll(window) * 0.65,
        end: "max",
        invalidateOnRefresh: true,
        onEnter: () => apply(destination, "warm"),
        onLeaveBack: () => apply(original, "base"),
      });

      return () => {
        trigger.kill();
        gsap.killTweensOf(root);
        gsap.set(root, original);
        delete root.dataset.scrollTone;
      };
    },
    { dependencies: [reduced] },
  );

  return null;
}
