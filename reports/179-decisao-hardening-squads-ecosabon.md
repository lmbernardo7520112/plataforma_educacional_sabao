# R179 — Decisão: Hardening de Squads no Onboarding — EcoSabon

## 1. Veredito Executivo

DECISÃO: HARDENING DE SQUADS NO ONBOARDING IMPLEMENTADO E HOMOLOGADO LOCALMENTE. O ENDPOINT PÚBLICO DE CONSULTA NÃO EXPOE O ARRAY MEMBERS, SUBSTITUINDO-O POR MEMBERCOUNT. O FLUXO DO ALUNO DO PILOTO FOI ADAPTADO E PERMANECE FUNCIONAL. O QR GATE ATUALIZA SEU STATUS DE GO CONDICIONAL PARA GO COMPLETO PÓS-DEPLOY.

## 2. Ações Pendentes
- Deploy remoto do backend no Render e do frontend na Vercel (PR #59).
- Homologação online das rotas pós-deploy e validação final da ausência do array `members` no curl público.
- O QR Code restrito permanece bloqueado de ser gerado até a validação online de produção (R180).
