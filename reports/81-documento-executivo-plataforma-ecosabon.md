# Plataforma EcoSabon — Documento Executivo de Posicionamento

---

## Síntese (1 página)

A **Plataforma EcoSabon** é um ecossistema educacional digital em evolução, projetado para transformar conteúdo científico de saponificação, estequiometria qualitativa e Química Verde em experiências de aprendizagem interativas, acessíveis e offline-first.

O **web-book Premium 3D** é o produto-vitrine da plataforma: uma demonstração concreta, publicada e funcional do que o EcoSabon é capaz de entregar. Ele materializa a proposta da plataforma sem esgotá-la.

### Estado Atual

| Dimensão | Estado |
|----------|--------|
| Web-book Premium 3D | ✅ RC1 publicada com release, assets e tag |
| Curso Interativo | ✅ 5 módulos, quizzes, progresso, armazenamento |
| Backend/API | ✅ Express + MongoDB, hardened em 4 fases (H1–H4) |
| Domínio compartilhado | ✅ `SaponificationEngine` centralizado |
| Governança | ✅ 191 testes, CI/CD, 82 relatórios versionados |
| Deploy público | ❌ Não iniciado |
| Validação com usuários | ❌ Não realizada |

### Diferenciais

- **Código puro** (HTML/CSS/JS Vanilla) — sem dependência de SaaS ou frameworks pesados.
- **Visualização molecular 3D** integrada (Three.js, fallback 2D).
- **Offline-first** — funciona sem internet via ZIP auto-suficiente.
- **Acessibilidade projetada** — teclado, leitores de tela, responsividade.
- **Backend endurecido** — autenticação JWT, autorização RBAC, validação Zod, rate limiting.
- **Governança profissional** — 191 testes automatizados, CI/CD, relatórios versionados.

### Limites Honestos

- Protótipo avançado, não produto final em produção.
- Sem validação pedagógica com docentes ou alunos reais.
- Sem deploy público ou monitoramento de produção.
- Sem precificação definitiva validada pelo mercado.

---

## 1. Tese Central

> A Plataforma EcoSabon é um ecossistema educacional em evolução para experiências digitais de aprendizagem em Química Verde, saponificação e sustentabilidade. O web-book Premium 3D funciona como produto-vitrine: uma demonstração concreta da capacidade da plataforma de entregar conteúdo científico interativo, acessível, offline, visualmente sofisticado e tecnicamente governado.

---

## 2. A Plataforma

### Visão de Ecossistema

```
┌─────────────────────────────────────────────────┐
│              PLATAFORMA ECOSABON                │
├──────────┬──────────┬──────────┬────────────────┤
│ CONTEÚDO │  CURSO   │ BACKEND  │  GOVERNANÇA    │
│          │          │          │                │
│ Web-book │ Módulos  │ Express  │ 191 testes     │
│ Premium  │ Quizzes  │ MongoDB  │ CI/CD          │
│ 3D       │ Progress │ JWT/RBAC │ 82 relatórios  │
│ Estações │ Storage  │ Zod      │ GitHub Actions │
│ PDF/ZIP  │ SCORM    │ Rate Lim │ PRs/Reviews    │
├──────────┴──────────┴──────────┴────────────────┤
│         DOMÍNIO COMPARTILHADO (shared/)         │
│         SaponificationEngine                    │
└─────────────────────────────────────────────────┘
```

### Aprendizagem por Estações e Missões

A metodologia pedagógica se baseia em **rotação por estações**:

- **Estação 1:** Fundamentos de saponificação e segurança.
- **Estação 2:** Infográfico interativo de reações com hotspots acessíveis.
- **Estação 3:** Prática guiada com checklist Go/No-Go.

A camada de **missões** (backend) permite que squads submetam evidências, preencham método científico e recebam dossiê acadêmico — funcionalidade demonstrada via API, não no web-book.

### Backend e Hardening H1–H4

| Fase | Foco | Resultado |
|------|------|-----------|
| **H1** | Motor centralizado, JWT seguro, rate limiting | +55 testes |
| **H2** | CORS por ambiente, upload auditado, env config | +0 testes (config) |
| **H3** | Schemas Zod, error handler, request logger | +20 testes |
| **H4** | Autorização por papel (RBAC), ownership de squad | +12 testes |
| **Total** | 4 fases de hardening | **104 → 191 testes (+84%)** |

### Autorização por Papel

| Papel | Acesso |
|-------|--------|
| **TEACHER** | Classrooms, squad list, reports, delete squad |
| **SQUAD** | Seus próprios recursos (missions, profile) |
| **Público** | Auth (login/register), squad create (onboarding) |

---

## 3. O Web-Book Premium 3D

### O que é

Uma peça demonstrável, publicada como RC1, que materializa a proposta da plataforma:

- **4 seções** com navegação modular responsiva.
- **Infográfico de reações** com hotspots acessíveis por teclado.
- **Checklist Go/No-Go** de insumos.
- **Premium 3D** — molécula rotacionável em Three.js com fallback 2D.
- **PDF inteligente** via `print.css`.
- **ZIP offline** (~31 KiB base + assets).
- **104 testes** dedicados ao e-book.

### O que NÃO é

| Anti-padrão | Realidade |
|-------------|-----------|
| Produto central isolado | É vitrine da plataforma |
| Produto final validado | É RC1 — release candidate |
| Simulador científico | É visualização representativa |
| Validação pedagógica | Não foi testado com alunos |
| Plataforma completa | Não mostra backend/multiusuário |

---

## 4. O que Já Está Demonstrável

| Entrega | Como demonstrar |
|---------|----------------|
| Web-book Premium 3D | Abrir HTML, navegar pelas estações |
| Visualização molecular 3D | Rotacionar molécula no Premium 3D |
| Acessibilidade | Navegar por teclado, testar com screen reader |
| Offline | Abrir ZIP localmente sem internet |
| PDF | `Ctrl+P` no navegador |
| Testes | `npm test` → 191 verdes |
| CI/CD | GitHub Actions → pipeline verde |
| Hardening | Mostrar middlewares e relatórios H1–H4 |
| Governança | 82 relatórios, PRs, tags, releases |

---

## 5. O que É Roadmap

| Item | Dependência |
|------|------------|
| Validação com docentes/alunos | Parceiro educacional |
| Deploy público | Decisão de negócio + infraestrutura |
| Teacher scope (professor vê só suas turmas) | H5 |
| Refresh token / expiração configurável | H5 |
| Testes de integração HTTP (supertest) | H5 |
| Monitoramento real (APM, alertas) | Deploy |
| OpenAPI / Swagger | H6+ |
| Auditoria de segurança externa | Deploy |
| Precificação validada | Feedback de mercado |

---

## 6. Diferenciais Técnico-Pedagógicos

### Técnicos

| Diferencial | Detalhamento |
|------------|-------------|
| **Código puro** | HTML5/CSS3/JS Vanilla — zero dependência de SaaS |
| **Visualização 3D** | Three.js com fallback 2D automático |
| **Offline-first** | Zero chamadas de rede, ZIP auto-suficiente |
| **Backend real** | Express + MongoDB + JWT + RBAC + Zod |
| **191 testes** | Vitest em 3 suites (e-book, curso, server) |
| **CI/CD** | GitHub Actions com lint, testes, build |

### Pedagógicos

| Diferencial | Detalhamento |
|------------|-------------|
| **Rotação por estações** | Metodologia ativa estruturada |
| **Infográfico interativo** | Hotspots acessíveis com reações químicas |
| **Checklist Go/No-Go** | Prontidão de laboratório |
| **Química Verde** | Sustentabilidade integrada ao conteúdo |
| **Visualização molecular** | Conceitos abstratos tornados visuais |

---

## 7. Limites Honestos

> Os limites abaixo devem ser declarados em qualquer apresentação institucional.

| Limite | Detalhe |
|--------|---------|
| **Não é produto final** | RC1 — release candidate, não versão de produção |
| **Não é simulação validada** | Visualização representativa, não ferramenta científica |
| **Sem validação pedagógica** | Nenhum docente ou aluno testou o sistema |
| **Sem deploy público** | Funciona apenas localmente ou via ZIP |
| **Sem monitoramento** | Logs console-only, sem APM |
| **Sem auditoria externa** | Hardening interno, sem certificação |
| **Sem precificação definitiva** | Exploratória, sem validação de mercado |
| **Sem testes em dispositivos escolares** | Não testado em computadores de laboratório |
| **Sem teste com leitores de tela reais** | Projetado para acessibilidade, não comprovado com PcD |

---

## 8. Linguagem Segura para Apresentação

### ✅ Frases Recomendadas

| Contexto | Frase |
|----------|-------|
| Geral | "Plataforma educacional em evolução com demonstração funcional publicada" |
| Web-book | "Produto-vitrine interativo Premium 3D" |
| Premium 3D | "Visualização molecular interativa integrada" |
| Backend | "API com autenticação e autorização por papel, hardened em 4 fases" |
| Testes | "191 testes automatizados em CI/CD" |
| Acessibilidade | "Projetado para acessibilidade — teclado, leitores de tela, offline" |
| Estado | "Protótipo avançado com governança profissional" |
| Case | "Case demonstrável de engenharia educacional" |

### ❌ Frases Proibidas

| Frase | Motivo |
|-------|--------|
| "Produto final validado" | Não há deploy nem validação |
| "Plataforma pronta para escolas" | Não há piloto |
| "Simulação molecular científica" | É visualização, não simulação |
| "Validado por professores" | Nenhum docente testou |
| "Comprovadamente melhora aprendizagem" | Nenhuma evidência |
| "Pronto para produção pública" | Sem deploy |
| "Segurança certificada" | Sem auditoria externa |
| "100% acessível" | Sem validação com PcD |

---

## 9. Veredito

> **A Plataforma EcoSabon deve ser comunicada como o ativo principal. O web-book Premium 3D deve ser preservado como produto-vitrine demonstrável, capaz de materializar a proposta da plataforma sem esgotá-la.**
>
> O web-book é a porta de entrada. A plataforma é o edifício.
>
> A linguagem deve ser precisa, os limites devem ser declarados, e o potencial deve ser comunicado sem superpromessa.

---

## 10. Métricas de Referência Rápida

| Métrica | Valor |
|---------|-------|
| Testes automatizados | **191** |
| Fases de hardening | **4** (H1–H4) |
| Rotas de API validadas | **12** |
| Rotas com autorização RBAC | **13** |
| Relatórios versionados | **82** |
| PRs mergeados | **32** |
| Seções do web-book | **4** |
| Estações pedagógicas | **3** |
| Tamanho base do ZIP | **~31 KiB** |
| Score de maturidade | **7.6/10** |
| Score de representatividade web-book | **6.5/10** (12 critérios) |
| Score do council | **7.3/10** (7 especialistas) |
