"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    let active = true;
    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    const scrollToHash = (hash: string, immediate = false) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const target = id ? document.getElementById(id) : null;

      if (!target) {
        return;
      }

      lenis.scrollTo(target, {
        offset: -88,
        duration: immediate ? 0 : 1.05,
        immediate,
      });
    };
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");

      if (!anchor || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);

      if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || !destination.hash) {
        return;
      }

      const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));

      if (!target) {
        return;
      }

      event.preventDefault();
      window.history.pushState(null, "", destination.hash);
      scrollToHash(destination.hash);
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("load", refresh, { once: true });
    document.fonts.ready.then(() => {
      if (!active) {
        return;
      }

      refresh();
      if (window.location.hash) {
        window.requestAnimationFrame(() => scrollToHash(window.location.hash, true));
      }
    });

    return () => {
      active = false;
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("load", refresh);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
