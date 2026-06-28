# R128 — Relatório de Fechamento: Merge do Sandbox do Piloto Restrito

## 1. Identificação do Merge
- **PR**: #45
- **Branch Origem**: `test/ecosabon-restricted-pilot-sandbox`
- **Branch Destino**: `main`
- **Hash do Merge**: `7c2b333`
- **Data**: 2026-06-28
- **Estado da Main**: Saudável (build limpo e todos os testes automatizados passando).

## 2. Escopo Mergeado
O merge consolidou exclusivamente os seguintes relatórios documentais no diretório `reports/`:
- `reports/124-revisao-restricted-pilot-mode-ecosabon-relatorio.md` (relatório de revisão do PR #44)
- `reports/126-sandbox-local-restricted-pilot-mode-ecosabon.md` (relatório da simulação em sandbox local)
- `reports/127-decisao-sandbox-piloto-restrito-ecosabon.md` (decisão e homologação da sandbox)

**Garantia de Integridade**: Nenhuma alteração de código técnico, arquivo de configuração (`package.json`, `.env`, etc.) ou arquivo do web-book/plataforma foi introduzida neste merge.

## 3. Resultados Consolidados da Sandbox
A simulação local provou o correto funcionamento das invariantes do modo piloto restrito:
- **`PILOT_MODE=true`**: Bloqueia de forma segura onboarding e login fora da allowlist sintética (`leonardo@example.com`, `nadja@example.com`), retornando status `403 Forbidden`.
- **Validação de Cadastro e Login**: Permite o acesso regular para os e-mails autorizados na allowlist.
- **Login de Bancadas (Squads)**: Bloqueado por padrão em modo piloto (`PILOT_ALLOW_SQUAD_LOGIN=false`) e liberado dinamicamente somente quando a flag é explicitamente alterada para `true`.
- **Revogação Instantânea O(1)**: O middleware `requireAuth` realiza a checagem no banco contra o e-mail embutido no token JWT, garantindo a invalidação imediata de sessões ativas caso o professor seja removido da allowlist.
- **Modo Legado Preservado**: Desativando o piloto (`PILOT_MODE=false`), a plataforma retorna ao comportamento legado padrão.
- **MongoDB Docker Local**: Preservado intacto com dados de desenvolvimento sintéticos no container `ecosabon-mongo` na porta `27019`.

## 4. Auditoria de Segurança e Cybersecurity
- **Exposição de Segredos**: Total ausência de arquivos `.env` ou dados sensíveis versionados no histórico Git.
- **JWT & Tokens**: Confirmado que nenhum token JWT completo (`eyJ...`) ou cabeçalhos de autorização reais foram armazenados nos relatórios ou no repositório.
- **Privacidade**: Nenhum e-mail real ou credencial dos professores Leonardo e Nadja foi hardcodado no código ou exposto nos documentos.

## 5. Status de Qualidade e Testes (Pós-Merge)
A validação pós-merge na branch `main` executou a suíte completa de testes e build com sucesso absoluto:
- **ebook-ecosabon-prototipo (Web-book)**: 124 testes bem-sucedidos.
- **ecosabon-client (Client Domain)**: 8 testes bem-sucedidos.
- **ecosabon-curso-interativo (Workspace)**: 47 testes bem-sucedidos.
- **server (Backend Workspace)**: 59 testes bem-sucedidos.
- **Total**: 238 testes verdes (0 falhas).
- **Compilação do Client Vite**: Concluída com sucesso (`npm run build -w client`).

## 6. Garantias Operacionais
Nesta fase documental de homologação:
- ❌ Nenhum deploy foi realizado em nuvem (Vercel ou Render).
- ❌ Nenhum serviço externo ou cluster MongoDB Atlas foi provisionado.
- ❌ Nenhuma migração ou seed em banco de produção foi executada.
- ❌ O web-book e o GitHub Pages permaneceram intocados.

## 7. Decisão de Homologação

`DECISÃO: FDP-RESTRICTED-PILOT-SANDBOX MERGEADO. SANDBOX LOCAL VALIDADO COM PILOT_MODE=true. ACESSO RESTRITO POR ALLOWLIST FUNCIONOU. NENHUM DEPLOY EXECUTADO. NENHUM SERVIÇO EXTERNO CRIADO. NENHUM TOKEN/JWT VERSIONADO.`
