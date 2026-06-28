# R120 — Modelo de Domínio: Piloto Restrito

## 1. Linguagem Ubíqua
- **Piloto Restrito (Restricted Pilot)**: Modo de operação de sandbox fechado onde a plataforma não está aberta ao público em geral.
- **Lista de Acesso Permitido (Allowlist)**: Conjunto de e-mails de professores autorizados a realizar login e cadastro.
- **Normalização de E-mail (Email Normalization)**: Limpeza de espaços em branco e unificação de caixa (lower case) para evitar erros de digitação de e-mails.
- **Políticas de Acesso do Piloto (Pilot Access Policies)**: Regras lógicas que decidem sobre a liberação de logins e cadastros com base em feature flags.

## 2. Entidades do Domínio
- **Teacher (Professor)**: Contém dados cadastrais e identificação (e-mail). Atua como operador da plataforma.
- **Classroom (Turma)**: Turmas de teste `3ºA` e `3ºB`.
- **Squad (Bancada)**: Bancadas de teste de 5 alunos associadas a uma Classroom.
- **JourneyState (Estado de Jornada)**: Controle de missões escolares executadas pelas bancadas.
- **PilotAccessPolicy (Política de Acesso)**: Entidade lógica de controle de acesso que decide se uma operação de login/cadastro é permitida com base no e-mail e na feature flag `PILOT_MODE`.

## 3. Value Objects (Objetos de Valor)
- **TeacherEmail (E-mail do Professor)**: Normaliza o endereço do e-mail de login/registro (lower case, trim).
- **PilotAllowedTeacherList (Lista de Operadores Permitidos)**: Transforma a variável de ambiente separada por vírgula em um conjunto normalizado de e-mails.
- **SquadSize (Tamanho de Bancada)**: Invariante configurada para 5 alunos por bancada.

## 4. Invariantes do Domínio
- Apenas e-mails na allowlist de professores podem registrar/login se `PILOT_MODE=true`.
- O cadastro público é bloqueado para qualquer e-mail que não esteja listado na allowlist.
- Cada bancada do piloto possui rigorosamente 5 alunos.
- Turmas válidas no piloto são apenas `3ºA` e `3ºB`.

## 5. Casos de Uso do Domínio
- **Autenticar Professor**: Recebe as credenciais, normaliza o e-mail, verifica contra a allowlist se em modo piloto e valida o JWT.
- **Registrar Professor**: Cria o registro se o e-mail estiver na allowlist em modo piloto, ou bloqueia o registro com `403 Forbidden`.
- **Bloquear Auto-cadastro**: Garante que o onboarding geral permaneça fechado ao público.

## 6. Fronteiras Arquiteturais (Bounded Context)
- **Server Context**: Controla autenticação, Zod schema validation, e as rotas `/auth/register` e `/auth/login`.
- **Shared Context**: Contém tipagens isomorfas estruturais usadas por client e server.
- **Client Context**: Exibe mensagem genérica de erro sem expor segredos.
- **Reports Context**: Registra a governança e conformidade regulatória.
