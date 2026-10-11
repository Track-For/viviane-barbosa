import { Laptop, MapPin, MessageCircleMore } from "lucide-react";

import { profile } from "@/data/profile";

const items = [
  {
    icon: MessageCircleMore,
    title: "Atendimento psicológico",
    detail: `Para ${profile.audience}`,
  },
  {
    icon: Laptop,
    title: "Sessões online",
    detail: "Por videochamada, onde você estiver",
  },
  {
    icon: MapPin,
    title: "Sessões presenciais",
    detail: `Em ${profile.city}`,
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
