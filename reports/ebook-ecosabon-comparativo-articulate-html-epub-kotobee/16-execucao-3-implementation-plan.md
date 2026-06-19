# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 16: Plano de Implementação — Execução 3 (Sublotes)

**Branch de planejamento:** `plan/ebook-ecosabon-execucao-3`
**Data:** 2026-06-19

---

### 1. Estratégia de Implementação

A Execução 3 será dividida em **5 sublotes** (3A a 3E), implementados sequencialmente. Cada sublote possui:

- Escopo definido;
- Testes associados (TDD);
- Gate de aprovação;
- Commit(s) associado(s).

A regra de progressão é:

> **Só avançar para o sublote seguinte se `npm test` passar com 0 falhas após o sublote atual.**

---

### 2. Visão Geral dos Sublotes

| Sublote | Componente | Foco | Testes | Gate |
|---------|-----------|------|--------|------|
| **3A** | C1 | Cartões interativos de estação | T27–T30 | npm test: 30/30 |
| **3B** | C2 | Infográfico da saponificação | T31–T33 | npm test: 33/33 |
| **3C** | C3 | Visualizador de rotação interativo | T34–T40 | npm test: 40/40 |
| **3D** | — | Ajustes de print.css + acessibilidade | — | npm test: 40/40 + inspeção visual |
| **3E** | C4 | Simulação demonstrativa (condicional) | T41–T46 | npm test: 46/46 |

---

### 3. Sublote 3A — Cartões Interativos de Estação

#### 3A.1 Escopo

- Redesenhar os 3 cartões de estação (`#estacao-1`, `#estacao-2`, `#estacao-3`) com:
  - Cabeçalho visual colorido (cor HSL por estação) contendo número, ícone SVG e título;
  - Campos de dados organizados em CSS Grid (2 colunas em desktop, 1 em mobile);
  - Efeito de hover/focus sutil no cartão (border-color ou box-shadow);
  - Preservação integral dos blocos de revelação (Plano B, Erro, Dica).

#### 3A.2 Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | Reestruturar HTML dos cartões de estação com classes BEM `.station-card__*` |
| `main.css` | Estilos para `.station-card`, `.station-card__header`, `.station-card__grid` |

#### 3A.3 Testes

- T27: Cartão tem `.station-card__header` com conteúdo
- T28: Cartão tem `.station-card__grid` com ≥ 4 filhos
- T29: Blocos de revelação preservados (regressão `toggleRevealBlock`)
- T30: Cartão tem `<svg>` no cabeçalho

#### 3A.4 Commits Esperados

```
test(ebook): add tests for enriched station cards (T27-T30)
feat(ebook): redesign station cards with colored headers and grid layout
style(ebook): add CSS for station card headers, grid, and hover effects
```

#### 3A.5 Gate

- `npm test` → 30/30 (26 existentes + 4 novos)
- Inspeção visual dos cartões em desktop e mobile

---

### 4. Sublote 3B — Infográfico da Saponificação

#### 4B.1 Escopo

- Criar diagrama visual CSS/SVG inline da reação de saponificação;
- Posicionar no Módulo 1 (após o card "O que é saponificação?") ou no início do Módulo 2;
- Elementos visuais: representação esquemática dos reagentes (triglicerídeo + 3 NaOH), seta de reação, produtos (3 sabão + glicerol);
- Rótulos didáticos com nomes e coeficientes estequiométricos;
- Aviso `[DADOS FICTÍCIOS PARA TESTE]` se valores numéricos forem usados.

#### 4B.2 Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | Adicionar seção `#infografico-saponificacao` com SVG/HTML |
| `main.css` | Estilos do infográfico (layout flex/grid, cores, responsivo) |

#### 4B.3 Testes

- T31: Infográfico `#infografico-saponificacao` existe no DOM
- T32: Contém textos "Triglicerídeo", "NaOH", "Sabão", "Glicerol"
- T33: Contém elemento visual de seta

#### 4B.4 Commits Esperados

```
test(ebook): add tests for saponification infographic (T31-T33)
feat(ebook): add saponification reaction infographic with SVG/CSS
style(ebook): add responsive styles for reaction infographic
```

#### 4B.5 Gate

- `npm test` → 33/33
- Infográfico legível em desktop (≥768px) e mobile (<768px)

---

### 5. Sublote 3C — Visualizador de Rotação Interativo

#### 5C.1 Escopo

- Transformar `.classroom-diagram` em mapa interativo:
  - Cada `.classroom-diagram__station` recebe `role="button"`, `tabindex="0"`, `aria-label`;
  - Clique/Enter rola até a estação detalhada correspondente;
  - Estação ativa no mapa é destacada visualmente.
- Novas funções em `interactions.js`:
  - `scrollToStation(stationId, doc)` → reutiliza `scrollToSection()`;
  - `initStationMap(doc)` → registra listeners de click/keydown.

#### 5C.2 Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | Adicionar atributos ARIA e data-attributes nos nós do diagrama |
| `main.css` | Estilos de hover/focus/active para nós clicáveis, cursor pointer |
| `interactions.js` | Novas funções `scrollToStation()`, `initStationMap()` |
| `app.js` | Inicializar `initStationMap()` |
| `interactions.test.js` | Testes T34–T40 |

#### 5C.3 Testes

- T34: `scrollToStation('estacao-1', doc)` chama scroll
- T35: `scrollToStation('estacao-99', doc)` retorna false
- T36: `scrollToStation(id, null)` retorna false
- T37: `initStationMap(doc)` retorna contagem de estações mapeadas
- T38: `initStationMap(doc)` retorna 0 sem estações
- T39: Nó de estação tem `role="button"`
- T40: Nó de estação tem `tabindex="0"`

#### 5C.4 Commits Esperados

```
test(ebook): add tests for station map interactivity (T34-T40)
feat(ebook): add scrollToStation and initStationMap functions
feat(ebook): make classroom diagram interactive with ARIA and keyboard support
style(ebook): add interactive styles for station map nodes
```

#### 5C.5 Gate

- `npm test` → 40/40
- Clicar em estação no mapa rola até a descrição detalhada
- Tab + Enter funciona no mapa
- Mobile touch funciona

---

### 6. Sublote 3D — Print.css e Ajustes de Acessibilidade

#### 6D.1 Escopo

- Ajustar `print.css` para:
  - Cartões de estação impressos com layout linearizado;
  - Infográfico impresso com contornos (sem fundos pesados);
  - Mapa de estações impresso como diagrama estático;
  - Simulação oculta (se C4 implementado).
- Verificar acessibilidade geral:
  - Contraste WCAG AA em todos os novos cabeçalhos;
  - Foco visível em todos os novos elementos interativos;
  - Navegação por teclado completa.

#### 6D.2 Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `print.css` | Ajustes de impressão para C1, C2, C3 |
| `main.css` | Ajustes de contraste e focus states se necessário |

#### 6D.3 Testes

- Nenhum teste novo — verificação visual e auditoria manual.

#### 6D.4 Commits Esperados

```
style(ebook): adjust print.css for enriched station cards and infographic
fix(ebook): ensure WCAG AA contrast in station card headers
```

#### 6D.5 Gate

- `npm test` → 40/40 (sem regressão)
- Impressão visual verificada (Ctrl+P ou headless)
- Contraste verificado

---

### 7. Sublote 3E — Simulação Demonstrativa (Condicional)

#### 7E.1 Pré-condição

> **Este sublote só será executado se:**
> 1. Sublotes 3A–3D estão concluídos;
> 2. `npm test` → 40/40 sem falhas;
> 3. O autor autorizar a implementação de C4.

#### 7E.2 Escopo

- Criar painel interativo leve no Módulo 2 (Estação 2 — Reator):
  - 3 sliders: proporção óleo:NaOH (0.5–3.0), temperatura (30–90°C), tempo (10–60 min);
  - Saída: pH estimado (faixa qualitativa), consistência qualitativa;
  - Fórmula didática fixa exposta em comentário no JS;
  - 3 avisos obrigatórios na interface;
  - Nenhuma persistência, coleta ou rede.

#### 7E.3 Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | Adicionar painel de simulação em `#estacao-2` |
| `main.css` | Estilos do painel, sliders, output |
| `print.css` | Ocultar painel na impressão |
| `interactions.js` | Nova função `updateSimulation()` |
| `app.js` | Inicializar listeners dos sliders |
| `interactions.test.js` | Testes T41–T46 |

#### 7E.4 Testes

- T41: `updateSimulation()` retorna valores para entradas válidas
- T42: `updateSimulation()` retorna defaults para entradas nulas
- T43: `updateSimulation()` é função pura (sem side effects)
- T44: `updateSimulation()` retorna false/null sem doc
- T45: Painel contém aviso `[SIMULAÇÃO DEMONSTRATIVA]`
- T46: Código não contém `fetch`/`XMLHttpRequest`/`WebSocket`

#### 7E.5 Commits Esperados

```
test(ebook): add tests for demonstration simulation panel (T41-T46)
feat(ebook): add updateSimulation function with didactic formula
feat(ebook): add simulation panel UI with safety disclaimers
style(ebook): add slider and output styles for simulation panel
style(ebook): hide simulation panel in print.css
```

#### 7E.6 Gate

- `npm test` → 46/46
- 3 avisos visíveis na interface
- Nenhum fetch/XHR/WS no código
- `package.json` inalterado

---

### 8. Cronograma de Governança

```
┌─────────────────────────────────────────────────────────┐
│  Planejamento (atual)                                   │
│  ├── 13-spec.md ✅                                      │
│  ├── 14-test-plan.md ✅                                 │
│  ├── 15-risk-review.md ✅                               │
│  └── 16-implementation-plan.md ✅                       │
│                                                         │
│  Implementação (futura, após autorização)               │
│  ├── Branch: style/ebook-ecosabon-execucao-3            │
│  ├── Sublote 3A → Gate (30 testes)                      │
│  ├── Sublote 3B → Gate (33 testes)                      │
│  ├── Sublote 3C → Gate (40 testes)                      │
│  ├── Sublote 3D → Gate (40 testes + print + a11y)       │
│  ├── [Sublote 3E] → Gate (46 testes) [condicional]      │
│  ├── PR Review                                          │
│  └── Merge → main                                       │
└─────────────────────────────────────────────────────────┘
```

---

### 9. Commits Totais Estimados

| Sublote | Commits | Tipo |
|---------|---------|------|
| 3A | 3 | test + feat + style |
| 3B | 3 | test + feat + style |
| 3C | 4 | test + feat + feat + style |
| 3D | 2 | style + fix |
| 3E | 5 | test + feat + feat + style + style |
| **Total mínimo (sem C4)** | **12** | |
| **Total máximo (com C4)** | **17** | |

---

### 10. Checklist de Pré-Implementação

Antes de iniciar qualquer sublote:

- [ ] Branch `style/ebook-ecosabon-execucao-3` criada a partir de `main`
- [ ] `npm test` → 26/26 na branch nova
- [ ] `git status` limpo
- [ ] Documentos 13–16 commitados e disponíveis
- [ ] Autor autorizou a implementação da Execução 3
