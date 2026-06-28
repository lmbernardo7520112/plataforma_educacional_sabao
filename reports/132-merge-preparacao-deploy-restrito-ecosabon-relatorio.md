# R132 — Relatório de Fechamento: Merge da Preparação do Deploy Restrito

## 1. Identificação do Merge
- **PR**: #46
- **Branch Origem**: `docs/ecosabon-restricted-pilot-deploy-prep`
- **Branch Destino**: `main`
- **Hash do Merge**: `618a3ea`
- **Data**: 2026-06-28
- **Estado da Main**: Saudável (238 testes verdes, build do client compilado sem erros).

## 2. Escopo Mergeado
O merge consolidou exclusivamente os seguintes relatórios documentais na pasta `reports/`:
- `reports/129-preparacao-deploy-restrito-plataforma-ecosabon.md` — plano operacional de arquitetura, variáveis e serviços futuros.
- `reports/130-checklist-secrets-e-variaveis-deploy-restrito-ecosabon.md` — matriz de secrets/variáveis, onde configurar e validação pré/pós-deploy.
- `reports/131-decisao-prep-deploy-restrito-ecosabon.md` — decisão executiva GO para preparação, NO-GO para execução imediata.

**Garantia de Integridade**: Nenhuma alteração de código técnico, arquivo de configuração, `.env`, `package.json` ou arquivo do web-book/plataforma foi introduzida neste merge.

## 3. Preparação Consolidada
Os documentos mergeados planejam, sem executar, a futura publicação restrita da Plataforma EcoSabon:
- **Variáveis de Ambiente**: 10 variáveis mapeadas (NODE_ENV, PORT, DATABASE_URL, JWT_SECRET, ALLOWED_ORIGINS, PILOT_MODE, PILOT_ALLOWED_TEACHER_EMAILS, PILOT_ALLOW_SQUAD_LOGIN, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX).
- **Secrets**: DATABASE_URL, JWT_SECRET e PILOT_ALLOWED_TEACHER_EMAILS classificados como secretos — configuráveis apenas no painel do Render.
- **Identidade dos Professores**: Leonardo e Nadja referenciados apenas por placeholders (`<LEONARDO_EMAIL_REAL>`, `<NADJA_EMAIL_REAL>`).
- **Atlas**: Plano de cluster M0 gratuito, usuário com privilégio mínimo, banco `ecosabon_pilot`.
- **Render**: Plano de Web Service conectado ao repositório, diretório `server/`, variáveis secretas no dashboard.
- **Vercel**: Plano de projeto estático com root `client/`, proxy `/api/*` via `vercel.json`.
- **CORS**: Configuração restrita ao domínio oficial do frontend na Vercel.
- **JWT**: Chave forte gerada aleatoriamente, injetada via dashboard, nunca versionada.
- **Seed Sintético**: Uso exclusivo de `restrictedPilotSeed.ts` e `restricted_pilot_data.json` com dados fictícios.
- **Rollback**: Plano de desligamento completo (purga de variáveis, revogação de usuário Atlas, desligamento de Render/Vercel, rotação de JWT_SECRET).

## 4. Segurança
- ❌ Nenhum `.env` real versionado.
- ❌ Nenhum e-mail real de Leonardo ou Nadja versionado.
- ❌ Nenhuma connection string real com credenciais versionada.
- ❌ Nenhum JWT ou token real versionado.
- ❌ Nenhum deploy executado.
- ❌ Nenhum serviço externo criado (Vercel, Render, Atlas).
- ❌ Nenhum banco migrado ou seed em nuvem executado.

## 5. Observação sobre Atlas Network Access (0.0.0.0/0)
A configuração `0.0.0.0/0` nos relatórios R129 e R130 foi explicitamente classificada como **exceção provisória do spike**, nunca como configuração ideal de produção. A linguagem foi corrigida durante a revisão (commit `02fa333`) para deixar claro que:
- É uma contingência do free tier com IPs dinâmicos do Render.
- Deve vir acompanhada de usuário de privilégio mínimo, senha forte (mínimo 32 caracteres), monitoramento e plano de restrição posterior.
- Não foi configurada de verdade — é apenas planejamento documental.

## 6. Testes Pós-Merge (Contagem Real)
- **ebook-ecosabon-prototipo (Web-book)**: 124 testes bem-sucedidos.
- **ecosabon-client (Client Domain)**: 8 testes bem-sucedidos.
- **ecosabon-curso-interativo (Workspace)**: 47 testes bem-sucedidos.
- **server (Backend Workspace)**: 59 testes bem-sucedidos.
- **Total**: **238 testes verdes (0 falhas)**.
- **Client Build**: Compilado com sucesso (`tsc -b && vite build`).

## 7. Decisão de Homologação

`FDP-RESTRICTED-PILOT-DEPLOY-PREP MERGEADO. VARIÁVEIS, SECRETS, ATLAS, RENDER, VERCEL, CORS, JWT, SEED SINTÉTICO E ROLLBACK FORAM PLANEJADOS. NENHUM DEPLOY EXECUTADO. NENHUM SERVIÇO EXTERNO CRIADO. NENHUM SEGREDO OU E-MAIL REAL VERSIONADO.`
