import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Privacidade", description: "Aviso de privacidade do site da Artesanal — Soluções Médicas.", alternates: { canonical: "/privacidade" }, robots: { index: false, follow: true } };
export default function PrivacyPage() {
  return <main id="conteudo" className="art-legal"><p className="art-eyebrow">ARTESANAL · SOLUÇÕES MÉDICAS</p><h1>A sua privacidade<br />também merece cuidado.</h1>
    <section><h2>Contato pelo site</h2><p>Este site apresenta os serviços da Artesanal e oferece links para contato pelo WhatsApp e pelo Instagram. Não há formulário de cadastro nem base de contatos mantida pelo site.</p></section>
    <section><h2>Informações que você compartilha</h2><p>Ao iniciar uma conversa, as informações enviadas por você serão usadas para responder à solicitação e compreender as necessidades da sua clínica. Para esse primeiro contato, não envie dados de pacientes nem informações sensíveis.</p></section>
    <section><h2>Serviços externos</h2><p>Quando você acessa o WhatsApp ou o Instagram, passa a utilizar serviços externos, sujeitos às políticas de privacidade dessas plataformas. A mensagem sugerida pelo site só é enviada quando você confirma o envio no WhatsApp.</p></section>
    <section><h2>Navegação</h2><p>Esta versão do site não utiliza ferramentas de publicidade ou análise de comportamento, como Meta Pixel e Google Analytics. O provedor de hospedagem pode processar registros técnicos de acesso para disponibilizar e proteger o site.</p></section>
    <section><h2>Dúvidas e solicitações</h2><p>Para falar sobre o uso das informações compartilhadas, entre em contato com Rúbia Pinheiro, responsável pela Artesanal, pelo WhatsApp indicado no site.</p></section>
    <Link className="art-text-link" href="/">Voltar para a Artesanal ↗</Link>
  </main>;
}
