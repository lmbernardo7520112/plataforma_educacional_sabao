# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 02: Comparativo Kotobee vs. EcoSabon

Este documento apresenta a matriz comparativa e a pontuação técnica detalhada das soluções de leitura digital, confrontando o leitor proprietário do Kotobee Author com o web-book nativo desenvolvido para o EcoSabon.

---

### 1. Tabela Comparativa de Critérios (Scores 0–10)

| Critério de Avaliação | Kotobee Reader | EcoSabon Web-Book | Raciocínio Técnico / UX |
|-----------------------|:--------------:|:-----------------:|-------------------------|
| **Capa Editorial** | 8 | 9 | EcoSabon integra a capa suavemente no fluxo de leitura contínua, enquanto o Kotobee exige a transição completa de capítulo. |
| **Sumário (TOC)** | 8 | 9 | O sumário do EcoSabon atualiza o progresso em tempo real e fica disponível lateralmente sem cobrir o texto. |
| **Navegação Geral** | 7 | 9 | O Kotobee usa paginação física truncada; o EcoSabon usa rolagem contínua fluida com âncoras suaves. |
| **Aparência de E-book** | 9 | 7 | O Kotobee emula a sensação tradicional de "e-reader", enquanto o EcoSabon aproxima-se de um site rico moderno. |
| **Riqueza Visual** | 8 | 8 | Ambas as soluções utilizam paletas elegantes, tipografia customizada e SVGs integrados. |
| **Interatividade** | 8 | 7 | O Kotobee possui hotspots e quizzes prontos; o EcoSabon possui mapa de sala e cartões reveláveis customizados. |
| **Legibilidade** | 8 | 9 | A leitura vertical limpa do EcoSabon reduz o ruído de barras de rolagem duplicadas que ocorrem no Kotobee. |
| **Acessibilidade** | 5 | 9 | O EcoSabon segue estritamente diretrizes ARIA, foco de teclado visível e tags semânticas HTML5 válidas. |
| **Portabilidade (Offline)** | 6 | 10 | EcoSabon pode ser aberto diretamente no navegador offline (`file://`). Kotobee necessita de servidor web para operar. |
| **Impressão (PDF)** | 4 | 9 | O Kotobee imprime layouts quebrados e mal dimensionados. O EcoSabon possui regras otimizadas em `print.css`. |
| **Facilidade de Manutenção** | 4 | 9 | O Kotobee exige exportar de editor fechado. O EcoSabon é editado via texto puro indexado pelo Git. |
| **Independência Tecnológica**| 3 | 10 | EcoSabon tem zero dependência proprietária. Kotobee sofre de dependência total e custos de licença comercial. |
| **Adequação Pedagógica** | 8 | 9 | O EcoSabon integra metadados para professores (BNCC, rubricas) de forma limpa nos cartões das estações. |
| **Risco de Lock-in** | 9 | 0 | *Nota invertida (menor é melhor)*. Kotobee possui alto risco; EcoSabon é 100% livre. |
| **Potencial de Adaptação** | 3 | 10 | O HTML próprio do EcoSabon permite incorporar qualquer padrão sem restrições. |

---

### 2. Pontos Fortes e Lacunas

#### **Pontos Fortes do Kotobee**
* **Sensação Familiar de E-Book:** A moldura clássica do leitor cria imediatamente a expectativa de um livro tradicional.
* **Componentes de Apoio Embutidos:** O controle de tamanho de fontes e o glossário visual facilitam a customização rápida pelo próprio leitor.
* **Hotspots Visuais Prontos:** Lógica de popups em diagramas já implementada na interface gráfica.

#### **Pontos Fortes do EcoSabon**
* **Acessibilidade Nativa Exemplar:** Uso qualificado de marcadores semânticos, navegação simplificada por teclado e conformidade com leitores de tela.
* **Portabilidade Extrema:** Funciona em qualquer dispositivo sem necessidade de instalar dependências, servidores locais ou CDNs (HTML Vanilla).
* **Gestão de Governança Acadêmica:** Facilidade de versionar as habilidades BNCC e os roteiros pedagógicos com Git de forma legível (código limpo em markdown e HTML estruturado).
* **Impressão Sem Perdas:** O e-book gera um PDF de alta qualidade e diagramado quando enviado para a fila de impressão.

#### **Lacunas Atuais do EcoSabon (Oportunidades de Melhoria)**
* **Abertura Visual de Módulos:** Os divisores de capítulo do EcoSabon poderiam usar layouts mais marcantes (estilo "hero banners" do Kotobee) para quebrar a monotonia visual da leitura contínua.
* **Destaques de Conteúdo (Callouts):** Falta de caixas destacadas e estilizadas para conceitos-chave, avisos de segurança laboratorial ou alertas didáticos.
* **Diagramas com Interatividade Local (Hotspots):** O mapa de estações do EcoSabon é excelente, mas o infográfico da reação química é estático. Incorporar interações de detalhes ao clicar nas moléculas do infográfico aumentaria a riqueza pedagógica.

---

### 3. Recomendação de Formato Futuro

Recomenda-se a **manutenção da arquitetura de web-book nativo (HTML/CSS/JS próprio)** para o EcoSabon, rejeitando qualquer migração ou transição para o Kotobee. 

A estratégia correta é **mimetizar os pontos fortes visuais e interativos do Kotobee** utilizando CSS Vanilla e JavaScript nativo e acessível. Isso permite que o e-book EcoSabon ganhe a riqueza visual, os blocos de destaque e a interatividade local do Kotobee, sem herdar seus problemas crônicos de dependência proprietária, incompatibilidade offline e falhas de acessibilidade.
