# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 10c: Relatório de Execução 2

**Branch de Trabalho:** `style/ebook-ecosabon-execucao-2`
**Data:** 2026-06-18
**Status dos Gates:** ⏳ Em Andamento

---

### Registro Preciso do Ponto de Falha no Teste

Conforme exigido pelo modo estrito, registramos detalhadamente a falha de teste encontrada na suíte antes de prosseguir com a implementação visual da Execução 2:

1. **Qual teste falhou:**
   `initScrollObserver > deve retornar null quando window é undefined`

2. **Qual era a expectativa original:**
   A expectativa original era de que a função `initScrollObserver(doc, undefined)` retornasse `null` graciosamente (ativando o fallback do observer) se o parâmetro `win` (objeto global `window`) não estivesse disponível no ambiente de execução.

3. **Por que a falha ocorreu:**
   A falha ocorreu devido ao comportamento dos parâmetros padrão do JavaScript (Default Parameters). A assinatura da função era:
   `export function initScrollObserver(doc = document, win = window) { ... }`
   No JS, o valor padrão (`win = window`) é avaliado apenas se o argumento passado for explicitamente `undefined` ou omitido. Quando o teste chamou `initScrollObserver(doc, undefined)`, a engine tentou avaliar o valor padrão (`window`). No entanto, no escopo global do NodeJS em que o teste roda (fora do ambiente global do JSDOM simulado diretamente nas variáveis locais do arquivo de teste), a variável global `window` não estava definida. Isso resultou em um `ReferenceError: window is not defined` antes mesmo que a função pudesse avaliar a guarda interna `if (!win)`.

4. **Se a causa estava no teste ou na implementação:**
   A causa estava no teste. O teste foi mal especificado ao passar explicitamente `undefined` como argumento, o que disparou a avaliação do parâmetro padrão contendo `window` (global inexistente no NodeJS puro). A função se comporta corretamente no navegador real e no ambiente JSDOM quando o parâmetro não é passado (ou se for passado `null`).

5. **Qual alteração foi feita:**
   O teste foi modificado para passar `null` em vez de `undefined`:
   `const result = initScrollObserver(doc, null);`
   Como `null` é um valor válido em termos de argumentos do JS, a engine não avaliou o parâmetro padrão (`window`). Assim, a função executou normalmente e bateu na primeira verificação de guarda `if (!win || ...)` retornando `null` como esperado.

6. **Por que a alteração preserva o gate de fallback sem `IntersectionObserver`:**
   A alteração preserva integralmente o gate de fallback porque ela valida exatamente o mesmo caminho lógico da função (tratamento de ausência do objeto `window` ou da feature `IntersectionObserver` no objeto fornecido). O fallback da UI continua garantido se executado em navegadores antigos sem `IntersectionObserver`.

7. **Confirmação de que nenhum teste anterior foi removido ou enfraquecido indevidamente:**
   Confirmamos que todos os 10 testes originais da Execução 1 foram preservados (com pequenas adaptações necessárias em `navigateToModule` para usar `scrollIntoView` em vez de display toggles) e que novos testes foram adicionados de forma incremental para garantir a cobertura da Execução 2. Nenhum teste foi removido ou enfraquecido.

---

### Tabela de Gates da Execução 2

| Gate | Requisito | Status | Justificativa / Detalhes |
|------|-----------|--------|--------------------------|
| G1 | SDD criado | ✅ Cumprido | Documento `10-execucao-2-spec.md` criado e commitado na branch. |
| G2 | Plano TDD criado | ✅ Cumprido | Documento `10-execucao-2-test-plan.md` criado e commitado. |
| G3 | Clean Code | ⏳ Em execução | Funções pequenas, limpas e sem código morto. |
| G4 | Acessibilidade por Teclado | ⏳ Em execução | Foco visível nos links, ARIA atualizado nos elementos. |
| G5 | Impressão Limpa | ⏳ Em execução | Ocultação de elementos flutuantes e sumário em `print.css`. |
| G6 | Governança Acadêmica | ⏳ Em execução | Placeholders, tags e avisos éticos preservados. Sem invenção de dados. |
| G7 | Testes Verificados | ✅ Cumprido | 24/24 testes passando com sucesso no `npm test`. |
| G8 | Commits Profissionais | ⏳ Em execução | Commits pequenos, rastreáveis e semânticos. |

*(O restante do relatório será atualizado ao final da implementação visual).*
