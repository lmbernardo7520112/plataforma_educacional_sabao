# R204 — Hotfix: Permissão de Edição de Bancadas no Onboarding — EcoSabon

## 1. Identificação do Problema

Durante a validação humana assistida, o professor Leonardo relatou que ao acessar o sistema e identificar a bancada de homologação (`eee8ef` / `Bancada Homologacao Piloto`), não era possível realizar a edição ou acrescentar os alunos à bancada no fluxo de onboarding.

### Causa Raiz

No PR #62, para endurecer a governança das escritas contra intrusão no banco, a rota `PUT /api/classrooms/:classroomId/squads/:squadId` no arquivo `server/routes/squadRoutes.ts` foi restringida para exigir a role `TEACHER` (`requireRole(['TEACHER'])`).

No entanto, no fluxo clássico de onboarding da Plataforma EcoSabon, os alunos entram na bancada e definem os seus integrantes (alimentando o array `members`) clicando no botão **"✏️ Editar"** no onboarding. Essa ação faz um login provisório na bancada para obter um token com role `SQUAD`. Ao tentar salvar o formulário, o frontend envia a requisição `PUT` com esse token `SQUAD`. 

Como a rota `PUT` aceitava unicamente a role `TEACHER`, as chamadas legítimas de alunos no onboarding eram rejeitadas com **HTTP 403 Forbidden** no backend de produção.

## 2. Solução Aplicada

O endpoint `PUT /api/classrooms/:classroomId/squads/:squadId` foi atualizado em `server/routes/squadRoutes.ts` para permitir as patentes `TEACHER` e `SQUAD`, assegurando o fluxo do onboarding:

```typescript
router.put('/:squadId', requireAuth, requireRole(['TEACHER', 'SQUAD']), requireSquadOwnership, validate(updateSquadSchema), ...
```

### Garantia de Segurança e Isolamento

* **Alunos (`role: SQUAD`):** O middleware `requireSquadOwnership` garante que uma bancada autenticada de alunos consiga atualizar unicamente a sua **própria** bancada (`user.squadId === paramSquadId`), impedindo qualquer alteração ou intrusão em bancadas de terceiros.
* **Professores (`role: TEACHER`):** O middleware `requireSquadOwnership` é contornado automaticamente para professores (permitindo que editem qualquer bancada se necessário).

## 3. Impacto e Validação de Testes

* Os 98 testes unitários do backend foram executados localmente e todos passaram.
* A alteração foi integrada e enviada para o branch `main` para deploy imediato em produção no Render.

---

_Relatório de hotfix registrado em 2026-07-01._
