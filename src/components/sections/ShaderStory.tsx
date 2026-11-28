import { Reveal } from "@/components/ui/Reveal";

export function ShaderStory() {
  return (
    <section className="story-sequence" aria-labelledby="shader-story-title">
      <div className="site-container story-layout">
        <h2 id="shader-story-title">Quando seu sonho começa a custar sua saúde mental.</h2>
        <Reveal>
          <article className="story-card">
            <h3>Saudade e falta de rede de apoio</h3>
            <p>
              Uma ligação ajuda a matar a saudade, mas faz falta ter por perto alguém com quem contar quando você
              adoece, precisa desabafar ou quer dividir uma boa notícia.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
