# R210 — Homologação de Segurança: Área do Aluno e Modo Visitante

Este relatório consolida a auditoria de segurança das melhorias implementadas na Plataforma EcoSabon para o acesso discente e modo demonstração.

---

## 1. Visitante Sem Escrita Remota
* **Mecanismo:** A sessão de visitante é identificada no frontend por `squadId === 'visitor-sandbox'`.
* **Segurança:** O visitante não recebe nenhum JSON Web Token (JWT) do backend e não possui credenciais salvas no cabeçalho Authorization das chamadas de API.
* **Atlas MongoDB:** Qualquer tentativa de chamada de escrita para endpoints mutantes do backend sem token é bloqueada de forma nativa pelas políticas do Express e pelo middleware `blockAnonymousMutationsInPilot` com status **423 Locked** (PILOT_READONLY).
* **Fuga de Cota Local:** As simulações de relatórios de missões do visitante não realizam uploads de imagens Base64 no `localStorage` do navegador, evitando estouro da cota de 5MB do cliente.

---

## 2. Aluno Autenticado por Código de Acesso
* **Vetor de Ataque Mitigado:** O login legado por `squadId` livre (que causava sequestro de bancadas por cliques diretos na tela) está 100% desativado no backend em modo piloto (`PILOT_MODE=true`), respondendo com **423 Locked**.
* **Mapeamento Criptográfico:** O login de aluno agora é estritamente autenticado pelo endpoint `/api/auth/squad/login-by-code`, validando a assinatura de um `accessCode` de 8 caracteres alfanuméricos contra o hash `accessCodeHash` salvo no MongoDB Atlas, com verificação `timingSafeEqual` contra ataques de canal lateral (timing attacks).
* **Autorização:** Apenas alunos reais que digitarem o código correto receberão o token JWT de bancada. O token é de escopo limitado, garantindo que a bancada edite ou grave progresso exclusivamente nas suas próprias rotas.

---

## 3. Professor e Gestão de Bancadas
* **Criação de Bancadas:** A Área do Professor (`/professor`) mantém a capacidade de professores autenticados criarem e apagarem bancadas sob o modelo RBAC.
* **Geração do PIN:** Quando a bancada é gerada, o sistema retorna o código plaintext de 8 caracteres uma única vez na interface do professor para cópia.
* **Higiene Criptográfica:** O código plaintext nunca é guardado em logs do servidor, banco ou metadados de listagem pública de turmas, sendo persistido apenas como hash SHA-256 no banco de dados.

---

## 4. Bloqueio Geral de Uploads e Minimizações
* A flag de segurança `PILOT_ALLOW_UPLOADS=false` está ativa e operacional no servidor de produção, bloqueando tentativas de envio de fotos ou mídias pesadas por estudantes ou invasores durante a fase de piloto.
* Os metadados de bancadas retornados no endpoint público de onboarding não expõem a lista de membros ou nomes dos alunos sem autenticação prévia por código de acesso.

---

_Homologação de cibersegurança concluída com sucesso em 2026-07-01._
