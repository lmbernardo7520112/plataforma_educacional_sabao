# EcoSabon — Especificação SDD: Módulo Curso Interativo

*Nota: Este documento segue a metodologia Specification Driven Development (SDD) conforme a Seção 2 do SDD principal.*
**Rastreabilidade:** Este documento é a fonte primária de verdade para o workspace `curso-interativo/`.

---

## SEÇÃO 1 — VISÃO DO MÓDULO

**Nome do Módulo:** Curso Interativo EcoSabon
**Tipo:** E-learning standalone + componente React integrado
**Versão:** 1.0.0

**Declaração de Visão:**
Fornecer um curso interativo auto-contido que treina alunos no uso seguro e eficaz da plataforma EcoSabon, combinando imersão química, gamificação educativa e rigor científico. O curso funciona como aplicação web standalone (Nível 3), pacote SCORM 1.2 para LMS (Nível 2), e componente React nativo (Nível 4).

**Proposta de Valor:**
- Para o aluno: Jornada guiada de 24 lições com feedback instantâneo antes de tocar em reagentes reais
- Para o professor: Material didático pronto, testável no Moodle ou na própria plataforma
- Para a escola: Zero custo de licença (vs. R$8.000/ano do Articulate Rise 360)

---

## SEÇÃO 2 — REQUISITOS FUNCIONAIS

| ID | Requisito | Critério de Aceitação | Prioridade |
|---|---|---|---|
| RF-CUR-001 | Navegação sequencial bloqueada entre lições | Botão "Próxima" disabled até todos os blocos interativos completados | P0 |
| RF-CUR-002 | 8 tipos de blocos interativos renderizáveis | Cada tipo emite evento `completion` ao ser interagido completamente | P0 |
| RF-CUR-003 | Sorting Activity com validação e feedback visual | Itens corretos = verde; incorretos = vermelho + shake. Emite `completed` a 100% | P0 |
| RF-CUR-004 | Scenario Block com ramificação e feedback diferenciado | Opções exibem painel expandido (acerto=verde, erro=vermelho). Retry ilimitado | P0 |
| RF-CUR-005 | Flashcards com animação flip 3D | `rotateY(180deg)` com `preserve-3d` em ≤300ms | P1 |
| RF-CUR-006 | Persistência de progresso entre sessões | localStorage salva/restaura `ProgressState` | P0 |
| RF-CUR-007 | Funcionamento offline após primeiro carregamento | Service Worker cache-first para assets estáticos | P2 |
| RF-CUR-008 | Exportável como pacote SCORM 1.2 | Script gera .zip com `imsmanifest.xml` e wrapper API | P1 |
| RF-CUR-009 | Integrável como componente React na rota `/curso` | `<CourseViewer />` consome `content.ts` com acesso ao Zustand | P1 |
| RF-CUR-010 | Design pixel-identical ao Dark Science do EcoSabon | Tokens: `#0a0f1a`, `#3B82F6`, `#10B981`, `#F59E0B`, `#EF4444` | P0 |

---

## SEÇÃO 3 — REQUISITOS NÃO-FUNCIONAIS

| ID | Requisito | Métrica | Ferramenta de Validação |
|---|---|---|---|
| RNF-CUR-001 | Performance | FCP ≤ 1.5s em 4G | Lighthouse |
| RNF-CUR-002 | Acessibilidade | WCAG 2.1 AA (contraste ≥ 4.5:1) | axe-core / manual |
| RNF-CUR-003 | Responsividade | 360px, 768px, 1440px | DevTools Responsive |
| RNF-CUR-004 | Bundle Size | Standalone HTML ≤ 500KB (excl. imagens) | Build script output |
| RNF-CUR-005 | Cobertura de Testes | ≥ 80% branches + statements | Vitest + V8 |

---

## SEÇÃO 4 — ESTRUTURA DE CONTEÚDO

### 4.1 Módulos e Lições

| Módulo | Título | Lições | Mapeamento de Engenharia |
|---|---|---|---|
| 0 | Porta de Entrada: O Problema Invisível | 0.1, 0.2, 0.3 | Contextualização + Onboarding |
| 1 | Fundação do Laboratório Digital | 1.1, 1.2, 1.3 | Fase 1 (CRUD Mestre) |
| 2 | Segurança Máxima: O Jaleco Digital | 2.1, 2.2, 2.3 | Regras de Negócio (Hard Blocks) |
| 3 | A Precisão Científica | 3.1, 3.2, 3.3 | Fase 2 (Zod Firewalls) |
| 4 | Matemática e Termodinâmica do Sabão | 4.1, 4.2, 4.3, 4.4, 4.5 | Fase 3 (Saponification Engine) |
| 5 | Da Bancada ao Sabão | 5.1, 5.2, 5.3, 5.4, 5.5 | Fase 4 (Dashboard + PDF) |
| 6 | Governança do Professor | 6.1, 6.2, 6.3 | Fase 5 (RBAC + B2B) |
| 7 | Culminância: Embaixadores da Água | 7.1, 7.2 | Impacto Ambiental |

**Total:** 8 módulos, 24 lições, ~120 blocos interativos

### 4.2 Tipos de Blocos

| Tipo | Quantidade Estimada | Interatividade |
|---|---|---|
| TextBlock | ~30 | Passiva (leitura) |
| ProcessBlock | ~15 | Semi-ativa (navegação step) |
| Flashcards | ~10 | Ativa (flip) |
| Accordion | ~6 | Ativa (expand/collapse) |
| LabeledGraphic | ~10 | Ativa (hotspot click) |
| SortingActivity | ~12 | Ativa (drag-and-drop + validação) |
| ScenarioBlock | ~12 | Ativa (escolha + feedback) |
| ProgressTracker | 1 | Passiva (estado global) |

---

## SEÇÃO 5 — ARQUITETURA

### 5.1 Camadas Clean Architecture

```
┌──────────────────────────────────────────┐
│         Apresentação (UI)                │
│   VanillaRenderer │ ReactRenderer        │
├──────────────────────────────────────────┤
│         Aplicação (Use Cases)            │
│   NavigateLesson │ CompleteBlock          │
│   EvaluateSorting │ EvaluateScenario      │
├──────────────────────────────────────────┤
│         Domínio (Models + Services)      │
│   Course │ ProgressState                 │
│   ProgressTracker │ ContentValidator     │
├──────────────────────────────────────────┤
│         Infraestrutura (Adapters)        │
│   LocalStorageAdapter │ ZustandAdapter   │
│   ScormApiAdapter │ NullScormAdapter     │
└──────────────────────────────────────────┘
```

### 5.2 Regra de Dependência

A seta de dependência aponta SEMPRE para dentro:
- Apresentação → Aplicação → Domínio ← Infraestrutura
- O Domínio NUNCA importa das camadas externas
- A Infraestrutura implementa interfaces definidas na Aplicação (Ports)

---

## SEÇÃO 6 — RASTREABILIDADE

Cada artefato do projeto rastreia para um requisito:

```
RF-CUR-001 → ProgressTracker.ts → ProgressTracker.test.ts → Commit #4
RF-CUR-003 → EvaluateSorting.ts → EvaluateSorting.test.ts → Commit #7
RF-CUR-008 → ScormApiAdapter.ts → ScormApiAdapter.test.ts → Commit #9
```

---

*Documento vivo — atualizado a cada fase de implementação.*
