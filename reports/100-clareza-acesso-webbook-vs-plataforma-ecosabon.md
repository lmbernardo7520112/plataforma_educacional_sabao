# R100 — Clareza de Acesso: Web-book vs. Plataforma EcoSabon

## 1. Objetivo
O objetivo deste relatório é formalizar a clareza de acesso e a arquitetura de implantação do projeto EcoSabon, eliminando quaisquer ambiguidades entre o web-book publicado no GitHub Pages e o ecossistema completo da Plataforma EcoSabon.

## 2. Estado Atual
- **Web-book**: Construído e implantado com sucesso no GitHub Pages sob a branch isolada `gh-pages`. Ele serve como o produto-vitrine do design system e da experiência pedagógica (Premium 3D).
- **Plataforma (API/Banco/Client)**: Não implantados em servidores públicos. Permanecem contidos no repositório para execução no ambiente de desenvolvimento local.

## 3. URL Pública Canônica
O endereço oficial de divulgação e acesso ao web-book é:
- `https://lmbernardo7520112.github.io/plataforma_educacional_sabao/`

## 4. Explicação do Fragmento `#mod-2`
- **O que é**: O fragmento `#mod-2` (ou qualquer âncora antecedida de `#` na URL, como `#mod-plataforma`) é um identificador de âncora no cliente (*hash route*). É interpretado inteiramente pelo navegador no lado do cliente para rolar e focar na seção HTML correspondente (no caso, o Módulo 2 ou a seção correspondente).
- **Tratamento de Servidor**: O navegador **não envia** o conteúdo após o caractere `#` para os servidores do GitHub Pages. Portanto, sua presença na barra de endereços não é tratada por rotas de backend nem representa um redirecionamento ou erro de servidor (404).
- **Uso Correto**: O link canônico para divulgação inicial do projeto deve ser a URL raiz (sem hash). O uso de URLs contendo fragmentos deve ser restrito a deep links pedagógicos que apontam o leitor para seções específicas do e-book.

## 5. O que está Publicado
- **Vitrine Estática**: O web-book interativo contendo os textos didáticos, guias laboratoriais, infográficos interativos, o design system Dark Science e o Palco Molecular Premium 3D com Three.js.
- **Formato**: Páginas HTML, CSS e JavaScript estáticas otimizadas para carregamento offline rápido.
- **Hospedagem**: Servidores de borda (CDN) do GitHub Pages.

## 6. O que NÃO está Publicado
- **Backend**: O servidor API em Express (`server/`) e sua lógica RBAC.
- **Frontend Multiusuário**: A interface React client (`client/`) de painel de turmas e controle de bancadas.
- **Banco de Dados**: Instâncias de banco relacional ou não-relacional (MongoDB).
- **Secrets/Autenticação Pública**: Nenhuma chave de criptografia de JWT ou token de login de produção está ativa na internet.

## 7. Como Acessar o Web-book
- **Público**: Através da URL pública canônica listada na seção 3.
- **Local (Desenvolvimento)**:
  - Comando: `npm run preview --prefix ebook-ecosabon-prototipo -- --host 127.0.0.1 --port 4173`
  - URL local: `http://127.0.0.1:4173/plataforma_educacional_sabao/`

## 8. Como Acessar a Plataforma Localmente
Para rodar e testar o sistema completo no ambiente de desenvolvimento:
1. **Requisitos**: Node.js (v20+), MongoDB em execução local (`mongodb://localhost:27017/ecosabon`).
2. **Variáveis de Ambiente**: Copiar o arquivo de exemplo `server/.env.example` para `server/.env` e preencher com chaves de desenvolvimento (ex: `JWT_SECRET`).
3. **Build Compartilhado**: Compilar a camada isomórfica compartilhada executando:
   `npm run build:shared` (ou `npm run prestart`)
4. **Popular Banco de Dados**: Criar os professores, bancadas de teste e missões no MongoDB executando:
   `npm run seed:turmas`
5. **Iniciar Servidores**: Rodar concorrentemente os servidores de front-end (React) e backend (API):
   `npm start`
   - O Client estará ativo em `http://localhost:5173/`
   - A API estará respondendo em `http://localhost:3000/`

## 9. O que seria Necessário para Deploy Público da Plataforma
Para disponibilizar a plataforma multiusuário real na web, seriam necessários os seguintes passos (não executados nesta fase):
- **Hospedagem da API**: Deploy da aplicação Node/Express em um provedor de nuvem (AWS, Heroku, Render, DigitalOcean).
- **Hospedagem do Client**: Deploy do build de produção do frontend React (Vite) em uma CDN estática (Vercel, Netlify, Cloudflare Pages).
- **Banco de Dados em Produção**: Provisionamento de um cluster MongoDB Atlas gerenciado seguro.
- **Configuração de HTTPS/Domínio**: Emissão de certificados SSL para o domínio da API e do Client.
- **Segurança de Rede**: Configuração estrita de políticas de CORS, segurança de cookies (Secure, SameSite=Strict), proteção de headers com `Helmet` e limites de requisição por IP.

## 10. Riscos de Confusão Comunicacional
Nomear o deploy do GitHub Pages como "Plataforma" induz o leitor ao erro de procurar rotas autenticadas, banco de dados persistente e dados dinâmicos multiusuário em um servidor puramente estático. Isso gera falsas expectativas de uso prático nas escolas sem a prévia implantação do ecossistema do servidor.

## 11. Governança Linguística

### Linguagem Recomendada (Correta):
- “Web-book Premium 3D publicado no GitHub Pages”;
- “Vitrine estática da Plataforma EcoSabon”;
- “Plataforma EcoSabon contida para execução local no repositório de desenvolvimento”.

### Linguagem Proibida (Incorreta):
- “Plataforma completa publicada no GitHub Pages”;
- “Servidor/Backend disponível online no Pages”;
- “Sistema multiusuário escolar acessível publicamente”.

## 12. Decisão
`DECISÃO: A URL DO GITHUB PAGES DÁ ACESSO AO WEB-BOOK ECOSABON COMO VITRINE ESTÁTICA. A PLATAFORMA ECOSABON COMPLETA NÃO ESTÁ PUBLICADA. O FRAGMENTO #MOD-2 É APENAS UMA ÂNCORA INTERNA DO WEB-BOOK.`
