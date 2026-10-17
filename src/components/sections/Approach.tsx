import { Check } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { InfoPill } from "@/components/ui/InfoPill";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { profile } from "@/data/profile";

const principles = ["Escuta qualificada", "Acolhimento garantido", "Espaço para ressignificar"] as const;

export function Approach() {
  return (
    <section id="abordagem" className="section approach-section">
      <div className="site-container approach-layout">
        <div className="approach-copy">
          <InfoPill>{profile.approach}</InfoPill>
          <SplitHeading className="section-title">Um cuidado que escuta antes de orientar</SplitHeading>
          <p>
            Sem fórmulas prontas ou a expectativa de que você precise ser forte o tempo inteiro. O encontro parte da
            sua história, do seu contexto e do que hoje pede atenção
          </p>
        </div>

        <Reveal className="approach-card">
          <GlassCard>
            <p>O que você encontra aqui</p>
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
