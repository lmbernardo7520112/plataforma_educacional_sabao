# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 17: Relatório da Execução 3 (Parcial: Sublotes 3A–3D)

**Branch:** `style/ebook-ecosabon-execucao-3`
**Base:** `main` (pós-merge da Execução 2, commit `022e0cc`)
**Data:** 2026-06-19

---

### 1. Baseline de Placeholders (registrado antes de alterações)

| Marcador | Contagem Pré | Contagem Pós | Status |
|----------|-------------|-------------|--------|
| `DADOS FICTÍCIOS` | 2 | 2 | ✅ Preservado |
| `habilidade BNCC` | 1 | 1 | ✅ Preservado |
| `CEP` | 1 | 1 | ✅ Preservado |
| `TCLE` | 0 | 0 | ✅ Preservado |

---

### 2. Resumo por Sublote

#### Sublote 3A — Cartões Interativos de Estação (C1)

- **Status:** ✅ Concluído
- Cartões de estação redesenhados com classes BEM `.station-card__*`
- Cabeçalho visual colorido por estação (verde, âmbar, violeta)
- Ícone SVG inline identificador em cada cabeçalho
- Campos de dados organizados em `.station-card__grid` (2 colunas desktop, 1 mobile)
- Efeito hover/focus sutil por estação
- Blocos de revelação (Plano B, Erro, Dica) preservados integralmente
- Todo conteúdo pedagógico preservado verbatim

#### Sublote 3B — Infográfico da Saponificação (C2)

- **Status:** ✅ Concluído
- Infográfico CSS/SVG inline criado em `#infografico-saponificacao`
- Representação visual: Triglicerídeo + 3 NaOH → 3 Sabão + Glicerol
- Ícones moleculares SVG com bordas diferenciadas (reagentes: verde, produtos: âmbar)
- Seta de reação SVG
- Rótulos didáticos com sublabels
- Responsivo: layout vertical em mobile com seta rotacionada
- Sem imagens externas
- Sem valores numéricos experimentais
- Sem afirmação de validade científica

#### Sublote 3C — Visualizador de Rotação Interativo (C3)

- **Status:** ✅ Concluído
- Diagrama de sala transformado em mapa interativo
- `data-station`, `role="button"`, `tabindex="0"`, `aria-label` em cada nó
- Clique/toque rola suavemente até a estação correspondente
- Suporte a teclado (Enter + Space)
- Novas funções: `scrollToStation()`, `initStationMap()`
- `app.js` atualizado para inicializar o mapa
- Instrução visual: "Clique ou toque em uma estação para navegar"

#### Sublote 3D — Impressão e Acessibilidade

- **Status:** ✅ Concluído
- `print.css` atualizado com regras para:
  - Station cards: cabeçalhos linearizados, `page-break-inside: avoid`
  - Infográfico: contornos sem fundos pesados, layout horizontal forçado
  - Diagrama: cursor estático, bordas preservadas
- Focus-visible em nós do diagrama
- Cursor pointer em estações interativas

---

### 3. Arquivos Alterados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | +92/-17 — Cartões BEM, infográfico SVG, mapa interativo ARIA |
| `src/scripts/interactions.js` | +46 — `scrollToStation()`, `initStationMap()` |
| `src/scripts/app.js` | +5/-1 — Importar e inicializar `initStationMap()` |
| `src/styles/main.css` | +189 — Estilos C1, C2, C3, responsivo |
| `src/styles/print.css` | +57 — Impressão para componentes enriquecidos |
| `tests/interactions.test.js` | +209 + 81 — Testes T27–T40 + Smoke T41–T50 contra HTML real |

---

### 4. Commits Realizados

| # | Hash | Mensagem |
|---|------|----------|
| 1 | `55630a3` | `test(ebook): add tests for enriched station cards, infographic and station map (T27-T40)` |
| 2 | `33fb006` | `feat(ebook): add scrollToStation and initStationMap functions (C3)` |
| 3 | `00fdb75` | `feat(ebook): redesign station cards, add infographic and interactive map (C1+C2+C3)` |
| 4 | `354ac91` | `style(ebook): add CSS for enriched station cards, infographic and interactive map` |
| 5 | `a36052c` | `feat(ebook): initialize interactive station map in app.js` |
| 6 | `70c8f51` | `style(ebook): adjust print.css for enriched components (3D)` |

---

### 5. Testes

#### Testes Adicionados (T27–T40)

| # | Teste | Status |
|---|-------|--------|
| T27 | Cartão tem cabeçalho visual com conteúdo | ✅ |
| T28 | Cartão tem grid de campos ≥ 4 filhos | ✅ |
| T29 | Blocos de revelação preservados | ✅ |
| T30 | Cartão possui ícone SVG no cabeçalho | ✅ |
| T31 | Infográfico existe no DOM | ✅ |
| T32 | Infográfico contém reagentes e produtos | ✅ |
| T33 | Infográfico contém seta de reação SVG | ✅ |
| T34 | scrollToStation rola para estação | ✅ |
| T35 | scrollToStation retorna false para ID inexistente | ✅ |
| T36 | scrollToStation retorna false sem document | ✅ |
| T37 | initStationMap registra estações | ✅ |
| T38 | initStationMap retorna 0 sem estações | ✅ |
| T39 | Nó de estação tem `role="button"` | ✅ |
| T40 | Nó de estação tem `tabindex="0"` | ✅ |

#### Testes de Smoke — HTML Real (T41–T50)

Adicionados via ultramicrocorreção QA/TDD pré-PR. Lêem o arquivo real `index.html` via `fs.readFileSync` + JSDOM.

| # | Teste | Status |
|---|-------|--------|
| T41 | 3 cartões com `.station-card` no HTML real | ✅ |
| T42 | Cada cartão possui `.station-card__header` | ✅ |
| T43 | Cada cartão possui `.station-card__grid` | ✅ |
| T44 | `#infografico-saponificacao` existe | ✅ |
| T45 | Infográfico contém reagentes e produtos | ✅ |
| T46 | Mapa possui nós com `data-station` | ✅ |
| T47 | Nós do mapa possuem `role`, `tabindex`, `aria-label` | ✅ |
| T48 | Contagem de "DADOS FICTÍCIOS" ≥ baseline (2) | ✅ |
| T49 | "habilidade BNCC" preservada | ✅ |
| T50 | Nenhum sinal de C4/3E (slider, range, simulation) | ✅ |

#### Resultado Final

```
Test Files  1 passed (1)
     Tests  50 passed (50)
  Duration  ~600ms
```

- **26 testes Execução 1+2:** ✅ Todos preservados
- **14 testes unitários Execução 3 (T27–T40):** ✅ Todos passando
- **10 testes smoke HTML real (T41–T50):** ✅ Todos passando
- **Total:** 50/50 ✅

---

### 6. Confirmações de Governança

| Confirmação | Status |
|------------|--------|
| C4/3E (simulação) **NÃO** implementado | ✅ |
| Nenhum slider implementado | ✅ |
| Nenhum cálculo de pH/temperatura/consistência/proporção | ✅ |
| Nenhum `localStorage` ou `sessionStorage` | ✅ |
| Nenhuma exportação de respostas docentes | ✅ |
| Nenhuma coleta de dados | ✅ |
| Nenhum formulário real de pesquisa adicionado | ✅ |
| Nenhum `fetch`, `XMLHttpRequest`, `WebSocket` adicionado | ✅ |
| Nenhum `FormData` adicionado | ✅ |
| `docs/` e `anexos/` **NÃO** alterados | ✅ |
| `package.json` **NÃO** alterado | ✅ |
| Nenhuma dependência nova | ✅ |
| Nenhum framework adicionado | ✅ |
| Nenhum CDN | ✅ |
| Nenhuma API externa | ✅ |
| Nenhuma imagem externa | ✅ |
| Nenhuma fonte externa (além da Google Fonts já existente) | ✅ |
| Rubrica não alterada | ✅ |
| BNCC não alterado | ✅ |
| Formulário de validação não alterado | ✅ |
| Checklist Go/No-Go não alterado | ✅ |
| Placeholders preservados (contagem idêntica ao baseline) | ✅ |
| Avisos éticos preservados | ✅ |
| Conteúdo pedagógico preservado verbatim | ✅ |

---

### 7. Gates de Governança

| Gate | Critério | Status |
|------|----------|--------|
| G1 — SDD | Documento 13 criado antes da implementação | ✅ |
| G2 — TDD | Documento 14 criado antes da implementação | ✅ |
| G3 — Risco | Documento 15 criado antes da implementação | ✅ |
| G4 — Plano | Documento 16 criado antes da implementação | ✅ |
| G5 — Testes existentes | 26/26 preservados | ✅ |
| G6 — Testes novos | 24 adicionados (T27–T50) | ✅ |
| G7 — Clean Code | Funções pequenas, nomeadas, sem código morto | ✅ |
| G8 — Acessibilidade | role, tabindex, aria-label, focus-visible | ✅ |
| G9 — Impressão | print.css ajustado para C1, C2, C3 | ✅ |
| G10 — Governança Acadêmica | Placeholders preservados | ✅ |
| G11 — Commits | 8 commits semânticos e rastreáveis | ✅ |
| G12 — npm test | 50/50 passando | ✅ |
| G13 — Smoke HTML real | T41–T50 validam HTML de produção | ✅ |

---

### 8. Riscos Residuais

| Risco | Severidade | Observação |
|-------|-----------|------------|
| Infográfico pode ser impreciso em tamanho de ícone em navegadores muito antigos | Baixa | SVG inline é amplamente suportado |
| Contraste dos sublabels do infográfico pode ser marginal em impressão | Baixa | Definido como `#555` que é >= 4.5:1 sobre branco |

---

### 9. Recomendações

#### 9.1 Abertura de PR

**Recomendação: abrir PR** da branch `style/ebook-ecosabon-execucao-3` para `main` após inspeção visual do autor.

#### 9.2 Sobre C4 (Simulação Demonstrativa)

O componente C4 (simulação demonstrativa de parâmetros) foi deliberadamente **não implementado** nesta execução, conforme autorização. Recomendações:

- **Adiar para Execução 4** ou deliberar separadamente;
- Se implementado no futuro, deve seguir rigorosamente o plano de contingência do documento 15;
- Exigirá 3 avisos visuais obrigatórios na interface;
- Deve ser função pura sem side effects, persistência ou rede.

---

### 10. Ultramicrocorreção QA/TDD (pré-PR)

**Motivo:** Reforçar rastreabilidade garantindo que o HTML real (`index.html`) seja validado automaticamente, não apenas o DOM sintético dos testes unitários.

**Alterações:**
- Adicionados 10 testes de smoke (T41–T50) em `tests/interactions.test.js`
- Atualizado este relatório (`17-execucao-3-relatorio.md`)

**Confirmações:**
- HTML **NÃO** alterado
- CSS **NÃO** alterado
- JS de produção **NÃO** alterado
- C4/3E continua **bloqueado** (verificado automaticamente por T50)
- `npm test`: 50/50 ✅
