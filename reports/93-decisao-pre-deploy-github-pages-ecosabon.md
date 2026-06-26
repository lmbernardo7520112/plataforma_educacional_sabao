# Relatório 93 — Decisão: Pré-Deploy do Web-book no GitHub Pages

**Fase:** DPC-AUDIT — Auditoria Ativa dos Gates de Cibersegurança em Modo Estrito  
**Branch:** `docs/ecosabon-dpc-audit-cybersecurity-pre-deploy`  
**Base:** `main`  
**Data:** 2026-06-26  

---

## 1. Síntese Executiva

Após a conclusão da auditoria ativa dos gates de cibersegurança do web-book interativo e da plataforma, registramos a conformidade de todos os portões de segurança definidos no R88. A vitrine estática do web-book está limpa de credenciais, opera sem dependências ativas de rede ou storage local e não afeta a segurança do servidor backend.

---

## 2. Decisão GO/NO-GO para Próxima Fase

* **Resultado da Avaliação:** **GO CONDICIONAL**
* **Justificativa:** Todos os gates críticos de cibersegurança foram atestados como conformes (`PASS`). Não há vulnerabilidades impeditivas para a publicação estática no repositório de vitrine. No entanto, o deploy físico ainda **não deve ser executado** nesta etapa de planejamento e auditoria prévia.

---

## 3. Lista de Bloqueadores (Blockers)
* **Status:** Nenhum bloqueador detectado.

---

## 4. Lista de Avisos e Observações (Warnings)
* **W01 — Dependências Desatualizadas:** O comando `npm audit` revelou vulnerabilidades em pacotes de terceiros como `express`, `qs`, `react-router`, `axios`, `esbuild` e `vite`. Embora não afetem a integridade do web-book estático, recomenda-se planejar a atualização na próxima etapa de hardening do backend.
* **W02 — CSP Estática:** Por limitação de infraestrutura do GitHub Pages, a política de CSP terá de ser implementada via meta tag no HTML. Recomenda-se adicionar a meta tag antes do deploy definitivo.
* **W03 — Ferramenta Gitleaks:** A varredura via ferramenta gitleaks não pôde ser executada localmente devido à sua ausência no ambiente sandbox. Recomenda-se integrá-la a workflows de CI.

---

## 5. Pré-Condições Técnicas para o Deploy

Para que o deploy definitivo seja autorizado na próxima fase, as seguintes pré-condições devem ser mantidas:
1. O código do e-book deve ser mantido sincronizado com a branch `main` consolidada.
2. O build de produção deve ser gerado utilizando o prefixo de repositório correto (`--base=/plataforma_educacional_sabao/`).
3. O build offline portátil com caminhos relativos (`base: './'`) deve continuar preservado para distribuição local.

---

## 6. Diretrizes sobre o QR Code

* O QR Code definitivo **não deve** ser gerado nesta fase.
* A geração do QR Code ocorrerá somente após a verificação ativa da URL pública do GitHub Pages.
* O arquivo PNG de imagem gerado deve ser ignorado pelo Git (não versionar na `main`) e mantido localmente em `local_release/` ou como um asset manual na aba de Releases do repositório GitHub.

---

## 7. Diretrizes sobre a Branch `gh-pages`

* A branch `gh-pages` **não deve** ser criada nem ativada nas configurações do GitHub nesta fase.
* O deploy definitivo será realizado publicando isoladamente o conteúdo da pasta compilada `dist/` na branch `gh-pages` com o arquivo `.nojekyll` correspondente.

---

## 8. Decisão

DECISÃO: GO CONDICIONAL PARA PLANEJAR DPC-DEPLOY. A AUDITORIA ATIVA NÃO IDENTIFICOU BLOQUEADORES CRÍTICOS, MAS O DEPLOY AINDA NÃO FOI EXECUTADO E DEVE SER FEITO EM FASE SEPARADA.
