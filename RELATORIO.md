# Relatório de entrega

## Resultado

Foi construída uma primeira versão completa do site institucional de Viviane Barbosa, em branch dedicada, com foco em clareza, confiança e conversão. A implementação usa placeholders transparentes para tudo o que depende de confirmação da profissional.

## Seções entregues

- Header fixo com navegação desktop e móvel
- Hero com proposta direta, dois CTAs e imagem WebGL com fallback
- Faixa de clareza com modalidade, localização e público
- Sobre com retrato conceitual identificado
- Áreas de foco baseadas na bio oficial e Mentoria de Comunicação apresentada como serviço distinto
- Modalidades online e presencial
- Galeria editorial com duas imagens conceituais de ambiente e detalhe
- Abordagem e princípios de atendimento
- Processo em três etapas com narrativa responsiva
- Perguntas frequentes em acordeão acessível
- Formulário validado e integração preparada para WhatsApp
- CTA final, footer e botão flutuante
- Página de privacidade, sitemap, robots e dados estruturados

## Sistema visual e motion

- Paleta aprovada em 70/20/10: off-white `#F5F1EB`, verde-sálvia `#A8B2A1` e terracota `#A66D56`, com grafite `#292C27` e branco `#FFFFFF` como apoio
- Layout editorial assimétrico com tipografia de alta legibilidade
- Escala tipográfica mais contida nos títulos, chamadas, navegação e botões, conforme preferência da profissional
- Header flutuante em Liquid Glass sutil, com desfoque moderado, borda suave e reflexo direcional de baixa intensidade
- Profundidade cinematográfica no hero, nas imagens editoriais e no CTA final por meio de luz, vinheta, moldura dupla e sombras em camadas
- Títulos com reveals direcionais alternados por linha
- Imagem principal com faixa vertical e imagem secundária com cortina descendente
- Reveals com placeholders borrados embutidos e assets WebP otimizados, mantendo imagem e moldura visíveis como uma peça única
- Botões sociais com glow, feixe de luz e estados equivalentes para foco por teclado
- Listas com cursor deslizante e troca direcional com blur
- Seção de processo em rolagem horizontal com pinning, scrub e snap
- Mudança cromática global progressiva entre 48% e 82% da rolagem
- Rolagem Lenis, ScrollTrigger, SplitText, CustomEase e transições de página
- Fundo fluido e distorção WebGL sutis, com limites de DPR e fallback estático
- Modo reduzido de movimento e redução de transparência respeitados

## Engenharia

- Next.js 15.5.27, App Router, TypeScript e Tailwind CSS v4
- Conteúdo de negócio centralizado em `src/data`
- Componentes separados por layout, seção, UI e WebGL
- Validação com React Hook Form + Zod
- Fontes otimizadas por `next/font`
- Imagem otimizada por `next/image`
- Metadados, Open Graph, sitemap, robots e JSON-LD
- Nenhum rastreamento ou armazenamento de dados pessoais

## Validações executadas

Em 11 de outubro de 2026:

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado, 5 rotas estáticas geradas |
| `npm run lint` | Aprovado, sem erros ou avisos |
| `npm run typecheck` | Aprovado |
| `npm audit --omit=dev` | Aprovado, zero vulnerabilidades |
| `git diff --check` | Aprovado |
| Visual desktop 1440 x 1000 | Aprovado |
| Visual móvel 500 x 980 | Aprovado |
| Movimento reduzido e fallback estático | Aprovado |
| Navegação interna com Lenis | Aprovado em build de produção |
| Trilha horizontal desktop | Aprovado, com cards limitados a 42 rem de largura e 24 rem de altura |
| Fallback vertical móvel | Aprovado em 500 x 980 |
| Mudança de fundo progressiva | Aprovado em build, com scrub entre 48% e 82% e retorno ao subir |
| Hover e foco das redes sociais | Aprovado |

Na compilação final da etapa visual, a página inicial resultou em 49,3 kB de código específico e 216 kB de carregamento inicial total. As rotas `/`, `/privacidade`, `/robots.txt` e `/sitemap.xml` foram pré-renderizadas.

## Observações de QA

- O hero mantém leitura clara e CTAs visíveis em desktop e móvel.
- O Liquid Glass preserva contraste no desktop e se mantém compacto com menu morfável no layout móvel.
- As novas molduras e sombras não alteram as dimensões compactas dos cartões do processo.
- A imagem continua visível quando o canvas falha ou o usuário reduz movimento.
- O formulário não envia para um endereço fictício.
- Os placeholders permanecem visíveis para impedir publicação acidental de informações inventadas.
- Pendências externas e de conteúdo estão reunidas em `PENDENCIAS.md`.
