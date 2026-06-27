# R107 — Verificação Não Destrutiva do MongoDB Local em Docker (FDP-DB-CHECK)

## 1. Objetivo

Verificar, sem alterar nada, se o banco MongoDB local em Docker da Plataforma EcoSabon existe, se o volume persistente está preservado, se o banco está populado e quais dados/collections existem atualmente.

## 2. Comandos Executados (Somente Leitura)

| # | Comando | Propósito |
|---|---|---|
| 1 | `docker ps -a` | Listar todos os containers |
| 2 | `docker volume ls` | Listar volumes Docker |
| 3 | `docker network ls` | Listar redes Docker |
| 4 | `docker compose ls` | Listar projetos compose |
| 5 | `docker compose ps` | Listar serviços do projeto |
| 6 | `docker ps -a --format ... \| grep mongo` | Filtrar containers MongoDB |
| 7 | `docker inspect ecosabon-mongo --format '{{json .Mounts}}'` | Inspecionar montagens do container |
| 8 | `docker volume inspect plataforma_educacional_sabao_mongo_data` | Inspecionar volume nomeado |
| 9 | `docker exec ecosabon-mongo mongosh --eval "db.adminCommand('listDatabases')"` | Listar bancos |
| 10 | `docker exec ecosabon-mongo mongosh ecosabon_db --eval "db.getCollectionNames()"` | Listar collections |
| 11 | `docker exec ecosabon-mongo mongosh ecosabon_db --eval "...countDocuments()"` | Contar documentos |

**Nenhum comando destrutivo foi executado.**

## 3. Containers Docker Encontrados

| Container | Imagem | Status | Portas | Projeto |
|---|---|---|---|---|
| `ecosabon-mongo` | mongo:7 | ✅ Up (healthy) | 27019→27017 | **plataforma_educacional_sabao** |
| `academiaflow_mongo` | mongo:6.0-jammy | Up (healthy) | 27017 (interno) | appliance_v140_release |
| `academiaflow-mongo` | mongo:7 | Exited (0) 8 semanas | — | using_pythagora |
| `doodads-mongodb` | mongo:7.0 | Up | 27017→27017 | doodads |

## 4. Container MongoDB do Projeto EcoSabon

| Atributo | Valor |
|---|---|
| **Nome** | `ecosabon-mongo` |
| **Imagem** | `mongo:7` |
| **Status** | Up, healthy |
| **Porta externa** | `27019` |
| **Porta interna** | `27017` |
| **Criado** | ~2 meses atrás |
| **Compose project** | `plataforma_educacional_sabao` |
| **Compose file** | `docker-compose.yml` do projeto |

## 5. Volumes Identificados

### Volume principal do projeto:

| Atributo | Valor |
|---|---|
| **Nome** | `plataforma_educacional_sabao_mongo_data` |
| **Tipo** | Named Volume (Docker Compose) |
| **Driver** | local |
| **Mountpoint** | `/var/lib/docker/volumes/plataforma_educacional_sabao_mongo_data/_data` |
| **Destino no container** | `/data/db` |
| **Criado em** | 2026-03-30T22:13:11 |
| **Compose label** | `com.docker.compose.volume: mongo_data` |
| **Modo** | rw (leitura e escrita) |

### Volume auxiliar:

| Atributo | Valor |
|---|---|
| **Nome** | `a9119752e2...` (hash anônimo) |
| **Destino** | `/data/configdb` |
| **Propósito** | Configuração interna do MongoDB |

**Conclusão**: O volume `plataforma_educacional_sabao_mongo_data` é um **named volume** montado em `/data/db`. Isso significa que os dados **persistem** mesmo que o container seja parado, reiniciado ou recriado — desde que o volume não seja explicitamente removido com `docker volume rm` ou `docker compose down -v`.

## 6. Bancos Encontrados

| Banco | Tamanho (bytes) | Vazio? |
|---|---|---|
| `admin` | 40.960 | Não |
| `config` | 143.360 | Não |
| **`ecosabon_db`** | **503.808** | **Não** |
| `local` | 114.688 | Não |

**Total**: 802.816 bytes (~784 KB)

O banco da plataforma é **`ecosabon_db`** (nome do banco no Docker Compose: `mongodb://mongo:27017/ecosabon_db`).

## 7. Collections Encontradas

| Collection | Documentos | Descrição Inferida |
|---|---|---|
| `classrooms` | **2** | Turmas (3º ANO A, 3º ANO B) |
| `squads` | **1** | Bancada(s) de alunos |
| `journeystates` | **6** | Estados de jornada/missões |
| `teachers` | **1** | Professor(es) |

**Total**: 4 collections, 10 documentos.

## 8. Conclusão

### Estado do banco: ✅ PRESERVADO E POPULADO

O banco MongoDB local em Docker (`ecosabon_db`) está:
- **Ativo** — container `ecosabon-mongo` rodando e saudável
- **Persistente** — volume nomeado `plataforma_educacional_sabao_mongo_data` montado em `/data/db`
- **Populado** — 4 collections com 10 documentos (dados de demonstração)
- **Íntegro** — 2 turmas, 1 bancada, 6 estados de jornada, 1 professor
- **Compacto** — ~492 KB, muito abaixo de qualquer limite

### Dados são sintéticos/demonstrativos:
- Os seeds usam nomes fictícios ("Aluno Mock 1A", "Aluno Mock 2A", etc.)
- Não há risco aparente de dados pessoais reais

### Risco de perda:
- Os dados estarão seguros enquanto o volume `plataforma_educacional_sabao_mongo_data` existir
- **NÃO executar**: `docker compose down -v`, `docker volume rm`, `docker volume prune` ou `docker system prune --volumes`
- Parar o container com `docker stop ecosabon-mongo` é seguro — os dados persistem no volume

## 9. Confirmações de Segurança

| Confirmação | Status |
|---|---|
| Nenhum volume removido | ✅ |
| Nenhum seed executado | ✅ |
| Nenhum dado alterado | ✅ |
| Nenhum dado exportado | ✅ |
| Nenhum documento individual impresso | ✅ |
| Nenhum `.env` real impresso | ✅ |
| Nenhum serviço externo criado | ✅ |
| Nenhum deploy executado | ✅ |
