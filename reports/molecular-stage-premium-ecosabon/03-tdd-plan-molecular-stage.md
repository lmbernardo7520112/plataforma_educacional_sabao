# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 03: Plano de Testes Baseado em TDD (Test Driven Development)

Este documento especifica a suíte de testes unitários que deverá ser criada **antes** do início de qualquer implementação de código da feature **Molecular Stage**, garantindo a cobertura total de requisitos e prevenindo regressões de código.

---

### 1. Testes de Ciclo de Vida e DOM
* **Teste 1: Inicialização sem container**
  * *Objetivo:* Confirmar que `initMolecularStage(null)` retorna `false` de forma segura, sem lançar exceções.
* **Teste 2: Registro de elementos obrigatórios no DOM**
  * *Objetivo:* Validar que a função retorna `false` e emite um alerta se elementos essenciais (como botões avançar/voltar ou container do SVG) estiverem ausentes no DOM fornecido.
* **Teste 3: Estado inicial de carregamento**
  * *Objetivo:* Garantir que a primeira etapa da reação (índice 0) é exibida ativa por padrão ao iniciar.

---

### 2. Testes de Interação e Transição de Estado
* **Teste 4: Navegação de etapas (Botão Avançar)**
  * *Objetivo:* Simular clique no botão "Avançar" e verificar se o índice de estado avança corretamente para 1 e se os atributos visuais do SVG são alterados.
* **Teste 5: Limites de navegação (Estouro de Índice)**
  * *Objetivo:* Garantir que clicar em "Avançar" no último estado ou em "Voltar" no primeiro estado não estoura o índice de etapas de reação.
* **Teste 6: Navegação por Teclado**
  * *Objetivo:* Simular os eventos `ArrowRight` e `ArrowLeft` nas teclas e validar se o estado da reação avança ou retrocede conforme o esperado.

---

### 3. Testes de Acessibilidade (a11y)
* **Teste 7: Anúncio de estado `aria-live`**
  * *Objetivo:* Verificar se o texto explicativo da etapa ativa é atualizado de forma síncrona dentro da região configurada com `aria-live="polite"`.
* **Teste 8: Visibilidade do Foco Teclado**
  * *Objetivo:* Validar se os botões de avançar/voltar possuem focus outline nítido em conformidade com as regras de CSS `:focus-visible`.
* **Teste 9: Respeito à redução de movimento**
  * *Objetivo:* Validar se o estilo desativa a transição suave de frames de animação quando a preferência do sistema operacional (`prefers-reduced-motion: reduce`) estiver ativa.

---

### 4. Testes de Degradação, Fallback e Impressão
* **Teste 10: Execução sem JS (Fallback Linear)**
  * *Objetivo:* Verificar se na ausência de scripts carregados, todos os quadros da reação molecular SVG aparecem expostos lado a lado sequencialmente, mantendo a leitura legível.
* **Teste 11: Renderização de Impressão**
  * *Objetivo:* Validar se as regras CSS de `@media print` ocultam os controles interativos (botões) do Molecular Stage e exibem a lista descritiva em texto de todos os estados atômicos de saponificação.

---

### 5. Testes de Fumaça de Governança Estrita (Proteção ao Core)
* **Teste 12: Ausência de range inputs / sliders (C4/3E)**
  * *Objetivo:* Varrer o DOM do módulo e as dependências garantindo que **não há** ocorrência de `<input type="range">` ou controles numéricos de simulação.
* **Teste 13: Preservação de Hotspots e Checklists Existentes**
  * *Objetivo:* Garantir que a inicialização do Molecular Stage não afeta ou quebra a contagem de testes passing dos hotspots de saponificação e da validação Go/No-Go do e-book já homologados.
