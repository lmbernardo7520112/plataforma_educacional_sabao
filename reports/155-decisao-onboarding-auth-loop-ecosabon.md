# R155 — Decisão: Liberação de Rotas de Consulta para Onboarding — EcoSabon

## 1. Decisão Técnica

DECISÃO: LIBERADO O ACESSO PÚBLICO ÀS ROTAS DE CONSULTA DE TURMA E BANCADAS PARA ELIMINAR O LOOP DE REDIRECIONAMENTO NO ONBOARDING DO ALUNO. AS ROTAS DE ALTERAÇÃO E HISTÓRICO PERMANECEM ESTRITAMENTE PROTEGIDAS.

## 2. Elementos Consolidados
- Remoção do middleware `requireAuth` e `requireRole` das rotas `GET /api/classrooms`, `GET /api/classrooms/:id` e `GET /api/classrooms/:classroomId/squads`.
- Preservação da segurança nas rotas de alteração e exclusão.
- Auditoria de segredos e e-mails reais no git permanece limpa.
- O web-book nas GitHub Pages permanece inalterado.
- Backend no Render será atualizado para refletir a alteração.

## 3. Risco Mapeado
Registrado risco pendente:
`SEC-ROTATE-ATLAS-CREDENTIALS — rotacionar senha/usuário Atlas e atualizar DATABASE_URL no Render sem versionar segredos.`
