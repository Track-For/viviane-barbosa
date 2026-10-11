# Viviane Barbosa Psicologia

Site institucional de primeira apresentação para atendimento psicológico online e presencial. A experiência foi desenhada para comunicar acolhimento, clareza e profissionalismo, com conversão direta para conversa no WhatsApp quando o número real for configurado.

## Stack

- Next.js 15 com App Router e TypeScript
- Tailwind CSS v4 e CSS autoral
- GSAP 3, `@gsap/react`, ScrollTrigger, SplitText, Flip e CustomEase
- Lenis para rolagem suave
- Three.js, React Three Fiber, Drei e maath
- React Hook Form e Zod
- Lucide React, `next/image`, `next/font` e `next-view-transitions`

## Executar localmente

Requer Node.js 20 ou superior.

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

Para macOS ou Linux, substitua o segundo comando por:

```bash
cp .env.example .env.local
```

## Comandos

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm audit --omit=dev
```

## Onde editar

| Conteúdo | Arquivo |
| --- | --- |
| Nome, CRP, cidade, bio, formação e links | `src/data/profile.ts` |
| Áreas de foco | `src/data/focusAreas.ts` |
| Modalidades | `src/data/attendance.ts` |
| Etapas do atendimento | `src/data/process.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Slots e descrições de mídia | `src/data/media.ts` |
| Metadados globais | `src/app/layout.tsx` |
| Texto legal provisório | `src/app/privacidade/page.tsx` |
| Tokens visuais e layout | `src/app/globals.css` |

Os dados ainda não confirmados estão marcados entre colchetes. A lista completa está em `PENDENCIAS.md`.

## Mídias

O projeto respeita o limite de quatro slots:

1. Hero: `public/images/consultorio-apoio-paleta.png`, imagem provisória gerada para a apresentação.
2. Retrato: `public/images/retrato-profissional-paleta.png`, exemplo gerado e identificado na seção Sobre.
3. Apoio: `public/images/sessao-acolhimento-paleta.png`, exemplo gerado para a galeria editorial.
4. Opcional: `public/images/detalhe-consultorio-paleta.png`, exemplo gerado para a galeria editorial.

As quatro imagens seguem a paleta aprovada — `#F5F1EB`, `#A8B2A1`, `#A66D56`, `#292C27` e `#FFFFFF` — mas não representam a profissional nem um consultório real. Todas estão identificadas na interface. Para substituí-las, coloque os arquivos aprovados em `public/images`, atualize `src/data/media.ts` e preserve os textos alternativos.

## Formulário e WhatsApp

O formulário valida nome, contato, modalidade, mensagem e consentimento no navegador. Ele não mantém banco de dados e só abre uma mensagem pré-preenchida no WhatsApp quando `[WHATSAPP]` for substituído por um número real com código do país e DDD. Enquanto isso, exibe um aviso verdadeiro em vez de simular envio.

## Variáveis de ambiente

```dotenv
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

Essa URL alimenta metadados, `sitemap.xml`, `robots.txt` e dados estruturados. Não há scripts de rastreamento. Analytics ou pixels devem ser incluídos apenas em uma etapa futura, com consentimento e revisão de privacidade.

## Motion e acessibilidade

- Reveals por linha alternam entrada lateral e vertical.
- Imagens usam faixa vertical ou cortina descendente.
- A seção "Como funciona" transforma rolagem vertical em um trilho horizontal com snap em telas amplas.
- Listas usam um cursor deslizante e troca de conteúdo com glide e blur.
- Os canais sociais recebem glow e um feixe de luz nas interações de ponteiro e teclado.
- Entre 48% e 82% da página, o fundo transita de forma progressiva do off-white para o verde-sálvia, acompanhando o scroll com amortecimento.
- O hero tem distorção WebGL sutil e fallback estático com `next/image`.
- `prefers-reduced-motion` remove rolagem suave, WebGL animado e timelines dependentes de movimento.
- Navegação, acordeão e formulário são operáveis por teclado, com foco visível.

## Publicação

1. Preencha todos os placeholders.
2. Configure `NEXT_PUBLIC_SITE_URL` no provedor.
3. Rode `npm run build`, `npm run lint`, `npm run typecheck` e `npm audit --omit=dev`.
4. Faça uma revisão legal do aviso de privacidade.
5. Publique em um provedor compatível com Next.js 15, como Vercel ou infraestrutura Node.js.

Consulte também `DECISOES.md`, `PENDENCIAS.md` e `RELATORIO.md`.
