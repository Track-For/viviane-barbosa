import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { faqItems } from "@/data/faq";

export function Faq() {
  return (
    <section id="duvidas" className="section faq-section" aria-labelledby="faq-title">
      <div className="site-container faq-layout">
        <div className="faq-heading">
          <SplitHeading id="faq-title" className="section-title">
            Antes de começar, é natural ter dúvidas
          </SplitHeading>
          <p>As principais informações para você decidir com mais clareza</p>
        </div>
        <Reveal className="faq-content">
          <Accordion items={faqItems} />
        </Reveal>
      </div>
    </section>
  );
}
