# R189 — Plano de Implementação: Teacher-Controlled Writable Squads — Piloto EcoSabon

## 1. Objetivo

Plano técnico para implementar `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS`, cobrindo backend, frontend, banco, testes, migração, deploy e rollback.

---

## 2. Backend — Modificações

### 2.1 Novo Middleware: `server/middleware/pilotReadonly.ts`

```typescript
export const blockAnonymousMutationsInPilot = (req, res, next) => {
  if (!isPilotModeEnabled() || !isPilotPublicReadonly()) return next();
  
  const isGet = req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS';
  if (isGet) return next();
  
  // Whitelist de rotas POST que são leitura (login)
  const loginWhitelist = ['/api/auth/teacher/login'];
  if (loginWhitelist.includes(req.path)) return next();
  
  // Squad login permitido se flag habilitada
  if (req.path === '/api/auth/squad/login' && process.env.PILOT_ALLOW_SQUAD_LOGIN === 'true') return next();
  
  // Se tem JWT válido, permite (professor ou squad autenticado)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      jwt.verify(authHeader.split(' ')[1], getJWTSecret());
      return next(); // Token válido — rotas subsequentes farão verificação de role/ownership
    } catch { /* token inválido, cai no bloqueio */ }
  }
  
  return res.status(423).json({
    success: false,
    message: 'Este piloto opera em modo controlado. Acesso de escrita requer autorização.',
    code: 'PILOT_READONLY'
  });
};
```

**Montagem em `server/server.ts`:**
```typescript
app.use(blockAnonymousMutationsInPilot);
app.use('/', basicRoutes);
```

### 2.2 Corrigir `squadRoutes.ts` — Adicionar auth no POST

**Arquivo:** `server/routes/squadRoutes.ts:28`

```diff
- router.post('/', validate(createSquadSchema), async (req, res) => {
+ router.post('/', requireAuth, requireRole(['TEACHER']), validate(createSquadSchema), async (req, res) => {
```

**Impacto:** Visitantes não criam bancadas. Professores autenticados criam.

### 2.3 Corrigir `squadRoutes.ts` — Restringir PUT a TEACHER

**Arquivo:** `server/routes/squadRoutes.ts:46`

```diff
- router.put('/:squadId', requireAuth, requireSquadOwnership, validate(updateSquadSchema), async (req, res) => {
+ router.put('/:squadId', requireAuth, requireRole(['TEACHER']), validate(updateSquadSchema), async (req, res) => {
```

### 2.4 Modificar `server/config/pilot.ts` — Novas funções

```typescript
export function isPilotPublicReadonly(): boolean {
  return isPilotModeEnabled() && process.env.PILOT_PUBLIC_READONLY !== 'false';
}

export function isPilotUploadsAllowed(): boolean {
  return process.env.PILOT_ALLOW_UPLOADS === 'true';
}
```

### 2.5 Modificar Squad Model — Adicionar `accessCode` e `createdByTeacherId`

**Arquivo:** `server/models/Squad.ts`

```typescript
// Novos campos
accessCode: {
  type: String,
  select: false, // Nunca retornado por padrão em queries
  index: true,
},
createdByTeacherId: {
  type: Schema.Types.ObjectId,
  ref: 'Teacher',
  default: null,
},
```

**Compatibilidade:** Campos opcionais, não quebram dados existentes.

### 2.6 Modificar `squadService.ts` — Gerar código de acesso

```typescript
import { nanoid } from 'nanoid';

async createSquad(classroomId, nome, members, teacherId?: string) {
  const accessCode = nanoid(6).toUpperCase();
  const newSquad = await Squad.create({
    classroomId, nome, members, ativo: true,
    accessCode,
    createdByTeacherId: teacherId || null,
  });
  return { ...newSquad.toJSON(), accessCode }; // Retorna código apenas na criação
}
```

### 2.7 Modificar `authRoutes.ts` — Squad login por código

```typescript
router.post('/squad/login-by-code', validate(squadCodeLoginSchema), async (req, res) => {
  const { accessCode } = req.body;
  const squad = await Squad.findOne({ accessCode, ativo: true }).select('+accessCode');
  if (!squad) return res.status(401).json({ success: false, message: 'Código inválido.' });
  
  const token = jwt.sign(
    { squadId: squad._id, classroomId: squad.classroomId, role: 'SQUAD', pilot: true },
    getJWTSecret(),
    { expiresIn: '24h' }
  );
  
  res.json({ success: true, data: { token, squad: { _id: squad._id, nome: squad.nome } } });
});
```

### 2.8 Modificar `missionService.ts` — Upload opcional no piloto

```typescript
async evaluateAndCompleteMission(squadId, missionId, sciMethod, numericInputs, evidenceFileUrl?) {
  // ... validações existentes ...
  
  // Upload opcional no piloto
  if (!evidenceFileUrl && isPilotModeEnabled() && !isPilotUploadsAllowed()) {
    evidenceFileUrl = ''; // Aceitar submissão sem foto no piloto
  }
  
  // ... resto do código ...
}
```

### 2.9 Modificar `missionRoutes.ts` — Bypass multer no piloto

```typescript
import { isPilotUploadsAllowed } from '../config/pilot.ts';

// Middleware condicional de upload
const conditionalUpload = (req, res, next) => {
  if (!isPilotUploadsAllowed()) return next(); // Skip multer
  return upload.single('evidencePhoto')(req, res, next);
};

router.post('/submit', requireAuth, requireSquadOwnership, conditionalUpload, validate(SubmitMissionSchema), async (req, res) => {
```

### 2.10 Rate Limiting Adicional

```typescript
// Em server.ts ou routes/index.ts
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 15, message: { success: false, message: 'Limite de autenticação excedido.' } });
app.use('/api/auth', authLimiter);
```

---

## 3. Frontend — Modificações

### 3.1 `Navbar.tsx` — Menu Hamburger Mobile

Adicionar:
- Estado `menuOpen` com `useState`
- Botão hamburger (`☰` / `✕`) visível em `md:hidden`
- Menu overlay com links e "Área do Professor" + "Área do Aluno"
- Close on navigate (via `useLocation` ou click handler)

### 3.2 `Onboarding.tsx` — Campo "Entrar com Código"

Substituir o botão de login SSO direto por:
1. Card de bancada mostra apenas `nome` + `memberCount`
2. Botão "Entrar com Código" abre input de código
3. Participante digita código de 6 caracteres
4. Frontend chama `POST /api/auth/squad/login-by-code` com código
5. Recebe JWT e redireciona ao Dashboard

Remover:
- Botão "Editar" dos squad cards (movido para Área do Professor)
- Formulário de criação de bancada (movido para Área do Professor)

### 3.3 `TeacherArea.tsx` — Código de Acesso Visível

Modificar:
- Na criação de bancada, exibir código de acesso retornado
- Em cada squad card, mostrar botão "Ver Código" que revela o código
- Adicionar endpoint `GET /api/classrooms/:id/squads/:id/access-code` (protegido por TEACHER)

### 3.4 `MissionReactor.tsx` — Upload Opcional

Modificar:
- Se piloto com uploads bloqueados, pular Step 3 (Câmera de Evidências)
- Submeter diretamente após Step 2 (Metodologia)
- Ou mostrar Step 3 desabilitado com mensagem "Upload desabilitado no piloto"

### 3.5 Badge "Modo Piloto" — Opcional

Adicionar banner sutil na landing/onboarding:
```
🔒 Piloto Controlado — Acesse com código fornecido pelo professor
```

---

## 4. Banco — Migração

### 4.1 Schema Migration

Campos adicionados ao Squad: `accessCode`, `createdByTeacherId` — ambos **opcionais**, sem breaking change.

### 4.2 Dados Existentes (Seed)

Bancadas sintéticas do seed não possuem `accessCode` nem `createdByTeacherId`:
- **Opção A:** Gerar códigos retroativamente via script de migração leve
- **Opção B:** Exigir código apenas para bancadas criadas APÓS o hardening. Bancadas do seed continuam acessíveis via squad login por ID (se `PILOT_ALLOW_SQUAD_LOGIN=true`)
- **Recomendação:** Opção B para simplicidade. Código obrigatório apenas para novas bancadas.

---

## 5. Testes (TDD)

### 5.1 Backend

| ID | Teste | Arquivo |
|---|---|---|
| T1 | `blockAnonymousMutationsInPilot` bloqueia POST sem JWT | `middleware/pilotReadonly.test.ts` |
| T2 | `blockAnonymousMutationsInPilot` permite GET sem JWT | `middleware/pilotReadonly.test.ts` |
| T3 | `blockAnonymousMutationsInPilot` permite POST teacher/login sem JWT | `middleware/pilotReadonly.test.ts` |
| T4 | `blockAnonymousMutationsInPilot` permite POST com JWT válido | `middleware/pilotReadonly.test.ts` |
| T5 | `POST /api/classrooms/:id/squads` retorna 401 sem JWT | `routes/squadRoutes.test.ts` |
| T6 | `POST /api/classrooms/:id/squads` retorna 403 com JWT SQUAD | `routes/squadRoutes.test.ts` |
| T7 | `POST /api/classrooms/:id/squads` sucesso com JWT TEACHER | `routes/squadRoutes.test.ts` |
| T8 | Squad criada por TEACHER tem `accessCode` | `services/squadService.test.ts` |
| T9 | `POST /api/auth/squad/login-by-code` retorna JWT com código válido | `routes/authRoutes.test.ts` |
| T10 | `POST /api/auth/squad/login-by-code` retorna 401 com código inválido | `routes/authRoutes.test.ts` |
| T11 | Mission submit aceita sem foto quando `PILOT_ALLOW_UPLOADS=false` | `services/missionService.test.ts` |
| T12 | `isPilotPublicReadonly` retorna true quando flags corretas | `config/pilot.test.ts` |

### 5.2 Frontend (se vitest-react configurado)

| ID | Teste |
|---|---|
| TF1 | Navbar hamburger menu renderiza em viewport < 768px |
| TF2 | "Área do Professor" visível no menu mobile |
| TF3 | Campo "Entrar com Código" renderiza no onboarding |
| TF4 | MissionReactor pula upload quando piloto readonly |

---

## 6. Deploy — Plano de Rollout

### Fase 1: Branch de feature + testes locais
- Criar branch `feature/pilot-teacher-controlled-writes`
- Implementar mudanças
- Rodar 252+ testes + novos (~12)
- Build Vite

### Fase 2: PR com CI verde
- Abrir PR
- Review
- 7/7 checks verdes

### Fase 3: Merge e deploy
- Merge na main
- Render auto-deploy (backend)
- Vercel auto-deploy (frontend)

### Fase 4: Configuração no Render
```env
PILOT_MODE=true
PILOT_PUBLIC_READONLY=true
PILOT_ALLOW_SQUAD_LOGIN=true
PILOT_ALLOW_UPLOADS=false
```

### Fase 5: Validação online
- `curl POST /api/classrooms/.../squads` sem JWT → 423
- `curl POST /api/classrooms/.../squads` com JWT TEACHER → 201 + accessCode
- Login com código → JWT SQUAD
- Submit missão sem foto → 200
- Mobile: hamburger funcional

---

## 7. Rollback

| Cenário | Ação |
|---|---|
| Middleware bloqueia demais | Setar `PILOT_PUBLIC_READONLY=false` no Render |
| Squad login quebrado | Verificar `PILOT_ALLOW_SQUAD_LOGIN=true` |
| Código de acesso não gerado | Verificar `nanoid` no bundling do server |
| Frontend quebrado | Reverter commit + redeploy |
| Professor não consegue logar | Verificar allowlist e rota teacher/login no whitelist |

---

## 8. Complexidade Estimada

| Componente | Arquivos | Complexidade |
|---|---|---|
| Middleware `pilotReadonly.ts` | 1 novo + 1 test | BAIXA |
| `squadRoutes.ts` fix auth | 1 modificação (2 linhas) | MÍNIMA |
| `pilot.ts` novas funções | 1 modificação (~10 linhas) | BAIXA |
| `Squad.ts` model | 1 modificação (~8 linhas) | BAIXA |
| `squadService.ts` accessCode | 1 modificação (~5 linhas) | BAIXA |
| `authRoutes.ts` login-by-code | 1 modificação (~20 linhas) | MÉDIA |
| `missionRoutes.ts` conditional upload | 1 modificação (~10 linhas) | BAIXA |
| `missionService.ts` optional photo | 1 modificação (~3 linhas) | MÍNIMA |
| `server.ts` mount middleware | 1 modificação (~2 linhas) | MÍNIMA |
| `Navbar.tsx` hamburger | 1 modificação (~40 linhas) | MÉDIA |
| `Onboarding.tsx` código de acesso | 1 modificação (~30 linhas) | MÉDIA |
| `TeacherArea.tsx` ver código | 1 modificação (~15 linhas) | BAIXA |
| `MissionReactor.tsx` skip upload | 1 modificação (~10 linhas) | BAIXA |
| Testes novos | 2-3 arquivos (~12 testes) | MÉDIA |
| **TOTAL** | ~13-15 arquivos | **MÉDIA** |

---

## 9. Decisão

`DECISÃO: O PLANO DE IMPLEMENTAÇÃO ESTÁ COMPLETO. COMPLEXIDADE MÉDIA COM ~15 ARQUIVOS, ~12 TESTES NOVOS. MUDANÇAS SÃO CIRÚRGICAS E NÃO ALTERAM SCHEMA DE DADOS EXISTENTES.`

---

_Plano criado em 2026-07-01._
