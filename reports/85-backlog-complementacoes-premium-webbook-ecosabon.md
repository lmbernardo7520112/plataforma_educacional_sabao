# 📋 Relatório 85 — Backlog de Complementações Premium do Web-Book EcoSabon

| Campo              | Valor                                                        |
|--------------------|--------------------------------------------------------------|
| **Fase**           | WBC-MAP — Mapeamento de Complementação Premium               |
| **Data**           | 2026-06-23                                                   |
| **Referência**     | Council R83, Lacunas R84                                      |

---

## Nível 1 — Complementações Narrativas/Interativas Leves

### 1.1. Seção "Do Web-book à Plataforma EcoSabon"

| Campo | Valor |
|-------|-------|
| **Descrição** | Nova seção (penúltima) com 3–5 cards reveláveis explicando que o web-book é vitrine de uma plataforma maior. |
| **Objetivo** | Comunicar que o EcoSabon é ecossistema, não apenas e-book. |
| **Valor como vitrine** | 🔴 Crítico — resolve a lacuna #1. |
| **Padrão** | Reutilizar `reveal.js` (padrão existente). |
| **Complexidade** | Baixa. |
| **Risco** | Baixo — usa padrão consolidado. |
| **Dependência** | Nenhuma. |
| **Teste necessário** | Vitest: abertura/fechamento, acessibilidade, estado. |
| **Impacto acessibilidade** | `aria-expanded`, `aria-controls`, `role="button"`. |
| **Impacto impressão** | Cards expandidos no `print.css`. |
| **Impacto offline** | ✅ Zero — sem rede. |
| **Prioridade** | **P1**. |

### 1.2. Cards de Papéis: Professor, Squad, Plataforma

| Campo | Valor |
|-------|-------|
| **Descrição** | 3 cards reveláveis com ícone + título + descrição de cada papel no ecossistema. |
| **Objetivo** | Representar que a plataforma tem atores diferenciados. |
| **Valor como vitrine** | 🟡 Alto. |
| **Padrão** | Cards reveláveis ou flip cards CSS. |
| **Complexidade** | Baixa. |
| **Risco** | Baixo. |
| **Dependência** | Seção 1.1. |
| **Teste necessário** | Vitest: interação, estado, acessibilidade. |
| **Impacto acessibilidade** | `aria-label`, texto equivalente na face traseira. |
| **Impacto impressão** | Ambas as faces visíveis. |
| **Impacto offline** | ✅ Zero. |
| **Prioridade** | **P3**. |

### 1.3. Mini-Diagrama da Jornada EcoSabon

| Campo | Valor |
|-------|-------|
| **Descrição** | Diagrama visual simplificado: Explorar → Investigar → Submeter → Feedback → Progresso. |
| **Objetivo** | Mostrar ciclo completo de aprendizagem da plataforma. |
| **Valor como vitrine** | 🟡 Alto. |
| **Padrão** | SVG inline ou CSS Grid, `role="img"`, `aria-label`. |
| **Complexidade** | Baixa. |
| **Risco** | Baixo. |
| **Dependência** | Seção 1.1. |
| **Teste necessário** | Vitest: renderização, acessibilidade. |
| **Impacto acessibilidade** | `<title>` + `<desc>` no SVG, ou `aria-label`. |
| **Impacto impressão** | Visível estático. |
| **Impacto offline** | ✅ Zero. |
| **Prioridade** | **P2**. |

### 1.4. Cards Reveláveis de Governança/Hardening

| Campo | Valor |
|-------|-------|
| **Descrição** | 4 cards na seção governança existente: H1 (motor/JWT), H2 (CORS/env), H3 (schemas/logs), H4 (RBAC). |
| **Objetivo** | Comunicar profundidade técnica dentro do web-book. |
| **Valor como vitrine** | 🟡 Alto. |
| **Padrão** | Reutilizar `reveal.js`. |
| **Complexidade** | Baixa. |
| **Risco** | Baixo. |
| **Dependência** | Nenhuma (seção governança já existe). |
| **Teste necessário** | Vitest: interação, estado. |
| **Impacto impressão** | Expandido. |
| **Impacto offline** | ✅ Zero. |
| **Prioridade** | **P2**. |

### 1.5. CTA "Conheça a Plataforma"

| Campo | Valor |
|-------|-------|
| **Descrição** | Frase + botão visual ao final: "Este web-book é uma demonstração. A Plataforma EcoSabon vai além." |
| **Objetivo** | Transição narrativa web-book → plataforma. |
| **Valor como vitrine** | 🟡 Alto. |
| **Padrão** | HTML/CSS estático. |
| **Complexidade** | Mínima. |
| **Risco** | Baixo. |
| **Dependência** | Seção 1.1. |
| **Prioridade** | **P1** (acompanha a seção). |

---

## Nível 2 — Complementações Interativas Médias

### 2.1. Flip Cards de Papéis da Plataforma

| Campo | Valor |
|-------|-------|
| **Descrição** | 3 flip cards com CSS `transform: rotateY()`: frente (ícone + papel), verso (descrição + ações). |
| **Objetivo** | Interação tátil que comunica papéis com elegância. |
| **Valor como vitrine** | 🟡 Alto. |
| **Padrão** | CSS 3D + `aria-live="polite"`. |
| **Complexidade** | Média. |
| **Risco** | Médio — acessibilidade do flip requer cuidado. |
| **Teste necessário** | Vitest: flip, teclado, `aria-live`, `prefers-reduced-motion`. |
| **Impacto impressão** | Ambas as faces visíveis. |
| **Prioridade** | **P3** (upgrade dos cards 1.2 se aprovados). |

### 2.2. Timeline da Jornada de Aprendizagem

| Campo | Valor |
|-------|-------|
| **Descrição** | Stepper horizontal interativo: 5 etapas com clique/teclado para revelar descrição. |
| **Objetivo** | Representar o ciclo de missão de forma engajante. |
| **Padrão** | CSS Grid + `role="list"` + `aria-current="step"`. |
| **Complexidade** | Média. |
| **Risco** | Baixo. |
| **Teste necessário** | Vitest: navegação, estado, acessibilidade. |
| **Impacto impressão** | Linear com todas as descrições. |
| **Prioridade** | **P4**. |

### 2.3. Mapa de Missões

| Campo | Valor |
|-------|-------|
| **Descrição** | 3–5 cards representando missões pedagógicas: título, ícone, resumo, etapas. Com disclaimer. |
| **Objetivo** | Mostrar o conceito de missão da plataforma. |
| **Padrão** | Cards reveláveis + disclaimer visual "demonstração de conceito". |
| **Complexidade** | Média. |
| **Risco** | 🟡 Médio — parecer feature real. Mitigar com disclaimer. |
| **Teste necessário** | Vitest: interação, disclaimer presente. |
| **Prioridade** | **P4**. |

### 2.4. Painel de Progresso Demonstrativo

| Campo | Valor |
|-------|-------|
| **Descrição** | Barra de progresso fictícia com dados ilustrativos e disclaimer explícito. |
| **Objetivo** | Mostrar que a plataforma pode acompanhar progresso. |
| **Padrão** | CSS `width` + `role="progressbar"` + disclaimer `aria-label`. |
| **Complexidade** | Média. |
| **Risco** | 🔴 Alto — pode parecer dado real. Disclaimer obrigatório. |
| **Teste necessário** | Vitest: disclaimer, `aria-valuenow`, print. |
| **Prioridade** | **P5**. |

### 2.5. Hotspots em Diagrama da Plataforma

| Campo | Valor |
|-------|-------|
| **Descrição** | SVG interativo do ecossistema EcoSabon (5 camadas) com hotspots reutilizando `hotspots.js`. |
| **Objetivo** | Representar visualmente a arquitetura da plataforma. |
| **Padrão** | SVG inline + `hotspots.js` + `<title>` + `<desc>`. |
| **Complexidade** | Média-Alta (design SVG + hotspots + print). |
| **Risco** | Baixo. |
| **Teste necessário** | Vitest: hotspots, teclado, print, acessibilidade. |
| **Prioridade** | **P2**. |

### 2.6. Card de Decisão Docente Simulada

| Campo | Valor |
|-------|-------|
| **Descrição** | "O professor pode:" com opções reveláveis (criar turma, acompanhar, ver dossiê). |
| **Objetivo** | Representar o papel ativo do docente. |
| **Padrão** | Cards reveláveis + disclaimer. |
| **Complexidade** | Baixa-Média. |
| **Risco** | 🟡 Médio — não prometer feature. |
| **Prioridade** | **P6**. |

---

## Nível 3 — Complementações Premium Avançadas

### 3.1. Simulação Visual Professor → Squad → Missão → Feedback

| Campo | Valor |
|-------|-------|
| **Descrição** | Walkthrough animado do fluxo completo da plataforma. |
| **Complexidade** | Alta. |
| **Risco** | 🔴 Alto — pode parecer feature real. |
| **Prioridade** | **P7** — apenas se Níveis 1–2 aprovados. |

### 3.2. Mini-Dashboard Pedagógico Fictício

| Campo | Valor |
|-------|-------|
| **Descrição** | Dashboard visual com gráficos fictícios de progresso de squads. |
| **Complexidade** | Alta. |
| **Risco** | 🔴 Alto — screenshot pode ser usado fora de contexto. |
| **Prioridade** | **P5** — requer disclaimers visuais fortes. |

### 3.3. Diagrama Interativo de Arquitetura

| Campo | Valor |
|-------|-------|
| **Descrição** | SVG com camadas clicáveis: Conteúdo → Curso → Backend → Domínio → Governança. |
| **Complexidade** | Média-Alta. |
| **Risco** | Baixo. |
| **Prioridade** | **P2** (versão simplificada) ou **P7** (versão completa). |

### 3.4. Integração Visual Premium 3D ↔ Missão Pedagógica

| Campo | Valor |
|-------|-------|
| **Descrição** | Conectar a visualização 3D a uma "missão" contextual (ex: "identifique os reagentes"). |
| **Complexidade** | Alta. |
| **Risco** | 🟡 Médio — requer design cuidadoso. |
| **Prioridade** | **P7**. |

### 3.5. Camada "Modo Plataforma" no Web-Book

| Campo | Valor |
|-------|-------|
| **Descrição** | Toggle visual que alterna entre "modo conteúdo" e "modo plataforma". |
| **Complexidade** | Muito Alta. |
| **Risco** | 🔴 Alto — pode confundir. |
| **Prioridade** | **Não recomendado neste ciclo.** |

---

## Padrão de Qualidade Obrigatório (15 critérios)

Qualquer complementação futura DEVE:

| # | Critério |
|---|---------|
| 1 | Preservar o web-book atual integralmente (B1+B2+C3). |
| 2 | Ser incremental — aditiva, nunca substitutiva. |
| 3 | Manter navegação, sidebar e paginação intactas. |
| 4 | Ser testada com Vitest antes de merge. |
| 5 | Funcionar 100% offline (zero chamadas de rede). |
| 6 | Ter fallback de impressão em `print.css`. |
| 7 | Ter acessibilidade por teclado (Tab, Enter, Escape). |
| 8 | Ter texto equivalente (`aria-label`, `<title>`, `<desc>`). |
| 9 | Não coletar dados reais. |
| 10 | Usar dados fictícios com disclaimer visual explícito. |
| 11 | Declarar claramente quando algo é demonstrativo. |
| 12 | Preservar linguagem de produto-vitrine. |
| 13 | Não transformar o web-book em produto final. |
| 14 | Não iniciar validação real. |
| 15 | Manter compatibilidade com PDF (print.css). |

---

## Priorização Recomendada pelo Council

| Prioridade | Complementação | Nível | Complexidade | Risco |
|-----------|---------------|-------|-------------|-------|
| **P0** | Não mexer no Premium 3D consolidado. | — | — | — |
| **P1** | Seção "Do Web-book à Plataforma" + CTA | 1 | Baixa | Baixo |
| **P2** | Diagrama SVG da plataforma + cards governança H1–H4 | 1–2 | Baixa-Média | Baixo |
| **P3** | Flip cards de papéis (Professor, Squad, Plataforma) | 1–2 | Média | Baixo |
| **P4** | Timeline de jornada + mapa de missões + card cálculo | 2 | Média | Médio |
| **P5** | Painel de progresso + mini-dashboard com disclaimer | 2–3 | Média-Alta | Alto |
| **P6** | Cards de decisão docente + feedback formativo | 2 | Baixa-Média | Médio |
| **P7** | Integrações avançadas (3D↔missão, walkthrough, modo plataforma) | 3 | Alta | Alto |

**Justificativa:** P1 resolve a lacuna mais crítica (ecossistema invisível) com o menor risco e a menor complexidade. A sequência avança do mais seguro para o mais arriscado.
