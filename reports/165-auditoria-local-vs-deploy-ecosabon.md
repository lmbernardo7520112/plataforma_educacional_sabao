# R165 — Auditoria de Paridade Local versus Deploy — EcoSabon

## 1. Objetivo
Esta auditoria tem por finalidade analisar de forma técnica, histórica e operacional as divergências observadas entre o ambiente de desenvolvimento local (localhost) e os ambientes de deploy em nuvem (Vercel + Render + MongoDB Atlas) da Plataforma EcoSabon.

## 2. Histórico de Deploy e Ajustes
A migração da plataforma da execução puramente local para a infraestrutura de produção exigiu uma série de correções coordenadas para garantir que os fluxos de alunos e professores estivessem plenamente operacionais e em conformidade com as melhores práticas de cibersegurança.

## 3. Linha do Tempo dos Problemas Detectados e Corrigidos

1. **Deploy do Backend no Render**: Backend publicado na URL `https://ecosabon-api.onrender.com`.
2. **Ausência do Frontend na Vercel**: O projeto da Vercel foi inicialmente criado apontando para o subdiretório incorreto do monorepo, tentando compilar o backend/server em vez da pasta `client`.
3. **Erro de Compilação TS2349 na Vercel**: A Vercel tentou compilar o servidor, gerando falhas de tipos devido a importações implícitas de `helmet` e `express-rate-limit`.
4. **Correção do Diretório Raiz e Deploy do Frontend**: Configurada a raiz correta no monorepo e build do frontend efetuado com sucesso na URL `https://ecosabon-platform.vercel.app`.
5. **Erro 404 de SPA na Vercel**: Ao recarregar caminhos client-side diretamente (`/onboarding`, `/dashboard`), o servidor de borda da Vercel retornava erro 404 por falta de redirecionamento.
6. **Fallback SPA em vercel.json**: Adicionado fallback no roteador Vercel (`vercel.json`) direcionando rotas não-API para `/index.html`.
7. **Loop de Autenticação no Onboarding**: Alunos deslogados clicavam em "Área do Aluno" e eram redirecionados de volta para `/`.
8. **Causa do Loop de Autenticação**: O Axios interceptor no frontend detectava o status `401 Unauthorized` retornado pelas rotas administrativas de turmas e ejetava o usuário para `/`.
9. **Seed do Banco de Dados no MongoDB Atlas**: Banco Atlas provisionado, porém vazio de dados sintéticos para o piloto.
10. **Execução do Seed no Atlas**: Executado seed restricted piloto gerando turmas e bancadas sintéticas.
11. **Divergência de Dados de Chamada**: Normalizada a correspondência de nomes de turmas entre o seed e o arquivo `turmas_alunos.json` para evitar arrays de estudantes vazios.
12. **Endurecimento de Endpoints Públicos**: Criação do endpoint específico `/api/onboarding/*` retornando apenas DTOs mínimos de turmas e bancadas para alunos deslogados, com rate limiting e filtro restrito de piloto.

---

## 4. Matriz Local versus Deploy

| Camada | Local | Deploy (Vercel/Render/Atlas) | Diferença Crítica | Efeito Observado | Correção Aplicada | Prevenção Futura |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Frontend Server** | Vite Dev Server | Vercel Static Hosting/CDN | Vite resolve rotas client-side dinamicamente; Vercel precisa de regras de roteamento estáticas. | Erro 404 em recarregamento de subpáginas. | Configuração de rewrite em `vercel.json`. | Configurar Preview deployments com rotas validadas. |
| **Roteamento SPA** | Fallback automático | Erro 404 nativo | O dev server de Vite redireciona 404 para `index.html` internamente. | SPA não carregava URLs profundas em produção. | Adição do rewrite universal `((?!api/).*)` para `index.html`. | Adicionar smoke tests de rotas no build. |
| **Comunicação API** | Proxy local (`/api` -> localhost) | Vercel rewrite para Render | No local o tráfego não sai do localhost; no deploy o tráfego bate no proxy da Vercel. | Requests de API resolviam incorretamente se sem rewrite explícito no monorepo. | Alinhamento do `vercel.json` da raiz com regras de rewrite para Render. | Manter `vercel.json` na raiz sob controle de versão. |
| **CORS** | Localhost origin | Vercel origin pública | CORS local tolera portas e domínios locais; em produção o CORS é blindado. | Chamadas rejeitadas por CORS. | Configuração no backend Render para aceitar explicitamente o domínio homologado da Vercel. | Automatizar testes de contrato com CORS header validation. |
| **Autenticação** | Sessão localStorage persistida localmente | Sessão limpa em primeiro acesso | Navegador local já possuía localStorage com token de professor; deploy inicial começou zerado. | O loop de ejetar o usuário não ocorria no local do desenvolvedor devido à sessão ativa persistida. | Abertura dos endpoints de Onboarding e depois hardening dos mesmos com DTOs mínimos. | Testes locais sempre em janelas anônimas zeradas. |
| **Massa de Dados** | Docker local populado histórico | Atlas inicialmente vazio | Local acumulava registros antigos de desenvolvimento; Atlas requer seed explícito. | Erros de query e ausência de turmas no dropdown. | Execução de seed sintético restrito do piloto no Atlas. | Script de seed automatizado integrado ao workflow de infra. |
| **Compilação TS** | Execução tsx dinâmica | Compilação estrita tsc | `tsx` pula validações de declarações de tipo estritas na compilação do servidor. | Erro no deploy da Vercel tentando compilar server. | Ajuste do escopo do build script da Vercel e conserto de imports de middleware. | Testar compilação `tsc --noEmit` no pipeline de CI/CD. |

---

## 5. Análise do "Por que o Ambiente Local Funcionava"

1. **Simulação de SPA**: O dev server do Vite redireciona automaticamente qualquer request 404 para `index.html`, ocultando a necessidade de rewrites HTTP na CDN.
2. **Ambiente Confiável de CORS**: O backend local configurado para aceitar requests de `localhost:5173` funcionava perfeitamente com o proxy do Vite.
3. **Persistência de Estado (Browser e Banco)**: O banco local já possuía dados acumulados e o localStorage do desenvolvedor mantinha tokens salvos, mascarando o comportamento de redirecionamento 401 para alunos novos deslogados.
4. **Execução sem Build TypeScript**: O uso de `tsx watch` no desenvolvimento local ignora erros sutis de declaração de dependências de tipos globais que se manifestam no build de produção.

---

## 6. Classificação dos Incidentes e Problemas

- **Vercel compilando server**: B. Configuração de deploy / J. Monorepo Root Drift.
- **TS2349 no Helmet/Express-Rate-Limit**: A. Bug real de código (erros de tipagem do TypeScript).
- **SPA 404**: B. Configuração de deploy (roteamento SPA client-side).
- **CORS de Produção**: C. Diferença local/cloud (configuração de permissão de domínio de origem).
- **Redirecionamento Indevido (Axios 401)**: A. Bug real de código (fluxo de onboarding colidindo com middleware RBAC).
- **Massa de Dados Atlas Vazia**: F. Falha de dados/seed.
- **Divergência de Espaço no Nome da Turma (`3º ANO A` vs `3ºANO A`)**: F. Falha de dados/seed.
- **Vazamento de metadados antes do Hardening**: E. Falha de segurança/hardening.

---

## 7. Veredito Técnico sobre a Divergência
`Veredito: Esperado no primeiro deploy de monorepos integrados; 100% prevenível nas próximas fases por meio de IaC, testes E2E em janela anônima e automação de CI/CD.`
