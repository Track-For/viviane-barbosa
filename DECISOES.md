# Decisões de projeto

## Conteúdo e ética

- Nenhuma especialidade, formação, certificação, tempo de experiência, depoimento ou promessa de resultado foi inventada. As áreas de foco e a Mentoria de Comunicação foram derivadas apenas da bio oficial fornecida.
- Dados não fornecidos permanecem em placeholders explícitos e centralizados.
- A mensagem evita linguagem diagnóstica e promessas de cura. O primeiro contato pede apenas dados operacionais.
- A página de privacidade é um rascunho identificado e precisa de revisão jurídica antes da publicação.

## Direção visual

- Direção escolhida: editorial calma, contemporânea e institucional, com assimetria controlada e bastante espaço negativo.
- Tipografia: Manrope para leitura e DM Mono apenas em microtextos funcionais.
- A escala tipográfica foi reduzida, sobretudo em títulos e chamadas, para refletir a preferência da profissional por letras menores sem comprometer a leitura dos textos corridos.
- O ritmo vertical entre seções foi compactado para evitar grandes áreas vazias, preservando respiro editorial e leitura clara em desktop e mobile.
- A proporção aprovada é 70/20/10: off-white `#F5F1EB` domina as superfícies, verde-sálvia `#A8B2A1` estrutura blocos de apoio e terracota `#A66D56` marca detalhes e estados. Grafite `#292C27` e branco `#FFFFFF` cumprem funções de contraste, cartões, glass e formulários.
- A identidade permanece clara independentemente da preferência de cor do sistema para preservar a proporção e os valores exatos aprovados.
- O acabamento cinematográfico usa luz radial, vinhetas, molduras duplas e profundidade em sombras sem introduzir novas cores nem reduzir a legibilidade clínica.
- O header é a única superfície principal com Liquid Glass real: ilha flutuante de baixa opacidade, desfoque moderado, brilho interno e reflexo direcional discreto. Cartões no fluxo mantêm translucidez sem `backdrop-filter` para reduzir custo de composição durante a rolagem.
- Não foi criado cursor personalizado. A decisão preserva previsibilidade, acessibilidade e o tom profissional da psicologia.

## Movimento

- Títulos de seção são divididos por linha com SplitText. Linhas ímpares entram da direita; linhas pares sobem de baixo para cima.
- O hero revela a imagem por uma faixa vertical. O retrato usa uma cortina descendente.
- Cada reveal começa com um placeholder borrado embutido e troca para o asset final sem quadro vazio; as imagens de apresentação também usam versões WebP muito menores.
- O movimento usa `transform`, `opacity` e `clip-path`, com disparos únicos e durações moderadas.
- Lenis é sincronizado ao ticker do GSAP e ao ScrollTrigger. Links internos passam pela mesma instância de rolagem.
- A narrativa "Como funciona" usa pinning apenas em telas amplas. Em telas menores e com movimento reduzido, vira uma sequência linear.
- O pinning conduz três cartões na horizontal, com snap por etapa para produzir a cadência curta solicitada sem imitar a interface de uma rede social.
- O padrão do menu de referência foi traduzido para listas editoriais: indicador que desliza entre linhas e conteúdo que troca com deslocamento e blur. A estrutura de menu aninhado não foi copiada por não corresponder ao conteúdo clínico.
- Os canais de contato no rodapé usam glow, feixe e elevação com a paleta do projeto, em vez das cores comerciais de cada rede.
- O reflexo do header e o ícone do menu usam apenas `transform` e `opacity`; o hambúrguer se converte em fechar sem trocar abruptamente de ícone.
- A mudança cromática deixou de ser um gatilho pontual: as variáveis de superfície interpolam continuamente entre 48% e 82% do scroll, com `scrub` amortecido de 1,6 s e retorno progressivo ao subir.
- Preloader, progresso de página e transições foram mantidos discretos para não competir com o conteúdo.

## WebGL e mídia

- O plano fluido e a distorção da imagem foram adaptados dos padrões conceituais da biblioteca local `trackfor-motion-library`, com velocidade e intensidade reduzidas.
- A imagem principal sempre existe em `next/image`, com placeholder borrado; o canvas é uma camada progressiva e carrega o mesmo WebP otimizado. Falha de WebGL não remove o conteúdo.
- O DPR do canvas é limitado e o contexto solicita baixo consumo de energia.
- As quatro imagens foram geradas para a apresentação e são provisórias. Retrato, ambiente e detalhe aparecem explicitamente identificados como conceituais e devem ser substituídos por assets autorizados.
- Não foram adicionadas mídias decorativas além do limite definido na missão.

## Arquitetura e segurança

- Next.js foi fixado em `15.5.27` para cumprir a stack solicitada. A versão inicialmente criada pelo ambiente era 16 e foi rebaixada antes da implementação.
- O pacote Next 15 instalado não inclui o diretório local `node_modules/next/dist/docs`. As APIs usadas foram verificadas contra a documentação oficial da linha 15 e a compilação de produção.
- Um override fixa PostCSS em `8.5.29`, mantendo Next 15 e eliminando vulnerabilidades nas dependências de produção.
- O formulário não persiste dados nem declara envio concluído. Com o WhatsApp ausente, informa exatamente o que falta.
- Sitemap, robots, Open Graph e JSON-LD usam `NEXT_PUBLIC_SITE_URL`, com `https://example.com` apenas como fallback explícito de desenvolvimento.
- Nenhum GTM, GA4, pixel, Hotjar ou script de rastreamento foi incluído.

## Referência da biblioteca local

Foram adaptados, sem cópia visual direta:

- sincronização Lenis + GSAP;
- revela editorial por linhas e máscaras;
- imagem com shader e fallback estático;
- narrativa fixada por ScrollTrigger;
- barra de progresso e tratamento de movimento reduzido.

Efeitos mais chamativos da biblioteca, como cursor customizado, trilha de imagens e grandes seções horizontais, foram descartados por não servirem à clareza do atendimento.
