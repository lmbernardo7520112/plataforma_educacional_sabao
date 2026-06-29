# R144 — Homologação Plataforma Online — EcoSabon

## 1. Frontend Online

| Item | Status |
|---|---|
| URL | `https://ecosabon-platform.vercel.app` |
| HTTP Status | ✅ 200 |
| Página carrega | ✅ Landing page "EcoSabon — Laboratório Digital de Química Verde" |
| Assets carregam | ✅ CSS, JS, imagens |
| Erros JS no console | ✅ **Zero erros** |
| Interface profissional | ✅ Dark theme, gradients, tipografia moderna |
| Navegação | ✅ Professor, Aluno, Curso, Desafio, Jornada, IoT |

## 2. Backend Online

| Item | Status |
|---|---|
| URL | `https://ecosabon-api.onrender.com` |
| `/ping` | ✅ HTTP 200 → `pong` |
| `/` | ✅ `{"status":"ok","version":"0.2.0"}` |
| Stack trace público | ✅ Nenhum |
| Headers de segurança | ✅ CSP, HSTS, noSniff, SAMEORIGIN |

## 3. Atlas Conectado

- Backend conecta ao MongoDB Atlas `ecosabon_pilot`
- Modelos inicializados: Classroom, Squad, JourneyState
- Banco piloto (sem dados reais)

## 4. `/api` via Frontend (Rewrite)

| Rota | Resultado |
|---|---|
| `ecosabon-platform.vercel.app/api/classrooms` | ✅ "Bearer Token ausente" (auth exigida) |
| `ecosabon-platform.vercel.app/api/ping` | ✅ Chega ao Render (404 — rota correta é `/ping`) |
| Rewrite funciona | ✅ Frontend → Vercel → Render |

## 5. CORS

| Item | Valor |
|---|---|
| Preflight (OPTIONS) | ✅ 204 |
| `access-control-allow-origin` | ✅ `https://ecosabon-platform.vercel.app` (específico) |
| Wildcard `*` | ✅ **Não** |
| Credentials | ✅ `true` |

## 6. Login Autorizado

*Pendente*: Banco Atlas piloto ainda sem seed (turmas/professores não criados). O login funcional requer execução do seed restrito.

## 7. Bloqueio Não Autorizado

- API exige Bearer Token para rotas protegidas
- Sem token: "Autenticação de Sessão Inválida"
- Allowlist governada pelo backend (Render env), não exposta no frontend

## 8. Squad Login

Governado por `PILOT_ALLOW_SQUAD_LOGIN` no Render. Frontend não expõe configuração.

## 9. Dados Sintéticos

Banco Atlas piloto sem dados (seed não executado). Quando executado, usará `restrictedPilotSeed.ts` com dados sintéticos.

## 10. Segurança

- ✅ Frontend não expõe allowlist
- ✅ Frontend não expõe secrets
- ✅ Frontend não expõe e-mails reais
- ✅ CORS sem wildcard
- ✅ Backend exige auth para rotas protegidas

## 11. Persistência

**A plataforma permanece online mesmo com o notebook desligado**, pois:
- Frontend: Vercel CDN global
- Backend: Render (Oregon, EUA)
- Banco: MongoDB Atlas (AWS)

Nota: Render Free tier adormece após ~15 min de inatividade (cold start ~30s).

---

**Nenhum segredo, e-mail real, connection string ou `.env` foi registrado neste relatório.**
