# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 45: Guia e Checklist para Apresentação Segura (EcoSabon v0.1.0)

Este checklist orienta o apresentador ou docente na condução de demonstrações técnicas e acadêmicas do web-book **EcoSabon v0.1.0**, mitigando falhas técnicas locais e garantindo a correta comunicação dos limites de escopo e governança do protótipo.

---

### 1. Checklist Técnico Antes da Apresentação
* [ ] **Garantir os binários locais:** Certifique-se de ter os arquivos `ecosabon-webbook-demo-local.zip` e `ecosabon-webbook-pdf-conferencia.pdf` baixados e organizados em uma pasta local.
* [ ] **Configurar servidor local:** Extraia o ZIP em um diretório e suba um servidor local para contornar a restrição de CORS dos navegadores modernos (que bloqueia ES Modules locais):
  * Com Python: `python -m http.server 8000`
  * Com Node: `npx http-server -p 8000`
* [ ] **Testar abertura:** Acesse `http://localhost:8000` e confirme se o e-book carrega com a navegação modular ativada.
* [ ] **Testar fallback:** Abra o arquivo `index.html` diretamente (via duplo clique) e confirme se ele carrega linearizado de forma legível (modo de degradação progressiva).
* [ ] **Deixar o PDF aberto:** Abra o PDF em um leitor dedicado ou aba do navegador para exibição rápida de sua estrutura linear e legibilidade para impressão.

---

### 2. Roteiro Durante a Apresentação
* [ ] **Apresentar como "Protótipo Demonstrável Homologado":** Use esse termo exato para caracterizar que a entrega v0.1.0 é um marco estável de engenharia e acessibilidade, e não a versão de comercialização ou produto científico final.
* [ ] **Demonstrar a Rastreabilidade:** Abra brevemente a página do repositório no GitHub, mostrando a tag `ecosabon-demo-v0.1.0` e os relatórios técnicos de governança.
* [ ] **Apresentar a Experiência Online (Interativa):**
  * Mostre a paginação de módulos reativa baseada na sidebar e a alteração da URL.
  * Interaja com o infográfico de saponificação, acionando hotspots e painéis inline explicativos.
  * Execute o checklist da Estação 3, mostrando a validação Go/No-Go.
  * Demonstre o suporte à acessibilidade por teclado (`Tab` e `Enter`) e o foco visível `:focus-visible`.
* [ ] **Apresentar a Experiência Offline/Linear (Conferência):**
  * Exiba o PDF de conferência técnica para demonstrar que o design do e-book foi projetado para impressão limpa e leitura contínua de ponta a ponta sem barreiras de interface.

---

### 3. Como Comunicar os Limites Pedagógicos e Técnicos
Use as seguintes diretrizes para abordar os limites éticos e técnicos caso seja questionado pela banca ou avaliadores:

* **Sobre Dados Fictícios:**
  * *Explicação:* "Os dados de homologação pedagógica e as marcações de 'habilidade BNCC' contidos no e-book são placeholders técnicos inseridos estritamente para auditar os limites estruturais do protótipo em testes de fumaça."
* **Sobre a Ausência de Simulações Complexas (C4/3E) e Gráficos 3D:**
  * *Explicação:* "A versão v0.1.0 foca em uma base arquitetural sólida, estática, leve e de alta acessibilidade. Funcionalidades como simulações quantitativas (sliders) e visualizações moleculares 3D estão bloqueadas nesta etapa para garantir a portabilidade escolar e o foco nos portões de segurança do projeto."
* **Sobre Validação Docente e Coleta de Dados Futura:**
  * *Explicação:* "Nenhuma pesquisa com participantes reais foi realizada neste ciclo. Qualquer validação docente ou coleta de dados futura exigirá o prévio desenvolvimento de protocolos de pesquisa acadêmica, consentimento livre e esclarecido (TCLE) e submissão aos comitês de ética em pesquisa (CEP/CONEP)."
* **Como Receber Feedback sem Coleta Ativa:**
  * *Explicação:* "Críticas e sugestões pedagógicas da banca ou de leitores serão consolidadas manualmente no repositório GitHub como sugestões de evolução futura, sem a utilização de telemetria ou cookies de monitoramento dos usuários."

---

### 4. O que NÃO Prometer
* **NÃO** afirme que a versão v0.1.0 está validada cientificamente por pesquisas de campo.
* **NÃO** afirme que o e-book armazena notas, progresso ou respostas do aluno em nuvem ou banco de dados.
* **NÃO** prometa que o e-book terá suporte a modelos 3D complexos ou simuladores quantitativos sem planejamento prévio e autorização ética.
