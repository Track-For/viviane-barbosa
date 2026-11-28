import Image from "next/image";

import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { media } from "@/data/media";
import { profile } from "@/data/profile";
import { getConfiguredValue } from "@/lib/content";

export function About() {
  const facts = [
    { label: "Profissional", value: getConfiguredValue(profile.fullName) ?? profile.displayName },
    { label: "Registro", value: getConfiguredValue(profile.crp) },
    { label: "Formação", value: getConfiguredValue(profile.education) },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <section id="sobre" className="section about-section">
      <div className="site-container about-grid">
        <div className="about-heading">
          <SplitHeading className="section-title">
            {profile.displayName}
          </SplitHeading>
        </div>

        <div className="about-portrait">
          <figure className="about-portrait__figure">
            <ImageReveal mode="curtain">
              <div className="about-portrait__image">
                <Image
                  src={media.portrait.src}
                  alt={media.portrait.alt}
                  width={media.portrait.width}
                  height={media.portrait.height}
                  placeholder="blur"
                  blurDataURL={media.portrait.blurDataURL}
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="media-caption">
              <span>Viviane Barbosa</span>
              <small>Psicóloga</small>
            </figcaption>
          </figure>
        </div>

        <Reveal className="about-copy" delay={0.08}>
          <h3 className="about-copy__lead">Quem sou</h3>
          <p>{profile.bio}</p>
          <h3>A dor que resolvo</h3>
          <p>
            Morar fora pode trazer conquistas e oportunidades, mas também solidão, ansiedade, conflitos internos,
            dificuldade de pertencimento e a sensação de precisar ser forte o tempo todo, mesmo quando
            emocionalmente você não está bem.
          </p>
          <h3>Como eu te ajudo</h3>
          <p>
            Ajudo você a compreender e acolher suas emoções, fortalecer sua identidade e construir uma relação
            mais saudável consigo mesmo, para que possa viver sua experiência em outro país com mais segurança
            emocional, autonomia e pertencimento.
          </p>
          <dl className="profile-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
