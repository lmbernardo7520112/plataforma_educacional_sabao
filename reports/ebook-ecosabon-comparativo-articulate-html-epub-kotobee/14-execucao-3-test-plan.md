# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 14: Plano de Testes — Execução 3 (TDD)

**Branch de planejamento:** `plan/ebook-ecosabon-execucao-3`
**Data:** 2026-06-19

---

### 1. Premissa

Todos os **26 testes da Execução 2** devem continuar passando sem modificação. Nenhum teste existente pode ser removido ou enfraquecido.

Os novos testes abaixo cobrem exclusivamente as funções e componentes adicionados na Execução 3.

---

### 2. Inventário de Testes Existentes (26 — Execução 2)

| # | Bloco | Quantidade | Status |
|---|-------|-----------|--------|
| 1-10 | Funções preservadas da Execução 1 | 10 | ✅ Preservar |
| 11-17 | scrollToSection | 7 | ✅ Preservar |
| 18-20 | setActiveNavItem | 3 | ✅ Preservar |
| 21-24 | initScrollObserver | 4 | ✅ Preservar |
| 25-26 | toggleSidebar | 2 | ✅ Preservar |
| **Total** | | **26** | |

---

### 3. Novos Testes Planejados — Componente C1 (Cartões Interativos)

| # | Teste | Função Alvo | Descrição |
|---|-------|------------|-----------|
| T27 | Cartão de estação tem cabeçalho visual | DOM | Verificar que `#estacao-1` contém `.station-card__header` com conteúdo |
| T28 | Cartão de estação tem grid de campos | DOM | Verificar que cada estação contém `.station-card__grid` com ≥ 4 filhos |
| T29 | Blocos de revelação preservados nos cartões | `toggleRevealBlock()` | Regressão: confirmar que `reveal-e1-planob`, `reveal-e2-planob`, `reveal-e3-planob` continuam alternando |
| T30 | Cartão de estação possui ícone SVG | DOM | Verificar presença de `<svg>` dentro de `.station-card__header` |

---

### 4. Novos Testes Planejados — Componente C2 (Infográfico da Saponificação)

| # | Teste | Função Alvo | Descrição |
|---|-------|------------|-----------|
| T31 | Infográfico existe no DOM | DOM | Verificar que `#infografico-saponificacao` está presente no `index.html` |
| T32 | Infográfico contém reagentes e produtos | DOM | Verificar presença de texto/elementos contendo "Triglicerídeo", "NaOH", "Sabão", "Glicerol" |
| T33 | Infográfico contém seta de reação | DOM | Verificar presença de elemento visual de seta (SVG ou CSS) |

---

### 5. Novos Testes Planejados — Componente C3 (Visualizador de Rotação)

| # | Teste | Função Alvo | Descrição |
|---|-------|------------|-----------|
| T34 | Clicar em estação no mapa rola para a estação | `scrollToStation()` | Verificar que `scrollToStation('estacao-1', doc)` chama `scrollToSection('estacao-1', doc)` |
| T35 | `scrollToStation()` retorna false para ID inexistente | `scrollToStation()` | Verificar robustez com ID `'estacao-99'` |
| T36 | `scrollToStation()` retorna false sem document | `scrollToStation()` | Verificar segurança quando `doc` é null |
| T37 | `initStationMap()` registra event listeners | `initStationMap()` | Verificar que a função não lança erro e retorna contagem de estações mapeadas |
| T38 | `initStationMap()` retorna 0 sem `.classroom-diagram__station` | `initStationMap()` | Degradação graciosa sem elementos |
| T39 | Nó de estação no mapa tem `role="button"` | DOM | Acessibilidade: verificar atributo ARIA |
| T40 | Nó de estação no mapa tem `tabindex="0"` | DOM | Acessibilidade: verificar navegabilidade por teclado |

---

### 6. Novos Testes Planejados — Componente C4 (Simulação Demonstrativa — Condicional)

> **Nota:** Os testes de C4 só serão implementados se C1, C2 e C3 estiverem concluídos e todos os testes passando.

| # | Teste | Função Alvo | Descrição |
|---|-------|------------|-----------|
| T41 | `updateSimulation()` retorna valores para entradas válidas | `updateSimulation()` | Verificar que entradas `{ ratio: 1.5, temp: 60, time: 30 }` retornam objeto com `estimatedPh` e `consistency` |
| T42 | `updateSimulation()` retorna valores default para entradas nulas | `updateSimulation()` | Verificar degradação com `null`, `undefined`, `NaN` |
| T43 | `updateSimulation()` não persiste dados | `updateSimulation()` | Confirmar que a função é pura — sem side effects de localStorage ou fetch |
| T44 | `updateSimulation()` retorna false sem document | `updateSimulation()` | Segurança em ambiente sem DOM |
| T45 | Painel de simulação exibe aviso de dados fictícios | DOM | Verificar presença de `[SIMULAÇÃO DEMONSTRATIVA]` ou `[DADOS FICTÍCIOS]` |
| T46 | Simulação não faz chamadas de rede | `updateSimulation()` | Confirmar ausência de `fetch`, `XMLHttpRequest`, `WebSocket` no código da função |

---

### 7. Resumo de Cobertura

| Componente | Testes Novos | Tipo |
|-----------|-------------|------|
| C1 — Cartões Interativos | T27–T30 | DOM + Regressão |
| C2 — Infográfico | T31–T33 | DOM |
| C3 — Mapa de Estações | T34–T40 | Funcional + DOM + A11y |
| C4 — Simulação (condicional) | T41–T46 | Funcional + DOM + Segurança |
| **Total mínimo (sem C4)** | **14** | |
| **Total máximo (com C4)** | **20** | |

---

### 8. Estratégia de Teste

#### 8.1 Ambiente

- **Runner:** Vitest
- **DOM:** JSDOM
- **Mocks necessários:**
  - `scrollIntoView` → mock (JSDOM não implementa)
  - `IntersectionObserver` → mock existente preservado
  - `addEventListener` → spy para verificar registro de listeners (C3)

#### 8.2 Ordem de Implementação (TDD Clássico)

1. Escrever testes T27–T30 (C1) → **Red**
2. Implementar cartões HTML + CSS → **Green**
3. Refatorar → **Refactor**
4. Escrever testes T31–T33 (C2) → **Red**
5. Implementar infográfico HTML/SVG + CSS → **Green**
6. Refatorar → **Refactor**
7. Escrever testes T34–T40 (C3) → **Red**
8. Implementar `scrollToStation()` + `initStationMap()` + HTML interativo → **Green**
9. Refatorar → **Refactor**
10. **Gate:** Rodar `npm test` — todos os 26 + 14 = **40 testes devem passar**
11. Se aprovado: escrever testes T41–T46 (C4) → **Red**
12. Implementar `updateSimulation()` + painel HTML → **Green**
13. Refatorar → **Refactor**
14. **Gate final:** Rodar `npm test` — todos os 46 testes devem passar

#### 8.3 Critérios de Não-Regressão

- Nenhum teste T1–T26 pode falhar após qualquer alteração;
- Se um teste T1–T26 falhar, a implementação está errada — **não o teste**;
- A Execução 3 não pode enfraquecer nenhum gate de fallback ou acessibilidade.

---

### 9. Assinaturas de Funções Planejadas

```javascript
// C3 — Mapa de estações
export function scrollToStation(stationId, doc) → boolean
export function initStationMap(doc) → number

// C4 — Simulação demonstrativa (condicional)
export function updateSimulation({ ratio, temp, time }, doc) → {
  estimatedPh: number,
  consistency: string,
  warning: string
} | null
```

Todas as funções devem seguir o padrão de segurança estabelecido na Execução 2:

```javascript
const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);
if (!safeDoc) return <valor_default>;
```

---

### 10. Governança TDD

| Gate | Critério | Status |
|------|----------|--------|
| G-TDD-1 | Plano de testes criado antes da implementação | ✅ (este documento) |
| G-TDD-2 | Testes escritos antes do código (Red) | Pendente |
| G-TDD-3 | Código escrito apenas para passar testes (Green) | Pendente |
| G-TDD-4 | Refatoração sem quebrar testes (Refactor) | Pendente |
| G-TDD-5 | 26 testes existentes preservados | Pendente |
| G-TDD-6 | npm test final com 0 falhas | Pendente |
