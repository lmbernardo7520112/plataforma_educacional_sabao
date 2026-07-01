# R188 — Especificação: Teacher-Controlled Writable Squads — Piloto EcoSabon

## 1. Domínio

A Plataforma EcoSabon opera em modo piloto restrito. A especificação define uma arquitetura onde:

- Visitantes públicos são **read-only** (sem escrita no banco)
- Professores allowlisted (Leonardo/Nadja) **controlam criação e gestão de bancadas**
- Participantes de bancadas autorizadas **podem usar a trilha integralmente com persistência**
- O banco Atlas é **protegido contra abuso e crescimento descontrolado**

---

## 2. Regras de Negócio

### RN1 — Visitante Público Read-Only
- Visitante pode acessar: Landing, Onboarding (ver turmas/bancadas), Cartilha, Curso Interativo
- Visitante **NÃO** pode: criar bancadas, editar bancadas, submeter missões, fazer upload, fazer login de squad
- Qualquer tentativa de escrita retorna `423 Locked` com mensagem demonstrativa

### RN2 — Professor Operator
- Professor acessa via login com e-mail na allowlist (`PILOT_ALLOWED_TEACHER_EMAILS`)
- Professor pode: criar bancadas, editar bancadas, deletar bancadas, ver relatórios, ver progresso de squads
- Professor recebe código de acesso gerado para cada bancada criada
- Professor pode regenerar código de acesso de qualquer bancada que criou

### RN3 — Participante de Bancada
- Participante acessa via código de acesso fornecido pelo professor
- Backend valida código → emite JWT SQUAD com escopo da bancada
- Participante pode: ver trilha, submeter missões, salvar progresso, ver relatório da própria bancada
- Participante **NÃO** pode: criar/editar/deletar bancadas, acessar outras bancadas, uploads de fotos (piloto)

### RN4 — Upload no Piloto
- Upload de fotos (`evidencePhoto`) é **opcional** no piloto
- Missões podem ser submetidas sem foto quando `PILOT_MODE=true`
- `multer` não processa arquivos quando upload desabilitado
- Habilitação futura de upload será tratada em fase separada

### RN5 — Proteção do Banco
- Nenhuma escrita anônima no banco
- Criação de bancada limitada a professores allowlisted
- Progresso limitado a squads autenticados com ownership
- Rate limiting em todos os endpoints

---

## 3. Feature Flags (GATE 8)

### 3.1 Versão Minimalista Recomendada

| Flag | Valor | Efeito |
|---|---|---|
| `PILOT_MODE` | `true` | Ativa modo piloto com allowlist e restrições |
| `PILOT_PUBLIC_READONLY` | `true` | Bloqueia escritas de visitantes anônimos |
| `PILOT_ALLOW_SQUAD_LOGIN` | `true` | Permite login de bancada (via código de acesso) |
| `PILOT_ALLOW_UPLOADS` | `false` | Bloqueia uploads de evidência fotográfica |

### 3.2 Regras Derivadas (não são flags, são comportamentos automáticos)

- Se `PILOT_MODE=true` e `PILOT_PUBLIC_READONLY=true`:
  - Middleware global bloqueia POST/PUT/DELETE sem JWT válido
  - Exceção: `POST /api/auth/teacher/login` (leitura autenticada)
  - Exceção: `POST /api/auth/squad/login` se `PILOT_ALLOW_SQUAD_LOGIN=true`
- Se JWT TEACHER válido + email na allowlist:
  - Operações de criação/edição/deleção de bancadas permitidas
- Se JWT SQUAD válido + ownership:
  - Submissão de missões permitida (sem upload se `PILOT_ALLOW_UPLOADS=false`)
- Se `PILOT_ALLOW_UPLOADS=false`:
  - `multer` é bypassed, `evidencePhoto` é opcional no schema e service

---

## 4. Operações por Papel

```
┌──────────────────────────────────────────────────────────────────────┐
│              PUBLIC_READONLY + TEACHER_CONTROLLED_WRITES             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  VISITANTE ANÔNIMO                                                   │
│  ├── GET /api/onboarding/classrooms              ✅ READ             │
│  ├── GET /api/onboarding/classrooms/:id          ✅ READ             │
│  ├── GET /api/onboarding/classrooms/:id/squads   ✅ READ (memberCnt)│
│  ├── POST /api/classrooms/:id/squads             ❌ 423 LOCKED      │
│  ├── POST /api/auth/squad/login                  ❌ 423 (sem código)│
│  └── POST /api/squads/:id/missions/submit        ❌ 401 (sem JWT)   │
│                                                                      │
│  PROFESSOR LEONARDO / NADJA (JWT TEACHER)                            │
│  ├── POST /api/auth/teacher/login                ✅ LOGIN            │
│  ├── GET  /api/classrooms                        ✅ READ             │
│  ├── GET  /api/classrooms/:id                    ✅ READ             │
│  ├── GET  /api/classrooms/:id/squads             ✅ READ (full)      │
│  ├── POST /api/classrooms/:id/squads             ✅ CREATE + código  │
│  ├── PUT  /api/classrooms/:id/squads/:id         ✅ UPDATE           │
│  ├── DELETE /api/classrooms/:id/squads/:id       ✅ DELETE           │
│  └── GET  /api/report/squads/:id                 ✅ READ             │
│                                                                      │
│  PARTICIPANTE DE BANCADA (JWT SQUAD via código)                      │
│  ├── POST /api/auth/squad/login (com código)     ✅ LOGIN            │
│  ├── GET  /api/squads/:id/missions               ✅ READ (própria)   │
│  ├── POST /api/squads/:id/missions/submit        ✅ WRITE (própria)  │
│  │         (sem upload no piloto)                                    │
│  ├── GET  /api/report/squads/:id                 ✅ READ (própria)   │
│  ├── POST /api/classrooms/:id/squads             ❌ 403 FORBIDDEN   │
│  ├── PUT  /api/classrooms/:id/squads/:id         ❌ 403 FORBIDDEN   │
│  └── DELETE /api/classrooms/:id/squads/:id       ❌ 403 FORBIDDEN   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. Acesso de Participante — Código de Acesso

### 5.1 Fluxo

1. Professor cria bancada na Área do Professor
2. Sistema gera código alfanumérico de 6 caracteres (ex: `ALFA3A`, `XYZ789`)
3. Professor vê o código na tela da Área do Professor
4. Professor comunica o código aos alunos (verbalmente ou por QR futuro)
5. Aluno acessa `/onboarding` → seleciona turma → vê bancadas → clica "Entrar com Código"
6. Aluno digita código
7. Backend valida código → encontra bancada → emite JWT SQUAD
8. Aluno é redirecionado ao Dashboard com sessão ativa

### 5.2 Implementação do Código

```typescript
// Geração
import { nanoid } from 'nanoid';
const accessCode = nanoid(6).toUpperCase(); // Ex: "X7KM2Q"

// Armazenamento no Squad model
accessCode: { type: String, select: false } // Plaintext para piloto (hash para SaaS futuro)

// Validação no login
const squad = await Squad.findOne({ accessCode }).select('+accessCode');
if (!squad) throw new Error('Código inválido.');
```

### 5.3 Token JWT

```json
{
  "squadId": "6a425fbde735e55aec54361d",
  "classroomId": "6a425f571c77049cb0295766",
  "role": "SQUAD",
  "pilot": true,
  "exp": 1751439600
}
```

---

## 6. Responsividade Mobile (GATE 7)

### 6.1 Problema

`Navbar.tsx:32` — Botão "Área do Professor" usa `hidden md:block`, invisível em mobile.
`Navbar.tsx:23` — Links de navegação usam `hidden md:flex`, sem menu hamburger.

### 6.2 Solução: Menu Hamburger

Adicionar ao `Navbar.tsx`:
- Estado `menuOpen` com toggle
- Ícone hamburger (☰ / ✕) visível em `md:hidden`
- Menu dropdown/drawer com todos os links:
  - O Desafio, A Jornada, IoT vs Manual, Cartilha, Curso
  - **Área do Professor** (destaque)
  - **Área do Aluno** (destaque)
- Close on click-outside ou navigate
- Área de toque ≥ 44×44px

### 6.3 Critérios de Aceite Mobile

| ID | Critério |
|---|---|
| M1 | "Área do Professor" visível e clicável em viewport 375×667 |
| M2 | "Área do Aluno" visível e clicável em viewport 375×667 |
| M3 | Menu hamburger funcional com toggle |
| M4 | Links de navegação acessíveis via menu mobile |
| M5 | Menu fecha ao navegar |
| M6 | Área de toque ≥ 44×44px |

---

## 7. Critérios de Aceite Gerais

| ID | Critério | Tipo |
|---|---|---|
| A1 | `POST /api/classrooms/:id/squads` requer `requireAuth+requireRole(TEACHER)` | Backend |
| A2 | `POST /api/classrooms/:id/squads` retorna 401/403 sem JWT válido | Backend |
| A3 | Professor cria bancada → código de acesso gerado | Backend |
| A4 | Participante entra com código → JWT SQUAD emitido | Backend |
| A5 | Participante submete missão sem foto (piloto) → aceito | Backend |
| A6 | Participante submete missão com foto (piloto) → rejeitado se `PILOT_ALLOW_UPLOADS=false` | Backend |
| A7 | Visitante tenta POST qualquer rota mutante → 423 Locked | Backend |
| A8 | GET onboarding continua funcional com DTOs mínimos | Backend |
| A9 | Hamburger menu funcional em mobile | Frontend |
| A10 | "Área do Professor" acessível em mobile | Frontend |
| A11 | Código de acesso visível na Área do Professor | Frontend |
| A12 | Campo "Entrar com Código" no onboarding | Frontend |
| A13 | Badge "Modo Piloto" visível para visitantes sem auth | Frontend |
| A14 | 252+ testes verdes | CI/CD |
| A15 | Build Vite sem erros | CI/CD |
| A16 | Nenhum segredo versionado | Segurança |
| A17 | Nenhum e-mail real exposto | LGPD |

---

## 8. Decisão

`DECISÃO: A ESPECIFICAÇÃO DE TEACHER-CONTROLLED WRITABLE SQUADS ESTÁ COMPLETA. VISITANTES SÃO READ-ONLY. PROFESSORES ALLOWLISTED CRIAM E GERENCIAM BANCADAS COM CÓDIGO DE ACESSO. PARTICIPANTES AUTENTICADOS PODEM PERSISTIR PROGRESSO. UPLOADS BLOQUEADOS NO PILOTO. MOBILE CORRIGIDO COM HAMBURGER.`

---

_Especificação criada em 2026-07-01._
