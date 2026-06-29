# R164 — Relatório de Merge e Deploy do Hardening de Endpoints Públicos de Onboarding — EcoSabon

## 1. Pull Request e Merge
- **Pull Request**: [#55](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/pull/55)
- **Título**: `fix(server): harden public onboarding endpoints with minimal DTOs`
- **Status do Pipeline CI/CD**: ✅ 7/7 checks bem-sucedidos
- **Status de Merge**: Mergeado com sucesso na branch `main`.

## 2. Deploy Remoto (Render & Vercel)
- O deploy do backend no Render foi concluído e propagado com sucesso.
- O deploy do frontend na Vercel foi gerado e propagado com sucesso.

## 3. Homologação Funcional e de Segurança Online

### Testes de Endpoint (Curl):
- **`GET /api/onboarding/classrooms`**: ✅ Retorna status `200 OK` com o DTO público minimalista:
  ```json
  {"success":true,"data":[{"_id":"6a425f571c77049cb0295766","nome":"3ºANO A","ano":2026},{"_id":"6a425f571c77049cb0295769","nome":"3ºANO B","ano":2026}]}
  ```
  *(Confirmação: Ausência de timestamps, metadados de Mongo e arrays de estudantes).*
- **`GET /api/classrooms`** (Administrativo): ✅ Retorna status `401 Unauthorized` por falta de token de professor.

### Testes de Navegação do Aluno (Vercel):
O fluxo de ponta a ponta do aluno foi testado via subagente de browser com sucesso:
1. Clique em **"Área do Aluno"** -> Redirecionado para `/onboarding`.
2. As turmas **"3ºANO A"** e **"3ºANO B"** carregaram corretamente.
3. Clicar em **"3ºANO A"** carregou a **"Bancada Alfa (3ºA)"** e sua lista de estudantes do piloto.
4. O login da bancada sintética foi completado e redirecionou com sucesso para o **Dashboard do Aluno**.
5. Clicar em **"Iniciar Experimento"** iniciou com sucesso a **Missão 1** (O Inimigo Invisível).

## 4. Decisão

DECISÃO: HARDENING DOS ENDPOINTS PÚBLICOS DE ONBOARDING MERGEADO, DEPLOYADO E HOMOLOGADO ONLINE. O FLUXO DO ALUNO CONTINUA FUNCIONAL E AS ROTAS PÚBLICAS NÃO EXPÕEM DADOS SENSÍVEIS.
