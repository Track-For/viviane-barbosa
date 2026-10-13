import Image from "next/image";

import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { media } from "@/data/media";

export function EditorialGallery() {
  return (
    <section className="section editorial-gallery" aria-labelledby="editorial-gallery-title">
      <div className="site-container">
        <div className="editorial-gallery__header">
          <SplitHeading id="editorial-gallery-title" className="section-title">
            Seu espaço para respirar, elaborar e voltar para si
          </SplitHeading>
          <Reveal className="editorial-gallery__intro">
            <p>
              Mesmo do outro lado do mundo, a conversa pode acontecer em um lugar familiar, com calma, privacidade e
              presença
            </p>
          </Reveal>
        </div>

        <div className="editorial-gallery__grid">
          <figure className="editorial-gallery__item editorial-gallery__item--left">
            <ImageReveal mode="curtain" delay={0.08}>
              <div className="editorial-gallery__frame editorial-gallery__frame--side">
                <Image
                  src={media.optional.src}
                  alt={media.optional.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={media.optional.blurDataURL}
                  sizes="(max-width: 900px) 100vw, 29vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="media-caption editorial-gallery__caption">
              <span>Tempo para elaborar</span>
              <small>Uma pausa para organizar o que sente e encontrar novas palavras.</small>
            </figcaption>
          </figure>

          <figure className="editorial-gallery__item editorial-gallery__item--center">
            <ImageReveal mode="vertical">
              <div className="editorial-gallery__frame editorial-gallery__frame--center">
                <Image
                  src={media.support.src}
                  alt={media.support.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={media.support.blurDataURL}
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="media-caption editorial-gallery__caption">
              <span>Presença e conforto</span>
              <small>Acolhimento em português, com atenção ao seu contexto.</small>
            </figcaption>
          </figure>

          <figure className="editorial-gallery__item editorial-gallery__item--right">
            <ImageReveal mode="vertical" delay={0.14}>
              <div className="editorial-gallery__frame editorial-gallery__frame--side">
                <Image
                  src={media.hero.src}
                  alt={media.hero.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={media.hero.blurDataURL}
                  sizes="(max-width: 900px) 100vw, 29vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="media-caption editorial-gallery__caption">
              <span>Seu espaço, no seu ritmo</span>
              <small>De onde você estiver, a conversa encontra lugar.</small>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
