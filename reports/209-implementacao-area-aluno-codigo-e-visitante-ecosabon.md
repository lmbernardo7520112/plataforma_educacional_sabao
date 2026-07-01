# R209 — Implementação da Área do Aluno com Código e Modo Visitante Sandbox

Este relatório descreve a implementação técnica das melhorias de segurança e UX na Área do Aluno e no modo Visitante para a plataforma EcoSabon.

---

## 1. Problema Identificado
No modo piloto anterior, a Área do Aluno no Onboarding exibia as bancadas criadas pelos professores e permitia o login direto (Single Sign-On) por clique, chamando `/api/auth/squad/login` com o `squadId` livremente. Isso permitia que qualquer usuário comum ou invasor interceptasse diários, enviasse uploads e poluísse as notas/dados das bancadas oficiais da escola no banco remoto.

---

## 2. Arquivos Alterados
* **`server/routes/authRoutes.ts`**: Bloqueio de login estudantil legado por ID quando o piloto está ativo.
* **`client/src/pages/Onboarding.tsx`**: Tela de Onboarding atualizada para exigir código de acesso de 8 dígitos para login real de bancada e adição do botão de acesso visitante sandbox.
* **`client/src/pages/Dashboard.tsx`**: Exibição de banner explicativo de demonstração e bloqueio de chamadas de sincronização com o banco remoto para visitantes.
* **`client/src/pages/MissionReactor.tsx`**: Interceptação de submissões de relatórios e simulação de progresso 100% local em memória para visitantes.

---

## 3. Login por Código de Acesso
* O fluxo anterior de login automático foi desativado. 
* Agora, ao selecionar a bancada de apoio visual, o aluno deve digitar o **Código de Acesso de 8 dígitos** fornecido pelo professor.
* O frontend realiza o envio via `POST /api/auth/squad/login-by-code`.
* Se o código for válido, o backend emite o token e o frontend busca os detalhes da bancada autenticada em `/api/squads/standalone/:id`, atualizando o store do Zustand e redirecionando para o `/dashboard`.
* O código de acesso não é exposto ou salvo em `localStorage` ou logs.

---

## 4. Modo Visitante (Sandbox Local)
* Acesso facilitado por meio do botão **"Acessar como Visitante 👤"**.
* O visitante não recebe token do servidor, não se autentica contra o banco e assume as credenciais locais fictícias de sandbox (`squadId === 'visitor-sandbox'`).
* O progresso é executado 100% local em memória no Zustand (não sendo persistido localmente ou remotamente).
* A interface do `/dashboard` e do `/dashboard/mission/:id` exibe um aviso claro de que alterações não são salvas.
* Tentativas de submit e simulações são interceptadas no `MissionReactor.tsx` e completadas no estado em memória para fins pedagógicos.

---

## 5. Bloqueio de Login Legado por `squadId`
* A rota backend `POST /api/auth/squad/login` foi configurada para responder com status **423 Locked** se o modo piloto estiver ativo (`PILOT_MODE === 'true'`).
* Isso bloqueia tentativas externas de contornar a segurança fornecendo apenas o ID de bancada obtido na API pública.
* A suite de testes foi expandida para certificar que esta restrição e as rotas por código operam perfeitamente.

---

_Implementado e auditado com sucesso em 2026-07-01._
