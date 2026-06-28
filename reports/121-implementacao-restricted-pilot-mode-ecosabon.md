# R121 — Implementação do Modo Piloto Restrito

## 1. Objetivo
Descrever a implementação técnica e governada do modo piloto restrito no backend Express, garantindo o controle rígido de acessos, alinhamento de portas e proteção de credenciais.

## 2. Especificação Executada e Decisões de Domínio
A implementação seguiu a especificação documentada no R119 e o modelo de domínio do R120. As seguintes decisões foram tomadas e implementadas:
- **Cadastro de Professor (Teacher Register)**: Implementamos a **Opção B** (permitir o registro apenas se o e-mail estiver na allowlist de e-mails autorizados do piloto), permitindo que os professores autorizados configurem suas credenciais na nuvem com segurança sem expor e-mails ou senhas em commits.
- **Login de Estudantes (Squad Login)**: O login de bancadas fica desativado por padrão quando `PILOT_MODE=true` para maior controle, mas pode ser explicitamente habilitado configurando a variável `PILOT_ALLOW_SQUAD_LOGIN=true`.
- **Seed do Piloto**: O arquivo de dados `server/seed/restricted_pilot_data.json` e o script de seed `server/seed/restrictedPilotSeed.ts` foram adicionados com suporte a turmas `3ºA` e `3ºB` e bancadas de 5 alunos (dados sintéticos mock). O seed **não** é executado automaticamente.

## 3. Arquivos Criados e Alterados

| Arquivo | Estado | Descrição |
|---|---|---|
| `server/config/pilot.ts` | Criado | Lógica pura de normalização e validação de e-mails da allowlist do piloto |
| `server/config/pilot.test.ts` | Criado | Cobertura de testes unitários para a política do piloto (12 testes) |
| `server/middleware/pilotAuth.ts` | Criado | Middlewares de autenticação express `checkTeacherPilotAccess` e `checkSquadPilotAccess` |
| `server/middleware/pilotAuth.test.ts` | Criado | Cobertura de testes unitários para os middlewares do piloto (7 testes) |
| `server/middleware/auth.ts` | Alterado | `requireAuth` atualizado para conter validação em tempo de execução O(1) do email contido no JWT payload |
| `server/routes/authRoutes.ts` | Alterado | Acoplamento de middlewares de piloto nas rotas de login/registro e squad login |
| `server/services/authService.ts` | Alterado | Adicionado o e-mail no payload assinado do JWT para professores |
| `server/.env.example` | Alterado | Adicionados placeholders de documentação para variáveis de piloto |
| `server/seed/restricted_pilot_data.json` | Criado | JSON de seed com a massa sintética restrita do piloto (turmas 3ºA/3ºB, bancadas de 5 alunos) |
| `server/seed/restrictedPilotSeed.ts` | Criado | Script de seed estrutural de banco para turmas e bancadas do piloto |

## 4. Comportamento Operacional

### 4.1 Com `PILOT_MODE=true`
- O registro de novos professores ou logins de e-mails fora da allowlist (`PILOT_ALLOWED_TEACHER_EMAILS`) retorna `403 Forbidden` com a mensagem segura: `Acesso restrito ao piloto autorizado.`.
- O login de bancadas (squads) é bloqueado com `403 Forbidden` a menos que `PILOT_ALLOW_SQUAD_LOGIN=true` esteja ativado no ambiente.
- O middleware `requireAuth` valida o e-mail gravado no token a cada requisição a endpoints protegidos de professores, revogando o acesso imediatamente se o e-mail for retirado da allowlist no dashboard.

### 4.2 Com `PILOT_MODE=false` (ou inativo)
- A plataforma se comporta da forma padrão (cadastro público de professores permitido e logins de bancadas desbloqueados), preservando o comportamento do monorepo para desenvolvimento ou futura transição para SaaS comercial.

## 5. Cobertura de Testes e Lint
- **Testes novos**: 19 testes criados (12 na política de piloto e 7 na integração do middleware de rotas), todos com 100% de sucesso.
- **Total de testes no monorepo**: **230 testes verdes, 0 falhas** (124 web-book, 47 workspace, 59 server).
- **ESLint**: Linter executado com 0 erros no servidor e client.

## 6. Complexidade Ciclomática e Clean Code
A complexidade ciclomática foi mantida no nível mínimo (V(G) <= 2) dividindo as regras em funções puras de O(1) no arquivo `pilot.ts` e isolando as tratativas em middlewares express modulares e de responsabilidade única. Não há aninhamento profundo de blocos de decisão (if/else).
