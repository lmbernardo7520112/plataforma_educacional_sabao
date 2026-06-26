# R95 — Tratamento de Alertas de Cibersegurança e Dependências Pré-Deploy

## 1. Objetivo
O objetivo deste documento é relatar a execução da fase DPC-SEC-FIX para mitigação e tratamento controlado dos alertas de cibersegurança identificados na DPC-AUDIT antes de qualquer publicação pública ou deploy no GitHub Pages.

## 2. Contexto
No âmbito da preparação para o deploy público da vitrine do web-book interativo Premium 3D do EcoSabon, foi conduzida uma auditoria ativa de segurança (DPC-AUDIT). Os principais alertas envolviam vulnerabilidades de dependências do servidor/monorepo, a ausência de um pipeline local de secret scanning e a necessidade de adicionar uma política de CSP estática no web-book.

## 3. Vulnerabilidades Antes
Na auditoria inicial da fase DPC-AUDIT, foram detectadas:
- **ebook-ecosabon-prototipo**: 0 vulnerabilidades.
- **server / raiz**: 11 vulnerabilidades (incluindo severidade alta em pacotes como `qs`, `multer`, `react-router` e severidade crítica em `shell-quote`).

## 4. Vulnerabilidades Depois
Após a execução dos comandos de correção controlada:
- **ebook-ecosabon-prototipo**: 0 vulnerabilidades.
- **server / raiz**: 1 vulnerabilidade de severidade baixa (no pacote `esbuild`, que afeta apenas o servidor de desenvolvimento quando executado no sistema operacional Windows).

## 5. Correções Aplicadas
As correções foram aplicadas de forma estritamente controlada utilizando:
- `npm audit fix` na raiz (o que automaticamente propagou as atualizações compatíveis sem breaking changes nos workspaces).
- Nenhuma correção forçada (`npm audit fix --force`) foi utilizada, evitando qualquer alteração incompatível ou quebra nas APIs.

## 6. Dependências Alteradas
O arquivo `package-lock.json` registrou as seguintes atualizações seguras de pacotes transitivos e diretos:
- `multer`: atualizado de `2.1.1` para `2.2.0`
- `nanoid`: atualizado de `3.3.11` para `3.3.15`
- `node-releases`: atualizado de `2.0.36` para `2.0.50`
- `postcss`: atualizado de `8.5.8` para `8.5.15`
- `qs`: atualizado de `6.14.2` para `6.15.3`
- `react-router` & `react-router-dom`: atualizados de `7.13.2` para `7.18.0`
- `shell-quote`: atualizado de `1.8.3` para `1.8.4`
- `side-channel`: atualizado de `1.1.0` para `1.1.1`
- `vite`: atualizado de `6.4.1` para `6.4.3`

## 7. Secret Scanning
- **Auditoria Local**: O rastreamento local via Gitleaks Docker detectou 14 ocorrências de falso-positivo, todas localizadas em arquivos de internacionalização do software Kotobee Author (`tools/kotobeeauthor/extracted/...`) e em referências pedagógicas/documentação. Nenhum segredo ou chave privada de produção real foi encontrado no código fonte funcional.
- **Grep Manual**: Buscas direcionadas confirmaram que chaves de API, segredos e tokens sensíveis não estão versionados. O arquivo `.env` do servidor está devidamente listado no `.gitignore` e não rastreado no repositório.
- **Integração no CI**: Foi criado um workflow em `.github/workflows/secret-scanning.yml` utilizando o Gitleaks oficial com o token padrão do GitHub (sem necessidade de segredos adicionais) para verificar novos commits e PRs de forma autônoma.

## 8. CSP (Content Security Policy)
Uma política de segurança CSP estática foi inserida diretamente em `ebook-ecosabon-prototipo/index.html` via tag `<meta>`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests" />
```
- **style-src 'unsafe-inline'**: Permite estilos em linha necessários para a renderização visual dinâmica e componentes interativos do web-book.
- **Google Fonts**: Domínios `https://fonts.googleapis.com` e `https://fonts.gstatic.com` foram permitidos para preservar a tipografia Premium do e-book.
- **connect-src 'none'**: Garante que o web-book permaneça estático e sem comunicação de rede externa.

## 9. Testes
A suíte completa de testes locais foi executada e passou com sucesso absoluto:
- **web-book**: 124 / 124 testes aprovados
- **client**: 8 / 8 testes aprovados
- **curso interativo**: 47 / 47 testes aprovados
- **server**: 40 / 40 testes aprovados
- **Total**: 219 / 219 testes aprovados.

## 10. Build
O build de produção do web-book (`npm run build --prefix ebook-ecosabon-prototipo`) foi validado e gerado perfeitamente sem falhas.

## 11. Warnings Residuais
- 1 vulnerabilidade de severidade baixa relacionada ao `esbuild` em ambiente de desenvolvimento Windows. Não há impacto de segurança sobre os pacotes de produção ou o build estático gerado para o GitHub Pages.

## 12. Blockers
- **Nenhum blocker** de cibersegurança ou dependências identificado nesta fase.

## 13. Decisão
Com a mitigação dos warnings críticos e altos, a introdução do secret scanning e a consolidação da CSP estática, o projeto está seguro e validado.
**Recomendação**: Avançar para o DPC-DEPLOY.
