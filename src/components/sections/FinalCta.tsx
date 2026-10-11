import { ButtonLink } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="site-container final-cta__inner">
        <h2>Quando fizer sentido, o primeiro passo pode ser simples.</h2>
        <ButtonLink href="#contato" showArrow>
          Agendar conversa
        </ButtonLink>
      </div>
    </section>
  );
}
