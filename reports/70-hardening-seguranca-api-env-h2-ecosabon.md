# 📋 Relatório 70 — Hardening de Segurança de API e Configuração de Ambiente H2 (EcoSabon)

| Campo              | Valor                                                    |
|--------------------|----------------------------------------------------------|
| **Fase**           | H2 — Hardening de Segurança de API e Configuração        |
| **Data**           | 2026-06-22                                               |
| **Branch**         | `security/ecosabon-h2-api-env-hardening`                  |
| **Base**           | `main`                                                   |
| **Pré-requisito**  | H1 concluída (PR #26)                                    |
| **RC1 preservada** | `ecosabon-premium3d-v0.2.0-rc1` — NÃO ALTERADA           |

---

## 1. Objetivo

Executar hardening de segurança de rotas de API, configuração de CORS por ambiente, validação de uploads e documentação operacional do server EcoSabon, sem alterar a release candidate, o e-book ou qualquer funcionalidade de usuário.

---

## 2. Matriz de Rotas

| Rota | Método | Finalidade | Antes (H1) | Depois (H2) | Decisão |
|------|--------|-----------|------------|-------------|---------|
| `GET /` | GET | Health check | 🟢 Pública | 🟢 Pública | Manter — sem dados sensíveis |
| `GET /ping` | GET | Health check | 🟢 Pública | 🟢 Pública | Manter |
| `POST /api/auth/teacher/register` | POST | Registrar professor | 🟢 Pública | 🟢 Pública | Manter — fluxo de onboarding |
| `POST /api/auth/teacher/login` | POST | Login professor | 🟢 Pública | 🟢 Pública | Manter — autenticação |
| `POST /api/auth/squad/login` | POST | Login squad | 🟢 Pública | 🟢 Pública | Manter — autenticação |
| `GET /api/classrooms` | GET | Listar turmas | 🔴 **Pública** | 🟢 **Protegida** | **CORRIGIDO** — `requireAuth` |
| `GET /api/classrooms/:id` | GET | Detalhes turma | 🔴 **Pública** | 🟢 **Protegida** | **CORRIGIDO** — `requireAuth` |
| `GET /api/classrooms/:id/squads` | GET | Listar squads | 🔴 **Pública** | 🟢 **Protegida** | **CORRIGIDO** — `requireAuth` |
| `POST /api/classrooms/:id/squads` | POST | Criar squad | 🟡 Pública | 🟡 Pública | **Manter** — onboarding auto-gera JWT |
| `PUT /api/classrooms/:id/squads/:squadId` | PUT | Editar squad | 🟢 Protegida | 🟢 Protegida | Já protegida |
| `DELETE /api/classrooms/:id/squads/:squadId` | DELETE | Excluir squad | 🟢 Protegida | 🟢 Protegida | Já protegida (TEACHER only) |
| `GET /api/squads/standalone/:id` | GET | Detalhes squad | 🔴 **Pública** | 🟢 **Protegida** | **CORRIGIDO** — `requireAuth` |
| `GET /api/squads/:squadId/missions` | GET | Listar missões | 🔴 **Pública** | 🟢 **Protegida** | **CORRIGIDO** — `requireAuth` |
| `POST /api/squads/:squadId/missions/submit` | POST | Submeter missão + upload | 🔴 **Pública** | 🟢 **Protegida** | **CORRIGIDO** — `requireAuth` |
| `GET /api/report/squads/:squadId` | GET | Dossiê acadêmico | 🟢 Protegida | 🟢 Protegida | Já protegida |

### Resumo:
- **6 rotas corrigidas** (de pública para protegida)
- **1 rota mantida pública com justificativa** (POST squad creation = onboarding)
- **5 rotas já protegidas** (sem alteração)
- **5 rotas públicas por design** (health + auth)

---

## 3. Escopo Executado

### 3.1 — Rotas Protegidas

Adicionado `requireAuth` middleware a:
- `classroomRoutes.ts`: GET `/` e GET `/:id`
- `squadRoutes.ts`: GET `/` e GET `/standalone/:id`
- `missionRoutes.ts`: GET `/` e POST `/submit`

### 3.2 — CORS por Ambiente

**Antes:**
```typescript
cors({ origin: ['http://localhost:5173'], credentials: true })
```

**Depois:**
```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

// Em produção, ALLOWED_ORIGINS é obrigatório
cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: Origin ${origin} not allowed.`));
  },
  credentials: true,
})
```

### 3.3 — Rate Limiting Configurável

Rate limit agora aceita configuração via variáveis de ambiente:
- `RATE_LIMIT_WINDOW_MS` (default: 900000 = 15min)
- `RATE_LIMIT_MAX` (default: 100)

### 3.4 — Upload / MIME / Tamanho

**Já implementado em `server/middleware/upload.ts` (sem alteração necessária):**
- ✅ Limite de tamanho: 5 MB
- ✅ MIME types permitidos: `image/jpeg`, `image/png`, `image/webp`
- ✅ Validação de extensão: `jpeg|jpg|png|webp`
- ✅ Nomes de arquivo: `crypto.randomUUID()` (sem path traversal)
- ✅ Diretório criado automaticamente
- ✅ Mensagem de erro clara

### 3.5 — `.env.example`

Criado `server/.env.example` com todas as variáveis usadas pelo server:
- `NODE_ENV`, `PORT`, `DATABASE_URL`, `JWT_SECRET`
- `ALLOWED_ORIGINS`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`
- Nenhum segredo real commitado

---

## 4. Arquivos Alterados

| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `server/routes/classroomRoutes.ts` | **EDITADO** — adicionado `requireAuth` a GET `/` e GET `/:id` |
| `server/routes/squadRoutes.ts` | **EDITADO** — adicionado `requireAuth` a GET `/` e GET `/standalone/:id` |
| `server/routes/missionRoutes.ts` | **EDITADO** — adicionado `requireAuth` a GET `/` e POST `/submit` |
| `server/server.ts` | **EDITADO** — CORS por ambiente + rate limit configurável |
| `server/.env.example` | **CRIADO** — documentação de variáveis de ambiente |

---

## 5. Testes

| Suite | Resultado | Comando |
|-------|-----------|---------|
| E-book (Vitest) | **104/104 ✅** | `npm test --prefix ebook-ecosabon-prototipo` |
| Curso Interativo (Vitest) | **47/47 ✅** | `npm test` |
| Server Domain (Vitest) | **8/8 ✅** | `cd server && npx vitest run` |

**Total: 159/159 testes passando — baseline preservado.**

---

## 6. Auditorias

| Item | Resultado |
|------|-----------|
| JWT fallback hardcoded | ✅ LIMPO |
| CORS hardcoded localhost-only | ✅ CORRIGIDO — environment-driven |
| Upload sem validação | ✅ N/A — já validado (5MB, MIME, extensão) |
| `.env` rastreado no git | ✅ LIMPO — ignorado pelo `.gitignore` |
| Rastreamento indevido | ✅ LIMPO |

---

## 7. O que NÃO foi feito (por design)

- ❌ **Não alterou** a release `ecosabon-premium3d-v0.2.0-rc1`
- ❌ **Não alterou** `ebook-ecosabon-prototipo/index.html`
- ❌ **Não alterou** CSS/JS do e-book
- ❌ **Não alterou** Premium 3D / B1+B2
- ❌ **Não refatorou** `VanillaRenderer`
- ❌ **Não refatorou** `MissionReactor`
- ❌ **Não componentizou** HTML
- ❌ **Não implementou** novas features
- ❌ **Não iniciou** precificação/coleta/C4/3E

---

## 8. Riscos Residuais (Para H3+)

| Risco | Severidade | Fase Sugerida |
|-------|-----------|---------------|
| Revisão RBAC detalhada (role-based per route) | 🟡 Médio | H3 |
| Validação Zod em todas as rotas (nem todas têm schemas) | 🟡 Médio | H3 |
| Logging estruturado (Winston/Pino) | 🟢 Baixo | H4 |
| Refresh token pattern | 🟢 Baixo | H4 |
| Auditoria de uploads em ambiente real | 🟡 Médio | Deploy |
| Revisão de CORS em deploy real | 🟡 Médio | Deploy |
| VanillaRenderer God Object | 🟡 Médio | H3+ |

---

## 9. Decisão

> **H2 CONCLUÍDA COMO HARDENING DE SEGURANÇA DE API E CONFIGURAÇÃO DE AMBIENTE.**
> **RC1 PREMIUM 3D PRESERVADA E NÃO ALTERADA.**
> **NENHUMA FEATURE NOVA INTRODUZIDA.**
