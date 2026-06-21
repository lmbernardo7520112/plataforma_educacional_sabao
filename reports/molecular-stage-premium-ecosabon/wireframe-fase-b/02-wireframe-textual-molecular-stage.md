# Molecular Stage — Wireframe & Especificação Fase B
## Documento 02: Wireframe Textual do Palco Molecular

Este documento especifica a estrutura visual e o layout conceitual do **Molecular Stage**, descrevendo as regiões da tela, os controles e o comportamento da interface responsiva de forma textual e auditável.

---

### 1. Layout Geral e Áreas da Interface

O componente do Palco Molecular é disposto em uma seção vertical dividida em quatro áreas principais, estruturadas semanticamente em HTML:

```
+-------------------------------------------------------------------------+
| [Área A] CABEÇALHO DA FEATURE E INDICAÇÃO DE ETAPA                      |
| Título: "Visualização Molecular da Saponificação"                      |
| Indicador visual: "Etapa X de Y" e barra de progresso horizontal linear |
+-------------------------------------------------------------------------+
| [Área B] PALCO DE VISUALIZAÇÃO GRÁFICA (SVG 2.5D)                       |
| LADO ESQUERDO:                        LADO DIREITO:                     |
| Molécula de Triglicerídeo (Óleo) e    Indicadores de Ligação Química,   |
| Moléculas de NaOH (Base Forte).       Área de clivagem e formação.      |
|                                                                         |
| (Exibe estados estáticos de moléculas em 2.5D com cores e contornos)    |
+-------------------------------------------------------------------------+
| [Área C] CONTROLES E LEGENDAS                                           |
| [Botão: Anterior]   [Botão: Avançar]   [Caixa de Seleção: Acessibilidade]|
| Legenda ativa: O Carbonato de Sódio, Sódio (Na), Oxigênio (O) com cores.|
+-------------------------------------------------------------------------+
| [Área D] PAINEL DE CONTEXTO E FALLBACK TEXTUAL EQUIVALENTE              |
| Descrição didática em texto corrido detalhando passo a passo a reação   |
| física e química da etapa ativa (aria-live para leitores de tela).      |
+-------------------------------------------------------------------------+
```

---

### 2. Detalhamento de Posição de Elementos

* **Posição dos Reagentes:** Na etapa inicial, a molécula de Triglicerídeo (formada por um backbone de glicerol acoplado a 3 caudas R de ácidos graxos) é posicionada centralizada no quadrante esquerdo. Três moléculas de NaOH ($Na^+$ e $OH^-$ separados de forma ionizada qualitativa) são posicionadas no quadrante superior direito de forma dispersa.
* **Área de Transição:** O quadrante central superior representa a zona de ataque nucleofílico. Setas vetoriais indicam o direcionamento do oxigênio do hidróxido atacando as carbonilas do éster. As ligações a serem quebradas aparecem tracejadas em amarelo para destaque visual.
* **Posição dos Produtos:** No quadrante inferior direito, após a clivagem, as 3 moléculas de sabão ($R-COO^- Na^+$) alinham-se em paralelo, simulando uma estrutura micelar incipiente. O glicerol estabilizado (glicerina) posiciona-se no quadrante inferior esquerdo.

---

### 3. Controles Mínimos Permitidos
Para manter a acessibilidade e evitar dependências de componentes complexos, os únicos controles interativos são:
* **Botão "Etapa Anterior" (`#btn-molecular-prev`):** Avança o estado visual para o frame de animação anterior. Fica desabilitado na Etapa 0.
* **Botão "Próxima Etapa" (`#btn-molecular-next`):** Avança o estado visual para a próxima etapa. Fica desabilitado na etapa final.
* **Teclas de Atalho de Teclado:** Setas direcionais esquerda e direita atuam como atalho nativo para navegação rápida de etapas.

---

### 4. Legendas e Fallback Textual Equivalente

* **Painel de Legendas:** Localizado abaixo do palco, mapeia as cores das esferas atômicas simplificadas (Carbono = Cinza, Oxigênio = Vermelho, Hidrogênio = Branco, Sódio = Azul/Lilás).
* **Fallback Textual Equivalente:** Um bloco `<div id="molecular-fallback" role="region" aria-live="polite">` exibe a descrição detalhada por escrito da etapa ativa. Se o JavaScript estiver desativado no navegador, este bloco exibe o texto corrido e linearizado de todas as etapas de forma contínua, garantindo degradabilidade elegante.

---

### 5. Responsividade e Comportamento Mobile
* Em telas menores (largura de tela menor que 768px), o layout de 2 colunas se reorganiza em uma única coluna vertical.
* O Palco Gráfico SVG fica no topo, escalando proporcionalmente via atributo `viewBox` (sem gerar barras de rolagem horizontais).
* Os botões de navegação e as legendas expandem para ocupar 100% da largura da tela mobile, facilitando a interação por toque (*tap target size* mínimo de 48x48px).

---

### 6. Comportamento sob Media Print (Impressão)
* Ao disparar a impressão (via `@media print` no CSS), o palco molecular oculta os botões de controle ("Anterior"/"Avançar").
* O palco molecular interativo dinâmico se dissolve em uma série de **3 ilustrações de diagramas SVG estáticos impressos lado a lado ou em lista vertical** correspondendo a:
  1. *Estado 1: Reagentes de Saponificação.*
  2. *Estado 2: Transição e Clivagem de Ligações.*
  3. *Estado 3: Produtos Finais (Sabão e Glicerol).*
* O texto descritivo de fallback é impresso em tamanho padrão, de forma linear e legível sob luz ambiente.

---

### 7. Comportamento com Redução de Movimento
Se a diretiva de acessibilidade de mídia do usuário estiver ativa no sistema operacional:
```css
@media (prefers-reduced-motion: reduce) {
  /* Transições de opacidade e transformações de átomos são desativadas */
  .atom, .molecular-connection {
    transition: none !important;
    animation: none !important;
  }
}
```
Neste modo, a transição entre etapas ocorre de forma instantânea (sem efeitos de fade, deslizamento ou redimensionamento de átomos), prevenindo o acionamento de sensibilidade vestibular em leitores sensíveis.
