# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 23: Plano de Implementação — Hotspots Acessíveis no Infográfico

**Branch de Planejamento:** `plan/ebook-ecosabon-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PLANEJAMENTO (Aguardando autorização de implementação)

---

### 1. Visão Geral do Plano de Implementação
A evolução prática dos hotspots interativos no infográfico de saponificação será dividida em **6 sublotes pequenos (H1 a H6)** para manter a governança de teste contínua (TDD) e integridade visual.

> [!IMPORTANT]
> **Diretriz de Design de Interação:**  
> Os hotspots não devem abrir modais, overlays bloqueantes ou popups que escondam conteúdo essencial. A interação deve revelar painéis explicativos inline, acessíveis, navegáveis por teclado e compatíveis com impressão.

---

### 2. Detalhamento dos Sublotes de Trabalho

#### 🛠️ **Sublote H1: Estrutura Semântica dos Hotspots (HTML)**
* **Objetivo:** Adicionar os botões de gatilho e as caixas explicativas associadas aos hotspots no HTML de forma inline.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/index.html`
* **Testes necessários:** Adição dos testes de smoke **T51**, **T52** e **T53** (verificação de presença de hotspots, `role="button"` e `aria-label` no HTML real).
* **Critérios de Aceite:**
  * Os 8 botões e seus 8 painéis explicativos inline correspondentes estão presentes no DOM do HTML real.
  * Todos os botões contam com `aria-expanded="false"`, `aria-haspopup="dialog"` e `aria-controls`.
  * Os blocos explicativos contam com o atributo `hidden` ativo por padrão para garantir o fallback.
* **Riscos:** Quebra de renderização visual se o CSS ainda não estiver aplicado.
* **Commit semântico sugerido:** `feat(ebook): add semantic HTML structure for infographic hotspots (H1)`

---

#### ⚙️ **Sublote H2: Comportamento Acessível em Vanilla JS (Interações)**
* **Objetivo:** Escrever a lógica de abertura, fechamento e comportamento de foco único dos blocos explicativos alternáveis.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/src/scripts/interactions.js`, `ebook-ecosabon-prototipo/src/scripts/app.js`
* **Testes necessários:** Implementação dos testes unitários **T54** (abertura/fechamento ao clique), **T55** (fechamento automático de hotspots anteriores) e **T56** (suporte a Enter/Space).
* **Critérios de Aceite:**
  * Clicar em um hotspot remove o atributo `hidden` da caixa explicativa associada e define `aria-expanded="true"` no botão.
  * Apenas uma descrição fica aberta de cada vez.
  * O comportamento toggle responde a interações de mouse e teclado.
* **Riscos:** Lógica de fechamento automático quebrar a navegabilidade se o DOM não estiver sincronizado.
* **Commit semântico sugerido:** `feat(ebook): implement accessible vanilla JS interaction for hotspots (H2)`

---

#### 🎨 **Sublote H3: Estilos Visuais Autorais dos Hotspots (CSS)**
* **Objetivo:** Adicionar a folha de estilo para o posicionamento relativo dos pins e estilização dos blocos explicativos alternáveis de forma não bloqueante.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/src/styles/main.css`
* **Testes necessários:** Validação visual da interface (responsividade) e verificação do teste **T59** (foco visível).
* **Critérios de Aceite:**
  * Os pins de hotspot estão posicionados de forma responsiva sobre as moléculas e setas do infográfico.
  * As caixas explicativas abrem de forma a não cobrir o texto essencial em desktop e empilham no mobile.
  * O seletor `:focus-visible` aplica outline destacado de 3px ao redor do pin focado.
* **Riscos:** Sobreposições indesejadas no fluxo móvel.
* **Commit semântico sugerido:** `style(ebook): style infographic hotspots with CSS BEM and focus-visible (H3)`

---

#### 🖨️ **Sublote H4: Impressão e Acessibilidade Avançada (Filtros)**
* **Objetivo:** Garantir a visibilidade de todo o conteúdo pedagógico em mídia impressa e implementar o atalho de fechamento por teclado.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/src/styles/print.css`, `ebook-ecosabon-prototipo/src/scripts/interactions.js`
* **Testes necessários:** Teste unitário **T57** (fechamento via tecla Escape) e teste de fumaça **T58** (estilos de fallback de impressão).
* **Critérios de Aceite:**
  * Pressionar `Escape` no teclado fecha qualquer painel ativo e devolve o foco para o botão de origem.
  * Na impressão para PDF, todos os blocos explicativos dos hotspots são linearizados de forma aberta e legível abaixo do infográfico, ocultando os botões circulares interativos. Nenhum conteúdo pedagógico depende exclusivamente da interação.
* **Riscos:** Quebra de layout de página em PDF.
* **Commit semântico sugerido:** `style(ebook): linearize hotspot descriptions in print.css (H4)`

---

#### 🧪 **Sublote H5: Testes de Fumaça Finais e Homologação Local**
* **Objetivo:** Rodar a suíte completa de testes automatizados e verificar segurança de dados e placeholders.
* **Arquivos a alterar:** `ebook-ecosabon-prototipo/tests/interactions.test.js` (ajustes finos se necessário)
* **Testes necessários:** Execução total do Vitest: `npm test` (T1 a T63).
* **Critérios de Aceite:**
  * Todos os 63 testes (50 originais + 13 novos) passam com 100% de sucesso.
  * Validação de segurança confirma: zero range inputs, zero simulações, zero `localStorage`, zero rede, zero C4/3E.
* **Riscos:** Incompatibilidade com JSDOM sintético em testes complexos de teclado.
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
