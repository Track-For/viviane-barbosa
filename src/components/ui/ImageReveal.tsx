"use client";

import { useRef, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

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
      const imageElements = Array.from(root.current.querySelectorAll("img"));
      const removeImageListeners: Array<() => void> = [];
      let cancelled = false;
      let started = false;
      let delayedPlay: ReturnType<typeof gsap.delayedCall> | undefined;
      let revealTrigger: ReturnType<typeof ScrollTrigger.create> | undefined;

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

      const timeline = gsap.timeline({ paused: true, defaults: { ease: "calm" } });

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

      const play = () => {
        if (started || cancelled) {
          return;
        }

        started = true;
        delayedPlay = gsap.delayedCall(delay, () => timeline.play());
      };

      const waitForImage = async (image: HTMLImageElement) => {
        if (!image.complete) {
          await new Promise<void>((resolve) => {
            const settle = () => {
              image.removeEventListener("load", settle);
              image.removeEventListener("error", settle);
              resolve();
            };

            image.addEventListener("load", settle, { once: true });
            image.addEventListener("error", settle, { once: true });
            removeImageListeners.push(() => {
              image.removeEventListener("load", settle);
              image.removeEventListener("error", settle);
            });

            if (image.complete) {
              settle();
            }
          });
        }

        if (typeof image.decode === "function") {
          await image.decode().catch(() => undefined);
        }
      };

      Promise.all(imageElements.map(waitForImage)).then(() => {
        if (cancelled || !root.current) {
          return;
        }

        if (trigger === "scroll") {
          revealTrigger = ScrollTrigger.create({
            trigger: root.current,
            start: "top 84%",
            once: true,
            invalidateOnRefresh: true,
            onEnter: play,
            onEnterBack: play,
          });
          ScrollTrigger.refresh();

          if (revealTrigger.progress > 0) {
            play();
          }
        } else {
          play();
        }
      });

      return () => {
        cancelled = true;
        removeImageListeners.forEach((removeListener) => removeListener());
        delayedPlay?.kill();
        revealTrigger?.kill();
        timeline.kill();
      };
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
