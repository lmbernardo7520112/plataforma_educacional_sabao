# R168 — Decisão: Auditoria de Paridade Local versus Deploy — EcoSabon

## 1. Veredito Executivo

DECISÃO: A DIFERENÇA ENTRE LOCAL E DEPLOY DECORREU PRINCIPALMENTE DE DRIFT ENTRE AMBIENTE DE DESENVOLVIMENTO E AMBIENTE CLOUD DISTRIBUÍDO, SOMADO A LACUNAS DE CONFIGURAÇÃO DE SPA, CORS, MONOREPO, BUILD, SEED, ROTAS PÚBLICAS E AUTENTICAÇÃO. O COMPORTAMENTO É COMUM EM PRIMEIRO DEPLOY REAL, MAS DEVE SER PREVENIDO POR PIPELINE DE PREVIEW, TESTES E2E, CONTRACT TESTS, SMOKE TESTS E CONFIGURAÇÃO EXPLÍCITA DE INFRAESTRUTURA.

## 2. Ações de Melhoria Aprovadas
1. **Endurecimento Permanente de APIs Públicas**: Separação total de fluxos com o roteador de onboarding higienizado (`/api/onboarding/*`).
2. **Plano de Prevenção de Drift**: Adoção de testes automatizados com janela anônima e verificação estrita de build TypeScript no pipeline CI/CD.
3. **Auditoria Pendente de Segurança**: Aprovação de avanço para a fase `SEC-ROTATE-ATLAS-CREDENTIALS` para mitigação de credenciais expostas no histórico.
