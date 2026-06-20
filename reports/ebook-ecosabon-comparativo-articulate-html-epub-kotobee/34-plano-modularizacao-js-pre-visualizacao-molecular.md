# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 34: Plano de Modularização do JavaScript Pré-Visualização Molecular

**Branch Relacionada:** `docs/ajuste-proxima-etapa-pos-paginacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PROPOSTO (Planejamento de refatoração de governança)  
**Data:** 2026-06-20  

---

### 1. Objetivo da Modularização
Com a introdução da paginação de módulos ativa no web-book **EcoSabon**, o arquivo `interactions.js` e a lógica de bootstrap em `app.js` cresceram em responsabilidades. O objetivo deste plano é reorganizar cirurgicamente o JavaScript em módulos lógicos isolados baseados em ES Modules nativos. Isso reduzirá a complexidade ciclomática, aumentará a manutenibilidade e isolará as funcionalidades interativas em módulos autônomos e testáveis antes do desenvolvimento de qualquer etapa de visualização molecular (2.5D/3D/4D).

---

### 2. Não-Escopo (Restrições Absolutas)
* **Sem Alterações Visuais:** A refatoração não deve alterar em absoluto nenhuma classe CSS, layout ou comportamento visual exibido ao usuário final.
* **Sem Alterações Funcionais:** Nenhum fluxo de navegação, comportamento de popstate, hotspot ou checklist deve ser adicionado, removido ou modificado.
* **Sem Redes ou Persistência:** A modularização permanece local; não serão introduzidos `fetch`, `XMLHttpRequest`, `WebSocket`, `localStorage`, `sessionStorage` ou `FormData`.
* **Sem Dependências Adicionais:** A modularização deve continuar dependendo apenas dos recursos nativos do navegador (Vanilla JS / ES Modules), sem bibliotecas externas.

---

### 3. Proposta de Arquitetura de Arquivos
A estrutura dos scripts dentro do diretório `ebook-ecosabon-prototipo/src/scripts/` será organizada da seguinte forma:

```text
src/scripts/
├── app.js                       # Ponto de entrada (Bootstrap centralizado)
├── interactions.js              # Mantido temporariamente com re-exports para compatibilidade/testes
├── navigation.js                # Lógica de paginação: activateModule, initModulePagination, popstate
├── hotspots.js                  # Lógica de infográfico: toggleHotspotPanel, initSaponificationHotspots
├── station-map.js               # Visualizador de rotação: scrollToStation, initStationMap
├── reveal.js                    # Cartões interativos: toggleRevealBlock
├── checklist.js                 # Lógica de avaliação do checklist Go/No-Go
└── scroll.js                    # Navegação por scroll, scrollToSection, initScrollObserver legado
```

---

### 4. Limites de Complexidade Ciclomática e Métricas de Qualidade
* **Complexidade Ciclomática Máxima:** Nenhuma função individual nos novos módulos deve exceder a complexidade ciclomática de **10**.
* **Linhas de Código por Arquivo:** Nenhum arquivo modular deve exceder **150 linhas de código** (exceto os comentários de documentação técnica/pedagógica).
* **Isolamento de Estado:** Os módulos não devem manter estado global mutável. Configurações de estado de visualização na tela devem ser lidas ou escritas diretamente no DOM (acessibilidade via atributos `aria-*` e classes CSS).

---

### 5. Preservação de Testes (Gates de Qualidade)
* A suíte de testes unitários em `tests/interactions.test.js` deve permanecer 100% íntegra.
* **Todos os 75/75 testes atuais devem passar sem qualquer modificação no arquivo de teste** ou, se necessário, apenas ajustando os caminhos de importação no topo de `interactions.test.js`.
* O `index.html` deve importar os módulos corretos via `<script type="module" src="src/scripts/app.js">`.

---

### 6. Cronograma e Governança Técnica
1. A modularização deve ser executada em uma **Pull Request própria e exclusiva** sob a ramificação `refactor/js-modularization`.
2. O merge da refatoração só será autorizado se todos os 75 testes automatizados passarem e nenhuma alteração funcional for detectada.
3. **Bloqueio de Visualização Molecular:** Qualquer desenvolvimento relacionado a visualizações 2.5D/3D/4D está condicionado à aprovação prévia desta modularização. O C4/3E e simulações permanecem permanentemente bloqueados.
