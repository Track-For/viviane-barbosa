"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ArtesanalBrand } from "./ArtesanalBrand";
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!root.current) return;
      gsap.set(root.current, { autoAlpha: 1 });
      gsap.timeline({ defaults: { ease: "calm" } })
        .from("[data-preloader-name]", { yPercent: 100, autoAlpha: 0, duration: .65 })
        .fromTo("[data-preloader-line]", { scaleX: 0 }, { scaleX: 1, duration: .6 }, .15)
        .to(root.current, { yPercent: -100, duration: .85 }, .7)
        .set(root.current, { autoAlpha: 0 });
    }, root);
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className="preloader" aria-hidden="true"><div className="preloader__name"><div data-preloader-name><ArtesanalBrand /></div></div><div className="preloader__track"><span data-preloader-line /></div></div>;
}
