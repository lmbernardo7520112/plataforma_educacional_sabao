# R163 — Decisão: Hardening dos Endpoints Públicos de Onboarding — EcoSabon

## 1. Decisão Técnica

DECISÃO: HARDENING DOS ENDPOINTS PÚBLICOS DE ONBOARDING IMPLEMENTADO. O FLUXO DO ALUNO PERMANECE FUNCIONAL, MAS AS RESPOSTAS PÚBLICAS AGORA SÃO DTOs MÍNIMOS, FILTRADOS AO ESCOPO DO PILOTO E SEM EXPOSIÇÃO DE ESTUDANTES, PROFESSORES, ESTADOS INTERNOS OU METADADOS SENSÍVEIS.

## 2. Elementos Consolidados
- Implementação de DTOs públicos estruturados em `/api/onboarding/*` para a listagem pública de turmas, detalhes e bancadas.
- Restauração de autenticação baseada em token JWT para professores nas rotas originais `/api/classrooms` e `/api/classrooms/:classroomId/squads`.
- Higienização contra vazamento de metadados internos de Mongoose (`__v`, timestamps) e journey states das bancadas.
- Validação automática por meio de testes de segurança TDD adicionados (4 testes novos passados).
- Rigor de governança inalterado (sem e-mails reais, sem secrets versionados, web-book intocado).

## 3. Risco Mapeado
Registrada tarefa pendente:
`SEC-ROTATE-ATLAS-CREDENTIALS — rotacionar senha/usuário Atlas e atualizar DATABASE_URL no Render sem versionar segredos.`
