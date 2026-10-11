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
          <SplitHeading className="section-title">Atendimento online, onde você estiver</SplitHeading>
          <p>Sessões por videochamada com acolhimento, privacidade e orientações claras</p>
        </div>

        <div className="attendance-experience">
          <div className="online-mode-summary">
            <span>Formato de atendimento</span>
            <strong>100% online</strong>
            <p>Você escolhe um local reservado e participa por videochamada</p>
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
