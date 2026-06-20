# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 24: Relatório de Implementação dos Hotspots Acessíveis no Infográfico

**Branch de Trabalho:** `feat/ebook-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** ✅ APROVADO (Pronto para abertura de Pull Request)  
**Data:** 2026-06-20  

---

### 1. Histórico e Contexto da Execução
Este documento relata o encerramento do desenvolvimento e a homologação técnica para a evolução de hotspots acessíveis no infográfico da reação de saponificação do web-book **EcoSabon**. A evolução seguiu estritamente as diretrizes de design de acessibilidade (WCAG AA / ARIA), não-bloqueio (visualização inline, sem modais ou overlays bloqueantes), compatibilidade móvel e linearização em mídia impressa, mantendo o produto livre de lock-in técnico.

---

### 2. Controle de Commits e Sublotes
A implementação foi realizada em commits semânticos em conformidade com o plano de governança estabelecido:

1. **Sublote H1 (Testes dos Hotspots):**
   * *Commit:* `test(ebook): add tests for accessible saponification hotspots` (Commit ID: `2d4b6df`)
   * *Ação:* Inclusão dos testes T51–T63 cobrindo semântica de DOM, ARIA, teclado e regras de governança.
2. **Sublote H2 (HTML Semântico):**
   * *Commit:* `feat(ebook): add inline accessible hotspots to saponification infographic` (Commit ID: `b83aa1f`)
   * *Ação:* Inserção de 8 botões `.infographic-hotspot` e 8 painéis explicativos `.infographic-panel` inline com atributos ARIA no arquivo `index.html`.
3. **Sublote H3 (Comportamento JS Vanilla):**
   * *Commit:* `feat(ebook): add vanilla js hotspot panel interactions` (Commit ID: `e4f6622`)
   * *Ação:* Implementação de `toggleHotspotPanel` e `initSaponificationHotspots` com foco único e suporte às teclas Enter/Espaço/Escape.
4. **Sublote H4 (Estilos e Impressão):**
   * *Commit:* `style(ebook): add accessible hotspot and print styles` (Commit ID: `90a27be`)
   * *Ação:* Criação de estilos CSS autorais em `main.css` (glowing visual, `:focus-visible`, posicionamento relativo) e linearização completa de mídias impressas em `print.css`.

---

### 3. Registro do Baseline de Placeholders
Como portão de segurança obrigatório, o conteúdo acadêmico consolidado não sofreu alterações. A varredura registrou:

* **Ocorrências de "DADOS FICTÍCIOS":** 2 (preservado verbatim)
* **Ocorrências de "habilidade BNCC":** 1 (preservado verbatim)
* **Ocorrências de "CEP":** 1 (preservado verbatim)
* **Ocorrências de "TCLE":** 0 (ausência verificada)

---

### 4. Controle de Regressão e Suíte de Testes (Vitest)
A suíte completa de testes automatizados executada no JSDOM sintético validou a não regressão e o sucesso dos novos componentes interativos:

* **Total de testes da suíte original (T1 a T50):** 50 (100% preservados e com sucesso)
* **Novos testes de hotspots (T51 a T63):** 13 (100% com sucesso)
* **Total final de testes ativos na suíte:** **63 testes**
* **Status da execução `npm test`:** **PASS** (63 de 63 testes bem-sucedidos)

```
✓ tests/interactions.test.js (63 tests) 189ms
 Test Files  1 passed (1)
      Tests  63 passed (63)
```

---

### 5. Validação dos Gates de Segurança Reacionais

> [!IMPORTANT]
> **Relatório de Conformidade Ética e Técnica (Fase 3B/4/5 Bloqueadas):**
> * **C4/3E (Cálculo Dinâmico/Simulação):** **BLOQUEADO**. Nenhuma lógica de simulação experimental, cálculo estequiométrico ou variação dinâmica de pH/temperatura foi inserida no produto.
> * **Sliders / Inputs:** Zero sliders ou elementos do tipo `<input type="range">`.
> * **Persistência de Dados:** Ausência absoluta de `localStorage` ou `sessionStorage`.
> * **Rede e Conexão:** Zero conexões externas. Não há ocorrências de `fetch`, `XMLHttpRequest`, `WebSocket` ou envio de `FormData`.
> * **Dependências e CDNs:** Zero novas dependências. Nenhum script externo, fonte externa ou biblioteca adicional de terceiros foi adicionada ao projeto.
> * **Assets Kotobee:** Nenhum asset, ícone ou estilo visual proprietário do Kotobee foi copiado. Todo o visual é 100% autoral do EcoSabon.
> * **Arquivos Protegidos:** Os diretórios `docs/` e `anexos/` permaneceram inalterados.

---

### 6. Relatório de Análise UX, Acessibilidade e Impressão

#### **Visual e Mobile (Inspeção Responsiva):**
* Em desktop, os pins são posicionados de forma harmoniosa no canto superior direito das moléculas reacionais e badges centrais.
* Ao abrir um painel, a caixa explicativa se expande abaixo do fluxograma de forma linear e limpa (sem ocultação de outros elementos).
* Em visualização móvel (telas < 768px), o infográfico empilha verticalmente e os painéis respeitam a largura total da tela, mantendo fontes e micro-espaçamentos legíveis.

#### **Acessibilidade por Teclado e Leitor de Tela:**
* Todos os hotspots herdam comportamento focável por serem `<button>` HTML nativos.
* Foco visível garantido pelo estilo `:focus-visible` com contorno evidente de 3px em ciano.
* Atributo `aria-expanded` alterna entre `true` e `false` de forma síncrona com as ações.
* Atributo `aria-controls` referencia de forma unívoca o painel `.infographic-panel` correspondente.
* Comportamento "Foco Único" funcional: ao abrir um novo item, o anterior fecha automaticamente.
* Atalho de teclado `Escape` fecha qualquer painel ativo e devolve o foco para o botão de origem correspondente.

#### **Impressão e PDF:**
* Na visualização do comando Ctrl + P, todos os botões interativos circulares são ocultados (`display: none !important`).
* Os 8 painéis explicativos de todos os hotspots são renderizados de forma aberta e estática abaixo do infográfico, sequenciados linearmente com borda lateral decorativa preta/cinza sobre fundo claro. Isso garante o fallback do conteúdo educacional para versões físicas ou downloads em PDF estático.

---

### 7. Riscos Residuais
Não há riscos residuais de quebra de fluxo de layout ou regressões de a11y, uma vez que a folha de estilos opera sobre classes BEM isoladas e o JS Vanilla aplica comportamento condicionado à existencia de elementos, permitindo fallback gracioso caso a página seja carregada sem JavaScript.

---

### 8. Recomendação Técnica
Recomenda-se a imediata abertura do Pull Request da branch `feat/ebook-hotspots-saponificacao` para a branch `main`, seguida de merge controlado, pois todos os gates de conformidade de acessibilidade, responsividade, regressão de testes e placeholders acadêmicos foram integralmente cumpridos.
