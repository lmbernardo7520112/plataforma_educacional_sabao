# R108 — Mapa de Acesso Local da Plataforma EcoSabon

## 1. Distinção entre Ambientes

### 1.1 Web-book Público (GitHub Pages)

| Atributo | Valor |
|---|---|
| **O que é** | Vitrine estática interativa com Premium 3D (Three.js) |
| **URL** | `https://lmbernardo7520112.github.io/plataforma_educacional_sabao/` |
| **Branch** | `gh-pages` |
| **Tecnologia** | Vite + HTML/CSS/JS estático |
| **Requer backend?** | ❌ Não |
| **Requer banco?** | ❌ Não |
| **Requer login?** | ❌ Não |
| **Funciona offline?** | ✅ Sim (após carregamento) |

### 1.2 Plataforma Local (Desenvolvimento)

| Atributo | Valor |
|---|---|
| **O que é** | Sistema multiusuário completo com API, banco e autenticação |
| **Client URL local** | `http://localhost:5173/` |
| **API URL local** | `http://localhost:3000/` (server direto) ou via proxy Vite |
| **Banco** | MongoDB em Docker na porta `27019` (banco: `ecosabon_db`) |
| **Requer Docker?** | ✅ Sim (para MongoDB) |
| **Requer `.env`?** | ✅ Sim (`server/.env` com `DATABASE_URL`, `JWT_SECRET`) |
| **Requer seed?** | ✅ Sim, para dados iniciais (`npm run seed:turmas`) |

### 1.3 Plataforma Futura Online (Spike Controlado)

| Atributo | Valor |
|---|---|
| **O que é** | Deploy gratuito da plataforma completa para demo/piloto |
| **Client** | Vercel (candidato) |
| **API** | Render (candidato) |
| **Banco** | MongoDB Atlas M0 Free (candidato) |
| **Status atual** | ❌ NÃO CRIADA — apenas planejada no R101 |

## 2. Comandos Locais Mapeados

### 2.1 Subir Banco MongoDB (Docker)

```bash
# Subir apenas o MongoDB (se não estiver rodando)
docker compose up -d mongo

# Verificar se está saudável
docker compose ps
```

### 2.2 Subir Plataforma Completa (Client + Server)

```bash
# Pré-requisito: MongoDB rodando (docker compose up -d mongo)
# Pré-requisito: server/.env configurado

# Construir camada compartilhada
npm run build:shared

# Subir Client + Server concorrentemente
npm start
```

### 2.3 Subir Apenas o Server

```bash
npm run server
# Ou diretamente: npm run dev -w server
```

### 2.4 Subir Apenas o Client

```bash
npm run client
# Ou diretamente: npm run dev -w client
```

### 2.5 Seed de Dados (referência futura — NÃO EXECUTAR AGORA)

```bash
# Popular turmas e alunos no banco local
npm run seed:turmas
```

### 2.6 Subir Web-book Localmente

```bash
npm run preview --prefix ebook-ecosabon-prototipo -- --host 127.0.0.1 --port 4173
# URL: http://127.0.0.1:4173/plataforma_educacional_sabao/
```

## 3. Portas Locais

| Serviço | Porta | Protocolo |
|---|---|---|
| Client React (Vite dev) | `5173` | HTTP |
| Server Express (API) | `3000` | HTTP |
| MongoDB (Docker, externo) | `27019` | TCP |
| MongoDB (Docker, interno) | `27017` | TCP |
| Web-book (preview) | `4173` | HTTP |

### Nota sobre proxy

O `client/vite.config.ts` configura proxy de `/api` e `/uploads` para `http://localhost:4000`. Porém, o server escuta na porta `3000` por padrão. Há uma discrepância entre:
- Proxy Vite aponta para `localhost:4000`
- Server padrão escuta em `localhost:3000`

**Isso pode exigir**: ou configurar `PORT=4000` no `server/.env`, ou ajustar o proxy no `vite.config.ts`. Este é um ponto de atenção para a fase de spike, mas **NÃO será alterado nesta fase**.

## 4. Dependências

| Dependência | Necessária para | Instalação |
|---|---|---|
| Node.js 20+ | Client, Server, Shared | Sistema |
| npm | Gerenciador de pacotes | Incluído com Node.js |
| Docker | MongoDB local | Sistema |
| MongoDB 7 (Docker) | Banco de dados | `docker compose up -d mongo` |
| `server/.env` | Variáveis do server | Copiar de `server/.env.example` |

## 5. Variáveis Necessárias

Referência: `server/.env.example`

| Variável | Obrigatória | Default |
|---|---|---|
| `NODE_ENV` | Sim | `development` |
| `PORT` | Sim | `3000` |
| `DATABASE_URL` | **Sim** | `mongodb://localhost:27017/ecosabon` |
| `JWT_SECRET` | **Sim** | (dev placeholder) |
| `ALLOWED_ORIGINS` | Em prod | `http://localhost:5173,http://127.0.0.1:5173` |
| `RATE_LIMIT_WINDOW_MS` | Não | `900000` |
| `RATE_LIMIT_MAX` | Não | `100` |

**Nota sobre DATABASE_URL**: O `.env.example` sugere `mongodb://localhost:27017/ecosabon`, mas o Docker Compose mapeia para porta `27019` externamente. Se o server roda fora do Docker (diretamente no host), o `DATABASE_URL` deve usar porta `27019`:
`mongodb://localhost:27019/ecosabon_db`

## 6. Seed Disponível (Sem Execução)

| Script | Arquivo | Dados |
|---|---|---|
| `npm run seed:turmas` | `server/seed/runAllSeeds.ts` | Orquestrador geral |
| — | `server/seed/createTeacher.ts` | Cria professor default |
| — | `server/seed/populateTurmasAlunos.ts` | Popula turmas e alunos |
| — | `server/seed/turmas_alunos.json` | Dados: 2 turmas, 12 alunos mock |

**Dados são sintéticos**: "Aluno Mock 1A", "Aluno Mock 2A", etc. Sem dados pessoais reais.

**Status atual**: Seed já foi executado — banco contém 2 turmas, 1 bancada, 6 jornadas, 1 professor.

## 7. Riscos Mapeados

| Risco | Impacto | Mitigação |
|---|---|---|
| `docker compose down -v` apaga dados | Perda total do banco local | Nunca usar flag `-v` sem backup |
| `docker volume prune` apaga volumes | Perda de volumes ociosos | Não executar sem verificação |
| Porta 4000 vs 3000 (proxy mismatch) | Client não encontra API | Ajustar em fase futura |
| `.env` com segredo fraco | Inseguro para produção | Gerar segredo forte antes de deploy |
| Banco sem backup | Sem recuperação | Considerar `mongodump` antes de migração |

## 8. Decisão

`DECISÃO: O ESTADO DO BANCO LOCAL FOI VERIFICADO SEM AÇÕES DESTRUTIVAS. A PLATAFORMA COMPLETA CONTINUA LOCAL E NÃO FOI PUBLICADA. QUALQUER MIGRAÇÃO PARA ATLAS OU DEPLOY EM VERCEL/RENDER DEVE OCORRER EM FASE SEPARADA, COM DADOS SINTÉTICOS E AUTORIZAÇÃO EXPLÍCITA.`
