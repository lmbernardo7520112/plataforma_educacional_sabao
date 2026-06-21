# Registro de Decisão de Arquitetura (ADR) — Spike do Premium 3D Rotacionável

*   **Status:** Aprovado (Temporário para Spike)
*   **Data:** 2026-06-21

---

## 1. Contexto
Com a homologação e merge da Fase B1+B2, o Palco Molecular possui uma visualização pedagógica e sequenciada por etapas qualitativas que atende a todos os requisitos didáticos e de acessibilidade. No entanto, para fins comerciais e de posicionamento de portfólio premium, investiga-se a viabilidade de uma futura camada de visualização tridimensional rotacionável.

## 2. Problema
Motores 3D reais (WebGL, Three.js, Canvas e motores de jogos) trazem alta complexidade, dependências pesadas, riscos de acessibilidade para leitores de tela e são inadequados para impressão física. Além disso, a execução deve permanecer estritamente offline e compatível com dispositivos de baixo desempenho encontrados em escolas públicas. O objetivo é testar uma Prova de Conceito (Spike) de rotação que minimize esses riscos.

## 3. Opções Avaliadas
*   **Opção A (Rejeitada para Spike):** Uso de motor 3D com Three.js ou `<model-viewer>`. Apresenta alto risco de dependência de CDN, quebra de acessibilidade e peso crítico.
*   **Opção B (Escolhida para Spike):** Rotação qualitativa discreta multiângulo utilizando **SVG/CSS 2.5D alternativo** com frames estáticos autorais estruturados.
*   **Opção C (Rejeitada para Spike):** Integração direta no e-book. Fere a governança de preservação do produto de produção estável.

## 4. Decisão Temporária para o Spike
Escolhemos a **Opção B**: construir um protótipo experimental de rotação qualitativa multiângulo discreta (simulando 4 ângulos de visualização didática: 0°, 90°, 180° e 270°) utilizando SVG puro e alternância de classes CSS.

### Motivos da Escolha:
*   **Zero dependências:** Sem acréscimo de pacotes no `package.json`.
*   **Execução 100% Offline:** Não requer CDNs ou APIs de internet.
*   **Segurança Legal:** Baseado inteiramente em representações geométricas autorais, sem cópia de assets de terceiros.
*   **Acessibilidade Nativa:** Preserva a capacidade de ler a etapa ativa e a perspectiva selecionada por leitores de tela via ARIA.
*   **Preservação:** Isolado na pasta `experiments/` para não poluir ou arriscar o e-book principal de produção.

## 5. Riscos Aceitos e Rejeitados
*   **Aceito:** Rotação simulada discreta (não contínua/livre) para fins didáticos.
*   **Rejeitado:** Rotação WebGL direta no spike inicial, devido ao risco de incompatibilidade em computadores escolares antigos e Canvas vazio na impressão.

## 6. Condições para Avançar de Spike para Produto
Para que este protótipo avance para uma funcionalidade real integrada no EcoSabon, devem ser cumpridos:
1.  Contrato comercial específico e precificação dedicada proporcional à complexidade.
2.  Aprovação prévia do cliente/docente sobre a utilidade pedagógica de mudar ângulos da reação.
3.  Desenvolvimento prévio de TDD de acessibilidade para garantir conformidade legal com WCAG.

---
*Decisão documentada sob a governança da Fase C0.*
