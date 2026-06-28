# R117 — Plano de Piloto Restrito para Plataforma EcoSabon

## 1. Objetivo
Formalizar a reorientação do escopo do primeiro deploy da Plataforma EcoSabon. O deploy inicial deixará de ser planejado como uma demonstração SaaS aberta ou irrestrita e passará a ser um **Piloto Restrito e Controlado**, com acesso fechado, turmas teste pré-definidas e operadores explicitamente autorizados.

## 2. Mudança de Escopo: De Deploy Genérico a Piloto Restrito
Ao invés de publicar a plataforma como um SaaS aberto para auto-onboarding público de qualquer escola ou usuário, o primeiro ambiente online atuará sob regras estritas de sandbox controlado. A evolução para um SaaS comercial multi-tenant contendo múltiplos acessos e faturamento é classificada como roadmap futuro e não será implementada nesta fase.

## 3. Escopo Funcional do Piloto

### 3.1 Operadores Autorizados (Professores)
- **Professor Leonardo** (acesso autorizado)
- **Professora Nadja** (acesso autorizado)
- Fica bloqueado o acesso ou login de qualquer outro e-mail de professor na plataforma. O auto-cadastro público está totalmente desativado.

### 3.2 Estrutura das Turmas de Teste
O banco do piloto conterá estritamente duas turmas pré-definidas:
- **`3ºA`**
- **`3ºB`**

### 3.3 Configuração das Bancadas
- Cada bancada dentro das turmas teste conterá **5 alunos**.
- *Nota de Governança*: O requisito descrevia "5b alunos". Identificamos isso como um provável erro de digitação ("5b" em vez de "5" ou "5 alunos por bancada"). Até que haja confirmação explícita em contrário, assumimos o padrão de **5 alunos por bancada** e registramos essa pendência de validação neste documento.
- Os nomes dos alunos atribuídos a cada bancada serão puramente sintéticos/demonstrativos. Não haverá login direto para alunos nesta fase.

### 3.4 Atividades Bloqueadas no Piloto
- Cadastro público de professores.
- Criação autônoma de escolas e turmas por e-mails de fora da allowlist.
- Gestão de planos, faturamento (billing) ou marketplace de assinaturas.
- Inserção de dados de alunos reais sem consentimento formal ou governança escolar implementada.

## 4. Regras de Acesso e Segurança do Piloto
Para garantir que o piloto permaneça fechado a usuários indesejados, as seguintes diretrizes técnicas deverão ser seguidas no backend Express:

1. **`PILOT_MODE=true`**: Injeção de feature flag controladora no ambiente.
2. **Desativação de Cadastro**: O endpoint de registro (`POST /api/auth/register` ou similar) deve ser desativado ou retornar `403 Forbidden` quando `PILOT_MODE` estiver ativo.
3. **Allowlist de Professores**: O login só será validado se o e-mail do professor constar na variável de ambiente `PILOT_ALLOWED_TEACHER_EMAILS` (por exemplo, contendo os e-mails de Leonardo e Nadja). Os e-mails reais de produção não devem ser versionados no código-fonte, sendo injetados apenas no dashboard do Render.
4. **CORS Restrito**: A API na nuvem só aceitará requisições originárias do subdomínio oficial do client hospedado no Vercel (além do `localhost` durante testes de desenvolvimento local).
5. **Rate Limiting**: Janela de rate limit estrita de 15 minutos com máximo de 100 requisições por IP para proteção contra ataques de negação de serviço (DoS).

## 5. Modelo de Dados do Piloto (Seed)
O banco de dados (MongoDB Atlas `ecosabon_pilot`) será alimentado via seed inicial com as seguintes entidades sintéticas:
- **`teachers`**: Perfis dos professores Leonardo e Nadja (com e-mails associados à allowlist).
- **`classrooms`**: Turmas `3ºA` e `3ºB`.
- **`squads`**: Bancadas de teste contendo 5 alunos mock cada.
- **`journeystates`**: Estados iniciais de missões limpos para permitir execução das tarefas.

## 6. Diferença entre Piloto Restrito e SaaS Futuro

| Funcionalidade | Piloto Restrito (Fase Atual) | SaaS Comercial (Fase Futura) |
|---|---|---|
| **Modelo de Tenant** | Single-tenant (uma escola/turma teste) | Multi-tenant (isolamento total de dados por escola) |
| **Cadastro** | Bloqueado (Apenas Leonardo e Nadja) | Aberto (Self-service onboarding com validação corporativa) |
| **Turmas** | Fixas (`3ºA` e `3ºB`) | Dinâmicas (Criadas pelo professor no dashboard) |
| **Limitação de Alunos** | Sintéticos (5 por bancada) | Reais (Gestão dinâmica de matrículas e turmas) |
| **Segurança e Privacidade** | Sem dados sensíveis reais | Conformidade estrita com LGPD, termos de uso e política de privacidade |
| **Faturamento (Billing)** | Inexistente ($0 custo de licença) | Planos de assinatura recorrente por escola/usuário |

## 7. Critérios de Sucesso e Abortar

### 7.1 Critérios de Sucesso Mínimo
- Apenas e-mails do Professor Leonardo e da Professora Nadja conseguem logar no painel.
- Tentativas de login de qualquer outro e-mail retornam erro de autorização (`403 Forbidden`).
- As turmas `3ºA` e `3ºB` aparecem corretamente com suas respectivas bancadas de 5 alunos sintéticos.
- Nenhuma credencial do Atlas ou chave de JWT é exposta publicamente.

### 7.2 Critérios de Abortar (Rollback Imediato)
- Qualquer vazamento de e-mails ou credenciais reais no código versionado.
- Bypass de segurança que permita cadastro público ou login de pessoas não autorizadas.
- Ocorrência de custos financeiros imprevistos ou exigência de cartões de crédito no provisionamento gratuito dos serviços.

## 8. Decisão Formal

`DECISÃO: GO CONDICIONAL PARA PLANEJAR UM PILOTO RESTRITO ONLINE DA PLATAFORMA ECOSABON. O DEPLOY FUTURO NÃO DEVE SER PÚBLICO, NEM SAAS, NEM ABERTO A CADASTROS. O ACESSO DEVE SER LIMITADO AOS PROFESSORES AUTORIZADOS LEONARDO E NADJA, COM TURMAS TESTE 3ºA E 3ºB E BANCADAS DE 5 ALUNOS. A EVOLUÇÃO PARA SAAS FICA RESERVADA A FASE POSTERIOR.`
