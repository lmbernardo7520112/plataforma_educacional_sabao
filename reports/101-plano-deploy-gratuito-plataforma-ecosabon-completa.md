# R101 — Plano de Deploy Gratuito da Plataforma EcoSabon Completa (FDP-MAP)

## 1. Objetivo

Documentar o plano técnico completo, gratuito ou de custo zero inicial, para publicar a Plataforma EcoSabon completa na internet — incluindo Client React/Vite, Backend Express/API, Banco MongoDB, autenticação JWT, RBAC, uploads de evidências fotográficas e seed de dados — preservando o web-book já publicado no GitHub Pages.

## 2. Inventário Técnico Auditado

### 2.1 Componentes da Plataforma

| Componente | Tecnologia | Diretório | Tamanho Fonte | Função |
|---|---|---|---|---|
| **Client** | React 19 + Vite 6 + TailwindCSS 4 + Zustand | `client/` | ~192 KB src | Frontend multiusuário: onboarding, dashboard, missões, relatórios, área professor |
| **Server** | Express 4 + Mongoose 8 + JWT + Helmet + Zod | `server/` | ~3.8 MB (inclui node_modules) | API REST com RBAC (TEACHER/SQUAD), rate limiting, upload, validação |
| **Shared** | TypeScript puro | `shared/` | ~212 KB | Tipos e constantes isomórficas entre client e server |
| **Curso Interativo** | TypeScript + Vitest | `curso-interativo/` | ~252 KB src | Módulo pedagógico embarcado no Client via lazy-load |
| **Web-book** | Vite + Three.js (estático) | `ebook-ecosabon-prototipo/` | já publicado | Vitrine no GitHub Pages — **NÃO deve ser alterado** |
| **MongoDB** | MongoDB 7 (Docker local) | docker-compose.yml | — | Banco de dados: turmas, squads, missões, relatórios |

### 2.2 Variáveis de Ambiente Requeridas (server/.env)

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NODE_ENV` | Sim | `production` em deploy |
| `PORT` | Sim | Porta do server (default: 3000) |
| `DATABASE_URL` | **Sim** | String de conexão MongoDB |
| `JWT_SECRET` | **Sim** | Segredo criptográfico para tokens JWT |
| `ALLOWED_ORIGINS` | **Sim em prod** | Lista de origens permitidas no CORS |
| `RATE_LIMIT_WINDOW_MS` | Não | Janela de rate limiting (default: 900000) |
| `RATE_LIMIT_MAX` | Não | Máx. requisições/IP/janela (default: 100) |

### 2.3 Funcionalidades Que Precisam de Backend

- Autenticação JWT (login professor / login squad)
- RBAC com roles TEACHER e SQUAD
- CRUD de turmas (classrooms)
- CRUD de bancadas (squads) com ownership
- Missões com upload de evidências fotográficas (multer, até 5 MB)
- Relatórios por grupo (GroupReport)
- Seed de dados iniciais (turmas_alunos.json)

### 2.4 Testes Atuais

- **Web-book**: 124 testes ✅
- **Curso Interativo**: 47 testes ✅
- **Server**: 40 testes ✅
- **Total**: 211 testes, 0 falhas

## 3. Arquitetura de Deploy Recomendada

### 3.1 Diagrama da Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                    INTERNET PÚBLICA                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────┐     ┌─────────────────────────┐    │
│  │   GitHub Pages       │     │   Vercel (Free)          │    │
│  │   (já publicado)     │     │   Client React/Vite      │    │
│  │                      │     │   ecosabon.vercel.app     │    │
│  │   Web-book Premium   │     │   ┌─────────────────┐    │    │
│  │   3D (vitrine)       │     │   │ Static SPA build│    │    │
│  │                      │     │   │ + API proxy     │    │    │
│  └─────────────────────┘     │   └────────┬────────┘    │    │
│                               └────────────┼────────────┘    │
│                                            │ /api/*          │
│                               ┌────────────▼────────────┐    │
│                               │   Render (Free)          │    │
│                               │   Server Express/API     │    │
│                               │   ecosabon-api.onrender  │    │
│                               │   .com                   │    │
│                               │   ┌─────────────────┐    │    │
│                               │   │ Node.js 22      │    │    │
│                               │   │ Express + JWT   │    │    │
│                               │   │ Helmet + CORS   │    │    │
│                               │   └────────┬────────┘    │    │
│                               └────────────┼────────────┘    │
│                                            │                 │
│                               ┌────────────▼────────────┐    │
│                               │   MongoDB Atlas (Free)   │    │
│                               │   M0 Shared Cluster      │    │
│                               │   512 MB storage         │    │
│                               │   ┌─────────────────┐    │    │
│                               │   │ ecosabon_db     │    │    │
│                               │   │ + network auth  │    │    │
│                               │   └─────────────────┘    │    │
│                               └─────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Resumo da Recomendação

| Camada | Serviço Recomendado | Tier | Custo | Justificativa |
|---|---|---|---|---|
| **Client (SPA)** | **Vercel** | Free | $0 | Build nativo de Vite, CDN global, preview deploys, env vars seguro |
| **Server (API)** | **Render** | Free | $0 | Node.js nativo, env vars, HTTPS automático, logs integrados |
| **Banco (MongoDB)** | **MongoDB Atlas** | M0 Free | $0 | 512 MB, backup automático, IP allowlist, TLS nativo |
| **Web-book** | **GitHub Pages** | Free | $0 | **Já publicado. NÃO alterar.** |

## 4. Comparação de Alternativas Gratuitas

### 4.1 Hospedagem do Client (Frontend React SPA)

| Critério | Vercel ⭐ | Netlify | Cloudflare Pages | Render Static |
|---|---|---|---|---|
| **Build Vite nativo** | ✅ Excelente | ✅ Bom | ✅ Bom | ✅ Básico |
| **CDN Global** | ✅ Edge Network | ✅ CDN | ✅ CDN | ❌ Região única |
| **Preview por PR** | ✅ Automático | ✅ Automático | ✅ Automático | ❌ Não |
| **Env vars seguras** | ✅ UI + CLI | ✅ UI | ✅ UI | ✅ UI |
| **Proxy/Rewrites** | ✅ vercel.json | ✅ _redirects | ✅ _routes.json | ❌ Limitado |
| **Limite free** | 100 GB/mês | 100 GB/mês | Ilimitado | 100 GB/mês |
| **HTTPS auto** | ✅ | ✅ | ✅ | ✅ |
| **Domínio custom** | ✅ | ✅ | ✅ | ✅ |
| **Monorepo** | ✅ Root dir config | ✅ Base dir | ✅ | ⚠️ Limitado |

**Decisão**: **Vercel** — melhor integração com Vite/React, suporte nativo a monorepo (root directory = `client/`), preview deploys automáticos e proxy via `vercel.json` para reescrever `/api/*` para o Render.

### 4.2 Hospedagem do Server (Backend Express API)

| Critério | Render ⭐ | Railway | Fly.io | Vercel Functions |
|---|---|---|---|---|
| **Node.js nativo** | ✅ Process | ✅ Process | ✅ Dockerfile | ❌ Serverless |
| **Express compatível** | ✅ Perfeito | ✅ Perfeito | ✅ Perfeito | ⚠️ Parcial (cold start) |
| **Uploads (multer)** | ⚠️ Efêmero* | ⚠️ Efêmero | ⚠️ Efêmero | ❌ Não suporta |
| **Env vars** | ✅ Dashboard | ✅ Dashboard | ✅ fly.toml | ✅ Dashboard |
| **Free tier** | 750h/mês | $5 crédito/mês | 3 VMs shared | 100 GB-h/mês |
| **HTTPS auto** | ✅ | ✅ | ✅ | ✅ |
| **Spin down** | ⚠️ Após 15 min | ❌ Não | ❌ Não | N/A |
| **Websocket** | ✅ | ✅ | ✅ | ❌ |
| **Logs** | ✅ Dashboard | ✅ Dashboard | ✅ CLI | ✅ Dashboard |
| **Health check** | ✅ /ping | ✅ | ✅ | N/A |

**Decisão**: **Render** — único serviço que combina processo Node.js persistente, HTTPS automático, logs, variáveis de ambiente seguras e 750 horas/mês gratuitas. O spin-down após 15 min é aceitável para uma demonstração educacional.

> **⚠️ NOTA SOBRE UPLOADS**: O filesystem do Render (free) é efêmero — uploads via multer serão perdidos ao reiniciar. Para produção real, os uploads de evidências fotográficas devem migrar para um serviço de objeto (ex: Cloudinary free, Supabase Storage, ou S3 com free tier). Para a fase MVP/demo, o upload local é aceitável com essa ressalva.

### 4.3 Banco de Dados MongoDB

| Critério | Atlas M0 ⭐ | Render PostgreSQL | Railway MongoDB | Supabase |
|---|---|---|---|---|
| **MongoDB nativo** | ✅ Oficial | ❌ PostgreSQL | ✅ Mas $$ | ❌ PostgreSQL |
| **Custo** | $0 (M0 Free) | $0 (free tier) | $5/mês mín. | $0 (free tier) |
| **Storage** | 512 MB | 1 GB | 1 GB | 500 MB |
| **Backup** | ✅ Automático | ✅ | ✅ | ✅ |
| **TLS** | ✅ Nativo | ✅ | ✅ | ✅ |
| **IP Allowlist** | ✅ | ❌ | ❌ | ❌ |
| **Compatível com Mongoose** | ✅ Perfeito | ❌ Precisa migrar | ✅ | ❌ Precisa migrar |

**Decisão**: **MongoDB Atlas M0** — é o único serviço que mantém compatibilidade total com o Mongoose já implementado no server, sem necessidade de migração de ORM ou schema. 512 MB é mais que suficiente para dados educacionais de demonstração.

## 5. Configuração Detalhada por Serviço

### 5.1 MongoDB Atlas (M0 Free)

**Passos de configuração:**
1. Criar conta em [cloud.mongodb.com](https://cloud.mongodb.com)
2. Criar cluster M0 (Free) — região: `AWS / São Paulo (sa-east-1)` ou mais próxima
3. Criar database user com senha forte (não usar a mesma de desenvolvimento)
4. Configurar Network Access: permitir IP do Render (`0.0.0.0/0` para free tier, já que Render não tem IP fixo)
5. Copiar connection string: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ecosabon_db?retryWrites=true&w=majority`
6. **NÃO commitar esta string no repositório**

**Seed de dados:**
- Executar `npm run seed:turmas` localmente apontando `DATABASE_URL` para o Atlas
- Ou criar script CI que roda seed automaticamente no primeiro deploy

**Limites M0:**
| Recurso | Limite |
|---|---|
| Storage | 512 MB |
| Connections | 500 |
| IOPS | Shared |
| Replica Set | 3 nós |
| Backup | Diário automático |
| Monitoring | Atlas Dashboard |

### 5.2 Render (Server Express)

**Configuração no Render Dashboard:**
1. Criar Web Service → Connect GitHub repo
2. **Root Directory**: `./` (raiz do monorepo)
3. **Build Command**: `npm install && npm run build:shared`
4. **Start Command**: `cd server && npx tsx server.ts`
5. **Environment**: Node
6. **Region**: Oregon (padrão) ou Frankfurt
7. **Instance Type**: Free

**Variáveis de Ambiente no Render:**

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3000` (ou usar `10000` que é padrão Render) |
| `DATABASE_URL` | `mongodb+srv://...` (connection string do Atlas) |
| `JWT_SECRET` | Gerar com `openssl rand -base64 32` |
| `ALLOWED_ORIGINS` | `https://ecosabon.vercel.app,https://lmbernardo7520112.github.io` |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX` | `100` |

**Health Check**: Configurar no Render para pingar `/ping` (já implementado no server).

**⚠️ Spin-down**: O free tier desliga o serviço após 15 minutos sem tráfego. A primeira requisição após inatividade levará ~30-50 segundos (cold start: npm install + conexão MongoDB). Isso é aceitável para demonstração.

### 5.3 Vercel (Client React/Vite)

**Configuração no Vercel Dashboard:**
1. Importar repositório do GitHub
2. **Root Directory**: `client`
3. **Framework Preset**: Vite
4. **Build Command**: `cd .. && npm run build:shared && cd client && npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `cd .. && npm install`

**Variável de Ambiente no Vercel:**

| Variável | Valor |
|---|---|
| `VITE_API_URL` | `https://ecosabon-api.onrender.com` |

**Arquivo `vercel.json` (a criar em `client/vercel.json`):**
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://ecosabon-api.onrender.com/api/:path*" }
  ]
}
```

**Ajuste no `client/src/lib/api.ts`:**
O `baseURL` do axios já usa `/api` relativo. Com o rewrite do Vercel, as requisições `/api/*` serão proxied para o Render. **Nenhuma alteração de código é necessária no api.ts** — o rewrite cuida de tudo.

> **Alternativa sem rewrite**: Alterar o `baseURL` do axios para ler de `import.meta.env.VITE_API_URL || '/api'`. Isso daria controle explícito, mas exige uma alteração mínima no código.

### 5.4 GitHub Pages (Web-book) — INTOCADO

- **URL**: `https://lmbernardo7520112.github.io/plataforma_educacional_sabao/`
- **Branch**: `gh-pages`
- **Status**: ✅ Publicado e funcional
- **Ação**: **NENHUMA. Não alterar.**

## 6. Segurança no Deploy

### 6.1 Checklist de Segurança para Produção

| Item | Status Atual | Ação Necessária |
|---|---|---|
| JWT_SECRET forte | ⚠️ Dev usa placeholder | Gerar com `openssl rand -base64 32` no Render |
| ALLOWED_ORIGINS em prod | ✅ Validação no server.ts | Configurar URL Vercel real |
| Helmet (headers) | ✅ Implementado | Nenhuma |
| Rate Limiting | ✅ Implementado | Nenhuma |
| CORS strict | ✅ Implementado (H2) | Configurar origens reais |
| Zod validation | ✅ Schemas no server | Nenhuma |
| RBAC (H4) | ✅ TEACHER/SQUAD | Nenhuma |
| Squad ownership | ✅ requireSquadOwnership | Nenhuma |
| bcrypt passwords | ✅ bcryptjs | Nenhuma |
| Upload filter (MIME) | ✅ Apenas JPG/PNG/WEBP | Nenhuma |
| Upload size limit | ✅ 5 MB max | Nenhuma |
| `.env` no .gitignore | ✅ | Nenhuma |
| Source maps em prod | ⚠️ Verificar Vite config | Desativar `sourcemap` no build de prod |
| HTTPS | ✅ Vercel/Render/Atlas nativos | Nenhuma |
| CSP no web-book | ✅ Meta tag adicionada (DPC-SEC-FIX) | Nenhuma |
| Gitleaks | ✅ Auditado (DPC-AUDIT) | Nenhuma |

### 6.2 Variáveis que NÃO devem ser expostas ao Client

- `JWT_SECRET`
- `DATABASE_URL` (connection string Atlas com senha)
- Qualquer variável sem prefixo `VITE_`

> O Vite só expõe variáveis com prefixo `VITE_` ao bundle do client. Variáveis do server ficam no Render, nunca no browser.

## 7. Migração e Seed de Dados

### 7.1 Estratégia de Seed

1. Configurar `DATABASE_URL` local para apontar ao Atlas (temporariamente)
2. Executar: `npm run seed:turmas`
3. Verificar no Atlas Dashboard que as collections foram criadas:
   - `teachers` (professor default criado pelo seed)
   - `classrooms` (3º ANO A, 3º ANO B)
   - `squads` (bancadas com alunos)
4. Restaurar `DATABASE_URL` local para MongoDB Docker

**Alternativa**: Criar script `seed:prod` que lê `DATABASE_URL` de argumento CLI em vez de `.env`, evitando alteração temporária do `.env` local.

### 7.2 Dados Iniciais

O seed atual (`turmas_alunos.json`) cria:
- 2 turmas: "3º ANO A" (7 alunos) e "3º ANO B" (5 alunos)
- 1 professor default (criado por `createTeacher.ts`)
- Bancadas (squads) autogeradas a partir dos alunos

**Volume estimado**: < 1 MB de dados. Muito dentro do limite de 512 MB do Atlas M0.

## 8. Uploads de Evidências Fotográficas

### 8.1 Problema

O multer atual salva fotos no filesystem local (`server/uploads/`). No Render free tier, o filesystem é efêmero — reinícios do serviço apagam os uploads.

### 8.2 Soluções por Fase

| Fase | Solução | Custo | Alteração de Código |
|---|---|---|---|
| **MVP/Demo** | Multer local (aceitar perda) | $0 | Nenhuma |
| **V1 Estável** | Cloudinary (free: 25 créditos/mês) | $0 | Sim — migrar multer para Cloudinary SDK |
| **V2 Escalável** | Supabase Storage (1 GB free) | $0 | Sim — migrar para Supabase client |

**Recomendação**: Para o deploy inicial (MVP/Demo), manter multer local e documentar a limitação. Migrar para Cloudinary ou Supabase Storage na próxima fase de estabilização.

## 9. Distinção Pública entre Web-book e Plataforma

### 9.1 URLs Finais

| Produto | URL | O que serve |
|---|---|---|
| **Web-book (vitrine)** | `https://lmbernardo7520112.github.io/plataforma_educacional_sabao/` | E-book interativo Premium 3D estático |
| **Plataforma (client)** | `https://ecosabon.vercel.app/` (nome sujeito a disponibilidade) | SPA React com login, dashboard, missões |
| **API (server)** | `https://ecosabon-api.onrender.com/` | API REST Express com JWT/RBAC |
| **Banco** | Atlas (não exposto publicamente) | MongoDB via connection string TLS |

### 9.2 Comunicação Clara

- O web-book é a **vitrine estática** — demonstra o design, conteúdo e experiência 3D
- A plataforma é o **sistema multiusuário** — exige login, conecta-se ao banco, processa missões
- Ambos coexistem sem conflito — URLs diferentes, deploys diferentes, pipelines diferentes

## 10. Plano de Execução Faseado

### Fase 1 — Infraestrutura (sem alteração de código)
1. ☐ Criar conta MongoDB Atlas
2. ☐ Criar cluster M0 free (sa-east-1)
3. ☐ Criar database user e configurar Network Access
4. ☐ Criar conta Render
5. ☐ Criar conta Vercel (ou usar existente)

### Fase 2 — Deploy do Server (Render)
1. ☐ Conectar repo GitHub ao Render
2. ☐ Configurar Root Directory, Build/Start commands
3. ☐ Configurar variáveis de ambiente (JWT_SECRET, DATABASE_URL, ALLOWED_ORIGINS)
4. ☐ Deploy e validar health check: `GET /ping` → `pong`
5. ☐ Validar `GET /` → API status JSON

### Fase 3 — Seed de Dados
1. ☐ Executar seed apontando para Atlas
2. ☐ Validar collections no Atlas Dashboard
3. ☐ Testar autenticação via curl/httpie contra API no Render

### Fase 4 — Deploy do Client (Vercel)
1. ☐ Criar `client/vercel.json` com rewrites para API
2. ☐ Conectar repo GitHub ao Vercel (root: `client/`)
3. ☐ Configurar variável `VITE_API_URL`
4. ☐ Deploy e validar SPA no browser
5. ☐ Testar fluxo completo: onboarding → login → dashboard → missão → report

### Fase 5 — Validação e Documentação
1. ☐ Testar CORS: client Vercel → API Render
2. ☐ Testar autenticação professor + squad
3. ☐ Testar upload de foto (com ressalva de efêmero)
4. ☐ Atualizar README com URLs de produção
5. ☐ Criar relatório de deploy (R102)

## 11. Alterações de Código Necessárias (Mínimas)

> ⚠️ NESTA FASE NÃO SERÃO FEITAS. Apenas documentadas para a fase de execução.

### 11.1 Criar `client/vercel.json`
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://ecosabon-api.onrender.com/api/:path*" }
  ]
}
```

### 11.2 (Opcional) Ajustar `client/src/lib/api.ts`
```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  // ...
});
```

### 11.3 Ajustar porta no server (se necessário)
O Render injeta `PORT` automaticamente. O `server.ts` já lê `process.env.PORT || 3000`. ✅ Nenhuma alteração necessária.

### 11.4 Ajustar proxy do Vite (somente dev)
O `vite.config.ts` do client aponta proxy para `http://localhost:4000`. Em produção (Vercel), o proxy não é usado — o `vercel.json` cuida do rewrite. Nenhuma alteração necessária para deploy.

## 12. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Render spin-down (15 min) | Cold start de 30-50s | Aceitável para demo. UptimeRobot gratuito pode pingar a cada 14 min |
| Uploads efêmeros no Render | Fotos perdidas ao reiniciar | Documentar. Migrar para Cloudinary na V1 |
| Atlas M0 storage (512 MB) | Pode encher com muitas fotos em base64 | Fotos são servidas via uploads/, não em base64. 512 MB >> dados textuais |
| CORS misconfiguration | API rejeita client | Configurar ALLOWED_ORIGINS com URL exata do Vercel |
| JWT_SECRET fraco | Tokens falsificáveis | Gerar com `openssl rand -base64 32` |
| IP allowlist Atlas | Render IP muda | Usar `0.0.0.0/0` (permitir qualquer). Atlas M0 não suporta VPC peering |

## 13. Custos

| Serviço | Tier | Custo Mensal | Observação |
|---|---|---|---|
| Vercel | Hobby (Free) | $0 | Até 100 GB bandwidth |
| Render | Free | $0 | 750 h/mês, spin-down |
| MongoDB Atlas | M0 | $0 | 512 MB, shared cluster |
| GitHub Pages | Free | $0 | Já ativo (web-book) |
| **Total** | — | **$0/mês** | — |

## 14. GO/NO-GO para Deploy Completo

| Gate | Status | Veredicto |
|---|---|---|
| Código pronto para deploy? | ✅ 211 testes passando | GO |
| Alteração mínima necessária? | ✅ Apenas `vercel.json` | GO |
| Segurança implementada? | ✅ JWT + RBAC + Helmet + CORS + Rate Limit | GO |
| Variáveis de ambiente documentadas? | ✅ `.env.example` completo | GO |
| Seed de dados disponível? | ✅ `npm run seed:turmas` | GO |
| Web-book preservado? | ✅ Intocado | GO |
| Custo zero confirmado? | ✅ Vercel + Render + Atlas M0 | GO |
| Uploads efêmeros documentados? | ✅ Risco aceito para MVP | GO |

**VEREDICTO FINAL: 🟢 GO — A plataforma pode ser implantada gratuitamente.**

## 15. Próxima Fase Recomendada

**FDP-DEPLOY** — Execução controlada do deploy:
1. Criar contas nos serviços (Atlas, Render, Vercel)
2. Criar branch `deploy/ecosabon-full-platform`
3. Adicionar `client/vercel.json`
4. Configurar variáveis de ambiente nos dashboards
5. Deploy server → seed → deploy client
6. Validação ponta a ponta
7. Relatório R102

## 16. Decisão

`DECISÃO: PLANO DE DEPLOY GRATUITO DA PLATAFORMA ECOSABON COMPLETA ELABORADO COM SUCESSO. ARQUITETURA RECOMENDADA: VERCEL (CLIENT) + RENDER (SERVER) + MONGODB ATLAS M0 (BANCO). CUSTO: $0/MÊS. VEREDICTO: GO PARA DEPLOY. PRÓXIMA FASE: FDP-DEPLOY.`
