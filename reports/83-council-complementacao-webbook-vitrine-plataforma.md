# 📋 Relatório 83 — Council de Complementação Premium do Web-Book como Vitrine da Plataforma

| Campo              | Valor                                                        |
|--------------------|--------------------------------------------------------------|
| **Fase**           | WBC-MAP — Mapeamento de Complementação Premium               |
| **Data**           | 2026-06-23                                                   |
| **Branch**         | `docs/ecosabon-webbook-premium-complementation-map`           |
| **Formato**        | Deliberação de Council (9 especialistas)                      |

---

## Composição do Council

| # | Especialista | Foco |
|---|-------------|------|
| 1 | Produto Educacional Digital | Representação da plataforma educacional |
| 2 | UX/UI Educacional | Fluxo, cards, hotspots, microinterações |
| 3 | Ensino de Química | Saponificação, Química Verde, investigação |
| 4 | Gamificação Responsável | Missões, squads, progresso, badges |
| 5 | Acessibilidade | Fallback textual, teclado, ARIA, impressão |
| 6 | Arquitetura de Plataforma | API, papéis, jornadas, governança |
| 7 | Marketing Técnico | Poder de vitrine, comunicação de plataforma |
| 8 | Governança e Ética | Limites, riscos, honestidade |
| 9 | Engenharia Front-end Interativa | Padrões viáveis, vanilla JS, print, offline |

---

## Deliberações

### Especialista 1 — Produto Educacional Digital

**O que já está excelente:** Rotação por estações, infográfico com hotspots, checklist Go/No-Go, navegação modular. O web-book funciona como experiência pedagógica autônoma.

**O que falta:** O conceito de "plataforma educacional" — missões, squads, jornada coletiva, papel do professor — é invisível. O web-book parece um e-book premium, não a vitrine de um ecossistema.

**Complementações mais valiosas:**
- Seção "Do Web-book à Plataforma" com cards reveláveis explicando squads, missões, professor.
- Mini-diagrama da jornada educacional completa.
- Flip cards mostrando os papéis (Professor, Squad, Plataforma).

**Complementações arriscadas:** Dashboard pedagógico simulado pode parecer feature real e confundir.

**Score atual:** 6/10 | **Score potencial:** 8.5/10.

---

### Especialista 2 — UX/UI Educacional

**O que já está excelente:** Hierarquia visual, sidebar, hotspots com `aria-expanded`, botões acessíveis, reveal panels, checklist com estados visuais. O padrão de interação é maduro.

**O que falta:** Não há timeline/stepper visual de jornada, não há cards de papel/persona, não há transições entre "modo conteúdo" e "modo plataforma".

**Complementações mais valiosas:**
- Timeline/stepper horizontal da jornada EcoSabon (explorar → missão → feedback → progresso).
- Flip cards estilizados para papéis da plataforma.
- Hotspots sobre diagrama SVG da plataforma.

**Padrões de qualidade:** Manter consistência de design-system (cores, tipografia, espaçamento do CSS atual), animações com `prefers-reduced-motion`, `tabindex` explícito.

**Score atual:** 7/10 | **Score potencial:** 9/10.

---

### Especialista 3 — Ensino de Química

**O que já está excelente:** Reação de saponificação bem estruturada, Química Verde integrada, Estação 3 com prática, infográfico macro/simbólico, visualização 3D.

**O que falta:**
- Nível submicroscópico (representação de rearranjo de ligações no Premium 3D).
- Estequiometria quantitativa interativa (o `SaponificationEngine` calcula, mas o web-book não expõe isso).
- Conexão entre investigação e missão pedagógica.

**Complementações mais valiosas:**
- Card revelável "Cálculo de Saponificação" usando dados fictícios do Engine (sem chamar API).
- Hotspot no infográfico mostrando nível submicroscópico simplificado.
- Card de "Investigação Guiada" conectando estação → missão.

**Arriscado:** Simular cálculos sem disclamer — pode parecer ferramenta de laboratório.

**Score atual:** 7/10 | **Score potencial:** 8.5/10.

---

### Especialista 4 — Gamificação Responsável

**O que já está excelente:** Checklist Go/No-Go já gamifica (estado verde/vermelho, contagem, feedback). A navegação por módulos cria senso de progressão.

**O que falta:** Conceito de "missão" (submeter evidência, método científico), "squad" (equipe), "progresso" (badges, completion) e "dossiê" (relatório formativo) são invisíveis.

**Complementações mais valiosas:**
- Mapa visual de missões (3–5 cards representando missões da plataforma).
- Card de "Progresso da Bancada" com barra de progresso fictícia e explicitamente demonstrativa.
- Flip card "O que é uma Missão EcoSabon?" com ícone, descrição, etapas.

**Padrões:** Sempre declarar "exemplo ilustrativo" ou "demonstração". Nunca simular dados reais. Não infantilizar com badges excessivos.

**Score atual:** 4/10 | **Score potencial:** 7.5/10.

---

### Especialista 5 — Acessibilidade

**O que já está excelente:** Navegação por teclado (Tab/Enter/Escape), `aria-expanded`, `aria-controls`, `role="button"`, fallback 2D no Premium 3D, `print.css` com expansão automática.

**O que falta para complementações futuras:**
- Qualquer novo card deve ter `aria-label` e texto equivalente.
- Timelines devem ser `role="list"` com `aria-current="step"`.
- Flip cards devem ter face traseira acessível por `aria-live="polite"`.
- Diagramas SVG devem ter `<title>` e `<desc>`.
- Tudo deve respeitar `prefers-reduced-motion`.
- Tudo deve ter versão imprimível via `print.css`.

**Score atual:** 8/10 | **Score potencial:** 9/10.

---

### Especialista 6 — Arquitetura de Plataforma

**O que já está excelente:** O web-book prova competência front-end. Os relatórios de hardening H1–H4 documentam a profundidade.

**O que falta no web-book:** Nenhuma representação visual da arquitetura. O observador não sabe que existe API, JWT, RBAC, Zod, rate limiting, domínio compartilhado.

**Complementações mais valiosas:**
- Diagrama SVG interativo do ecossistema EcoSabon com hotspots (Conteúdo → Curso → Backend → Domínio → Governança).
- Cards reveláveis "O que há por trás" mostrando: autenticação, autorização, validação, observabilidade.
- Seção "Engenharia da Plataforma" com métricas visuais (191 testes, 4 fases, 12 rotas).

**Score atual:** 2/10 | **Score potencial:** 7/10.

---

### Especialista 7 — Marketing Técnico

**O que já está excelente:** Impacto visual imediato (Premium 3D), design premium, offline. Funciona como "wow factor" em demonstrações.

**O que falta:** O web-book vende "e-book interativo", não "plataforma educacional". A transição de vitrine para plataforma é feita apenas em relatórios externos (R77–R82), não dentro do web-book.

**Complementações mais valiosas:**
- Seção-âncora "Plataforma EcoSabon" como penúltima seção do web-book — breve, visual, com 3–5 cards e diagrama.
- CTA (Call to Action) ao final: "Este web-book é uma demonstração. Conheça a Plataforma EcoSabon."
- Badge visual sutil em cada seção: "Parte da Plataforma EcoSabon".

**Arriscado:** Não transformar o web-book em brochura corporativa. Manter equilíbrio entre conteúdo pedagógico e comunicação de plataforma.

**Score atual:** 5/10 | **Score potencial:** 8.5/10.

---

### Especialista 8 — Governança e Ética

**O que já está excelente:** Declaração de limites nos relatórios (R77–R82). A seção "Validação" no web-book já inclui ressalvas sobre protótipo.

**O que falta:**
- Qualquer dashboard fictício DEVE declarar "dados ilustrativos, não reais".
- Qualquer card de missão/progresso DEVE declarar "demonstração de conceito".
- Não usar linguagem de validação ("comprovado", "certificado").
- Não simular coleta de dados.

**Riscos de complementação:**
- Dashboard fictício pode ser screenshot-ado e usado fora de contexto.
- Cards de progresso podem parecer feature real.
- Mitigação: declarações visuais explícitas + disclaimers acessíveis.

**Score atual:** 7/10 | **Score potencial:** 8/10.

---

### Especialista 9 — Engenharia Front-end Interativa

**O que já está excelente:** Padrão vanilla JS consolidado: ES modules, `app.js` como orquestrador, scripts focados (`hotspots.js`, `reveal.js`, `checklist.js`, `navigation.js`), sem framework, sem bundler em runtime.

**Padrões viáveis para complementações futuras:**

| Tipo | Implementação | Print | Offline | Acessibilidade |
|------|-------------|-------|---------|----------------|
| Cards reveláveis | `reveal.js` existente | Expandido | ✅ | `aria-expanded` |
| Flip cards | CSS `transform: rotateY()` + `aria-live` | Face frontal | ✅ | Texto equivalente |
| Timeline/stepper | CSS Grid + `role="list"` | Linear | ✅ | `aria-current` |
| Diagrama SVG | `<svg>` inline + hotspots.js | Estático | ✅ | `<title>` + `<desc>` |
| Barra de progresso | CSS `width: %` + `role="progressbar"` | Texto equivalente | ✅ | `aria-valuenow` |
| Hotspots em SVG | Reutilizar `hotspots.js` | Expandido | ✅ | Existente |

**Complexidade estimada por complementação:**
- Cards reveláveis: Baixa (reutiliza padrão existente).
- Flip cards: Média (CSS 3D, acessibilidade).
- Timeline: Média (layout + estado).
- Diagrama SVG: Média-Alta (design + hotspots + print).
- Dashboard fictício: Alta (design + disclaimers + print + a11y).

**Score atual:** 8/10 (qualidade técnica) | **Score potencial:** 9/10.

---

## Consenso do Council

### Score Consolidado

| Especialista | Atual | Potencial |
|-------------|-------|-----------|
| Produto Educacional | 6 | 8.5 |
| UX/UI | 7 | 9 |
| Ensino de Química | 7 | 8.5 |
| Gamificação | 4 | 7.5 |
| Acessibilidade | 8 | 9 |
| Arquitetura | 2 | 7 |
| Marketing Técnico | 5 | 8.5 |
| Governança/Ética | 7 | 8 |
| Engenharia Front-end | 8 | 9 |
| **Média** | **6.0** | **8.3** |

### Consenso

> O web-book Premium 3D tem score de representatividade **6.0/10** como vitrine da plataforma. Com complementações incrementais de Nível 1 e 2, pode atingir **8.3/10** — um ganho de **+2.3 pontos** sem alterar o consolidado.
>
> As 3 maiores lacunas são: **representação de missões/squads** (gamificação: 4/10), **representação da arquitetura** (plataforma: 2/10) e **comunicação de plataforma** (marketing: 5/10). São todas resolúveis com cards, diagrama e seção contextual, sem implementação backend.
>
> **Recomendação:** Iniciar por complementações de Nível 1 (narrativas/interativas leves), avançando para Nível 2 apenas após validação da qualidade.
