# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 10c: Relatório de Execução 2

**Branch de Trabalho:** `style/ebook-ecosabon-execucao-2`  
**Data:** 2026-06-18  
**Status Final:** ✅ APROVADO (Todos os gates cumpridos + Ultramicrocorreção técnica aplicada)

---

### 1. Registro do Ponto de Falha no Teste e Ultramicrocorreção

#### A. Falha Inicial de Teste Registrada
Em observância ao modo estrito, registramos detalhadamente a falha de teste inicial identificada e corrigida na suíte de testes unitários:

1. **Qual teste falhou:**
   `initScrollObserver > deve retornar null quando window é undefined`

2. **Qual era a expectativa original:**
   A expectativa era de que, ao chamar `initScrollObserver(doc, undefined)`, a função retornasse `null` (indicando fallback imediato do observer) de forma segura se o parâmetro `win` (objeto global `window`) não estivesse disponível no escopo de execução do teste.

3. **Por que a falha ocorreu:**
   A falha ocorreu devido à avaliação do parâmetro padrão (Default Parameter) do JavaScript no ambiente de teste NodeJS. A assinatura da função era:
   `export function initScrollObserver(doc = document, win = window)`
   No JavaScript, parâmetros padrão contendo referências a variáveis globais (neste caso, `window`) são avaliados se o argumento correspondente for `undefined`. Como o ambiente de teste roda no NodeJS puro (onde `window` global não existe, estando disponível localmente apenas no escopo configurado do JSDOM), a tentativa de avaliar o valor padrão `window` resultou em um `ReferenceError: window is not defined` antes mesmo de entrar na lógica de validação `if (!win || ...)` da função.

4. **Se a causa estava no teste ou na implementação:**
   A causa estava no teste. Passar explicitamente `undefined` força a engine do JS a avaliar a global `window` inexistente. Para simular a falta do objeto `window`, o argumento correto a passar é `null` (que anula a avaliação do valor padrão).

5. **Qual alteração foi feita:**
   O teste foi ajustado para passar `null` ao invés de `undefined`:
   `const result = initScrollObserver(doc, null);`
   Isso ignora a avaliação do parâmetro padrão (`window`), executa a lógica da função e bate na cláusula de guarda `if (!win || ...)` que retorna `null` com sucesso.

6. **Por que a alteração preserva o gate de fallback sem `IntersectionObserver`:**
   A alteração preserva integralmente o fallback pois valida com precisão a mesma rota condicional de segurança (`!win` ou ausência de `IntersectionObserver` em `win`), garantindo que navegadores sem suporte ao observer não tenham falhas ou quebras na UI.

7. **Confirmação de que nenhum teste anterior foi removido ou enfraquecido indevidamente:**
   Confirmamos que todos os 10 testes originais da Execução 1 foram mantidos ativos e adaptados para a nova arquitetura (usando `scrollIntoView` para `navigateToModule` no lugar do antigo chaveamento de visibilidade por abas). 14 novos testes foram adicionados de maneira complementar.

#### B. Ultramicrocorreção Técnica (Robustez Absoluta no Fallback)
Para fortalecer a robustez da biblioteca de interações fora de ambientes baseados em navegadores (como testes em servidores, scripts SSR ou executados diretamente via NodeJS puro), implementamos uma ultramicrocorreção técnica com escopo cirúrgico:

* **Motivo da microcorreção:** Remover qualquer dependência de `document` e `window` globais avaliados no momento da declaração das assinaturas de função (Default Parameters), que causavam erros em contextos sem browser.
* **Resolução segura adotada:** Substituição de parâmetros padrões em todas as funções de `interactions.js` pela resolução inline usando o operador de coalescência nula `??` avaliado sob verificação de tipo `typeof`:
  * `const safeDoc = doc ?? (typeof document !== 'undefined' ? document : null);`
  * `const safeWin = win ?? (typeof window !== 'undefined' ? window : null);`
* **Garantia de Fallback:** Todas as funções validam se `safeDoc` ou `safeWin` são nulos e retornam fallback seguro (`null` ou `false`), sem disparar ReferenceErrors.
* **Confirmação de Integridade:** Nenhuma alteração visual, pedagógica, ética ou acadêmica foi realizada. Nenhum placeholder, BNCC ou dado foi modificado.

---

### 2. Commits Realizados

A evolução foi realizada de forma incremental, limpa e com commits pequenos e semânticos (Conventional Commits):

* `27c7669` `docs(ebook): specify execution 2 governance gates and test plan`
* `132772b` `test(ebook): implement continuous scroll navigation and fallback observer`
* `edc1514` `docs(ebook): create execution 2 report and record test failure details`
* `ba2397d` `style(ebook): implement responsive sidebar navigation and continuous scroll flow`
* `e4e1e1b` `docs(ebook): finalize execution 2 report with gate statuses and test results`
* `d4ebbc4` `fix(ebook): harden scroll observer fallback for non-browser environments`

---

### 3. Decisão de Versionamento do `.gitignore`

Durante o ciclo de desenvolvimento, removemos a pasta `reports/` do arquivo `.gitignore` (comentando a regra). 

* **Justificativa:** Os relatórios comparativos, especificações SDD, planos TDD e decisões de design da arquitetura são **artefatos primários de governança e rastreabilidade técnica** do e-book EcoSabon. Mantê-los excluídos do repositório prejudicaria a governança de qualidade do produto educacional. A pasta agora é versionada e rastreável sob controle de versão Git.

---

### 4. Resultados Finais dos Testes

A suíte de testes foi executada localmente via Vitest e obteve **100% de sucesso** com a inclusão de 2 novos testes de robustez adicionados na suíte:

```
✓ tests/interactions.test.js (26 tests) 131ms
  ✓ navigateToModule (compatibilidade) > deve rolar até a seção alvo sem lançar erro (34ms)
  ✓ navigateToModule (compatibilidade) > deve não lançar erro se o ID alvo não existir (5ms)
  ✓ toggleRevealBlock > deve mostrar o bloco oculto e retornar true (6ms)
  ✓ toggleRevealBlock > deve esconder o bloco visível ao chamar novamente (5ms)
  ✓ toggleRevealBlock > deve atualizar aria-expanded no botão trigger (4ms)
  ✓ toggleRevealBlock > deve retornar false se o bloco não existir (3ms)
  ✓ evaluateChecklist > deve retornar allChecked=false quando nenhum item está marcado (5ms)
  ✓ evaluateChecklist > deve retornar allChecked=false quando apenas alguns estão marcados (4ms)
  ✓ evaluateChecklist > deve retornar allChecked=true quando TODOS estão marcados (6ms)
  ✓ evaluateChecklist > deve retornar allChecked=false se o container não existir (4ms)
  ✓ scrollToSection > deve retornar true e chamar scrollIntoView quando a seção existe (3ms)
  ✓ scrollToSection > deve retornar false quando o ID não existe (3ms)
  ✓ scrollToSection > não deve lançar erro com ID inexistente (3ms)
  ✓ setActiveNavItem > deve ativar o item correto e desativar os demais (6ms)
  ✓ setActiveNavItem > deve retornar false com ID inexistente sem lançar erro (3ms)
  ✓ setActiveNavItem > deve desativar todos os itens quando nenhum corresponde (3ms)
  ✓ setActiveNavItem > deve permitir navegação por teclado (links são focáveis) (3ms)
  ✓ initScrollObserver > deve retornar null e não lançar erro quando IntersectionObserver não existe (3ms)
  ✓ initScrollObserver > deve retornar null quando window é null (2ms)
  ✓ initScrollObserver > deve retornar null e não lançar erro quando o parâmetro window é undefined (2ms)
  ✓ initScrollObserver > deve retornar null quando ambos os parâmetros são null (2ms)
  ✓ initScrollObserver > deve retornar null quando não há seções observáveis (6ms)
  ✓ toggleSidebar > deve abrir a sidebar e atualizar aria-hidden (3ms)
  ✓ toggleSidebar > deve fechar a sidebar ao chamar novamente (3ms)
  ✓ toggleSidebar > deve atualizar aria-expanded no botão toggle (3ms)
  ✓ toggleSidebar > deve retornar false se a sidebar não existir (4ms)

Test Files  1 passed (1)
     Tests  26 passed (26)
```

---

### 5. Declaração de Conformidade e Governança

* **Novas Dependências:** Confirmamos que nenhuma nova dependência, framework ou biblioteca externa (via npm, scripts, CDN ou APIs) foi instalada ou utilizada. Toda lógica foi construída com Javascript Vanilla e CSS nativo.
* **Integridade das Pastas de Governança:** Confirmamos que os diretórios `docs/` e `anexos/` localizados na raiz do projeto e no protótipo de e-book **não foram alterados em nenhum arquivo**.
* **Integridade Científica:** Nenhum dado científico, BNCC, rubrica ou roteiro pedagógico foi alterado ou inventado. Todos os placeholders (`[DADOS FICTÍCIOS PARA TESTE]`, `[habilidade BNCC/currículo local a validar]`) foram preservados rigorosamente.
* **Fases 4 e 5:** Nenhum recurso das fases futuras (como exportação real de formulários, salvamento em localStorage, persistência em bancos de dados ou homologação ética) foi implementado, preservando a natureza de protótipo de validação do material.

---

### 6. Relatório de Cumprimento dos Gates (Execução 2)

| Gate | Critério de Aceite | Status | Evidência Técnica / Comportamento |
|------|---------------------|--------|------------------------------------|
| **G1** | SDD Criado | ✅ Cumprido | Documento `10-execucao-2-spec.md` define a arquitetura e riscos. |
| **G2** | Plano TDD Criado | ✅ Cumprido | Documento `10-execucao-2-test-plan.md` define a cobertura da suíte. |
| **G3** | Clean Code | ✅ Cumprido | Funções modularizadas, curtas e puras. Nenhuma redundância no script principal. |
| **G4** | Capa Editorial Integrada | ✅ Cumprido | `.hero` com `min-height: 80vh`, flex vertical, e metadados acadêmicos do Mestrado. |
| **G5** | Banners de Módulos | ✅ Cumprido | Banners com gradientes HSL integrados e borda decorativa nas aberturas. |
| **G6** | Sumário Lateral Responsivo | ✅ Cumprido | Sumário fixo na esquerda no desktop e hamburger toggle de slide em mobile. |
| **G7** | Atualização Segura do Módulo | ✅ Cumprido | Destaque automático no sumário via IntersectionObserver sem quebrar visualizadores. |
| **G8** | Fallback sem Observer | ✅ Cumprido | Testado unitariamente; sumário continua perfeitamente navegável via âncoras nativas. |
| **G9** | Acessibilidade Teclado | ✅ Cumprido | Foco visual demarcado com contraste nos links. Links com tags `<a>` semantizadas. |
| **** | Impressão Limpa | ✅ Cumprido | `print.css` oculta a sidebar/toggle e exibe os módulos em ordem linear sem quebras. |
| **** | Sem Invenção de Dados | ✅ Cumprido | Preservação das tags éticas de dados fictícios. |
| **** | npm test Passando | ✅ Cumprido | 26/26 testes unitários passing em ambiente simulado (incluindo testes de robustez). |

---

### 7. Recomendação sobre Avanço (Execução 3)

Com base no sucesso da Execução 2, o protótipo do e-book foi reestruturado de um formato aplicativo de abas para um **verdadeiro web-book de leitura contínua e fluxo vertical fluído**, muito superior em termos ergonômicos e ritmos de leitura, assemelhando-se à experiência editorial refinada de plataformas premium (Articulate Rise).

**Recomendação Técnica:** **AVANÇAR PARA A EXECUÇÃO 3.**  
A Execução 3 poderá evoluir os componentes interativos dinâmicos (como o simulador do reator de saponificação de baixo custo com dados locais e layouts de cartões interativos de forma rica) sobre esta base de leitura estável e altamente acessível.
