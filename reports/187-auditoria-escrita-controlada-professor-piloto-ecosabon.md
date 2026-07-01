# R187 — Auditoria de Escrita Controlada por Professor no Piloto — Plataforma EcoSabon

## 1. Problema

A auditoria R182–R186 propôs `PILOT_READONLY_MODE` com bloqueio total de escritas. Porém, a premissa foi refinada:

- **Visitantes comuns**: devem permanecer read-only, sem escrita no banco.
- **Professores Leonardo e Nadja**: devem poder criar, editar e gerenciar bancadas reais do piloto.
- **Participantes/alunos de bancadas autorizadas**: devem poder usar a plataforma integralmente, com persistência controlada.

A pergunta central é: **é possível conciliar `PUBLIC_READONLY` com `TEACHER_CONTROLLED_WRITABLE_SQUADS`?**

---

## 2. Resposta: SIM, é possível

A arquitetura atual já possui os blocos necessários:

| Bloco | Existe? | Estado |
|---|---|---|
| JWT com role `TEACHER` e `SQUAD` | ✅ | Funcional |
| Allowlist de professores (`PILOT_ALLOWED_TEACHER_EMAILS`) | ✅ | Funcional |
| `checkTeacherPilotAccess` middleware | ✅ | Funcional |
| `checkSquadPilotAccess` middleware | ✅ | Funcional |
| `requireAuth` middleware | ✅ | Funcional |
| `requireRole(['TEACHER'])` | ✅ | Funcional |
| `requireSquadOwnership` | ✅ | Funcional |
| Squad model com `classroomId`, `members`, `ativo` | ✅ | Funcional |
| JourneyState model (progresso de missão) | ✅ | Funcional |
| Rate limiting global e onboarding | ✅ | Funcional |
| Multer para uploads | ✅ | Funcional mas sem proteção pilot |
| **Middleware global de bloqueio de escritas anônimas** | ❌ | **AUSENTE** |
| **Guard `requireAuth` no `POST /squads`** | ❌ | **AUSENTE** |
| **Campo `createdByTeacherId` no Squad** | ❌ | **AUSENTE** |
| **Código de acesso por bancada** | ❌ | **AUSENTE** |
| **Menu hamburger mobile** | ❌ | **AUSENTE** |

**Conclusão:** A diferença entre read-only total e teacher-controlled writable é apenas de **3–4 mudanças cirúrgicas**:

1. Adicionar `requireAuth + requireRole(['TEACHER'])` no POST de criação de squad (já existe no DELETE, falta no POST).
2. Adicionar middleware global `blockAnonymousMutationsInPilot` que bloqueia POST/PUT/DELETE sem JWT válido.
3. Manter squad login (`POST /auth/squad/login`) habilitado para bancadas existentes (que foram criadas por professor).
4. Manter mission submit (`POST /squads/:id/missions/submit`) habilitado para tokens JWT de squad válidos (requireAuth + requireSquadOwnership já existem).

---

## 3. Inventário de Identidades e Papéis (GATE 2)

### 3.1 Papéis Atuais

| Papel | Auth | Leitura | Escrita | Escopo |
|---|---|---|---|---|
| Visitante anônimo | Nenhuma | Onboarding público (GET) | ⚠️ **Pode criar squads (POST sem auth)** | Aberto |
| Professor (JWT TEACHER) | JWT + allowlist | Turmas, bancadas, relatórios | Criar/editar/deletar bancadas (com auth) | Allowlist |
| Squad (JWT SQUAD) | JWT SSO | Missões da própria bancada | Submeter missões + upload | Própria bancada |

### 3.2 Papéis Propostos

| Papel | Auth | Leitura | Escrita | Escopo | Riscos | Mitigações |
|---|---|---|---|---|---|---|
| `PUBLIC_VISITOR_READONLY` | Nenhuma | Onboarding público, landing, cartilha, curso | **NENHUMA** | Endpoints GET públicos | Scraping | Rate limit 50 req/15min |
| `PILOT_TEACHER_OPERATOR` | JWT TEACHER + allowlist | Todas as turmas/bancadas/relatórios | Criar/editar/deletar bancadas | Turmas do piloto | Conta comprometida | 2FA futuro, allowlist restrita, rate limit |
| `PILOT_SQUAD_PARTICIPANT` | JWT SQUAD (obtido via squad login) | Trilha, missões, progresso da própria bancada | Submeter missões, progresso | Apenas própria bancada | Token vazado, spam | `requireSquadOwnership`, rate limit, bloqueio de uploads |

---

## 4. Inventário de Rotas de Escrita (GATE 3)

| Endpoint | Método | Auth Atual | Papel Atual | Escreve? | Visitante? | Professor? | Participante? | Decisão |
|---|---|---|---|---|---|---|---|---|
| `POST /api/classrooms/:id/squads` | POST | **NENHUM** | Qualquer | ✅ `Squad.create()` | ⚠️ **SIM (BUG)** | ✅ | ❌ | **Adicionar `requireAuth+requireRole(TEACHER)`** |
| `PUT /api/classrooms/:id/squads/:id` | PUT | `requireAuth+requireSquadOwnership` | SQUAD/TEACHER | ✅ `Squad.findOneAndUpdate()` | ❌ | ✅ | ⚠️ Avaliar | Restringir a TEACHER only |
| `DELETE /api/classrooms/:id/squads/:id` | DELETE | `requireAuth+requireRole(TEACHER)` | TEACHER | ✅ Deleção cascata | ❌ | ✅ | ❌ | Manter (já protegido) |
| `POST /api/auth/teacher/register` | POST | `checkTeacherPilotAccess` | Allowlist | ✅ `Teacher.create()` | ❌ (allowlist) | ✅ | ❌ | Manter (já protegido) |
| `POST /api/auth/teacher/login` | POST | `checkTeacherPilotAccess` | Allowlist | ❌ (leitura) | ❌ (allowlist) | ✅ | ❌ | Manter |
| `POST /api/auth/squad/login` | POST | `checkSquadPilotAccess` | Condicional | ❌ (leitura) | Condicional | ✅ | ✅ | Manter com `PILOT_ALLOW_SQUAD_LOGIN=true` |
| `POST /api/squads/:id/missions/submit` | POST | `requireAuth+requireSquadOwnership` | SQUAD | ✅ `JourneyState.findOneAndUpdate(upsert)` + upload | ❌ | ❌ | ✅ | Manter (já protegido). Bloquear upload |
| `GET /api/squads/:id/missions` | GET | `requireAuth+requireSquadOwnership` | SQUAD/TEACHER | ❌ | ❌ | ✅ | ✅ | Manter |

---

## 5. Criação de Bancadas por Professores (GATE 4)

### 5.1 Estado Atual: BUG CRÍTICO

```typescript
// squadRoutes.ts:28 — SEM requireAuth, SEM requireRole
router.post('/', validate(createSquadSchema), async (req, res) => {
  const newSquad = await squadService.createSquad(classroomId, nome, members);
```

**Qualquer visitante pode criar bancadas.**

### 5.2 Estado Desejado

```typescript
// Apenas professores autorizados criam bancadas
router.post('/', requireAuth, requireRole(['TEACHER']), validate(createSquadSchema), async (req, res) => {
  // Professor autenticado e na allowlist (enforced por requireAuth + pilotAuth)
  const newSquad = await squadService.createSquad(classroomId, nome, members);
```

### 5.3 Campos Propostos no Model Squad

| Campo | Tipo | Default | Obrigatório | Propósito |
|---|---|---|---|---|
| `createdByTeacherId` | `ObjectId` ref `Teacher` | — | ✅ (em piloto) | Rastreabilidade: quem criou a bancada |
| `pilotWritable` | `Boolean` | `true` | ❌ | Flag explícita de bancada ativa para escrita no piloto |
| `accessCode` | `String` | — | ❌ | Código curto de acesso (hash armazenado, não plaintext) |

**Compatibilidade:** Bancadas existentes (sintéticas do seed) não possuem `createdByTeacherId`. O campo deve ser **opcional** ou preenchido com o teacherId do seed retroativamente.

### 5.4 Edição de Bancada: Restringir a TEACHER

Atualmente o PUT permite `requireSquadOwnership`, ou seja, o próprio squad pode editar a si mesmo. No piloto controlado:
- **Recomendação:** Manter `requireAuth + requireRole(['TEACHER'])` para edição.
- Participantes não devem editar membros da bancada.

---

## 6. Acesso de Participantes à Bancada (GATE 5)

### 6.1 Mecanismo Atual

O squad login atual é um **SSO direto** — basta ter o `_id` da bancada:

```typescript
// authService.ts:44
async authenticateSquad(squadId: string) {
  const squad = await Squad.findById(squadId);
  const token = jwt.sign(
    { squadId: squad._id, classroomId: squad.classroomId, role: 'SQUAD' },
    getJWTSecret(),
    { expiresIn: '24h' }
  );
  return { token, squad };
}
```

**Risco:** Se o visitante conhece o `_id` (visível no endpoint público de squads), pode fazer login diretamente.

### 6.2 Mecanismo Proposto: Código de Acesso por Bancada

**Opção A — Código de Acesso (RECOMENDADA para piloto)**

Fluxo:
1. Professor cria bancada → sistema gera código de 6 caracteres (ex: `ALFA3A`)
2. Professor compartilha código verbalmente ou por QR
3. Participante entra com código no frontend
4. Backend valida código + bancada
5. Emite JWT de squad com escopo limitado

Vantagens:
- Simples de implementar
- Simples de compartilhar (professor fala o código em sala)
- Não requer infraestrutura extra
- Código curto é memorável

Implementação:
```typescript
// Na criação da bancada pelo professor
const accessCode = generateShortCode(); // ex: nanoid(6) uppercase
const accessCodeHash = await bcrypt.hash(accessCode, 6); // hash leve para lookup
```

```typescript
// Login de squad com código
router.post('/squad/login', async (req, res) => {
  const { accessCode } = req.body;
  const squad = await Squad.findOne({ /* busca por hash ou code */ });
  if (!squad || !validateCode(accessCode, squad.accessCodeHash)) {
    return res.status(401).json({ message: 'Código inválido.' });
  }
  const token = jwt.sign({ squadId, classroomId, role: 'SQUAD', pilot: true }, secret, { expiresIn: '24h' });
});
```

**Opção B — Link assinado com capability token**

Mais sofisticado, mas complexidade desnecessária para piloto de 2 turmas.

**Opção C — Senha simples por bancada**

Equivalente funcional ao Código de Acesso mas semanticamente diferente. Aceitável.

### 6.3 Recomendação Final: Código de Acesso (Opção A)

- Código gerado automaticamente na criação pelo professor
- Professor pode regenerar código
- Código visível apenas na Área do Professor
- Participante entra com código no onboarding
- Backend valida e emite JWT de squad

### 6.4 Token JWT de Participante

Payload proposto:
```json
{
  "squadId": "...",
  "classroomId": "...",
  "role": "SQUAD",
  "pilot": true,
  "iat": 1234567890,
  "exp": 1234654290
}
```

NÃO deve conter:
- E-mails
- Nomes de estudantes
- Dados sensíveis
- Permissões administrativas

---

## 7. Funcionalidade Integral da Bancada (GATE 6)

### 7.1 Permitido para Participantes de Bancada Autorizada

| Funcionalidade | Endpoint | Auth | Escreve? |
|---|---|---|---|
| Visualizar trilha | `GET /squads/:id/missions` | JWT SQUAD | ❌ |
| Iniciar missão | Frontend (Zustand) | — | ❌ (estado local) |
| Responder etapas | Frontend (formulário) | — | ❌ (estado local) |
| Submeter missão + evidência | `POST /squads/:id/missions/submit` | JWT SQUAD + ownership | ✅ `JourneyState.findOneAndUpdate` |
| Visualizar feedback | Frontend (dados do GET) | — | ❌ |
| Gerar relatório próprio | `GET /report/squads/:id` | JWT TEACHER/SQUAD | ❌ |

### 7.2 Bloqueado para Participantes

| Operação | Motivo |
|---|---|
| Criar bancada | Exclusivo de professor |
| Editar membros | Exclusivo de professor |
| Excluir bancada | Exclusivo de professor |
| Listar todas bancadas com dados internos | Protegido por RBAC |
| Alterar turma | Inexistente no sistema |
| Acessar Área do Professor | Login protegido por allowlist |
| Acessar progresso de outras bancadas | `requireSquadOwnership` |

### 7.3 Uploads no Piloto

| Opção | Descrição | Recomendação |
|---|---|---|
| **A. Bloqueado** | Nenhum upload no piloto | ⚠️ Bloqueia "Câmera de Evidências" (Step 3 do MissionReactor) |
| **B. Simulado** | Frontend aceita foto mas não envia ao servidor | Falsa UX |
| **C. Persistente com limites** | Upload real, mas com: 1MB max, 3 uploads/squad, MIME check, rate limit | ✅ Funcional mas complexo |
| **D. Upload obrigatório desabilitado** | Missão pode ser submetida sem foto no piloto | ✅ **RECOMENDADO** — simplifica sem quebrar UX |

**Recomendação: Opção D** — Tornar `evidencePhoto` opcional no piloto. O participante preenche o método científico e submete sem foto. O backend aceita submissão sem arquivo em `PILOT_MODE=true`.

---

## 8. Conclusão

É **totalmente possível** implementar `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS` com mudanças cirúrgicas:

1. **Adicionar `requireAuth + requireRole(['TEACHER'])` no POST de criação de squad** — 1 linha
2. **Adicionar middleware global que bloqueia POST/PUT/DELETE sem JWT** — 1 arquivo novo
3. **Manter squad login habilitado** com `PILOT_ALLOW_SQUAD_LOGIN=true` — já funcional
4. **Manter mission submit** com auth existente (`requireAuth + requireSquadOwnership`) — já funcional
5. **Tornar upload opcional** em piloto — 1 mudança no missionService
6. **Hamburger mobile** — 1 mudança no Navbar.tsx

A complexidade total estimada é **LOW-MEDIUM** (5–8 arquivos modificados, 2–3 criados).

---

_Auditoria realizada em 2026-07-01. Base: código da main (hash 0ba95c4)._
