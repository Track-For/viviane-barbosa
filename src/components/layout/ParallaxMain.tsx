"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function ParallaxMain({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    let active = true;

    media.add({
      desktop: "(min-width: 901px)",
      mobile: "(max-width: 900px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduced) return;
      const desktop = Boolean(context.conditions?.desktop);
      const layers = [
        { selector: ".hero-visual .displacement-image", trigger: ".hero-section", travel: 7, hero: true, crop: true },
        { selector: ".about-portrait__image img", trigger: ".about-portrait__image", travel: 6, crop: true },
        { selector: ".editorial-gallery__item--left img", trigger: ".editorial-gallery__frame", travel: 7, crop: true },
        { selector: ".editorial-gallery__item--center img", trigger: ".editorial-gallery__frame", travel: -5, crop: true },
        { selector: ".editorial-gallery__item--right img", trigger: ".editorial-gallery__frame", travel: 9, crop: true },
        { selector: ".final-cta__depth", trigger: ".final-cta__inner", travel: -14, crop: false },
        ...(desktop ? [{ selector: ".hero-copy", trigger: ".hero-section", travel: -9, hero: true, crop: false }] : []),
      ];

      layers.forEach(({ selector, trigger, travel, hero, crop }) => {
        gsap.utils.toArray<HTMLElement>(selector, root.current).forEach((element) => {
          const distance = travel * (desktop ? 1 : 0.35);
          // Overscan keeps the image edges inside the clipped frame throughout the scroll.
          const scale = crop ? 1 + Math.abs(distance) / 50 + 0.02 : 1;
          gsap.fromTo(element, { yPercent: hero ? 0 : -distance, scale }, {
            yPercent: distance,
            scale,
            ease: "none",
            scrollTrigger: {
              trigger: element.closest(trigger),
              start: hero ? "clamp(top top)" : "clamp(top bottom)",
              end: "clamp(bottom top)",
              scrub: 0.65,
              invalidateOnRefresh: true,
              onToggle: (self) => {
                element.style.willChange = self.isActive ? "transform" : "";
              },
              onRefresh: (self) => {
                element.style.willChange = self.isActive ? "transform" : "";
              },
            },
          });
        });
      });

      return () => {
        root.current?.querySelectorAll<HTMLElement>(layers.map(({ selector }) => selector).join(","))
          .forEach((element) => element.style.removeProperty("will-change"));
      };
    }, root);

    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    const images = Array.from(root.current?.querySelectorAll("img") ?? []);
    images.forEach((image) => image.addEventListener("load", refresh));
    document.fonts.ready.then(refresh);

    return () => {
      active = false;
      images.forEach((image) => image.removeEventListener("load", refresh));
      media.revert();
    };
  }, { scope: root });

  return <main ref={root} className="overflow-x-clip">{children}</main>;
}
