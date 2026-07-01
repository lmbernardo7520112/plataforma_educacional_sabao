# R186 — Decisão de Auditoria do Piloto Readonly — Plataforma EcoSabon

## 1. Contexto

A Plataforma EcoSabon foi deployada como piloto restrito em Render + Vercel + MongoDB Atlas. A auditoria técnica profunda (R182–R185) revelou riscos reais e concretos que impedem a divulgação pública segura sem hardening adicional.

---

## 2. Riscos Confirmados

| # | Risco | Severidade | Evidência |
|---|---|---|---|
| R1 | `POST /api/classrooms/:id/squads` cria bancada SEM auth | **CRÍTICO** | `squadRoutes.ts:28` — sem `requireAuth`, qualquer visitante cria squads no Atlas |
| R2 | `POST /api/squads/:id/missions/submit` grava progresso + upload | **ALTO** | `missionRoutes.ts:22` — exige auth, mas se token obtido via squad login, grava no Atlas |
| R3 | Botão "Área do Professor" invisível em mobile | **ALTO** | `Navbar.tsx:32` — classe `hidden md:block` sem menu hamburger alternativo |
| R4 | Menu hamburger inexistente | **ALTO** | `Navbar.tsx` — links de navegação ocultos em viewport < 768px |
| R5 | `alunosOriginal` exposto no onboarding público | MÉDIO | `onboardingRoutes.ts:86` — retorna nomes (sintéticos) em endpoint sem auth |
| R6 | Upload em filesystem efêmero sem rate limit específico | MÉDIO | `upload.ts` — multer grava em disco Render (efêmero, sem proteção de consumo) |
| R7 | Rate limit insuficiente para auth | MÉDIO | Sem rate limit dedicado para `/api/auth/*` — usa global de 100 req/15min |
| R8 | Atlas M0 pode ser saturado por spam de POST | ALTO | 512MB free tier, POST público sem limite de escrita |

---

## 3. Proposta Recomendada

**Opção A: Modo Piloto Demonstrativo Read-Only / No-Write** — APROVADA.

Características:
- Visitantes navegam, visualizam turmas, bancadas e trilhas
- Nenhuma ação pública persiste no banco
- Uploads desabilitados
- Criação/edição/exclusão de bancadas bloqueada para visitantes
- Progresso de trilha não é gravado no Atlas
- Endpoints públicos aceitam apenas leitura
- Mutações públicas retornam 423 com mensagem demonstrativa
- Professor autorizado pode acessar área docente em modo leitura
- Escrita docente desabilitada por default (ativável seletivamente)

---

## 4. Feature Flags Propostas

| Flag | Valor | Efeito |
|---|---|---|
| `PILOT_MODE` | `true` | Já existente. Mantido |
| `PILOT_READONLY_MODE` | `true` | **NOVA.** Bloqueia mutações públicas |
| `PILOT_ALLOW_TEACHER_WRITES` | `false` | **NOVA.** Bloqueia escrita docente durante demo |
| `PILOT_ALLOW_UPLOADS` | `false` | **NOVA.** Bloqueia uploads |
| `PILOT_DEMO_PROGRESS_STORAGE` | `none` | **NOVA.** Sem progresso visual |

---

## 5. Plano para Cada Risco

| Risco | Plano |
|---|---|
| R1 — POST squad sem auth | Middleware `blockPilotReadonlyWrites` bloqueia POST público → 423 |
| R2 — Submit + upload com token | Middleware bloqueia POST em readonly. Frontend desabilita botão |
| R3 — Botão professor invisível mobile | Implementar menu hamburger com "Área do Professor" |
| R4 — Sem hamburger | Criar componente hamburger com toggle, links, close-on-navigate |
| R5 — alunosOriginal exposto | Suprimir em readonly (não há criação de bancada) |
| R6 — Upload sem rate limit | Bloquear upload em readonly. Adicionar rate limit para futuro |
| R7 — Auth sem rate limit | Adicionar rate limit de 10 req/15min para `/api/auth/*` |
| R8 — Atlas M0 saturação | Bloquear escritas públicas = elimina vetor de crescimento |

---

## 6. Simulação sem Salvar no Banco

Em `PILOT_READONLY_MODE=true` e `PILOT_DEMO_PROGRESS_STORAGE=none`:
- Visitante vê a trilha gamificada **estática** (9 missões, todas locked exceto a 1ª)
- Visitante pode ler briefings, ver descrições, entender o fluxo
- Visitante **NÃO** pode submeter experimentos, uploads ou respostas
- Nenhum dado é gravado no Atlas durante demonstração pública
- Professor autorizado pode visualizar turmas, bancadas e relatórios em modo leitura

---

## 7. Separação Piloto vs SaaS

| Fase | Identificador | Foco |
|---|---|---|
| AGORA | `PILOT_READONLY_HARDENING` | Demo segura, sem escrita pública |
| PRÓXIMA | `PILOT_TEACHER_ADMIN_CONTROLLED` | Professor opera em sessão controlada |
| FUTURA | `SAAS_MULTITENANT_FOUNDATION` | Multi-escola, RBAC, Cloud Storage |
| FUTURA | `SAAS_SCHOOL_ONBOARDING` | Auto-cadastro, LGPD, personalização |
| FUTURA | `SAAS_BILLING_COMMERCIALIZATION` | Planos, gateway, dashboard financeiro |

---

## 8. Testes de Sanidade

| Suite | Resultado |
|---|---|
| `server` (vitest) | 63/63 ✅ |
| `client` (vitest) | 8/8 ✅ |
| `curso-interativo` (vitest) | 47/47 ✅ |
| `ebook-ecosabon-prototipo` (vitest) | 124/124 ✅ |
| **TOTAL** | **242/242 ✅** |

---

## 9. Relatórios Integrados

| Relatório | Conteúdo |
|---|---|
| R182 | Auditoria de riscos do modo piloto público |
| R183 | Especificação do PILOT_READONLY_MODE |
| R184 | Plano de hardening do piloto readonly |
| R185 | Roadmap piloto para SaaS |
| R186 | **Esta decisão** |

---

## 10. DECISÃO FINAL

```
DECISÃO: O MODO PILOTO ONLINE DEVE SER CONVERTIDO PARA PILOT_READONLY_MODE,
PERMITINDO VERIFICAÇÃO PÚBLICA CONTROLADA SEM PERSISTÊNCIA DE AÇÕES DE
VISITANTES NO BANCO.

UPLOADS, CRIAÇÃO/EDIÇÃO DE BANCADAS, PROGRESSO PERSISTENTE E QUALQUER
ESCRITA PÚBLICA DEVEM SER BLOQUEADOS.

RESPONSIVIDADE MOBILE DEVE GARANTIR ACESSO VISÍVEL À ÁREA DO PROFESSOR
VIA MENU HAMBURGER.

A EVOLUÇÃO SAAS DEVE SER TRATADA EM FASE POSTERIOR SEPARADA.
```

---

## 11. Próxima Fase Recomendada

```
SEC-PILOT-READONLY-MODE-IMPLEMENTATION — implementar modo piloto sem escrita pública,
corrigir responsividade mobile e bloquear uploads/mutações antes de qualquer nova
divulgação.
```

---

## 12. Governança

- ❌ Código: inalterado nesta fase
- ❌ Render: inalterado
- ❌ Vercel: inalterado
- ❌ Atlas: inalterado
- ❌ Web-book: intocado
- ❌ GitHub Pages: intocado
- ❌ QR Code: **NÃO GERADO**
- ❌ Segredos: nenhum versionado
- ❌ E-mails reais: nenhum exposto
- ❌ Dados reais: nenhum utilizado
- ✅ Relatórios R182–R186: criados e commitados

---

_Decisão registrada em 2026-07-01. Auditoria em modo estrito com 242/242 testes verdes._
