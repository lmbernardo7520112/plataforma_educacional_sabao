# Trilha Portfólio / Comercial — EcoSabon
## Documento 03: Estudo de Caso (EcoSabon para Portfólio)

### 1. Resumo da Narrativa do Case (Versão Curta para Portfólio)
* **Projeto:** EcoSabon — Web-book Interativo de Saponificação por Estações.
* **Problema:** Livros didáticos estáticos e PDFs não engajam estudantes e carecem de recursos práticos para organizar laboratórios escolares. Soluções de e-learning fechadas (SaaS) são caras e inacessíveis para escolas com conectividade limitada.
* **Solução:** Um web-book portátil em HTML/CSS/JS Vanilla, com navegação por módulos reativa, infográfico de reações com hotspots acessíveis por teclado, checklist de insumos Go/No-Go e compatibilidade offline completa.
* **Tecnologias:** HTML5, CSS3, JavaScript (ES Modules nativos), Vitest e GitHub CLI.
* **Resultado:** 100% de acessibilidade por leitores de tela e teclado, exportação para PDF linear de alta fidelidade e distribuição leve via ZIP auto-suficiente de apenas 31 KiB.

---

### 2. Detalhamento Técnico-Comercial (Versão Longa para Proposta)

#### **1. Problema Inicial (A Dor do Usuário/Instituição):**
No ensino profissionalizante e de pós-graduação, a transposição de dados científicos de laboratório para materiais de leitura é engessada. Alunos costumam imprimir dezenas de folhas de relatórios em PDF com diagramas complexos de química que se tornam difíceis de compreender. Adicionalmente, a falta de internet estável impede o uso de plataformas EaD comuns nas escolas brasileiras.

#### **2. Solução e Processo de Desenvolvimento:**
Adotou-se o modelo **V-Model adaptado** e **Specification Driven Development (SDD)**:
* **Fase 1: Transposição Pedagógica:** Estruturação em 4 seções baseadas em Rotação por Estações (Introdução, Estações 1, 2 e 3).
* **Fase 2: Arquitetura Vanilla Portátil:** Criação do layout modular responsivo baseado em CSS moderno e manipulação limpa de estados no DOM via JS, garantindo total ausência de telemetria ou rede.
* **Fase 3: Refatoração Modular:** Organização do código JavaScript em módulos coesos para facilitar a manutenção técnica.
* **Fase 4: Impressão Inteligente:** Criação do `print.css` para auto-expandir os painéis dos hotspots do infográfico, convertendo elementos dinâmicos em páginas de leitura contínua.

#### **3. Governança e Portões de Segurança:**
O case demonstra o uso rigoroso de testes automatizados com o framework Vitest (75 testes rodando de forma ágil em CI/CD), garantindo a robustez do software contra regressões e blindando o escopo contra complexidade excessiva.

---

### 3. Matriz Antes vs. Depois Conceitual

| Critério | Antes (Materiais Didáticos Comuns) | Depois (EcoSabon Web-Book) |
| :--- | :--- | :--- |
| **Acessibilidade** | PDFs inacessíveis a leitores de tela ou softwares fechados sem navegação por teclado. | 100% acessível por teclado, compatível com leitores de tela e suporte a `:focus-visible`. |
| **Execução Offline** | Exige conectividade constante com a internet para carregar frameworks e telemetria. | Executa localmente sem conexão via navegador através de um arquivo ZIP compacto (31 KiB). |
| **Impressão Física** | Quebras de página caóticas, botões interativos impressos e imagens cortadas. | Linearização automática por CSS, ocultação de menus e expansão de conteúdos ocultos em formato texto. |
| **Custo de Licença** | Mensalidades de plataformas ou custos de ferramentas caras (ex: Storyline). | Custo único de desenvolvimento. Código aberto e livre de taxas recorrentes. |

---

### 4. Como Apresentar o Case com Segurança
Para usar o EcoSabon em pitches ou reuniões comerciais de prospecção:
1. **Evitar Alegações Científicas Finais:** Deixar claro que os dados de química no protótipo são pedagógicos e simulados (`DADOS FICTÍCIOS` e placeholders), projetados para demonstrar a engenharia da interface.
2. **Foco na Portabilidade e Acessibilidade:** Apresentar a rapidez do carregamento, a navegação por teclado e a compatibilidade offline como as principais forças do produto.
3. **Não Prometer Telemetria Inclusa:** Deixar claro que a coleta de dados de alunos é uma feature avançada que exige infraestrutura de servidor dedicada e comitês de aprovação ética.
