# Decisão Formal de GO/NO-GO — Spike Premium 3D Real (Fase C1)

Este documento consolida as deliberações oficiais de governança do projeto **EcoSabon** a partir da auditoria técnica e pedagógica realizada na Fase C1.

---

## 1. Veredito e Decisões Formais

Fica estabelecido sob estrita governança do projeto que:

*   **Destino do Spike Técnico:**
    `GO para manter o spike 3D real como ativo experimental e evidência técnica.`
    O código contido em `experiments/premium-3d-real-rotatable-spike/` servirá como portfólio avançado e demonstração isolada de viabilidade gráfica em Three.js procedural.
*   **Próxima Fase de Desenvolvimento (Fase C2):**
    `GO condicional para futura fase C2 de protótipo demonstrável.`
    O avanço para a criação de um protótipo de produto é aprovado condicionalmente, sujeitando-se à aceitação e homologação estrita dos requisitos definidos na seção 2 deste documento.
*   **Integração no E-book Principal:**
    `NO-GO para integração imediata no e-book principal.`
    O e-book de produção permanece estável e inalterado, rodando sob a baseline segura e inclusiva B1+B2 (Palco Molecular Estático e Sequenciador Qualitativo).
*   **Precificação Comercial:**
    `NO-GO para precificação nesta etapa.`
    É proibido estabelecer qualquer tabela de preços, estimativa de custos ou precificação de licenciamento da funcionalidade Premium 3D nesta fase.
*   **Definição como Produto Final:**
    `NO-GO para produto final.`
    O experimento do visualizador 3D real rotacionável não deve ser comercializado, ofertado ou considerado um módulo finalizado.

---

## 2. Requisitos Condicionais para Homologação Futura (Fase C2)

Se o projeto decidir avançar para um protótipo demonstrável na Fase C2, deverão ser atendidos cumulativamente os seguintes critérios:

1.  **Acessibilidade Instrumental Plena:** O visualizador 3D deve fornecer atalhos de teclado (ex.: foco em órbita por teclado, movimentação via setas direcionais com feedback por leitor de tela) em conformidade com as diretrizes WCAG 2.1.
2.  **Robustez de Fallback:** Garantir que dispositivos de escolas públicas com WebGL desativado ou sem aceleração gráfica por hardware exibam perfeitamente o visualizador estático (B1) de forma integrada, sem quebras no fluxo da página.
3.  **Controle de Peso e Performance:** A build de produção compilada com Three.js não deve exceder **500KB** gzipped adicionais, sob pena de comprometer o carregamento offline e o uso em redes móveis escolares.
4.  **Justificativa e Roteiro Pedagógico:** Integração obrigatória com um roteiro didático guiado por etapas, evitando a mera interação de câmera sem propósito pedagógico estruturado.
5.  **Isenção Qualitativa:** Exibição mandatória do aviso de isenção molecular qualitativa.

---
*Deliberação formal datada de junho de 2026. Aprovada pela governança do EcoSabon.*
