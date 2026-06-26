# R99 — Relatório de Deploy do Web-book no GitHub Pages

## 1. Objetivo
O objetivo deste documento é relatar a execução da fase DPC-DEPLOY para a publicação da vitrine estática do web-book EcoSabon no GitHub Pages.

## 2. Commit / Base da Main
- **Branch Base**: `main`
- **Hash da Main**: `fac58f6`

## 3. Branch de Publicação
- `gh-pages` (branch dedicada, contendo isoladamente os arquivos compilados do build de produção)

## 4. Hash do Commit em gh-pages
- `e37c3b6`

## 5. Comandos Executados
A publicação foi efetuada utilizando o método de worktree isolada para evitar arquivos indesejados na branch principal:
1. `npm run build --prefix ebook-ecosabon-prototipo -- --base=/plataforma_educacional_sabao/`
2. `touch ebook-ecosabon-prototipo/dist/.nojekyll`
3. `git worktree add --detach temp_gh_pages`
4. `cd temp_gh_pages && git checkout --orphan gh-pages && git rm -rf .`
5. `cp -R ../ebook-ecosabon-prototipo/dist/. .`
6. `git add . && git commit -m "deploy: publish EcoSabon webbook to GitHub Pages"`
7. `git push origin HEAD:gh-pages`
8. `git worktree remove temp_gh_pages --force`
9. `rm -rf ebook-ecosabon-prototipo/dist`

## 6. Build Pages com base=/plataforma_educacional_sabao/
- O build foi gerado com sucesso especificando o caminho da base do subdiretório do repositório no GitHub Pages. Todos os links internos e referências aos arquivos no `index.html` compilado foram gerados sob o prefixo `/plataforma_educacional_sabao/`.

## 7. Arquivo .nojekyll
- O arquivo `.nojekyll` foi adicionado à raiz do build compilado. Isso garante que o motor do Jekyll do GitHub Pages não filtre pastas iniciadas por underline (como `_assets` ou subpastas de compilação do Vite).

## 8. URL Pública
- **Endereço**: `https://lmbernardo7520112.github.io/plataforma_educacional_sabao/`

## 9. Status da URL
- **Ativo (200 OK)**: O repositório foi alterado para público e a configuração do GitHub Pages foi habilitada com sucesso. A URL está respondendo normalmente e carregando os recursos do e-book.

## 10. Validação Local
- Aprovada. O preview local foi executado na porta 4173 e confirmou o carregamento integral dos estilos e scripts locais estruturados sob a nova base de caminhos de assets.

## 11. Validação Pública
- **Aprovada**: Testes efetuados via curl confirmaram a resposta `HTTP/2 200 OK` da URL e integridade dos assets.

## 12. QR Code
- **Status**: Não gerado localmente.
- **Raciocínio**: Embora a URL pública esteja validada e estável, o ambiente local não dispõe das bibliotecas Python (`qrcode`) ou utilitários CLI (`qrencode`) instalados para desenhar e salvar a imagem do código bidimensional. Recomenda-se a geração do QR Code através de um serviço externo ou manualmente pelo usuário a partir da URL.
- **Rastreamento**: Confirmou-se a inexistência de arquivos QR Code versionados.

## 13. Testes Pós-Deploy
- Aprovados. Executados com êxito todos os 219 testes da plataforma.

## 14. Cibersegurança
- **CSP**: Política de CSP estática ativa na meta tag do HTML limitando conexões a `'self'`.
- **Zero Recursos Externos**: Nenhuma conexão com Google Fonts ou CDNs ativas; fontes locais configuradas com sucesso.
- **Proteção de Secrets**: Verificado por scanning que nenhuma credencial ou variável `.env` foi vazada ou copiada ao diretório publicado.
- **Separação**: Pasta de compilação `dist/` nunca foi commitada na branch `main`.

## 15. Limitações
- O deploy no GitHub Pages corresponde a uma vitrine estática e autônoma do web-book interativo (Premium 3D). Ele não hospeda o servidor backend (`server/`) e não representa a validação real em ambiente de produção da Plataforma EcoSabon completa.
- A URL pública estável existirá apenas enquanto a branch `gh-pages` e a configuração correspondente forem mantidas no GitHub.

## 16. Decisão
`DECISÃO: DPC-DEPLOY CONCLUÍDA. WEB-BOOK ECOSABON PUBLICADO NO GITHUB PAGES COMO VITRINE ESTÁTICA. URL VALIDADA. QR CODE NÃO FOI GERADO LOCALMENTE DEVIDO À INDISPONIBILIDADE DE BIBLIOTECAS LOCAIS (QRCODE/QRENCODE). PLATAFORMA/BACKEND INTOCADOS.`
