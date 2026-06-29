# R174 — Auditoria de Divulgação Restrita e QR Gate — EcoSabon

## 1. Critérios de Divulgação e QR Gate
Esta auditoria avalia se os requisitos de conformidade de cibersegurança foram cumpridos para a liberação de QR Codes de acesso restrito da plataforma para os professores autorizados do piloto.

## 2. Payloads Públicos Higienizados
O endurecimento das rotas públicas de onboarding foi validado. As requisições públicas para `/api/onboarding/*` retornam dados estruturados mínimos, sem exposição de:
- Identificadores internos (`__v`), timestamps de criação/alteração (`createdAt`, `updatedAt`).
- Journey states, andamento acadêmico ou progresso de missões de outras bancadas.
- Relações de professores (`teacher`, `teacherId`).

## 3. Segurança de Acesso Acadêmico
- **Bloqueio de Intruso**: O login com credenciais não cadastradas (e-mail `intruso@example.com`) foi rejeitado com status `403 Forbidden` e mensagem genérica, não expondo a allowlist acadêmica.
- **Conformidade de Segredos**: Não existem segredos, tokens JWT ou URIs de conexão ativas com senha no código ou no histórico dos relatórios.
- **Modo Piloto Restrito**: A plataforma permanece blindada em modo piloto (`PILOT_MODE=true`), impedindo a criação de turmas ou inscrições fora do escopo homologado.

## 4. Avaliação de Riscos
O risco de vazamento de dados de estudantes é nulo, pois toda a massa de dados em uso é sintética e o onboarding opera sob DTOs estritos. 

WARN: o endpoint público de squads ainda retorna a lista sintética members. Embora não contenha dados reais, a forma mais segura para QR/divulgação restrita é substituir essa lista por memberCount ou studentCount antes de qualquer divulgação mais ampla.

