# R119 — Especificação Técnica: Modo Piloto Restrito

## 1. Problema e Objetivo
A Plataforma EcoSabon deve ser implantada inicialmente em um ambiente online de piloto restrito e controlado. Ela **não** deve atuar como um SaaS aberto com cadastro público descontrolado. O objetivo é implementar o modo piloto restrito, controlado por variáveis de ambiente, que restrinja o acesso a e-mails autorizados, desabilite o registro público e garanta o escopo estrito de dados do piloto.

## 2. Escopo Autorizado
- Implementação da feature flag `PILOT_MODE=true/false`.
- Validação de allowlist de e-mails em endpoints de login e cadastro.
- Desativação do registro de novos professores se o e-mail não estiver na allowlist.
- Tratamento de emails com normalização (remover espaços, ignorar caixa alta/baixa).
- Placeholder de dados do piloto contendo turmas `3ºA` e `3ºB` e bancadas de 5 alunos.
- Testes unitários e de integração validando o comportamento com `PILOT_MODE` ativo e inativo.

## 3. Fora de Escopo
- Deploy em nuvem (Vercel, Render, Atlas).
- Criação de contas de e-mails reais no código.
- Alteração do web-book (trilha estática no GitHub Pages).
- Implementação de multi-tenant, billing ou planos.

## 4. Regras de Negócio e Comportamento
1. Quando `PILOT_MODE=true`:
   - O cadastro de professores (`POST /api/auth/register` ou equivalente) fica restrito aos e-mails presentes na allowlist `PILOT_ALLOWED_TEACHER_EMAILS`. E-mails fora da allowlist recebem `403 Forbidden`.
   - O login de professores (`POST /api/auth/login` ou equivalente) fica restrito aos e-mails presentes na allowlist. E-mails fora da allowlist recebem `403 Forbidden`.
   - Nenhuma listagem de e-mails autorizados é exposta ao usuário. O erro retornado deve ser genérico e seguro.
2. Quando `PILOT_MODE=false` (ou indefinida):
   - O comportamento padrão de cadastro e login permanece inalterado (comportamento antigo preservado para desenvolvimento local/SaaS futuro).
3. A allowlist é definida na variável de ambiente `PILOT_ALLOWED_TEACHER_EMAILS` como uma lista de e-mails separados por vírgula (ex: `prof1@example.com,prof2@example.com`).

## 5. Variáveis de Ambiente Previstas
- `PILOT_MODE`: `true` ou `false`.
- `PILOT_ALLOWED_TEACHER_EMAILS`: string com lista de e-mails.

## 6. Critérios de Aceite
- Testes de política de piloto verificam:
  - Normalização de e-mails.
  - Validação da allowlist com espaços e caixas de letras diferentes.
  - Comportamento seguro com allowlist vazia.
- Envio de requisição de registro/login de professor não cadastrado na allowlist resulta em `403 Forbidden` sob `PILOT_MODE=true`.
- Envio de requisição de registro/login de professor cadastrado na allowlist conclui com sucesso sob `PILOT_MODE=true`.
- O comportamento antigo é mantido se `PILOT_MODE=false`.

## 7. Critérios de Rollback
- Se a feature flag quebrar o comportamento de desenvolvimento local ou introduzir vulnerabilidades de negação de acesso indesejadas, desativar `PILOT_MODE` no `.env` (definindo como `false`) ou reverter os commits de segurança.
