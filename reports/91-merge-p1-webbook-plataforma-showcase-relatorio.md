# Relatório 91 — Fechamento: Merge da P1 (Do Web-book à Plataforma EcoSabon)

**Fase:** WBC-P1-REVIEW — Homologação e Merge da P1 em Modo Estrito  
**Pull Request:** #35  
**Hash do Merge:** `5e335a40f00f94f48689b358d27e0e070005052a`  
**Data:** 2026-06-26  

---

## 1. Identificação do Merge

O Pull Request #35 foi revisado formalmente e mergeado com sucesso na branch `main`.

| Elemento | Detalhe |
|---|---|
| **Pull Request** | #35 |
| **Título do PR** | `feat(ebook): add 'Do Web-book à Plataforma EcoSabon' showcase section (P1)` |
| **Branch Origem** | `feat/ecosabon-webbook-platform-showcase-p1` |
| **Branch Destino** | `main` |
| **Hash do Merge** | `5e335a40f00f94f48689b358d27e0e070005052a` |

---

## 2. Arquivos Mergeados no Escopo da P1

Os seguintes arquivos foram incorporados na raiz do repositório:
* [ebook-ecosabon-prototipo/index.html](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/index.html)
* [ebook-ecosabon-prototipo/src/scripts/app.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/app.js)
* [ebook-ecosabon-prototipo/src/scripts/interactions.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/interactions.js)
* [ebook-ecosabon-prototipo/src/scripts/platform-showcase.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/platform-showcase.js)
* [ebook-ecosabon-prototipo/src/styles/main.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/main.css)
* [ebook-ecosabon-prototipo/src/styles/print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css)
* [ebook-ecosabon-prototipo/tests/interactions.test.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/tests/interactions.test.js)
* [reports/87-implementacao-p1-webbook-plataforma-ecosabon.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/87-implementacao-p1-webbook-plataforma-ecosabon.md)
* [reports/90-revisao-pr35-p1-webbook-plataforma-relatorio.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/90-revisao-pr35-p1-webbook-plataforma-relatorio.md)

---

## 3. Validação de Testes e Build Pós-Merge

* **Build de Produção:** Executado e concluído sem avisos ou erros. A pasta compilada temporária `dist` foi devidamente apagada e confirmou-se que não é rastreada pelo Git.
* **Testes Gerais:**
  * **E-book Protótipo:** 124 / 124 testes passados (T1 a T124, incluindo os 20 novos testes de hotspots/cards de plataforma) ✅
  * **Plataforma Client (Vite):** 8 / 8 testes passados ✅
  * **Curso Interativo (SCORM):** 47 / 47 testes passados ✅
  * **Plataforma Server (Express API):** 40 / 40 testes passados ✅
  * **Total Geral:** **219 / 219 testes passados** ✅

---

## 4. Conformidade de Segurança e Isolamento

> [!IMPORTANT]
> **Confirmação de Integridade da Plataforma:** Todo o código dinâmico do servidor (`server/`), cliente da plataforma (`client/`), lógica compartilhada (`shared/`) e curso interativo (`curso-interativo/`) permanece **intocado**. A implementação ocorreu exclusivamente do lado do web-book.

* **Conectividade e Storage:** Verificado que a nova seção não utiliza recursos de rede (`fetch`, `XMLHttpRequest`, `WebSocket`) nem APIs de storage (`localStorage`, `sessionStorage`), mantendo o web-book com funcionamento 100% autônomo offline.
* **Preservação de Módulos:** Os palcos moleculares estáticos e iterativos (B1, B2 e C3 Premium 3D) continuam integrados e funcionais, sem qualquer perda de UX.
* **Deploy e QR Code:** Não houve execução de deploy para o GitHub Pages e não foram gerados arquivos binários ou QR Codes nesta etapa.

---

## 5. Decisão

P1 MERGEADA. WEB-BOOK MAIS REPRESENTATIVO COMO PRODUTO-VITRINE DA PLATAFORMA ECOSABON. PLATAFORMA INTOCADA. DEPLOY AINDA NÃO EXECUTADO.
