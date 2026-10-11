import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { media } from "@/data/media";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="sobre" className="section about-section">
      <div className="site-container about-grid">
        <div className="about-heading">
          <SplitHeading className="section-title">
            A escuta começa quando você se sente à vontade.
          </SplitHeading>
        </div>

        <Reveal className="about-portrait">
          <MediaPlaceholder label={media.portrait.label} alt={media.portrait.alt} />
        </Reveal>

        <Reveal className="about-copy" delay={0.08}>
          <p className="about-copy__lead">
            Psicoterapia é um espaço de conversa cuidadosa, construído com respeito à sua história e ao seu tempo.
          </p>
          <p>{profile.bio}</p>
          <dl className="profile-facts">
            <div>
              <dt>Profissional</dt>
              <dd>{profile.fullName}</dd>
            </div>
            <div>
              <dt>Registro</dt>
              <dd>{profile.crp}</dd>
            </div>
            <div>
              <dt>Formação</dt>
              <dd>{profile.education}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
