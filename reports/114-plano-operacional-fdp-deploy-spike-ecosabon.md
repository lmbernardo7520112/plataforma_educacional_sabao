# R114 — Plano Operacional para Piloto Restrito Online da Plataforma EcoSabon

## 1. Objetivo
Apresentar o plano operacional e estratégico para a execução futura do piloto restrito online da Plataforma EcoSabon completa na nuvem, garantindo isolamento da base local, conformidade com as restrições de acesso limitado, integridade de segurança, e governança de dados sintéticos.

## 2. Estado Atual e Arquitetura-Alvo
- **Ambiente Local**: Client Vite (`localhost:5173`), API Express (`localhost:3000`), MongoDB em Docker (`localhost:27019` externo, `27017` interno). Banco local preservado com 10 documentos sintéticos.
- **Ambiente de Vitrine**: Web-book estático hospedado no GitHub Pages (`gh-pages`). **Não deve ser modificado**.
- **Ambiente de Piloto Restrito (Nuvem Futura)**:
  - **Client**: Hospedado no Vercel (Hobby Tier), com acesso fechado apenas para os operadores autorizados.
  - **API**: Hospedado no Render (Free Web Service), com validação de allowlist baseada no e-mail de login.
  - **Banco de Dados**: MongoDB Atlas (M0 Free Cluster) contendo o banco do piloto (`ecosabon_pilot`).
  - **Roteamento**: Rewrite no Vercel redireciona `/api/*` nativamente para o backend Render.

## 3. Matriz de Variáveis para Deploy Futuro

| Serviço | Variável | Tipo | Valor / Destino | Finalidade | Classificação |
|---|---|---|---|---|---|
| **Render** | `NODE_ENV` | Config | `production` | Modo de execução do node | Pública |
| **Render** | `PORT` | Config | `3000` (ou injetada pelo Render) | Porta de escuta da API | Pública |
| **Render** | `DATABASE_URL` | Segredo | `mongodb+srv://...` (Atlas string) | Conexão segura com o MongoDB Atlas | Secreta (Dashboard) |
| **Render** | `JWT_SECRET` | Segredo | Gerado com `openssl rand -base64 32` | Chave de assinatura dos tokens JWT | Secreta (Dashboard) |
| **Render** | `ALLOWED_ORIGINS` | Config | `https://<VERCEL_SUBDOMAIN>.vercel.app` | CORS allowlist da API para o Vercel | Pública (Dashboard) |
| **Render** | `PILOT_MODE` | Config | `true` | Ativa o modo de controle estrito de acesso do piloto | Pública (Dashboard) |
| **Render** | `PILOT_ALLOWED_TEACHER_EMAILS` | Segredo | (Emails criptografados/ocultados de Leonardo e Nadja) | Lista de e-mails de professores autorizados a fazer login | Secreta (Dashboard) |

*Nota: Nenhuma variável de ambiente sensível ou secreta será injetada no código ou exposta na Vercel (Client).*

## 4. Ordem Segura de Criação dos Serviços

### Passo 1: MongoDB Atlas (M0 Free Cluster)
1. Criar conta/organização e cluster M0 grátis na AWS.
2. Criar um usuário de banco exclusivo (ex: `ecosabon_admin`) com senha forte autogerada.
3. Adicionar permissão IP temporária `0.0.0.0/0` (permitir todas as origens) no painel de Network Access.
4. Copiar a string de conexão segura.

### Passo 2: Inicialização e Seed dos Dados
1. Configurar temporariamente uma variável de ambiente local `DATABASE_URL` apontando para o Atlas.
2. Executar localmente `npm run seed:turmas` contra o banco do Atlas para popular a estrutura do piloto restrito com a massa de dados sintéticos (`turmas_alunos.json`) contendo apenas as turmas `3ºA` e `3ºB` e as bancadas de teste.
3. Remover a string de conexão do ambiente de desenvolvimento local imediatamente após o seed.

### Passo 3: Backend no Render (Web Service)
1. Criar novo Web Service e conectar ao repositório GitHub.
2. Configurar pasta base `./`, comando de build `npm install && npm run build:shared`, e comando de início `cd server && npx tsx server.ts`.
3. Adicionar as variáveis de ambiente: `NODE_ENV=production`, `DATABASE_URL` (string do Atlas), `JWT_SECRET` (segredo forte), `ALLOWED_ORIGINS` (candidata inicial), `PILOT_MODE=true` e `PILOT_ALLOWED_TEACHER_EMAILS`.
4. Aguardar o deploy e testar a resposta do endpoint público `https://<api-subdomain>.onrender.com/ping` (deve retornar `pong`).

### Passo 4: Frontend na Vercel (Static SPA)
1. Importar o repositório na Vercel, definindo a pasta raiz do projeto como `client/`.
2. Configurar comando de build como `cd .. && npm run build:shared && cd client && npm run build`.
3. Implantar o frontend. As requisições de `/api/*` serão mapeadas automaticamente via `client/vercel.json` para o Render.
4. Copiar a URL de produção autogerada pela Vercel e atualizar a variável `ALLOWED_ORIGINS` no painel do Render para fechar as políticas de CORS.

## 5. Política de Dados Sintéticos e Isolamento
- **Massa de Dados**: Utilizar exclusivamente os dados do arquivo didático `server/seed/turmas_alunos.json` para criar as turmas de teste `3ºA` e `3ºB` e as bancadas.
- **Sem Dados Reais**: Fica expressamente proibido o cadastro de turmas, alunos ou professores reais no ambiente de spike em nuvem.
- **Sem Migração de Bancos Locais**: A estrutura será inicializada do zero através do script de seed contra a nuvem, prevenindo qualquer vazamento de dados acumulados em laboratório local.

## 6. Riscos e Mitigações do Free Tier
- **Cold Start do Render**: O Express API no Render entra em hibernação após 15 minutos sem tráfego. O primeiro acesso levará cerca de 1 minuto para carregar.
  - *Mitigação*: Este comportamento é aceito no escopo do spike.
- **Uploads Efêmeros**: Fotos de relatórios enviadas por alunos e processadas via Multer serão salvas localmente no disco do Render. O ciclo de hibernação/reinício apaga o disco efêmero.
  - *Mitigação*: Este comportamento é documentado como limite do spike. Os uploads servem apenas para teste de sucesso de API, sem persistência a longo prazo.
- **Armazenamento no Atlas**: Limite de 512 MB.
  - *Mitigação*: Banco de dados textual sintético consome menos de 1 MB. O limite do Atlas é mais do que suficiente.
- **IP Allowlist**: O Render não oferece IP estático no plano gratuito.
  - *Mitigação*: Manter allowlist aberta (`0.0.0.0/0`) no MongoDB Atlas, mas com autenticação robusta do usuário e senha forte.

## 7. Plano de Rollback e Desligamento
Após a conclusão dos testes do piloto, o ambiente deve ser totalmente desfeito para evitar ociosidade e riscos:
1. Deletar os projetos/deployments no painel da Vercel.
2. Suspender ou deletar o Web Service correspondente no painel do Render.
3. Apagar o banco `ecosabon_pilot` e fechar o acesso de rede no painel do MongoDB Atlas.
4. Nenhuma URL de produção ou chave secreta deve ser incluída nos arquivos persistidos no repositório GitHub principal.
