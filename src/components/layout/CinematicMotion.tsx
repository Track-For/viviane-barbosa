"use client";

import { usePathname } from "next/navigation";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const tiltCardSelector = [
  ".focus-detail",
  ".attendance-experience",
  ".approach-card .glass-panel",
].join(", ");

export function CinematicMotion() {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  useGSAP(() => {
    if (reducedMotion || pathname !== "/") {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 901px)", () => {
      const cleanups: Array<() => void> = [];
      const galleryItems = gsap.utils.toArray<HTMLElement>(".editorial-gallery__item > .image-reveal");
      const setGalleryWillChange = () => gsap.set(galleryItems, { willChange: "transform" });
      const clearGalleryWillChange = () => gsap.set(galleryItems, { clearProps: "willChange" });
      const galleryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".editorial-gallery__grid",
          start: "top 92%",
          end: "bottom 18%",
          scrub: 0.72,
          invalidateOnRefresh: true,
          onEnter: setGalleryWillChange,
          onEnterBack: setGalleryWillChange,
          onLeave: clearGalleryWillChange,
          onLeaveBack: clearGalleryWillChange,
        },
      });

      galleryTimeline
        .fromTo(
          ".editorial-gallery__item--left > .image-reveal",
          { scale: 0.9 },
          { scale: 1, force3D: true, ease: "none" },
          0,
        )
        .fromTo(
          ".editorial-gallery__item--center > .image-reveal",
          { scale: 0.9 },
          { scale: 1, force3D: true, ease: "none" },
          0,
        )
        .fromTo(
          ".editorial-gallery__item--right > .image-reveal",
          { scale: 0.9 },
          { scale: 1, force3D: true, ease: "none" },
          0,
        );
      cleanups.push(clearGalleryWillChange);

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
  }, { dependencies: [reducedMotion, pathname], revertOnUpdate: true });

  return <div className="cinematic-halo" aria-hidden="true" />;
}
