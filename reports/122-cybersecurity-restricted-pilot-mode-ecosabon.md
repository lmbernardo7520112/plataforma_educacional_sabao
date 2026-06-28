# R122 — Relatório de Cybersecurity: Piloto Restrito

## 1. Proteção de Credenciais e Arquivos `.env`
- **Verificação**: Executada a busca de arquivos `.env` no repositório. Apenas `server/.env.example` está rastreado na árvore do Git. O arquivo `.env` com configurações locais permanece no `.gitignore` e não foi versionado.
- As variáveis novas de controle (`PILOT_MODE`, `PILOT_ALLOWED_TEACHER_EMAILS`, `PILOT_ALLOW_SQUAD_LOGIN`) foram adicionadas como placeholders seguros ao `.env.example` sem expor dados reais de Leonardo, Nadja ou chaves privadas.

## 2. Hardcode de Secrets e E-mails
- **Auditoria de Código**: Varremos o código com expressões regulares de busca por segredos (`SECRET`, `JWT`, `PASSWORD`) e referências a nomes do piloto (`leonardo`, `nadja`).
- Nenhum e-mail institucional ou segredo de produção real foi hardcodado no código-fonte.
- Os e-mails e nomes que aparecem nos seed files e arquivos de testes (ex: `leonardo@example.com`, `nadja@example.com`, `admin@ecosabon.com`) são fictícios e sintéticos.

## 3. Segurança do Token JWT
- O payload de login do professor passou a incluir o campo `email` de forma encriptada na assinatura JWT.
- O middleware `requireAuth` realiza a descriptografia em tempo de execução O(1) e confere o e-mail contra a allowlist de forma instantânea, permitindo a revogação de tokens ativos caso o e-mail seja removido da allowlist do servidor.

## 4. Política de CORS
- A política de CORS do servidor Express restringe as conexões HTTP de entrada, aceitando apenas requisições da allowlist de origens configurada no `ALLOWED_ORIGINS` (que apontará para o domínio público da Vercel). O uso do caractere curinga `*` está expressamente desabilitado em modo de produção.

## 5. Storage de Tokens no Client
- Constatamos que o client utiliza `localStorage` para armazenar os tokens de sessão do professor e da bancada. Este comportamento já existia e não foi alterado na fase. O risco de roubo de token por XSS é mitigado pelas políticas robustas de Content Security Policy (CSP) ativadas na plataforma e no web-book.

## 6. Logs de Sistema
- A auditoria de logs confirma que o `requestLogger` Express não registra cabeçalhos de autorização (tokens JWT), senhas de login, corpos de requisições de autenticação ou a allowlist em texto claro, impedindo vazamentos secundários nos arquivos de logs do servidor.

## 7. Auditoria de Vulnerabilidade de Dependências
- **Resultado do `npm audit`**: 1 vulnerabilidade de severidade baixa identificada no pacote de desenvolvimento `esbuild` (limitada ao ambiente Windows, não nos afeta em ambiente Linux e não compromete a produção).
