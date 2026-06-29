# R147 — Homologação Funcional do Piloto Online — EcoSabon

## 1. Frontend Vercel

| Item | Status |
|---|---|
| URL | `https://ecosabon-platform.vercel.app` |
| HTTP Status | ✅ 200 |
| Landing page | ✅ "EcoSabon — Laboratório Digital de Química Verde" |
| Assets | ✅ CSS, JS, imagens carregam |
| Erros JS | ✅ Zero erros no console |

## 2. Backend Render

| Item | Status |
|---|---|
| URL | `https://ecosabon-api.onrender.com` |
| `/ping` | ✅ 200 → `pong` |
| `/` | ✅ 200 → `{"status":"ok","version":"0.2.0"}` |
| Headers de segurança | ✅ CSP, HSTS, noSniff, SAMEORIGIN |
| Stack trace | ✅ Nenhum exposto |

## 3. Atlas

| Item | Status |
|---|---|
| Banco | `ecosabon_pilot` |
| Cluster | Atlas M0 Free |
| Collections | 4 (classrooms, squads, teachers, journeystates) |
| Dados | 100% sintéticos |

## 4. Login Professor Autorizado

O seed criou professores sintéticos (`@example.com`) no Atlas. O login funcional de professores autorizados (com e-mails reais da allowlist) requer cadastro via frontend — governado pela allowlist do Render.

- Registro não autorizado (`intruso@example.com`): ✅ **Bloqueado** ("Acesso restrito ao piloto autorizado.")
- Login não autorizado (`intruso@example.com`): ✅ **Bloqueado** ("Acesso restrito ao piloto autorizado.")
- Allowlist não exposta na resposta ✅

## 5. Bloqueio de Intruso

| Teste | Resultado |
|---|---|
| `POST /api/auth/teacher/register` com `intruso@example.com` | ✅ Bloqueado |
| `POST /api/auth/teacher/login` com `intruso@example.com` | ✅ Bloqueado |
| Allowlist exposta? | ✅ Não |
| Stack trace exposto? | ✅ Não |
| Usuário criado? | ✅ Não |

## 6. Squad Login Bloqueado

| Teste | Resultado |
|---|---|
| `POST /api/auth/squad/login` com squadId sintético | ✅ Bloqueado |
| Mensagem | "Acesso restrito ao piloto autorizado." |
| `PILOT_ALLOW_SQUAD_LOGIN` | Não configurada (default = bloqueado) |

## 7. Turmas e Bancadas no Atlas

| Turma | Ano | Ativo | Bancada | Membros |
|---|---|---|---|---|
| 3ºANO A | 2026 | ✅ | Bancada Alfa (3ºA) | 5 |
| 3ºANO B | 2026 | ✅ | Bancada Beta (3ºB) | 5 |

## 8. CORS

| Item | Valor |
|---|---|
| Preflight (OPTIONS) | ✅ 204 |
| `access-control-allow-origin` | ✅ `https://ecosabon-platform.vercel.app` (específico) |
| Wildcard `*` | ✅ Não |
| Credentials | ✅ true |

## 9. Segurança

- ✅ `PILOT_MODE=true` no Render
- ✅ Allowlist de professores configurada no Render (valor ocultado)
- ✅ CORS sem wildcard
- ✅ Nenhum segredo no frontend
- ✅ Nenhum `.env` versionado
- ✅ Nenhum dado real

## 10. Notebook Local Não Necessário

A plataforma permanece online independentemente do notebook local:

- **Frontend**: Vercel CDN global
- **Backend**: Render (Oregon, EUA)
- **Banco**: MongoDB Atlas (AWS)

> Render Free tier: cold start ~30s após ~15 min de inatividade. Aceitável para piloto.

## 11. Testes Locais

| Suite | Resultado |
|---|---|
| web-book | 124 passed |
| client | 8 passed |
| curso/workspace | 47 passed |
| server | 59 passed |
| **Total** | **238 passed** |
| Build client | ✅ OK |

---

**Nenhum segredo, e-mail real, connection string ou `.env` foi registrado neste relatório.**
