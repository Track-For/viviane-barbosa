import { Globe2, MessagesSquare, ShieldCheck } from "lucide-react";

import { profile } from "@/data/profile";

const items = [
  {
    icon: Globe2,
    title: "Brasileiras no exterior",
    detail: "Acolhimento para solidão, ansiedade e adaptação",
  },
  {
    icon: MessagesSquare,
    title: "Mentoria para empreendedoras",
    detail: "Comunicação, posicionamento e vendas com autenticidade",
  },
  {
    icon: ShieldCheck,
    title: "Um espaço que fala sua língua",
    detail: `Escuta qualificada para ${profile.audience}`,
  },
] as const;

export function ClarityStrip() {
  return (
    <section className="clarity-strip" aria-label="Informações principais">
      <div className="site-container clarity-strip__grid">
        {items.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="clarity-strip__item">
            <Icon aria-hidden="true" size={21} strokeWidth={1.5} />
            <div>
              <strong>{title}</strong>
              <span>{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
