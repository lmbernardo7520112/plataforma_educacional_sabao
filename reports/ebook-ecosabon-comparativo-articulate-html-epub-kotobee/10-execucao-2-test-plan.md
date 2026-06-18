# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 10b: Plano de Testes — Execução 2 (TDD)

**Branch:** `style/ebook-ecosabon-execucao-2`
**Data:** 2026-06-18

---

### 1. Testes Existentes Preservados

Todos os 10 testes da suíte anterior (`interactions.test.js`) devem ser mantidos integralmente. Nenhum teste será removido.

| # | Describe | Teste | Status |
|---|----------|-------|--------|
| 1 | `navigateToModule` | deve esconder todos os módulos e mostrar apenas o alvo | Preservado |
| 2 | `navigateToModule` | deve manter tudo escondido se o ID alvo não existir | Preservado |
| 3 | `toggleRevealBlock` | deve mostrar o bloco oculto e retornar true | Preservado |
| 4 | `toggleRevealBlock` | deve esconder o bloco visível ao chamar novamente | Preservado |
| 5 | `toggleRevealBlock` | deve atualizar aria-expanded no botão trigger | Preservado |
| 6 | `toggleRevealBlock` | deve retornar false se o bloco não existir | Preservado |
| 7 | `evaluateChecklist` | deve retornar allChecked=false quando nenhum item está marcado | Preservado |
| 8 | `evaluateChecklist` | deve retornar allChecked=false quando apenas alguns estão marcados | Preservado |
| 9 | `evaluateChecklist` | deve retornar allChecked=true quando TODOS estão marcados | Preservado |
| 10 | `evaluateChecklist` | deve retornar allChecked=false se o container não existir | Preservado |

**Adaptação necessária:** A função `navigateToModule` mudará de "alternar display" para "scroll para seção". Os testes de `navigateToModule` serão adaptados para validar `scrollIntoView` ao invés de toggle de classes.

---

### 2. Novos Testes Propostos

| # | Describe | Teste | Motivo | Comportamento Esperado | Critério de Falha |
|---|----------|-------|--------|----------------------|-------------------|
| T1 | `scrollToSection` | clique no item do sumário leva ao módulo correto | Validar navegação | `scrollIntoView` é chamado no elemento alvo | Elemento não recebe scroll ou erro JS |
| T2 | `setActiveNavItem` | módulo ativo é atualizado de modo seguro | Validar destaque visual | Apenas o item alvo recebe `aria-current="true"` e classe ativa | Múltiplos itens ativos ou nenhum |
| T3 | `setActiveNavItem` | não lança erro com ID inexistente | Robustez | Função retorna sem erro | Exceção lançada |
| T4 | `initScrollObserver` | fallback funciona sem IntersectionObserver | Degradação graciosa | Função retorna sem erro quando IO é undefined | Erro ou crash |
| T5 | `toggleRevealBlock` | blocos de revelação continuam funcionando (regressão) | Preservação | Toggle funciona como antes | Comportamento alterado |
| T6 | `evaluateChecklist` | checklist Go/No-Go continua funcionando (regressão) | Preservação | Checklist funciona como antes | Comportamento alterado |
| T7 | `scrollToSection` | não lança erro com ID inexistente | Robustez | Função retorna sem erro | Exceção lançada |
| T8 | `setActiveNavItem` | navegação por teclado permanece possível (focusable) | Acessibilidade | Links do sumário são focáveis | Links não focáveis |

---

### 3. Estratégia de Mock para JSDOM

JSDOM não implementa `IntersectionObserver`. A estratégia é:

1. **Lógica pura separada do DOM:** `setActiveNavItem(sectionId, doc)` é uma função pura que aceita `doc` como parâmetro;
2. **`initScrollObserver` detecta feature:** Se `IntersectionObserver` não existe, a função retorna imediatamente (fallback);
3. **Testes validam fallback:** O teste T4 garante que `initScrollObserver` não lança erro quando `IntersectionObserver` é `undefined`.

---

### 4. Testes de Regressão Implícitos

Testes existentes (1-10) cobrem automaticamente:
- `toggleRevealBlock` continua funcional;
- `evaluateChecklist` continua funcional;
- Navegação com ID inexistente não causa crash.

Não é necessário duplicar esses testes. Basta verificar que todos passam.
