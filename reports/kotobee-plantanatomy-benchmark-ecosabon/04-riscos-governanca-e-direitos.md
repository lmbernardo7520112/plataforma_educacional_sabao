# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 04: Riscos de Governança, Direitos e Mitigação

Este relatório analisa os riscos éticos, jurídicos e técnicos associados à evolução visual do web-book EcoSabon inspirada no benchmark Kotobee, estabelecendo diretrizes claras de conformidade acadêmica.

---

### 1. Riscos de Direitos Autorais e Propriedade Intelectual

#### **Risco de Cópia Inadequada de Assets**
* **O Risco:** Copiar elementos visuais, fotos de fundo, ícones personalizados, esquemas de ilustração de flores/plantas ou trechos textuais do livro *Plant Anatomy* do Kotobee violaria direitos de propriedade intelectual da publicação original.
* **Mitigação Estrita:** 
  1. O e-book Plant Anatomy é usado **exclusivamente como benchmark abstrato** de padrões de layout e interação.
  2. Nenhuma imagem, texto, ícone ou trecho de folha de estilo do Kotobee será importado para o repositório do EcoSabon.
  3. Todos os gráficos (como o infográfico de saponificação e o mapa de estações) devem ser desenvolvidos de forma 100% autoral usando marcação SVG pura e folhas de estilo CSS escritas à mão pelo desenvolvedor.

---

### 2. Riscos Técnicos de Engenharia e UX

#### **Risco de Dependência Proprietária (Lock-in)**
* **O Risco:** Introduzir bibliotecas de terceiros ou frameworks JavaScript acoplados para imitar a paginação e as ferramentas laterais do Kotobee.
* **Mitigação Estrita:** Manter a fundação do EcoSabon em **Vanilla JS (JavaScript Puro) e CSS nativo**. O código deve rodar em navegadores sem internet e sem processos de build complexos, garantindo portabilidade eterna.

#### **Risco de Quebra na Visualização de Impressão (PDF)**
* **O Risco:** Componentes interativos ricos (como popups de hotspots ou cabeçalhos gigantes de módulo) criarem cortes de página desastrosos ou elementos ocultos na versão impressa de apoio ao professor.
* **Mitigação Estrita:** 
  1. Expandir automaticamente todo o conteúdo descritivo dos hotspots em layout linear estático na folha de estilo `@media print` (`print.css`).
  2. Forçar `page-break-inside: avoid` em todos os blocos de destaque e cartões de estação.
  3. Desativar sombras projetadas (`box-shadow`), gradientes complexos de fundo e cores escuras de preenchimento em impressão para economizar tinta física dos docentes.

#### **Risco de Perda de Acessibilidade (A11y)**
* **O Risco:** O uso de popups dinâmicos de hotspots ou animações de deslize lateral invisibilizarem a navegação para leitores de tela ou usuários que operam a interface puramente via teclado.
* **Mitigação Estrita:**
  1. Todos os gatilhos interativos devem ser implementados com `<button>` ou elementos focáveis nativos dotados de `aria-haspopup="dialog"`, `aria-expanded="false"`, `role="button"` e `tabindex="0"`.
  2. Forçar a visibilidade da borda de foco (`outline: 3px solid var(--primary-color)`) sob o seletor `:focus-visible`.
  3. Garantir o fluxo de leitura lógico no DOM: as caixas explicativas dos hotspots devem estar imediatamente após o botão de acionamento na ordem de leitura do HTML.

---

### 3. Governança Ética e Bloqueio de Coleta de Dados

#### **Risco de Confusão com Coleta de Dados Reais**
* **O Risco:** Adicionar caixas de perguntas e respostas ou quizzes dinâmicos na tela que passem a coletar pareceres dos estudantes, respostas dos professores, ou exijam cadastro local (violação das diretrizes éticas de pesquisa da universidade sem termo de consentimento livre e esclarecido - TCLE).
* **Mitigação Estrita:**
  1. O componente de simulação experimental C4/3E **permanece explicitamente bloqueado**.
  2. Qualquer caixa de perguntas ou quiz interativo deve ser implementada apenas de forma local e formativa: as seleções do usuário servem apenas como autoavaliação em tela, **completamente isoladas, sem salvar dados em disco (localStorage/sessionStorage) e sem enviar dados de rede (zero uso de APIs de fetch, WebSocket ou formulários que enviem requisições)**.
  3. Exibir avisos de rodapé indicando que as interações são apenas demonstrativas locais.
