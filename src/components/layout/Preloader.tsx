"use client";

import { useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current) {
        return;
      }

      if (reduced) {
        gsap.set(root.current, { autoAlpha: 0 });
        setVisible(false);
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "calm" },
        onComplete: () => setVisible(false),
      });

      timeline
        .fromTo("[data-preloader-name]", { yPercent: 100 }, { yPercent: 0, duration: 0.75 })
        .fromTo(
          "[data-preloader-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7 },
          "-=0.45",
        )
        .to(root.current, { yPercent: -100, duration: 0.9 }, "+=0.15");
    },
    { scope: root, dependencies: [reduced] },
  );

  if (!visible) {
    return null;
  }

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="overflow-hidden">
        <p data-preloader-name>Viviane Barbosa</p>
      </div>
      <div className="preloader__track">
        <span data-preloader-line />
      </div>
    </div>
  );
}
