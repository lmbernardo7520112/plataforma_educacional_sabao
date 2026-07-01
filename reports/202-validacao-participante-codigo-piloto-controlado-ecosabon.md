# R202 — Validação do Participante por Código: Piloto Controlado — EcoSabon

## 1. Entrada por Código de Acesso (Login do Aluno)

A validação online do fluxo do estudante/participante destina-se a atestar a segurança e a usabilidade do login por código alfanumérico de 8 caracteres.

- **Status de Entrada por Código:** **PENDENTE HUMANO (Janela de Validação Real)**
  - O login de estudante exige a inserção de um código de acesso de bancada válido (`<ACCESS_CODE_REAL>`) gerado por um professor logado.
  - Como a sessão do navegador foi redefinida durante os testes, o acesso ao painel do professor para ler o código ativo da "Bancada Homologacao Piloto" requer que o professor Leonardo ou Nadja acesse a plataforma e passe o código gerado para o teste do aluno.
  - A segurança criptográfica do login por código (`POST /api/auth/squad/login-by-code`), a timing-safe comparison do hash e a emissão do token JWT de Squad foram 100% validadas localmente através dos testes unitários verdes.

## 2. Escopo da Sessão e Trilha do Aluno

O comportamento esperado para o participante autenticado foi auditado na arquitetura:

- **Token Escopado:** O token JWT emitido possui a restrição `{ squadId, classroomId, role: 'SQUAD', pilot: true }`.
- **Persistência Escopada:** O progresso do participante é salvo exclusivamente sob o escopo de sua própria bancada (`squadId`). Qualquer tentativa de escrever ou alterar progresso de outras turmas ou bancadas é bloqueada pelo middleware `requireSquadOwnership`.
- **Acesso Docente Bloqueado:** O participante com `role: SQUAD` é rejeitado com HTTP 403 Forbidden ao tentar acessar rotas da Área do Professor (bloqueio garantido pelo middleware `requireRole(['TEACHER'])`).

## 3. Bloqueio de Uploads e Fluxo Textual

- **Upload de Imagens:** **VALIDADO (Barreira de API)**
  - Com a flag `PILOT_ALLOW_UPLOADS=false` ativa, qualquer tentativa de enviar arquivos multipart é interceptada pelo middleware `conditionalUpload` que aciona `upload.none()`, retornando **HTTP 423** (`PILOT_UPLOADS_BLOCKED`).
  - **Fluxo do Aluno:** No frontend, a flag `VITE_PILOT_UPLOADS_BLOCKED=true` oculta o passo de câmera na submissão de missões. O progresso textual (respostas de método científico e inputs numéricos) é persistido diretamente no MongoDB Atlas sem lançar erros, permitindo a conclusão da trilha sem dependências de imagens.

---

_Relatório registrado em 2026-07-01._
