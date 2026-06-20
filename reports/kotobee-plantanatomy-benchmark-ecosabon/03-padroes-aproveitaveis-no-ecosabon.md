# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 03: Padrões Aproveitáveis no EcoSabon

Este documento descreve como implementar padrões visuais e interativos inspirados no benchmark Kotobee utilizando apenas HTML, CSS e JavaScript nativos, sem introduzir dependências proprietárias ou comprometer os gates de acessibilidade e governança.

---

### 1. Padrões Visuais e de Diagramação Inspirados

#### **Padrão V1: Cabeçalhos Hero de Módulo (Aberturas de Capítulo)**
* **O Padrão:** Uso de seções de abertura com imagem de fundo estilizada (opacidade reduzida ou filtros de escurecimento) e tipografia grande centralizada para marcar a entrada de novas unidades de aprendizado.
* **Implementação Técnica:** Criar uma classe CSS `.module-hero` utilizando:
  ```css
  .module-hero {
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.9), rgba(17, 66, 28, 0.9)), url('../assets/background-patter.svg');
    background-size: cover;
    background-position: center;
    color: var(--text-light);
    text-align: center;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }
  ```
* **Componente Afetado:** Cabeçalhos de módulo no arquivo `index.html`.

#### **Padrão V2: Caixas de Destaque Temáticas (Callouts)**
* **O Padrão:** Quadros de alerta visualmente distintos (borda lateral colorida, fundo sutil e ícone identificador) para dicas, avisos de segurança ou observações conceituais.
* **Implementação Técnica:** Criar uma classe `.callout` estruturada com modificadores BEM:
  ```css
  .callout {
    display: flex;
    gap: 1rem;
    padding: 1.25rem;
    border-left: 4px solid var(--border-color);
    background-color: var(--bg-soft);
    border-radius: 0 8px 8px 0;
    margin: 1.5rem 0;
  }
  .callout--safety {
    border-left-color: var(--color-danger);
    background-color: var(--bg-danger-light);
  }
  .callout--concept {
    border-left-color: var(--color-info);
    background-color: var(--bg-info-light);
  }
  ```
* **Componente Afetado:** Bloco de erros comuns e avisos nas estações.

---

### 2. Padrões Interativos de Leitura

#### **Padrão I1: Diagrama de Hotspots Acessível (Imagem Rotulada)**
* **O Padrão:** Uma ilustração técnica com pequenos botões flutuantes que exibem descrições explicativas ao serem clicados ou focados.
* **Implementação Técnica:** Utilizar posicionamento absoluto (`position: absolute`) com porcentagens para garantir a responsividade em cima de um contêiner com `position: relative`. A interatividade é feita de forma acessível usando tags `<button>` com atributos ARIA:
  ```html
  <div class="hotspot-diagram">
    <img src="diagrama.svg" alt="Diagrama da reação" class="hotspot-diagram__img">
    <button class="hotspot-pin" style="top: 25%; left: 40%;" aria-expanded="false" aria-controls="hotspot-desc-1" aria-label="Detalhar Triglicerídeo">
      <span class="hotspot-pin__icon">+</span>
    </button>
    <div id="hotspot-desc-1" class="hotspot-bubble" hidden>
      <strong>Triglicerídeo:</strong> Molécula de gordura encontrada no óleo residual.
    </div>
  </div>
  ```
  O JavaScript simplesmente altera o estado do atributo `aria-expanded` e a visibilidade (`hidden`) do balão de diálogo ao clique ou foco de teclado (Enter/Espaço).
* **Componente Afetado:** Infográfico de saponificação (permitindo detalhar cada molécula da reação ao clique).

---

### 3. Categorização de Padrões: Seguros vs. Arriscados

| Padrão Analisado | Categoria | Risco Técnico / Pedagógico | Recomendações de Segurança |
|------------------|:---------:|----------------------------|----------------------------|
| **Cabeçalhos Hero** | **Seguro** | Zero risco. Apenas HTML/CSS estático. | Usar gradientes CSS e SVGs inline para evitar imagens externas pesadas. |
| **Caixas Callout** | **Seguro** | Zero risco. Aprimora a hierarquia visual. | Garantir contraste mínimo de 4.5:1 em todos os textos sobre fundos coloridos. |
| **Hotspots em Diagramas** | **Seguro (Controlado)**| Baixo risco. Requer tratamento de acessibilidade (foco e ARIA). | Usar tags `<button>` nativas para suporte gratuito a teclado e leitores de tela. |
| **Dicionário/Glossário Lateral** | **Seguro (Controlado)**| Médio risco. Pode poluir a tela se não for modular. | Implementar como caixas flutuantes acessíveis (popover API) ou balões semânticos nativos. |
| **Simulador Dinâmico** | ⚠️ **Arriscado** | Alto risco de violar governança ética (confundir com simulação real). | **Manter Bloqueado**. Só implementar se restrito a constantes pedagógicas fixas pré-validadas. |
| **Sistema de Anotações** | ⚠️ **Arriscado** | Risco de introduzir persistência complexa ou dependência de banco/cookies. | Não implementar. O navegador do estudante já possui recursos de notas/extensões nativas. |
