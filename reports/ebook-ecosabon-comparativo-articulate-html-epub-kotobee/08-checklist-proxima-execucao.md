# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 08: Checklist de Implementação por Lotes de Execução

Este checklist acionável serve como diretriz passo a passo, estruturado em lotes de execução progressiva, para guiar o engenheiro de software na implementação das melhorias visuais e funcionais no e-book **EcoSabon**.

*Nota: Nenhuma dessas tarefas deve ser iniciada nesta etapa de planejamento estratégico. Aguarde autorização expressa do autor.*

---

### Execução 1: Visual e Componentes Leves (Fase 1 + Fase 3 Leve)
*Foco na ergonomia de leitura e estilização básica de componentes, sem alterar o sistema de abas atual nem acrescentar scripts dinâmicos.*

- [ ] **1.1. Ajuste Ergonômico de Leitura:**
  - [ ] Aplicar `max-width: 800px` e `margin: 0 auto;` no contêiner de leitura.
  - [ ] Alterar o `line-height` do corpo do texto para `1.65` e definir `margin-bottom` de parágrafo para `1.2rem` no [main.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/main.css).
  - [ ] Suavizar a paleta de cores geral, substituindo contrastes pretos/brancos puros por tons de grafite escuro (`#2c3e50`) e fundos de papel soft (`#fafafa`).
  - [ ] Suavizar cantos arredondados (`border-radius: 8px`) e sombras de cards (`box-shadow: 0 4px 12px rgba(0,0,0,0.03)`).

- [ ] **1.2. Componentes Visuais Leves de Destaque:**
  - [ ] Criar as classes CSS para caixas temáticas: `.alert-security`, `.alert-planb`, `.alert-tip`, `.alert-concept`.
  - [ ] Configurar cores de fundo usando opacidades HSL suaves e borda lateral esquerda de destaque (`border-left: 5px solid;`).
  - [ ] Embutir os ícones vetoriais SVG inline no HTML/CSS para cada destaque (perigo, prancheta, dica, conceito).
  - [ ] Certificar que a Estação 2 inicie com destaque vermelho `.alert-security` com texto explícito de EPIs e NaOH.

---

### Execução 2: Fluxo de Leitura e Layout (Fase 2)
*Implementação da navegação linear contínua e sumário lateral. Executar apenas se os estilos da Execução 1 forem aprovados.*

- [ ] **2.1. Capa Editorial Integrada:**
  - [ ] Criar a seção de abertura `<section id="hero-cover">` ocupando `min-height: 90vh`.
  - [ ] Posicionar título proeminente (`font-size: 3rem`) e bloco inferior com metadados do projeto (Autor, Instituição, Ano, Status da Dissertação).

- [ ] **2.2. Sumário e Navegação Lateral por Scroll:**
  - [ ] Criar menu lateral fixo retrátil (`position: fixed; left: 0; width: 280px;`).
  - [ ] Listar módulos, rubricas e roteiros em anexo com barra gráfica ou percentual de progresso de leitura.
  - [ ] Configurar `scroll-behavior: smooth;` no HTML.
  - [ ] Implementar `IntersectionObserver` em JavaScript para atualizar a classe `.active` do sumário conforme o leitor rola pelas seções.

---

### Execução 3: Protótipo de Validação Ético (Fase 4)
*Desenvolvimento das lógicas interativas de forma restrita e demonstrativa, com forte governança ética e de privacidade.*

- [ ] **3.1. Funcionalidades Interativas (Demonstrativo):**
  - [ ] Implementar script de persistência temporária no `localStorage` do navegador para os checklists e autoavaliação (com botão de reset).
  - [ ] Criar botão de download de respostas no formulário docente, exportando notas Likert e perguntas abertas para um arquivo `respostas-validacao-ecosabon.txt` gerado em tempo real no cliente.

- [ ] **3.2. Governança e Anonimização:**
  - [ ] Garantir que nenhum campo de texto ou formulário solicite nem receba dados pessoais identificáveis (nomes de alunos, professores, escolas ou e-mails).
  - [ ] Inserir avisos visuais claros de que a validação é um **protótipo demonstrativo** e que a coleta real de dados exige aprovação prévia do Comitê de Ética em Pesquisa (CEP/CONEP) e aplicação de TCLE.

---

### Execução 4: Homologação Final com Dados Reais (Fase 5)
*Inserção de dados científicos reais e preparação do produto final para publicação.*

- [ ] **4.1. Substituição de Placeholders:**
  - [ ] Inserir os dados de aplicação prática e as análises estatísticas reais obtidas na pesquisa, substituindo os placeholders apenas nas seções efetivamente homologadas e validadas.
  - [ ] Inserir e justificar detalhadamente o alinhamento à BNCC ou currículo local revisado e justificado conforme o recorte da dissertação e avaliação da banca.

- [ ] **4.2. Publicação e Geração de Saídas:**
  - [ ] Refinar o [print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css) para que as quebras de página A4 do PDF impresso sejam perfeitas.
  - [ ] Hospedar o HTML5 finalizado no GitHub Pages ou servidor perene da instituição.
