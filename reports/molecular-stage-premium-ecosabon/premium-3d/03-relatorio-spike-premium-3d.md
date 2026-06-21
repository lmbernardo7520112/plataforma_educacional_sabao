# Relatório do Spike Técnico — Pseudo-3D Multiângulo (Fallback Leve)

Este relatório analisa a Prova de Conceito baseada em pseudo-3D vetorial (SVG/CSS), reclassificada nesta data como **fallback leve**, e fundamenta a necessidade de transição para o spike de 3D real.

---

## 1. Contexto e Classificação
A prova técnica de multiângulo por troca de classes CSS (contida na pasta `experiments/premium-3d-rotatable-spike/`) simula perspectivas de rotação (0°, 90°, 180° e 270°) sobre desenhos vetoriais bidimensionais.
*   **Classificação:** Este mecanismo atua exclusivamente como **fallback leve** de altíssima acessibilidade e portabilidade.
*   **Limitação Crítica:** Por não permitir a rotação contínua livre (câmera orbital tridimensional), ela não satisfaz a ambição final de uma camada Premium 3D rotacionável.

## 2. Redirecionamento da Investigação
Para verificar se um visualizador com profundidade espacial real e interação de câmera livre é viável para o e-book, iniciamos um segundo experimento de rotação 3D real baseado em **Three.js procedural** isolado, detalhado nos relatórios subsequentes.

## 3. Preservação
Ambos os spikes (pseudo-3D e 3D real) são mantidos estritamente na pasta `experiments/` e não são importados pelo e-book principal, mantendo o produto estável e a versão B1+B2 100% preservada como baseline de produção.

---
*Relatório atualizado em conformidade com as novas diretrizes da Fase C0.*
