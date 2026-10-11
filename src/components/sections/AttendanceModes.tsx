"use client";

import { Laptop, MapPin, MoveUpRight } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { InfoPill } from "@/components/ui/InfoPill";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { attendanceModes } from "@/data/attendance";

const icons = {
  online: Laptop,
  presencial: MapPin,
} as const;

export function AttendanceModes() {
  const [active, setActive] = useState<(typeof attendanceModes)[number]["id"]>("online");
  const selected = attendanceModes.find((mode) => mode.id === active) ?? attendanceModes[0];
  const SelectedIcon = icons[selected.id];

  return (
    <section id="atendimento" className="section attendance-section">
      <div className="site-container attendance-shell">
        <div className="attendance-intro">
          <SplitHeading className="section-title">Atendimento que cabe na sua rotina.</SplitHeading>
          <p>Escolha o formato para entender como cada modalidade funciona.</p>
        </div>

        <div className="attendance-experience">
          <div className="mode-selector" role="tablist" aria-label="Modalidades de atendimento">
            {attendanceModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                role="tab"
                aria-selected={mode.id === active}
                aria-controls="attendance-detail"
                className={mode.id === active ? "is-active" : undefined}
                onClick={() => setActive(mode.id)}
              >
                <span>{mode.title}</span>
                <MoveUpRight aria-hidden="true" size={18} strokeWidth={1.4} />
              </button>
            ))}
          </div>

          <div id="attendance-detail" className="mode-detail" role="tabpanel">
            <div className="mode-detail__icon">
              <SelectedIcon aria-hidden="true" size={31} strokeWidth={1.25} />
            </div>
            <InfoPill>{selected.meta}</InfoPill>
            <h3>{selected.title}</h3>
            <p className="mode-detail__summary">{selected.summary}</p>
            <p>{selected.detail}</p>
            <ButtonLink href="#contato" variant="secondary" showArrow>
              Agendar conversa
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
