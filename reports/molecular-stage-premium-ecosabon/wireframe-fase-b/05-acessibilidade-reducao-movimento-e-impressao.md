# Molecular Stage — Wireframe & Especificação Fase B
## Documento 05: Acessibilidade, Redução de Movimento e Impressão

Este documento detalha os requisitos obrigatórios de acessibilidade universal (WCAG 2.1 AA), tratamento de redução de movimento físico e a formatação automatizada para impressão física (PDF) da futura camada Molecular Stage.

---

### 1. Acessibilidade por Teclado e Foco Visível
* **Navegação Sem Mouse:** Todos os elementos interativos (botões de avanço, recuo e seleção de etapa) devem pertencer ao fluxo sequencial de foco do teclado (usando tags HTML nativas `<button>` ou `tabindex="0"`).
* **Foco Visível Claro:** Fica estabelecido o uso de contornos de alto contraste para foco visível, proibindo a remoção de outlines sem um substituto visual adequado:
  ```css
  .molecular-control:focus-visible {
    outline: 3px solid #319795; /* Cor Teal de alto contraste */
    outline-offset: 2px;
  }
  ```
* **Atalhos de Teclado:** Suporte a teclas direcionais (Seta Esquerda/Direita) mapeadas via `keydown` no JavaScript para navegar de forma rápida pelas etapas da reação.

---

### 2. Compatibilidade com Leitores de Tela (Screen Readers)
* **Descrições ARIA Dinâmicas:** A área do Palco Molecular deve possuir um contêiner invisível com o atributo `aria-live="polite"`. A cada mudança de etapa na animação temporal, o JavaScript atualizará o texto descritivo deste bloco, informando síncronamente ao leitor de tela o que ocorreu no palco (ex: *"Etapa 4 de 8: A ligação éster começa a se romper com a aproximação do íon hidróxido"*).
* **Ocultação de Ruídos Visuais:** Elementos puramente decorativos dentro do SVG (como setas de fluxo, sombras e traços auxiliares) devem receber `aria-hidden="true"`, impedindo que os leitores de tela tentem soletrar coordenadas vetoriais.

---

### 3. Degradabilidade e Fallback sem JavaScript
* Se o usuário carregar o e-book em um navegador com JavaScript bloqueado ou desativado:
  * O Palco Molecular dinâmico não inicializa.
  * O CSS desativa os controles interativos ocultando os botões "Anterior" e "Avançar".
  * O contêiner de fallback textual equivalente (`#molecular-fallback`) é automaticamente exibido de forma aberta e estática no final do componente, contendo a explicação textual de todas as 9 etapas em formato de lista corrida.

---

### 4. Impressão e Linearização de Conteúdos
* **Linearização sob `@media print`:**
  * O Palco Molecular oculta dinamicamente os controles interativos interligados por botões.
  * O componente gráfico dissolve o palco único em uma trilogia de diagramas estáticos representativos de:
    1. *Estado Inicial (Reagentes separados).*
    2. *Estado Intermediário (Clivagem e Transição).*
    3. *Estado Final (Sabão e Glicerol formados).*
  * A folha de estilos de impressão expande o texto descritivo de fallback abaixo dos diagramas, permitindo que o leitor de papel consuma a transposição didática de forma linearizada sem perda de contexto conceitual.

---

### 5. Proibição de Conteúdo Essencial Apenas Visual
* Nenhuma informação conceitual ou química indispensável para a compreensão do processo de saponificação deve ser transmitida exclusivamente por meio de cores ou animações visuais.
* Cada transição cromática (como a ligação éster ficando amarela) ou movimento físico de cisão deve vir obrigatoriamente acompanhado de sua representação descritiva equivalente textual na legenda ativa e no painel de acessibilidade.
* O contraste de cores entre o texto, as esferas atômicas e o fundo da tela deve cumprir o limite mínimo de `4.5:1` para textos normais e `3:1` para elementos gráficos estruturais.
