# 📋 Relatório 84 — Mapa de Lacunas do Web-Book como Vitrine da Plataforma EcoSabon

| Campo              | Valor                                                        |
|--------------------|--------------------------------------------------------------|
| **Fase**           | WBC-MAP — Mapeamento de Complementação Premium               |
| **Data**           | 2026-06-23                                                   |
| **Referência**     | Council R83, Posicionamento R77–R82, Auditoria R75           |

---

## Matriz de Lacunas (15 Dimensões)

### 1. Representação da Plataforma EcoSabon como Ecossistema

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente no web-book. Presente apenas em relatórios externos (R77–R82). |
| **Evidência** | Nenhuma menção visual a "Plataforma EcoSabon" dentro do web-book. |
| **Lacuna** | O web-book não comunica que faz parte de um ecossistema maior. |
| **Impacto** | 🔴 Alto — principal lacuna de representatividade. |
| **Proposta** | Seção "Do Web-book à Plataforma EcoSabon" com 3–5 cards reveláveis e diagrama SVG. |
| **Tipo de interação** | Cards reveláveis (padrão `reveal.js`) + SVG com hotspots. |
| **Risco** | Parecer brochura corporativa se mal dosado. |
| **Prioridade** | **P1** — primeira complementação. |
| **Exige implementação?** | ✅ Sim (futura — HTML/CSS/JS). |

### 2. Representação de Missões Pedagógicas

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente. O conceito de "missão" (submissão, evidência, método científico) é backend-only. |
| **Evidência** | Nenhum elemento no web-book menciona ou ilustra missões. |
| **Lacuna** | O diferencial pedagógico da plataforma (aprender fazendo missões) é invisível. |
| **Impacto** | 🔴 Alto. |
| **Proposta** | Cards ilustrativos de missão: "O que é uma Missão EcoSabon?" com etapas visuais. |
| **Tipo de interação** | Flip cards ou cards reveláveis. |
| **Risco** | Parecer feature real se não declarar "demonstração de conceito". |
| **Prioridade** | **P4** — após seção plataforma, mapa e papéis. |
| **Exige implementação?** | ✅ Sim (futura). |

### 3. Representação de Squads/Equipes

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente. Squad é conceito do backend (JWT, ownership). |
| **Evidência** | Nenhum elemento visual. |
| **Lacuna** | Aprendizagem colaborativa não é comunicada. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Flip card "O que é uma Bancada/Squad?" com descrição e ícone. |
| **Tipo de interação** | Flip card CSS. |
| **Risco** | Baixo — conceito simples de comunicar. |
| **Prioridade** | **P3** — junto com papéis. |
| **Exige implementação?** | ✅ Sim (futura). |

### 4. Representação de Jornada de Aprendizagem

| Campo | Valor |
|-------|-------|
| **Estado atual** | Parcial — a navegação por módulos implica jornada, mas sem representação explícita. |
| **Evidência** | Sidebar com módulos 1–4. |
| **Lacuna** | Falta timeline visual mostrando: Explorar → Investigar → Submeter → Feedback → Progresso. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Timeline/stepper horizontal na seção plataforma. |
| **Tipo de interação** | CSS Grid + `role="list"` + `aria-current`. |
| **Risco** | Baixo. |
| **Prioridade** | **P4** — complementa missões. |
| **Exige implementação?** | ✅ Sim (futura). |

### 5. Representação de Progresso

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente (checklist Go/No-Go é verificação de prontidão, não progresso de aprendizagem). |
| **Evidência** | Checklist de 14 itens. |
| **Lacuna** | Barra de progresso ou visualização de completion inexistente. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Barra de progresso fictícia com disclaimer "dados ilustrativos". |
| **Tipo de interação** | CSS `width` + `role="progressbar"` + `aria-valuenow`. |
| **Risco** | 🟡 Médio — pode parecer feature real. Mitigar com disclaimer visual. |
| **Prioridade** | **P5**. |
| **Exige implementação?** | ✅ Sim (futura). |

### 6. Representação de Feedback Formativo

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente. Feedback formativo é conceito do backend (dossiê acadêmico). |
| **Evidência** | Nenhum elemento. |
| **Lacuna** | O ciclo de aprendizagem não fecha: não há representação de feedback. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Card revelável "Como funciona o Feedback EcoSabon" com diagrama simplificado. |
| **Tipo de interação** | Card revelável. |
| **Risco** | Baixo. |
| **Prioridade** | **P6**. |
| **Exige implementação?** | ✅ Sim (futura). |

### 7. Representação do Papel do Professor

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente no web-book. Professor aparece no backend (TEACHER role, RBAC). |
| **Evidência** | Nenhum elemento visual. |
| **Lacuna** | O professor é o principal decisor na plataforma e está invisível no web-book. |
| **Impacto** | 🔴 Alto. |
| **Proposta** | Flip card "O Papel do Professor" + card de decisão docente simulada. |
| **Tipo de interação** | Flip card CSS + card revelável. |
| **Risco** | Baixo. |
| **Prioridade** | **P3** — junto com squads. |
| **Exige implementação?** | ✅ Sim (futura). |

### 8. Representação de Tomada de Decisão Pedagógica

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente. |
| **Evidência** | Nenhuma. |
| **Lacuna** | O professor como curador/decisor não está representado. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Card de cenário: "O professor pode..." com opções reveláveis (criar turma, acompanhar squad, ver dossiê). |
| **Tipo de interação** | Cards reveláveis com ícones. |
| **Risco** | 🟡 Médio — não prometer feature inexistente. |
| **Prioridade** | **P6**. |
| **Exige implementação?** | ✅ Sim (futura). |

### 9. Representação de Dados/Relatórios sem Coleta Real

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente. |
| **Evidência** | Nenhuma. |
| **Lacuna** | A capacidade de gerar dossiê acadêmico é invisível. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Mini-dashboard demonstrativo com dados fictícios e disclaimer explícito. |
| **Tipo de interação** | HTML/CSS estático com `role="img"` e `aria-label`. |
| **Risco** | 🔴 Alto — pode ser confundido com dados reais. Mitigação obrigatória com disclaimer. |
| **Prioridade** | **P5** — após itens menos arriscados. |
| **Exige implementação?** | ✅ Sim (futura). |

### 10. Representação da Governança e Segurança

| Campo | Valor |
|-------|-------|
| **Estado atual** | Parcial — seção "Governança" no web-book menciona testes e CI/CD. |
| **Evidência** | Módulo `mod-governanca` existente. |
| **Lacuna** | Não menciona hardening H1–H4, RBAC, schemas, observabilidade. |
| **Impacto** | 🟢 Baixo (já parcialmente coberto). |
| **Proposta** | Cards reveláveis adicionais na seção governança: H1–H4 resumidos. |
| **Tipo de interação** | Cards reveláveis (padrão existente). |
| **Risco** | Baixo. |
| **Prioridade** | **P2** — reutiliza padrão, baixo risco. |
| **Exige implementação?** | ✅ Sim (futura — HTML leve). |

### 11. Representação de Acessibilidade

| Campo | Valor |
|-------|-------|
| **Estado atual** | Excelente. Teclado, ARIA, responsividade, fallback 2D, print.css. |
| **Evidência** | 53 atributos aria/role/tabindex no HTML. |
| **Lacuna** | Mínima — manter padrão para futuros. |
| **Impacto** | 🟢 Baixo. |
| **Proposta** | Manter critérios; acrescentar `aria-live` em flip cards. |
| **Prioridade** | **Contínuo**. |
| **Exige implementação?** | Transversal. |

### 12. Representação da Experiência Offline

| Campo | Valor |
|-------|-------|
| **Estado atual** | Excelente. ZIP auto-suficiente, zero chamadas de rede. |
| **Evidência** | Build Vite, execução local. |
| **Lacuna** | Mínima. |
| **Impacto** | 🟢 Baixo. |
| **Proposta** | Manter; garantir que complementações futuras sejam offline. |
| **Prioridade** | **Contínuo**. |
| **Exige implementação?** | Transversal. |

### 13. Representação de Visualização Científica

| Campo | Valor |
|-------|-------|
| **Estado atual** | Excelente. Premium 3D, infográfico, hotspots. |
| **Evidência** | Three.js, molecular-stage.js, premium-3d-stage.js, hotspots.js. |
| **Lacuna** | Estequiometria quantitativa e nível submicroscópico não expostos. |
| **Impacto** | 🟢 Baixo (diferencial já forte). |
| **Proposta** | Card revelável com cálculo fictício do SaponificationEngine. |
| **Prioridade** | **P4**. |
| **Exige implementação?** | ✅ Sim (futura — HTML/JS). |

### 14. Representação de Aprendizagem por Estações

| Campo | Valor |
|-------|-------|
| **Estado atual** | Excelente. 3 estações claramente estruturadas. |
| **Evidência** | mod-1, mod-2, mod-3 com estações e conteúdo progressivo. |
| **Lacuna** | Mínima — o padrão é maduro. |
| **Impacto** | 🟢 Baixo. |
| **Proposta** | Mapa visual de estações na seção plataforma (station-map.js já existe). |
| **Prioridade** | **P2**. |
| **Exige implementação?** | Parcial (aproveitar `station-map.js`). |

### 15. Representação de Plataforma Multiusuário Futura

| Campo | Valor |
|-------|-------|
| **Estado atual** | Ausente. |
| **Evidência** | Nenhuma no web-book. |
| **Lacuna** | A visão de futuro (multiusuário, dashboard docente, squads simultâneos) é invisível. |
| **Impacto** | 🟡 Médio. |
| **Proposta** | Diagrama de visão futura na seção plataforma, com disclaimer "roadmap, não feature atual". |
| **Tipo de interação** | SVG estático com legenda acessível. |
| **Risco** | 🟡 Médio — não prometer. |
| **Prioridade** | **P7** — última complementação. |
| **Exige implementação?** | ✅ Sim (futura — SVG). |

---

## Resumo de Impacto

| Impacto | Dimensões |
|---------|-----------|
| 🔴 Alto | #1 Ecossistema, #2 Missões, #7 Professor |
| 🟡 Médio | #3 Squads, #4 Jornada, #5 Progresso, #6 Feedback, #8 Decisão docente, #9 Dados, #15 Multiusuário |
| 🟢 Baixo | #10 Governança, #11 Acessibilidade, #12 Offline, #13 Visualização, #14 Estações |
