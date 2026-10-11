"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const parallaxMediaSelector = [
  ".about-portrait__image img",
  ".editorial-gallery__frame img",
].join(", ");

const tiltCardSelector = [
  ".focus-detail",
  ".attendance-experience",
  ".approach-card .glass-panel",
].join(", ");

export function CinematicMotion() {
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 901px)", () => {
      const cleanups: Array<() => void> = [];
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      heroTimeline
        .to(
          ".hero-visual__reveal",
          {
            yPercent: 6,
            scale: 1.12,
            rotate: 0.35,
            ease: "none",
          },
          0,
        )
        .to(
          ".hero-copy",
          {
            yPercent: -11,
            autoAlpha: 0.28,
            ease: "none",
          },
          0,
        );

      gsap.utils.toArray<HTMLElement>(parallaxMediaSelector).forEach((element, index) => {
        const mediaTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: element.closest("figure") ?? element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85 + index * 0.12,
            invalidateOnRefresh: true,
          },
        });

        mediaTimeline
          .fromTo(
            element,
            { yPercent: -3, scale: 0.86, opacity: 0.34 },
            { yPercent: 0, scale: 1, opacity: 1, duration: 0.5, ease: "none" },
          )
          .to(element, { yPercent: 5, scale: 1.055, opacity: 0.4, duration: 0.5, ease: "none" });
      });

      const galleryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".editorial-gallery__grid",
          start: "top 88%",
          end: "bottom 24%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      galleryTimeline
        .fromTo(
          ".editorial-gallery__room",
          { xPercent: -8, rotate: -1.5 },
          { xPercent: 0, rotate: 0, ease: "none" },
          0,
        )
        .fromTo(
          ".editorial-gallery__detail",
          { xPercent: 11, yPercent: 12, rotate: 2.2 },
          { xPercent: 0, yPercent: 0, rotate: 0, ease: "none" },
          0,
        );

      [".about-copy__lead", ".final-cta h2"].forEach((selector, index) => {
        const element = document.querySelector<HTMLElement>(selector);

        if (!element) {
          return;
        }

        const split = SplitText.create(element, {
          type: "words",
          wordsClass: "cinematic-word",
        });

        gsap.fromTo(
          split.words,
          {
            yPercent: index === 0 ? 18 : 24,
            opacity: index === 0 ? 0.18 : 0.1,
          },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              end: "bottom 52%",
              scrub: 0.75,
            },
          },
        );

        cleanups.push(() => split.revert());
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    });

    media.add("(min-width: 901px) and (pointer: fine)", () => {
      const cleanupListeners: Array<() => void> = [];
      const halo = document.querySelector<HTMLElement>(".cinematic-halo");

      if (halo) {
        gsap.set(halo, { x: window.innerWidth * 0.78, y: window.innerHeight * 0.32 });
        const xTo = gsap.quickTo(halo, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(halo, "y", { duration: 0.7, ease: "power3.out" });
        const moveHalo = (event: PointerEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };

        window.addEventListener("pointermove", moveHalo, { passive: true });
        cleanupListeners.push(() => window.removeEventListener("pointermove", moveHalo));
      }

      gsap.utils.toArray<HTMLElement>(tiltCardSelector).forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power3.out" });

        gsap.set(card, { transformPerspective: 1000, transformOrigin: "center" });

        const handleMove = (event: PointerEvent) => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;

          rotateX(y * -3.2);
          rotateY(x * 3.2);
        };
        const handleLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        card.addEventListener("pointermove", handleMove);
        card.addEventListener("pointerleave", handleLeave);
        cleanupListeners.push(() => {
          card.removeEventListener("pointermove", handleMove);
          card.removeEventListener("pointerleave", handleLeave);
          gsap.killTweensOf(card);
          gsap.set(card, { clearProps: "transformPerspective,transformOrigin,rotationX,rotationY" });
        });
      });

      return () => cleanupListeners.forEach((cleanup) => cleanup());
    });

    return () => media.revert();
  }, { dependencies: [reducedMotion] });

  return <div className="cinematic-halo" aria-hidden="true" />;
}
