# R191 — Decisão: Teacher-Controlled Writable Squads — Piloto EcoSabon

## 1. Contexto

A fase `SEC-PILOT-READONLY-SAFETY-AUDIT-PLAN` (R182–R186, PR #60) propôs `PILOT_READONLY_MODE` com bloqueio total de escritas. O usuário refinou a premissa:

> A plataforma NÃO deve ser apenas read-only para todos.
> Visitantes: read-only. Professores Leonardo/Nadja: gestão de bancadas. Participantes: trilha funcional.

---

## 2. Pergunta: É possível?

**SIM.** A arquitetura atual possui todos os blocos necessários (JWT TEACHER/SQUAD, allowlist, requireAuth, requireSquadOwnership). A diferença entre "read-only total" e "teacher-controlled writable" se resume a **4 mudanças cirúrgicas**:

1. Adicionar `requireAuth + requireRole(['TEACHER'])` no `POST /api/classrooms/:id/squads` (corrigir bug de segurança)
2. Criar middleware `blockAnonymousMutationsInPilot` (bloqueia POST/PUT/DELETE sem JWT)
3. Implementar código de acesso por bancada (6 caracteres, gerado pelo sistema)
4. Tornar upload opcional no piloto (`PILOT_ALLOW_UPLOADS=false`)

---

## 3. Arquitetura Recomendada

```
PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS
```

| Papel | Autenticação | Leitura | Escrita |
|---|---|---|---|
| Visitante | Nenhuma | Onboarding, landing, cartilha, curso | ❌ Nenhuma |
| Professor Leonardo/Nadja | JWT TEACHER + allowlist | Tudo | Criar/editar/deletar bancadas |
| Participante de bancada | JWT SQUAD via código de acesso | Trilha própria, relatório | Submeter missões (sem upload) |

---

## 4. Riscos e Proteção do Banco

| Risco | Severidade Atual | Severidade Pós-Hardening | Controle |
|---|---|---|---|
| Criação anônima de bancada | **CRÍTICA** | NENHUMA | `requireAuth + requireRole(TEACHER)` |
| Spam de missões | **ALTA** | BAIXA | `requireAuth + requireSquadOwnership` + rate limit |
| Upload abusivo | MÉDIA | NENHUMA | `PILOT_ALLOW_UPLOADS=false` |
| Crescimento Atlas | MÉDIA | MUITO BAIXA | ~360KB estimado para piloto completo |
| Brute-force código | MÉDIA | BAIXA | Rate limit + nanoid 6 chars (2.2B combinações) |

---

## 5. Como Permitir Bancada Funcional

1. Professor cria bancada → sistema gera código de 6 caracteres
2. Professor comunica código aos alunos
3. Aluno entra com código no onboarding → backend valida → emite JWT SQUAD
4. Aluno navega trilha, submete missões (sem foto no piloto)
5. Progresso persiste em `JourneyState` no Atlas
6. Professor acompanha via Área do Professor + relatórios

---

## 6. Como Bloquear Visitantes

- Middleware global `blockAnonymousMutationsInPilot` rejeita POST/PUT/DELETE sem JWT
- Exceções: `POST /api/auth/teacher/login` e `POST /api/auth/squad/login-by-code`
- Frontend oculta formulários de criação/edição para visitantes
- Badge "Modo Piloto — Acesse com código do professor" visível

---

## 7. Mobile

- Menu hamburger com "Área do Professor" visível em todas as telas
- "Área do Aluno" com input de código acessível em mobile
- Área de toque ≥ 44×44px

---

## 8. Uploads

- **Bloqueados no piloto** (`PILOT_ALLOW_UPLOADS=false`)
- Missões submetidas sem foto no piloto
- Habilitação futura com: 1MB max, MIME check, rate limit, Cloud Storage
- Upload no Render Free é efêmero — inviável para persistência

---

## 9. Relação com PR #60 (R182–R186)

O PR #60 propõe `PILOT_READONLY_MODE` (bloqueio total). A implementação atual **supera** essa proposta:

| Aspecto | PR #60 (R182-R186) | Esta Fase (R187-R191) |
|---|---|---|
| Visitantes | Read-only ✅ | Read-only ✅ |
| Professores | Read-only ⚠️ | **Gestão de bancadas ✅** |
| Participantes | Read-only ⚠️ | **Trilha funcional ✅** |
| Uploads | Bloqueados ✅ | Bloqueados ✅ |
| Progresso | Não persiste ⚠️ | **Persiste para autorizados ✅** |

**Recomendação:** Mergear PR #60 como base documental e implementar R187–R191 como fase subsequente que **substitui** o `PILOT_READONLY_MODE` total pelo `TEACHER_CONTROLLED_WRITABLE_SQUADS`.

---

## 10. Testes de Sanidade

| Suite | Resultado |
|---|---|
| `server` (vitest) | 63/63 ✅ |
| `client` (vitest) | 8/8 ✅ |
| `curso-interativo` (vitest) | 47/47 ✅ |
| `ebook-ecosabon-prototipo` (vitest) | 124/124 ✅ |
| Build Vite (client) | ✅ (368KB + 71KB CSS) |
| **TOTAL** | **242/242 ✅ + build OK** |

---

## 11. Relatórios Integrados

| Relatório | Conteúdo |
|---|---|
| R187 | Auditoria de viabilidade e inventário de papéis/rotas |
| R188 | Especificação completa com feature flags, operações e critérios de aceite |
| R189 | Plano de implementação com backend, frontend, banco, testes, deploy, rollback |
| R190 | Threat model com 12 ameaças analisadas |
| R191 | **Esta decisão** |

---

## 12. Feature Flags Finais

```env
PILOT_MODE=true
PILOT_PUBLIC_READONLY=true
PILOT_ALLOW_SQUAD_LOGIN=true
PILOT_ALLOW_UPLOADS=false
```

---

## 13. DECISÃO FINAL

```
DECISÃO: É POSSÍVEL CONCILIAR MODO PILOTO READ-ONLY PARA VISITANTES COM ESCRITA
PERSISTENTE PARA BANCADAS CRIADAS E AUTORIZADAS POR PROFESSORES ALLOWLISTED.

A ARQUITETURA RECOMENDADA É PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS,
COM:

- CRIAÇÃO DE BANCADAS EXCLUSIVA PARA PROFESSORES LEONARDO/NADJA
- ACESSO DE PARTICIPANTES POR CÓDIGO DE ACESSO ESCOPADO (6 CHARS)
- BLOQUEIO DE ESCRITAS ANÔNIMAS (MIDDLEWARE GLOBAL)
- BLOQUEIO DE UPLOADS NO PILOTO ATUAL
- CORREÇÃO MOBILE DA ÁREA DO PROFESSOR (MENU HAMBURGER)
- PERSISTÊNCIA DE PROGRESSO APENAS PARA SQUADS AUTORIZADOS
- PROTEÇÃO DO ATLAS POR RATE LIMIT + AUTH OBRIGATÓRIA EM MUTAÇÕES
```

---

## 14. Próxima Fase Recomendada

```
SEC-PILOT-TEACHER-CONTROLLED-WRITES-IMPLEMENTATION — implementar visitante
read-only, professor allowlisted com gestão de bancadas, participante com token
escopado por código de acesso, bloqueio de uploads e correção mobile.
```

---

## 15. Governança

- ❌ Código: inalterado nesta fase
- ❌ Render: inalterado
- ❌ Vercel: inalterado
- ❌ Atlas: inalterado
- ❌ Web-book: intocado
- ❌ GitHub Pages: intocado
- ❌ QR Code: **NÃO GERADO**
- ❌ Segredos: nenhum versionado
- ❌ E-mails reais: nenhum exposto
- ❌ Dados reais: nenhum utilizado
- ✅ Relatórios R187–R191: criados e commitados

---

_Decisão registrada em 2026-07-01. 242/242 testes verdes + build OK._
