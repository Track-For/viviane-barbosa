# Artesanal — Soluções Médicas

A experiência ativa usa `src/app/artesanal.css`, a página `src/app/page.tsx` e os componentes `ArtesanalHeader`, `ArtesanalBrand` e `ArtesanalFooter`.

## Conteúdo e contato

- Serviços, perguntas e links: `src/data/artesanal.ts`.
- WhatsApp configurado com o número fornecido na conversa: +55 48 9630-7874.
- Instagram: @artesanalmed, conforme os materiais fornecidos.
- Identidade: marrom, areia, marfim e dourado discreto.
- Imagem de ambientação gerada para a marca, ilustrativa; não representa um escritório real.
- Símbolo vetorial provisório baseado na referência visual enviada. Substituir pelo arquivo oficial quando disponível.

## Para a versão final

- Receber a fotografia original de Rúbia e o logo oficial em alta qualidade. A seção da fundadora usa uma composição tipográfica enquanto isso.
- Definir `NEXT_PUBLIC_SITE_URL` com o domínio de produção antes de publicar.
- Validar com Rúbia o escopo comercial dos serviços e os canais de contato.

Os arquivos legados de seções, dados e imagens da cópia original não são importados pela nova página. As alterações preexistentes em `globals.css` e `Process.tsx` foram preservadas.

## Movimento recuperado da versão anterior

- `SmoothScroll`: Lenis sincronizado com o ticker GSAP e ScrollTrigger.
- `ArtesanalMotion`: máscaras de linhas, leitura progressiva, parallax, movimento magnético, inclinação e halo do cursor.
- `ArtesanalHeroImage`: reutiliza `ImageReveal` e `DisplacementImage` com imagem estática de fallback.
- `ShaderStory` e `CardRiseShader`: sequência de rolagem com preenchimento do fundo, cartões em rotação e reflexos WebGL, agora com os valores da Artesanal e paleta quente.
- `Preloader`, `ScrollProgress`, `Grain` e `CinematicMarquee`: abertura da marca, progresso, textura e faixa com controle de pausa.
- `artesanal-motion.css`: estilos dos efeitos, sem reativar o layout da antiga marca.
- Movimento reduzido respeitado; telas baixas mantêm a seção de valores em fluxo natural para evitar corte de conteúdo.

A conferência visual das animações no navegador continua pendente: nenhum navegador estava conectado à ferramenta de revisão nesta sessão.
