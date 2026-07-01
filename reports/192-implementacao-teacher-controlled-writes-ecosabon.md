# R192 — Implementação: Teacher-Controlled Writable Squads — Piloto EcoSabon

## 1. Objetivo

Implementar a arquitetura `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS` na Plataforma EcoSabon, de modo que visitantes sejam read-only, professores allowlisted gerenciem bancadas e participantes usem a trilha com persistência escopada.

## 2. PRs Documentais Consolidados

- PR #60 (R182–R186) — mergeado ✅
- PR #61 (R187–R191) — mergeado ✅
- Decisão consolidada: o modelo final **NÃO** é read-only absoluto; é `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS`.

## 3. Arquivos Alterados

### Backend

| Arquivo | Mudança | Linhas |
|---|---|---|
| `server/config/pilot.ts` | +3 funções: `isPilotPublicReadonly`, `isPilotUploadsAllowed`, `isPilotSquadLoginAllowed` | +30 |
| `server/middleware/pilotReadonly.ts` | **NOVO** — bloqueia POST/PUT/DELETE anônimos em modo piloto | +68 |
| `server/server.ts` | Mount do middleware `blockAnonymousMutationsInPilot` | +5 |
| `server/routes/squadRoutes.ts` | POST: +`requireAuth+requireRole(['TEACHER'])`; PUT: +`requireRole(['TEACHER'])` | ~10 |
| `server/routes/missionRoutes.ts` | Upload condicional via `conditionalUpload` | +12 |
| `server/routes/authRoutes.ts` | +endpoint `POST /api/auth/squad/login-by-code` | +16 |
| `server/models/Squad.ts` | +campos `accessCode` (select:false), `createdByTeacherId` | +12 |
| `server/services/squadService.ts` | Gera `accessCode` (6 chars) + registra `createdByTeacherId` | +20 |
| `server/services/authService.ts` | +método `authenticateSquadByAccessCode` | +20 |

### Frontend

| Arquivo | Mudança | Linhas |
|---|---|---|
| `client/src/components/Navbar.tsx` | Menu hamburger mobile, "Área do Professor" visível | Reescrito (~95) |
| `client/src/pages/MissionReactor.tsx` | Upload opcional em piloto; submit direto sem foto | ~15 |

### Testes

| Arquivo | Testes Novos | Total |
|---|---|---|
| `server/middleware/pilotReadonly.test.ts` | **NOVO** — 13 testes | 13 |
| `server/config/pilot.test.ts` | +10 testes (3 novos describes) | 22 |

## 4. Feature Flags

```env
PILOT_MODE=true              # Ativa modo piloto
PILOT_PUBLIC_READONLY=true   # Bloqueia escritas anônimas (default-safe)
PILOT_ALLOW_UPLOADS=false    # Bloqueia uploads (default-safe)
PILOT_ALLOW_SQUAD_LOGIN=true # Permite login por código de acesso
```

## 5. Regras Implementadas

| Regra | Implementação |
|---|---|
| Visitante não cria bancada | `requireAuth+requireRole(['TEACHER'])` no POST |
| Visitante não edita bancada | `requireAuth+requireRole(['TEACHER'])` no PUT |
| Visitante não submete missão | `requireAuth+requireSquadOwnership` + middleware global |
| Professor cria bancada com código | `accessCode` gerado automaticamente via crypto |
| Participante entra com código | `POST /api/auth/squad/login-by-code` |
| Upload bloqueado | `conditionalUpload` bypassa multer |
| Mobile: Área do Professor visível | Menu hamburger com links responsivos |
| Mobile: toque adequado | Botões 44×44px |

## 6. Endpoints

| Endpoint | Método | Auth Antes | Auth Depois |
|---|---|---|---|
| `POST /classrooms/:id/squads` | POST | **NENHUM** ⚠️ | `requireAuth+requireRole(['TEACHER'])` ✅ |
| `PUT /classrooms/:id/squads/:id` | PUT | `requireAuth+requireSquadOwnership` | `requireAuth+requireRole(['TEACHER'])` ✅ |
| `POST /auth/squad/login-by-code` | POST | **INEXISTENTE** | **NOVO** — login por código ✅ |
| `POST /squads/:id/missions/submit` | POST | `requireAuth+requireSquadOwnership+multer` | `requireAuth+requireSquadOwnership+conditionalUpload` ✅ |

## 7. Testes

| Suite | Contagem | Status |
|---|---|---|
| Server (vitest) | 86 | ✅ |
| Client (vitest) | 8 | ✅ |
| Curso Interativo (vitest) | 47 | ✅ |
| Ebook (vitest) | 124 | ✅ |
| Build Vite | OK | ✅ |
| **TOTAL** | **265** | **✅** |

---

_Implementação realizada em 2026-07-01._
