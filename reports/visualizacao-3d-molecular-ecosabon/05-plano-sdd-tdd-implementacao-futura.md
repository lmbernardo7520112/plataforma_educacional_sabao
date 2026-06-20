# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 35: Plano SDD + TDD e Cronograma de Implementação Futura

**Autor:** Antigravity (Arquiteto de Produto Educacional Digital)  
**Status:** ✅ Concluído (Fase de Planejamento)  
**Data:** 2026-06-20  

---

### 1. Documento de Arquitetura de Software (SDD)
O componente de Visualização Molecular 2.5D será implementado seguindo o padrão de **Melhoria Progressiva (Progressive Enhancement)**:

*   **Camada de Estrutura (HTML5):** Um container `<div id="molecular-stage" class="molecular-stage" role="region" aria-label="Visualização molecular 2.5D da Saponificação">` contendo o painel de SVGs inline e botões semânticos de navegação.
*   **Camada de Estilo (CSS3):**
    *   Uso de perspectiva CSS 3D (`perspective: 800px;` e `transform-style: preserve-3d;`) para dar profundidade e efeito de inclinação realista (*tilt*) ao mouse-hover.
    *   Efeito de *Glassmorphism* para cartões flutuantes integrados ao palco molecular.
*   **Camada de Comportamento (JS ES6):**
    *   Uma máquina de estados simples controlada por botões ("Ver Reagentes", "Ver Transição", "Ver Produtos").
    *   Funções puras e testáveis: `setMolecularStageState(state, doc)` e `initMolecularStage(doc)`.

---

### 2. Plano de Desenvolvimento Orientado a Testes (TDD)
Novos testes unitários e de integração serão adicionados na suíte Vitest:

1.  **Testes de Interface (UI):**
    *   Garantir a presença de elementos SVG das moléculas de triglicerídeo, NaOH, sabão e glicerol.
    *   Confirmar que o container possui o papel semântico `role="region"`.
2.  **Testes de Estado e Interação:**
    *   Validar que chamar `setMolecularStageState("produtos")` atualiza as classes ativas no DOM e ativa a visibilidade das moléculas resultantes da saponificação.
    *   Confirmar que a mudança de estado atualiza a descrição textual acessível no elemento `aria-live`.
3.  **Testes de Fallback e Estilo:**
    *   Garantir que as animações respeitam a diretiva de media query `prefers-reduced-motion`.
    *   Confirmar que no CSS de impressão, todas as moléculas de reagentes e produtos aparecem impressas de forma linear e contínua.

---

### 3. Cronograma de Sublotes de Trabalho
Qualquer implementação de código subsequente deve seguir estritamente o cronograma abaixo, em Pull Requests individuais:

*   **Sublote 1: Marcação HTML e Estilos Estáticos 2.5D**
    *   *Escopo:* Criação dos SVGs das moléculas e estrutura de posicionamento 3D básica no CSS.
    *   *Arquivos:* `index.html`, `src/styles/main.css`.
*   **Sublote 2: Máquina de Estados em JS e Integração A11y**
    *   *Escopo:* Lógica javascript para troca de estados ("Reagentes" -> "Produtos") e atualização ARIA.
    *   *Arquivos:* `src/scripts/interactions.js`, `src/scripts/app.js`.
*   **Sublote 3: Suíte de Testes Unitários e Integração (Vitest)**
    *   *Escopo:* Escrita dos testes TDD e homologação final da suíte.
    *   *Arquivos:* `tests/interactions.test.js`.

---
### 4. Portões de Aceite (Gates) para PRs Futuras
*   **npm test:** 100% de aprovação (todos os 63 testes atuais + testes novos passing).
*   **Sem Dependências:** Zero bibliotecas novas (não instalar Three.js, React, etc.).
*   **Bloqueio C4/3E:** Nenhuma lógica de simulação física quantitativa ou inputs interativos como sliders. O C4/3E permanece permanentemente bloqueado.
*   **Preservação de Hotspots:** Os hotspots acessíveis já versionados são o baseline premium e pedagógico do EcoSabon e não devem ser removidos ou modificados.

---

### 5. Saneamento de Governança da Análise 3D
*   **Apenas Conteúdo Autoral:** Esta pasta `reports/visualizacao-3d-molecular-ecosabon/` contém exclusivamente planejamento documental e diretrizes de design autoral para o EcoSabon. É totalmente isenta de screenshots, imagens, modelos 3D, assets, dumps HTML, scripts externos, arquivos Sketchfab/Kotobee ou qualquer material copiado do *Plant Anatomy*.
*   **Commit Documental na Main:** O commit anterior realizado diretamente na branch `main` foi estritamente documental e não causou qualquer impacto ou alteração no código de produto do web-book.
*   **Restrição de Implementação:** Qualquer implementação futura da camada do Molecular Stage 2.5D exige a criação de uma branch de trabalho própria, documentos SDD/TDD específicos, submissão de Pull Request e autorização explícita do orientador/usuário.
*   **Correção de Referências:** Qualquer menção ao planejamento de SDD/TDD de visualização molecular deve referenciar diretamente o arquivo [05-plano-sdd-tdd-implementacao-futura.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/visualizacao-3d-molecular-ecosabon/05-plano-sdd-tdd-implementacao-futura.md) (anteriormente referenciado de forma genérica como "documento 35").

---

### 6. Declaração Obrigatória de Não-Cópia
> [!IMPORTANT]
> Nenhum conteúdo textual, imagem, screenshot, vídeo, modelo 3D, textura, ícone, asset, script, identidade visual ou arquivo multimídia do Plant Anatomy/Kotobee foi copiado, extraído ou incorporado ao EcoSabon. A análise usa o exemplo exclusivamente como benchmark de padrões abstratos de UX, visualização científica e interação.

