# R197 — Merge Report: Piloto Controlado Teacher-Controlled Writes — EcoSabon

## 1. PR #62

| Campo | Valor |
|---|---|
| Título | feat(pilot): enforce teacher-controlled writable squads |
| Branch | `security/ecosabon-teacher-controlled-writes-implementation` |
| Base | `main` |
| Hash Merge | `8576d3f` |
| Commits | 2 (implementação + hardening de segurança) |
| Arquivos | 18 |
| Adições | +1067 |
| Deleções | −35 |

## 2. Arquivos Alterados (18)

### Backend (14)

| Arquivo | Tipo |
|---|---|
| `server/config/pilot.ts` | Modificado — +3 feature flags |
| `server/config/pilot.test.ts` | Modificado — +10 testes |
| `server/middleware/pilotReadonly.ts` | **Novo** — middleware global |
| `server/middleware/pilotReadonly.test.ts` | **Novo** — 13 testes |
| `server/models/Squad.ts` | Modificado — `accessCodeHash`, `createdByTeacherId` |
| `server/routes/authRoutes.ts` | Modificado — login-by-code + rate limiters |
| `server/routes/missionRoutes.ts` | Modificado — conditional upload |
| `server/routes/squadRoutes.ts` | Modificado — requireAuth+requireRole |
| `server/server.ts` | Modificado — mount pilotReadonly |
| `server/services/authService.ts` | Modificado — hash-based auth |
| `server/services/squadService.ts` | Modificado — hash+generate+verify |
| `server/services/squadService.test.ts` | **Novo** — 12 testes crypto |

### Frontend (2)

| Arquivo | Tipo |
|---|---|
| `client/src/components/Navbar.tsx` | Reescrito — hamburger mobile |
| `client/src/pages/MissionReactor.tsx` | Modificado — upload condicional |

### Reports (4)

| Report | Descrição |
|---|---|
| R192 | Implementação |
| R193 | Homologação de segurança |
| R194 | Decisão |
| R196 | Revisão de segurança pré-merge |

## 3. Testes Pós-Merge

| Suite | Contagem | Status |
|---|---|---|
| Server (vitest) | 98 | ✅ |
| Curso Interativo (vitest) | 47 | ✅ |
| Ebook (vitest) | 124 | ✅ |
| Build Vite | OK | ✅ |
| **Total** | **269** | **✅** |

## 4. CI/CD Pós-Merge

Todos os checks verdes: GitGuardian, Gitleaks, EcoSabon CI/CD (3 jobs), Vercel.

## 5. Secrets

- Nenhum `.env` tracked (apenas `.env.example`)
- Nenhum segredo no código
- Nenhum e-mail real
- `accessCode` armazenado como SHA-256 hash
- Código plaintext retornado apenas uma vez ao professor

## 6. Decisão

```
DECISÃO: PR #62 MERGEADO NA MAIN COM SUCESSO.
HASH: 8576d3f
269 TESTES VERDES + BUILD OK + CI/CD VERDE.
TODOS OS BLOCKERS DE SEGURANÇA CORRIGIDOS ANTES DO MERGE.

PRÓXIMA FASE: SEC-PILOT-CONTROLLED-WRITES-ENV-DEPLOY-GATE
- Configurar PILOT_PUBLIC_READONLY=true no Render
- Configurar PILOT_ALLOW_UPLOADS=false no Render
- Validar produção com professor real
- QR Code e divulgação continuam bloqueados
```

---

_Merge report registrado em 2026-07-01._
