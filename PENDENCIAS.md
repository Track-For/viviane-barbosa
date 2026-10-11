# Pendências antes da publicação

## Dados reais

Substituir todos os placeholders:

- `[NOME COMPLETO]`
- `[CRP]`
- `[WHATSAPP]`
- `[E-MAIL]`
- `[INSTAGRAM]`
- `[LINK DE AGENDAMENTO]`
- `[PÚBLICO ATENDIDO]`
- `[ABORDAGEM]`
- `[HORÁRIOS]`
- `[FORMAÇÃO]`
- `[FOTO DA PROFISSIONAL]`
- `[VÍDEO 01]`
- `[IMAGEM 02]`
- `[IMAGEM 03]`

## Mídia e marca

- Trocar a imagem provisória do hero por uma foto ou vídeo aprovado e manter fallback otimizado.
- Substituir o retrato conceitual por um retrato profissional com autorização de uso.
- Substituir `[IMAGEM 02]` e `[IMAGEM 03]` por imagens aprovadas para a comunicação do atendimento online, ou aprovar formalmente a permanência das imagens conceituais.
- Confirmar se a assinatura deve usar apenas "Viviane Barbosa" ou o nome profissional completo.

## Conteúdo, jurídico e operação

- Revisar abordagem, público atendido e perguntas frequentes com a profissional.
- Confirmar horários, política de cancelamento e fluxo de agendamento online.
- Validar o texto do aviso de privacidade com responsável jurídico e adequar prazos e base legal à operação real.
- Definir quem recebe e responde as mensagens do WhatsApp.
- Substituir `NEXT_PUBLIC_SITE_URL=https://example.com` pelo domínio final.
- Revisar título, descrição social e imagem Open Graph após aprovação dos assets.

## Validação final

- Testar o número real do WhatsApp e a mensagem pré-preenchida em Android, iOS e desktop.
- Fazer QA em Safari/iOS, Chrome/Android, Firefox e Edge com o domínio de produção.
- Validar desempenho em aparelho móvel intermediário e confirmar se o WebGL deve permanecer ativo nele.
- Rodar teste de acessibilidade automatizado e uma navegação manual apenas por teclado.
- Confirmar contraste após a substituição das mídias.

## Dependências de desenvolvimento

`npm audit --omit=dev` retorna zero vulnerabilidades. A auditoria completa ainda reporta cinco alertas altos em `braces`, dentro da cadeia de ferramentas do `eslint-config-next`. O npm não oferece correção sem alterar de forma incompatível a versão do preset. O pacote não entra no bundle de produção; acompanhar atualização do Next 15 ou migrar para uma linha suportada após autorização.

## Rastreamento

Tracking foi omitido de propósito. Se houver campanha paga, definir ferramenta, consentimento, política de cookies, eventos e governança antes de adicionar qualquer script.
