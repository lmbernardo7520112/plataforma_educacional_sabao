# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 01: Relatório Técnico Comparativo e Síntese Executiva

---

### 1. Síntese Executiva

Este documento apresenta a análise comparativa de viabilidade técnica, pedagógica e editorial para a evolução do e-book interativo **EcoSabon (Ensino Replicável de Saponificação Ecológica e Química Verde)**. O objetivo é subsidiar a tomada de decisão estratégica sobre qual formato deve nortear o desenvolvimento do produto educacional, garantindo rigor acadêmico, excelência visual, conformidade ética e aderência às diretrizes da Educação Básica.

Foram inspecionadas quatro abordagens tecnológicas distintas:
1. **HTML/CSS/JS Próprio (Protótipo local em desenvolvimento)**
2. **Articulate Rise 360 (Versão exportada em PDF com 140 páginas)**
3. **EPUB3 Estático (Gerado a partir do Pandoc)**
4. **Kotobee Author (Ferramenta autoral especializada de e-books)**

A análise conclui que **a versão HTML/CSS/JS própria é a que possui maior maturidade técnica de longo prazo**, flexibilidade de manutenção, acessibilidade e interatividade real. Contudo, **a versão do Articulate Rise é a que melhor traduz um alto nível de acabamento editorial, boa hierarquia visual, ritmo de leitura e uso qualificado de espaços brancos**. Portanto, a recomendação final de engenharia editorial é **manter o HTML próprio como núcleo técnico e migrar os padrões visuais e o ritmo de leitura do Articulate Rise para o CSS/HTML customizado**, evitando a dependência de plataformas proprietárias SaaS de alto custo e limitações de portabilidade do PDF.

---

### 2. Análise Detalhada dos Formatos

#### 2.1. Protótipo HTML/CSS/JS Próprio
A versão em código livre do EcoSabon é construída sobre tecnologias web nativas. Ela atua como um aplicativo web de página única (SPA) com alternância dinâmica de abas.

* **Pontos Fortes:**
  * **Interatividade Real:** Suporte a formulários dinâmicos interativos (escala Likert real e caixas de texto com persistência e lógica de cálculo de estequiometria reativa).
  * **Zero Dependências:** Funciona 100% offline em qualquer dispositivo sem necessidade de conexão à internet, servidores backend ou CDNs.
  * **Manutenibilidade e Testabilidade:** Estrutura modular passível de automação de testes unitários (como demonstrado pelos testes existentes em `npm run test`).
  * **Acessibilidade:** Controle total de tags semânticas ARIA, contrastes e caminhos de foco para leitores de tela.
  * **Impressão Customizada:** Presença de uma folha de estilos de impressão dedicada (`print.css` e `main-print.css`) para conversão em PDFs locais.

* **Pontos Fracos:**
  * **Aparência de Dashboard/App:** O protótipo atual parece excessivamente um painel administrativo ou "plataforma de software" e insuficientemente um "e-book/livro digital".
  * **Déficit de Espaçamento e Ritmo Didático:** Ausência de capas com apelo editorial rico, separadores de capítulos explícitos e ritmo fluido de leitura contínua.
  * **Ausência de Elementos Visuais Editoriais:** Poucos respiros visuais, ausência de sumário gráfico e cards editoriais com variações cromáticas harmônicas.

* **Riscos:**
  * Risco de "reinvencionismo de UI": tentar recriar toda uma interface do zero e gerar layouts inconsistentes ou cansativos para leitura prolongada.

* **Oportunidades:**
  * Implementar uma folha de estilo que mimetize o visual clean e sofisticado do Articulate Rise 360 (espaçamento generoso, fontes elegantes, cards suaves), unindo a beleza da interface SaaS com a robustez e propriedade do código nativo.

---

#### 2.2. Versão Articulate Rise 360 (Exportação PDF)
Esta versão representa um material construído na plataforma Rise 360 da Articulate, exportado para formato PDF estático de 140 páginas.

* **Pontos Fortes:**
  * **Excelente Apelo Visual e Design System Premium:** Tipografia extremamente profissional, contrastes harmoniosos, uso correto de espaços em branco e hierarquia editorial imediata.
  * **Sensação de E-book Profissional:** Possui uma capa atraente, sumário estruturado linearmente, abertura de módulos com banners temáticos e "ritmo didático" de leitura fluida.
  * **Apresentação de Blocos de Destaque:** Caixas de dicas, segurança, planos B e alertas são diagramados de forma muito elegante, melhorando o escaneamento visual do texto.

* **Pontos Fracos:**
  * **Inadequação de Portabilidade para Impressão:** Ao exportar o curso web interactivo do Rise 360 para PDF, o layout responsivo é expandido linearmente. Elementos interativos (como accordions abertos, carrosséis esticados e botões de revelação de etapas) ocupam páginas inteiras. O PDF resultante possui 140 páginas, com muitas quebras de página inadequadas, espaços vazios enormes e redundâncias visuais que inviabilizam a impressão física.
  * **Perda de Interatividade:** Quizzes e interações tornam-se caixas de texto estáticas e inativas.
  * **Custo e Dependência Proprietária (Lock-in):** O Articulate Rise é uma plataforma SaaS proprietária altamente custosa. Alterações no material original exigem assinatura ativa e limitam a soberania tecnológica sobre o material.

* **Riscos:**
  * Depender do PDF gerado pelo Articulate como produto final gera um arquivo pesado, de difícil leitura linear em celulares e impossível de ser submetido à impressão econômica de baixo custo por escolas.

* **Oportunidades:**
  * Mapear todos os componentes que deram certo (a capa com tipografia de alta visibilidade, os banners de introdução de módulos, os blocos de alerta e perigo) e replicar suas propriedades geométricas (paddings, border-radii, cores HSL, tipografias) no HTML.

---

#### 2.3. Versão EPUB3 (Gerada via Pandoc)
Este arquivo é o resultado de uma compilação baseada no Pandoc para gerar um livro digital fluido padrão EPUB.

* **Pontos Fortes:**
  * **Portabilidade em E-readers:** Extremamente leve e legível em leitores dedicados (Kobo, Kindle, Google Play Livros, Apple Books), permitindo reflow automático do texto conforme o tamanho da fonte configurado pelo leitor.
  * **Preservação dos Metadados:** Integração correta dos metadados de governança da dissertação.

* **Pontos Fracos:**
  * **Empacotamento Monolítico Falho:** A análise da estrutura interna revelou que a compilação gerou apenas um arquivo de texto principal (`text/ch001.xhtml`) contendo todo o e-book, o que sobrecarrega leitores de e-book de baixo desempenho.
  * **Destruição da Interatividade:** Toda a interatividade foi perdida ou forçada para um estado estático aberto (ex: blocos hidden renderizados de forma visível e permanente), quebrando a lógica de autoavaliação e o preenchimento de checklists reativos.
  * **Perda da Riqueza Gráfica:** Diagramas de sala de aula e tabelas complexas perdem a formatação responsiva em telas de e-readers comuns, quebrando as linhas.

* **Riscos:**
  * Apresentar o EPUB atual à banca ou a professores causa frustração imediata, pois a interatividade (um dos pilares pedagógicos do EcoSabon) torna-se inexistente.

* **Oportunidades:**
  * Manter o EPUB como uma exportação de acessibilidade secundária estritamente textual para e-readers, sem prometer interatividade nele.

---

### 3. Conclusão e Formato Orientador da Próxima Evolução

#### Formato Mais Maduro
* **HTML/CSS/JS Próprio** é o formato tecnologicamente mais maduro e substituível. Ele é propriedade intelectual do autor da dissertação, não requer licenças de software caras, permite testes automatizados e suporta interatividade real reativa.

#### Formato que deve Orientar a Próxima Evolução
* **O modelo editorial do Articulate Rise 360 deve orientar a evolução visual do HTML próprio.** A próxima etapa de desenvolvimento não deve migrar para o Articulate (para evitar custos e perda de interatividade), mas sim trazer a **estética sofisticada, tipografia, capa editorial, abertura de capítulos e ritmo didático do Articulate para dentro do HTML/CSS próprio**.

O HTML deixará de parecer um "painel" e passará a se comportar como um **Web-book Editorial Premium**, que roda offline com interações fluidas e se formata perfeitamente para impressão física econômica através do CSS.
