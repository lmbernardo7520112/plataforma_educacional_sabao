# R145 — Decisão: Deploy Frontend Vercel — EcoSabon

## 1. Decisão

**GO** — Frontend publicado e conectado ao backend.

## 2. URLs

| Componente | URL | Status |
|---|---|---|
| **Frontend** | `https://ecosabon-platform.vercel.app` | ✅ Online |
| **Backend** | `https://ecosabon-api.onrender.com` | ✅ Online |
| **Atlas** | Cluster M0 `ecosabon_pilot` | ✅ Conectado |

## 3. Riscos Residuais

| Risco | Severidade | Mitigação |
|---|---|---|
| Render Free cold start (~30s) | Baixa | Aceitável para piloto |
| Atlas `0.0.0.0/0` network access | Média | Restringir após validação completa |
| Banco sem seed (vazio) | Baixa | Executar seed restrito em fase separada |
| Erros TS2349 no server (helmet/rate-limit) | Baixa | Dívida técnica, não bloqueia deploy |
| Vercel Free bandwidth limit | Baixa | Suficiente para piloto restrito |

## 4. Observação Render Free / Cold Start

O Render Free tier coloca o serviço em "sleep" após ~15 minutos sem requisições. A primeira requisição após o sleep demora ~30 segundos para acordar o serviço. Isso é esperado e aceitável para o piloto restrito.

## 5. Próximas Etapas

1. **Seed restrito**: Executar `restrictedPilotSeed.ts` para criar turmas/professores sintéticos no Atlas
2. **Login funcional**: Validar login de professor autorizado após seed
3. **Squad login**: Validar bloqueio quando `PILOT_ALLOW_SQUAD_LOGIN=false`
4. **Corrigir TS2349**: Resolver dívida técnica em helmet/express-rate-limit (fase separada)
5. **QR Code**: Gerar somente após homologação completa do fluxo

## 6. Decisão Final

DECISÃO: FRONTEND VERCEL PUBLICADO E CONECTADO AO BACKEND RENDER. PLATAFORMA ECOSABON ONLINE EM MODO PILOTO RESTRITO. WEB-BOOK INTOCADO. NENHUM SEGREDO VERSIONADO. NENHUM DADO REAL UTILIZADO.

---

**A plataforma permanece online mesmo com o notebook desligado, pois frontend, backend e banco estão hospedados em Vercel, Render e Atlas.**

**Nenhum segredo, e-mail real, connection string ou `.env` foi registrado neste relatório.**
