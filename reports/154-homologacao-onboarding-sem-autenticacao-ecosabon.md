# R154 — Homologação de Onboarding sem Autenticação — EcoSabon

## 1. Verificação do Fluxo e Segurança das Rotas

Após a liberação de consulta nas rotas públicas, validamos o comportamento de acesso:

### Rotas de Consulta (Públicas)
- `GET /api/classrooms` -> Retorna a lista de turmas ativas de forma aberta (200 OK).
- `GET /api/classrooms/:id` -> Retorna os dados dos alunos associados à turma para seleção no onboarding (200 OK).
- `GET /api/classrooms/:classroomId/squads` -> Retorna as bancadas criadas pelo professor associadas àquela turma (200 OK).

Essas consultas não exigem token, viabilizando o onboarding completo do aluno.

### Rotas de Escrita (Protegidas)
- `POST /api/classrooms/:classroomId/squads` -> Permite criação de bancadas pelo aluno e retorna o token de acesso (200 OK).
- `PUT /api/classrooms/:classroomId/squads/:squadId` -> Protegido por `requireAuth` e `requireSquadOwnership` (apenas a própria bancada pode se auto-editar).
- `DELETE /api/classrooms/:classroomId/squads/:squadId` -> Protegido por `requireAuth` e `requireRole(['TEACHER'])` (apenas professores podem apagar bancadas).
- `GET /api/squads/standalone/:id` -> Protegido por `requireSquadOwnership`.

## 2. Comportamento Esperado do Usuário Aluno
1. O aluno clica em "Área do Aluno" no header.
2. O frontend redireciona para `/dashboard`, que detecta ausência de token e delega para `/onboarding`.
3. A página de onboarding faz a chamada assíncrona `/api/classrooms` sem token e recebe a lista de turmas de forma bem-sucedida (status 200).
4. O aluno seleciona a turma, a tela atualiza com as bancadas existentes daquela turma (chamadas `/api/classrooms/:id` e `/api/classrooms/:id/squads` respondidas com status 200).
5. O aluno clica sobre sua bancada e o sistema faz o login na bancada sem redirecionamento para a landing page.
