# 📋 Contratos da API EcoSabon — H3

> Documento leve de contratos request/response. Não é OpenAPI completo.

---

## Formato Padrão de Sucesso

```json
{
  "success": true,
  "data": { ... }
}
```

## Formato Padrão de Erro (H3)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Erro de validação de dados",
    "requestId": "uuid-v4",
    "details": [
      { "field": "body.email", "message": "Formato de e-mail inválido." }
    ]
  }
}
```

### Códigos de Erro

| Código | HTTP | Descrição |
|--------|------|-----------|
| `VALIDATION_ERROR` | 400 | Payload/params inválidos |
| `AUTHENTICATION_REQUIRED` | 401 | Token ausente ou inválido |
| `FORBIDDEN` | 403 | Sem permissão / CORS |
| `NOT_FOUND` | 404 | Recurso não encontrado |
| `RATE_LIMITED` | 429 | Limite de requisições excedido |
| `INTERNAL_ERROR` | 500 | Erro inesperado |

---

## Rotas

### Auth

| Rota | Método | Auth | Body | Resposta |
|------|--------|------|------|----------|
| `/api/auth/teacher/register` | POST | ❌ | `{ name: string(2-100), email: email, password: string(6-128) }` | `201 { success, data: { id, name, email } }` |
| `/api/auth/teacher/login` | POST | ❌ | `{ email: email, password: string(1+) }` | `200 { success, data: { token, user } }` |
| `/api/auth/squad/login` | POST | ❌ | `{ squadId: ObjectId }` | `200 { success, data: { token, squad } }` |

### Classrooms

| Rota | Método | Auth | Params | Resposta |
|------|--------|------|--------|----------|
| `/api/classrooms` | GET | ✅ | — | `200 { success, data: Classroom[] }` |
| `/api/classrooms/:id` | GET | ✅ | `id: ObjectId` | `200 { success, data: Classroom }` |

### Squads

| Rota | Método | Auth | Params / Body | Resposta |
|------|--------|------|---------------|----------|
| `/api/classrooms/:classroomId/squads` | GET | ✅ | `classroomId: ObjectId` | `200 { success, data: Squad[] }` |
| `/api/classrooms/:classroomId/squads` | POST | ❌ | `classroomId: ObjectId`, body: `{ nome: string(3-50), members: string[](1-5) }` | `201 { success, data: { squad, token } }` |
| `/api/classrooms/:classroomId/squads/:squadId` | PUT | ✅ | `classroomId+squadId: ObjectId`, body: `{ nome, members }` | `200 { success, data: Squad }` |
| `/api/classrooms/:classroomId/squads/:squadId` | DELETE | ✅ TEACHER | `classroomId+squadId: ObjectId` | `200 { success }` |
| `/api/squads/standalone/:id` | GET | ✅ | `id: ObjectId` | `200 { success, data: Squad }` |

### Missions

| Rota | Método | Auth | Params / Body | Resposta |
|------|--------|------|---------------|----------|
| `/api/squads/:squadId/missions` | GET | ✅ | `squadId: ObjectId` | `200 { success, data: Mission[] }` |
| `/api/squads/:squadId/missions/submit` | POST | ✅ | `squadId: ObjectId`, body: `{ missionId: 1-9, scientificMethod?, numericInputs? }`, file: `evidencePhoto (jpeg/png/webp, max 5MB)` | `200 { success, data: Mission }` |

### Reports

| Rota | Método | Auth | Params | Resposta |
|------|--------|------|--------|----------|
| `/api/report/squads/:squadId` | GET | ✅ | `squadId: ObjectId` | `200 { success, data: Dossier }` |

### Health

| Rota | Método | Auth | Resposta |
|------|--------|------|----------|
| `/` | GET | ❌ | `200 { message }` |
| `/ping` | GET | ❌ | `200 { status: 'ok' }` |

---

## Headers

| Header | Direção | Descrição |
|--------|---------|-----------|
| `Authorization: Bearer <token>` | Request | JWT para rotas protegidas |
| `X-Request-Id` | Response | UUID v4 para rastreio |
| `RateLimit-*` | Response | RFC 6585 rate limit info |
