import { Laptop } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";
import { InfoPill } from "@/components/ui/InfoPill";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { onlineAttendance } from "@/data/attendance";

export function AttendanceModes() {
  return (
    <section id="atendimento" className="section attendance-section">
      <div className="site-container attendance-shell">
        <div className="attendance-intro">
          <SplitHeading className="section-title">Cuidado que atravessa fronteiras</SplitHeading>
          <p>Encontros em português, com atenção à sua rotina, ao seu contexto e ao seu fuso horário</p>
        </div>

        <div className="attendance-experience">
          <div className="online-mode-summary">
            <span>Formato de atendimento</span>
            <strong>No conforto da sua casa</strong>
            <p>Sem deslocamentos: você escolhe um lugar tranquilo e chega como está</p>
          </div>

          <div className="mode-detail">
            <div className="mode-detail__icon">
              <Laptop aria-hidden="true" size={31} strokeWidth={1.25} />
            </div>
            <InfoPill>{onlineAttendance.meta}</InfoPill>
            <h3>{onlineAttendance.title}</h3>
            <p className="mode-detail__summary">{onlineAttendance.summary}</p>
            <p>{onlineAttendance.detail}</p>
            <ButtonLink href="#contato" variant="secondary" showArrow>
              Agendar conversa
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
