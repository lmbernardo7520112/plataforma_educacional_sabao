# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 27: Relatório de Auditoria Final do Produto EcoSabon

**Branch Auditada:** `main`  
**Hash do Commit de Auditoria:** `ff550e854d9b232efd6bc08b98eb107e3a9c3b88`  
**Status do Produto:** 📦 Versão Candidata de Liberação (Release Candidate)  
**Data da Auditoria:** 2026-06-20  

---

### 1. Estado da Branch e Testes
* **Estado do Repositório:** A branch `main` está limpa e sincronizada com o repositório remoto. Não há alterações pendentes ou arquivos não rastreados.
* **Resultado dos Testes Automatizados:** **PASS** (63/63 testes passando). A suíte original (T1-T50) foi totalmente preservada e os 13 testes adicionais (T51-T63) confirmam a corretude de acessibilidade e segurança dos hotspots.

---

### 2. Avaliação dos Componentes do Web-Book

#### **A. Capa Editorial e Estrutura Geral**
* A capa possui tipografia moderna (Inter e Outfit) com um tema visual "Dark Science" (verde menta e verde oliva de sustentabilidade) harmônico e de alto contraste.
* Leitura contínua fluida através de seções com rolagem suave.
* Sumário lateral funcional com indicação ativa de seção por meio de IntersectionObserver (com fallback clássico).

#### **B. Rotação por Estações e Cartões**
* Diagrama de sala interativo funcional com links clicáveis e navegáveis por teclado.
* Três cartões detalhados das estações (`estacao-1`, `estacao-2`, `estacao-3`) com grids internos de 4 campos obrigatórios (Objetivo, Conteúdo, Materiais e Tempo) e blocos reveláveis ("Plano B").

#### **C. Infográfico e Hotspots Acessíveis**
* Infográfico da reação química estequiométrica (`Triglicerídeo + 3 NaOH → 3 Sabão + Glicerol`) estruturado originalmente.
* 8 hotspots acessíveis posicionados como pins no infográfico reacional e badges de Química Verde e Segurança.
* Abertura inline e não bloqueante de explicações curtas e didáticas, garantindo que o conteúdo essencial nunca seja ocultado.

#### **D. Checklists e Rubricas**
* Tabela de rubricas de avaliação estruturada semanticamente em HTML.
* Checklist Go/No-Go interativo operacional na verificação do protótipo pedagógico.

---

### 3. Avaliação de Acessibilidade e Impressão

#### **Auditoria de Acessibilidade (WCAG AA / ARIA):**
* Focabilidade de teclado nativa e focos visuais explícitos (outline ciano de 3px via `:focus-visible`).
* Alternâncias ativadas por mouse/touch e teclas `Enter` / `Space`.
* Suporte a atalhos de teclado: a tecla `Escape` colapsa o painel de detalhes ativo e devolve o foco ao botão correspondente.
* Vinculações semânticas corretas: uso de `role="button"`, `aria-expanded` (reativo) e `aria-controls` vinculado ao ID do painel explicativo.
* Foco Único garantido (somente um painel aberto por vez).

#### **Auditoria de Impressão (Mídia Impressa):**
* O arquivo [print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css) oculta todos os botões interativos circulares e o menu lateral.
* Exposição linearizada e aberta de todos os 8 painéis explicativos abaixo da reação química, garantindo que a apostila impressa retenha todo o conteúdo pedagógico original.
* Ausência de fundos escuros excessivos e quebras de página controladas.

---

### 4. Itens Não Implementados (Bloqueios e Portões Éticos)
Como critério de não-simulação (Strict Mode), os seguintes itens foram atestados como **NÃO IMPLEMENTADOS/AUSENTES**:

* ❌ **C4/3E (Lógica Reacional/IoT):** Sem simuladores, sem lógicas reacionais reativas, sem controles deslizantes (sliders ou `<input type="range">`), sem estimativas automáticas de pH, consistência ou temperatura.
* ❌ **Persistência de Dados:** Ausência absoluta de `localStorage` ou `sessionStorage`.
* ❌ **Rede e Comunicação:** Sem requisições ou canais via `fetch`, `XMLHttpRequest` ou `WebSocket`.
* ❌ **Coleta de Informações:** Sem coleta de respostas docentes, sem formulários ou persistência externa de opiniões.
* ❌ **Material Kotobee:** Nenhum asset proprietário do benchmark Kotobee foi clonado ou utilizado.
* ❌ **Placeholders Preservados:** Manutenção verbatim das marcas `"DADOS FICTÍCIOS PARA TESTE"` e `"habilidade BNCC/currículo local a validar"`.
* ❌ **Alteração Pedagógica:** Sem alterações nas rubricas, BNCC ou conteúdo pedagógico consolidado.

---

### 5. Recomendações
1. **Distribuição Local:** Empacotar e distribuir o diretório `ebook-ecosabon-prototipo/` de forma autônoma (ZIP), garantindo funcionamento 100% offline.
2. **Validação Docente Futura:** Adotar planejamento ético para testes heurísticos internos e pesquisas controladas de recepção, garantindo conformidade com a LGPD e orientações do CEP/CONEP para pesquisas científicas com seres humanos, sem realizar qualquer coleta nesta etapa.
