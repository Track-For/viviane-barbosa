# Relatório de entrega

## Resultado

Foi construída uma primeira versão completa do site institucional de Viviane Barbosa, em branch dedicada, com foco em clareza, confiança e conversão. A implementação usa placeholders transparentes para tudo o que depende de confirmação da profissional.

## Seções entregues

- Header fixo com navegação desktop e móvel
- Hero com proposta direta, dois CTAs e imagem WebGL com fallback
- Faixa de clareza com modalidade, localização e público
- Sobre e retrato reservado
- Áreas de foco sem inventar especialidades
- Modalidades online e presencial
- Abordagem e princípios de atendimento
- Processo em três etapas com narrativa responsiva
- Perguntas frequentes em acordeão acessível
- Formulário validado e integração preparada para WhatsApp
- CTA final, footer e botão flutuante
- Página de privacidade, sitemap, robots e dados estruturados

## Sistema visual e motion

- Paleta profissional em pesos 70/30/10: mineral, verde e terracota
- Layout editorial assimétrico com tipografia de alta legibilidade
- Títulos com reveals direcionais alternados por linha
- Imagem principal com faixa vertical e imagem secundária com cortina descendente
- Botões sociais com glow, feixe de luz e estados equivalentes para foco por teclado
- Listas com cursor deslizante e troca direcional com blur
- Seção de processo em rolagem horizontal com pinning, scrub e snap
- Mudança cromática global ao atingir 65% da rolagem
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
| Trilha horizontal desktop | Aprovado, deslocamento validado em 1.352 px |
| Fallback vertical móvel | Aprovado em 500 x 980 |
| Mudança de fundo em 65% | Aprovado, com retorno ao subir |
| Hover e foco das redes sociais | Aprovado |

Na compilação final da etapa visual, a página inicial resultou em 43,7 kB de código específico e 211 kB de carregamento inicial total. As rotas `/`, `/privacidade`, `/robots.txt` e `/sitemap.xml` foram pré-renderizadas.

## Observações de QA

- O hero mantém leitura clara e CTAs visíveis em desktop e móvel.
- A imagem continua visível quando o canvas falha ou o usuário reduz movimento.
- O formulário não envia para um endereço fictício.
- Os placeholders permanecem visíveis para impedir publicação acidental de informações inventadas.
- Pendências externas e de conteúdo estão reunidas em `PENDENCIAS.md`.
