# R151 — Decisão: Fix de Roteamento SPA na Vercel — EcoSabon

## 1. Decisão Técnica

DECISÃO: ROTEAMENTO SPA DA PLATAFORMA ECOSABON NA VERCEL CORRIGIDO. ROTAS CLIENT-SIDE SERVEM INDEX.HTML, /API PERMANECE APONTANDO PARA O BACKEND RENDER, WEB-BOOK INTOCADO E NENHUM SEGREDO VERSIONADO.

## 2. Elementos Consolidados

- **Vercel Fallback**: Inserido `{ "source": "/((?!api/).*)", "destination": "/index.html" }` em `vercel.json` (raiz) e `client/vercel.json` para eliminar o erro 404 em recargas e redirecionamentos diretos na Vercel.
- **Navbar do Aluno**: Mantida apontando para `/dashboard` com comportamento de controle herdado pela `ProtectedRoute` client-side de forma ideal.
- **Rigor de Governança**:
  - Web-book e GitHub Pages inalterados.
  - Banco Atlas intocado (sem seed/migrações).
  - Backend Render intocado.
  - Sem novos e-mails reais no git.
  - Chaves de segurança protegidas.

## 3. Risco Mapeado
Pendência de segurança anotada para ação futura:
`SEC-ROTATE-ATLAS-CREDENTIALS — rotacionar senha/usuário Atlas e atualizar DATABASE_URL no Render sem versionar segredos.`
