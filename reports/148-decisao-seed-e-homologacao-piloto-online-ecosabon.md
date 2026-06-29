# R148 — Decisão: Seed e Homologação do Piloto Online — EcoSabon

## 1. Decisão

**GO** — Seed sintético restrito executado e plataforma online homologada.

## 2. URLs Online

| Componente | URL | Status |
|---|---|---|
| **Frontend** | `https://ecosabon-platform.vercel.app` | ✅ Online |
| **Backend** | `https://ecosabon-api.onrender.com` | ✅ Online |
| **Atlas** | Cluster M0 `ecosabon_pilot` | ✅ Conectado |

## 3. Riscos Residuais

| Risco | Severidade | Mitigação |
|---|---|---|
| Atlas `0.0.0.0/0` IP Access | Média | Protegido por credenciais SCRAM; restringir após piloto |
| Render Free cold start (~30s) | Baixa | Aceitável para piloto |
| Vercel Free bandwidth | Baixa | Suficiente para piloto restrito |
| Professores sintéticos (`@example.com`) no banco | Baixa | Não acessíveis sem allowlist real |
| TS2349 em helmet/express-rate-limit | Baixa | Dívida técnica, não bloqueia funcionalidade |
| `PILOT_ALLOW_SQUAD_LOGIN` não configurada | Info | Default = bloqueado (correto) |

## 4. Próximos Passos

1. **Onboarding de professores autorizados**: Cadastro pelo frontend com e-mails reais da allowlist (sem registrar e-mails em relatórios)
2. **Validação funcional professor → turma → bancada**: Após login real autorizado
3. **Monitoramento do piloto**: Verificar estabilidade, cold start, erros
4. **QR Code**: Somente após homologação funcional completa com login real
5. **Dívida técnica**: Corrigir TS2349 em helmet/express-rate-limit
6. **Segurança Atlas**: Restringir IP Access List após estabilização

## 5. Decisão Final

DECISÃO: SEED SINTÉTICO RESTRITO EXECUTADO NO ATLAS ECOSABON_PILOT. PLATAFORMA ECOSABON ONLINE HOMOLOGADA EM MODO PILOTO RESTRITO. ACESSO LIMITADO À ALLOWLIST DE PROFESSORES AUTORIZADOS. NENHUM DADO REAL UTILIZADO. NENHUM SEGREDO VERSIONADO.

## 6. Próxima Fase Recomendada

`FDP-PILOT-MONITORING-AND-QR-GATE` — Monitorar o piloto online e só depois decidir se haverá QR Code ou material de divulgação restrita.

---

**A plataforma EcoSabon está funcional online em modo piloto restrito e permanece disponível mesmo com o notebook desligado, pois frontend, backend e banco estão hospedados em Vercel, Render e Atlas.**

**Nenhum segredo, e-mail real, connection string ou `.env` foi registrado neste relatório.**
