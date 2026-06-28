# R125 — Relatório de Fechamento de Merge: Modo Piloto Restrito

## 1. Identificação
- **PR**: #44
- **Branch**: `feat/ecosabon-restricted-pilot-mode`
- **Base**: `main`
- **Hash do merge**: `dd87822`
- **Data**: 2026-06-28
- **Estado da main**: ✅ Sincronizada, atualizada, todos os testes integrados verdes.

## 2. Escopo Consolidado na Main

| Componente | Arquivos Relacionados | Descrição |
|---|---|---|
| **Domínio e Política** | `server/config/pilot.ts` | Regras puras de allowlist e normalização de e-mails |
| **Middlewares** | `server/middleware/pilotAuth.ts` | Controle de acesso a login/registro de professores e bancadas |
| **Integração de Rotas** | `server/routes/authRoutes.ts` | Validação de piloto aplicada nos endpoints administrativos |
| **Sessão JWT** | `server/services/authService.ts`, `server/middleware/auth.ts` | E-mail assinado no JWT e checagem contínua em tempo de execução O(1) |
| **Dados Sintéticos** | `server/seed/restrictedPilotSeed.ts`, `restricted_pilot_data.json` | Carga de turmas `3ºA`/`3ºB` e 5 alunos por bancada (não automatizada) |
| **Testes** | `pilot.test.ts`, `pilotAuth.test.ts` | 19 novos testes integrados com 100% de sucesso |
| **Documentação** | `reports/119` a `reports/124` | Relatórios de especificação, domínio, segurança e revisão |

- ❌ Nenhuma alteração foi realizada no client de produção ou no web-book estático.
- ❌ Nenhum dado real de estudantes foi inserido.
- ❌ Nenhuma credencial real ou arquivo `.env` foi versionado.

## 3. Decisão Formal de Fechamento

`DECISÃO: PILOT_MODE IMPLEMENTADO E CONSOLIDADO COM SUCESSO NA BRANCH MAIN DA PLATAFORMA ECOSABON. ACESSO LIMITADO EXCLUSIVAMENTE AOS PROFESSORES LEONARDO E NADJA CONFIGURADOS EM ALLOWLIST DO AMBIENTE ONLINE. BANCO E ROTAS DE ALUNOS LIMITADAS AO MODELO SINTÉTICO DO PILOTO. NENHUM DEPLOY ONLINE OU SERVIÇO DE TERCEIROS FOI CRIADO.`
