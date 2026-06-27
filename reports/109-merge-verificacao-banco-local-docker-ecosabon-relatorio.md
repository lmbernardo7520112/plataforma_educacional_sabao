# R109 — Relatório de Merge: Verificação do Banco Local Docker EcoSabon (FDP-DB-CHECK-MERGE)

## 1. Identificação

| Item | Valor |
|---|---|
| **PR** | #41 |
| **Branch origem** | `docs/ecosabon-fdp-db-check-local-mongodb` |
| **Branch destino** | `main` |
| **Hash do merge** | `1542982` |
| **Data** | 2026-06-27 |
| **Estado da main** | Limpa, atualizada, testes verdes |

## 2. Escopo Mergeado

| Arquivo | Tipo | Linhas |
|---|---|---|
| `reports/107-verificacao-banco-local-docker-ecosabon.md` | Documentação (novo) | +127 |
| `reports/108-mapa-acesso-local-plataforma-ecosabon.md` | Documentação (novo) | +163 |
| **Total** | **2 arquivos documentais** | **+290, 0 deleções** |

- ❌ Nenhuma alteração técnica
- ❌ Nenhum arquivo em `server/`, `client/`, `shared/`, `curso-interativo/`, `ebook-ecosabon-prototipo/`
- ❌ Nenhum `docker-compose.yml`, `.env`, `package.json` ou `package-lock.json` alterado

## 3. Resultado da Verificação do Banco Local

| Atributo | Valor |
|---|---|
| **Container** | `ecosabon-mongo` |
| **Imagem** | `mongo:7` |
| **Status** | Up, healthy |
| **Porta** | `27019 → 27017` |
| **Volume** | `plataforma_educacional_sabao_mongo_data` (named volume) |
| **Montagem** | `/data/db` |
| **Banco** | `ecosabon_db` |
| **Tamanho** | ~503 KB |

### Collections e Contagens

| Collection | Documentos |
|---|---|
| `classrooms` | 2 |
| `squads` | 1 |
| `journeystates` | 6 |
| `teachers` | 1 |
| **Total** | **10 documentos** |

### Conclusão do Banco

O banco MongoDB local em Docker está **preservado e populado** com dados sintéticos de demonstração. O volume persistente garante que os dados sobrevivem a reinícios do container.

## 4. Garantias

| Garantia | Status |
|---|---|
| Nenhum volume Docker removido | ✅ |
| Nenhum seed executado | ✅ |
| Nenhum dado alterado | ✅ |
| Nenhum dado exportado | ✅ |
| Nenhum `.env` real impresso | ✅ |
| Nenhum deploy executado | ✅ |
| Nenhum serviço externo criado (Vercel/Render/Atlas) | ✅ |
| Nenhum banco migrado | ✅ |
| Web-book intocado | ✅ |
| Plataforma intocada | ✅ |
| Docker Compose intocado | ✅ |

## 5. Ponto de Atenção Obrigatório para Próxima Fase

⚠️ **Discrepância de proxy detectada na FDP-DB-CHECK:**

| Componente | Porta |
|---|---|
| `client/vite.config.ts` proxy target | `http://localhost:4000` |
| `server/server.ts` porta padrão | `3000` (`process.env.PORT \|\| 3000`) |

O proxy do Vite aponta para `localhost:4000`, mas o server escuta em `localhost:3000` por padrão. Isso pode causar falha de comunicação Client → API no ambiente de desenvolvimento local.

**Ação necessária**: Investigar e corrigir na fase **FDP-SPIKE-0**. Possíveis resoluções:
1. Alterar o proxy no `vite.config.ts` para `http://localhost:3000`
2. Ou configurar `PORT=4000` no `server/.env`

**NÃO foi corrigido nesta fase** por ser merge exclusivamente documental.

## 6. Testes

**Pré-merge (main):**

| Suite | Arquivos | Testes | Status |
|---|---|---|---|
| Web-book | 1 | 124 | ✅ |
| Workspace | 6 | 47 | ✅ |
| Server | 5 | 40 | ✅ |
| **Total** | **12** | **211** | **0 falhas** |

**Pós-merge (main @ `1542982`):**

| Suite | Arquivos | Testes | Status |
|---|---|---|---|
| Web-book | 1 | 124 | ✅ |
| Workspace | 6 | 47 | ✅ |
| Server | 5 | 40 | ✅ |
| **Total** | **12** | **211** | **0 falhas** |

## 7. Decisão

`FDP-DB-CHECK MERGEADO. BANCO LOCAL DOCKER PRESERVADO E POPULADO. NENHUM DADO ALTERADO. NENHUM SEED EXECUTADO. NENHUM DEPLOY REALIZADO. PRÓXIMA FASE RECOMENDADA: FDP-SPIKE-0 PARA INVESTIGAR RUNTIME LOCAL, PROXY 4000 VS 3000 E PRÉ-REQUISITOS DE DEPLOY CONTROLADO.`
