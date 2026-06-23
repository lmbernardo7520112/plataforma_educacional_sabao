# 📋 Relatório 86 — Decisão sobre Próxima Complementação do Web-Book EcoSabon

| Campo              | Valor                                                        |
|--------------------|--------------------------------------------------------------|
| **Fase**           | WBC-MAP — Mapeamento de Complementação Premium               |
| **Data**           | 2026-06-23                                                   |
| **Referência**     | Council R83, Lacunas R84, Backlog R85                         |

---

## 1. Diagnóstico

### Scores

| Métrica | Valor |
|---------|-------|
| Score atual de representatividade (council) | **6.0/10** |
| Score potencial após complementações | **8.3/10** |
| Ganho potencial | **+2.3 pontos** |
| Lacunas de alto impacto | 3 (ecossistema, missões, professor) |
| Lacunas de médio impacto | 7 |
| Lacunas de baixo impacto | 5 (já cobertas ou contínuas) |

### Principais Lacunas

| # | Lacuna | Score Atual | Impacto |
|---|--------|-------------|---------|
| 1 | Plataforma como ecossistema | 2/10 | 🔴 Alto |
| 2 | Missões pedagógicas | Ausente | 🔴 Alto |
| 3 | Papel do professor | Ausente | 🔴 Alto |
| 4 | Gamificação (squads, progresso) | 4/10 | 🟡 Médio |
| 5 | Marketing técnico no web-book | 5/10 | 🟡 Médio |

---

## 2. Decisão

> **DECISÃO: O WEB-BOOK ECOSABON DEVE SER COMPLEMENTADO INCREMENTALMENTE PARA REPRESENTAR MELHOR A PLATAFORMA, SEM ALTERAR OU SUBSTITUIR O CONSOLIDADO. A PRIMEIRA IMPLEMENTAÇÃO FUTURA DEVE SER DEFINIDA APÓS ESTE MAPEAMENTO, PRIORIZANDO INTERAÇÕES LEVES, ACESSÍVEIS, OFFLINE, TESTÁVEIS E COERENTES COM A QUALIDADE PREMIUM JÁ EXISTENTE.**

---

## 3. Primeira Implementação Futura Recomendada

### P1 — Seção "Do Web-book à Plataforma EcoSabon"

| Campo | Valor |
|-------|-------|
| **O que** | Nova seção (penúltima, antes do checklist) com 3–5 cards reveláveis + CTA. |
| **Por que** | Resolve a lacuna #1 (ecossistema invisível, score 2/10 → 7/10). |
| **Como** | Reutilizar `reveal.js` (padrão existente). HTML + CSS. |
| **Complexidade** | Baixa. |
| **Risco** | Baixo — usa padrão consolidado, sem dados reais, sem API. |
| **Testes** | Vitest: abertura/fechamento, acessibilidade, print. |
| **Offline** | ✅ |
| **Print** | ✅ Cards expandidos. |
| **Acessibilidade** | ✅ `aria-expanded`, `role="button"`, teclado. |

### Conteúdo sugerido dos cards

| Card | Título | Conteúdo |
|------|--------|---------|
| 1 | "O que é a Plataforma EcoSabon?" | Ecossistema com 5 camadas: conteúdo, curso, backend, domínio, governança. |
| 2 | "O que é este Web-book?" | Produto-vitrine que demonstra a experiência educacional da plataforma. |
| 3 | "O que há por trás?" | Backend com autenticação, autorização, validação — 191 testes, 4 fases de hardening. |
| 4 | "Para onde caminha?" | Squads, missões, dossiê pedagógico, deploy, validação com docentes. |
| 5 (CTA) | "Quer saber mais?" | Frase de encerramento + link para repositório ou contato. |

---

## 4. O que NÃO Deve Ser Feito Agora

| Item | Motivo |
|------|--------|
| Implementar qualquer complementação | Esta fase é apenas mapeamento. |
| Alterar o web-book RC1 | Preservação da RC1. |
| Iniciar H5 | Pausa técnica ativa. |
| Validar com usuários reais | Não há parceiro educacional. |
| Iniciar precificação | Não há validação de mercado. |
| Criar dashboard fictício (P5) | Alto risco sem os itens P1–P4 prontos. |
| Implementar "modo plataforma" (P7) | Complexidade excessiva para este momento. |

---

## 5. Confirmação de Preservação

| Item | Status |
|------|--------|
| RC1 Premium 3D | ✅ Preservada |
| E-book | ✅ Não alterado |
| B1+B2+C3 | ✅ Não alterado |
| Release/tags/assets | ✅ Não alterados |
| ZIP/PDF | ✅ Não alterados |
| Código (server/client/shared/curso) | ✅ Não alterado |
| Materiais comerciais | ✅ Não alterados |
| Relatórios anteriores (R01–R82) | ✅ Não alterados |

---

## 6. Sequência Futura Recomendada

```
P0  Não mexer no Premium 3D consolidado
│
P1  Seção "Do Web-book à Plataforma" + CTA              ← PRIMEIRA
│
P2  Diagrama SVG do ecossistema + Cards governança H1–H4
│
P3  Flip cards de papéis (Professor, Squad, Plataforma)
│
P4  Timeline de jornada + Mapa de missões
│
P5  Painel de progresso + Mini-dashboard demonstrativo
│
P6  Cards de decisão docente + Feedback formativo
│
P7  Integrações avançadas (apenas se P1–P6 validados)
```

---

## 7. Métricas de Sucesso para P1

Se P1 for implementada com sucesso:

| Métrica | Valor Esperado |
|---------|---------------|
| Score de representatividade | 6.0 → **7.0/10** (+1.0) |
| Lacuna #1 resolvida | Sim |
| Testes adicionais | ~5–8 |
| Total testes esperado | ~196–199 |
| RC1 preservada | Sim |
| Print funcional | Sim |
| Offline funcional | Sim |
| Acessibilidade mantida | Sim |

---

## 8. Frase de Encerramento

> O web-book Premium 3D é a porta de entrada da Plataforma EcoSabon. O mapeamento WBC-MAP identificou 15 dimensões de representatividade, catalogou 16 complementações em 3 níveis de complexidade, e recomenda a seção "Do Web-book à Plataforma" como primeira implementação futura — de baixo risco, baixa complexidade e alto impacto. A execução aguarda autorização.
