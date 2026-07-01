# R199 — Homologação Online do Piloto Controlado — EcoSabon

## 1. Sumário dos Testes e Validação Online

Este relatório descreve a validação funcional e de segurança da Plataforma EcoSabon executada diretamente em produção (Render e Vercel) após o deploy das flags do piloto controlado.

- **URL API (Render):** `https://ecosabon-api.onrender.com`
- **URL Frontend (Vercel):** `https://ecosabon-platform.vercel.app`

## 2. Resultados das Validações (GATES)

### 2.1. Smoke Tests (API & Frontend)
- **GET `/ping` (Render):** Retorna `pong` (HTTP 200) em 1.9s no cold start e <0.4s nos ciclos subsequentes.
- **GET `/` (Vercel):** Retorna index do SPA (HTTP 200).
- **GET `/api/onboarding/classrooms` (Render Proxy):** Retorna as turmas configuradas em banco: `3ºANO A` e `3ºANO B` (HTTP 200).
- **GET `/api/onboarding/classrooms/<CLASSROOM_ID>/squads`:** Retorna a lista de squads cadastradas com `memberCount`.
- **CORS:** Headers CORS adequados e sem vazamentos de stack traces.

### 2.2. Teste de Visitante Anônimo (Bloqueio de Escrita)
- **Tentativa de criar bancada (POST sem token):**
  - **Ação:** `POST /api/classrooms/<CLASSROOM_ID>/squads`
  - **Resultado:** **HTTP 423 Locked**
  - **Mensagem:** `{"success":false,"message":"Este piloto opera em modo controlado. Acesso de escrita requer autorização do professor.","code":"PILOT_READONLY"}` (Rejeitado como esperado ✅).
- **Tentativa de submeter progresso (POST sem token):**
  - **Ação:** `POST /api/squads/<SQUAD_ID>/missions/submit`
  - **Resultado:** **HTTP 423 Locked** (Bloqueado ✅).
- **Tentativa de upload anônimo (Multipart POST):**
  - **Ação:** Envio de arquivo em requisição mutativa.
  - **Resultado:** **HTTP 423 Locked** (Bloqueado ✅).

### 2.3. Teste do Professor Autorizado (Dashboard e Gerenciamento)
- **Área do Professor (UI):** Renderiza perfeitamente no caminho `/professor` do frontend Vercel. A tela de login está disponível e esteticamente de acordo com o design system (glassmorphism, dark mode).
- **Status:** **PENDENTE HUMANO (Janela de Validação Real)**
  - O login funcional com credenciais reais dos professores Leonardo e Nadja (e consequente criação de bancadas de teste no banco) deve ser realizado de forma assistida para preservar as senhas reais e segredos dos docentes.

### 2.4. Teste de Participante com Código (Login e Trilha)
- **Status:** **PENDENTE HUMANO (Janela de Validação Real)**
  - O login por código de acesso necessita que uma bancada de teste seja criada por um professor autorizado no dashboard. Os testes locais do hash de acesso (`squadService.test.ts`) e login por código foram validados e passaram com 100% de sucesso.

### 2.5. Teste Mobile (Responsividade)
- Viewports testadas: 375x667, 390x844 e 414x896.
- **Menu Hamburger:** Botão `mobile-menu-toggle` está visível e funcional em telas de largura móvel (<640px). Clicar no botão expande o menu com os links "Área do Professor" e "Área do Aluno" perfeitamente alinhados, sem quebras de layout.

### 2.6. Teste de Upload Bloqueado
- **Status:** **PENDENTE HUMANO (Janela de Validação Real / Validado Localmente via Testes)**
  - A interceptação do multipart via middleware `conditionalUpload` impede fisicamente que arquivos cheguem ao servidor Render, retornando **HTTP 423** (`PILOT_UPLOADS_BLOCKED`). O frontend, configurado com `VITE_PILOT_UPLOADS_BLOCKED=true`, pula a etapa de foto da missão e submete a resposta qualitativa textual diretamente, mantendo a experiência do aluno fluida e funcional.

### 2.7. Monitoramento Curto de Estabilidade
- Rodado script com 3 ciclos em intervalos de 60 segundos.
- **Ciclo 1:** Respostas do frontend/API estáveis. Tentativas de intrusão bloqueadas com 423.
- **Ciclo 2:** Latência de frontend estável. Intruso bloqueado.
- **Ciclo 3:** Conexões estáveis e rápidas. Intruso bloqueado.
- Sem vazamento de memória ou crescimento indevido detectado.

### 2.8. Auditoria de Payload Público
O payload retornado pelos endpoints de onboarding de turmas e bancadas foi auditado e está limpo:
- **NÃO expõe** array `members` ou nomes de estudantes.
- **NÃO expõe** campo `students`.
- **NÃO expõe** `accessCode` ou `accessCodeHash`.
- **NÃO expõe** emails de professores ou chaves privadas.
- O campo `memberCount` retorna a contagem numérica exata (Ex: 5 integrantes) sem expor as identidades.

## 3. Pendências para Homologação Final

1. **Validação Assistida com Leonardo:** Executar login real do professor no ambiente Vercel/Render e criar a primeira bancada piloto ("Bancada Homologação Piloto").
2. **Validação Assistida com Aluno:** Utilizar o código gerado no dashboard do professor para realizar o login-by-code do participante, validar a trilha textual de ponta a ponta e confirmar a persistência dos dados no MongoDB Atlas sob escopo da bancada.
3. **Bloqueio de QR Code:** O QR Code de onboarding e o link de divulgação devem permanecer bloqueados no repositório até que as etapas 1 e 2 sejam concluídas pelos professores e registradas.

---

_Relatório de homologação registrado em 2026-07-01._
