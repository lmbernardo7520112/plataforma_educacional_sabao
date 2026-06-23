# 📋 Relatório 79 — Matriz de Representatividade de Marketing: Web-Book ↔ Plataforma EcoSabon

| Campo              | Valor                                                        |
|--------------------|--------------------------------------------------------------|
| **Fase**           | PME — Posicionamento de Marketing Estratégico                |
| **Data**           | 2026-06-23                                                   |
| **Referência**     | Council (R78), Posicionamento (R77), Auditoria H1–H4 (R75)   |

---

## Objetivo

Avaliar sistematicamente o quanto o web-book Premium 3D atual representa cada dimensão da Plataforma EcoSabon, identificando forças, lacunas e recomendações incrementais.

---

## Matriz Completa

### 1. Representação da Experiência Educacional

| Campo | Valor |
|-------|-------|
| **Score** | **8/10** |
| **Evidência** | 4 seções, rotação por estações, hotspots, checklist Go/No-Go, infográfico de reações |
| **Lacuna** | Não mostra progressão coletiva (squads), avaliação formal ou feedback docente |
| **Recomendação** | Material complementar com fluxo professor → squad → missão |
| **Exige implementação?** | ❌ Não — apenas documentação/diagrama |

### 2. Representação da Metodologia de Estações/Missões

| Campo | Valor |
|-------|-------|
| **Score** | **7/10** |
| **Evidência** | Estações 1–3 estruturadas com conteúdo progressivo |
| **Lacuna** | O conceito de "missão" (submissão, evidência, método científico) é backend-only |
| **Recomendação** | Incluir diagrama do ciclo de missão no material de portfólio |
| **Exige implementação?** | ❌ Não |

### 3. Representação da Visualização Científica

| Campo | Valor |
|-------|-------|
| **Score** | **9/10** |
| **Evidência** | Premium 3D com Three.js, molécula rotacionável, fallback 2D, responsividade |
| **Lacuna** | Não é simulação validada; estequiometria quantitativa está no backend, não no web-book |
| **Recomendação** | Usar "visualização representativa", nunca "simulador" |
| **Exige implementação?** | ❌ Não |

### 4. Representação da Capacidade Offline

| Campo | Valor |
|-------|-------|
| **Score** | **9/10** |
| **Evidência** | Build Vite offline, ZIP auto-suficiente (~31 KiB base + assets), zero chamadas de rede |
| **Lacuna** | Não demonstra offline do backend/API (que exigiria service worker ou sync) |
| **Recomendação** | Manter como diferencial forte; explicitar que é offline do conteúdo, não da plataforma inteira |
| **Exige implementação?** | ❌ Não |

### 5. Representação de Acessibilidade

| Campo | Valor |
|-------|-------|
| **Score** | **8/10** |
| **Evidência** | Navegação por teclado, ARIA labels, leitores de tela, print.css, responsividade, fallback 2D |
| **Lacuna** | Sem validação com tecnologias assistivas reais ou usuários PcD |
| **Recomendação** | Usar "projetado para acessibilidade" em vez de "acessibilidade comprovada" |
| **Exige implementação?** | ❌ Não |

### 6. Representação de Governança Técnica

| Campo | Valor |
|-------|-------|
| **Score** | **6/10** |
| **Evidência** | CI/CD, tags, releases, PRs, relatórios versionados — mas tudo no repositório, não no web-book |
| **Lacuna** | O web-book sozinho não comunica governança; é preciso mostrar o GitHub, CI, PRs |
| **Recomendação** | Material de portfólio com screenshots de CI verde, PRs, contagem de testes |
| **Exige implementação?** | ❌ Não |

### 7. Representação de Maturidade de Engenharia

| Campo | Valor |
|-------|-------|
| **Score** | **5/10** |
| **Evidência** | 191 testes, hardening H1–H4, lint 0 errors — mas invisível no web-book |
| **Lacuna** | O web-book é o "produto final" visual; a engenharia está no código e relatórios |
| **Recomendação** | Incluir seção "Engenharia por trás" no case study com métricas |
| **Exige implementação?** | ❌ Não |

### 8. Representação da Futura Plataforma Multiusuário

| Campo | Valor |
|-------|-------|
| **Score** | **3/10** |
| **Evidência** | Backend com autenticação TEACHER/SQUAD, RBAC, ownership — mas tudo headless |
| **Lacuna** | Nenhuma interface de login, dashboard ou gestão de turma está no web-book |
| **Recomendação** | Diagrama ou wireframe de "visão futura" da plataforma multiusuário |
| **Exige implementação?** | ❌ Não (apenas diagrama) |

### 9. Representação da Camada Backend/API

| Campo | Valor |
|-------|-------|
| **Score** | **2/10** |
| **Evidência** | Express + MongoDB, 12 rotas, Zod, error handler, request logger — mas headless |
| **Lacuna** | O web-book não consome a API; são componentes independentes atualmente |
| **Recomendação** | Incluir diagrama de API no material técnico; não forçar integração prematura |
| **Exige implementação?** | ❌ Não |

### 10. Potencial como Marketing Técnico

| Campo | Valor |
|-------|-------|
| **Score** | **9/10** |
| **Evidência** | Visual premium, 3D, offline, acessível, código puro — impressiona em demo |
| **Lacuna** | Sem métricas de conversão ou feedback de audiência real |
| **Recomendação** | Usar como abertura de qualquer apresentação (60 segundos de impacto visual) |
| **Exige implementação?** | ❌ Não |

### 11. Potencial como Peça de Portfólio

| Campo | Valor |
|-------|-------|
| **Score** | **9/10** |
| **Evidência** | RC1 publicada, ZIP demonstrável, GitHub público, relatórios completos |
| **Lacuna** | Falta compilar um case study condensado (1–2 páginas) com a narrativa PME |
| **Recomendação** | Criar case study atualizado com posicionamento de plataforma |
| **Exige implementação?** | ❌ Não |

### 12. Risco de ser Confundido com Produto Final Isolado

| Campo | Valor |
|-------|-------|
| **Score** | **7/10** (risco alto = score alto) |
| **Evidência** | O web-book é tão polido visualmente que pode ser confundido com o EcoSabon inteiro |
| **Lacuna** | Sem material que contextualize o web-book dentro da plataforma maior |
| **Recomendação** | Sempre apresentar o web-book como "vitrine da plataforma", não como "o produto" |
| **Exige implementação?** | ❌ Não |

---

## Resumo da Matriz

| # | Critério | Score |
|---|---------|-------|
| 1 | Experiência educacional | 8/10 |
| 2 | Metodologia estações/missões | 7/10 |
| 3 | Visualização científica | 9/10 |
| 4 | Capacidade offline | 9/10 |
| 5 | Acessibilidade | 8/10 |
| 6 | Governança técnica | 6/10 |
| 7 | Maturidade de engenharia | 5/10 |
| 8 | Plataforma multiusuário | 3/10 |
| 9 | Camada backend/API | 2/10 |
| 10 | Marketing técnico | 9/10 |
| 11 | Peça de portfólio | 9/10 |
| 12 | Risco de confusão (inverso) | 3/10 |
| **Média** | | **6.5/10** |

---

## Classificação

> O web-book Premium 3D é um **produto-vitrine avançado e representativo, mas não exaustivo da Plataforma EcoSabon**.
>
> Ele é **excelente** em: visualização, marketing, portfólio, offline, acessibilidade (scores 8–9).
>
> Ele é **fraco** em representar: backend, multiusuário, engenharia invisível (scores 2–5).
>
> A diferença (6.5 média) confirma que o web-book precisa de **material complementar** para comunicar a plataforma completa — mas ele é suficiente como **porta de entrada**.

---

## Decisão

> **Nenhuma das 12 recomendações exige nova implementação técnica.** Todas podem ser resolvidas com documentação, diagramas e narrativa. O web-book atual é adequado como vitrine — o que falta é o material de contexto ao redor dele.
