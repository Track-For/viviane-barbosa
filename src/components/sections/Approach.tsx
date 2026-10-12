import { Check } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { InfoPill } from "@/components/ui/InfoPill";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { profile } from "@/data/profile";

const principles = ["Escuta cuidadosa", "Combinados claros", "Respeito ao seu ritmo"] as const;

export function Approach() {
  return (
    <section id="abordagem" className="section approach-section">
      <div className="site-container approach-layout">
        <div className="approach-copy">
          <InfoPill>{profile.approach}</InfoPill>
          <SplitHeading className="section-title">Cuidado com método, presença e transparência</SplitHeading>
          <p>
            A abordagem orienta o trabalho clínico. Sua descrição será incluída aqui após a validação profissional,
            em linguagem simples e sem promessas de resultado.
          </p>
        </div>

        <Reveal className="approach-card">
          <GlassCard>
            <p>O que guia o encontro</p>
            <ul>
              {principles.map((principle) => (
                <li key={principle}>
                  <Check aria-hidden="true" size={18} strokeWidth={1.6} />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
