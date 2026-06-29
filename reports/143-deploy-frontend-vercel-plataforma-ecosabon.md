# R143 — Deploy Frontend Vercel — Plataforma EcoSabon

## 1. Objetivo

Publicar o frontend React/Vite na Vercel, conectando ao backend Render existente.

## 2. Projeto Vercel Errado

| Item | Valor |
|---|---|
| Nome do projeto errado | `plataforma-educacional-sabao-server` |
| Causa | Browser subagent configurou Root Directory incorreto |
| Build tentado | `ecosabon-server@1.0.0 build → tsc` |
| Erro | TS2349 no server (helmet/express-rate-limit) |
| Ação | **Projeto deletado via Dashboard** |

## 3. Correção Adotada

**Abordagem**: Vercel CLI + Git Integration
- CLI para login e criação de projeto
- Git Integration para build remoto (evita upload de 300+ MB)
- `vercel.json` na raiz com buildCommand customizado

## 4. Configuração Final

| Parâmetro | Valor |
|---|---|
| Projeto | `ecosabon-platform` |
| Root Directory | Raiz do repositório (monorepo) |
| Framework | Vite |
| Build Command | `npm run build -w shared && cd client && npx vite build` |
| Output Directory | `client/dist` |
| Install Command | `npm install` (instala todos workspaces) |
| Branch | `main` |
| Environment Variables | **Nenhuma** |

## 5. Rewrite `/api`

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://ecosabon-api.onrender.com/api/:path*" }
  ]
}
```

- Frontend usa `baseURL: '/api'` (relativo)
- Vercel faz rewrite para Render
- **Não foi necessário `VITE_API_URL`**

## 6. URL Vercel

```
https://ecosabon-platform.vercel.app
```

## 7. CORS no Render

- Testado: `OPTIONS` com `Origin: https://ecosabon-platform.vercel.app`
- Resposta: `access-control-allow-origin: https://ecosabon-platform.vercel.app`
- **Sem wildcard `*`** — origin específica
- **Nenhuma alteração necessária** no Render

## 8. Segurança

- ✅ Nenhum secret na Vercel
- ✅ Nenhum `DATABASE_URL` na Vercel
- ✅ Nenhum `JWT_SECRET` na Vercel
- ✅ Nenhum e-mail real na Vercel
- ✅ Nenhuma allowlist no frontend
- ✅ `.env` não versionado (somente `.env.example`)
- ✅ `.vercelignore` exclui `node_modules`, `.env`, dumps

## 9. PR e Merge

- PR #49: `chore(vercel): add root-level Vercel config for monorepo frontend deploy`
- CI: 7/7 checks verdes (GitGuardian, Gitleaks, EcoSabon Pipeline, Vercel)
- Mergeado na `main`

---

**Nenhum segredo, e-mail real, connection string ou `.env` foi registrado neste relatório.**
