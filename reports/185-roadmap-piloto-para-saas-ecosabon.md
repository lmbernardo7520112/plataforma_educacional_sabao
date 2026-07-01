# R185 — Roadmap Piloto para SaaS — Plataforma EcoSabon

## 1. Visão Geral

Este roadmap define a separação clara entre o **modo piloto atual** e a **evolução para SaaS multi-escola**, estabelecendo fases progressivas de maturidade arquitetural, segurança e comercialização.

---

## 2. Separação Piloto vs SaaS

| Aspecto | Modo Piloto (Atual) | Modo SaaS (Futuro) |
|---|---|---|
| **Escopo** | Restrito, demonstrativo | Multi-escola, multi-tenant |
| **Dados** | Sintéticos | Reais, por escola |
| **Auth** | Allowlist de e-mails + JWT simples | RBAC formal com hierarquia (Admin > Escola > Professor > Aluno) |
| **Banco** | Atlas M0 Free (512MB) | Atlas M10+ dedicado ou por tenant |
| **Armazenamento** | Filesystem efêmero Render | Cloud Storage (GCS/S3) durável |
| **Deploy** | Render Free + Vercel Free | Render Pro ou GCP/AWS com SLA |
| **Domínio** | `ecosabon-platform.vercel.app` | Domínio customizado por escola ou geral |
| **Billing** | Nenhum | Planos por escola/licença |
| **LGPD** | Minimização (dados sintéticos) | Compliance formal com DPO, termos, consentimento |
| **Observabilidade** | Console logs | APM, alertas, dashboards |
| **Backup** | Nenhum (dados descartáveis) | Backup automatizado com retenção |
| **Suporte** | Nenhum | SLA com canal dedicado |

---

## 3. Fases do Roadmap

### Fase 1: `PILOT_READONLY_HARDENING` (PRÓXIMA)

**Objetivo:** Transformar o piloto em demonstração segura e controlada.

| Item | Detalhe |
|---|---|
| Feature flags | `PILOT_READONLY_MODE=true`, `PILOT_ALLOW_TEACHER_WRITES=false` |
| Middleware | `blockPilotReadonlyWrites` bloqueia mutações públicas |
| Frontend | Badge "Modo Demonstração", botões ocultos, hamburger mobile |
| Upload | Bloqueado |
| Progresso | Não persistente |
| Banco | Inalterado |
| Deploy | Render + Vercel (free tier) |
| QR Code | Avaliar liberação após hardening |

**Critérios de saída:**
- ✅ POST públicos retornam 423
- ✅ Mobile funcional com hamburger
- ✅ Badge demonstrativo visível
- ✅ 252+ testes verdes
- ✅ Nenhum segredo versionado

---

### Fase 2: `PILOT_TEACHER_ADMIN_CONTROLLED`

**Objetivo:** Permitir que professores autorizados operem a plataforma em sessões controladas.

| Item | Detalhe |
|---|---|
| Feature flags | `PILOT_ALLOW_TEACHER_WRITES=true` (ativado seletivamente) |
| Fluxo | Professor cria bancadas, alunos fazem login, trilha completa |
| Upload | Habilitado apenas para squads autenticados durante sessão |
| Progresso | Persistente apenas durante sessão controlada |
| Dados | Sintéticos (turmas de seed) |
| QR Code | Gerado e distribuído aos professores autorizados |
| Monitoramento | Logs de atividade no Render |

**Critérios de saída:**
- ✅ Professor completa ciclo completo (criar bancada → trilha → relatório)
- ✅ Dados de sessão rastreáveis
- ✅ Sem corrupção de dados sintéticos base

---

### Fase 3: `SAAS_MULTITENANT_FOUNDATION`

**Objetivo:** Construir a infraestrutura para multi-escola.

| Item | Detalhe |
|---|---|
| Multi-tenancy | Isolamento por `schoolId` em todas as coleções |
| RBAC formal | Hierarquia: `SUPER_ADMIN > SCHOOL_ADMIN > TEACHER > SQUAD` |
| Banco | Atlas M10+ ou separação por database |
| Auth | OAuth2 / SSO institucional |
| API versioning | `/api/v2/` com breaking changes controlados |
| Armazenamento | Cloud Storage (GCS/S3) com lifecycle policies |
| Observabilidade | APM (Datadog/New Relic/Grafana Cloud) |
| CI/CD | Pipeline de staging → production com approval gates |

**Critérios de saída:**
- ✅ 2+ escolas isoladas no mesmo backend
- ✅ RBAC funcional com hierarquia
- ✅ Dados de uma escola invisíveis para outra

---

### Fase 4: `SAAS_SCHOOL_ONBOARDING`

**Objetivo:** Fluxo de auto-cadastro de escolas.

| Item | Detalhe |
|---|---|
| Onboarding institucional | Formulário de cadastro de escola + admin |
| Setup automático | Seed de turmas, professores e alunos por escola |
| Personalização | Logo, cores, nome da escola |
| Termos de uso | Aceite obrigatório |
| LGPD | Consentimento de responsáveis (ECA), DPO designado |
| Domínio | Subdomínio ou rota por escola (`escola.ecosabon.com.br`) |

**Critérios de saída:**
- ✅ Escola faz auto-cadastro sem intervenção manual
- ✅ Termos de uso aceitos
- ✅ LGPD compliance documentado

---

### Fase 5: `SAAS_BILLING_COMMERCIALIZATION`

**Objetivo:** Monetização e sustentabilidade.

| Item | Detalhe |
|---|---|
| Modelo de negócio | Licença por escola/ano ou freemium com limites |
| Gateway de pagamento | Stripe / PagSeguro / Mercado Pago |
| Planos | Free (1 turma, 5 bancadas) → Pro (ilimitado) → Enterprise |
| Faturamento | Mensal ou anual |
| Dashboard financeiro | Admin vê receita, churn, MRR |
| Suporte | Chat, e-mail, SLA por plano |
| Backup | Automatizado com retenção de 30 dias |
| SLA | 99.5% uptime para planos Pro+ |

**Critérios de saída:**
- ✅ Primeira escola pagante
- ✅ Gateway de pagamento funcional
- ✅ Dashboard financeiro operacional

---

## 4. Diagrama de Evolução

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  FASE 1                    FASE 2                   FASE 3           │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐ │
│  │ PILOT_READONLY   │────▶│ PILOT_TEACHER    │────▶│ SAAS_MULTI   │ │
│  │ HARDENING        │     │ ADMIN_CONTROLLED │     │ TENANT       │ │
│  │                  │     │                  │     │ FOUNDATION   │ │
│  │ • Read-only demo │     │ • Teacher writes │     │ • schoolId   │ │
│  │ • No uploads     │     │ • QR Code        │     │ • RBAC       │ │
│  │ • Badge demo     │     │ • Sessões ctrl   │     │ • Cloud Stor │ │
│  │ • Hamburger      │     │ • Dados synth    │     │ • APM        │ │
│  └──────────────────┘     └──────────────────┘     └──────────────┘ │
│                                                          │           │
│                                                          ▼           │
│                          FASE 5                   FASE 4             │
│                    ┌──────────────────┐     ┌──────────────────┐     │
│                    │ SAAS_BILLING     │◀────│ SAAS_SCHOOL      │     │
│                    │ COMMERCIALIZATION│     │ ONBOARDING       │     │
│                    │                  │     │                  │     │
│                    │ • Pagamentos     │     │ • Auto-cadastro  │     │
│                    │ • Planos         │     │ • LGPD           │     │
│                    │ • Dashboard $    │     │ • Termos de uso  │     │
│                    │ • SLA            │     │ • Personalização │     │
│                    └──────────────────┘     └──────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. Requisitos Técnicos para Transição SaaS

### 5.1 Multi-Tenancy

Dois modelos possíveis:

| Modelo | Vantagem | Desvantagem | Recomendação |
|---|---|---|---|
| **Shared DB + `schoolId`** | Simples, econômico | Risco de vazamento entre tenants | ✅ Para MVP SaaS (Fase 3) |
| **Database por escola** | Isolamento total | Complexo, caro, difícil de migrar | Para Enterprise (Fase 5+) |

### 5.2 RBAC Formal

```
SUPER_ADMIN
├── SCHOOL_ADMIN
│   ├── TEACHER
│   │   └── SQUAD (grupo de alunos)
│   └── COORDINATOR
└── SUPPORT
```

### 5.3 LGPD / ECA

| Requisito | Detalhe |
|---|---|
| Minimização de dados | Coletar apenas o necessário para o funcionamento |
| Consentimento | Responsáveis assinam termo digital (ECA: menores de 18) |
| DPO | Designar encarregado de dados |
| Direito de exclusão | API para apagar dados de aluno/escola |
| Relatório de impacto | RIPD para dados de menores |
| Pseudonimização | Usar IDs em vez de nomes em logs/métricas |

### 5.4 Armazenamento Durável

| Recurso | Piloto (atual) | SaaS (futuro) |
|---|---|---|
| Fotos de evidência | Render filesystem (efêmero) | GCS/S3 com lifecycle (30 dias hot → archive) |
| Banco de dados | Atlas M0 (512MB) | Atlas M10+ com backup diário |
| Backups | Nenhum | Automático com retenção de 30 dias |

---

## 6. Estimativas de Tempo

| Fase | Estimativa | Dependências |
|---|---|---|
| Fase 1: Pilot Readonly Hardening | 1-2 sprints | Nenhuma |
| Fase 2: Teacher Admin Controlled | 1 sprint | Fase 1 |
| Fase 3: SaaS Multitenant Foundation | 3-4 sprints | Fase 2 + decisão comercial |
| Fase 4: School Onboarding | 2-3 sprints | Fase 3 |
| Fase 5: Billing/Commercialization | 3-4 sprints | Fase 4 + gateway de pagamento |

---

## 7. Decisão

`DECISÃO: O ROADMAP DE EVOLUÇÃO PILOTO → SAAS ESTÁ DEFINIDO EM 5 FASES PROGRESSIVAS. A FASE IMEDIATA É PILOT_READONLY_HARDENING. A TRANSIÇÃO PARA SAAS DEVE SER TRATADA SEPARADAMENTE APÓS ESTABILIZAÇÃO DO PILOTO.`

---

_Roadmap definido em 2026-07-01._
