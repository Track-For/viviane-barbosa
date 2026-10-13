import { faqItems } from "@/data/faq";
import { profile } from "@/data/profile";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const faq = faqItems.map((item) => `### ${item.question}\n${item.answer}`).join("\n\n");
  const content = `# ${siteConfig.alternateName}

> ${siteConfig.description}

## Página oficial
- Site: ${getAbsoluteUrl("/")}
- Contato: ${getAbsoluteUrl("/#contato")}
- Idioma: português do Brasil (pt-BR)
- Modalidade: atendimento online

## Profissional
${profile.displayName} é psicóloga e atende em português. O trabalho é direcionado principalmente a brasileiras que vivem fora do país e a mulheres empreendedoras.

## Serviços

### Psicoterapia online para brasileiras no exterior
Acompanhamento para questões como solidão, crises de ansiedade, dificuldade de pertencimento, exaustão, burnout e o desgaste de sustentar uma persona para conseguir trabalhar e se adaptar.

### Mentoria de comunicação para mulheres empreendedoras
Mentoria voltada a posicionamento, comunicação, liderança de pessoas e vendas, sem exigir que a profissional abandone a própria identidade para performar uma persona.

## Forma de atendimento
Os encontros são online, em português, com horário combinado de acordo com a disponibilidade e o fuso da cliente. Valores e horários são informados no primeiro contato.

## Perguntas frequentes
${faq}

## Escopo e contato
O conteúdo do site é informativo e não substitui avaliação profissional ou atendimento de urgência. Para saber se psicoterapia ou mentoria é a opção adequada, use o canal oficial de contato: ${getAbsoluteUrl("/#contato")}.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
