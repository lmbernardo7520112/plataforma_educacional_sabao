# R198 — Configuração de Variáveis de Ambiente do Piloto Controlado — EcoSabon

## 1. Contexto

Após a revisão e merge das correções de segurança do PR #62, as flags do piloto controlado foram ativadas e configuradas em produção para garantir a governança e proteção dos dados na Plataforma EcoSabon.

- **Serviço Backend:** `ecosabon-api` (Render Web Service)
- **Serviço Frontend:** `ecosabon-platform` (Vercel Project)
- **Data/Hora da Configuração:** 2026-07-01 às 10:45 (GMT-3)

## 2. Configurações de Produção no Render

As seguintes variáveis de ambiente de controle de escopo do piloto controlado foram configuradas no painel da Render:

| Variável | Valor Configurado | Origem / Tipo | Finalidade |
|---|---|---|---|
| `PILOT_MODE` | `true` | Existente (Pública) | Habilita os middlewares e regras do modo piloto |
| `PILOT_PUBLIC_READONLY` | `true` | **Adicionada** (Pública) | Bloqueia requisições mutativas (POST/PUT/DELETE) anônimas |
| `PILOT_ALLOW_UPLOADS` | `false` | **Adicionada** (Pública) | Bloqueia totalmente o upload de imagens/arquivos no piloto |
| `PILOT_ALLOW_SQUAD_LOGIN` | `true` | Existente (Pública) | Permite que alunos autorizados entrem via código |
| `NODE_ENV` | `production` | Existente (Pública) | Modo de execução do Express/Mongoose |
| `ALLOWED_ORIGINS` | `https://ecosabon-platform.vercel.app` | Existente (Pública) | Controle de CORS restrito ao front de homologação |

As seguintes variáveis sensíveis estão configuradas e presentes, sem qualquer alteração ou exposição de seus valores:

| Variável Sensível | Status | Placeholder |
|---|---|---|
| `DATABASE_URL` | PRESENTE | `<DATABASE_URL_ATLAS>` |
| `JWT_SECRET` | PRESENTE | `<JWT_SECRET_RENDER>` |
| `PILOT_ALLOWED_TEACHER_EMAILS` | PRESENTE | `<LEONARDO_EMAIL_REAL>,<NADJA_EMAIL_REAL>` |

### Deploy e Restart (Render)

- **Ação:** Um deploy manual do serviço backend `ecosabon-api` foi acionado na Render para refletir as novas variáveis de ambiente.
- **Status:** Concluído com sucesso (Live). O cold start do servidor foi executado e as requisições estão respondendo normalmente.

## 3. Configurações de Produção na Vercel

O build e deploy automatizados na Vercel foram executados de forma integrada com o repositório principal no branch `main` pós-merge. 

As seguintes variáveis de ambiente públicas foram validadas no build:

| Variável Frontend | Valor | Finalidade |
|---|---|---|
| `VITE_PILOT_MODE` | `true` | Alinha a UI do frontend com as restrições do piloto |
| `VITE_PILOT_UPLOADS_BLOCKED` | `true` | Oculta a etapa de foto na submissão e submete diretamente |

- **Status da Compilação:** Compilado e servido com sucesso (`dist/index.html` servido na porta 443).
- **SPA Fallback:** Configurado no roteamento da Vercel (todas as rotas como `/onboarding` resolvem para o `index.html` do SPA).

---

_Relatório de ambiente registrado em 2026-07-01._
