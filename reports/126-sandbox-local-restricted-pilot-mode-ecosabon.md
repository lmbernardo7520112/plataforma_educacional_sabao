# R126 — Relatório de Simulação Local: Sandbox do Piloto Restrito

## 1. Objetivo
Apresentar o resultado da validação e simulação em sandbox local do modo piloto restrito (`PILOT_MODE=true`) da Plataforma EcoSabon, validando as políticas de allowlist, bloqueio de login de bancada por padrão, revogação em tempo real e a persistência dos dados locais no MongoDB Docker.

## 2. Configurações de Sandbox Utilizadas
Para as simulações, não alteramos o arquivo `server/.env` real (preservando placeholders e segredos locais), aplicando variáveis dinâmicas de ambiente diretamente na linha de comando:
- `PILOT_MODE=true`
- `PILOT_ALLOWED_TEACHER_EMAILS=leonardo@example.com,nadja@example.com`
- `PILOT_ALLOW_SQUAD_LOGIN=false` (e depois alternado para `true` para teste de liberação)

## 3. Estado do Banco MongoDB Local
- **Container**: `ecosabon-mongo` (Up e Healthy) na porta mapeada `27019 -> 27017`.
- **Estatísticas do Banco**:
  - `classrooms`: 2 turmas
  - `squads`: 1 bancada
  - `journeystates`: 6 estados de jornada
  - `teachers`: 1 catedrático administrador

Nenhuma massa de dados reais ou dados de identificação estudantil real foi adicionada. O banco continua contendo apenas registros sintéticos de desenvolvimento.

## 4. Resultados da Simulação das Rotas de Autenticação

### 4.1 Cadastro e Login de Professor Autorizado
- **Cadastro**: Enviada a requisição de registro para `leonardo@example.com` (allowlisted).
  - **Status**: `201 Created`
  - **Payload**: `{"success":true,"data":{"id":"6a40768817b6f88191533ffa","name":"Professor Teste Leonardo","email":"leonardo@example.com"}}`
- **Login**: Efetuada a autenticação com a credencial criada.
  - **Status**: `200 OK`
  - **Token**: Emitido JWT contendo a chave `email` e `role: "TEACHER"`.

### 4.2 Cadastro e Login de Professor Não Autorizado
- **Cadastro**: Tentativa de registrar o e-mail não listado `intruso@example.com`.
  - **Status**: `403 Forbidden`
  - **Erro**: `{"success":false,"message":"Acesso restrito ao piloto autorizado."}`
- **Login**: Tentativa de autenticação com `intruso@example.com`.
  - **Status**: `403 Forbidden`
  - **Erro**: `{"success":false,"message":"Acesso restrito ao piloto autorizado."}`

### 4.3 Bloqueio Padrão de Login de Bancadas (Squads)
- **Cenário**: Com `PILOT_ALLOW_SQUAD_LOGIN=false`, enviada requisição de login para a bancada existente `69cb26689da3f6ac17962c1e`.
  - **Status**: `403 Forbidden`
  - **Erro**: `{"success":false,"message":"Acesso restrito ao piloto autorizado."}` (acesso bloqueado conforme invariante).

### 4.4 Liberação Controlada de Login de Bancadas
- **Cenário**: Backend reiniciado com `PILOT_ALLOW_SQUAD_LOGIN=true`. Repetido o login para a mesma bancada.
  - **Status**: `200 OK`
  - **Resultado**: Token de bancada emitido com sucesso e retorno dos dados da bancada sintética.

### 4.5 Revogação de Acesso por Alteração da Allowlist
- **Cenário**:
  1. Login efetuado com sucesso como `leonardo@example.com` obtendo um token válido.
  2. Chamada à rota protegida `/api/classrooms` usando o Bearer Token -> `200 OK` (acesso liberado).
  3. Servidor reiniciado com a allowlist alterada: `PILOT_ALLOWED_TEACHER_EMAILS=nadja@example.com` (e-mail de leonardo removido).
  4. Repetição da chamada à mesma rota protegida usando o mesmo token de leonardo.
  - **Status**: `403 Forbidden`
  - **Resultado**: Acesso bloqueado imediatamente em tempo de execução O(1) pelo middleware `requireAuth`, validando o mecanismo de revogação de tokens ativos.

### 4.6 Fallback legada com `PILOT_MODE=false`
- **Cenário**: Backend reiniciado com `PILOT_MODE=false`.
  - **Resultado**: Acesso normal de login/cadastro restabelecido sem restrição de e-mails, e logins de squads permitidos sem validação adicional de piloto.

## 5. Testes Automatizados e Build do Client
- **Suíte de Testes**: **238 testes bem-sucedidos, 0 falhas** (124 web-book, 8 client domain, 47 workspace, 59 server).
- **Client Build**: Compilado com sucesso.
- **Client Dev Server**: Inicializado na porta `5173` em `127.0.0.1` e testado via curl ping -> `200 OK`.

## 6. Riscos Residuais
O uso do `localStorage` no browser client para persistência dos tokens representa o único risco residual conhecido de vazamento em caso de ataque XSS. Este risco é mitigado pelas regras de Content Security Policy (CSP) robustas herdadas no cabeçalho do Express (Helmet) e no e-book estático.
