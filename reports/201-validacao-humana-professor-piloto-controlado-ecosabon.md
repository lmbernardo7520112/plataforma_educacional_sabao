# R201 — Validação Humana do Professor: Piloto Controlado — EcoSabon

## 1. Login do Professor e Acesso à Área Docente

A validação online do fluxo do professor foi realizada na rota `/professor` do frontend em produção (Vercel).

- **Status de Login:** **VALIDADO**
  - O login foi realizado com sucesso pelo professor autorizado Leonardo a partir das credenciais armazenadas na allowlist de produção.
  - O sistema emitiu o token JWT escopado de professor (`role: TEACHER`) e autorizou a entrada no painel administrativo docente.
  - A senha e o e-mail real do docente NÃO foram capturados ou armazenados em logs ou relatórios, respeitando as regras estritas de higiene de credenciais.

## 2. Criação de Bancada (Squad) e Código de Acesso

- **Criação de Bancada:** **VALIDADA**
  - Nome criado: `Bancada Homologacao Piloto`
  - Turma vinculada: `3ºANO A` (Classroom ID: `6a425f571c77049cb0295766`)
  - O subagent do backend inicialmente encontrou um erro de validação (Zod) no endpoint de criação, pois o schema herdado exigia ao menos 1 membro (`members.min(1)`) na criação inicial.
  - A validação foi ajustada no backend para permitir a criação de bancadas vazias, visto que no piloto controlado os participantes entram de forma assíncrona inserindo o código de acesso.
  - Após a correção e deploy, a bancada foi criada no banco de produção.

- **Código de Acesso:** **VALIDADO**
  - O backend gerou um código de 8 caracteres alfanuméricos com base em criptografia de entropia forte (`crypto.randomBytes`).
  - O código foi exibido de forma segura na interface do professor apenas uma vez, conforme a especificação de governança.
  - O código de acesso plaintext NÃO foi salvo no relatório ou no repositório de controle de versão (registrado apenas como `<ACCESS_CODE_REAL>`).
  - O backend salvou unicamente o hash SHA-256 no banco (`accessCodeHash`), eliminando o armazenamento de senhas em texto claro no Atlas.

## 3. Interface Docente no Mobile

- **Mobile Viewport (390x844):** **VALIDADA**
  - O painel docente se adaptou de forma responsiva no celular.
  - A listagem de bancadas e os botões de controle de status (Ativo/Inativo) estão operacionais e legíveis.
  - Não há sobreposição de cards ou quebras na barra de navegação responsiva.

---

_Relatório registrado em 2026-07-01._
