# Relatório 87 — Implementação P1: Do Web-book à Plataforma EcoSabon

**Fase:** WBC-P1 — Seção "Do Web-book à Plataforma EcoSabon"  
**Branch:** `feat/ecosabon-webbook-platform-showcase-p1`  
**Base:** `main` (pós-merge PRs #31, #33, #34)  
**Data:** 2026-06-23  

---

## 1. Escopo Entregue

Nova seção incremental adicionada ao web-book (`ebook-ecosabon-prototipo/`):

| Componente | Descrição |
|---|---|
| **Mapa SVG do ecossistema** | Diagrama de 5 camadas (Conteúdo, Curso, Backend, Domínio, Governança) com "Você está aqui" |
| **5 Hotspots de plataforma** | Botões interativos com painéis explicativos (one-at-a-time) |
| **3 Flip cards de papéis** | Professor, Squad/Bancada, Plataforma — com animação CSS e fallback |
| **Jornada de aprendizagem** | Timeline visual com 6 etapas (Explorar → Dossiê) |
| **Grid Real/Demo/Roadmap** | Transparência total sobre o que é funcional, ilustrativo e futuro |
| **Governança e limites** | Card com 7 declarações de limite honesto |
| **CTA narrativo** | "O web-book é a porta de entrada. A plataforma é o edifício." |
| **Disclaimer** | Aviso explícito de dados fictícios e demonstração visual |

---

## 2. Arquivos Modificados/Criados

| Arquivo | Ação |
|---|---|
| `ebook-ecosabon-prototipo/index.html` | Sidebar + seção completa (≈320 linhas) |
| `ebook-ecosabon-prototipo/src/scripts/platform-showcase.js` | Novo módulo JS (147 linhas) |
| `ebook-ecosabon-prototipo/src/scripts/app.js` | Import + init do novo módulo |
| `ebook-ecosabon-prototipo/src/scripts/interactions.js` | Re-export das funções novas |
| `ebook-ecosabon-prototipo/src/styles/main.css` | +330 linhas CSS (hotspots, flip cards, timeline, grid, CTA) |
| `ebook-ecosabon-prototipo/src/styles/print.css` | +125 linhas para impressão |
| `ebook-ecosabon-prototipo/tests/interactions.test.js` | +20 testes (T105–T124) |

---

## 3. Testes

| Suite | Resultado |
|---|---|
| Ebook | 124/124 ✅ (20 novos: T105–T124) |
| Root | 8/8 ✅ |
| Server (unit) | 47/47 ✅ |
| Server (integration) | 40/40 ✅ |
| **Total** | **219/219** ✅ |

### Testes Novos (P1)

- **T105–T109**: Hotspots de plataforma (open, close, one-at-a-time, edge cases)
- **T110–T113**: Flip cards (flip, unflip, edge case, ARIA live)
- **T114–T116**: Inicialização (count, empty DOM, null)
- **T117–T124**: Smoke tests HTML real (seção, disclaimer, hotspots, cards, jornada, sidebar, integridade, print)

---

## 4. Conformidade Modo Estrito

| Critério | Status |
|---|---|
| Zero código de backend alterado | ✅ |
| Zero dados reais ou coleta | ✅ |
| Zero fetch/localStorage/WebSocket | ✅ (testado em T123) |
| Disclaimer visível | ✅ ("dados fictícios e ilustrativos") |
| Acessibilidade (aria-*, keyboard, role) | ✅ |
| Print fallback | ✅ (print.css + `.print-only`) |
| Offline-first preservado | ✅ |
| RC1 Premium 3D intocada | ✅ |
| Lint 0 errors | ✅ (26 warnings pre-existentes) |

---

## 5. Decisão Técnica

- **Módulo isolado**: `platform-showcase.js` segue o mesmo padrão de `hotspots.js` e `reveal.js` — funções puras com `doc` injetável para testabilidade
- **CSS animado com `prefers-reduced-motion`**: respeita preferências de acessibilidade
- **Flip cards via CSS transform**: sem dependência de JavaScript para a animação visual
- **One-at-a-time hotspots**: padrão idêntico ao infográfico de saponificação

---

## 6. Próximos Passos Recomendados

1. **Commit e PR #35** para merge na `main`
2. **P2–P7** conforme backlog R85 (quiz demonstrativo, missão fictícia, dashboard mockup, etc.)
3. **Validação visual** com stakeholders antes de avançar para P2
