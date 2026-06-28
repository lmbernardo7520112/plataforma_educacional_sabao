# R133 — Gate de Autorização: Deploy Restrito da Plataforma EcoSabon

## 1. Objetivo
Este documento é o gate final de autorização humana antes de qualquer criação real de serviços externos (MongoDB Atlas, Render, Vercel) para o piloto restrito da Plataforma EcoSabon. Nenhum serviço foi criado. Nenhum deploy foi executado.

## 2. Estado Consolidado do Sistema
- **Web-book EcoSabon**: Publicado no GitHub Pages como vitrine estática.
- **Plataforma completa**: Ainda não publicada.
- **`PILOT_MODE`**: Implementado, mergeado (PR #44) e validado em sandbox local (PR #45).
- **Preparação de deploy**: Concluída e mergeada (PR #46) com R129/R130/R131.
- **R132**: Relatório de fechamento do merge da preparação criado.
- **Testes**: 238 testes verdes (124 web-book + 8 client + 47 curso + 59 server).
- **Build do client**: Compilado com sucesso.
- **Deploy**: Nenhum executado.
- **Serviços externos**: Nenhum criado.
- **Secrets**: Nenhum e-mail real, JWT, senha ou connection string versionados.

## 3. Testes de Prontidão (Contagem Real)
| Workspace | Testes | Status |
|---|---|---|
| ebook-ecosabon-prototipo (Web-book) | 124 | ✅ |
| ecosabon-client (Client Domain) | 8 | ✅ |
| ecosabon-curso-interativo (Workspace) | 47 | ✅ |
| server (Backend) | 59 | ✅ |
| **Total** | **238** | **✅ 0 falhas** |
| Client Build (`tsc -b && vite build`) | — | ✅ Compilado |

## 4. Informações Humanas Necessárias para Execução Futura
As informações abaixo **não foram coletadas**, **não foram versionadas** e serão inseridas manualmente nos dashboards apenas na fase futura de execução:

| # | Informação | Placeholder | Nota |
|---|---|---|---|
| 1 | E-mail real de Leonardo | `<LEONARDO_EMAIL_REAL>` | Apenas no dashboard do Render |
| 2 | E-mail real de Nadja | `<NADJA_EMAIL_REAL>` | Apenas no dashboard do Render |
| 3 | Nome do banco piloto | `ecosabon_pilot` | Sugestão |
| 4 | Nome do serviço Render | `ecosabon-api` | Sugestão |
| 5 | Nome do projeto Vercel | `ecosabon-platform` | Sugestão |
| 6 | Domínio Vercel futuro | `<VERCEL_FRONTEND_URL>` | Gerado pela Vercel |
| 7 | Domínio Render futuro | `<RENDER_BACKEND_URL>` | Gerado pelo Render |
| 8 | `PILOT_ALLOW_SQUAD_LOGIN` | `false` | Recomendado inicialmente |
| 9 | Política de seed | `restricted_pilot_data.json` | Sem dados reais; seed em Atlas após autorização |
| 10 | Network Access do Atlas | Restrição máxima possível | `0.0.0.0/0` apenas como exceção provisória de spike |

## 5. Checklist de Autorização Humana
> [!IMPORTANT]
> Sem **todas** as confirmações abaixo, a fase futura de execução é **NO-GO**.

- [ ] Autorizo criar cluster MongoDB Atlas gratuito para o piloto.
- [ ] Autorizo criar usuário de banco Atlas com privilégio mínimo.
- [ ] Autorizo criar banco piloto com dados exclusivamente sintéticos.
- [ ] Autorizo criar serviço Render para backend.
- [ ] Autorizo criar projeto Vercel para frontend.
- [ ] Autorizo inserir os e-mails reais de Leonardo e Nadja apenas no dashboard do Render.
- [ ] Confirmo que nenhum e-mail real deve ser commitado.
- [ ] Confirmo que nenhum dado real de aluno será usado.
- [ ] Confirmo que `PILOT_MODE=true` deve estar ativo.
- [ ] Confirmo que `PILOT_ALLOW_SQUAD_LOGIN=false` será o padrão inicial.
- [ ] Confirmo que a plataforma não será SaaS neste momento.
- [ ] Confirmo que o uso será piloto restrito.
- [ ] Confirmo que o deploy poderá ser desligado imediatamente se houver risco.

## 6. Sequência Futura de Execução (Planejada, Não Executada)

### FASE 1 — MongoDB Atlas
1. Criar projeto/cluster M0 gratuito em região compatível com o Render.
2. Criar usuário de banco com privilégio mínimo no banco `ecosabon_pilot`.
3. Configurar Network Access (allowlist de IP ou exceção provisória `0.0.0.0/0`).
4. Obter connection string e guardar segredo fora do código.
5. Validar conexão de teste.

### FASE 2 — Render Backend
1. Criar Web Service conectado ao repositório GitHub.
2. Configurar Root Directory (`server/`), Build Command (`npm install`), Start Command (`npm start`).
3. Configurar variáveis de ambiente no dashboard (conforme R130).
4. Validar `/ping` retornando `200 OK`.
5. Validar logs sem segredos expostos.
6. Validar CORS provisório.

### FASE 3 — Seed Sintético
1. Executar seed contra Atlas usando `restrictedPilotSeed.ts`.
2. Confirmar turmas `3ºA` e `3ºB`.
3. Confirmar bancadas com 5 alunos.
4. Confirmar ausência total de dados reais.

### FASE 4 — Vercel Frontend
1. Criar projeto frontend com Root Directory `client/`.
2. Configurar build (`tsc -b && vite build`) e output (`dist`).
3. Configurar rewrite `/api/*` apontando para URL do Render.
4. Validar interface renderizando no browser.
5. Validar login autorizado (Leonardo/Nadja) e bloqueado (intruso).

### FASE 5 — Homologação
1. Testes funcionais pós-deploy.
2. Auditoria de secrets nos logs.
3. Relatório final de homologação.
4. Decisão GO/NO-GO para manter online.

## 7. Critérios de Abortar (Abort Imediato)
- Serviço exigir pagamento ou cartão não autorizado.
- Secret exposto em logs ou código.
- `.env` versionado acidentalmente.
- CORS com `*` em produção.
- Allowlist vazia com `PILOT_MODE=true`.
- Login aberto para usuário não autorizado.
- Uso acidental de dado real de estudante.
- Erro persistente de conexão Atlas.
- Render/Vercel fora do free tier planejado.
- Logs exibindo senha/JWT.
- Frontend revelando allowlist.
- Seed escrevendo dados não sintéticos.
- Qualquer violação LGPD/governança.

## 8. Decisão

`DECISÃO: GATE DE EXECUÇÃO DO DEPLOY RESTRITO PREPARADO. A CRIAÇÃO DE ATLAS, RENDER E VERCEL PERMANECE BLOQUEADA ATÉ AUTORIZAÇÃO HUMANA EXPLÍCITA. NENHUM SERVIÇO EXTERNO FOI CRIADO. NENHUM DEPLOY FOI EXECUTADO. NENHUM SEGREDO OU E-MAIL REAL FOI VERSIONADO.`
