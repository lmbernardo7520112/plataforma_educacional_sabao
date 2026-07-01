# R190 — Threat Model: Piloto com Escrita Controlada — Plataforma EcoSabon

## 1. Escopo

Modelagem de ameaças para a arquitetura `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS` no piloto EcoSabon, considerando os vetores de ataque contra endpoints, banco, identidades e UX.

---

## 2. Superfície de Ataque

| Superfície | Componente | Exposição |
|---|---|---|
| Endpoints públicos GET | `/api/onboarding/*` | Internet aberta |
| Endpoint de login teacher | `POST /api/auth/teacher/login` | Internet aberta (allowlist) |
| Endpoint de login squad | `POST /api/auth/squad/login-by-code` | Internet aberta (código) |
| Endpoints protegidos por JWT | `POST/PUT/DELETE /api/*` | Requer token válido |
| Frontend SPA | Vercel | Internet aberta |
| Backend Express | Render | Internet aberta |
| MongoDB Atlas | Rede interna (allowlist IP) | Atlas M0 |
| Filesystem Render | Uploads | Efêmero |

---

## 3. Ameaças e Controles (GATE 9)

### T1 — Visitante cria centenas de bancadas

| Atributo | Detalhe |
|---|---|
| **Vetor** | `POST /api/classrooms/:id/squads` sem autenticação |
| **Impacto** | Saturação da collection `squads`, crescimento do Atlas M0 (512MB), dados lixo |
| **Probabilidade** | ALTA (endpoint completamente aberto) |
| **Severidade** | **CRÍTICA** |
| **Controle** | Adicionar `requireAuth + requireRole(['TEACHER'])` no POST. Middleware global `blockAnonymousMutationsInPilot` como safety net |
| **Teste** | `POST /api/classrooms/:id/squads` sem JWT → 423. Com JWT SQUAD → 403. Com JWT TEACHER → 201 |

### T2 — Visitante envia centenas de missões

| Atributo | Detalhe |
|---|---|
| **Vetor** | `POST /api/squads/:id/missions/submit` |
| **Impacto** | Crescimento da collection `journeystates`, dados falsos |
| **Probabilidade** | MÉDIA (requer JWT SQUAD válido) |
| **Severidade** | **ALTA** |
| **Controle** | `requireAuth + requireSquadOwnership` (já existe). Middleware global bloqueia sem JWT. Rate limit de 5 req/15min para submit |
| **Teste** | `POST /submit` sem JWT → 401. Com JWT SQUAD de outra bancada → 403 |

### T3 — Visitante acessa bancada alheia

| Atributo | Detalhe |
|---|---|
| **Vetor** | `GET /api/squads/:id/missions` com squadId de outra bancada |
| **Impacto** | Vazamento de progresso de outra equipe (dados sintéticos no piloto) |
| **Probabilidade** | BAIXA (requer JWT SQUAD válido + ownership) |
| **Severidade** | MÉDIA |
| **Controle** | `requireSquadOwnership` verifica `req.user.squadId === req.params.squadId`. Já implementado |
| **Teste** | GET com JWT de squad A para squad B → 403 |

### T4 — Visitante força códigos de bancada

| Atributo | Detalhe |
|---|---|
| **Vetor** | Brute-force no `POST /api/auth/squad/login-by-code` tentando códigos aleatórios |
| **Impacto** | Acesso não autorizado a bancada |
| **Probabilidade** | BAIXA (6 chars alfanuméricos = 2.176.782.336 combinações) |
| **Severidade** | MÉDIA |
| **Controle** | Rate limit de 10 req/15min para `/api/auth/*`. Código de 6 chars com nanoid (charset 36^6 ≈ 2.2B). Lockout após 5 tentativas falhas (futuro) |
| **Teste** | 15+ tentativas em 15min → 429 Too Many Requests |

### T5 — Upload abusivo

| Atributo | Detalhe |
|---|---|
| **Vetor** | `POST /api/squads/:id/missions/submit` com arquivo grande ou malicioso |
| **Impacto** | Consumo de disco Render (efêmero), carga no servidor |
| **Probabilidade** | BAIXA (uploads bloqueados no piloto) |
| **Severidade** | MÉDIA (se habilitado) |
| **Controle** | `PILOT_ALLOW_UPLOADS=false` → multer bypassed. Quando habilitado: 1MB max, MIME allowlist (jpeg/png/webp), rate limit de 5/15min |
| **Teste** | Upload com `PILOT_ALLOW_UPLOADS=false` → middleware pula multer, evidencePhoto=null aceito |

### T6 — Scraping de endpoints públicos

| Atributo | Detalhe |
|---|---|
| **Vetor** | GET automatizados em `/api/onboarding/*` para extrair dados |
| **Impacto** | Load no Atlas, exposição de DTOs mínimos (nomes de turmas, nomes de bancadas, memberCount) |
| **Probabilidade** | BAIXA |
| **Severidade** | BAIXA (DTOs já minimizados) |
| **Controle** | Rate limit 50 req/15min em onboarding. Helmet headers. CORS restrito |
| **Teste** | 60 GETs em 15min → 429 |

### T7 — Crescimento indevido do Atlas

| Atributo | Detalhe |
|---|---|
| **Vetor** | Escritas legítimas acumuladas (progresso de missões, bancadas) |
| **Impacto** | Atlas M0 atinge 512MB |
| **Probabilidade** | MUITO BAIXA no piloto (2 turmas, ~20 bancadas, 9 missões cada ≈ 180 documentos JourneyState) |
| **Severidade** | BAIXA |
| **Controle** | Estimativa: 180 docs × ~2KB = ~360KB. Ordem de grandeza menor que 512MB. Monitorar via Atlas UI |
| **Teste** | Verificar tamanho das collections após 1 semana de uso |

### T8 — Cold start explorado por bots

| Atributo | Detalhe |
|---|---|
| **Vetor** | Render Free hiberna após 15min inatividade. Bot força cold starts repetidos |
| **Impacto** | Latência de 30-60s para primeiro request. UX degradada |
| **Probabilidade** | BAIXA (sem incentivo financeiro para atacante) |
| **Severidade** | BAIXA (UX, não segurança) |
| **Controle** | Helmet + rate limit. Render Free: limitação aceita no piloto. Upgrade para Render Starter ($7/mo) elimina |
| **Teste** | Medir tempo de resposta após 20min inatividade |

### T9 — Conta de professor comprometida

| Atributo | Detalhe |
|---|---|
| **Vetor** | Senha de Leonardo/Nadja vazada (phishing, reutilização) |
| **Impacto** | Atacante cria bancadas, deleta dados, vê relatórios |
| **Probabilidade** | BAIXA (apenas 2 contas, pessoas reais) |
| **Severidade** | **ALTA** |
| **Controle** | Allowlist restrita (2 e-mails). bcrypt com salt 10. JWT expira em 8h. Rotação de senha recomendada. 2FA futuro |
| **Teste** | Login com e-mail fora da allowlist → 403 |

### T10 — Token de squad vazado

| Atributo | Detalhe |
|---|---|
| **Vetor** | JWT SQUAD compartilhado ou interceptado (HTTP em dev, localStorage inspecionado) |
| **Impacto** | Terceiro acessa a bancada alheia. Pode submeter missões |
| **Probabilidade** | BAIXA (HTTPS em produção, token expira em 24h) |
| **Severidade** | MÉDIA |
| **Controle** | HTTPS (Render/Vercel enforce). JWT expira em 24h. `requireSquadOwnership` limita escopo. Código de acesso pode ser regenerado pelo professor |
| **Teste** | Token expirado → 401 |

### T11 — Replay de token/link

| Atributo | Detalhe |
|---|---|
| **Vetor** | Reutilização de JWT SQUAD após regeneração de código pela professor |
| **Impacto** | Acesso continuado mesmo após código alterado |
| **Probabilidade** | BAIXA |
| **Severidade** | BAIXA |
| **Controle** | JWT é stateless — continua válido até expirar (24h). Aceitável para piloto. Para SaaS: token revocation list |
| **Teste** | Token emitido com código antigo continua válido até expirar |

### T12 — Enumeração de IDs

| Atributo | Detalhe |
|---|---|
| **Vetor** | Iteração sobre MongoDB ObjectIDs para descobrir bancadas/turmas |
| **Impacto** | Acesso a DTOs públicos (já minimizados), tentativa de login por ID |
| **Probabilidade** | BAIXA (ObjectIDs são pseudo-aleatórios, 24 hex = 16^24 combinações) |
| **Severidade** | BAIXA |
| **Controle** | Squad login por código (não por ID). DTOs públicos minimizados. Rate limit |
| **Teste** | GET com ID inexistente → 404 |

---

## 4. Matriz de Risco Consolidada

| # | Ameaça | Probabilidade | Impacto | Severidade | Controle | Status Pós-Hardening |
|---|---|---|---|---|---|---|
| T1 | Criação de bancada anônima | ALTA | ALTO | **CRÍTICA** | requireAuth + requireRole(TEACHER) | ✅ MITIGADA |
| T2 | Spam de submissão de missão | MÉDIA | ALTO | **ALTA** | requireAuth + requireSquadOwnership + rate limit | ✅ MITIGADA |
| T3 | Acesso cruzado de bancada | BAIXA | MÉDIO | MÉDIA | requireSquadOwnership | ✅ JÁ MITIGADA |
| T4 | Brute-force código | BAIXA | MÉDIO | MÉDIA | Rate limit 10/15min + nanoid 6 chars | ✅ MITIGADA |
| T5 | Upload abusivo | BAIXA | MÉDIO | MÉDIA | PILOT_ALLOW_UPLOADS=false | ✅ MITIGADA |
| T6 | Scraping público | BAIXA | BAIXO | BAIXA | Rate limit 50/15min | ✅ JÁ MITIGADA |
| T7 | Crescimento Atlas | MUITO BAIXA | BAIXO | BAIXA | ~360KB estimado (piloto) | ✅ ACEITÁVEL |
| T8 | Cold start bots | BAIXA | BAIXO | BAIXA | Rate limit | ✅ ACEITÁVEL |
| T9 | Conta professor | BAIXA | ALTO | **ALTA** | Allowlist + bcrypt + JWT 8h | ⚠️ ACEITAR + 2FA futuro |
| T10 | Token squad vazado | BAIXA | MÉDIO | MÉDIA | HTTPS + JWT 24h + ownership | ✅ ACEITÁVEL |
| T11 | Replay token | BAIXA | BAIXO | BAIXA | JWT stateless 24h | ✅ ACEITÁVEL |
| T12 | Enumeração IDs | BAIXA | BAIXO | BAIXA | Login por código, não ID | ✅ MITIGADA |

---

## 5. Risco Residual Aceitável

Após hardening, os riscos residuais são:
1. **Conta de professor comprometida (T9)** — aceito para piloto, mitigado com allowlist e bcrypt. 2FA para SaaS.
2. **Token squad vazado (T10)** — aceito, HTTPS em produção, 24h de expiração.
3. **Cold start (T8)** — UX, não segurança. Aceito no Render Free.

Nenhum risco residual é **CRÍTICO** ou **ALTO** pós-hardening.

---

## 6. Decisão

`DECISÃO: O THREAT MODEL CONFIRMA QUE A ARQUITETURA PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS REDUZ TODOS OS RISCOS CRÍTICOS E ALTOS PARA NÍVEIS ACEITÁVEIS NO PILOTO. O RISCO RESIDUAL MAIS ALTO É A COMPROMETIMENTO DA CONTA DOCENTE (ACEITO COM ALLOWLIST + BCRYPT, 2FA FUTURO).`

---

_Threat model criado em 2026-07-01._
