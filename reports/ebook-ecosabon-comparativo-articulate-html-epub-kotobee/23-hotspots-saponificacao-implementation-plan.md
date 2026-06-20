# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 23: Plano de Implementação — Hotspots Acessíveis no Infográfico

**Branch de Planejamento:** `plan/ebook-ecosabon-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PLANEJAMENTO (Aguardando autorização de implementação)

---

### 1. Visão Geral do Plano de Implementação
A evolução prática dos hotspots interativos no infográfico de saponificação será dividida em **6 sublotes pequenos (H1 a H6)** para manter a governança metodológica e facilitar testes contínuos de regressão (TDD).

---

### 2. Detalhamento dos Sublotes de Trabalho

#### 🛠️ **Sublote H1: Estrutura Semântica dos Hotspots (HTML)**
* **Objetivo:** Adicionar os botões de gatilho e os contêineres de informação estática no HTML.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/index.html`
* **Testes necessários:** Adição dos testes de smoke **T51**, **T52** e **T53** (verificação de presença de hotspots, `role="button"` e `aria-label` no HTML real).
* **Critérios de Aceite:**
  * Os 8 botões e suas 8 caixas de descrição correspondentes estão presentes no DOM do HTML real.
  * Todos os botões contam com `aria-expanded="false"`, `aria-haspopup="dialog"` e `aria-controls`.
  * Os balões descritivos contam com o atributo `hidden` ativo por padrão.
* **Riscos:** Quebra de renderização visual se o CSS ainda não estiver aplicado.
* **Commit semântico sugerido:** `feat(ebook): add semantic HTML structure for infographic hotspots (H1)`

---

#### ⚙️ **Sublote H2: Comportamento Acessível em Vanilla JS (Interações)**
* **Objetivo:** Escrever a lógica de abertura, fechamento e comportamento de foco único dos hotspots.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/src/scripts/interactions.js`, `ebook-ecosabon-prototipo/src/scripts/app.js`
* **Testes necessários:** Implementação dos testes unitários **T54** (abertura/fechamento ao clique), **T55** (fechamento automático de hotspots anteriores) e **T56** (suporte a Enter/Space).
* **Critérios de Aceite:**
  * Clicar em um hotspot remove o atributo `hidden` da descrição correspondente e define `aria-expanded="true"` no botão.
  * Apenas uma descrição de hotspot fica aberta de cada vez.
  * O comportamento toggle responde perfeitamente a interações de mouse e teclado.
* **Riscos:** Lógica de fechamento automático quebrar a navegabilidade se o DOM não estiver sincronizado.
* **Commit semântico sugerido:** `feat(ebook): implement accessible vanilla JS interaction for hotspots (H2)`

---

#### 🎨 **Sublote H3: Estilos Visuais Autorais dos Hotspots (CSS)**
* **Objetivo:** Adicionar a folha de estilo para o posicionamento relativo dos pins e estilização dos balões.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/src/styles/main.css`
* **Testes necessários:** Validação visual da interface (responsividade) e verificação do teste **T59** (foco visível).
* **Critérios de Aceite:**
  * Os pins de hotspot estão perfeitamente posicionados sobre as moléculas e setas do infográfico de forma responsiva.
  * Os balões informativos abrem como popups elegantes sobrepondo-se ao layout em desktop, e empilham de forma fluida no mobile.
  * O seletor `:focus-visible` aplica outline destacado de 3px ao redor do pin focado.
* **Riscos:** Sobreposição indesejada ou balões estourando as margens laterais do viewport em telas estreitas.
* **Commit semântico sugerido:** `style(ebook): style infographic hotspots with CSS BEM and focus-visible (H3)`

---

#### 🖨️ **Sublote H4: Impressão e Acessibilidade Avançada (Filtros)**
* **Objetivo:** Garantir a visibilidade contínua de todo o conteúdo em mídia impressa e implementar o atalho de fechamento por teclado.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/src/styles/print.css`, `ebook-ecosabon-prototipo/src/scripts/interactions.js`
* **Testes necessários:** Teste unitário **T57** (fechamento via tecla Escape) e teste de fumaça **T58** (estilos de fallback de impressão).
* **Critérios de Aceite:**
  * Pressionar `Escape` no teclado fecha qualquer balão de hotspot ativo e devolve o foco para o botão de origem.
  * Na impressão para PDF, todos os balões explicativos dos hotspots são linearizados de forma legível abaixo do infográfico, ocultando os botões circulares interativos para economizar tinta.
* **Riscos:** Quebra de layout de página órfã em PDF se o contêiner do infográfico não contar com regras de quebra apropriadas.
* **Commit semântico sugerido:** `style(ebook): linearize hotspot descriptions in print.css (H4)`

---

#### 🧪 **Sublote H5: Testes de Fumaça Finais e Homologação Local**
* **Objetivo:** Rodar a suíte completa de testes automatizados e verificar segurança de dados e placeholders.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/tests/interactions.test.js` (ajustes finos se necessário)
* **Testes necessários:** Execução total do Vitest: `npm test` (T1 a T63).
* **Critérios de Aceite:**
  * Todos os 63 testes (50 originais + 13 novos) passam com 100% de sucesso.
  * Validação de segurança confirma: zero range inputs, zero simulações, zero `localStorage`, zero rede.
* **Riscos:** Incompatibilidade com JSDOM sintético em testes complexos de teclado (Escape/focus).
* **Commit semântico sugerido:** `test(ebook): verify complete hotspot interaction suite (T51-T63) (H5)`

---

#### 🚀 **Sublote H6: Abertura de PR e Merge Controlado**
* **Objetivo:** Abrir o Pull Request no GitHub a partir da branch de trabalho e concluir a integração na `main`.
* **Arquivos a alterar:** Nenhum (apenas comandos Git e documentação final de merge).
* **Testes necessários:** `gh pr checks` no CI remoto.
* **Critérios de Aceite:**
  * Pull Request aberto com a descrição e critérios de aceite detalhados.
  * CI remoto aprovado e sem erros.
  * Merge commit gerado e branch local sincronizada.
* **Riscos:** Divergências de sincronização se a branch principal sofrer commits paralelos.
* **Commit semântico sugerido:** `docs(ebook): create execution closure report for saponification hotspots (H6)`
