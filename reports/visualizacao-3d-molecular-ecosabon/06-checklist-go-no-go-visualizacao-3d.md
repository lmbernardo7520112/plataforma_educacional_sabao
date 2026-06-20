# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 36: Checklist Go/No-Go — Visualização Molecular 3D/2.5D

**Autor:** Antigravity (Arquiteto de Produto Educacional Digital)  
**Status:** ✅ Concluído (Fase de Planejamento)  
**Data:** 2026-06-20  

---

### 1. Critérios de Aprovação (Go)
Para que a futura implementação da visualização molecular seja integrada ao produto EcoSabon, ela deve atender cumulativamente a todos os seguintes critérios:

*   [ ] **Zero Dependências Runtime:** O recurso deve rodar inteiramente com Vanilla HTML5, CSS3 e Javascript ES6 local. Sem npm packages externos em tempo de execução.
*   [ ] **Funcionamento Offline Completo:** A visualização deve carregar perfeitamente a partir do sistema de arquivos local (`file://`) ou localhost sem internet, sem fazer nenhuma requisição de rede (`fetch`, `iframe` externo, etc.).
*   [ ] **Suporte Completo a Acessibilidade (A11y):** Presença de rótulos ARIA, semântica nativa, navegação total via teclado (Tab e Enter) e live regions para leitores de tela.
*   [ ] **Linearização de Impressão:** Ao gerar PDF/impressão, a folha de estilo deve exibir os estados de Reagente e Produto em um layout linear perfeitamente legível.
*   [ ] **Bloqueio Absoluto do C4/3E:** O recurso é estritamente qualitativo e explicativo. Não existem simulações quantitativas de rendimento, sliders interativos ou previsões numéricas.
*   [ ] **Preservação de Hotspots Atuais:** A suíte original de 8 hotspots no infográfico do Módulo 2 deve permanecer intacta e funcional.

---

### 2. Critérios de Rejeição (No-Go)
O desenvolvimento será abortado ou recusado na revisão de PR caso ocorra qualquer uma das seguintes situações:

*   [ ] **Uso de WebGL Pesado ou Three.js/Unity:** Adoção de frameworks de renderização 3D que inflem o tamanho final da página ou exijam aceleração por GPU incompatível com celulares escolares antigos.
*   [ ] **Embed de Iframe do Sketchfab:** Integração de widgets externos que quebrem o carregamento offline.
*   [ ] **Cópia de Conteúdo Visual/Código do Kotobee:** Qualquer semelhança visual ou cópia direta de assets do e-book *Plant Anatomy*.
*   [ ] **Quebra na Suíte de Testes Existentes:** Redução no número total de testes com sucesso (63 testes obrigatórios na `main`).

---

### 3. Checklists de Qualidade

#### A. Acessibilidade
*   [ ] Os elementos ativos possuem `aria-expanded` e `aria-controls`?
*   [ ] Há suporte a `prefers-reduced-motion` no CSS?
*   [ ] O leitor de tela lê as alterações de estado via `aria-live`?

#### B. Impressão
*   [ ] O palco molecular não é ocultado pelo `@media print`?
*   [ ] Há quebras de página controladas para que as estruturas químicas não sejam cortadas?

#### C. Direitos Autorais
*   [ ] Os SVGs das moléculas foram gerados de forma 100% autoral?
*   [ ] Nenhum texto descritivo de botânica ou estrutura foi importado?

---

### 4. Declaração Obrigatória de Não-Cópia
> [!IMPORTANT]
> Nenhum conteúdo textual, imagem, screenshot, vídeo, modelo 3D, textura, ícone, asset, script, identidade visual ou arquivo multimídia do Plant Anatomy/Kotobee foi copiado, extraído ou incorporado ao EcoSabon. A análise usa o exemplo exclusivamente como benchmark de padrões abstratos de UX, visualização científica e interação.
