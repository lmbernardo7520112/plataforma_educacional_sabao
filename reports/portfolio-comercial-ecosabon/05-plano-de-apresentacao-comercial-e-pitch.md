# Trilha Portfólio / Comercial — EcoSabon
## Documento 05: Plano de Apresentação Comercial, Briefing e Pitch

### 1. Roteiro de Pitch Comercial (3 Minutos)

* **0:00 - 0:30 (O Gancho e o Problema):**
  > "Vocês já tentaram ler um relatório ou material didático complexo no celular e desistiram devido ao layout estático do PDF? Ou tentaram utilizar uma plataforma EaD interativa e ela travou pela falta de internet estável? Esse é o cotidiano de milhares de estudantes e professores."
* **0:30 - 1:15 (A Solução):**
  > "Apresento o EcoSabon, um modelo de web-book didático interativo baseado em código puro, sem necessidade de plugins ou assinaturas SaaS. Ele oferece uma paginação reativa fluida, infográficos com hotspots acessíveis e validação estática de checklists. Tudo isso rodando direto no navegador, online ou offline."
* **1:15 - 2:00 (O Diferencial de Transposição e Acessibilidade):**
  > "Diferente de e-books convencionais, o EcoSabon foi projetado com base em portões de segurança de acessibilidade física e digital. Ele permite que o mesmo código seja lido com leitores de tela por pessoas cegas, navegado por teclado e impresso fisicamente de forma perfeita, expandindo dinamicamente as explicações interativas."
* **2:00 - 2:30 (Tração e Portabilidade):**
  > "Desenvolvemos materiais auto-suficientes distribuídos em pacotes ZIP leves de 31 KiB e PDFs limpos de conferência. Essa portabilidade possibilita a entrega do produto educacional em qualquer escola, mesmo naquelas sem conectividade à internet."
* **2:30 - 3:00 (Chamada para Ação):**
  > "Se você precisa de um produto educacional robusto para sua dissertação, material didático de destaque para seu curso ou deseja converter apostilas impressas em mídias interativas acessíveis sem taxas recorrentes, vamos estruturar o seu projeto."

---

### 2. Roteiro de Demonstração Técnica (5 Minutos)

1. **Minuto 1: Abertura da Release:**
   * Mostrar a página de Releases do repositório no GitHub para evidenciar a segurança da entrega e a integridade dos arquivos binários verificada por hash SHA256.
2. **Minuto 2: Execução Offline:**
   * Extrair o arquivo `ecosabon-webbook-demo-local.zip` localmente e demonstrar a inicialização via servidor Python de uma linha.
3. **Minuto 3: Interatividades de Navegação:**
   * Navegar pelas estações de Química Fina usando o menu lateral reativo. Mostrar como a URL é atualizada sem recarregar a tela, preservando o histórico do navegador.
4. **Minuto 4: Infográfico Acessível e Checklist:**
   * Clicar nos hotspots do infográfico de saponificação para revelar os painéis explicativos inline. Mostrar que a seleção é única e focável por teclado.
   * Marcar os itens do checklist Go/No-Go na Estação 3 para evidenciar o validador dinâmico de estado.
5. **Minuto 5: Impressão e Encerramento:**
   * Exibir o arquivo PDF gerado headless via Chrome e destacar a linearização inteligente sem menus caóticos. Concluir destacando os limites de governança (sem range inputs/simulações quantitativas).

---

### 3. Roteiro de Reunião de Diagnóstico com Cliente
1. **Introdução:** Apresentação do portfólio.
2. **Perguntas de Diagnóstico (Briefing):**
   * Qual é o público-alvo do seu material didático? Eles possuem acesso a computadores modernos e internet estável nas escolas de validação?
   * Você já tem o texto-base 100% escrito e revisado por especialistas?
   * Quais são os prazos de submissão para a sua banca examinadora ou lançamento comercial?
   * O material exige alguma simulação matemática complexa ou apenas ilustrações de conceitos de forma qualitativa e acessível?
   * Haverá coleta de dados pessoais ou acompanhamento de notas de estudantes?
3. **Alinhamento de Escopo:** Explicar o que está incluído no pacote e assinar a proposta inicial.

---

### 4. Critérios para Aceitar ou Recusar Projetos

* **Aceitar Projeto Quando:**
  * O cliente possui o conteúdo didático textual estruturado e aprovado.
  * O foco do projeto é a portabilidade, acessibilidade e transposição visual rica.
  * O cliente aceita e respeita a governança de rodadas de revisão limitadas.
* **Recusar Projeto Quando:**
  * O cliente exige simulações científicas complexas com renderização 3D pesada sem orçamento para infraestrutura de desenvolvimento dedicada.
  * O cliente exige coleta de dados de usuários sem aprovação ou submissão ética a comitês (risco legal sob a LGPD).
  * O cliente recusa assinar termos de aceite por etapas ou exige revisões infinitas sobre textos mal estruturados.
