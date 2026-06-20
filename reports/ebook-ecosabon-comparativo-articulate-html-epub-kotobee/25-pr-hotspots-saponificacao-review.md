# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 25: Relatório de Revisão de Pull Request (PR) — Hotspots Acessíveis no Infográfico

**Branch de Origem (Source):** `feat/ebook-hotspots-saponificacao`  
**Branch de Destino (Target):** `main`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** ✅ APROVADO (Pronto para Merge após homologação final)  
**Data:** 2026-06-20  

---

### 1. Resumo Executivo
Este documento apresenta a revisão formal de engenharia da Pull Request (PR) para a integração dos hotspots acessíveis no infográfico de saponificação do web-book **EcoSabon**. Todas as especificações técnicas, testes unitários, testes de fumaça (smoke tests) e gates de governança foram atendidos e validados com sucesso.

---

### 2. Commits Incluídos na PR
A branch de trabalho apresenta exatamente os seguintes commits lineares sobre a `main`:
1. `2d4b6df` `test(ebook): add tests for accessible saponification hotspots`
2. `b83aa1f` `feat(ebook): add inline accessible hotspots to saponification infographic`
3. `e4f6622` `feat(ebook): add vanilla js hotspot panel interactions`
4. `90a27be` `style(ebook): add accessible hotspot and print styles`
5. `a3b5eeb` `docs(ebook): create hotspot implementation report`

---

### 3. Arquivos Alterados e Diff Analítico
A PR altera exclusivamente os seguintes arquivos, sem qualquer alteração colateral fora do escopo:

* **[index.html](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/index.html):** Inserção semântica dos 8 botões `.infographic-hotspot` nativos e dos 8 blocos de texto plano explicativos `.infographic-panel` com atributos de acessibilidade (WAI-ARIA).
* **[app.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/app.js):** Bootstrapping e ativação dos ouvintes de evento dos hotspots no carregamento da página.
* **[interactions.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/interactions.js):** Lógica JavaScript modular contendo as funções `toggleHotspotPanel` e `initSaponificationHotspots`.
* **[main.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/main.css):** Design do sistema de pins (posicionamentos, outline `:focus-visible`, pulsador) e layout responsivo.
* **[print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css):** Ocultação dos elementos interativos em mídia impressa e linearização aberta dos blocos descritivos.
* **[interactions.test.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/tests/interactions.test.js):** Ampliação da suíte para 63 testes, cobrindo todos os fluxos de teclado, click e asserções de segurança.

---

### 4. Resultados da Homologação (Q&A e Testes)
* **npm test:** **PASS** (63/63 testes executados com 100% de sucesso).
* **Não-Regressão:** Os 50 testes pré-existentes de navegação contínua, sidebar e cartões continuam passando integralmente.
* **Controle de Placeholders:**
  * Ocorrências de `DADOS FICTÍCIOS`: 2 (Verificado e inalterado).
  * Ocorrências de `habilidade BNCC`: 1 (Verificado e inalterado).

---

### 5. Checklists de Conformidade e Portões de Segurança

#### **Acessibilidade e Usabilidade (WCAG AA):**
* [x] **Teclado:** Focabilidade sequencial nativa por teclado, com acionamento via `Enter` e `Space`.
* [x] **Foco Visível:** Contorno visual nítido de `3px ciano` ao redor de botões via `:focus-visible`.
* [x] **Leitores de Tela:** Vinculação semântica correta com `aria-expanded` (reativo) e `aria-controls` associado ao ID do painel.
* [x] **Tecla Escape:** Pressionar `Escape` colapsa o painel explicativo ativo e devolve o foco do cursor para o botão original.
* [x] **Foco Único:** Apenas 1 painel explicativo inline aberto por vez. O acionamento de outro hotspot fecha o painel anterior automaticamente.

#### **Responsividade e Mobile:**
* [x] O infográfico empilha verticalmente no celular e o posicionamento dos painéis acompanha a largura útil total sem sobrepor o fluxo de leitura.

#### **Mídia Impressa:**
* [x] Em prévia de impressão (Ctrl + P), todos os botões de hotspot são ocultados e os 8 painéis são renderizados abertos sequencialmente abaixo do diagrama da reação.

#### **Restrições de Não-Simulação e Privacidade (Strict Mode):**
* [x] **C4/3E Bloqueado:** Zero range inputs, zero controles de pH ou temperatura dinâmicos, zero simulações matemáticas.
* [x] **Zero Persistência:** Nenhuma referência a `localStorage` ou `sessionStorage`.
* [x] **Zero Rede:** Nenhuma requisição de rede ou conexões via `fetch`, `XMLHttpRequest` ou `WebSocket`.
* [x] **Zero Dependências:** Nenhuma dependência externa adicionada (package.json inalterado).
* [x] **Integridade do Código:** Sem cópias de padrões de código ou assets proprietários do Kotobee.

---

### 6. Riscos Residuais
Não foram identificados riscos residuais. O fallback mecânico e estrutural sem JavaScript garante a exibição direta de todos os painéis abertos, mantendo a integridade da leitura contínua.

---

### 7. Recomendação Técnica
Recomenda-se aprovar esta Pull Request e realizar o merge controlado para a branch `main`. A implementação está em conformidade perfeita com os requisitos de design instrucional acessível, sem introduzir dependências ou lógica dinâmica restrita.
