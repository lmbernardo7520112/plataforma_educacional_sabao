# R166 — Postmortem do Primeiro Deploy de Produção — EcoSabon

## 1. Resumo Executivo
No processo de deploy da Plataforma EcoSabon, ocorreram incidentes relacionados a roteamento SPA (404), loops de redirecionamento de segurança (401), e falhas de compilação TypeScript monorepo na Vercel. Todos os problemas foram mitigados e corrigidos com sucesso, restabelecendo a operação em produção da Área do Aluno e do Professor.

## 2. Relação de Incidentes

### Incidente 1: Compilação TypeScript de Servidor na Vercel
- **Sintoma**: O deploy do frontend falhava na Vercel com erros de compilação TS de dependências do servidor.
- **Causa Raiz**: A Vercel estava configurada com o diretório raiz na pasta errada do monorepo, tentando compilar arquivos que não eram do frontend.
- **Impacto**: Bloqueio completo do deploy do frontend.
- **Correção**: Ajustado o diretório raiz nas configurações da Vercel para o root do monorepo e definido o comando de build correto do client.

### Incidente 2: Erro 404 em URLs Deep Link (Vercel)
- **Sintoma**: Usuários que tentavam recarregar páginas como `/onboarding` ou `/dashboard` recebiam erro 404 da Vercel.
- **Causa Raiz**: O servidor de arquivos estáticos da Vercel não possui fallback automático para SPA, interpretando rotas da SPA como subdiretórios físicos.
- **Impacto**: Navegação quebrava ao recarregar a tela no navegador.
- **Correção**: Criada regra de rewrite em `vercel.json` encaminhando todas as requisições que não sejam de API para `index.html`.

### Incidente 3: Loop de Redirecionamento da "Área do Aluno"
- **Sintoma**: Ao tentar entrar na Área do Aluno, o usuário era ejetado de volta para `/`.
- **Causa Raiz**: O Axios interceptor no frontend redirecionava o usuário para `/` sob status `401 Unauthorized`. Como as rotas públicas necessárias para carregar o onboarding do aluno exigiam autenticação docente (`requireAuth`), o request falhava com 401, iniciando o redirecionamento.
- **Impacto**: Bloqueio total do fluxo do aluno no piloto.
- **Correção**: Remoção das proteções docentes dos endpoints públicos e, em seguida, criação de endpoints públicos higienizados `/api/onboarding/*` entregando DTOs mínimos de turmas e bancadas.

### Incidente 4: Ausência de Dados Sintéticos e Incompatibilidade de Nomes
- **Sintoma**: Tela de onboarding carregava com dropdowns vazios ou a lista de alunos ficava em branco.
- **Causa Raiz**: Banco de dados Atlas vazio e divergência de nomenclatura entre o seed da turma (`3ºANO A` sem espaço) e o arquivo de estudantes `turmas_alunos.json` (`3º ANO A` com espaço).
- **Impacto**: Alunos não conseguiam criar ou editar bancadas.
- **Correção**: Execução de seed piloto controlado no MongoDB Atlas e normalização/higienização de nomes das turmas com função `cleanName` (remover espaços) no backend.

---

## 3. Aprendizados Importantes
- **Configurações de CD de Monorepos**: A configuração correta dos comandos de build e raiz é crítica antes do primeiro deploy.
- **Navegadores Reais pós-Deploy**: Cenários com janelas limpas/anônimas são cruciais no teste local para identificar erros de fluxo de autenticação ausente.
- **Diferenças de DNS/Roteamento**: CDN estática não se comporta de forma idêntica ao servidor de desenvolvimento local.
- **Hardening Preventivo**: Rotas públicas de onboarding devem sempre retornar DTOs mínimos higienizados em vez de expor dados do banco para prevenir vazamento.
