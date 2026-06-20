# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 21: Plano de Testes (TDD) — Hotspots Acessíveis no Infográfico

**Branch de Planejamento:** `plan/ebook-ecosabon-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PLANEJAMENTO (Aguardando autorização de implementação)

---

### 1. Visão Geral do Plano de Testes
O plano de testes segue a metodologia TDD (Test-Driven Development). Novos testes unitários e de integração de fumaça (smoke tests) serão adicionados ao arquivo `tests/interactions.test.js` **antes** ou **durante** a escrita do código produtivo de comportamento dos hotspots.

A suíte será ampliada com testes específicos que cobrem acessibilidade por teclado, comportamento visual e garantias de governança acadêmica/técnica.

---

### 2. Especificação dos Casos de Teste Planejados

#### **Grupo A: Testes de Smoke (Integridade no HTML Real)**
* **T51: Presença de Hotspots no HTML Real:**
  * *Verifica:* Se o contêiner `#infografico-saponificacao` no arquivo `index.html` real possui exatamente 8 botões identificadores com a classe `.infographic-hotspot`.
* **T52: Semântica e Atributos ARIA Básicos:**
  * *Verifica:* Se cada um dos 8 hotspots possui o atributo `role="button"`, `aria-haspopup="dialog"` e `aria-expanded="false"` inicialmente configurados.
* **T53: Rotulagem Acessível (aria-label):**
  * *Verifica:* Se todos os botões de hotspot contam com um atributo `aria-label` não vazio descrevendo o elemento correspondente (ex: `"Detalhar Triglicerídeo"`).

#### **Grupo B: Testes de Comportamento e Interatividade (JS)**
* **T54: Interação de Clique (Abertura/Fechamento):**
  * *Verifica:* Se clicar em um botão de hotspot altera `aria-expanded` para `"true"` e exibe o contêiner de descrição correspondente (removendo a propriedade `hidden` / classe de ocultação). Clicar novamente deve inverter os atributos.
* **T55: Foco Único e Exclusividade:**
  * *Verifica:* Se ao abrir o hotspot 2 (ex: NaOH), o hotspot 1 (Triglicerídeo) previamente aberto é fechado automaticamente, garantindo apenas um balão descritivo ativo por vez.
* **T56: Suporte a Teclado (Enter / Space):**
  * *Verifica:* Se disparar eventos `keydown` com a tecla `"Enter"` ou `" "` (Espaço) nos botões de hotspot aciona a função de alternância com o mesmo efeito do clique.
* **T57: Fechamento por Tecla Escape:**
  * *Verifica:* Se disparar um evento `keydown` com a tecla `"Escape"` no balão aberto ou no botão associado fecha a descrição e devolve o foco para o botão de gatilho correspondente.

#### **Grupo C: Garantias de Acessibilidade e Fallback**
* **T58: Fallback sem JavaScript:**
  * *Verifica:* Se as explicações conceituais dos hotspots possuem marcações semânticas que as deixam acessíveis (mesmo que estáticas) caso o JavaScript falhe ou esteja desativado.
* **T59: Preservação de Foco Visível:**
  * *Verifica:* Se a folha de estilo contém regras CSS para `:focus-visible` aplicadas aos botões dos hotspots, garantindo outline visível de foco de teclado.

#### **Grupo D: Gates de Segurança e Não-Regressão**
* **T60: Preservação dos 50 Testes Atuais:**
  * *Verifica:* Se a execução de toda a suíte herdada das execuções 1, 2 e 3 parcial continua com 100% de sucesso.
* **T61: Preservação de Placeholders:**
  * *Verifica:* A presença inalterada dos marcadores pedagógicos no HTML real (2 ocorrências de `"DADOS FICTÍCIOS"`, 1 de `"habilidade BNCC"`, 1 de `"CEP"`, 0 de `"TCLE"`).
* **T62: Ausência Absoluta de Simulação (C4/3E):**
  * *Verifica:* Varredura de código atestando que nenhum slider, range input, cálculo de pH ou lógica de simulação foi adicionada aos arquivos do protótipo.
* **T63: Ausência de Persistência e Rede:**
  * *Verifica:* A não utilização de `localStorage`, `sessionStorage`, `fetch`, `WebSocket` ou formulários externos.

---

### 3. Estrutura do Teste de Comportamento Sugerida (Esboço TDD)
```javascript
test('T54 — Clicar em um hotspot do infográfico deve abrir e fechar a descrição correspondente', () => {
  const dom = createStationTestDOM(); // Helper do JSDOM
  const doc = dom.window.document;
  
  const hotspotBtn = doc.querySelector('.infographic-hotspot[data-target="triglicerideo"]');
  const bubble = doc.querySelector('#hotspot-desc-triglicerideo');
  
  expect(hotspotBtn.getAttribute('aria-expanded')).toBe('false');
  expect(bubble.hasAttribute('hidden')).toBe(true);
  
  // Simular clique
  hotspotBtn.click();
  expect(hotspotBtn.getAttribute('aria-expanded')).toBe('true');
  expect(bubble.hasAttribute('hidden')).toBe(false);
  
  // Simular segundo clique (fechamento)
  hotspotBtn.click();
  expect(hotspotBtn.getAttribute('aria-expanded')).toBe('false');
  expect(bubble.hasAttribute('hidden')).toBe(true);
});
```
