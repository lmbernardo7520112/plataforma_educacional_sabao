# R149 — Correção de Roteamento SPA na Vercel — EcoSabon

## 1. O Problema
Ao tentar acessar rotas client-side gerenciadas pelo React Router (como `/onboarding` ou `/dashboard`) ou ao recarregar a página nestas URLs, a Vercel retornava um erro `404 Not Found`.

## 2. A Causa
O arquivo `client/vercel.json` original continha apenas a regra de proxy/rewrite para rotas `/api/*`. Sem uma regra de fallback SPA configurada na Vercel, o servidor tentava resolver as rotas client-side fisicamente no sistema de arquivos, resultando em 404.

## 3. Alteração no `client/vercel.json`
Foi adicionado o fallback de roteamento SPA na Vercel, garantindo que qualquer rota que não corresponda à API (`/api/*`) sirva o arquivo `/index.html`:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://ecosabon-api.onrender.com/api/:path*" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

## 4. Decisão sobre a Navbar
A Navbar **não foi alterada**.
A rota `/dashboard` redireciona de forma automática, limpa e instantânea para `/onboarding` no lado do cliente por meio da `ProtectedRoute` (quando o Zustand store não possui um `squadId` válido). Com o fallback do Vercel ativo, o navegador não gera erro 404 no Vercel mesmo sob carregamentos diretos ou redirecionamentos de URL. A navegação permanece fluida sem necessidade de intervenção na Navbar.

## 5. Testes Realizados e Build
Todos os testes passaram localmente e o build da SPA do client foi gerado sem erros.

- **web-book** (`ebook-ecosabon-prototipo`): 124 passed (124 testes)
- **client**: 8 passed (8 testes)
- **curso/workspace**: 47 passed (47 testes)
- **server**: 59 passed (59 testes)
- **Total**: 238 testes passados
- **Build**: `npm run build -w client` concluído com sucesso.

## 6. Governança e Segurança
- Nenhuma connection string ou e-mail de produção foi exposto ou versionado.
- Arquivos `.env` permanecem de fora do commit e ignorados de forma correta.
- O web-book nas GitHub Pages permanece intocado.
- O banco MongoDB Atlas e a API no Render não sofreram nenhuma alteração estrutural direta.

## 7. Risco Pendente
Registrado o risco e a necessidade futura da tarefa:
`SEC-ROTATE-ATLAS-CREDENTIALS — rotacionar senha/usuário Atlas e atualizar DATABASE_URL no Render sem versionar segredos.`
