# R112 — Revisão do PR #42: Preparação Técnica para Spike Controlado

## 1. Identificação
- **PR**: #42
- **Branch**: `spike/ecosabon-platform-deploy-prep`
- **Base**: `main`

## 2. Arquivos Alterados no PR

| Arquivo | Descrição |
|---|---|
| `client/tsconfig.app.json` | Mapeamento de alias `@curso/*` para compatibilidade com build do client |
| `client/vercel.json` | Arquivo de roteamento proxy para redirecionamento nativo da Vercel para o Render |
| `client/vite.config.ts` | Proxy local ajustado para port 3000 |
| `reports/110-fdp-spike-requisitos-e-runtime-local-ecosabon.md` | Relatório de auditoria e alinhamento de portas |
| `reports/111-decisao-fdp-spike-pre-deploy-ecosabon.md` | Relatório de decisão formal da fase |
| `shared/config/missionDocs.ts` | Remoção de import obsoleto para compilação limpa do client |

- ❌ Nenhuma alteração em rotas de backend, lógica funcional ou segurança
- ❌ Nenhum arquivo no web-book estático ou branch `gh-pages` alterado

## 3. Verificação do arquivo `.env`
- **Status**: ✅ **Totalmente Protegido**.
- A alteração do `PORT=3000` em `server/.env` foi mantida estritamente em ambiente local e **não foi versionada nem incluída no commit do PR**.
- O arquivo `.env` real permanece listado no `.gitignore` do repositório.

## 4. Alinhamento de Portas (Proxy 4000 → 3000)
- **Decisão**: Aprovada e validada.
- O client Vite e o servidor Express agora escutam e comunicam-se na porta padrão **`3000`**.
- O alinhamento elimina a inconsistência que quebrava o runtime do Docker Compose (mapeamento `3000:3000`).

## 5. Análise Crítica do `client/vercel.json` (URL Render)
- **Risco**: O arquivo aponta para `https://ecosabon-api.onrender.com/api/*`.
- **Avaliação**: O serviço e domínio no Render **não foram provisionados** e não existem atualmente.
- **Tratamento**: Aprovada a **Opção A (Manter como URL candidata)**, pois o relatório R110 foi explicitamente atualizado para incluir um aviso de segurança destacando que a URL é candidata e inoperante até a fase de deploy real (`FDP-DEPLOY-SPIKE`). Não há risco de induzir deploy funcional incompleto ou quebrado.

## 6. Ajustes de Compilação (TypeScript)
- O mapeamento `@curso/*` em `tsconfig.app.json` e a remoção de imports não utilizados em `shared/` resolvem problemas na compilação do TypeScript.
- O build de produção local (`npm run build -w client`) foi executado e concluiu com 100% de sucesso em menos de 1 segundo.

## 7. Runtime Local Real
- O MongoDB local em Docker foi verificado em execução e saudável.
- O servidor Express foi iniciado localmente e respondeu com `200 OK` na porta `3000` (`HEAD /`, `GET /ping` e `GET /`).
- O client Vite foi iniciado e respondeu a requisições HTTP locais na porta `5173`.
- A comunicação local do monorepo está totalmente funcional e alinhada à porta 3000.

## 8. Testes e Segurança
- **Testes**: ✅ **211 testes passados, 0 falhas** (124 web-book, 47 workspace, 40 server).
- **Secrets**: Nenhum segredo ou chave exposta nos arquivos modificados ou incluídos.
- **Deploy**: Nenhum deploy em nuvem executado.

## 9. Decisão Final

`DECISÃO: PR #42 APROVADO PARA MERGE COMO PREPARAÇÃO TÉCNICA DE SPIKE. NENHUM DEPLOY EXECUTADO. NENHUM SERVIÇO EXTERNO CRIADO. .ENV REAL NÃO VERSIONADO.`
