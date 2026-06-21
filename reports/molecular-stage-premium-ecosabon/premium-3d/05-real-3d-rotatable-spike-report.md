# Relatório do Spike Técnico — Premium 3D Real Rotacionável

Este relatório documenta a Prova de Conceito (Spike) de renderização tridimensional real e interativa contida na pasta `experiments/premium-3d-real-rotatable-spike/`.

---

## 1. Objetivo do Spike
Avaliar na prática a viabilidade de uma visualização didática 3D real com rotação livre por órbita de mouse/teclado, profundidade espacial e pontos de vista pré-definidos para a saponificação do **EcoSabon**.

## 2. Tecnologias Utilizadas e Justificativa
*   **Three.js procedural autoral (v0.160.0):** Escolhida por permitir a criação de geometrias moleculares procedurais (esferas e cilindros geométricos simples) e controle completo da câmera.
*   **Vite:** Utilizado como ferramenta de build local para o experimento.
*   **Rejeição de Alternativas:**
    *   *Unity WebGL:* Rejeitado devido ao peso proibitivo (>15MB) e incompatibilidade com computadores escolares.
    *   *Sketchfab Embed:* Rejeitado por depender de conexão ativa com a internet, violando o requisito 100% offline.

## 3. Arquitetura do Experimento e Arquivos Criados
O experimento foi estruturado de forma isolada na pasta `experiments/premium-3d-real-rotatable-spike/`:
*   `package.json`: Declara a dependência local `three` de forma isolada.
*   `index.html`: Elementos do visualizador, botões e fallback textual.
*   `src/styles.css`: Estilos modernos de interface e regras de mídia `print`.
*   `src/molecule-scene.js`: Setup da cena, renderizador, luzes, materiais, geometria molecular procedural e rotação por arrasto de mouse.
*   `src/main.js`: Vinculação de eventos de botões e anúncios ARIA.

## 4. Funcionamento da Rotação e Controles
*   **Rotação Livre:** Interação de arrasto (drag) com o mouse ou scroll (wheel) para zoom moderado.
*   **Controles Rápidos (Botões):** Botões na interface para alternar imediatamente para:
    *   *Visão Frontal:* [0, 0, 12]
    *   *Visão Lateral:* [12, 0, 0]
    *   *Visão Superior:* [0, 12, 0]
    *   *Perspectiva:* [8, 6, 9] (Perspectiva inicial por padrão).
    *   *Reset:* Restaura a câmera.

## 5. Limitações e Acessibilidade
*   **WebGL Fallback:** Caso o navegador ou dispositivo não suporte WebGL, o contêiner exibe uma mensagem amigável sem quebrar o restante da página.
*   **Acessibilidade (Leitores de Tela):** O Canvas WebGL é marcado como `aria-hidden="true"` para evitar ruído. Em contrapartida, as atualizações de ponto de vista geram anúncios imediatos via região `aria-status` com `aria-live="polite"`.
*   **Texto Equivalente:** Um painel textual fixo detalha didaticamente a cena molecular e exibe a legenda dos elementos geométricos.

## 6. Impressão (Mídia Print)
A folha de estilos `src/styles.css` oculta os botões e o Canvas WebGL na impressão, exibindo linearmente todo o fallback textual e as legendas moleculares correspondentes no papel/PDF.

## 7. Performance e Peso
*   **Tamanho em Disco:** 80KB (excluindo a pasta `node_modules`).
*   **Tamanho do Bundle Build:** Arquivo JS final de ~462KB (incluindo Three.js empacotado localmente).
*   **Desempenho:** Renderização de baixíssima complexidade geométrica, rodando a 60 FPS estáveis mesmo em CPUs modestas.

## 8. Comparação com Soluções Anteriores
*   **B1+B2 (Baseline de Produção):** Foco em etapas didáticas (tempo) sequenciadas por CSS qualitativo leve. Muito seguro e de manutenção nula.
*   **Pseudo-3D (Spike Anterior):** Rotação discreta simulada por troca de SVG. Atua como **fallback leve**.
*   **Premium 3D Real (Spike Atual):** Interação tridimensional livre com câmera. Agrega altíssimo valor estético e comercial, mas apresenta risco tecnológico moderado e maior esforço de desenvolvimento.

## 9. Recomendação Técnica
**Manter como Portfólio Isolado:** O experimento deve permanecer restrito à pasta `experiments/` para fins comerciais. Não recomendamos a integração imediata do 3D real no e-book principal até que haja demanda contratual específica e aprovação de orçamento dedicado.

---
*Relatório técnico de viabilidade e ensaio experimental concluído.*
