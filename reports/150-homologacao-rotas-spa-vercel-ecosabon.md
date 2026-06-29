# R150 — Homologação de Rotas SPA na Vercel — EcoSabon

## 1. Verificação de Rotas da Plataforma (Alvo Esperado)

Após deploy do novo roteamento SPA, as rotas se comportarão da seguinte forma:

### Rota Raiz (`/`)
- **Ação**: Acesso à landing page.
- **Resultado Esperado**: Retorna 200 OK. Serve a landing page de Química Verde.

### Rota de Entrada de Alunos (`/onboarding`)
- **Ação**: Acesso direto via URL ou redirecionamento do botão "Área do Aluno".
- **Resultado Esperado**: Retorna 200 OK (em vez de 404). Serve o formulário do React para identificação de turma e bancada.

### Rota de Painel de Bancada (`/dashboard`)
- **Ação**: Acesso direto à URL do painel.
- **Resultado Esperado**:
  - Se sem sessão: Redirecionamento instantâneo via React Router para `/onboarding` (sem passar por requisição HTML ao servidor Vercel).
  - Se com sessão ativa: Exibição do dashboard do laboratório.

### Rota de API (`/api/ping`)
- **Ação**: Consulta ao status da API.
- **Resultado Esperado**: Encaminhada ao Render. Retorna 404 estruturado do Render (pois a rota no backend está mapeada na raiz `/ping` e não `/api/ping`). Comprova que a regra de proxy da API na raiz está ativa e operacional para endpoints do Render.

## 2. Comportamento do Botão "Área do Aluno"
Ao clicar no botão "Área do Aluno" no header, o usuário é levado à rota `/dashboard`.
- Como não há sessão ativa inicial, a `ProtectedRoute` intercepta o acesso e redireciona instantaneamente para a rota `/onboarding`.
- Devido à nova regra de SPA adicionada ao `vercel.json` da raiz do repositório, o cliente do navegador recebe e gerencia todas as transições de forma transparente, sem quebras ou telas 404 da Vercel.

## 3. CORS e Segurança
- O tráfego de dados da API no domínio Render continua configurado exclusivamente para aceitar requisições de origem do domínio Vercel (`https://ecosabon-platform.vercel.app`), com suporte a credenciais e livre de CORS wildcards (`*`).
- Nenhuma chave secreta ou credencial é transmitida ao cliente.
