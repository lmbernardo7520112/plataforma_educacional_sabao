# Relatório 90 — Revisão P1: Do Web-book à Plataforma EcoSabon

**Fase:** WBC-P1-REVIEW — Revisão Formal, Build e Inspeção da P1 em Modo Estrito  
**Pull Request:** #35  
**Head Branch:** `feat/ecosabon-webbook-platform-showcase-p1`  
**Base Branch:** `main`  
**Data:** 2026-06-26  

---

## 1. Objetivo

Este documento apresenta a revisão técnica formal e a homologação do Pull Request #35 (Fase P1), que implementa a seção **"Do Web-book à Plataforma EcoSabon"** no protótipo do e-book. A finalidade desta auditoria é assegurar a integridade do código, validar a conformidade de acessibilidade e segurança, e certificar que nenhuma alteração foi introduzida na plataforma backend/client.

---

## 2. Escopo do Pull Request e Arquivos Alterados

O PR #35 modifica e cria arquivos exclusivamente relacionados à vitrine estática do web-book interativo.

Os seguintes arquivos foram alterados no escopo:
* [ebook-ecosabon-prototipo/index.html](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/index.html) (Seção HTML da jornada e hotspots)
* [ebook-ecosabon-prototipo/src/styles/main.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/main.css) (Estilização dos hotspots, flip cards e timeline)
* [ebook-ecosabon-prototipo/src/styles/print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css) (Fallback e visibilidade para impressão de relatórios)
* [ebook-ecosabon-prototipo/src/scripts/app.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/app.js) (Bootstrap e inicialização da vitrine)
* [ebook-ecosabon-prototipo/src/scripts/interactions.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/interactions.js) (Fachada de interações do e-book)
* [ebook-ecosabon-prototipo/src/scripts/platform-showcase.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/platform-showcase.js) (Lógica puramente client-side para hotspots e flip cards)
* [ebook-ecosabon-prototipo/tests/interactions.test.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/tests/interactions.test.js) (Adicionados 20 testes novos: T105 a T124)
* [reports/87-implementacao-p1-webbook-plataforma-ecosabon.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/87-implementacao-p1-webbook-plataforma-ecosabon.md) (Relatório de implementação)

> [!IMPORTANT]
> **Confirmação de Escopo Isolado:** Nenhuma alteração foi introduzida nas pastas `server/`, `client/`, `shared/` ou `curso-interativo/`. A Plataforma EcoSabon permanece intocada.

---

## 3. Testes Executados (Gate 3)

Os testes foram rodados localmente com a branch de desenvolvimento rebasada sobre a `main` atualizada. A contagem de testes demonstra a expansão da suite do e-book:

* **E-book Protótipo:** 124 / 124 testes passados (T1 a T124) ✅
* **Plataforma Client (Vite):** 8 / 8 testes passados ✅
* **Curso Interativo (SCORM):** 47 / 47 testes passados ✅
* **Plataforma Server (Express API):** 40 / 40 testes passados ✅
* **Total Geral:** **219 / 219 testes passados** ✅

Todos os testes da suite geral de integração e unitários passaram com sucesso.

---

## 4. Resultado do Build de Produção (Gate 4)

O comando de compilação estática do web-book foi executado com sucesso:
```bash
npm run build --prefix ebook-ecosabon-prototipo
```
* **Status:** Concluído sem erros em 750ms.
* **Tamanho do JS/CSS:** Compactados e minificados adequadamente pelo Vite.
* **Conformidade:** O diretório compilado `dist/` não está rastreado no repositório.

---

## 5. Auditoria de Cibersegurança do Web-book (Gate 5)

* **Rede:** A busca por chamadas assíncronas `fetch`, `XMLHttpRequest`, `WebSocket` ou `EventSource` na nova seção foi avaliada e retornou vazia.
* **Storage:** Sem uso de `localStorage` ou `sessionStorage` na seção P1.
* O web-book interativo atua puramente como uma ferramenta qualitativa de leitura e navegação local.
* **Isolamento de Releases:** Nenhum arquivo binário, compactado ou imagem de QR Code foi introduzido.

---

## 6. Inspeção Funcional e Acessibilidade (Gate 6)

1. **Localização:** A seção "Do Web-book à Plataforma EcoSabon" foi integrada ao final do fluxo de módulos do e-book de forma natural.
2. **Navegação:** O menu lateral (sidebar) recebeu a âncora `#mod-plataforma` sem comprometer o fluxo de paginação dinâmica do e-book.
3. **Hotspots:** Funcionam na lógica "um-por-vez" (one-at-a-time). O clique em um hotspot abre o painel correspondente e fecha automaticamente qualquer outro painel ativo.
4. **Teclado:** Foco acessível via `tabindex="0"`, acionamento via `Enter` / `Espaço`, e tecla `Escape` programada para fechar painéis ativos e retornar o foco ao botão de origem.
5. **Flip Cards:** Alternam o estado visual (`--flipped`) no clique/teclado de forma fluida. O status é anunciado em uma região `aria-live="polite"` para leitores de tela.
6. **Disclaimer:** O aviso sobre o caráter demonstrativo e a presença de dados fictícios está em alta visibilidade e em conformidade conceitual.
7. **Impressão:** O arquivo `print.css` contém regras que ocultam botões interativos e mostram o conteúdo descritivo completo em fallback para visualização em relatórios impressos.
8. **Preservação:** Os palcos moleculares B1, B2 e C3 (Premium 3D) continuam integrados e 100% funcionais.

---

## 7. Mitigações e Riscos Residuais

* **Correções Aplicadas:** Nenhuma correção de código foi necessária, pois a implementação atende perfeitamente aos requisitos. A branch apenas foi rebasada com sucesso sobre as últimas atualizações de documentação da branch `main`.
* **Riscos Residuais:** Inexistentes. A entrega é estritamente estática e confinada na pasta do protótipo.

---

## 8. Decisão

P1 REVISADA E APROVADA PARA MERGE. IMPLEMENTAÇÃO EXCLUSIVA NO WEB-BOOK. PLATAFORMA ECOSABON INTOCADA.
