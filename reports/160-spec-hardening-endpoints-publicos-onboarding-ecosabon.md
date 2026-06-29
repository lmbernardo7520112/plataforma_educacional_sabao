# R160 — Especificação de Hardening dos Endpoints Públicos de Onboarding — EcoSabon

## 1. O Problema
Na fase anterior, para quebrar o loop de redirecionamento no onboarding do aluno deslogado, as seguintes rotas de consulta do backend foram tornadas públicas (sem guards de autenticação):
- `GET /api/classrooms`
- `GET /api/classrooms/:id`
- `GET /api/classrooms/:classroomId/squads`

No entanto, essa abordagem de segurança (deixar as rotas totalmente públicas) expõe diretamente no cliente os dados completos das turmas, incluindo o array completo de estudantes, timestamps, metadados internos de bancos e metadados de professores. 

## 2. Rotas Atuais e Payloads Expostos
Atualmente, as rotas públicas expõem objetos do Mongoose completos:
- **`GET /api/classrooms`**: Retorna lista de turmas contendo campos do MongoDB como `createdAt`, `updatedAt`, `__v` e potencialmente outros metadados.
- **`GET /api/classrooms/:id`**: Retorna os detalhes completos da turma, incluindo o array `alunosOriginal` bruto e relações internas.
- **`GET /api/classrooms/:classroomId/squads`**: Retorna a lista de bancadas contendo todos os campos de progresso e timestamps de Mongoose de cada bancada.

## 3. Dependências do Frontend
Inspecionando [Onboarding.tsx](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/client/src/pages/Onboarding.tsx), o fluxo de onboarding do aluno necessita apenas de:
1. Listar as turmas ativas (`_id`, `nome`, `ano`).
2. Listar as bancadas existentes da turma selecionada (`_id`, `nome`, `members` - apenas strings de nomes de integrantes para renderização do card de retomada).
3. Obter a lista de estudantes originais da chamada (`alunosOriginal` contendo apenas `{ numero, nome }`) para permitir que o aluno selecione e preencha os integrantes ao editar/atualizar os integrantes da bancada.

## 4. Riscos Mapeados
- **Vazamento de dados administrativos/professores**: Expor chaves, IDs de professores ou status acadêmicos.
- **Vazamento de dados internos de Mongoose**: Expor metadados como `__v`, timestamps de auditoria interna, logs.
- **Falta de isolamento do piloto**: Em modo de homologação, todas as turmas cadastradas (inclusive de outras turmas de teste) ficavam expostas publicamente.

## 5. Decisão de Design de API
Adotamos a **OPÇÃO A** (Criar endpoints públicos específicos de onboarding e restaurar a autenticação total nas rotas originais).

### Justificativa:
- Separação clara de responsabilidades (Clean Code / DDD): rotas de consulta do professor continuam protegidas por RBAC padrão.
- Facilidade de auditoria de segurança declarativa no roteador Express.
- DTOs específicos aplicados exclusivamente nos novos endpoints públicos de onboarding.

Novos endpoints públicos:
- `GET /api/onboarding/classrooms`
- `GET /api/onboarding/classrooms/:id`
- `GET /api/onboarding/classrooms/:classroomId/squads`

## 6. Critérios de Aceite
- **Bloqueio de Vazamento**: As rotas públicas de onboarding **não** devem retornar `createdAt`, `updatedAt`, `__v`, dados de progresso de missão, dados de professores ou quaisquer dados de alunos que não sejam estritamente `{ numero, nome }` sintéticos de chamada.
- **Filtro do Piloto**: Sob `PILOT_MODE=true`, as turmas retornadas no onboarding público devem ser restritas apenas aos códigos sintéticos das turmas participantes do piloto.
- **Rate Limiting**: Aplicar um limitador de requisições específico e mais restritivo para o onboarding público para impedir abusos/raspagem.
- **Onboarding do Aluno**: O botão "Área do Aluno" e toda a seleção de turmas e bancadas devem funcionar sem erros.
- **Área do Professor**: O login e a área administrativa do professor devem continuar operando sob as rotas seguras originais.
- **Rigor de Governança**: Web-book, GitHub Pages e Atlas intocados, sem segredos reais versionados.
