# R106 — Relatório de Merge: Clareza de Acesso e Plano de Deploy Gratuito da Plataforma EcoSabon

## 1. Objetivo

Consolidar a documentação pendente antes de qualquer tentativa de deploy da Plataforma EcoSabon completa, revisando e mergeando os PRs #39 (clareza de acesso) e #40 (plano de deploy gratuito), com refinamento de linguagem de governança.

## 2. PR #39 — Clareza de Acesso (DPC-ACCESS-CLARITY)

| Item | Valor |
|---|---|
| **Título** | `docs(ecosabon): clarify public webbook access versus platform access` |
| **Branch** | `docs/ecosabon-access-clarity-after-pages-deploy` → `main` |
| **Estado pré-merge** | OPEN, MERGEABLE |
| **Arquivos** | 1 — `reports/100-clareza-acesso-webbook-vs-plataforma-ecosabon.md` |
| **Alterações** | +73 linhas, 0 deleções |
| **Código alterado** | ❌ Nenhum |
| **CI Checks** | ✅ 5/5 (GitGuardian, Gitleaks, CI/CD Pipeline ×3) |
| **Mergeado** | ✅ Sim, nesta fase |
| **Merge hash** | `a271a95` |

**Decisão**: PR #39 mergeado com sucesso. Web-book publicado e plataforma completa não publicada foram diferenciados documentalmente.

## 3. PR #40 — Plano de Deploy Gratuito (FDP-MAP)

| Item | Valor |
|---|---|
| **Título** | `docs(ecosabon): plan free deployment of complete platform (FDP-MAP)` |
| **Branch** | `docs/ecosabon-fdp-map-plano-deploy-gratuito` → `main` |
| **Estado pré-merge** | OPEN, MERGEABLE |
| **Arquivos** | 1 — `reports/101-plano-deploy-gratuito-plataforma-ecosabon-completa.md` |
| **Alterações** | +456 linhas, 0 deleções |
| **Código alterado** | ❌ Nenhum |
| **CI Checks** | ✅ 5/5 (GitGuardian, Gitleaks, CI/CD Pipeline ×3) |
| **Mergeado** | ✅ Sim, nesta fase |
| **Merge hash** | `03b2dcd` |

### 3.1 Correção de Linguagem Aplicada

O R101 original continha linguagem excessivamente assertiva que poderia ser interpretada como autorização automática de deploy. As seguintes correções foram aplicadas antes do merge:

| Linguagem Original (Problemática) | Linguagem Corrigida |
|---|---|
| "para publicar a Plataforma EcoSabon completa na internet" | "para um spike controlado de publicação" |
| "Serviço Recomendado" / "Custo" | "Serviço Candidato" / "Custo Inicial*" (com ressalva sobre termos) |
| "$0/mês" sem ressalva | "$0/mês*" com nota: "sujeito aos termos atuais dos provedores" |
| "GO/NO-GO para Deploy Completo" | "GO/NO-GO para Spike Controlado de Deploy" |
| Todos os gates: "GO" sem qualificação | "GO para spike" com 2 gates "GO com ressalva" e 1 "NO-GO" |
| "🟢 GO — A plataforma pode ser implantada gratuitamente" | "🟡 GO PARA SPIKE CONTROLADO — viável para demo/piloto, NÃO para produção escolar real" |
| "VEREDICTO: GO PARA DEPLOY. PRÓXIMA FASE: FDP-DEPLOY" | "GO PARA SPIKE CONTROLADO, NÃO PARA DEPLOY COMPLETO IMEDIATO. PRÓXIMA FASE: FDP-SPIKE-0" |

**Commit de correção**: `741fc1b` — `docs(ecosabon): refine free platform deploy plan governance language`

## 4. Confirmações Obrigatórias

| Confirmação | Status |
|---|---|
| O plano é exclusivamente documental? | ✅ Sim — apenas 1 arquivo `.md` em `reports/` |
| Nenhum deploy foi executado? | ✅ Confirmado — nenhum serviço externo ativado |
| Nenhum serviço externo foi criado? | ✅ Confirmado — nenhum Vercel, Render ou Atlas criado |
| Nenhum banco MongoDB Atlas foi criado? | ✅ Confirmado — banco permanece apenas em Docker local |
| Nenhum dado local foi migrado? | ✅ Confirmado — nenhum seed executado em nuvem |
| Nenhum `.env` real foi exposto? | ✅ Confirmado — `.env` permanece local e no `.gitignore` |
| Web-book intocado? | ✅ Confirmado — nenhum arquivo em `ebook-ecosabon-prototipo/` alterado |
| Plataforma intocada? | ✅ Confirmado — nenhum arquivo em `server/`, `client/`, `shared/` alterado |
| Nenhum QR Code gerado? | ✅ Confirmado |
| Nenhuma release criada? | ✅ Confirmado |

## 5. Resultado dos Testes

Testes executados em 3 momentos: pós-merge PR #39, pré-merge PR #40, pós-merge PR #40.

**Resultado final (pós-merge #40 em `main` @ `03b2dcd`):**

| Suite | Arquivos | Testes | Status |
|---|---|---|---|
| Web-book (`ebook-ecosabon-prototipo`) | 1 | 124 | ✅ Passed |
| Workspace (`curso-interativo` + raiz) | 6 | 47 | ✅ Passed |
| Server | 5 | 40 | ✅ Passed |
| **Total** | **12** | **211** | **✅ 0 falhas** |

**Rastreamento limpo**: Nenhum `node_modules`, `dist/`, `commercial_release`, `local_release`, `local_evidence` ou `.env` rastreado no git.

## 6. Decisão

**GO para spike controlado de deploy. NO-GO para deploy completo imediato.**

Justificativa:
- A arquitetura Vercel + Render + MongoDB Atlas M0 é viável para demo/piloto técnico
- O custo inicial é potencialmente zero, mas sujeito aos termos atuais dos provedores
- A plataforma NÃO está pronta para produção escolar real sem governança adicional (persistência de uploads, backup, dados reais de alunos)
- A execução do deploy exige fase separada com validação incremental

## 7. Próxima Fase Recomendada

- **FDP-SPIKE-0** — Verificação de requisitos reais para spike controlado: validar termos atuais dos free tiers, verificar banco Docker local, definir escopo do spike, preparar `client/vercel.json` mínimo
- **OU FDP-DB-CHECK** — Verificar banco local Docker antes de qualquer migração

## 8. Frase de Fechamento

`FDP-MAP MERGEADO. PLANO GRATUITO DE DEPLOY DA PLATAFORMA DOCUMENTADO. GO APENAS PARA SPIKE CONTROLADO, NÃO PARA DEPLOY COMPLETO IMEDIATO. NENHUM SERVIÇO EXTERNO CRIADO. NENHUM BANCO MIGRADO. WEB-BOOK E PLATAFORMA INTOCADOS.`
