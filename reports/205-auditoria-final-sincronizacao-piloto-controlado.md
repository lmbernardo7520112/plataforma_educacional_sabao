# R205 — Auditoria Final de Sincronização e Governança — EcoSabon

## 1. Escopo da Auditoria

Este relatório consolida a auditoria final profunda realizada em 2026-07-01 (15:05 GMT-3) para atestar a sincronização de código, deploys e dados da Plataforma EcoSabon em modo piloto controlado (`PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS`).

As seguintes instâncias foram inspecionadas:
* **Workspace Local:** Repositório Git local.
* **GitHub Remote:** Repositório `lmbernardo7520112/plataforma_educacional_sabao`.
* **Vercel (Frontend Hosting):** Projeto `ecosabon-platform`.
* **Render (Backend Hosting):** Web Service `ecosabon-api`.
* **MongoDB Atlas (Cloud Database):** Instância de produção.

---

## 2. Sincronização do Código (Git & GitHub)

A árvore do Git local foi comparada com o repositório remoto.

* **Status da Branch:** `main` (sincronizada com `origin/main`).
* **Último Commit:** `9b8b33b` — *"fix(client): further compress onboarding squad form height to prevent save button overlap/clipping on small viewports"*
* **Higiene do Repositório:** 
  * Apenas o arquivo `server/.env.example` está rastreado pelo Git.
  * O arquivo `.env` local contendo chaves de teste locais está devidamente ignorado na árvore de trabalho (`working tree clean`).
  * Nenhum e-mail de allowlist real, token JWT ou connection string Atlas foi vazado ou rastreado no histórico.

---

## 3. Estado do Deploy no Render (Backend API)

A API do backend foi validada online através de requisições de fumaça diretas e testes de penetração anônima.

* **Commit ativo no Render:** `f0eef71` / `8bd0351` (Live).
* **Integridade dos Endpoints:**
  * **Onboarding Turmas (`GET /api/onboarding/classrooms`):** Ativo e respondendo em `0.4s` (HTTP 200). Retorna as turmas configuradas (`3ºANO A` e `3ºANO B`).
  * **Onboarding Grupos (`GET /api/onboarding/classrooms/<ID>/squads`):** Ativo e respondendo em `0.5s` (HTTP 200). Retorna o payload mínimo endurecido (apenas `_id`, `nome`, `classroomId` e `memberCount`).
  * **Intrusão Anônima:** Requisições `POST` de criação de bancada sem token são bloqueadas em 100% dos testes com **HTTP 423 Locked** (`PILOT_READONLY`).
  * **Rate Limiting:** Ativo para endpoints de login. `squadJoinLimiter` restringe tentativas no login por código de acesso a no máximo 10 requisições a cada 15 minutos por IP, protegendo o sistema contra brute-force.
  * **Upload de Imagens:** Bloqueado no backend. Qualquer envio multipart retorna **HTTP 423** (`PILOT_UPLOADS_BLOCKED`).

---

## 4. Estado do Deploy na Vercel (Frontend React)

A interface do usuário do portal de onboarding e da área do professor foi homologada em resoluções desktop e mobile.

* **Commit ativo na Vercel:** `9b8b33b` (Active / Ready).
* **Ajuste Ergonômico de Viewport:** A lista de checkboxes de alunos foi limitada para `max-h-[110px] min-h-[80px]` com rolagem interna, e os paddings dos botões e inputs foram reduzidos. Isso eliminou o clipping e trouxe o botão **`Salvar Alterações da Cátedra ✅`** completamente para o campo visível, mesmo em resoluções de altura reduzida (ex: 681px).
* **Restrição de Entrada (Regras de Negócio):** O limite de 5 estudantes por bancada está sendo rigidamente respeitado. Quando 5 checkboxes são marcados (`5/5`), os alunos adicionais (como Aluno 6 e 7) ficam desabilitados no formulário.
* **Fallback SPA:** Funcional. A navegação de abas e recarregamento de rotas como `/onboarding` e `/professor` não resulta em HTTP 404 (redirecionamento silencioso para a raiz do React).

---

## 5. Integridade dos Dados no MongoDB Atlas

Realizado o cruzamento de dados através de requisições de onboarding públicas estruturadas.

* **Bancada de Homologação (`6a453a2ef735f74efaeee8ef` / `eee8ef`):**
  * **Nome da Equipe:** `Bancada Homologacao Piloto`
  * **Membros Persistidos:** 5 integrantes cadastrados (Aluno Mock 1A, 2A, 3A, 4A e 5A).
  * **Status no Onboarding:** Sincronizado. O endpoint público de onboarding passou a retornar `memberCount: 5` para a bancada do professor, provando que a gravação do checklist e a edição de grupos via token provisório de bancada estão funcionando.
  * **Segurança do Access Code:** O banco de dados do Atlas armazena unicamente o hash de 64 caracteres (`accessCodeHash`). O código plaintext foi exibido apenas uma vez para o professor Leonardo na criação e não é mais recuperável via API pública ou dumps do banco.

---

## 6. Parecer Técnico (GO/NO-GO)

```
PARECER TÉCNICO: SISTEMA 100% ALINHADO E DEPLOYADO.
- Código local e remoto GitHub sincronizados (main: 9b8b33b).
- Backend Render atualizado e estável (hotfix de permissão PUT integrado).
- Frontend Vercel atualizado (botão de salvar visível e checklist ergonômico).
- Banco MongoDB Atlas consistente (Bancada eee8ef persistida com 5 membros).
- Barreiras de segurança ativas (visitantes bloqueados, uploads proibidos).

STATUS GERAL DA PLATAFORMA: GO (PRONTA PARA JANELA DE VALIDAÇÃO DE CAMPO).
```

---

_Auditoria registrada em 2026-07-01._
