# R113 — Relatório de Merge: Preparação de Runtime para Spike Controlado

## 1. Identificação
- **PR**: #42
- **Branch**: `spike/ecosabon-platform-deploy-prep`
- **Base**: `main`
- **Hash do merge**: `4b0bb13`
- **Estado da main**: ✅ Sincronizada, build passando e 211 testes verdes.

## 2. Arquivos Mergeados
- `client/tsconfig.app.json` (ajuste de alias TypeScript)
- `client/vercel.json` (configuração de rewrite para deploy na Vercel)
- `client/vite.config.ts` (alinhamento de porta local para 3000)
- `reports/110-fdp-spike-requisitos-e-runtime-local-ecosabon.md` (relatório de auditoria de nuvem grátis)
- `reports/111-decisao-fdp-spike-pre-deploy-ecosabon.md` (decisão formal de GO para spike)
- `reports/112-revisao-pr42-fdp-spike-0-runtime-deploy-prep.md` (relatório de revisão de PR)
- `shared/config/missionDocs.ts` (remoção de import não utilizado)

- ❌ Nenhuma alteração em rotas de backend, lógica funcional ou segurança
- ❌ Nenhum arquivo no web-book estático ou branch `gh-pages` alterado

## 3. Decisões Consolidadas

### 3.1 Unificação na Porta 3000
- O proxy do client Vite e a configuração interna do servidor Express local foram unificados para utilizar a porta **`3000`**.
- Isso resolve a inconsistência que quebrava o runtime do Docker Compose (que possui mapeamento de porta rígido `"3000:3000"`).

### 3.2 Destino do Roteamento no Vercel (vercel.json)
- O arquivo `client/vercel.json` foi aceito e incorporado no merge utilizando a **Opção A** (URL candidata futura). 
- A URL apontada (`https://ecosabon-api.onrender.com/api/*`) foi documentada formalmente no R110 como inoperante e pendente de provisionamento no Render durante a fase de deploy real (`FDP-DEPLOY-SPIKE`).

## 4. Resultados de Testes e Build

### 4.1 Testes Unitários e de Integração (Pós-Merge)
- **Web-book**: ✅ 124 testes passados
- **Workspace/Curso**: ✅ 47 testes passados
- **Server**: ✅ 40 testes passados
- **Total**: **211 testes passados, 0 falhas**

### 4.2 Build de Produção do Client
- Comando: `npm run build -w client` (executa `tsc -b && vite build`)
- **Status**: ✅ **Compilação concluída com sucesso** em 931ms.

## 5. Garantias e Riscos Residuais

### 5.1 Garantias
- **Sem Deploy**: Nenhum deploy em nuvem foi executado nesta fase.
- **Sem Serviços**: Nenhum serviço externo real foi criado.
- **Sem Banco**: Nenhum cluster MongoDB Atlas foi provisionado e nenhum dado local foi migrado.
- **Sem Secrets**: Nenhum `.env` real ou segredo foi exposto ou rastreado no repositório.
- **Banco Preservado**: MongoDB local Docker continua saudável e com dados intactos.

### 5.2 Riscos Residuais
- **Healthcheck**: O server responde de forma satisfatória e padronizada (Helmet, CORS, Request-Id) em `GET /`, `/ping` e `/api/...`. No entanto, não há rota específica `/api/health`.
- **Render Efêmero**: As fotos de evidências do Multer serão apagadas nos ciclos de reinício do Render Free Tier. Esse risco foi aceito para fins do spike experimental e piloto controlado.

## 6. Decisão Final

`FDP-SPIKE-0 MERGEADO. RUNTIME LOCAL PREPARADO PARA SPIKE CONTROLADO. PROXY ALINHADO À PORTA 3000. DEPLOY REAL AINDA NÃO EXECUTADO. SERVIÇOS EXTERNOS AINDA NÃO CRIADOS.`
