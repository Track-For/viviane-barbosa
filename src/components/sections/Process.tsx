import { processSteps } from "@/data/process";

export function Process() {
  return (
    <section id="como-funciona" className="process-section" aria-labelledby="process-title">
      <div className="site-container process-shell">
        <div className="process-heading">
          <h2 id="process-title">Como funciona o atendimento</h2>
        </div>

        <div className="process-track">
          {processSteps.map((step) => (
            <article key={step.title} className="process-panel">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
