"use client";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
const phrases = ["Presença", "Clareza", "Estratégia", "Cada negócio, uma peça única"];
export function CinematicMarquee() {
  const track = useRef<HTMLDivElement>(null);
  const loop = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (!track.current || reduced) return;
    loop.current = gsap.to(track.current, { xPercent: -50, duration: 28, repeat: -1, ease: "none", paused: true });
    const sync = (visible: boolean) => { if (visible && !pausedRef.current && !document.hidden) loop.current?.play(); else loop.current?.pause(); };
    const visibility = ScrollTrigger.create({ trigger: track.current.parentElement, start: "top bottom", end: "bottom top", onToggle: self => sync(self.isActive), onRefresh: self => sync(self.isActive) });
    const onVisibility = () => sync(visibility.isActive);
    document.addEventListener("visibilitychange", onVisibility);
    sync(visibility.isActive);
    return () => { document.removeEventListener("visibilitychange", onVisibility); loop.current = null; };
  }, { scope: track, dependencies: [reduced], revertOnUpdate: true });
  return <section className="cinematic-marquee" aria-label="Presença, clareza, estratégia. Cada negócio, uma peça única.">
    <div ref={track} className="cinematic-marquee__track" aria-hidden="true">{[0, 1].map(group => <div key={group} className="cinematic-marquee__group">{phrases.map(phrase => <span key={phrase}>{phrase}<i /></span>)}</div>)}</div>
    {!reduced && <button className="art-marquee-pause" onClick={() => { pausedRef.current = !paused; setPaused(!paused); loop.current?.paused(!paused); }} aria-pressed={paused} aria-label={paused ? "Retomar movimento da faixa" : "Pausar movimento da faixa"}>{paused ? "Retomar ↗" : "Pausar Ⅱ"}</button>}
  </section>;
}
