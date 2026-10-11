"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const lightPalette = {
  "--page": "#d2b294",
  "--ink": "#29221d",
  "--muted": "#68584d",
  "--surface": "#ead9c8",
  "--surface-strong": "#bd9879",
  "--line": "rgb(41 34 29 / 0.16)",
  "--glass": "rgb(238 224 210 / 0.76)",
  "--shadow": "rgb(77 55 39 / 0.18)",
};

const darkPalette = {
  "--page": "#2c211a",
  "--ink": "#f3ece3",
  "--muted": "#c0b1a4",
  "--surface": "#362820",
  "--surface-strong": "#4a3629",
  "--line": "rgb(243 236 227 / 0.14)",
  "--glass": "rgb(48 35 27 / 0.8)",
  "--shadow": "rgb(0 0 0 / 0.42)",
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
        gsap.set(root, palette);
      };

      if (reduced) {
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
          gsap.set(root, original);
          delete root.dataset.scrollTone;
        };
      }

      const transition = gsap.to(root, {
        ...destination,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: document.documentElement,
          start: () => ScrollTrigger.maxScroll(window) * 0.48,
          end: () => ScrollTrigger.maxScroll(window) * 0.82,
          scrub: 1.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.dataset.scrollTone = self.progress >= 0.5 ? "warm" : "base";
          },
        },
      });

      return () => {
        transition.scrollTrigger?.kill();
        transition.kill();
        gsap.killTweensOf(root);
        gsap.set(root, original);
        delete root.dataset.scrollTone;
      };
    },
    { dependencies: [reduced] },
  );

  return null;
}
