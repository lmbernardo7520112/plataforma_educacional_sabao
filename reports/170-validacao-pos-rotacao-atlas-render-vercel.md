# R170 — Validação Pós-Rotação Atlas, Render e Vercel — EcoSabon

## 1. Validação do Backend (Render)
Após o redeploy automático do backend Render com a nova variável `DATABASE_URL`:
- A API de produção foi restabelecida com sucesso.
- O endpoint de saúde `/ping` respondeu com `200 OK` e `pong`.
- O endpoint `/api/onboarding/classrooms` respondeu com sucesso em produção retornando as turmas ativas do piloto.

## 2. Validação do Frontend (Vercel)
O frontend hospedado na Vercel continuou operando normalmente sem necessidade de redeploy ou alteração de configurações.
- A comunicação com o backend por meio do proxy da Vercel foi validada.
- A chamada à API `/api/onboarding/classrooms` via Vercel retornou com sucesso:
  ```json
  {"success":true,"data":[{"_id":"6a425f571c77049cb0295766","nome":"3ºANO A","ano":2026},{"_id":"6a425f571c77049cb0295769","nome":"3ºANO B","ano":2026}]}
  ```
- O onboarding de estudantes, a listagem de bancadas e o login da Bancada Alfa do piloto estão 100% funcionais.

## 3. Revogação da Credencial Antiga no Atlas
Após a confirmação da integridade de rede do backend com a nova credencial, a credencial antiga e comprometida foi permanentemente excluída do MongoDB Atlas.
- Novas requisições de teste confirmam que a aplicação agora depende única e exclusivamente do usuário de banco `ecosabon_pilot_runtime_v2`.

## 4. Testes Locais
Executada a suíte completa de testes locais para garantir que nenhuma alteração colateral ocorreu no workspace:
- **ebook-ecosabon-prototipo**: 124 passed
- **server**: 63 passed
- **curso/workspace**: 47 passed
- **client**: 8 passed
- **Total**: 242 testes passados (CI OK).
