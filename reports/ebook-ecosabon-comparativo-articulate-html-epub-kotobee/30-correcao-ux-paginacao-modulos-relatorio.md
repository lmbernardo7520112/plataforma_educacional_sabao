# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 30: Relatório de Correção UX — Paginação por Módulo no E-book EcoSabon

**Branch de Trabalho:** `fix/ebook-module-pagination-ux`  
**Autor:** Antigravity (Arquiteto de Software e Consultor de UX)  
**Status:** ✅ APROVADO (Pronto para abertura de Pull Request)  
**Data:** 2026-06-20  

---

### 1. Diagnóstico do Problema e Causa Raiz
*   **Problema:** Anteriormente, o e-book operava em fluxo contínuo de scroll. Quando o usuário chegava ao final de um módulo e clicava no botão "Avançar para o próximo módulo", a página apenas executava uma rolagem. O módulo destino e os subsequentes continuavam aparecendo imediatamente abaixo do botão, quebrando a metáfora conceitual de "página seguinte" de um e-book estruturado e causando poluição visual.
*   **Causa Raiz:** O CSS de tela exibia todas as seções `.ebook-section` sequencialmente de forma incondicional (`display: block`). A navegação era meramente baseada em âncoras de rolagem suave.

---

### 2. Estratégia Adotada e Melhoria Progressiva
Para sanar o problema mantendo a resiliência offline e a simplicidade, foi adotada a paginação por seções ativas com **Melhoria Progressiva (Progressive Enhancement)**:

1.  **Ativação Dinâmica:** O bootstrap da aplicação adiciona a classe `js-enabled` ao elemento `body`.
2.  **Ocultação Condicional (Tela):** Se a classe `js-enabled` estiver ativa no body, o CSS de tela (`main.css`) oculta todas as seções `.ebook-section` (`display: none !important`) e exibe apenas a seção que contiver a classe `.ebook-section--active`.
3.  **Navegação Inteligente (JS):** A nova função `activateModule` atualiza a classe ativa, define os atributos de acessibilidade `hidden` e `aria-hidden` para leitores de tela, atualiza a barra de navegação ativa (`setActiveNavItem`), altera o hash da URL de forma segura (envolvido em `try-catch` para isolar comportamentos do JSDOM) e rola suavemente para o topo do módulo ativo.
4.  **Fallback Seguro (Sem JavaScript):** Se o script falhar ao carregar, a classe `js-enabled` não é injetada no `body`. O e-book se comporta de forma linear, exibindo todos os capítulos de modo contínuo (degradação graciosa).
5.  **Preservação de Impressão:** O arquivo `print.css` força todas as seções a serem renderizadas (`.ebook-section, .ebook-section[hidden] { display: block !important }`), permitindo a impressão e exportação completa do PDF com todos os módulos sequenciados por quebras de página.

---

### 3. Arquivos Alterados
*   [ebook-ecosabon-prototipo/index.html](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/index.html)
*   [ebook-ecosabon-prototipo/src/styles/main.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/main.css)
*   [ebook-ecosabon-prototipo/src/styles/print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css)
*   [ebook-ecosabon-prototipo/src/scripts/app.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/app.js)
*   [ebook-ecosabon-prototipo/src/scripts/interactions.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/interactions.js)
*   [ebook-ecosabon-prototipo/tests/interactions.test.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/tests/interactions.test.js)
*   [reports/visualizacao-3d-molecular-ecosabon/05-plano-sdd-tdd-implementacao-futura.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/visualizacao-3d-molecular-ecosabon/05-plano-sdd-tdd-implementacao-futura.md) (Saneamento Documental)

---

### 4. Testes Adicionados e Execução `npm test`
A suíte de testes locais foi expandida em 8 novos casos de teste (`T64` a `T69`, `T70`, `T71`):
*   **T64:** Apenas uma seção activa existe após inicialização.
*   **T65:** Valida que `activateModule("mod-2")` exibe `mod-2` e oculta `mod-1`.
*   **T66:** Módulo inexistente retorna `false` sem erros.
*   **T67:** Fallback sem classe `js-enabled` mantém HTML degradável e legível.
*   **T68:** Apenas o item ativo da sidebar possui `aria-current="true"`.
*   **T69:** Impressão linearizada é preservada com todas as seções exibidas.
*   **T70:** Hotspots continuam funcionando e respondendo após troca de módulo.
*   **T71:** Checklist Go/No-Go continua funcionando em seções trocadas.

*   **Número Final de Testes:** **71** testes.
*   **Resultado de `npm test`:** **PASS** (100% de aprovação de todos os 71 testes).

---

### 5. Confirmações de UX e Portões de Segurança
*   **Confirmação de Ocultação do Módulo Seguinte:** Verificado. O módulo subsequente não aparece mais abaixo do botão "Avançar".
*   **Confirmação dos Botões "Avançar":** Verificado. Clicar em "Avançar" oculta o módulo atual, exibe o próximo e rola para o topo dele de forma suave.
*   **Confirmação da Sidebar:** Verificado. A sidebar atualiza dinamicamente e de forma acessível os estados ativos de navegação.
*   **Confirmação de Impressão Linear:** Verificado. O arquivo `print.css` força a renderização linear e sem ocultação de todos os módulos.
*   **Confirmação dos Hotspots:** Verificado. Os hotspots do infográfico permanecem funcionais após trocas de seções.
*   **Saneamento Documental 3D:** Confirmado. A pasta de planejamento molecular tridimensional foi estritamente saneada e organizada, contendo apenas arquivos markdown autorais e limpos (zero código ou texturas copiadas, zero impacto direto no código do produto).
*   **Bloqueio C4/3E:** Confirmado. Nenhuma lógica reativa de simulação experimental, range sliders, persistência local ou chamadas de rede foi introduzida no EcoSabon.

---

### 6. Riscos Residuais
Não há riscos residuais técnicos. A navegação paginada por seções ativas foi estruturada no ciclo de vida local do navegador sem dependências, o que garante a portabilidade offline completa do web-book.

---

### 7. Recomendação
Recomenda-se a abertura de Pull Request da branch `fix/ebook-module-pagination-ux` para `main` e merge subsequente para consolidar a navegação paginada por módulos na versão demonstrável estável.
