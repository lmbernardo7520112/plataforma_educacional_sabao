# Decisão de GO/NO-GO — Implementação Real do Premium 3D Rotacionável

Este documento estabelece a decisão formal de continuidade para a implementação da camada Premium 3D rotacionável no e-book **EcoSabon**.

---

## 1. Decisão Formal
**Decisão:** `NO-GO para implementação real imediata no produto de produção.`

**Direcionamento:**
*   A versão estável B1+B2 cumpre todos os requisitos pedagógicos do projeto.
*   Nenhum código experimental 3D será integrado ao e-book principal nesta rodada.
*   O Spike contido em `experiments/premium-3d-rotatable-spike/` servirá apenas como prova de conceito demonstrável offline para fins comerciais ou de portfólio.

---

## 2. Avaliação dos Critérios de Viabilidade

*   **Agrega valor real?** Sim, enriquece a apresentação visual e pode se destacar comercialmente, mas o ganho pedagógico incremental sobre as etapas B1+B2 é pequeno em relação ao esforço.
*   **Justifica a complexidade?** Não para a entrega básica/profissional. Motores 3D reais trariam alta probabilidade de bugs de renderização e incompatibilidade no ambiente escolar público.
*   **Preserva a acessibilidade?** Apenas se utilizarmos a técnica do Spike (SVG/CSS e fallback linear). Motores WebGL criam barreiras críticas para leitores de tela.
*   **Preserva a impressão?** Canvas de Three.js ou Unity falham por completo na impressão física. A técnica do Spike preserva a impressão.
*   **Preserva o funcionamento offline?** Sim, a técnica de projeções vetoriais ou frames estáticos mantém o funcionamento offline, enquanto embeds externos (Sketchfab) falhariam.
*   **Não confunde com simulação?** Há risco moderado. A rotação contínua e fluida pode dar a falsa impressão de que a reação está sendo calculada em tempo real. A rotação discreta por ângulos rotulados e o disclaimer mitigam esse risco.
*   **Pode ser mantida por um freelancer?** A técnica de SVG/CSS é perfeitamente manutenível. Projetos em C# (Unity) ou pipelines complexos de Three.js apresentam altíssimo risco de manutenção.
*   **Precisa de contrato e escopo próprios?** Sim, obrigatoriamente. A engenharia tridimensional rotacionável (mesmo qualitativa) deve ser regida por aditivo contratual.
*   **Exige orçamento maior?** Sim.
*   **Deve permanecer opcional?** Sim, como um módulo enriquecido ("Nível Premium").

---

## 3. Diretriz Comercial e de Precificação
A eventual ativação de uma camada Premium 3D rotacionável no produto final exigirá uma precificação comercial proporcional e em conformidade com a real complexidade medida (recursos gráficos, exportação do Blender, otimização de malha vetorial e TDD de acessibilidade), a ser contratada à parte.

---
*Decisão de governança homologada pela equipe técnica do EcoSabon.*
