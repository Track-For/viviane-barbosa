import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { profile, profileLinks } from "@/data/profile";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Aviso de privacidade do site de Viviane Barbosa.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <article className="site-container legal-content">
        <p className="section-label">Aviso de privacidade</p>
        <h1>Como seus dados são tratados neste site.</h1>
        <p className="legal-intro">
          Este texto é uma minuta para a primeira versão e deve ser revisado antes da publicação definitiva.
        </p>

        <section>
          <h2>Dados informados por você</h2>
          <p>
            O formulário solicita nome, meio de contato, preferência de modalidade e uma mensagem opcional. Não é
            necessário informar detalhes clínicos ou dados sensíveis para pedir um retorno.
          </p>
        </section>

        <section>
          <h2>Finalidade</h2>
          <p>
            Os dados são usados somente para responder ao pedido de contato e organizar informações iniciais sobre o
            atendimento.
          </p>
        </section>

        <section>
          <h2>Envio da mensagem</h2>
          <p>
            Na versão atual, o site não mantém uma base própria para o formulário. Após a configuração de [WHATSAPP],
            a mensagem é preparada no seu dispositivo e aberta no serviço de comunicação escolhido por você.
          </p>
        </section>

        <section>
          <h2>Rastreamento</h2>
          <p>
            Esta versão não utiliza Google Analytics, Meta Pixel, Hotjar ou outros scripts de rastreamento de
            terceiros.
          </p>
        </section>

        <section>
          <h2>Contato</h2>
          <p>
            Responsável: {profile.fullName}, {profile.crp}. Para dúvidas sobre privacidade, escreva para {profileLinks.email}.
          </p>
        </section>

        <Link className="legal-back" href="/">
          Voltar para o site
        </Link>
      </article>
    </main>
  );
}
