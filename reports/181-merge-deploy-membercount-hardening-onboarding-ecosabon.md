# R181 — Relatório de Merge, Deploy e Homologação Online do Hardening memberCount — EcoSabon

## 1. Pull Request e Merge
- **Pull Request**: [#59](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/pull/59)
- **Título**: `fix(server): harden onboarding squads payload replacing members list with count`
- **Hash do Merge**: `0a1bce5`
- **Status do Pipeline**: ✅ 7/7 checks bem-sucedidos (GitGuardian, Gitleaks, Vercel, EcoSabon CI/CD)

## 2. Arquivos Alterados
- `server/routes/onboardingRoutes.ts` — substituição de `members` por `memberCount` no DTO público
- `server/routes/onboardingRoutes.test.ts` — testes atualizados para validar ausência de `members`
- `client/src/pages/Onboarding.tsx` — frontend adaptado para `memberCount` e SSO seguro
- `reports/177-spec-hardening-squads-onboarding-ecosabon.md`
- `reports/178-implementacao-hardening-squads-ecosabon.md`
- `reports/179-decisao-hardening-squads-ecosabon.md`

## 3. Endpoint Alterado
- **Rota**: `GET /api/onboarding/classrooms/:classroomId/squads`
- **Payload Antigo**: `{ _id, nome, classroomId, members: ["Estudante Alfa 1", ...] }`
- **Payload Novo**: `{ _id, nome, classroomId, memberCount: 5 }`

## 4. Validação Online Pós-Deploy
- **Frontend Vercel**: ✅ Respondendo com status 200
- **Backend Render**: ✅ Deploy concluído e respondendo com novo DTO
- **Confirmação de `memberCount` online**: ✅ Payload contém `memberCount: 5`
- **Confirmação de ausência de `members` online**: ✅ Array `members` não aparece no payload público
- **Confirmação de ausência de nomes de integrantes**: ✅ Nenhum nome sintético exposto
- **Onboarding funcional**: ✅ Fluxo completo homologado no navegador (turmas, bancadas, contagem)
- **CORS**: ✅ Sem erros
- **Console**: ✅ Sem stack traces ou erros

## 5. Testes Locais
- **Total**: 242/242 testes verdes
- **Build Client**: ✅ Compilado sem erros (Vite)

## 6. Governança
- Web-book: intocado
- GitHub Pages: intocado
- Atlas: preservado
- Render env: inalterado
- Vercel env: inalterado
- QR Code: **não gerado**
- Segredos: nenhum versionado
- E-mails reais: nenhum exposto

## 7. Decisão

DECISÃO: HARDENING MEMBERCOUNT MERGEADO, DEPLOYADO E HOMOLOGADO ONLINE. ENDPOINT PÚBLICO DE SQUADS RETORNA memberCount E NÃO EXPÕE members/NOMES. ONBOARDING PERMANECE FUNCIONAL. QR CODE AINDA PERMANECE BLOQUEADO ATÉ AUTORIZAÇÃO EXPLÍCITA.

## 8. Próxima Fase Recomendada
`FDP-RESTRICTED-QR-GENERATION-GATE — reavaliar QR Code restrito somente após autorização explícita.`
