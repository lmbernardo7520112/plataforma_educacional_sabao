# R134 — Checklist Final: Execução Assistida do Deploy Restrito

## 1. Checklist MongoDB Atlas
- [ ] Criar projeto Atlas dedicado ao piloto EcoSabon.
- [ ] Criar cluster M0 gratuito (região compatível com Render, ex: `us-east-1`).
- [ ] Criar usuário de banco `ecosabon_pilot_srv` com privilégio mínimo (readWrite em `ecosabon_pilot`).
- [ ] Gerar senha forte e aleatória (mínimo 32 caracteres).
- [ ] Configurar Network Access:
  - Preferir restrição máxima de IP.
  - Se inevitável (Render Free com IPs dinâmicos), usar `0.0.0.0/0` como exceção provisória do spike, nunca como configuração ideal de produção.
- [ ] Obter connection string no formato `mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>/ecosabon_pilot?retryWrites=true&w=majority`.
- [ ] Guardar connection string exclusivamente no dashboard do Render (variável `DATABASE_URL`).
- [ ] **NÃO** versionar connection string no repositório.

## 2. Checklist Render Backend
- [ ] Criar Web Service no Render conectado ao repositório GitHub.
- [ ] Configurar Root Directory: `server/`.
- [ ] Configurar Build Command: `npm install`.
- [ ] Configurar Start Command: `npm start`.
- [ ] Configurar variáveis de ambiente no dashboard:
  - `NODE_ENV=production`
  - `DATABASE_URL=<connection string Atlas>`
  - `JWT_SECRET=<chave forte gerada aleatoriamente>`
  - `ALLOWED_ORIGINS=<VERCEL_FRONTEND_URL>`
  - `PILOT_MODE=true`
  - `PILOT_ALLOWED_TEACHER_EMAILS=<LEONARDO_EMAIL_REAL>,<NADJA_EMAIL_REAL>`
  - `PILOT_ALLOW_SQUAD_LOGIN=false`
- [ ] Validar que `/ping` retorna `200 OK`.
- [ ] Validar que logs não exibem segredos (JWT, senha, connection string).
- [ ] Validar CORS aceita apenas o domínio da Vercel.
- [ ] Documentar a URL gerada pelo Render: `<RENDER_BACKEND_URL>`.

## 3. Checklist Seed Sintético
- [ ] Executar `restrictedPilotSeed.ts` contra o banco `ecosabon_pilot` no Atlas.
- [ ] Confirmar que as turmas criadas são `3ºA` e `3ºB`.
- [ ] Confirmar que as bancadas têm limite de 5 alunos.
- [ ] Confirmar ausência total de dados reais de estudantes.
- [ ] Confirmar ausência de e-mails reais nos dados de seed.
- [ ] **NÃO** executar seed sem autorização explícita.

## 4. Checklist Vercel Frontend
- [ ] Criar projeto na Vercel conectado ao repositório GitHub.
- [ ] Configurar Root Directory: `client/`.
- [ ] Framework Preset: `Vite`.
- [ ] Build Command: `tsc -b && vite build`.
- [ ] Output Directory: `dist`.
- [ ] Validar que `client/vercel.json` redireciona `/api/*` para `<RENDER_BACKEND_URL>/api/*`.
- [ ] **NÃO** configurar segredos no painel da Vercel.
- [ ] **NÃO** configurar allowlist de e-mails no frontend.
- [ ] Validar que a interface renderiza sem erros.
- [ ] Documentar a URL gerada pela Vercel: `<VERCEL_FRONTEND_URL>`.

## 5. Checklist CORS
- [ ] `ALLOWED_ORIGINS` no Render contém exatamente `<VERCEL_FRONTEND_URL>`.
- [ ] Confirmar que `ALLOWED_ORIGINS` **não** contém `*`.
- [ ] Testar que requisição de origem não autorizada é bloqueada.
- [ ] Testar que requisição da Vercel é aceita.

## 6. Checklist JWT
- [ ] `JWT_SECRET` gerado com mínimo 64 caracteres aleatórios.
- [ ] `JWT_SECRET` configurado exclusivamente no dashboard do Render.
- [ ] `JWT_SECRET` **nunca** versionado em código ou relatórios.
- [ ] Tokens JWT não expostos em logs do Render.
- [ ] Revogação funciona: alterar allowlist invalida tokens ativos.

## 7. Checklist Allowlist
- [ ] `PILOT_ALLOWED_TEACHER_EMAILS` contém apenas `<LEONARDO_EMAIL_REAL>,<NADJA_EMAIL_REAL>`.
- [ ] E-mails reais inseridos apenas no dashboard do Render.
- [ ] E-mails reais **nunca** commitados no repositório.
- [ ] Login com e-mail autorizado funciona (`200 OK`).
- [ ] Login com e-mail não autorizado retorna `403 Forbidden`.
- [ ] Cadastro com e-mail não autorizado retorna `403 Forbidden`.

## 8. Checklist Rollback
- [ ] Plano de rollback documentado em R129.
- [ ] Capacidade de limpar variáveis nos dashboards confirmada.
- [ ] Capacidade de pausar/excluir serviço Render confirmada.
- [ ] Capacidade de pausar/excluir projeto Vercel confirmada.
- [ ] Capacidade de revogar usuário Atlas confirmada.
- [ ] Capacidade de rotacionar `JWT_SECRET` confirmada.

## 9. Checklist de Comunicação
- [ ] Leonardo e Nadja informados sobre o piloto (fase futura).
- [ ] Instruções de acesso preparadas (fase futura).
- [ ] Canal de suporte/feedback definido (fase futura).

## 10. Checklist Pós-Deploy
- [ ] Login autorizado funciona end-to-end (Vercel → Render → Atlas).
- [ ] Login não autorizado bloqueado end-to-end.
- [ ] Bancadas sintéticas visíveis para professor autorizado.
- [ ] Squad login bloqueado por padrão.
- [ ] Nenhum segredo nos logs do Render.
- [ ] Nenhuma variável exposta no DevTools do browser.
- [ ] Nenhum dado real de estudante no banco.
- [ ] Custo de infraestrutura: $0 (free tier).
- [ ] Relatório final de homologação criado.
- [ ] Decisão GO/NO-GO para manter online registrada.
