# R152 — Relatório de Merge e Deploy do Fix de Roteamento SPA na Vercel — EcoSabon

## 1. Pull Request e Merge
- **Pull Request**: [#53](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/pull/53)
- **Título**: `fix(vercel): add SPA fallback routing to root vercel.json for monorepo deploy`
- **Hash do Merge**: `3cb1d2e`
- **Status do Pipeline CI/CD**: ✅ 7/7 checks bem-sucedidos (GitGuardian, Gitleaks, EcoSabon Pipeline, Vercel Build)

## 2. URL de Produção Vercel
```
https://ecosabon-platform.vercel.app
```

## 3. Resultados da Homologação (Headers HTTP)

### Rota `/` (Raiz)
- **Código de Status**: `HTTP/2 200`
- **Retorno**: HTML da Landing Page
- **Cache**: `x-vercel-cache: HIT`

### Rota `/onboarding` (Client-side)
- **Código de Status**: `HTTP/2 200`
- **Retorno**: SPA `index.html` (Fallback SPA bem-sucedido, sem erro 404)
- **Cache**: `x-vercel-cache: HIT`

### Rota `/dashboard` (Client-side Protegido)
- **Código de Status**: `HTTP/2 200`
- **Retorno**: SPA `index.html` (Fallback SPA bem-sucedido)
- **Ação subsequente**: Interceptada pelo React Router que redireciona à `/onboarding` de forma transparente.

### Rota `/api/ping` (API Proxy)
- **Código de Status**: `HTTP/2 404`
- **Origem**: `x-render-origin-server: Render`
- **Retorno**: `{"success":false,"message":"Endpoint not found. Please verify your API route."}`
- **Significado**: O proxy de API `/api/*` continua corretamente encaminhado para o backend Render.

## 4. Comportamento do Botão "Área do Aluno"
Ao clicar no botão "Área do Aluno" no header da landing page, o aplicativo navega via client-side sem recarregar a página. Caso não haja sessão ativa (bancada logada no Zustand store), a `ProtectedRoute` redireciona instantaneamente para `/onboarding`. Se o usuário recarregar a página nessa URL, a Vercel serve o HTML correto sem erros.

## 5. Governança e Segurança
- O web-book nas GitHub Pages permanece intocado.
- O banco MongoDB Atlas e o backend no Render foram preservados.
- Nenhum segredo real foi versionado ou exposto nos relatórios e nos commits.

## 6. Decisão
DECISÃO: FIX DE ROTEAMENTO SPA MERGEADO E HOMOLOGADO NA VERCEL. ROTAS CLIENT-SIDE FUNCIONAM SEM 404, /API/PING CONTINUA INTEGRADO AO BACKEND RENDER, E A PLATAFORMA ECOSABON PERMANECE ONLINE EM MODO PILOTO RESTRITO.
