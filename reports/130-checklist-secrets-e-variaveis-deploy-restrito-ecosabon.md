# R130 — Checklist de Secrets e Variáveis: Deploy Restrito EcoSabon

## 1. Matriz de Variáveis de Ambiente
A tabela abaixo lista todas as variáveis de ambiente necessárias para a execução segura do piloto restrito na nuvem.

| Variável | Escopo | Tipo | Exigência | Descrição | Exemplo / Placeholder |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `NODE_ENV` | Backend (Render) | Pública | Obrigatória | Define o modo de execução da aplicação. Deve ser configurado para produção. | `production` |
| `PORT` | Backend (Render) | Pública | Opcional | Porta do servidor Express (gerida automaticamente pelo Render). | `3000` |
| `DATABASE_URL` | Backend (Render) | Secreta | Obrigatória | Connection String para o banco de dados MongoDB no Atlas. | `mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>/ecosabon_pilot?retryWrites=true&w=majority` |
| `JWT_SECRET` | Backend (Render) | Secreta | Obrigatória | Chave de criptografia de tokens JWT. Deve ser gerada de forma forte e aleatória. | `<JWT_SECRET_SECURE_RANDOM>` |
| `ALLOWED_ORIGINS` | Backend (Render) | Pública | Obrigatória | Origem autorizada no CORS (URL do frontend na Vercel). | `https://ecosabon.vercel.app` |
| `PILOT_MODE` | Backend (Render) | Pública | Obrigatória | Flag que ativa as regras estritas do piloto restrito. | `true` |
| `PILOT_ALLOWED_TEACHER_EMAILS` | Backend (Render) | Secreta | Obrigatória | Lista separada por vírgula dos e-mails autorizados para professores. | `<LEONARDO_EMAIL_REAL>,<NADJA_EMAIL_REAL>` |
| `PILOT_ALLOW_SQUAD_LOGIN` | Backend (Render) | Pública | Obrigatória | Controla se logins de equipes de estudantes estão habilitados. | `false` |
| `RATE_LIMIT_WINDOW_MS` | Backend (Render) | Pública | Opcional | Janela de tempo de rate limit em milissegundos. | `900000` |
| `RATE_LIMIT_MAX` | Backend (Render) | Pública | Opcional | Número máximo de requisições por IP na janela. | `100` |

---

## 2. Onde Configurar Cada Recurso

### 2.1 Painel do Render (Web Service Backend)
As variáveis listadas acima devem ser inseridas exclusivamente no painel do Web Service do Render:
- Caminho: `Render Dashboard -> Select Service -> Settings -> Environment Variables`.
- Assegurar que **nenhuma** variável secreta como `JWT_SECRET`, `DATABASE_URL` ou `PILOT_ALLOWED_TEACHER_EMAILS` seja exposta no código ou enviada para repositórios Git.

### 2.2 Painel do MongoDB Atlas (Banco de Dados)
Não há injeção de variáveis de ambiente no Atlas, mas sim configuração de credenciais e acessos:
- **Database Access**: Criar usuário exclusivo (ex: `ecosabon_pilot_srv`) com permissões restritas de leitura/escrita no banco `ecosabon_pilot`.
- **Network Access**: IP Access List deve autorizar a conexão de rede vinda do Render. Provisoriamente para a camada free, usa-se `0.0.0.0/0`. A configuração `0.0.0.0/0`, se inevitável em camada gratuita por IP dinâmico, deve ser tratada como exceção provisória do spike, nunca como configuração ideal de produção. Deve vir acompanhada de usuário de privilégio mínimo, senha forte (ex: gerada com 32+ caracteres alfa-numéricos), monitoramento e plano de restrição posterior.

### 2.3 Painel da Vercel (Frontend Client)
O cliente React consome a API através de rotas relativas (`/api`), cuja resolução é resolvida pelo arquivo `vercel.json` (proxy transparente).
- **Sem Segredos**: Nenhuma variável de ambiente de allowlist ou segredos deve ser configurada na Vercel, mitigando riscos de vazamento em código cliente exposto no browser.

---

## 3. Diretriz Absoluta: Nunca Versionar
> [!IMPORTANT]
> - **NÃO** commitar arquivos `.env` com valores reais.
> - **NÃO** versionar e-mails reais de professores ou estudantes.
> - **NÃO** salvar senhas ou tokens JWT reais em arquivos markdown de relatórios ou do código-fonte.
> - Os arquivos locais `.env` gerados no sandbox devem ser listados obrigatoriamente no `.gitignore`.

---

## 4. Roteiro de Validação

### 4.1 Validação Pré-Deploy
Antes de iniciar a criação de recursos na nuvem:
1. Executar `git status` e verificar se não há arquivos `.env` ou resíduos operacionais listados como modificados ou não rastreados prontos para envio.
2. Rodar a verificação de segredos local com ripgrep para atestar que os e-mails reais de Leonardo e Nadja não foram escritos no código.
3. Executar a suíte de testes (`npm test`) e certificar-se de que todos os 238 testes estão verdes.

### 4.2 Validação Pós-Deploy
Após a publicação de ambos os serviços:
1. Acessar a URL do backend na nuvem `/ping` e atestar o status `200 OK`.
2. Acessar a URL do frontend na Vercel e verificar se a interface renderiza sem erros de carregamento de scripts.
3. Tentar efetuar login no frontend com e-mail não cadastrado na allowlist e certificar-se de que a resposta é `403 Forbidden` com aviso amigável.
4. Efetuar o Onboarding controlado com os e-mails autorizados em ambiente seguro de produção e validar a geração do token JWT.
5. Iniciar uma chamada autorizada e validar a correta comunicação com o banco Atlas na coleção de teste do piloto.
