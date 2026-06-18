# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 06: Plano de Ação Evolutivo do E-book EcoSabon

Este documento estabelece o roteiro técnico e editorial dividido em fases para transformar o protótipo HTML/CSS/JS atual do **EcoSabon** em um web-book interativo com acabamento editorial premium, preservando o rigor pedagógico e científico.

---

### Fase 1: Melhorias Visuais Imediatas no HTML

* **Objetivo:** Corrigir os gargalos ergonômicos de leitura e iniciar a transição estética da interface de "dashboard" para um layout de leitura confortável.
* **Tarefas:**
  1. Definir largura máxima do bloco de leitura em `max-width: 800px` e centralizar na tela.
  2. Ajustar `line-height` do corpo do texto para `1.65` e `margin-bottom` dos parágrafos para `1.2rem`.
  3. Substituir as bordas rígidas e sombras escuras dos cartões por bordas de canto arredondado suave (`border-radius: 8px`) e sombras imperceptíveis (`box-shadow: 0 4px 12px rgba(0,0,0,0.03)`).
  4. Suavizar cores brutas de background de botões e links para uma paleta HSL coordenada com foco em verde-escuro ecológico (`hsl(145, 50%, 20%)`) e detalhes âmbar/dourados.
* **Arquivos a alterar:**
  * `ebook-ecosabon-prototipo/src/styles/main.css`
* **Critérios de Aceite:**
  * Leitura confortável comprovada em resoluções desktop comuns (sem esticar o texto até as bordas).
  * Ausência de contrastes inferiores ao padrão WCAG AA (mínimo de 4.5:1 para texto normal).
* **Riscos Potenciais:**
  * Pequenas quebras em elementos absolutos ou centralizações órfãs no CSS legado.

---

### Fase 2: Transformação Editorial para Aparência de Web-Book

* **Objetivo:** Adotar a estrutura linear com divisões de capítulos claras e banners de abertura semelhantes ao visual do Articulate Rise 360, removendo o aspecto de "aplicativo de controle".
* **Tarefas:**
  1. **Capa Editorial Integrada:** Criar uma seção de abertura da página (`hero-cover`) com `min-height: 90vh`, metadados estruturados de forma sóbria e botões de chamada elegantes.
  2. **Banners de Módulo (Capítulos):** Desenhar divisores de módulo na página inteira com cor de destaque HSL rica, contendo o número do módulo em fonte proeminente, o título do módulo e a listagem de objetivos de aprendizagem.
  3. **Menu Lateral de Leitura:** Implementar um painel lateral retrátil contendo o Sumário do e-book com indicador gráfico de progresso (ex: "Módulo 1 de 4 concluído") baseado na rolagem de tela.
  4. **Fluxo de Leitura Linear Conectado:** Utilizar `IntersectionObserver` para fazer o menu lateral atualizar de forma automática e silenciosa conforme o leitor rola pelas seções, mantendo a sensação de fluxo contínuo.
* **Arquivos a alterar:**
  * `ebook-ecosabon-prototipo/index.html`
  * `ebook-ecosabon-prototipo/src/styles/main.css`
  * `ebook-ecosabon-prototipo/src/scripts/app.js`
* **Critérios de Aceite:**
  * A navegação vertical suave atualiza dinamicamente o sumário lateral sem travamentos.
  * A capa é exibida perfeitamente em dispositivos móveis e desktop, simulando uma capa de livro real.
* **Riscos Potenciais:**
  * Aumento da complexidade do arquivo JavaScript para lidar com a escuta de rolagem de tela e detecção de posição ativa.

---

### Fase 3: Enriquecimento Gráfico/Ilustrativo e Componentes de Destaque

* **Objetivo:** Reestruturar os diagramas de sala de aula e introduzir caixas temáticas coloridas e ícones SVG integrados.
* **Tarefas:**
  1. **Caixas Temáticas Premium:** Substituir o visual padrão dos blocos de revelação de "Plano B", "Erro Comum dos Alunos" e "Dica de Mediação" pelas caixas temáticas HSL pastel com bordas coloridas sutis e ícones vetoriais específicos em SVG (lâmpada para dica, triângulo para perigo, prancheta para Plano B).
  2. **Infográfico da Reação de Saponificação:** Incorporar um elemento gráfico vetorial CSS estilizado para a reação estequiométrica: `Triglicerídeo + 3 NaOH ➔ 3 Sabão + Glicerol`, facilitando a assimilação quantitativa.
  3. **Visualizador de Estações:** Melhorar a reatividade do diagrama de sala de aula de rotação por estações, tornando-o um mapa interativo onde clicar em uma estação rola o leitor diretamente para a descrição detalhada daquela estação.
* **Arquivos a alterar:**
  * `ebook-ecosabon-prototipo/index.html`
  * `ebook-ecosabon-prototipo/src/styles/main.css`
  * `ebook-ecosabon-prototipo/src/scripts/interactions.js`
* **Critérios de Aceite:**
  * Ícones embutidos em SVG se adaptam a temas Light e Dark.
  * O diagrama de estações funciona de forma tátil e responsiva no celular sem quebrar as caixas de texto.
* **Riscos Potenciais:**
  * Excessos de elementos decorativos pesados que prejudiquem a velocidade de carregamento offline.

---

### Fase 4: Mecanismo de Validação Docente e Submissão Ética

* **Objetivo:** Implementar o protótipo de validação de forma alinhada com as boas práticas éticas e de privacidade de dados.
* **Tarefas:**
  1. **Exportação de Respostas da Validação (Recurso Demonstrativo):** Adicionar um botão "Exportar Respostas da Validação" ao final do formulário (Módulo Validação). Quando o docente clicar, o JavaScript compila as respostas da escala Likert (perguntas 1 a 5) e a resposta da pergunta aberta em um arquivo de texto formatado (ou JSON) e inicia o download local automático.
  2. **Mecanismo de Reset do Checklist (Recurso Demonstrativo):** Permitir salvar o progresso dos checklists e respostas de autoavaliação localmente no `localStorage` do navegador com botão explícito de "Limpar Progresso".
  3. **Governança de Dados e Anonimização:** Explicitar nas instruções do formulário que os campos abertos não devem solicitar nem receber nomes de alunos, escolas, professores ou qualquer outro dado pessoal identificável (garantindo conformidade com a LGPD e anonimato ético).
  4. **Submissão Ética (CEP):** Explicitar formalmente na interface que a exportação de respostas, o uso de `localStorage` e o formulário docente são **recursos estritamente demonstrativos** e não podem ser utilizados para coleta real de dados de pesquisa sem a devida autorização do Comitê de Ética em Pesquisa (CEP/CONEP), aplicação de Termo de Consentimento Livre e Esclarecido (TCLE) e governança de dados estruturada.
* **Arquivos a alterar:**
  * `ebook-ecosabon-prototipo/index.html`
  * `ebook-ecosabon-prototipo/src/scripts/interactions.js`
* **Critérios de Aceite:**
  * Presença visível de avisos de que os formulários são recursos demonstrativos sem coleta real ativa de dados pessoais.
  * Garantia de que nenhum campo de formulário no e-book solicita dados pessoais identificáveis.
  * Clicar no botão gera o download local do arquivo `respostas-validacao-ecosabon.txt` apenas para simulação e teste de fluxo.
* **Riscos Potenciais:**
  * Uso indevido do protótipo em ambiente de produção sem a aprovação do CEP e sem as devidas salvaguardas éticas e de privacidade.

---

### Fase 5: Homologação do Produto Educacional e Publicação

* **Objetivo:** Homologar o e-book com dados reais da dissertação de mestrado após a validação e definir a rota final de publicação técnica.
* **Tarefas:**
  1. **Substituição de Dados Fictícios:** Substituir placeholders por dados reais validados e remover avisos de dados fictícios apenas nas seções efetivamente homologadas.
  2. **Homologação das Habilidades BNCC:** Preencher e detalhar o alinhamento à BNCC ou currículo local revisado e justificado conforme o recorte da dissertação e avaliação da banca.
  3. **Geração do PDF de Alta Resolução para Impressão:** Utilizar o navegador Google Chrome em modo Headless (`chrome --headless --print-to-pdf`) alimentado pela folha de estilo `print.css` aprimorada para gerar o PDF A4 oficial de distribuição física.
  4. **Publicação Web:** Hospedar a pasta HTML5 compactada em um serviço estático gratuito e perene de alta disponibilidade, como o GitHub Pages.
* **Arquivos a alterar:**
  * `ebook-ecosabon-prototipo/index.html`
  * `ebook-ecosabon-prototipo/src/styles/print.css`
* **Critérios de Aceite:**
  * Substituição bem-sucedida de placeholders apenas nas áreas com dados reais e justificados de acordo com as bancas e Comitês.
  * PDF gerado via comando de impressão possui cabeçalhos e rodapés limpos, com paginação exata e sem cortes órfãos.
* **Riscos Potenciais:**
  * Alterações de última hora no texto da dissertação exigirem reavaliação de layout.

---

### 3. Execução Recomendada do Plano (Cronograma de Homologação)

Para garantir segurança ética, governança técnica e validação pedagógica progressiva, a implementação prática das melhorias deve ser fatiada nas seguintes execuções:

* **Execução 1 (Visual e Componentes Leves):** 
  * Foco na **Fase 1** (melhorias ergonômicas, line-height, max-width) integrando os **componentes visuais leves da Fase 3** (caixas temáticas HSL pastel para Plano B e Dicas, ícones SVG embutidos). Não altera a estrutura de SPA atual nem adiciona scripts complexos.
* **Execução 2 (Fluxo de Leitura e Layout):** 
  * Implementação da **Fase 2** (capa editorial integrada, transições de scroll contínuo e sumário lateral reativo), condicionada à prévia aprovação visual e ergonômica dos estilos da Execução 1 pelo autor.
* **Execução 3 (Protótipo de Validação Ético):** 
  * Execução da **Fase 4** (lógica de persistência e download de respostas). Este desenvolvimento deve ser tratado estritamente como um **protótipo funcional fechado para validação técnica**, sem coleta de dados reais até aprovação ética definitiva.
* **Execução 4 (Homologação Final com Dados Reais):** 
  * Execução da **Fase 5** (inserção de resultados reais de aplicação do reator e análises estatísticas da pesquisa, alinhamento curricular e remoção seletiva de placeholders) **somente após a validação e homologação dos dados reais obtidos na dissertação** e deferimento das instâncias de ética.
