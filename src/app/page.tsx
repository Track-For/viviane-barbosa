import { ArtesanalMotion } from "@/components/layout/ArtesanalMotion";
import { ArtesanalHeroImage } from "@/components/sections/ArtesanalHeroImage";
import { CinematicMarquee } from "@/components/sections/CinematicMarquee";
import { ShaderStory } from "@/components/sections/ShaderStory";
import { artesanal } from "@/data/artesanal";
import { ArtesanalBrand } from "@/components/layout/ArtesanalBrand";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeStructuredData } from "@/lib/structured-data";

function ContactLink({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <a className={`art-button${light ? " art-button--light" : ""}`} href={artesanal.whatsapp} target="_blank" rel="noopener noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}
export default function HomePage() {
  return <>
    <ArtesanalMotion>
      <section className="art-hero art-container" id="inicio" aria-labelledby="hero-title">
        <div className="art-hero-copy"><p className="art-eyebrow"><span /> CONSULTORIA & GESTÃO PARA CLÍNICAS</p>
          <h1 id="hero-title">Sua clínica tem<br />uma história.<br /><em>O próximo capítulo<br />precisa de clareza.</em></h1>
          <p className="art-hero-description">Gestão financeira e consultoria com um olhar atento ao que faz o seu negócio único. Para decidir com segurança e crescer com direção.</p>
          <ContactLink>Vamos falar sobre sua clínica</ContactLink>
          <div className="art-hero-note"><span className="art-small-rule" /><p>Presença para entender.<br />Estratégia para transformar.</p></div>
        </div>
        <figure className="art-hero-image"><ArtesanalHeroImage /><div className="art-image-word">Cada negócio,<br /><em>uma peça única.</em></div><figcaption>O cuidado está em cada detalhe.</figcaption></figure>
        <a className="art-explore" href="#olhar">CONHEÇA NOSSO OLHAR <span aria-hidden="true">↓</span></a>
      </section>
      <CinematicMarquee />
      <section className="art-intro" id="olhar"><div className="art-container art-intro-grid"><p className="art-eyebrow">UM NOVO OLHAR PARA A GESTÃO</p><div><h2>Cuidar da sua clínica também<br />é cuidar do que <em>a sustenta.</em></h2><div className="art-intro-text"><p>Uma agenda cheia não conta toda a história. É preciso entender os custos, acompanhar a margem e saber para onde o negócio está indo.</p><p>A Artesanal conecta organização financeira e visão estratégica para que você saia do improviso e encontre mais clareza em cada decisão.</p></div></div></div></section>
      <section className="art-solutions art-container art-section" id="solucoes"><div className="art-section-head"><div><p className="art-eyebrow">O QUE CONSTRUÍMOS COM VOCÊ</p><h2>Estrutura para o presente.<br /><em>Direção para o futuro.</em></h2></div><p>Soluções que partem da sua realidade.<br />Porque nenhuma clínica é igual à outra.</p></div>
        <div className="art-service-list">{artesanal.services.map(service => <article className="art-service" key={service.number}><span className="art-service-number">{service.number}</span><h3>{service.title}</h3><div><p>{service.text}</p><small>{service.items}</small></div><a href={artesanal.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Conversar sobre ${service.title}`} className="art-service-link">↗</a></article>)}</div>
      </section>
      <section className="art-about" id="artesanal"><div className="art-container art-about-grid"><div className="art-founder-card"><span className="art-eyebrow">EXPERIÊNCIA QUE VEM DA PRÁTICA</span><span className="art-founder-initials" aria-hidden="true">Rp.</span><blockquote>“Antes de entregar resultados,<br /><em>eu entrego presença.</em>”</blockquote><span className="art-founder-signature">Rúbia Pinheiro</span><small>À FRENTE DA ARTESANAL</small></div><div className="art-about-copy"><p className="art-eyebrow">QUEM CUIDA DO SEU NEGÓCIO</p><h2>Gestão real.<br />Com experiência,<br /><em>escuta e intenção.</em></h2><p>Sou Rúbia Pinheiro. Minha trajetória passou pelo comercial, pela gestão e pela sociedade em uma clínica. Vivi de perto as decisões, as conquistas e os desafios de quem empreende na saúde.</p><p>Foi dessa experiência que nasceu a minha consultoria: para transformar o que aprendi na prática em direção para outras clínicas.</p><p>Na Artesanal, cada projeto começa pela escuta. Entender a sua história é o primeiro passo para construir uma gestão que faça sentido para você.</p><a href={artesanal.whatsapp} target="_blank" rel="noopener noreferrer" className="art-text-link">Quero conhecer esse olhar <span aria-hidden="true">↗</span></a></div></div></section>
      <ShaderStory />
      <section className="art-process"><div className="art-container art-process-grid"><div><p className="art-eyebrow">DO PRIMEIRO CONTATO À PRÁTICA</p><h2>Um caminho construído<br /><em>ao seu lado.</em></h2><p>Sem fórmulas prontas. Com entendimento,<br />prioridades claras e acompanhamento.</p></div><ol>{[["Conversamos", "Conhecemos o momento da sua clínica, os desafios da rotina e o que você quer construir."], ["Traçamos a direção", "Definimos prioridades e uma proposta de trabalho alinhada às necessidades do negócio."], ["Seguimos juntos", "Organizamos os processos e acompanhamos os resultados para ajustar a rota com consistência."]].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
      <section className="art-faq art-container art-section" id="duvidas"><div><p className="art-eyebrow">PARA COMEÇAR COM CLAREZA</p><h2>Talvez você esteja<br /><em>se perguntando.</em></h2></div><div className="art-faq-list">{artesanal.faq.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>
      <section className="art-contact" id="contato"><div className="art-container"><ArtesanalBrand /><p className="art-eyebrow">O PRÓXIMO CAPÍTULO COMEÇA COM UMA CONVERSA</p><h2>Sua clínica merece crescer<br /><em>sem perder a sua essência.</em></h2><p>Conte para a gente o que você está construindo.<br />Vamos entender, juntos, como cuidar do próximo passo.</p><ContactLink light>Conversar com a Rúbia</ContactLink><span className="art-contact-caption">Uma conversa sobre a sua realidade. Com escuta e atenção.</span></div></section>
    </ArtesanalMotion>
    <JsonLd id="artesanal-structured-data" data={getHomeStructuredData()} />
  </>;
}
