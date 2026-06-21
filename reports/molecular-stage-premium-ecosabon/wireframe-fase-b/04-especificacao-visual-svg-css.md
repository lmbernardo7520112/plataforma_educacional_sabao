# Molecular Stage — Wireframe & Especificação Fase B
## Documento 04: Especificação Visual de Gráficos SVG/CSS

Este documento estabelece o design system visual, a paleta cromática, as formas gráficas e as restrições técnicas de renderização para a futura implementação da camada Molecular Stage baseada em SVG estático/animado e CSS.

---

### 1. Paleta de Cores Recomendada

A paleta de cores adota contrastes elevados em conformidade com as diretrizes de acessibilidade (WCAG 2.1 AA) sobre fundo escuro (sleek dark mode) ou claro:

| Elemento Químico / Área | Cor (Hex) | Função Visual |
| :--- | :---: | :--- |
| **Carbono (C)** | `#4A5568` | Esferas de carbono estruturais (cinza escuro) |
| **Oxigênio (O)** | `#E53E3E` | Esferas dos grupos éster, hidroxila e carboxila (vermelho) |
| **Hidrogênio (H)** | `#EDF2F7` | Pequenas esferas de hidrogênio (cinza claro/branco) |
| **Sódio (Na)** | `#805AD5` | Esferas dos cátions de sódio ionizados (roxo) |
| **Cauda Hidrofóbica (R)**| `#718096` | Linha em ziguezague representando radicais orgânicos |
| **Ligação Éster ativa** | `#ECC94B` | Linha tracejada de alerta na clivagem (amarelo) |
| **Ataque Nucleofílico**  | `#319795` | Setas curvas vetoriais indicando movimentação de elétrons (teal) |

---

### 2. Formas Geométricas Autorais e Simplificação
* **Representação Plana Simplificada:** Os átomos são representados como círculos 2D empilhados de forma a simular esferas.
* **Modelo Flat 2.5D:** As esferas recebem um gradiente radial sutil (`<radialGradient>` no SVG) que confere profundidade tridimensional ("2.5D"), sem a necessidade de processamento gráfico pesado.
* **Radicais de Cadeia Longa (R):** Para não sobrecarregar visualmente a tela, as caudas de carbonos dos ácidos graxos são condensadas graficamente em uma única linha espessa em ziguezague finalizada com a letra "R" estilizada em caixa de texto SVG.

---

### 3. Sombras e Perspectiva
* Elementos em transição recebem uma sombra projetada suave através de filtros nativos do SVG (`<filter>` com `feDropShadow`).
* Evita-se perspectivas de ponto de fuga complexas. Adota-se projeção ortogonal paralela simplificada para que todas as moléculas fiquem no mesmo plano de visualização, facilitando o mapeamento de coordenadas e a legibilidade para estudantes de nível médio.

---

### 4. Diretrizes de Animação

#### **Animações Leves Permitidas (via CSS Transitions / Keyframes):**
* Transição de opacidade (`opacity`) e redimensionamento escalar (`transform: scale()`) para átomos surgindo ou se afastando.
* Movimentação linear ou por curvas de Bézier suaves de átomos de hidróxido caminhando em direção à carbonila.
* Pulsação luminosa suave nas ligações que serão rompidas.

#### **Animações Proibidas:**
* Rotação livre tridimensional de moléculas em torno dos eixos X, Y ou Z.
* Simulação de colisão física elástica de partículas com múltiplos rebotes.
* Movimentos brownianos caóticos de alta frequência (podem causar cansaço visual e distração pedagógica).

---

### 5. Limites de Performance e Arquivos
* **Tamanho Máximo do SVG:** A marcação SVG do Palco Molecular não deve exceder 50 KiB de código textual limpo.
* **Uso de GPU:** Toda a animação de transição deve ser executada utilizando propriedades CSS otimizadas (`transform` e `opacity`), garantindo a renderização nativa de 60 FPS no navegador em laboratórios escolares de baixo desempenho.
* **Bans de Frameworks:** Fica terminantemente proibido o uso de WebGL, Canvas 2D dinâmico do HTML5, Three.js, Babylon.js, Unity, Sketchfab ou qualquer biblioteca externa de renderização molecular. Os gráficos devem ser desenvolvidos puramente com tags nativas `<svg>`, `<circle>`, `<path>` e folhas de estilos CSS.
