# R167 — Plano de Prevenção contra Drift Local versus Nuvem — EcoSabon

Este plano estabelece as práticas recomendadas e melhorias de automação para evitar divergências e regressões entre o ambiente de desenvolvimento local e os deploys em nuvem (Vercel, Render e MongoDB Atlas).

## 1. Ações Imediatas e Melhorias no Pipeline CI/CD

### Validação Local Autônoma
- Recomenda-se integrar a compilação do servidor TypeScript (`npm run build` no `server`) no pipeline de CI/CD para capturar erros de tipos de forma precoce, impedindo deploys quebrados.
- Executar os testes em modo "strict compilation" (com flags `noEmitOnError: true` em `tsconfig.json`).

### Preview Environments
- Configurar deploys de Preview isolados para cada Pull Request na Vercel e no Render.
- O ambiente de preview deve se conectar a um banco de dados MongoDB Atlas Sandbox temporário, independente do banco de produção do Piloto Restrito.

## 2. Testes de Fumaça (Smoke Tests) Pós-Deploy
- Configurar uma etapa de "Smoke Test" em GitHub Actions pós-deploy que realize:
  1. Requisição GET simples à API de saúde `/ping` (aguardando status 200).
  2. Teste do endpoint público `/api/onboarding/classrooms` para confirmar a correta entrega de turmas sem autenticação.
  3. Verificação de cabeçalhos CORS a partir do domínio homologado da Vercel.

## 3. Testes de Contrato (Contract Testing)
- Implementar testes de schema de payload público para atestar que os DTOs de onboarding nunca vazam propriedades proibidas (ex: timestamps, `__v`, `teacher` ou `journeyState`).
- Integrar validações de tipo e estrutura usando `zod` também na validação de saída (output validation) no backend.

## 4. Testes de Interface E2E (Playwright/Cypress)
- Adicionar testes de interface automatizados que rodem em janelas limpas (sem localStorage prévio) para validar:
  - Landing Page -> Área do Aluno -> Onboarding.
  - Seleção de Turma -> Seleção de Bancada -> Login.
  - Isso evita que o estado residual de cookies ou localStorage mascare bugs de redirecionamento (como o loop de 401).

## 5. Checklist Padrão de Deploy (Pre-flight Checklist)
Antes de homologar novas rotas ou atualizações em produção, a equipe técnica deve:
- [ ] Validar a rota com uma requisição sem tokens (para garantir o comportamento correto de usuários deslogados).
- [ ] Validar a rota em modo anônimo no navegador de internet.
- [ ] Verificar a existência de mapeamento de DTO explícito em novos endpoints públicos.
- [ ] Rodar a verificação de secrets (`gitleaks`) e expiração de conexões expostas.
