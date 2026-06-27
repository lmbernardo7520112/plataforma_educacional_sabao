# R114 — Plano Operacional para Spike Controlado de Deploy da Plataforma EcoSabon

## 1. Objetivo
Apresentar o plano operacional e estratégico para a execução futura do spike/piloto de deploy gratuito da Plataforma EcoSabon completa na nuvem, garantindo isolamento da base local, conformidade com os free tiers dos provedores, integridade de segurança, e governança de dados sintéticos.

## 2. Estado Atual e Arquitetura-Alvo
- **Ambiente Local**: Client Vite (`localhost:5173`), API Express (`localhost:3000`), MongoDB em Docker (`localhost:27019` externo, `27017` interno). Banco local preservado com 10 documentos sintéticos.
- **Ambiente de Vitrine**: Web-book estático hospedado no GitHub Pages (`gh-pages`). **Não deve ser modificado**.
- **Ambiente de Spike (Nuvem Futura)**:
  - **Client**: Hospedado no Vercel (Hobby Tier).
  - **API**: Hospedado no Render (Free Web Service).
  - **Banco de Dados**: MongoDB Atlas (M0 Free Cluster).
  - **Roteamento**: Rewrite no Vercel redireciona `/api/*` nativamente para o backend Render.

## 3. Matriz de Variáveis para Deploy Futuro

| Serviço | Variável | Tipo | Valor / Destino | Finalidade | Classificação |
|---|---|---|---|---|---|
| **Render** | `NODE_ENV` | Config | `production` | Modo de execução do node | Pública |
| **Render** | `PORT` | Config | `3000` (ou injetada pelo Render) | Porta de escuta da API | Pública |
| **Render** | `DATABASE_URL` | Segredo | `mongodb+srv://...` (Atlas string) | Conexão segura com o MongoDB Atlas | Secreta (Dashboard) |
| **Render** | `JWT_SECRET` | Segredo | Gerado com `openssl rand -base64 32` | Chave de assinatura dos tokens JWT | Secreta (Dashboard) |
| **Render** | `ALLOWED_ORIGINS` | Config | `https://<VERCEL_SUBDOMAIN>.vercel.app` | CORS allowlist da API para o Vercel | Pública (Dashboard) |
| **Vercel** | — | — | Nenhuma (usa rewrite via `vercel.json`) | Roteamento nativo de requisições de API | N/A |
| **Atlas** | Network IPs | Config | `0.0.0.0/0` | Acesso de rede de entrada para o cluster | Pública (Atlas Dashboard) |

*Nota: Nenhuma variável de ambiente sensível ou secreta será injetada no código ou exposta na Vercel (Client).*

## 4. Ordem Segura de Criação dos Serviços

### Passo 1: MongoDB Atlas (M0 Free Cluster)
1. Criar conta/organização e cluster M0 grátis na AWS na região mais próxima (`sa-east-1` ou `us-east-1`).
2. Criar um usuário de banco exclusivo (ex: `ecosabon_admin`) com senha forte autogerada.
3. Adicionar permissão IP temporária `0.0.0.0/0` (permitir todas as origens) no painel de Network Access (obrigatório, pois o Render Free possui IPs dinâmicos).
4. Copiar a string de conexão segura.

### Passo 2: Inicialização e Seed dos Dados
1. Configurar temporariamente uma variável de ambiente local `DATABASE_URL` apontando para o Atlas.
2. Executar localmente `npm run seed:turmas` contra o banco do Atlas para popular a estrutura de teste com a massa de dados sintéticos (`turmas_alunos.json`).
3. Remover a string de conexão do ambiente de desenvolvimento local imediatamente após o seed e restaurar a porta local do MongoDB.

### Passo 3: Backend no Render (Web Service)
1. Criar novo Web Service e conectar ao repositório GitHub.
2. Configurar a pasta base como a raiz, comando de build como `npm install && npm run build:shared`, e comando de início como `cd server && npx tsx server.ts`.
3. Adicionar as variáveis de ambiente: `NODE_ENV=production`, `DATABASE_URL` (string do Atlas), `JWT_SECRET` (segredo forte), `ALLOWED_ORIGINS` (candidata inicial, depois atualizada com o domínio da Vercel).
4. Aguardar o deploy e testar a resposta do endpoint público `https://<api-subdomain>.onrender.com/ping` (deve retornar `pong`).

### Passo 4: Frontend na Vercel (Static SPA)
1. Importar o repositório na Vercel, definindo a pasta raiz do projeto como `client/`.
2. O preset de framework padrão do Vite será detectado automaticamente.
3. Configurar comando de build como `cd .. && npm run build:shared && cd client && npm run build`.
4. Implantar o frontend. As requisições de `/api/*` serão mapeadas automaticamente via `client/vercel.json` para o Render.
5. Copiar a URL de produção autogerada pela Vercel e atualizar a variável `ALLOWED_ORIGINS` no painel do Render para fechar as políticas de CORS.

## 5. Política de Dados Sintéticos e Isolamento
- **Massa de Dados**: Utilizar exclusivamente os dados do arquivo didático `server/seed/turmas_alunos.json` (2 turmas e 12 alunos mock sintéticos).
- **Sem Dados Reais**: Fica expressamente proibido o cadastro de turmas, alunos ou professores reais no ambiente de spike em nuvem.
- **Sem Migração de Bancos Locais**: A estrutura será inicializada do zero através do script de seed contra a nuvem, prevenindo qualquer vazamento de dados acumulados em laboratório local.

## 6. Riscos e Mitigações do Free Tier

- **Cold Start do Render**: O Express API no Render entra em hibernação após 15 minutos sem tráfego. O primeiro acesso levará cerca de 1 minuto para carregar.
  - *Mitigação*: Este comportamento é aceito no escopo do spike. O cliente Vercel exibirá um indicador visual de carregamento apropriado para o usuário.
- **Uploads Efêmeros**: Fotos de relatórios enviadas por alunos e processadas via Multer serão salvas localmente no disco do Render. O ciclo de hibernação/reinício apaga o disco efêmero.
  - *Mitigação*: Este comportamento é documentado como limite do spike. Os uploads servem apenas para teste de sucesso de API, sem persistência a longo prazo.
- **Armazenamento no Atlas**: Limite de 512 MB.
  - *Mitigação*: Banco de dados textual sintético consome menos de 1 MB. O limite do Atlas é mais do que suficiente.
- **IP Allowlist**: O Render não oferece IP estático no plano gratuito.
  - *Mitigação*: Manter allowlist aberta (`0.0.0.0/0`) no MongoDB Atlas, mas com autenticação robusta do usuário e senha forte.

## 7. Plano de Rollback e Desligamento
Após a conclusão dos testes do spike de deploy, o ambiente deve ser totalmente desfeito para evitar ociosidade e riscos:
1. Deletar os projetos/deployments no painel da Vercel.
2. Suspender ou deletar o Web Service correspondente no painel do Render.
3. Apagar o banco `ecosabon_db` e fechar o acesso de rede (`0.0.0.0/0` removido) no painel do MongoDB Atlas.
4. Nenhuma URL de produção ou chave secreta deve ser incluída nos arquivos persistidos no repositório GitHub principal.
