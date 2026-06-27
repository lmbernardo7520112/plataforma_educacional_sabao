# R115 — Checklist de Execução para FDP-DEPLOY-SPIKE

## 1. Checklist Operacional

### 1.1 Checklist MongoDB Atlas
- [ ] Criar cluster M0 Free AWS (ex: `us-east-1` ou `sa-east-1`).
- [ ] Criar banco de dados com nome `ecosabon_db`.
- [ ] Adicionar usuário administrativo e gerar senha forte (mínimo 32 caracteres alfanuméricos).
- [ ] Adicionar a entrada `0.0.0.0/0` na aba Network Access.
- [ ] Obter e guardar temporariamente a URI de conexão (formato `mongodb+srv://...`).

### 1.2 Checklist de População (Seed)
- [ ] Atualizar temporariamente o `DATABASE_URL` local ou rodar script apontando diretamente para o Atlas.
- [ ] Executar o seed: `npm run seed:turmas`.
- [ ] Acessar o Atlas Database Exporter / Collections e confirmar que `classrooms`, `squads`, `journeystates` e `teachers` foram criados e contêm 10 documentos no total.
- [ ] Limpar e restaurar as configurações do banco local no host de desenvolvimento.

### 1.3 Checklist Render (Backend)
- [ ] Criar conta ou acessar painel do Render.
- [ ] Criar novo Web Service vinculado ao repositório GitHub da plataforma.
- [ ] Configurar:
  - **Root Directory**: `./` (raiz do monorepo)
  - **Build Command**: `npm install && npm run build:shared`
  - **Start Command**: `cd server && npx tsx server.ts`
- [ ] Adicionar variáveis de ambiente seguras:
  - `NODE_ENV=production`
  - `PORT=3000` (ou porta alternativa compatível)
  - `DATABASE_URL` (string Atlas)
  - `JWT_SECRET` (criptograficamente forte)
  - `ALLOWED_ORIGINS` (usar valor provisório `https://ecosabon.vercel.app`)
- [ ] Testar health check da API: `curl -I https://<subdomain>.onrender.com/ping` (deve retornar 200 e `pong`).

### 1.4 Checklist Vercel (Frontend)
- [ ] Acessar painel da Vercel.
- [ ] Criar novo projeto a partir do repositório GitHub.
- [ ] Configurar:
  - **Root Directory**: `client`
  - **Build Command**: `cd .. && npm run build:shared && cd client && npm run build`
  - **Output Directory**: `dist`
- [ ] Confirmar a presença de `client/vercel.json` na raiz do projeto com as regras de rewrite.
- [ ] Executar deploy.
- [ ] Obter a URL pública gerada (ex: `https://plataforma-ecosabon.vercel.app`).

### 1.5 Checklist de CORS e Integração
- [ ] Acessar as configurações do Web Service no Render.
- [ ] Atualizar a variável de ambiente `ALLOWED_ORIGINS` substituindo pelo domínio real gerado pela Vercel (ex: `https://plataforma-ecosabon.vercel.app,http://localhost:3000`).
- [ ] Salvar e aguardar o redeploy automático do Render.

### 1.6 Checklist de Testes de Produção
- [ ] Carregar a página do client na Vercel no navegador.
- [ ] Testar o fluxo de onboarding: criar uma bancada mock.
- [ ] Verificar a criação bem-sucedida do token e redirecionamento para o dashboard.
- [ ] Testar a submissão de um relatório e simular o upload de arquivo (confirmar que a API responde com sucesso).

### 1.7 Checklist de Desligamento (Rollback)
- [ ] Excluir o projeto do client no painel da Vercel.
- [ ] Pausar ou excluir o Web Service da API no painel do Render.
- [ ] Deletar a coleção de dados sintéticos e fechar o acesso de IPs no Atlas MongoDB.
