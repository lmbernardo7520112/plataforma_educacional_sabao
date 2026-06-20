# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 30: Relatório de Correção UX — Paginação por Módulo no E-book EcoSabon

**Branch de Trabalho:** `fix/ebook-module-pagination-ux`  
**Autor:** Antigravity (Arquiteto de Software e Consultor de UX)  
**Status:** ✅ APROVADO (Pronto para abertura de Pull Request)  
**Data:** 2026-06-20  

---

### 1. Diagnóstico do Problema e Causa Raiz
*   **Problema:** Anteriormente, o e-book operava em fluxo contínuo de scroll. Ao final de um módulo, o botão "Avançar para o próximo módulo" apenas realizava rolagem vertical, deixando o módulo destino e subsequentes visíveis logo abaixo no fluxo. Isso prejudicava a sensação clássica de "virar de página" de um livro digital.
*   **Causa Raiz:** O CSS de tela renderizava todas as seções `.ebook-section` sequencialmente de forma incondicional (`display: block`).

---

### 2. Estratégia Adotada e Ultramicrocorreção Técnica
Implementamos a paginação por módulo ativo via **Melhoria Progressiva (Progressive Enhancement)** e aplicamos melhorias arquiteturais robustas:

1.  **Sem Atributo `hidden` em Módulos Principais:** Removemos o uso de `setAttribute("hidden", "true")` nas seções `.ebook-section` para evitar fragilidades na renderização em impressoras e PDFs (o atributo `hidden` tem forte peso semântico). Controlamos a exibição em tela estritamente via classe `.ebook-section--active`, `aria-hidden="true"/"false"` e CSS. O atributo `hidden` permanece restrito apenas a componentes internos pequenos (como blocos de reveal e painéis de hotspots).
2.  **CSS de Tela e Impressão:** Sob JS ativo (`js-enabled` no body), ocultamos seções inativas na tela. No `print.css`, a regra explícita `.ebook-section, .ebook-section[hidden] { display: block !important; }` força todos os módulos a aparecerem de forma linearizada, com quebras de página automáticas.
3.  **Remoção de Conflito com `IntersectionObserver`:** Desativamos a chamada a `initScrollObserver()` no bootstrap principal do `app.js` para que a sincronização da sidebar não dispute foco com a rolagem no modo de visualização paginada. A função permanece exportada e testada para compatibilidade de modo legado.
4.  **Histórico e Navegação por Hash:** Integramos suporte a eventos `popstate` e `hashchange` através da função `activateModuleFromHash()`. Agora, voltar/avançar no histórico do navegador ou carregar links diretos (hashes válidos) ativa o módulo correto sem empilhar conteúdo. Hashes inválidos mantêm `mod-inicio` como padrão ativo sem quebrar a execução.

---

### 3. Arquivos Alterados
*   [ebook-ecosabon-prototipo/src/styles/print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css)
*   [ebook-ecosabon-prototipo/src/scripts/app.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/app.js)
*   [ebook-ecosabon-prototipo/src/scripts/interactions.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/scripts/interactions.js)
*   [ebook-ecosabon-prototipo/tests/interactions.test.js](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/tests/interactions.test.js)

---

### 4. Testes Adicionados e Execução `npm test`
Expandimos a suíte de testes locais com 12 novos casos de teste (`T64` a `T75`):
*   **T64:** Apenas uma `.ebook-section--active` existe na inicialização.
*   **T65:** Módulos principais não recebem atributo `hidden` e atualizam `aria-hidden`.
*   **T66:** Comportamento seguro com ID de módulo inexistente.
*   **T67:** Sem classe `js-enabled`, todas as seções permanecem degradáveis na tela.
*   **T68:** Sincronização e unicidade do `aria-current="true"` nos links da sidebar.
*   **T69:** Impressão robusta linearizada sem depender de `hidden`.
*   **T70:** Hotspots continuam funcionando após a ativação/troca de módulo.
*   **T71:** Checklist Go/No-Go continua funcional em novos módulos ativos.
*   **T72:** Hash inicial válido ativa o módulo correto.
*   **T73:** Hash inicial inválido não quebra a tela e ativa `mod-inicio`.
*   **T74:** Evento `popstate` reativa o módulo correspondente corretamente.
*   **T75:** Bootstrap em `app.js` não chama `initScrollObserver()` na paginação ativa.

*   **Número Final de Testes:** **75** testes.
*   **Resultado de `npm test`:** **PASS** (75 de 75 testes com sucesso).

---

### 5. Confirmações de UX e Portões de Segurança
*   **Módulo seguinte ocultado:** Confirmado. Não há empilhamento de seções.
*   **Botões "Avançar" e Sidebar:** Funcionam perfeitamente integrados com a paginação de seção ativa.
*   **Preservação de Hotspots e Checklist:** Totalmente funcionais e testados.
*   **Bloqueio C4/3E:** Totalmente mantido. Zero simulações quantitativas ou dependências externas.
*   **Saneamento Documental 3D:** A análise de visualização 3D/Kotobee foi estritamente saneada e restrita a documentos de planejamento local. A preparação arquitetural e diretrizes contra complexidade ciclomática para próximas etapas foram registradas no [Documento 31](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/ebook-ecosabon-comparativo-articulate-html-epub-kotobee/31-preparacao-arquitetural-pos-paginacao-e-visualizacao-3d-4d.md).

---

### 6. Riscos Residuais
Os riscos residuais foram classificados como **baixos e controlados**. A navegação se baseia no histórico nativo e APIs do navegador. Não há risco de travamentos ou concorrência na sidebar devido à desativação do IntersectionObserver no bootstrap.

---

### 7. Recomendação
Recomenda-se abrir a Pull Request da branch `fix/ebook-module-pagination-ux` para a `main`, consolidando a paginação por módulo e as bases de governança arquitetural.
