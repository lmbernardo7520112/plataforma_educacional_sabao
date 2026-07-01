# R196 — Revisão de Segurança do PR #62 — Piloto Controlado EcoSabon

## 1. Contexto

PR #62 implementa `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS`.

Branch: `security/ecosabon-teacher-controlled-writes-implementation`
Base: `main`

## 2. Blockers Encontrados e Corrigidos

### BLOCKER 1: `accessCode` armazenado como plaintext

**Status anterior:** O campo `accessCode` do Squad era armazenado diretamente no MongoDB com `select: false`. Embora não fosse retornado em queries normais, qualquer dump do banco, backup ou acesso via Compass exporia os códigos em texto claro.

**Correção implementada:**
- Renomeado para `accessCodeHash` no model e interface
- Hash via SHA-256 (`crypto.createHash('sha256')`)
- Código de 8 caracteres (era 6) para entropia adequada (36^8 ≈ 2.8T combinações)
- `timingSafeEqual` na verificação
- Código plaintext retornado **apenas uma vez** na resposta de criação ao professor
- Banco contém apenas hash hexadecimal de 64 chars

**Arquivos corrigidos:**
- `server/models/Squad.ts` — campo `accessCodeHash`
- `server/services/squadService.ts` — `generateAccessCode()`, `hashAccessCode()`, `verifyAccessCode()`
- `server/services/authService.ts` — `authenticateSquadByAccessCode()` usa hash lookup + `timingSafeEqual`

**Testes adicionados:** 12 testes em `server/services/squadService.test.ts`

### BLOCKER 2: Login por código sem rate limit dedicado

**Status anterior:** O endpoint `POST /api/auth/squad/login-by-code` usava apenas o rate limiter global de 100 req/15min.

**Correção implementada:**
- `squadJoinLimiter`: 10 tentativas por 15 minutos por IP
- `teacherLoginLimiter`: 15 tentativas por 15 minutos por IP
- Mensagem genérica: "Código de acesso inválido ou bancada inativa."
- Catch genérico suprime erros internos — previne enumeração

**Arquivo corrigido:** `server/routes/authRoutes.ts`

### BLOCKER 3: Upload não rejeitava explicitamente arquivos em modo bloqueado

**Status anterior:** `conditionalUpload` apenas pulava multer via `next()`, mas não rejeitava explicitamente uploads.

**Correção implementada:**
- Detecta `Content-Type: multipart/form-data` com boundary
- Usa `upload.none()` para rejeitar arquivos com `LIMIT_UNEXPECTED_FILE`
- Retorna 423 com `PILOT_UPLOADS_BLOCKED`
- Requests sem arquivo (JSON puro) passam normalmente

**Arquivo corrigido:** `server/routes/missionRoutes.ts`

## 3. Itens Verificados (Sem Blocker)

### `.env` tracking

`server/.env` NÃO está no Git tree nem no índice. `.gitignore` contém regra `server/.env` (L17) e `.env*` (L90). Apenas `server/.env.example` é tracked. Sem ação necessária.

### Token SQUAD escopado

Payload JWT: `{ squadId, classroomId, role: 'SQUAD', pilot: true }`
- Sem email
- Sem nomes
- Sem accessCode/hash
- Sem permissões admin
- `requireSquadOwnership` impede cross-squad
- `requireRole(['TEACHER'])` impede squad em rotas teacher

### Visitante read-only

- `blockAnonymousMutationsInPilot` bloqueia POST/PUT/DELETE sem JWT (423)
- GET público funciona (onboarding, cursos)
- Whitelisted: teacher login/register, squad login/login-by-code

### Professor allowlisted

- `checkTeacherPilotAccess` verifica email na allowlist
- `requireRole(['TEACHER'])` em POST/PUT/DELETE de squads
- `createdByTeacherId` registra rastreabilidade

### Mobile Navbar

- Menu hamburger com `mobile-menu-toggle`
- "Área do Professor" e "Área do Aluno" visíveis em mobile
- Botões 44×44px (touch adequado)
- Auto-close no navigation

## 4. Testes Reais

| Suite | Contagem | Status |
|---|---|---|
| Server (vitest) | 98 | ✅ |
| Curso Interativo (vitest) | 47 | ✅ |
| Ebook (vitest) | 124 | ✅ |
| Build Vite | OK | ✅ |
| **TOTAL** | **269** | **✅** |

### Testes novos nesta revisão

| Arquivo | Testes | Descrição |
|---|---|---|
| `server/services/squadService.test.ts` | 12 | Geração, hash, verificação, flow completo |

## 5. CI/CD

| Check | Status |
|---|---|
| GitGuardian | ✅ |
| Gitleaks | ✅ |
| EcoSabon Build | ✅ |
| EcoSabon Quality | ✅ |
| EcoSabon Tests | ✅ |
| Vercel Preview | ✅ |

## 6. Decisão

```
DECISÃO: PR #62 REVISADO E CORRIGIDO.
- accessCode NÃO é armazenado em plaintext (SHA-256 hash).
- login-by-code possui rate limit dedicado (10 req/15min/IP).
- token SQUAD é escopado (squadId, classroomId, role, pilot).
- uploads rejeitados explicitamente com 423.
- visitantes não escrevem no banco (423).
- .env local NÃO é tracked.
- 269 testes verdes + build OK.

TODOS OS BLOCKERS FORAM CORRIGIDOS. PR #62 APROVADO PARA MERGE.
```

---

_Revisão de segurança realizada em 2026-07-01._
