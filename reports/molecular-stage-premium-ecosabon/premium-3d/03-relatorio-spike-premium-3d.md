# Relatório do Spike Técnico — Premium 3D Rotacionável

Este relatório documenta os resultados e aprendizados obtidos com o Spike Técnico experimental contido na pasta `experiments/premium-3d-rotatable-spike/`.

---

## 1. Objetivo do Spike
Avaliar na prática a viabilidade de uma visualização didática rotacionável discreta por ângulos vetoriais, simulando a tridimensionalidade por manipulação de SVG/CSS, de modo a garantir 100% de funcionamento offline, ausência de dependências de terceiros e total conformidade com acessibilidade.

## 2. Alternativa Técnica Testada
**Projeção Qualitativa Multiângulo via SVG/CSS:**
Desenvolvimento de uma Prova de Conceito que projeta graficamente a reação química em quatro perspectivas discretas (0°, 90°, 180° e 270°), alternadas por botões interativos e animadas por propriedades CSS de transição (`opacity` e `transform`).

## 3. Arquivos Criados
*   [experiments/premium-3d-rotatable-spike/index.html](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/experiments/premium-3d-rotatable-spike/index.html): Estrutura HTML do visualizador e grupos SVG das projeções.
*   [experiments/premium-3d-rotatable-spike/styles.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/experiments/premium-3d-rotatable-spike/styles.css): Estilos de glassmorphism, tipografia moderna e regras de transição.
*   [experiments/premium-3d-rotatable-spike/spike.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/experiments/premium-3d-rotatable-spike/spike.js): Lógica de rotação discreta e atualização de textos explicativos.
*   [experiments/premium-3d-rotatable-spike/README.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/experiments/premium-3d-rotatable-spike/README.md): Instruções de execução e avisos de escopo.

## 4. Funcionamento e Limitações
*   **Funcionamento:** Ao clicar em "Girar Direita" ou "Girar Esquerda", a classe ou atributo de estado `data-angle` é modificado. O CSS ativa a perspectiva correspondente do SVG por transições fluidas de opacidade e translação.
*   **Limitações:** Não é uma rotação contínua (3D real livre por mouse orbit). Trata-se de uma simulação didática baseada em 4 ângulos discretos pré-definidos.

## 5. Peso do Pacote e Dependências
*   **Peso Aproximado:** Menos de 15KB totais (código puro leve).
*   **Dependências:** Nenhuma (zero dependências adicionais).

## 6. Acessibilidade, Impressão e Suporte Offline
*   **Acessibilidade:** Perfeita. Por se basear em elementos HTML/SVG padrão, o leitor de tela consegue interagir e ler o atributo de live-region (`aria-live="polite"`) que narra o ângulo ativo e o conteúdo da perspectiva.
*   **Impressão:** O layout imprime a perspectiva atualmente visível e a descrição do ângulo, podendo ser facilmente acoplado ao CSS de impressão linear didático do e-book.
*   **Offline:** 100% autônomo e portátil, sem necessidade de conexão.

## 7. Análise de Riscos
*   **Risco Jurídico:** Nulo (código e vetores 100% autorais e geométricos).
*   **Risco Pedagógico:** Baixo (avisos explícitos informam tratar-se de modelo demonstrativo qualitativo).
*   **Risco de Manutenção:** Muito baixo devido à simplicidade da arquitetura de troca de classes.

## 8. Comparação com B1+B2
A versão B1+B2 apresenta as etapas da reação quimicamente sequenciadas. Este spike demonstra que a mudança de ângulo (perspectiva didática) pode coexistir com a divisão por etapas temporais no futuro, caso contratado separadamente.

## 9. Recomendação
**Reformular e Pausar:** Recomenda-se pausar qualquer desenvolvimento técnico de 3D no momento e manter o spike apenas como prova de conceito local. Caso o cliente solicite formalmente a visualização 3D, a técnica testada (imagens multiângulo estáticas ou SVG 2.5D discreto) é a mais segura e recomendada para preservar as diretrizes do EcoSabon.

---
*Relatório de viabilidade e resultados concluído.*
