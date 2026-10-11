"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const sagePalette = {
  "--page": "#a8b2a1",
  "--ink": "#292c27",
  "--muted": "rgb(41 44 39 / 0.78)",
  "--surface": "#f5f1eb",
  "--surface-strong": "#ffffff",
  "--line": "rgb(41 44 39 / 0.18)",
  "--glass": "rgb(245 241 235 / 0.82)",
  "--shadow": "rgb(41 44 39 / 0.18)",
};

export function ScrollColorShift() {
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);
      const original = Object.fromEntries(
        Object.keys(sagePalette).map((property) => [property, styles.getPropertyValue(property).trim()]),
      );

      const apply = (palette: Record<string, string>, tone: "base" | "sage") => {
        root.dataset.scrollTone = tone;
        gsap.set(root, palette);
      };

      if (reduced) {
        const trigger = ScrollTrigger.create({
          trigger: document.documentElement,
          start: () => ScrollTrigger.maxScroll(window) * 0.65,
          end: "max",
          invalidateOnRefresh: true,
          onEnter: () => apply(sagePalette, "sage"),
          onLeaveBack: () => apply(original, "base"),
        });

        return () => {
          trigger.kill();
          gsap.set(root, original);
          delete root.dataset.scrollTone;
        };
      }

      const transition = gsap.to(root, {
        ...sagePalette,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: document.documentElement,
          start: () => ScrollTrigger.maxScroll(window) * 0.48,
          end: () => ScrollTrigger.maxScroll(window) * 0.82,
          scrub: 1.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.dataset.scrollTone = self.progress >= 0.5 ? "sage" : "base";
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
