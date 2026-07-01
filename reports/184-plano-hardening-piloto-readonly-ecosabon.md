# R184 — Plano de Hardening do Piloto Readonly — Plataforma EcoSabon

## 1. Objetivo

Plano técnico detalhado para implementar o `PILOT_READONLY_MODE` na Plataforma EcoSabon, cobrindo middleware backend, adaptações frontend, testes, CI/CD, rollout e rollback.

---

## 2. Proposta Técnica — Arquitetura de Proteção (GATE 7)

### 2.1 Camada 1 — Middleware Backend: `blockPilotReadonlyWrites`

**Arquivo:** `server/middleware/pilotReadonly.ts`

```typescript
// Middleware global que bloqueia métodos mutantes em PILOT_READONLY_MODE
export const blockPilotReadonlyWrites = (req, res, next) => {
  if (!isPilotReadonlyModeEnabled()) return next();
  
  const mutantMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (!mutantMethods.includes(req.method)) return next();
  
  // Whitelist: POST /api/auth/teacher/login (leitura autenticada, não grava)
  if (req.path === '/api/auth/teacher/login') return next();
  
  // Verificar se é professor autorizado com TEACHER_WRITES habilitado
  // (requer token JWT válido no header)
  if (isPilotTeacherWritesEnabled() && isAuthenticatedTeacher(req)) return next();
  
  return res.status(423).json({
    success: false,
    message: 'Este piloto opera em modo demonstração. Alterações não são permitidas.',
    code: 'PILOT_READONLY'
  });
};
```

**Montagem:** Em `server/server.ts`, após rate limit e antes das rotas:
```typescript
app.use(blockPilotReadonlyWrites);
app.use('/', basicRoutes);
```

### 2.2 Camada 2 — Guard Específico por Domínio (safety net)

Mesmo com o middleware global, adicionar guards específicos nos routes:

**`squadRoutes.ts` — Bloquear `POST /` público:**
```typescript
router.post('/', requirePilotWritable, validate(createSquadSchema), async (req, res) => { ... });
```

**`missionRoutes.ts` — Bloquear submit + upload:**
```typescript
router.post('/submit', requirePilotWritable, requireAuth, requireSquadOwnership, upload.single('...'), ...);
```

### 2.3 Camada 3 — Config Functions

**Arquivo:** `server/config/pilot.ts` (extensão)

```typescript
export function isPilotReadonlyModeEnabled(): boolean {
  return isPilotModeEnabled() && process.env.PILOT_READONLY_MODE !== 'false';
  // Default: readonly enabled quando pilot mode ativo
}

export function isPilotTeacherWritesEnabled(): boolean {
  return process.env.PILOT_ALLOW_TEACHER_WRITES === 'true';
}

export function isPilotUploadsAllowed(): boolean {
  return !isPilotReadonlyModeEnabled() || process.env.PILOT_ALLOW_UPLOADS === 'true';
}
```

### 2.4 Camada 4 — Endpoint de Configuração Pública

**Rota:** `GET /api/pilot/config`

```typescript
router.get('/pilot/config', (_req, res) => {
  res.json({
    readonlyMode: isPilotReadonlyModeEnabled(),
    demoProgressStorage: process.env.PILOT_DEMO_PROGRESS_STORAGE || 'none'
  });
});
```

### 2.5 Camada 5 — Frontend Adaptações

#### 2.5.1 Serviço de Config

**Arquivo:** `client/src/lib/pilotConfig.ts`

```typescript
let pilotConfig = { readonlyMode: false, demoProgressStorage: 'none' };

export async function fetchPilotConfig() {
  const { data } = await api.get('/pilot/config');
  pilotConfig = data;
}

export function isPilotReadonly() { return pilotConfig.readonlyMode; }
```

#### 2.5.2 Badge "Modo Demonstração"

**Componente:** `client/src/components/DemoBadge.tsx`

```tsx
export const DemoBadge = () => {
  if (!isPilotReadonly()) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-600/90 text-white text-center text-xs py-1 font-bold">
      🔒 Modo Demonstração — Alterações não são salvas
    </div>
  );
};
```

#### 2.5.3 Ocultação de Botões de Escrita

- **Onboarding.tsx:** Ocultar formulário de criação/edição de bancada quando readonly
- **Onboarding.tsx:** Ocultar botão "Editar" nos squad cards quando readonly
- **MissionReactor.tsx:** Desabilitar botão de submit + upload quando readonly
- **TeacherArea.tsx:** Ocultar formulário de criação de bancada e botão deletar quando readonly e `TEACHER_WRITES=false`

#### 2.5.4 Navbar Mobile (Hamburger Menu)

**Arquivo:** `client/src/components/Navbar.tsx`

Adicionar:
1. Estado `menuOpen` com toggle
2. Ícone hamburger (☰) visível em `md:hidden`
3. Menu dropdown com todos os links + "Área do Professor"
4. Click-outside ou close-on-navigate
5. Área de toque ≥ 44x44px

### 2.6 Camada 6 — Rate Limiting Adicional

```typescript
// Rate limit específico para auth (anti brute-force)
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
router.use('/api/auth', authLimiter);

// Rate limit para uploads (se algum dia habilitado)
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
```

### 2.7 Camada 7 — Supressão de `alunosOriginal` em Readonly

**Em `onboardingRoutes.ts` — `handleGetClassroomById`:**

```typescript
// Se readonly, não retornar alunosOriginal (não há criação de bancada)
if (isPilotReadonlyModeEnabled()) {
  return res.json({ success: true, data: { _id: ..., nome: ..., ano: ... } });
}
```

---

## 3. Plano de Testes (TDD)

### 3.1 Testes Unitários Backend

| ID | Teste | Arquivo |
|---|---|---|
| T1 | `blockPilotReadonlyWrites` bloqueia POST em readonly | `middleware/pilotReadonly.test.ts` |
| T2 | `blockPilotReadonlyWrites` permite GET em readonly | `middleware/pilotReadonly.test.ts` |
| T3 | `blockPilotReadonlyWrites` permite POST teacher/login em readonly | `middleware/pilotReadonly.test.ts` |
| T4 | `blockPilotReadonlyWrites` permite POST com teacher JWT + TEACHER_WRITES=true | `middleware/pilotReadonly.test.ts` |
| T5 | `isPilotReadonlyModeEnabled` retorna true quando PILOT_MODE=true e PILOT_READONLY_MODE não é 'false' | `config/pilot.test.ts` |
| T6 | `handleGetSquads` continua retornando `memberCount` em readonly | `routes/onboardingRoutes.test.ts` |
| T7 | `handleGetClassroomById` suprime `alunosOriginal` em readonly | `routes/onboardingRoutes.test.ts` |
| T8 | `POST /api/classrooms/:id/squads` retorna 423 em readonly | `routes/squadRoutes.test.ts` (ou integration) |
| T9 | `POST /api/squads/:id/missions/submit` retorna 423 em readonly | `routes/missionRoutes.test.ts` (ou integration) |
| T10 | `GET /api/pilot/config` retorna flags corretas | `routes/index.test.ts` |

### 3.2 Testes Frontend

| ID | Teste | Arquivo |
|---|---|---|
| TF1 | DemoBadge renderiza quando `readonlyMode=true` | `components/DemoBadge.test.tsx` |
| TF2 | Onboarding oculta formulário de criação em readonly | `pages/Onboarding.test.tsx` |
| TF3 | Navbar hamburger menu aparece em viewport < 768px | `components/Navbar.test.tsx` |
| TF4 | "Área do Professor" aparece no menu mobile | `components/Navbar.test.tsx` |

---

## 4. CI/CD

1. Todos os testes existentes (242+) devem continuar verdes
2. Novos testes (~10) devem ser adicionados
3. Build Vite deve compilar sem erros
4. PR review obrigatório antes do merge
5. Deploy automático via Render (backend) e Vercel (frontend)

---

## 5. Rollout — Plano de Ativação

### Fase 1: Implementar e testar localmente
- Criar middleware
- Adaptar frontend
- Rodar 252+ testes

### Fase 2: Deploy em staging (branch de feature)
- PR com CI/CD verde
- Review

### Fase 3: Merge e deploy
- Merge na `main`
- Render auto-deploy
- Vercel auto-deploy

### Fase 4: Ativação no Render
- Adicionar no dashboard Render:
  ```
  PILOT_READONLY_MODE=true
  PILOT_ALLOW_TEACHER_WRITES=false
  PILOT_ALLOW_UPLOADS=false
  PILOT_DEMO_PROGRESS_STORAGE=none
  ```
- Restart manual ou auto-deploy

### Fase 5: Validação online
- `curl POST /api/classrooms/.../squads` → 423
- `curl GET /api/onboarding/classrooms` → 200
- Browser: badge visível, botões ocultos
- Browser mobile: hamburger funcional

---

## 6. Rollback — Plano de Reversão

| Cenário | Ação |
|---|---|
| Middleware bloqueia demais (false positive) | Alterar `PILOT_READONLY_MODE=false` no Render e restart |
| Frontend com bug em readonly | Reverter commit na `main` e redeploy |
| Badge não aparece | Verificar endpoint `/api/pilot/config` retorna JSON correto |
| Hamburger não funciona | Fix CSS/JS e redeploy frontend |
| Professor não consegue logar | Verificar whitelist na rota POST teacher/login (não deve ser bloqueada) |

---

## 7. Impacto

| Componente | Impacto |
|---|---|
| Backend routes | Middleware global + guards específicos |
| Frontend Onboarding | Ocultação de formulário de criação/edição |
| Frontend Navbar | Menu hamburger mobile |
| Frontend MissionReactor | Desabilitar submit + upload |
| Frontend TeacherArea | Condicional por TEACHER_WRITES |
| Banco Atlas | **ZERO impacto** — nenhuma alteração no schema ou dados |
| Vercel | Auto-deploy do frontend |
| Render | Novas env vars + auto-deploy |
| Web-book | **Intocado** |
| GitHub Pages | **Intocado** |

---

## 8. Arquivos a Criar/Modificar

### Criar:
- `server/middleware/pilotReadonly.ts`
- `server/middleware/pilotReadonly.test.ts`
- `client/src/lib/pilotConfig.ts`
- `client/src/components/DemoBadge.tsx`

### Modificar:
- `server/config/pilot.ts` — adicionar `isPilotReadonlyModeEnabled()`, `isPilotTeacherWritesEnabled()`
- `server/config/pilot.test.ts` — novos testes
- `server/server.ts` — montar middleware global
- `server/routes/index.ts` — rota `/api/pilot/config`
- `server/routes/onboardingRoutes.ts` — suprimir `alunosOriginal` em readonly
- `server/routes/onboardingRoutes.test.ts` — novos testes
- `client/src/components/Navbar.tsx` — hamburger menu
- `client/src/pages/Onboarding.tsx` — ocultar criação/edição em readonly
- `client/src/pages/MissionReactor.tsx` — desabilitar submit em readonly
- `client/src/pages/TeacherArea.tsx` — condicional por TEACHER_WRITES
- `client/src/App.tsx` — DemoBadge global

### NÃO tocar:
- `.env`
- `seed.ts`
- `web-book/`
- `ebook-ecosabon-prototipo/`
- Modelos Mongoose (schema inalterado)
- Banco Atlas (dados preservados)

---

## 9. Decisão

`DECISÃO: O PLANO DE HARDENING DO PILOT_READONLY_MODE ESTÁ COMPLETO E APROVADO PARA EXECUÇÃO NA PRÓXIMA FASE SEC-PILOT-READONLY-MODE-IMPLEMENTATION.`

---

_Plano criado em 2026-07-01._
