# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 07: Matriz de Riscos e Diretrizes de Governança Técnica-Pedagógica

Este documento analisa as principais ameaças de desenvolvimento, conformidade acadêmica e segurança científica que orbitam o projeto do e-book **EcoSabon**, definindo suas mitigações objetivas para resguardar a integridade da dissertação de mestrado.

---

### 1. Riscos de Conformidade Acadêmica e Rigor Científico

#### 1.1. Perda de Rigor Acadêmico por Declarações Exageradas
* **Descrição do Risco:** A tentação de justificar o produto educacional afirmando que a metodologia de rotação de estações ou o reator IoT "garantem", "provam" ou "atestam" a melhoria universal da aprendizagem de estequiometria. A banca examinadora rejeitará conclusões generalistas que não sejam sustentadas estritamente por dados coletados na dissertação.
* **Mitigação:**
  * Manter explicitamente as limitações metodológicas declaradas.
  * O texto do e-book deve utilizar termos científicos sóbrios: *"apresenta indícios de facilitação"*, *"constitui um modelo didático alternativo"* ou *"aponta para tendências de engajamento"*.
  * O formulário de validação e checklists devem manter o aviso de que representam modelos de validação a serem submetidos ao Comitê de Ética em Pesquisa (CEP) e que os resultados empíricos finais devem ser interpretados apenas sob as condições reais do estudo.

#### 1.2. Excesso de Elementos Visuais Decorativos (Poluição Visual)
* **Descrição do Risco:** A evolução visual do HTML descambar para um festival de cores saturadas, gifs animados, decorações de laboratório espalhadas nas bordas e layouts poluídos que distraem o professor da leitura e prejudicam o foco didático.
* **Mitigação:**
  * Utilizar um design minimalista inspirado nas melhores práticas de design editorial do Articulate Rise: fundos de leitura brancos ou cinza-claros neutros, espaçamento generoso de respiro, tipografias limpas sem serifa (Inter, Outfit ou Lato) e uso de cores restrito à paleta HSL do design system.
  * Elementos gráficos (fotos, diagramas) devem possuir legendas analíticas e função estritamente informativa, proibindo imagens puramente ornamentais.

#### 1.3. Interatividade Superficial (Gamificação Inútil)
* **Descrição do Risco:** Adicionar botões, cliques e animações de hover que não agregam valor cognitivo ou reflexão didática, gerando a sensação de "interatividade pela interatividade" (ex: forçar o usuário a clicar em um flip-card apenas para ler uma definição curta que poderia estar no texto normal).
* **Mitigação:**
  * Aplicar interatividade apenas onde houver demanda cognitiva:
    1. **Checklist Go/No-Go:** O contador ativo ajuda o professor a ter certeza de que cobriu todos os critérios obrigatórios antes da aula.
    2. **Escala Likert da Validação:** Simula e permite coletar de fato a nota do professor com exportação de dados em arquivo para pesquisa.
    3. **Cálculos de Estequiometria:** Simuladores interativos que ajudam o aluno ou professor a prever a massa necessária de NaOH com base no rendimento da filtração de óleo.

---

### 2. Riscos Tecnológicos e Governança de Software

#### 2.1. Dependência de Ferramentas Proprietárias (Vendor Lock-in)
* **Descrição do Risco:** Desenvolver o e-book final no Articulate Rise 360 ou Kotobee Author cria dependência financeira direta dessas empresas. Se as licenças expirarem ou a nuvem dessas plataformas falhar, o material não poderá ser editado.
* **Mitigação:**
  * **Uso exclusivo de padrões web abertos nativos (HTML5, CSS3, ES Modules).**
  * O código-fonte completo deve residir em um repositório Git público ou privado controlado pelo autor da dissertação, permitindo a edição gratuita com qualquer editor de texto (VS Code, Notepad++) a qualquer tempo.

#### 2.2. Baixa Portabilidade Offline e Falhas de Execução em Escolas Públicas
* **Descrição do Risco:** O e-book exigir conexão constante à internet ou depender de scripts externos e bibliotecas carregadas por CDN (como Bootstrap ou jQuery de servidores externos) que travam ao serem executados em escolas sem conectividade.
* **Mitigação:**
  * O e-book EcoSabon HTML deve funcionar 100% offline. Todos os arquivos de estilo (CSS) e scripts (JS) devem ser locais dentro do repositório.
  * Não utilizar CDNs. O projeto final compactado em ZIP deve poder ser extraído em qualquer computador de escola e executado diretamente com dois cliques sobre o arquivo `index.html`.

#### 2.3. Acessibilidade Deficiente
* **Descrição do Risco:** O e-book interativo não poder ser interpretado por professores ou estudantes com deficiência visual ou motora.
* **Mitigação:**
  * Seguir as diretrizes do guia WAI-ARIA da W3C.
  * Todos os botões interativos de revelação (`reveal-block`) devem utilizar os atributos `aria-expanded` (atualizado dinamicamente pelo JavaScript) e `aria-hidden`.
  * Relação de contraste de cores adequada entre texto e fundo.
  * Marcação semântica correta (`<nav>`, `<main>`, `<section>`, `<header>`, `<h1>` único).

#### 2.4. Risco de Vazamento ou Coleta de Dados Pessoais Identificáveis (LGPD)
* **Descrição do Risco:** Risco de o e-book coletar inadvertidamente dados pessoais (nomes, e-mails, escolas) de alunos, professores ou escolas sem base legal ou sem consentimento explícito, violando a Lei Geral de Proteção de Dados (LGPD) e diretrizes éticas de pesquisa acadêmica.
* **Mitigação:**
  * **Anonimização Estrita:** Configurar os formulários e campos de entrada de texto para que **não solicitem nem recebam nomes de alunos, escolas, professores ou qualquer dado pessoal identificável**.
  * **Coleta Estritamente Local:** O design de interatividade deve garantir que nenhum dado seja transmitido para servidores web externos. As respostas e o estado dos checklists permanecem gravados exclusivamente no navegador do usuário (`localStorage`) e a exportação ocorre localmente por download de arquivo gerado em tempo real na máquina do usuário, cabendo a este o envio ativo das respostas de forma anônima ao pesquisador.

---

### 3. Risco Crítico de Segurança Laboratorial

#### 3.1. Comunicação Deficiente de Perigo Químico e Riscos na Manipulação de Hidróxido de Sódio (NaOH)
* **Descrição do Risco:** A produção de sabão envolve o uso de hidróxido de sódio (soda cáustica), um composto altamente corrosivo que causa queimaduras químicas graves na pele e olhos. Se o e-book descrever a Estação 2 (reator de saponificação) com linguagem branda ou sem avisos conspícuos, expõe docentes e estudantes a acidentes laboratoriais severos.
* **Mitigação:**
  * **Mitigação de Destaque Visual:** O e-book deve conter caixas temáticas de alerta de segurança em destaque cromático vermelho ou laranja vivo no início do Módulo 2 e na descrição da Estação 2.
  * **Mitigação Textual Mandatória:** Incluir um checklist de segurança obrigatório que exige confirmação visual ("Estou usando luvas", "Estou usando óculos de proteção", "O ambiente está ventilado") antes de descrever o procedimento estequiométrico.
  * **Mitigação Pedagógica (Baixo Recurso):** No Plano B ou nas alternativas, enfatizar que em caso de ausência de EPIs ou de infraestrutura de ventilação e lava-olhos na escola, a Estação 2 deve ser executada exclusivamente de forma **demonstrativa pelo professor**, proibindo a manipulação direta pelos estudantes.
