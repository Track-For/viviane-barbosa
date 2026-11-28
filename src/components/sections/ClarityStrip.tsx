import { Globe2, Laptop, MessagesSquare } from "lucide-react";

const items = [
  {
    icon: Globe2,
    title: "Brasileiros no exterior",
    detail: "Acolhimento para solidão, ansiedade e adaptação",
  },
  {
    icon: Laptop,
    title: "Sessões online",
    detail: "Encontros por videochamada, com horário combinado conforme seu fuso",
  },
  {
    icon: MessagesSquare,
    title: "Atendimento em português",
    detail: "Fale sobre o que você está vivendo no seu idioma",
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
