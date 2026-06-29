# R162 — Homologação de Hardening do Onboarding Público — EcoSabon

## 1. Validação Local
Realizada auditoria manual de payloads no servidor local após as alterações:

### Chamada à listagem de turmas (`GET /api/onboarding/classrooms`)
- **Status**: 200 OK.
- **Payload**:
  ```json
  {
    "success": true,
    "data": [
      { "_id": "id-classroom-a", "nome": "3ºANO A", "ano": 2026 },
      { "_id": "id-classroom-b", "nome": "3ºANO B", "ano": 2026 }
    ]
  }
  ```
  *Nenhum metadado interno ou informações confidenciais expostas.*

### Chamada à listagem de bancadas (`GET /api/onboarding/classrooms/:classroomId/squads`)
- **Status**: 200 OK.
- **Payload**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "id-squad",
        "nome": "Bancada Alfa (3ºA)",
        "classroomId": "id-classroom-a",
        "members": ["Estudante Alfa 1", "Estudante Alfa 2", "Estudante Alfa 3", "Estudante Alfa 4", "Estudante Alfa 5"]
      }
    ]
  }
  ```
  *Progresso da jornada (`journeyState`) e timestamps Mongoose confirmadamente ausentes.*

## 2. Testes de Integração
- Testes locais de rotas e build client executados e homologados:
  `npm test` -> 242/242 testes passados (CI OK).
  `npm run build -w client` -> Build do client Vite concluído sem erros.

## 3. Validação do Professor/Admin
O painel administrativo do professor continua exigindo privilégios RBAC com sucesso:
- `GET /api/classrooms` sem token -> Retorna `401 Unauthorized`.
- `GET /api/classrooms` com token de professor -> Retorna a lista completa de turmas.

## 4. Riscos Residuais Mapeados
Registrada pendência futura de segurança:
`SEC-ROTATE-ATLAS-CREDENTIALS — rotacionar senha/usuário Atlas e atualizar DATABASE_URL no Render sem versionar segredos.`
