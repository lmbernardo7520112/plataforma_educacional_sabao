# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 33: Proposta de Visualização Molecular Premium para o EcoSabon

**Autor:** Antigravity (Arquiteto de Produto Educacional Digital)  
**Status:** ✅ Concluído (Fase de Planejamento)  
**Data:** 2026-06-20  

---

### 1. Proposta Autoral: "Palco Molecular 2.5D" (Molecular Stage)
Propomos a criação de um componente interativo denominado **Palco Molecular EcoSabon**. Esse componente usará uma estrutura em camadas (SVG + transformações 3D em CSS Vanilla) para representar didaticamente a reação de saponificação em profundidade tridimensional qualitativa, sem simulações físicas pesadas ou dependências externas.

---

### 2. Objetivo Pedagógico
Permitir que o estudante visualize espacialmente a transformação de reagentes em produtos, compreendendo que:
1.  **Triglicerídeo (Óleo) e 3 NaOH (Soda)** são reagentes que devem se aproximar.
2.  A quebra das ligações do triglicerídeo libera a cadeia de **Glicerol** e as três cadeias de **Sabão** (sais de ácidos graxos).
3.  O processo ocorre de forma qualitativa e integrada com conceitos de **Química Verde** e regras de segurança de manuseio.

---

### 3. Componentes da Visualização
*   **Molécula de Triglicerídeo Estilizada:** Desenho vetorial em SVG representando o esqueleto de glicerol conectado a três caudas hidrofóbicas longas.
*   **Três Unidades de NaOH:** Esferas coloridas e rotuladas com marcas iônicas simbólicas (Na⁺ e OH⁻).
*   **Moléculas de Sabão Formadas:** Três estruturas separadas mostrando a extremidade polar (hidrofílica, carregada) e a cadeia apolar (hidrofóbica).
*   **Glicerol:** O esqueleto de três carbonos ligado aos grupos hidroxila (-OH).
*   **Interface do Palco (Stage):** Um container com efeito de profundidade visual (gradiente sutil, sombras realistas e rotação por inclinação ou *tilt* de perspectiva em CSS 3D).

---

### 4. Estados Visuais e Fluxo de Reação
*   **Estado 1: Reagentes (Padrão):** O palco exibe o Triglicerídeo em destaque central e as 3 unidades de NaOH posicionadas nas margens, prontas para a reação. O painel textual exibe o objetivo dos reagentes.
*   **Estado 2: Transição/Aproximação:** Ao clicar na animação de reação, as esferas de NaOH se aproximam das ligações éster do triglicerídeo. As caudas começam a se desligar de forma fluida.
*   **Estado 3: Produtos:** Exibição das 3 moléculas de sabão dispostas paralelamente e a molécula de glicerol liberada.
*   **Estado de Alerta de Segurança:** Destaque visual e textual sobre os riscos de manuseio do NaOH concentrado na reação real.

---

### 5. Interação e Controles do Usuário
*   **Botões de Estado Planos:** "Ver Reagentes", "Ver Transição", "Ver Produtos" e "Informações de Segurança".
*   **Efeito Parallax/Tilt:** Ao movimentar o mouse sobre o palco, o container rotaciona suavemente poucos graus (usando `transform: perspective(600px) rotateX(...) rotateY(...)`), criando a sensação realista de profundidade 2.5D sem necessitar de motores WebGL complexos.
*   **Suporte a Redução de Movimento:** Respeito à diretriz `prefers-reduced-motion` no CSS, desativando as transições físicas e o tilt 2.5D caso o usuário possua sensibilidades a animações no sistema operacional.

---

### 6. Acessibilidade (A11y) e Fallback
*   **Acessibilidade Nativa:** Todos os elementos ativos do palco molecular usam tags semânticas (como `<button>` nativos para hotspots) com atributos `aria-expanded`, `aria-controls` e atualizações em `aria-live` para descrever textualmente a transição do estado químico aos leitores de tela.
*   **Fallback Textual:** Uma descrição alternativa estrita em HTML semântico com tabelas explicativas e descrições detalhadas da reação molecular, assegurando que estudantes cegos ou com computadores limitados tenham acesso integral ao conteúdo científico.

---

### 7. Comportamento em Impressão e PDF
O layout de impressão no `print.css` anulará as transformações e ocultações. Em vez de controles interativos, a folha de estilos imprimirá os **Reagentes** e os **Produtos** dispostos de forma linear sequencial (lado a lado ou empilhados), garantindo a legibilidade total do material de apoio físico.

---

### 8. Integração com Hotspots Existentes
Os hotspots acessíveis já versionados no infográfico estático principal do Módulo 2 continuarão funcionando como o baseline confiável. O novo Palco Molecular atuará de forma independente no início do módulo prático, complementando a didática por meio da visualização geométrica.

---

### 9. Declaração Obrigatória de Não-Cópia
> [!IMPORTANT]
> Nenhum conteúdo textual, imagem, screenshot, vídeo, modelo 3D, textura, ícone, asset, script, identidade visual ou arquivo multimídia do Plant Anatomy/Kotobee foi copiado, extraído ou incorporado ao EcoSabon. A análise usa o exemplo exclusivamente como benchmark de padrões abstratos de UX, visualização científica e interação.
