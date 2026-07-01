# R182 — Auditoria de Riscos do Modo Piloto Público — Plataforma EcoSabon

## 1. Objetivo

Auditar rigorosamente todos os endpoints, telas, operações de escrita, uploads, responsividade mobile e vetores de abuso da Plataforma EcoSabon no modo piloto online, identificando riscos reais e propondo mitigações concretas.

---

## 2. Inventário Completo de Rotas e Telas (GATE 1)

### 2.1 Rotas Backend

| Endpoint | Público? | Auth? | Método | Escreve no DB? | Upload? | Risco | Ação Proposta |
|---|---|---|---|---|---|---|---|
| `GET /` | ✅ | ❌ | GET | ❌ | ❌ | NENHUM | Manter |
| `GET /ping` | ✅ | ❌ | GET | ❌ | ❌ | NENHUM | Manter |
| `GET /api/onboarding/classrooms` | ✅ | ❌ | GET | ❌ | ❌ | BAIXO | Manter (DTO mínimo) |
| `GET /api/onboarding/classrooms/:id` | ✅ | ❌ | GET | ❌ | ❌ | MÉDIO | Expõe nomes de alunos sintéticos via `alunosOriginal`. Avaliar supressão no readonly |
| `GET /api/onboarding/classrooms/:id/squads` | ✅ | ❌ | GET | ❌ | ❌ | BAIXO | DTO já retorna `memberCount` sem nomes |
| `POST /api/classrooms/:id/squads` | ⚠️ | ❌ | POST | ✅ `Squad.create()` | ❌ | **CRÍTICO** | Cria bancada no banco SEM auth! Bloquear em piloto readonly |
| `PUT /api/classrooms/:id/squads/:id` | ❌ | ✅ `requireAuth+requireSquadOwnership` | PUT | ✅ `Squad.findOneAndUpdate()` | ❌ | MÉDIO | Protegido por auth, mas escrita existe. Bloquear em piloto readonly |
| `DELETE /api/classrooms/:id/squads/:id` | ❌ | ✅ `requireAuth+requireRole(TEACHER)` | DELETE | ✅ `Squad.findOneAndDelete()+JourneyState.deleteMany()` | ❌ | BAIXO | Protegido por RBAC TEACHER |
| `GET /api/squads/standalone/:id` | ❌ | ✅ `requireAuth+requireSquadOwnership` | GET | ❌ | ❌ | BAIXO | Protegido |
| `GET /api/squads/:id/missions` | ❌ | ✅ `requireAuth+requireSquadOwnership` | GET | ❌ | ❌ | BAIXO | Protegido |
| `POST /api/squads/:id/missions/submit` | ❌ | ✅ `requireAuth+requireSquadOwnership` | POST | ✅ `JourneyState.findOneAndUpdate(upsert)` | ✅ multer | **ALTO** | Escreve progresso + upload de foto. Bloquear em piloto readonly |
| `GET /api/classrooms` | ❌ | ✅ `requireAuth+requireRole(TEACHER)` | GET | ❌ | ❌ | NENHUM | Protegido |
| `GET /api/classrooms/:id` | ❌ | ✅ `requireAuth+requireRole(TEACHER)` | GET | ❌ | ❌ | NENHUM | Protegido |
| `POST /api/auth/teacher/register` | ⚠️ | ❌ | POST | ✅ `Teacher.create()` | ❌ | MÉDIO | Protegido por `checkTeacherPilotAccess` (allowlist). Avaliar bloqueio adicional |
| `POST /api/auth/teacher/login` | ⚠️ | ❌ | POST | ❌ (leitura) | ❌ | BAIXO | Protegido por `checkTeacherPilotAccess` (allowlist) |
| `POST /api/auth/squad/login` | ⚠️ | ❌ | POST | ❌ (leitura) | ❌ | MÉDIO | Protegido por `checkSquadPilotAccess`. Se `PILOT_ALLOW_SQUAD_LOGIN=true` no Render, libera token JWT |
| `GET /api/report/squads/:id` | ❌ | ✅ `requireAuth+requireRole(TEACHER)` | GET | ❌ | ❌ | BAIXO | Protegido |
| `GET /uploads/*` | ✅ | ❌ | GET | ❌ | ❌ | BAIXO | Serve arquivos estáticos. Em Render efêmero, perdidos a cada deploy |

### 2.2 Telas Frontend

| Tela | Rota Frontend | Pública? | Permite Escrita? | Risco |
|---|---|---|---|---|
| LandingPage | `/` | ✅ | ❌ | NENHUM |
| Cartilha | `/cartilha` | ✅ | ❌ | NENHUM |
| Curso Interativo | `/curso` | ✅ | ❌ (localStorage interno) | BAIXO |
| Onboarding | `/onboarding` | ✅ | ✅ `POST squad`, `PUT squad`, `POST squad/login` | **CRÍTICO** |
| TeacherArea | `/professor` | ✅ (login form) | ✅ `POST login`, `POST squad`, `DELETE squad` | MÉDIO (protegido por auth) |
| Dashboard | `/dashboard` | ProtectedRoute | ✅ Indiretamente (navega para MissionReactor) | MÉDIO |
| MissionReactor | `/dashboard/mission/:id` | ProtectedRoute | ✅ `POST mission/submit` com upload | **CRÍTICO** |
| GroupReport | `/report/:squadId` | ✅ | ❌ (mas acessa dados sensíveis se autenticado) | MÉDIO |

---

## 3. Auditoria de Escritas no Banco (GATE 2)

### 3.1 Classificação de Operações de Escrita

| Arquivo | Operação | Tipo de Escrita | Contexto de Auth | Deve Bloquear em Readonly? |
|---|---|---|---|---|
| `squadService.ts:38` | `Squad.create()` | Criação de bancada | **NENHUM** — rota `POST /api/classrooms/:id/squads` não tem `requireAuth` | ✅ **SIM — CRÍTICO** |
| `squadService.ts:69` | `Squad.findOneAndUpdate()` | Edição de bancada | `requireAuth + requireSquadOwnership` | ✅ SIM |
| `squadService.ts:83-87` | `Squad.findOneAndDelete() + JourneyState.deleteMany()` | Deleção cascata | `requireAuth + requireRole(TEACHER)` | ⚠️ Avaliar (operação de professor) |
| `authService.ts:40` | `Teacher.create()` | Registro de professor | `checkTeacherPilotAccess` (allowlist) | ⚠️ Avaliar (operação de admin) |
| `missionService.ts:70` | `JourneyState.findOneAndUpdate(upsert)` | Progresso de missão | `requireAuth + requireSquadOwnership` | ✅ **SIM — ALTO** |

### 3.2 Análise de Escrita Pública Indevida

**ACHADO CRÍTICO:** A rota `POST /api/classrooms/:classroomId/squads` em `squadRoutes.ts:28` **NÃO possui `requireAuth`**. Qualquer visitante com um `classroomId` válido pode criar bancadas diretamente no MongoDB Atlas.

```typescript
// squadRoutes.ts:28 — SEM requireAuth
router.post('/', validate(createSquadSchema), async (req: Request, res: Response) => {
  const newSquad = await squadService.createSquad(classroomId, nome, members);
```

**Impacto:** Spam de criação de bancadas pode saturar a coleção `squads` e inflar o Atlas M0.

---

## 4. Auditoria de Uploads/Anexos (GATE 3)

### 4.1 Configuração Atual

- **Middleware:** `multer` com storage em `server/uploads/`
- **Limite:** 5MB por arquivo
- **Filtro:** Apenas `jpeg|jpg|png|webp`
- **Armazenamento:** Disco local do Render (filesystem efêmero)
- **Servido como:** Estático via `app.use('/uploads', express.static('uploads'))`

### 4.2 Riscos Identificados

| Risco | Severidade | Detalhe |
|---|---|---|
| Upload em filesystem efêmero do Render | ALTO | Arquivos são perdidos a cada deploy/restart. Não adequado para persistência |
| Upload via rota protegida | MÉDIO | `POST /api/squads/:id/missions/submit` exige auth + ownership, mas se um token JWT válido for obtido (via squad login), uploads ficam habilitados |
| Consumo de disco Render Free | ALTO | Render Free tem ~10GB de disco. 200 uploads de 5MB = 1GB. Bots poderiam saturar |
| Falta de rate limit específico para upload | MÉDIO | Usa apenas o rate limit global (100 req/15min). Upload deveria ter limite mais restritivo |
| Path traversal | BAIXO | Multer usa `crypto.randomUUID()` para filenames, mitigando path traversal |
| RCE via upload | BAIXO | Filtro de MIME+extensão restringe a imagens. Risco residual mínimo |

### 4.3 Decisão para Piloto Readonly

- ✅ **Bloquear uploads completamente** em `PILOT_READONLY_MODE=true`
- ✅ Endpoints de submit devem retornar `403/423` com mensagem demonstrativa
- ✅ Botões de upload devem ser ocultos/desabilitados no frontend

---

## 5. Auditoria de Responsividade Mobile (GATE 4)

### 5.1 Problema Identificado

O botão **"Área do Professor"** utiliza a classe `hidden md:flex` na Navbar (`Navbar.tsx:32`):

```tsx
<Link to="/professor" className="hidden md:block text-white ...">
  Área do Professor
</Link>
```

**Impacto:** Em telas menores que `768px` (mobile), o botão é completamente invisível. O professor precisa digitar manualmente `/professor` na URL.

### 5.2 Menu de Navegação Mobile

O bloco de links do meio (`O Desafio`, `A Jornada`, etc.) usa `hidden md:flex` (`Navbar.tsx:23`):

```tsx
<div className="hidden md:flex items-center gap-8">
```

**Impacto:** Em mobile, esses links ficam ocultos. **NÃO existe menu hamburger.** O único elemento visível em mobile é o botão "Área do Aluno".

### 5.3 Riscos de Responsividade

| Elemento | Comportamento Mobile | Risco | Severidade |
|---|---|---|---|
| Botão "Área do Professor" | Invisível (`hidden md:block`) | Professor não consegue acessar pelo celular | **ALTO** |
| Links de navegação | Invisíveis (`hidden md:flex`) | Usuário perde acesso a "Cartilha", "Curso", etc. | MÉDIO |
| Botão "Área do Aluno" | Visível (sem `hidden`) | Funcional | OK |
| Menu hamburger | **Inexistente** | Sem alternativa mobile para navegação | **ALTO** |
| Área de toque mínima | Botões com padding adequado (`px-6 py-2.5`) | OK | BAIXO |

### 5.4 Solução Proposta

1. Implementar **menu hamburger mobile** com toggle
2. Incluir **"Área do Professor"** no menu mobile
3. Incluir links de navegação no menu mobile
4. Garantir **área de toque ≥ 44x44px** conforme WCAG
5. Testar em viewports 320px, 375px, 414px

---

## 6. Análise de Risco de Saturação do Banco (GATE 8)

### 6.1 Atlas M0 Free Tier — Limites

| Recurso | Limite M0 | Uso Atual Estimado | Risco |
|---|---|---|---|
| Armazenamento | 512 MB | < 1 MB (dados sintéticos) | BAIXO atualmente |
| Conexões | 500 | < 5 (Render + dev) | BAIXO |
| Operações/segundo | Sem limite hard, mas throttling | Depende de acesso público | MÉDIO |
| Collections | Sem limite explícito | 4 (Classroom, Squad, JourneyState, Teacher) | BAIXO |

### 6.2 Matriz de Risco de Saturação

| Risco | Vetor | Probabilidade | Impacto | Severidade | Mitigação | Teste |
|---|---|---|---|---|---|---|
| Spam de criação de bancada | `POST /api/classrooms/:id/squads` (SEM AUTH) | **ALTA** | Crescimento da collection `squads`. 100 req/15min × múltiplos IPs | **CRÍTICO** | Bloquear POST público em readonly. Adicionar `requireAuth` | Enviar POST sem token, verificar 403 |
| Spam de progresso | `POST /api/squads/:id/missions/submit` | MÉDIA | Crescimento da collection `journeystates`. Requer JWT | ALTO | Bloquear submissão em readonly | Enviar POST com token, verificar 403/423 |
| Spam de upload | `POST /api/squads/:id/missions/submit` (multer) | MÉDIA | Consumo de disco Render + crescimento DB | ALTO | Bloquear upload em readonly | Enviar multipart, verificar rejeição |
| Spam de login squad | `POST /api/auth/squad/login` | MÉDIA | Geração excessiva de JWTs | MÉDIO | Rate limit já existe (50 req/15min onboarding, 100 global). Suficiente para piloto | Teste de carga leve |
| Scraping de endpoints públicos | `GET /api/onboarding/*` | MÉDIA | Load desnecessário no Atlas | BAIXO | Rate limit (50 req/15min) já mitiga | Monitorar logs |
| Crescimento de logs | `requestLogger` middleware | BAIXA | Logs no stdout do Render (sem persistência) | BAIXO | Já mitigado (Render descarta stdout após 7 dias free) | N/A |
| Cold starts | Render Free sleeps after 15min inactivity | ALTA | 30-60s de latência no primeiro request | BAIXO (UX, não segurança) | Documentar para professor | Medir tempo de cold start |
| Consumo de cota Atlas | Writes contínuos sem controle | MÉDIA | Pode atingir 512MB com spam extensivo | ALTO | Bloquear escritas públicas | Monitor tamanho via Atlas UI |
| Bots/crawlers | Qualquer endpoint público | BAIXA | Requests automatizados | BAIXO | Rate limit + helmet headers | Verificar User-Agent patterns |

### 6.3 Rate Limiting Atual

| Escopo | Janela | Limite | Suficiente? |
|---|---|---|---|
| Global `/api/` | 15 min | 100 req/IP | ⚠️ Insuficiente se POST de criação não for bloqueado |
| Onboarding `/api/onboarding/*` | 15 min | 50 req/IP | ✅ Adequado para GET público |
| Auth | Sem rate limit específico | Usa global (100) | ⚠️ Login brute-force atenuado mas não bloqueado |
| Upload | Sem rate limit específico | Usa global (100) | ⚠️ 100 uploads de 5MB = 500MB |

### 6.4 Recomendações Adicionais de Rate Limit

1. Rate limit de **10 req/15min** para `POST /api/auth/*` (brute-force mitigation)
2. Rate limit de **5 req/15min** para endpoints de upload/submit
3. Bloquear completamente endpoints de escrita pública em `PILOT_READONLY_MODE`

---

## 7. Resumo Consolidado de Riscos

| # | Risco | Severidade | Status Atual |
|---|---|---|---|
| R1 | Criação pública de bancada sem autenticação | **CRÍTICO** | ⚠️ ABERTO |
| R2 | Upload de fotos com token JWT obtido via squad login | **ALTO** | ⚠️ ABERTO (depende de `PILOT_ALLOW_SQUAD_LOGIN`) |
| R3 | Progresso persistente de missão no Atlas | **ALTO** | ⚠️ ABERTO (se token obtido) |
| R4 | Botão "Área do Professor" invisível no mobile | **ALTO** | ⚠️ ABERTO |
| R5 | Menu hamburger inexistente | **ALTO** | ⚠️ ABERTO |
| R6 | `alunosOriginal` exposto no onboarding | MÉDIO | ⚠️ ABERTO |
| R7 | Rate limit insuficiente para auth/upload | MÉDIO | ⚠️ ABERTO |
| R8 | Filesystem efêmero do Render para uploads | MÉDIO | Mitigado (efêmero = auto-limpeza, mas dados perdidos) |

---

## 8. Decisão

`DECISÃO: OS RISCOS SÃO REAIS E CONFIRMADOS. A CRIAÇÃO PÚBLICA DE BANCADA SEM AUTH É O VETOR MAIS CRÍTICO. O MODO PILOTO DEVE SER CONVERTIDO PARA PILOT_READONLY_MODE COM BLOQUEIO GLOBAL DE MUTAÇÕES PÚBLICAS, UPLOADS E PROGRESSO PERSISTENTE. A RESPONSIVIDADE MOBILE DEVE SER CORRIGIDA COM MENU HAMBURGER.`

---

_Auditoria realizada em 2026-07-01. Testes de sanidade: 242/242 verdes._
