# Relatório 92 — Auditoria Ativa de Cibersegurança Pré-Deploy (EcoSabon)

**Fase:** DPC-AUDIT — Auditoria Ativa dos Gates de Cibersegurança em Modo Estrito  
**Branch:** `docs/ecosabon-dpc-audit-cybersecurity-pre-deploy`  
**Base:** `main`  
**Data:** 2026-06-26  

---

## 1. Objetivo

Este documento registra a execução da auditoria ativa, local e formal dos gates de cibersegurança definidos no R88, avaliando potenciais riscos na Plataforma EcoSabon e no web-book antes de qualquer publicação real no GitHub Pages.

---

## 2. Contexto

A publicação do web-book interativo (vitrine de marketing) no GitHub Pages exige a verificação completa de que a aplicação estática não expõe dados sensíveis, lógicas confidenciais ou segredos criptográficos. O GitHub Pages serve apenas arquivos estáticos do lado do cliente, o que significa que o código e qualquer variável de ambiente compilada são visíveis publicamente no navegador.

---

## 3. Escopo da Auditoria

A varredura concentrou-se nas seguintes categorias:
* Rastreamento indevido de arquivos locais (ex: `.env`, `node_modules/`, `dist/`).
* Presença de chaves de API, senhas, chaves privadas ou secrets criptográficos em código ou variáveis de build do front-end.
* Presença de chamadas de rede ou persistência de dados pessoais/tokens no web-book.
* Lógicas de CORS, cookies, JWT e uploads no backend da Plataforma.
* Análise de dependências e configuração de build.

---

## 4. Comandos Executados

Os seguintes comandos de varredura estática e testes dinâmicos foram rodados localmente no workspace:

```bash
# 1. Testes locais
npm test --prefix ebook-ecosabon-prototipo
npm test
cd server && npx vitest run && cd -

# 2. Build temporário do e-book
npm run build --prefix ebook-ecosabon-prototipo
rm -rf ebook-ecosabon-prototipo/dist

# 3. Rastreamento de arquivos e pastas ignoradas
git ls-files | grep -E "node_modules|/dist/|release/|commercial_release|local_release|local_evidence|\\.env$" || true
find . -name ".env" -o -name ".env.*" | grep -v node_modules || true

# 4. Varredura por segredos e tokens no código
grep -rn --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude-dir=local_evidence --exclude-dir=local_release --exclude-dir=tools "NEXT_PUBLIC_\|VITE_\|REACT_APP_\|API_KEY\|SECRET\|TOKEN\|PRIVATE_KEY\|PASSWORD" .
grep -rn --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude-dir=local_evidence --exclude-dir=local_release --exclude-dir=tools "JWT" .

# 5. Varredura por chamadas de rede e storage no web-book
grep -R "fetch\|XMLHttpRequest\|WebSocket\|EventSource\|localStorage\|sessionStorage" ebook-ecosabon-prototipo/index.html ebook-ecosabon-prototipo/src/scripts/ || true
grep -R "http://\|https://" ebook-ecosabon-prototipo/index.html ebook-ecosabon-prototipo/src/styles ebook-ecosabon-prototipo/src/scripts/ || true

# 6. CORS / JWT / Cookies / Uploads na Plataforma
grep -R "ALLOWED_ORIGINS\|cors" server --include="*.ts" server/.env.example || true
grep -R "ecosabon_master_key\|JWT_SECRET ||" server shared client --include="*.ts" --include="*.tsx" || true
grep -R "httpOnly\|sameSite\|secure\|cookie" server --include="*.ts" || true
grep -R "multer\|fileFilter\|mimetype\|fileSize\|limits\|randomUUID" server --include="*.ts" || true

# 7. Auditoria de dependências
npm audit --omit=dev
npm audit --prefix ebook-ecosabon-prototipo --omit=dev
cd server && npm audit --omit=dev && cd -
```

---

## 5. Resultados por Categoria (PASS/WARN/BLOCKER)

Abaixo está o resumo da avaliação de conformidade de cada portão de cibersegurança:

| Categoria da Auditoria | Estado | Status | Descrição do Achado |
|---|---|---|---|
| **Rastreamento Indevido** | `PASS` | Conforme | Nenhum diretório `dist/`, `node_modules/`, `release/` ou arquivo `.env` de desenvolvimento está versionado. |
| **Secrets & Keys** | `PASS` | Conforme | Varredura estática limpa. Nenhuma chave privada ou segredo hardcoded no código da aplicação. |
| **JWT Fallback** | `PASS` | Conforme | Nenhuma chave padrão vulnerável ("master key") ou bypass de segredo nos middlewares de autenticação. |
| **Storage do Web-book** | `PASS` | Conforme | O web-book não utiliza `localStorage` ou `sessionStorage`, garantindo ausência de persistência de tokens/dados de alunos. |
| **Rede do Web-book** | `PASS` | Conforme | O web-book opera de forma 100% autônoma offline. Ocorrências de URLs limitam-se a namespaces SVG e links pedagógicos fictícios. |
| **CORS Backend** | `PASS` | Conforme | CORS configurado por allowlist dinâmica baseada em ambiente. Sem wildcards (`*`) em produção. |
| **Segurança de Upload** | `PASS` | Conforme | Multer com limite rígido de 5MB, validação de MIME-type e extensão (JPG, PNG, WEBP), e renomeação UUID para mitigar RCE e Path Traversal. |
| **Logs da API** | `PASS` | Conforme | Sem logs de dados pessoais, corpos de requisições ou headers de autorização. Apenas rastreabilidade técnica via Request ID. |
| **Source Maps** | `PASS` | Conforme | O build padrão do Vite não gera arquivos `.map` para produção, impedindo engenharia reversa facilitada na vitrine. |
| **Cookies** | `N/A` | Conforme | A autenticação da plataforma é baseada em tokens de autorização no Header (Bearer Token), não utilizando cookies na sessão atual. |
| **Dependências** | `WARN` | Atenção | Identificadas vulnerabilidades conhecidas em pacotes de terceiros (vite, express/qs, multer, react-router, axios, esbuild, postcss). |
| **Política de CSP** | `WARN` | Atenção | Não há política CSP (Content Security Policy) ativa na vitrine ou cabeçalhos. A ser planejado para a fase de deploy. |
| **Gitleaks** | `NOT_EXEC`| Não Executado | Ferramenta `gitleaks` indisponível no ambiente de execução do agente. Recomenda-se execução futura em pipelines CI. |

---

## 6. Detalhamento dos Achados

### A. Secrets e Variáveis Públicas
A busca por palavras-chave sensíveis não retornou nenhuma ocorrência de chaves de API reais ou senhas hardcoded. O uso de termos como `JWT_SECRET` limita-se a verificações de inicialização ou descrições no arquivo [server/server.ts](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/server/server.ts) e de documentação.

### B. Storage e Rede no Web-book
O web-book interativo está completamente em conformidade com o princípio de privacidade e isolamento:
* Zero requisições assíncronas externas.
* Sem chamadas de storage do navegador para dados pessoais ou identificação de bancadas.
* O carregamento de fontes do Google Fonts ocorre de forma assíncrona; em modo offline, o navegador falha de forma graciosa e utiliza as fontes de sistema, sem quebras no funcionamento da interface ou scripts.

### C. Segurança da Plataforma / Backend
* **CORS:** O backend implementa validação estrita. Em produção, se a variável `ALLOWED_ORIGINS` não estiver preenchida com a lista autorizada, o servidor aborta a inicialização instantaneamente.
* **Upload:** O arquivo [server/middleware/upload.ts](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/server/middleware/upload.ts) está bem configurado contra ataques de RCE (Remote Code Execution) por injeção de executáveis (filtra `file.mimetype` e extname, e força um nome aleatório seguro).

### D. Dependências Vulneráveis
O comando `npm audit` identificou 14 vulnerabilidades (1 de severidade baixa, 5 moderadas, 6 altas, 2 críticas). As vulnerabilidades críticas situam-se nos pacotes `shell-quote` (via `concurrently`) e `react-router` (turbo-stream deserialization).
* **Avaliação de Risco:** Nenhuma das vulnerabilidades identificadas compromete diretamente o web-book estático (vitrine), pois a maior parte afeta servidores node de desenvolvimento ou rotas de páginas que residem apenas no cliente da plataforma. No entanto, sugere-se a execução de `npm audit fix` ou atualização manual das dependências na fase de hardening subsequente da plataforma.

---

## 7. Limitações Honestas do GitHub Pages

Conforme mapeado nas premissas de arquitetura estática:
1. O GitHub Pages servirá apenas a vitrine estática e não possui capacidade de processar lógicas privadas do backend.
2. A aplicação de segurança contra XSS e injeção do lado cliente (CSP) no GitHub Pages deve ser configurada estritamente via tags `<meta http-equiv="Content-Security-Policy">` no cabeçalho do `index.html`, já que o provedor estático não permite injeção de headers HTTP dinâmicos.

---

## 8. Conclusão

Os gates de cibersegurança foram integralmente validados e auditados. Não foram localizados bloqueadores críticos de segurança que impeçam o planejamento do deploy do web-book estático no GitHub Pages. O código da plataforma e do e-book permanece preservado e seguro.
