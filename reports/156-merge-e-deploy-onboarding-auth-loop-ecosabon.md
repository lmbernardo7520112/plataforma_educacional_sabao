# R156 — Relatório de Merge e Deploy da Correção de Autenticação do Onboarding — EcoSabon

## 1. Pull Request e Merge
- **Pull Request**: [#54](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/pull/54)
- **Título**: `fix(server): remove auth guards from public list routes of classroom and squad for onboarding access`
- **Hash do Merge**: `5d2c528`
- **Status do Pipeline CI/CD**: ✅ 7/7 checks bem-sucedidos

## 2. Deploy do Backend (Render)
- O deploy foi disparado manualmente a partir da branch `main` e propagado com sucesso.
- O endpoint `/api/classrooms` agora responde publicamente com as turmas ativas sem exigir autenticação do professor.

## 3. Homologação das Rotas de Onboarding (Vercel)
- O acesso a `https://ecosabon-platform.vercel.app/` e o clique no botão "Área do Aluno" direciona corretamente para a tela de onboarding `/onboarding` (via `/dashboard` com redirecionamento client-side).
- O onboarding carrega a listagem de turmas ativas sem loops de redirecionamento para a raiz.
- A seleção da turma e a listagem das bancadas associadas (`Bancada Alfa` e `Bancada Beta`) estão operacionais e respondendo com status 200.
- A autenticação do aluno/squad ao selecionar uma bancada foi validada e a navegação para o dashboard da bancada ocorre sem interrupções.

## 4. Segurança e Governança
- As rotas de criação/edição e deleção continuam protegidas sob privilégios RBAC.
- Nenhum dado real de estudantes foi registrado.
- Nenhuma chave secreta foi exposta ou versionada.

## 5. Decisão
DECISÃO: FIX DE LOOP DE AUTENTICAÇÃO DO ONBOARDING MERGEADO E HOMOLOGADO NA VERCEL/RENDER. FLUXO DO ALUNO OPERA COM SUCESSO SEM REDIRECIONAMENTOS INDEVIDOS, E OS DADOS SINTÉTICOS DO PILOTO RESTRITO SÃO CARREGADOS CORRETAMENTE.
