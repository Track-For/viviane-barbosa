"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const contours = [
  "M130 530 C105 410 76 287 60 180 C45 100 140 83 237 92 C400 88 514 140 617 251 C710 342 804 355 945 382",
  "M65 165 C140 168 179 222 208 300 C231 368 237 468 246 550 L130 530",
  "M243 465 C260 395 400 367 556 370 C839 368 1120 395 1334 426 C1427 442 1475 466 1481 502 C1488 565 1496 590 1469 614 C1398 658 1315 686 1232 695 C1015 686 743 627 484 592 L260 558 C239 554 235 505 243 465 Z",
  "M244 467 C522 494 798 532 1067 559 C1187 577 1247 579 1314 561 C1387 543 1453 524 1481 502",
  "M130 530 C454 590 796 636 1190 696 C1299 710 1399 661 1470 614 L1473 650 C1387 699 1298 735 1190 731 L151 575 Z",
  "M132 538 L108 719 Q113 727 126 721 L161 575 M1190 697 L1209 922 Q1219 934 1233 924 L1239 726 M1436 669 L1480 799 Q1491 805 1497 796 L1473 648 M458 622 L462 666 L476 667 L481 626",
  "M208 300 C220 345 224 383 226 407 M304 122 C384 144 411 234 416 369 M457 151 C505 202 522 284 530 370",
];

export function DivanExperience() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (min-height: 650px)", () => {
      const section = root.current!;
      section.dataset.draw = "true";
      const paths = section.querySelectorAll<SVGPathElement>(".divan-lines path");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.set(".divan-photo", { autoAlpha: 0 });
      gsap.set(".divan-information > *", { autoAlpha: 0, y: 22 });
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1, section.offsetHeight - (section.querySelector<HTMLElement>(".divan-stage")?.offsetHeight ?? window.innerHeight))}`,
          scrub: 0.25, invalidateOnRefresh: true,
        },
      });
      // Finish the reveal halfway through the sticky range; reserve the rest for reading.
      timeline.to(paths, { strokeDashoffset: 0, duration: 2.1, stagger: { amount: 0.9 } }, 0)
        .to(".divan-photo", { autoAlpha: 1, duration: 1 }, 3)
        .to(".divan-lines", { autoAlpha: 0, duration: 0.75 }, 3.25)
        .to(".divan-information > *", { autoAlpha: 1, y: 0, duration: 0.6, stagger: { amount: 0.4 } }, 4)
        .to({}, { duration: 5 }, 5);
      let active = true;
      document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => { active = false; delete section.dataset.draw; };
    }, root);
    return () => media.revert();
  }, { scope: root });

  return (
    <section ref={root} id="abordagem" className="divan-section" aria-labelledby="divan-title">
      <div className="divan-stage site-container">
        <header className="divan-heading">
          <p className="divan-eyebrow">Um espaço para você</p>
          <h2 id="divan-title">O cuidado começa<br />com espaço para ser.</h2>
          <span className="divan-scroll-hint">Role para dar forma a esse encontro</span>
        </header>
        <div className="divan-composition">
          <figure className="divan-visual" aria-label="Um divã que ganha forma e cor, símbolo de um espaço de escuta">
            <Image className="divan-photo" src="/images/therapy-divan.webp" alt="Divã de linho verde-sálvia com estrutura de madeira" width={1536} height={1024} sizes="(max-width: 900px) 94vw, 60vw" />
            <svg className="divan-lines" viewBox="0 0 1536 1024" fill="none" aria-hidden="true">
              {contours.map((d) => <path key={d} d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />)}
            </svg>
          </figure>
          <div className="divan-information">
            <p className="divan-eyebrow">A terapia, no seu ritmo</p>
            <h3>Um cuidado que escuta antes de orientar</h3>
            <p>Sem fórmulas prontas ou a expectativa de que você precise ser forte o tempo inteiro. O encontro parte da sua história, do seu contexto e do que hoje pede atenção</p>
            <ul><li>Escuta atenta à sua história</li><li>Espaço para acolher o que sente</li><li>Tempo para construir novos sentidos</li></ul>
          </div>
        </div>
      </div>
    </section>
  );
}
