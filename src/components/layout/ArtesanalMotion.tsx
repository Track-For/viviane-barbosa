"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/** Original reveal, parallax and pointer choreography, scoped to the Artesanal page. */
export function ArtesanalMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    let active = true;
    media.add({ desktop: "(min-width: 901px)", mobile: "(max-width: 900px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduced) return;
      const desktop = Boolean(context.conditions?.desktop);
      const splits: ReturnType<typeof SplitText.create>[] = [];
      const cleanup: Array<() => void> = [];

      gsap.utils.toArray<HTMLElement>(".art-hero h1, .art-section-head h2, .art-about-copy h2, .art-process h2, .art-faq h2", root.current).forEach((heading) => {
        const hero = heading.tagName === "H1";
        splits.push(SplitText.create(heading, {
          type: "lines", mask: "lines", autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              xPercent: (index) => index % 2 === 0 ? 16 : 0,
              yPercent: (index) => index % 2 === 0 ? 0 : 108,
              autoAlpha: 0, duration: 1.1, stagger: .13, ease: "calm",
              delay: hero ? .85 : 0,
              scrollTrigger: hero ? undefined : { trigger: heading, start: "top 85%", once: true },
            });
          },
        }));
      });

      gsap.from(".art-hero-copy > :not(h1)", { y: 24, autoAlpha: 0, stagger: .12, duration: .9, delay: 1.05, ease: "calm" });
      gsap.utils.toArray<HTMLElement>(".art-service, .art-intro-text > p, .art-about-copy > p:not(.art-eyebrow), .art-process li, .art-faq details", root.current).forEach(element => {
        gsap.from(element, { y: 38, autoAlpha: 0, duration: .9, ease: "calm", scrollTrigger: { trigger: element, start: "top 90%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".art-intro h2, .art-contact h2", root.current).forEach(heading => {
        const split = SplitText.create(heading, { type: "words" });
        splits.push(split);
        gsap.fromTo(split.words, { opacity: .2, yPercent: 22 }, {
          opacity: 1, yPercent: 0, stagger: .08, ease: "none",
          scrollTrigger: { trigger: heading, start: "top 85%", end: "bottom 55%", scrub: .75 },
        });
      });

      gsap.fromTo(".art-hero-image .displacement-image", { yPercent: -4, scale: 1.15 }, {
        yPercent: desktop ? 8 : 3, scale: 1.15, ease: "none",
        scrollTrigger: { trigger: ".art-hero", start: "clamp(top top)", end: "bottom top", scrub: .65 },
      });
      gsap.fromTo(".art-founder-initials", { yPercent: -12 }, {
        yPercent: 12, ease: "none", scrollTrigger: { trigger: ".art-founder-card", start: "top bottom", end: "bottom top", scrub: .7 },
      });
      gsap.fromTo(".art-founder-card", { clipPath: "inset(16% 8% 16% 8%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".art-about", start: "top 85%", end: "top 20%", scrub: .8 },
      });
      // Retain the original gradual background shift in the brand's warm palette.
      gsap.to(root.current, { "--paper": "#e8dac7", ease: "none", scrollTrigger: { trigger: ".art-process", start: "top bottom", end: "bottom top", scrub: 1.6 } });

      if (desktop && window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".art-button, .art-service-link", root.current).forEach(element => {
          const xTo = gsap.quickTo(element, "x", { duration: .45, ease: "calm" });
          const yTo = gsap.quickTo(element, "y", { duration: .45, ease: "calm" });
          const move = (event: PointerEvent) => {
            const bounds = element.getBoundingClientRect();
            xTo((event.clientX - bounds.left - bounds.width / 2) * .14);
            yTo((event.clientY - bounds.top - bounds.height / 2) * .18);
          };
          const leave = () => { xTo(0); yTo(0); };
          element.addEventListener("pointermove", move);
          element.addEventListener("pointerleave", leave);
          cleanup.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
        });
        const halo = root.current?.querySelector<HTMLElement>(".cinematic-halo");
        if (halo) {
          gsap.set(halo, { x: window.innerWidth * .75, y: window.innerHeight * .3 });
          const x = gsap.quickTo(halo, "x", { duration: .7, ease: "power3.out" });
          const y = gsap.quickTo(halo, "y", { duration: .7, ease: "power3.out" });
          const move = (event: PointerEvent) => { x(event.clientX); y(event.clientY); };
          window.addEventListener("pointermove", move, { passive: true });
          cleanup.push(() => window.removeEventListener("pointermove", move));
        }
        const card = root.current?.querySelector<HTMLElement>(".art-founder-card");
        if (card) {
          gsap.set(card, { transformPerspective: 1000 });
          const rx = gsap.quickTo(card, "rotationX", { duration: .6, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: .6, ease: "power3.out" });
          const move = (event: PointerEvent) => { const b = card.getBoundingClientRect(); rx((event.clientY - b.top - b.height / 2) / b.height * -6); ry((event.clientX - b.left - b.width / 2) / b.width * 6); };
          const leave = () => { rx(0); ry(0); };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          cleanup.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
        }
      }
      return () => { cleanup.forEach(fn => fn()); splits.forEach(split => split.revert()); };
    }, root);
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    document.fonts.ready.then(refresh);
    const images = Array.from(root.current?.querySelectorAll("img") ?? []);
    images.forEach(img => img.addEventListener("load", refresh));
    return () => { active = false; images.forEach(img => img.removeEventListener("load", refresh)); media.revert(); };
  }, { scope: root });

  return <main id="conteudo" ref={root} className="art-motion"><div className="cinematic-halo" aria-hidden="true" />{children}</main>;
}
