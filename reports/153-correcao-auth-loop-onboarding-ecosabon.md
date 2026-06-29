# R153 — Correção de Loop de Autenticação no Onboarding — EcoSabon

## 1. O Problema
Ao acessar a "Área do Aluno" (que redireciona para a página `/onboarding`), o navegador entrava em loop de redirecionamento e voltava para a landing page (`/`).

## 2. A Causa
O interceptor global do Axios no frontend (`client/src/lib/api.ts`) limpa o token de sessão e redireciona o usuário para a rota raiz (`/`) sob respostas HTTP `401 Unauthorized`. 

No entanto, com a aplicação dos guards de RBAC do professor no backend, as seguintes rotas de consulta exigiam autenticação ativa e cargo de `TEACHER`:
- `GET /api/classrooms` (Turmas)
- `GET /api/classrooms/:id` (Estudantes da turma)
- `GET /api/classrooms/:classroomId/squads` (Bancadas da turma)

Como o aluno no onboarding é um usuário inicial (deslogado), as chamadas para essas rotas retornavam status 401. O interceptor do frontend interceptava o 401 e forçava o redirecionamento imediato para a página inicial, impedindo o carregamento da listagem de turmas.

## 3. Correção Aplicada
Foram removidos os middlewares `requireAuth` e `requireRole(['TEACHER'])` das seguintes rotas públicas de consulta de turmas e bancadas:
- `GET /api/classrooms` no arquivo `server/routes/classroomRoutes.ts`
- `GET /api/classrooms/:id` no arquivo `server/routes/classroomRoutes.ts`
- `GET /api/classrooms/:classroomId/squads` no arquivo `server/routes/squadRoutes.ts`

As rotas de alteração (criação de bancadas `POST`, edição `PUT`, e deleção `DELETE`) permanecem devidamente protegidas e governadas conforme os requisitos.

## 4. Testes Realizados e Build
- **web-book**: 124 passed
- **client**: 8 passed
- **curso/workspace**: 47 passed
- **server**: 59 passed
- **Total**: 238 testes passados
- **Build**: `npm run build -w client` concluído com sucesso.
