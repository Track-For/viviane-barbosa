"use client";

import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

type ImageRevealProps = {
  children: ReactNode;
  mode?: "vertical" | "curtain";
  trigger?: "load" | "scroll";
  delay?: number;
  className?: string;
};

export function ImageReveal({
  children,
  mode = "curtain",
  trigger = "scroll",
  delay = 0,
  className = "",
}: ImageRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current || reduced) {
        return;
      }

      const content = root.current.querySelector<HTMLElement>("[data-image-reveal-content]");
      const band = root.current.querySelector<HTMLElement>("[data-image-reveal-band]");

      if (!content || !band) {
        return;
      }

      const vertical = mode === "vertical";
      const timeline = gsap.timeline({
        delay,
        defaults: { ease: "calm" },
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: root.current,
                start: "top 84%",
                once: true,
                invalidateOnRefresh: true,
              }
            : undefined,
      });

      gsap.set(content, {
        clipPath: vertical ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)",
        scale: 1.035,
        transformOrigin: "center",
        willChange: "clip-path, transform",
      });
      gsap.set(band, {
        autoAlpha: 1,
        xPercent: vertical ? -115 : 0,
        yPercent: vertical ? 0 : -115,
        willChange: "transform, opacity",
      });

      timeline
        .to(content, {
          clipPath: "inset(0 0% 0% 0)",
          scale: 1,
          duration: 1.2,
        })
        .to(
          band,
          {
            xPercent: vertical ? 520 : 0,
            yPercent: vertical ? 0 : 520,
            duration: 1.15,
          },
          0,
        )
        .to(band, { autoAlpha: 0, duration: 0.16 }, "-=0.12")
        .set([content, band], { clearProps: "willChange" });
    },
    { scope: root, dependencies: [delay, mode, reduced, trigger] },
  );

  return (
    <div ref={root} className={`image-reveal image-reveal--${mode} ${className}`.trim()}>
      <div data-image-reveal-content className="image-reveal__content">
        {children}
      </div>
      <span data-image-reveal-band className="image-reveal__band" aria-hidden="true" />
    </div>
  );
}
