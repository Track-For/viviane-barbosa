import { ButtonLink } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="site-container final-cta__inner">
        <h2>Você não precisa esperar ficar insustentável para pedir apoio</h2>
        <ButtonLink href="#contato" showArrow>
          Conversar com Viviane
        </ButtonLink>
      </div>
    </section>
  );
}
