# R177 — Especificação de Hardening de Squads no Onboarding — EcoSabon

## 1. O Problema
Na fase anterior de monitoramento online (PR #58), foi levantado um alerta de segurança (WARN): o endpoint público `/api/onboarding/classrooms/:classroomId/squads` retorna a lista de integrantes da bancada no array `members`. Embora se trate de dados sintéticos de alunos no escopo do piloto restrito, o vazamento nominal de membros em endpoints públicos sem autenticação desrespeita os princípios de privacidade de dados por design (Privacy by Design) e de minimização de privilégios.

## 2. Decisão Arquitetural e DTO Mínimo
Substituiremos a lista nominal `members` pela contagem numérica de integrantes `memberCount` na resposta pública.

### Novo DTO Público de Squad:
```typescript
interface PublicOnboardingSquadDTO {
  _id: string;
  nome: string;
  classroomId: string;
  memberCount: number;
}
```

### Campos Proibidos em Roteamento Público:
- `members` (array nominal de integrantes).
- `students`, `createdAt`, `updatedAt`, `__v` e dados de jornada.

## 3. Estratégia de Adaptação do Frontend (Onboarding.tsx)
Para manter o fluxo do aluno completamente funcional (edição de integrantes e login na bancada), o frontend utilizará as seguintes abordagens seguras:

1. **Card de Retomada no Lobby**:
   - Exibirá a contagem `{s.memberCount}/5 Vagas` em vez da lista joins de nomes.
2. **Login na Bancada (`handleSelectExistingSquad`)**:
   - O login é efetuado enviando o `squadId` ao endpoint `/auth/squad/login`.
   - A resposta de login bem-sucedida do servidor devolve o payload completo e seguro contendo o array `members` real.
   - O frontend alimentará a loja Zustand a partir do `data.data.squad.members` retornado pelo próprio fluxo autenticado do login.
3. **Edição de Integrantes (`handleEditClick`)**:
   - O clique em "Editar Integrantes" agora é assíncrono.
   - O frontend realiza uma chamada rápida ao `/auth/squad/login` para comprovar Ownership da bancada e obter os dados completos (incluindo `members` atual).
   - O formulário de edição de integrantes será preenchido com a lista obtida de forma autenticada e segura.

## 4. Critérios de Aceite
- O endpoint `/api/onboarding/classrooms/:classroomId/squads` não deve retornar o array `members`.
- O login da bancada sintética e navegação para o dashboard devem continuar funcionando normalmente.
- A edição de bancadas existentes no onboarding deve funcionar, carregando os integrantes atuais de forma autenticada.
- Todos os testes de regressão do workspace devem continuar passando.
- QR Code permanece bloqueado até nova homologação da versão com hardening.
