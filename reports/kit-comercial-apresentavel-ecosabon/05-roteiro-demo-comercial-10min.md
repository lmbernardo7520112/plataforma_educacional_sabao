# Kit Comercial Apresentável — EcoSabon
## Documento 05: Roteiro de Demonstração Comercial (10 Minutos)

Este guia orienta o desenvolvedor ou apresentador na condução de reuniões de demonstração síncronas com potenciais clientes (pesquisadores, docentes ou bancas de pós-graduação).

---

### 1. Abertura e Introdução (Minutos 1 a 2)
* **Objetivo:** Capturar a atenção e ambientar o espectador.
* **Foco da fala:**
  > "Hoje vamos demonstrar na prática como convertemos apostilas técnicas estáticas em web-books didáticos portáteis de alta acessibilidade. Como base de demonstração, utilizaremos o case EcoSabon v0.1.0, um recurso de saponificação por estações projetado para rodar offline em computadores escolares."

---

### 2. Demonstração de Portabilidade e Higiene Git (Minutos 2 a 4)
* **Ação no Computador:**
  1. Mostrar a página de **Releases públicas** do repositório no GitHub para comprovar a segurança e rastreabilidade dos arquivos de liberação.
  2. Apresentar os dois arquivos de assets principais da release:
     * `ecosabon-webbook-demo-local.zip` (Tamanho: ~30 KiB)
     * `ecosabon-webbook-pdf-conferencia.pdf` (Tamanho: ~308 KiB)
  3. Exibir o terminal rodando o comando `git ls-files release/` para provar que a pasta contendo os arquivos binários gerados é 100% livre e não rastreada no Git da `main`, respeitando as melhores práticas de governança de histórico de commits do repositório.

---

### 3. Execução Offline e Navegação Modular (Minutos 4 a 6)
* **Ação no Computador:**
  1. Descompactar o arquivo ZIP na tela.
  2. Inicializar um servidor HTTP leve de terminal de uma linha (`python -m http.server 8000`) para simular a execução estática sem CORS.
  3. Abrir o navegador em `http://localhost:8000`.
  4. Navegar entre os módulos clicando na barra lateral e demonstrar que a página muda de forma fluida sem recarregar o navegador, mantendo o histórico de URL atualizado.

---

### 4. Demonstração de Acessibilidade e Hotspots (Minutos 6 a 8)
* **Ação no Computador:**
  1. Rolar a tela até o **Módulo 2 (Estação 2 - Saponificação)**.
  2. Clicar nos hotspots interativos do infográfico SVG para abrir as explicações detalhadas em formato de painéis explicativos inline.
  3. Demonstrar que a seleção é única (um painel ativo por vez), evitando poluição visual.
  4. Afastar as mãos do mouse e usar apenas o teclado (`Tab` e `Enter`) para navegar pelas estações e hotspots, evidenciando o foco visível claro (`:focus-visible`) em conformidade com as diretrizes de acessibilidade WCAG.

---

### 5. Apresentação do Fallback e PDF (Minutos 8 a 9)
* **Ação no Computador:**
  1. Abrir o arquivo `ecosabon-webbook-pdf-conferencia.pdf`.
  2. Mostrar que os botões interativos e a barra lateral de navegação sumiram, sendo substituídos por uma leitura contínua com todas as explicações dos hotspots expandidas em formato texto.
  3. Explicar como isso garante que alunos sem computadores possam imprimir o material didático com diagramação perfeita.

---

### 6. Esclarecimento de Limites e Conclusão (Minuto 9 a 10)
* **Foco da fala (Fechamento Seguro):**
  > "Como puderam ver, o EcoSabon v0.1.0 valida a engenharia didática de interface, acessibilidade e portabilidade estática offline. Em conformidade com a governança estrita de nosso escopo, a versão é stateless (sem banco de dados) e qualitativa (sem simuladores químicos reais de sliders/cálculos complexos de estequiometria), tornando-a segura e estável. 
  > 
  > Qual é a principal interatividade que você enxerga para o seu projeto? Vamos marcar um diagnóstico rápido para desenhar a sua proposta?"
