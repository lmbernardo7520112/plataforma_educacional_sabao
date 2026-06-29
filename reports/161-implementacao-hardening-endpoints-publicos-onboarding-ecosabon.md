# R161 — Implementação de Hardening dos Endpoints Públicos de Onboarding — EcoSabon

## 1. Decisão Arquitetural
Adotamos a **OPÇÃO A** (Criar endpoints públicos específicos de onboarding e restaurar a autenticação total nas rotas originais). 
Isso separa as responsabilidades de negócio de forma limpa e permite que o professor tenha privilégios administrativos nas rotas protegidas originais enquanto os alunos usam novos endpoints higienizados de onboarding.

## 2. Endpoints Criados/Alterados

### Públicos (Onboarding):
Criado o arquivo de rotas [onboardingRoutes.ts](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/server/routes/onboardingRoutes.ts), montado em `/api/onboarding`:
- **`GET /api/onboarding/classrooms`**: Retorna turmas ativas no piloto como `PublicClassroomDTO`.
- **`GET /api/onboarding/classrooms/:id`**: Retorna os detalhes mínimos da turma e estudantes originais da chamada em formato DTO.
- **`GET /api/onboarding/classrooms/:classroomId/squads`**: Retorna as bancadas e seus integrantes como `PublicSquadDTO`.

### Restaurados (Administrativos/Professores):
As rotas originais no backend voltaram a exigir autenticação rígida:
- **`GET /api/classrooms`** -> Protegido com `requireAuth, requireRole(['TEACHER'])`
- **`GET /api/classrooms/:id`** -> Protegido com `requireAuth, requireRole(['TEACHER'])`
- **`GET /api/classrooms/:classroomId/squads`** -> Protegido com `requireAuth, requireRole(['TEACHER'])`

## 3. Estrutura dos DTOs Públicos

Os DTOs foram modelados para retornar apenas os campos necessários, eliminando segredos, timestamps ou relações desnecessárias.

### Campos Permitidos:
- **Turmas**: `_id` (string), `nome` (string) e `ano` (number).
- **Estudantes**: `numero` (string) e `nome` (string).
- **Bancadas**: `_id` (string), `nome` (string), `classroomId` (string) e `members` (string[]).

### Campos Proibidos e Ausentes:
- `createdAt`, `updatedAt`, `__v` e outros metadados do MongoDB/Mongoose.
- Journey states, andamento ou missões de bancadas de outros alunos.
- `teacher`, `teacherId` ou dados confidenciais do docente.

## 4. Filtragem do Escopo Piloto
No ambiente do piloto (`PILOT_MODE=true`), a listagem de turmas no onboarding público retorna exclusivamente as turmas participantes do piloto restrito (ex: `3ºANO A` e `3ºANO B`).

## 5. Rate Limiting de Onboarding
Aplicado o `onboardingLimiter` exclusivo para o roteador público `/api/onboarding` limitando o máximo de 50 requisições por IP a cada 15 minutos, impedindo tentativas de scraping sem interromper o onboarding de estudantes.

## 6. Testes Automatizados
Criado o arquivo de testes de integração [onboardingRoutes.test.ts](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/server/routes/onboardingRoutes.test.ts) que valida:
- A correta filtragem de turmas no piloto.
- A ausência de metadados internos de Mongoose (`__v`, timestamps) e de jornada nas respostas públicas.
- O bloqueio de turmas fora do escopo do piloto (retornando 403).

Todas as suítes de testes estão verdes.
- **web-book**: 124 passed
- **client**: 8 passed
- **curso/workspace**: 47 passed
- **server**: 63 passed (4 novos testes de hardening)
- **Total**: 242 testes passados.
