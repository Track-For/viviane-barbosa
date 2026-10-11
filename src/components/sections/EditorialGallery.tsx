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
            Um ambiente que ajuda a conversa a encontrar espaço.
          </SplitHeading>
          <Reveal className="editorial-gallery__intro">
            <p>
              Luz natural, conforto e discrição compõem uma atmosfera visual serena — sem excessos e sem clichês
              clínicos.
            </p>
          </Reveal>
        </div>

        <div className="editorial-gallery__grid">
          <figure className="editorial-gallery__room">
            <ImageReveal mode="vertical">
              <div className="editorial-gallery__frame editorial-gallery__frame--room">
                <Image
                  src={media.support.src}
                  alt={media.support.alt}
                  width={media.support.width}
                  height={media.support.height}
                  sizes="(max-width: 900px) 100vw, 66vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="media-caption">
              <span>Presença e conforto</span>
              <small>Imagem conceitual gerada por IA — substituir por {media.support.replacement}.</small>
            </figcaption>
          </figure>

          <figure className="editorial-gallery__detail">
            <ImageReveal mode="curtain" delay={0.08}>
              <div className="editorial-gallery__frame editorial-gallery__frame--detail">
                <Image
                  src={media.optional.src}
                  alt={media.optional.alt}
                  width={media.optional.width}
                  height={media.optional.height}
                  sizes="(max-width: 900px) 100vw, 38vw"
                />
              </div>
            </ImageReveal>
            <figcaption className="media-caption">
              <span>Tempo para elaborar</span>
              <small>Imagem conceitual gerada por IA — substituir por {media.optional.replacement}.</small>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
