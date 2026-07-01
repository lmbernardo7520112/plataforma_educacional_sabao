# R183 — Especificação do PILOT_READONLY_MODE — Plataforma EcoSabon

## 1. Domínio

A Plataforma EcoSabon opera em **modo piloto restrito** para demonstração a professores autorizados e visitantes. O `PILOT_READONLY_MODE` transforma o piloto público em uma **experiência demonstrável, segura, responsiva e sem persistência indevida** no banco de dados.

---

## 2. Feature Flags do Piloto (GATE 5)

### 2.1 Flags Existentes

| Flag | Tipo | Localização | Valor Atual | Descrição |
|---|---|---|---|---|
| `PILOT_MODE` | Backend env | Render | `true` | Ativa modo piloto com allowlist de professores |
| `PILOT_ALLOWED_TEACHER_EMAILS` | Backend env | Render | `<emails>` | Lista de e-mails autorizados |
| `PILOT_ALLOW_SQUAD_LOGIN` | Backend env | Render | `true` | Permite squad login |
| `PILOT_PUBLIC_CLASSROOM_NAMES` | Backend env | Render | `3ºANO A,3ºANO B` | Turmas visíveis no onboarding |

### 2.2 Novas Flags Propostas

| Flag | Tipo | Default Seguro | Descrição |
|---|---|---|---|
| `PILOT_READONLY_MODE` | Backend env | `true` | **Principal.** Bloqueia TODAS as mutações públicas (POST/PUT/PATCH/DELETE em rotas não-admin) |
| `PILOT_ALLOW_TEACHER_WRITES` | Backend env | `false` | Se `true`, professores autorizados podem criar/editar/deletar bancadas mesmo em readonly. Se `false`, nem professores alteram dados durante demonstração |
| `PILOT_ALLOW_UPLOADS` | Backend env | `false` | Controle granular de uploads. Redundante se `PILOT_READONLY_MODE=true`, mas útil como safety net |
| `PILOT_DEMO_PROGRESS_STORAGE` | Backend env | `none` | Define se progresso visual pode existir: `none` (nenhum), `session` (sessionStorage), `memory` (Zustand volátil) |

### 2.3 Regras de Governança

1. **Nenhuma flag vai para o frontend como variável de build** — flags sensíveis ficam exclusivamente no backend
2. **O frontend pode consultar** um endpoint público (`GET /api/pilot/config`) que retorna apenas flags não-sensíveis:
   ```json
   { "readonlyMode": true, "demoProgressStorage": "none" }
   ```
3. **Defaults devem ser seguros** — se uma flag não estiver definida, o comportamento padrão é o mais restritivo
4. **Nenhuma flag é versionada** no `.env` do repositório

---

## 3. Política de Mutações em Modo Piloto (GATE 6)

### 3.1 Quando `PILOT_MODE=true` e `PILOT_READONLY_MODE=true`

#### Bloqueado publicamente (visitantes sem auth):

| Operação | Endpoint | Bloqueio |
|---|---|---|
| Criar bancada | `POST /api/classrooms/:id/squads` | ✅ 423 Locked |
| Editar bancada | `PUT /api/classrooms/:id/squads/:id` | ✅ 403 Forbidden |
| Excluir bancada | `DELETE /api/classrooms/:id/squads/:id` | ✅ 403 Forbidden |
| Submeter missão | `POST /api/squads/:id/missions/submit` | ✅ 423 Locked |
| Upload de foto | `POST /api/squads/:id/missions/submit` (multer) | ✅ 423 Locked |
| Registrar professor | `POST /api/auth/teacher/register` | ✅ 423 Locked |
| Login de squad | `POST /api/auth/squad/login` | ✅ 423 Locked (ou 403 se `PILOT_ALLOW_SQUAD_LOGIN=false`) |

#### Permitido publicamente (visitantes):

| Operação | Endpoint | Observação |
|---|---|---|
| Listar turmas | `GET /api/onboarding/classrooms` | DTO mínimo (id, nome, ano) |
| Ver turma | `GET /api/onboarding/classrooms/:id` | Avaliar supressão de `alunosOriginal` em readonly |
| Listar bancadas | `GET /api/onboarding/classrooms/:id/squads` | DTO com `memberCount`, sem `members` |
| Health check | `GET /`, `GET /ping` | Monitoramento |

#### Professores autorizados:

| Cenário | `PILOT_ALLOW_TEACHER_WRITES=false` (RECOMENDADO para demonstração estável) | `PILOT_ALLOW_TEACHER_WRITES=true` |
|---|---|---|
| Login | ✅ Permitido | ✅ Permitido |
| Leitura (turmas, bancadas, relatórios) | ✅ Permitido | ✅ Permitido |
| Criar bancada | ❌ Bloqueado | ✅ Permitido |
| Editar bancada | ❌ Bloqueado | ✅ Permitido |
| Deletar bancada | ❌ Bloqueado | ✅ Permitido |

### 3.2 Decisão Arquitetural — Opção A (RECOMENDADA)

> **Opção A: `PILOT_ALLOW_TEACHER_WRITES=false`**
>
> Justificativa: Durante demonstração pública, os dados sintéticos devem permanecer **estáveis e reproduzíveis**. Se o professor deletar uma bancada durante uma demonstração, o visitante não verá dados. Escrita docente deve ser habilitada apenas em **janela administrativa controlada** (desligando `PILOT_READONLY_MODE` temporariamente).

---

## 4. Operações Permitidas / Bloqueadas — Resumo por Papel

```
┌──────────────────────────────────────────────────────────────┐
│                    PILOT_READONLY_MODE=true                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  VISITANTE (sem auth)                                        │
│  ├── GET onboarding/classrooms         ✅ PERMITIDO          │
│  ├── GET onboarding/classrooms/:id     ✅ PERMITIDO          │
│  ├── GET onboarding/.../squads         ✅ PERMITIDO          │
│  ├── POST classrooms/:id/squads        ❌ 423 LOCKED         │
│  ├── POST auth/squad/login             ❌ 423 LOCKED         │
│  └── POST squads/:id/missions/submit   ❌ 423 LOCKED         │
│                                                              │
│  PROFESSOR AUTORIZADO (com JWT TEACHER)                      │
│  ├── POST auth/teacher/login           ✅ PERMITIDO          │
│  ├── GET classrooms                    ✅ PERMITIDO          │
│  ├── GET classrooms/:id               ✅ PERMITIDO          │
│  ├── GET classrooms/:id/squads         ✅ PERMITIDO          │
│  ├── GET report/squads/:id             ✅ PERMITIDO          │
│  ├── POST classrooms/:id/squads        ❌ 423 (ou ✅ se       │
│  │                                       TEACHER_WRITES=true)│
│  ├── PUT classrooms/:id/squads/:id     ❌ 423 (ou ✅)        │
│  └── DELETE classrooms/:id/squads/:id  ❌ 423 (ou ✅)        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 5. DTOs Públicos Mínimos

### 5.1 Classroom DTO (já implementado)
```json
{ "_id": "...", "nome": "3ºANO A", "ano": 2026 }
```

### 5.2 Squad DTO (já implementado com memberCount hardening)
```json
{ "_id": "...", "nome": "Bancada Alfa (3ºA)", "classroomId": "...", "memberCount": 5 }
```

### 5.3 Classroom Detail DTO (PROPOSTA: suprimir `alunosOriginal` em readonly)
```json
{ "_id": "...", "nome": "3ºANO A", "ano": 2026 }
```
_Em readonly, `alunosOriginal` não é retornado, pois não há fluxo de criação/edição de bancada._

---

## 6. UX do Modo Demonstração

### 6.1 Frontend — Elementos Visuais

1. **Badge "Modo Demonstração"** visível no topo de todas as telas:
   ```
   🔒 Modo Demonstração — Alterações não são salvas
   ```
2. **Botões de escrita ocultos/desabilitados:**
   - "Criar Nova Bancada" → Oculto
   - "Editar Bancada" → Oculto
   - "Iniciar Experimento" → Desabilitado com tooltip
   - Upload de foto → Desabilitado
3. **Feedback claro ao visitante:** Se tentar acessar via API diretamente, recebe:
   ```json
   { "success": false, "message": "Este piloto opera em modo demonstração. Alterações não são permitidas." }
   ```

### 6.2 Simulação Local de Progresso

| Opção | Comportamento | Implementação |
|---|---|---|
| `PILOT_DEMO_PROGRESS_STORAGE=none` (RECOMENDADO) | Visitante vê a trilha estática. Nenhum progresso visual | Mais simples, mais seguro |
| `PILOT_DEMO_PROGRESS_STORAGE=session` | Progresso visual persiste em sessionStorage (volátil por aba) | Permite "simular" sem gravar no DB |
| `PILOT_DEMO_PROGRESS_STORAGE=memory` | Progresso em Zustand volátil (perdido ao recarregar) | UX interessante mas complexo |

---

## 7. Mobile-First — Critérios de Aceite

| ID | Critério | Prioridade |
|---|---|---|
| M1 | Botão "Área do Professor" visível no menu mobile | **ALTA** |
| M2 | Menu hamburger funcional em telas < 768px | **ALTA** |
| M3 | Links "O Desafio", "A Jornada", "IoT vs Manual", "Cartilha", "Curso" acessíveis via menu mobile | MÉDIA |
| M4 | Área de toque ≥ 44x44px em todos os botões mobile | MÉDIA |
| M5 | Menu mobile fecha ao clicar fora ou em link | MÉDIA |
| M6 | Viewport meta tag presente | BAIXA (já existe via Vite default) |

---

## 8. Critérios de Aceite Gerais

| ID | Critério | Tipo |
|---|---|---|
| A1 | `POST /api/classrooms/:id/squads` retorna 423 quando `PILOT_READONLY_MODE=true` | Backend |
| A2 | `POST /api/squads/:id/missions/submit` retorna 423 quando `PILOT_READONLY_MODE=true` | Backend |
| A3 | `POST /api/auth/squad/login` retorna 423 quando `PILOT_READONLY_MODE=true` | Backend |
| A4 | `POST /api/auth/teacher/register` retorna 423 quando `PILOT_READONLY_MODE=true` | Backend |
| A5 | `POST /api/auth/teacher/login` permanece funcional (leitura) | Backend |
| A6 | `GET /api/onboarding/*` continua funcional com DTOs mínimos | Backend |
| A7 | Badge "Modo Demonstração" aparece no frontend | Frontend |
| A8 | Botões de criação/edição ocultos em modo readonly | Frontend |
| A9 | Upload de foto desabilitado | Frontend |
| A10 | Menu hamburger funcional em mobile | Frontend |
| A11 | "Área do Professor" acessível em mobile | Frontend |
| A12 | 242+ testes verdes | CI/CD |
| A13 | Build Vite sem erros | CI/CD |
| A14 | Nenhum segredo versionado | Segurança |
| A15 | Nenhum dado real exposto | LGPD |

---

## 9. Decisão

`DECISÃO: A ESPECIFICAÇÃO DO PILOT_READONLY_MODE ESTÁ COMPLETA. O MODO DEVE BLOQUEAR TODAS AS MUTAÇÕES PÚBLICAS, UPLOADS E PROGRESSO PERSISTENTE. PROFESSORES AUTORIZADOS PODEM ACESSAR LEITURA ADMINISTRATIVA, MAS ESCRITA DOCENTE DEVE SER DESABILITADA DURANTE DEMONSTRAÇÃO PÚBLICA (PILOT_ALLOW_TEACHER_WRITES=false). A RESPONSIVIDADE MOBILE DEVE GARANTIR ACESSO VISÍVEL À ÁREA DO PROFESSOR VIA MENU HAMBURGER.`

---

_Especificação criada em 2026-07-01._
