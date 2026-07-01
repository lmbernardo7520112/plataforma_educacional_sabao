# R193 — Homologação de Segurança: Piloto Controlado — Plataforma EcoSabon

## 1. Testes de Segurança

| Teste | Resultado |
|---|---|
| Visitante anônimo POST /classrooms/:id/squads → 423 | ✅ `blockAnonymousMutationsInPilot` |
| Visitante anônimo PUT /classrooms/:id/squads/:id → 423 | ✅ `blockAnonymousMutationsInPilot` |
| Visitante anônimo DELETE → 423 | ✅ `blockAnonymousMutationsInPilot` |
| Professor JWT TEACHER cria bancada → 201 | ✅ `requireAuth+requireRole(['TEACHER'])` |
| Professor fora allowlist → 403 | ✅ `checkTeacherPilotAccess` |
| Código de acesso inválido → 401 | ✅ `authenticateSquadByAccessCode` |
| Código de acesso válido → JWT SQUAD | ✅ `authenticateSquadByAccessCode` |
| Squad JWT submete missão sem foto → 200 | ✅ `conditionalUpload` bypassa multer |
| Squad JWT de outra bancada → 403 | ✅ `requireSquadOwnership` |
| GET público onboarding → 200 | ✅ Read-only continua funcional |
| POST teacher/login sem JWT → 200 | ✅ Whitelisted |
| POST squad/login-by-code sem JWT → 200 | ✅ Whitelisted |
| POST com JWT inválido → 423 | ✅ Token inválido bloqueado |
| Upload com PILOT_ALLOW_UPLOADS=false → multer bypassed | ✅ Sem file no req |

## 2. Threat Model Atualizado

| Ameaça | Severidade Pós-Hardening | Controle |
|---|---|---|
| T1: Criação anônima de bancada | **ELIMINADA** | `requireAuth+requireRole(['TEACHER'])` |
| T2: Spam de submissões | BAIXA | `requireAuth+requireSquadOwnership` + rate limit |
| T3: Acesso cruzado | NENHUMA | `requireSquadOwnership` |
| T4: Brute-force código | BAIXA | Rate limit + 6 chars (2.2B combinações) |
| T5: Upload abusivo | **ELIMINADA** | `PILOT_ALLOW_UPLOADS=false` |
| T7: Crescimento Atlas | MUITO BAIXA | Escritas limitadas a squads autenticados |
| T9: Conta professor | BAIXA | Allowlist + bcrypt + JWT 8h |

## 3. Bloqueio de Visitante

- Middleware global `blockAnonymousMutationsInPilot` (montado em `server.ts`)
- Retorna 423 para POST/PUT/PATCH/DELETE sem JWT válido
- Whitelist: teacher login, teacher register, squad login, squad login-by-code
- 13 testes cobrindo todos os cenários

## 4. Professor Allowlisted

- Login restrito por `checkTeacherPilotAccess` middleware
- Allowlist via `PILOT_ALLOWED_TEACHER_EMAILS`
- JWT token com `role: 'TEACHER'` e `email` verificado
- Criação de bancada gera `accessCode` de 6 caracteres

## 5. Participante Escopado

- Login por código de acesso (`POST /api/auth/squad/login-by-code`)
- JWT token contém: `{ squadId, classroomId, role: 'SQUAD', pilot: true }`
- `requireSquadOwnership` garante acesso apenas à própria bancada
- Upload desabilitado no piloto

## 6. Banco Protegido

- Nenhuma escrita anônima
- Criação de bancada: apenas por TEACHER autenticado
- Progresso de missão: apenas por SQUAD autenticado com ownership
- Atlas M0 (512MB) protegido contra spam
- `accessCode` no Squad model com `select: false` (nunca retornado em queries normais)

## 7. Uploads Bloqueados

- `isPilotUploadsAllowed()` retorna `false` quando `PILOT_ALLOW_UPLOADS` não é `'true'`
- `conditionalUpload` middleware bypassa multer completamente
- Missões aceitam submissão sem foto quando uploads bloqueados
- MissionReactor no frontend pula Step 3 (foto) em modo piloto

## 8. Secrets

- Nenhum `.env` com conteúdo real versionado
- Nenhum `DATABASE_URL` no código
- Nenhum `JWT_SECRET` hardcoded
- Nenhum e-mail real no código
- `accessCode` gerado via `crypto.randomBytes` — não exposto em payloads públicos

## 9. Decisão

`DECISÃO: A SEGURANÇA DO PILOTO CONTROLADO ESTÁ HOMOLOGADA. TODOS OS VETORES DE AMEAÇA CRÍTICOS E ALTOS FORAM ELIMINADOS OU MITIGADOS. RISCO RESIDUAL ACEITÁVEL. 265 TESTES VERDES + BUILD OK.`

---

_Homologação de segurança realizada em 2026-07-01._
