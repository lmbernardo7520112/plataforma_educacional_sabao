# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 20: Especificação de Engenharia (SDD) — Hotspots Acessíveis no Infográfico

**Branch de Planejamento:** `plan/ebook-ecosabon-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PLANEJAMENTO (Aguardando autorização de implementação)

---

### 1. Objetivo da Evolução
Evoluir a experiência pedagógica e visual do infográfico da reação de saponificação (`#infografico-saponificacao`) no web-book EcoSabon. O infográfico, atualmente estático, será dotado de pontos de interação locais (hotspots) baseados em padrões de acessibilidade ARIA, revelando painéis explicativos inline e acessíveis que detalham os aspectos químicos, ecológicos e de segurança para os reagentes, produtos e dinâmica da reação.

---

### 2. Diretriz de Acessibilidade e Não-Bloqueio

> [!IMPORTANT]
> **Arquitetura de Apresentação:**  
> Os hotspots não devem abrir modais, overlays bloqueantes ou popups que escondam conteúdo essencial. A interação deve revelar painéis explicativos inline, acessíveis, navegáveis por teclado e compatíveis com impressão.

---

### 3. Escopo e Não-Escopo

#### **Em Escopo:**
* **Pontos de Interação (Hotspots):** Inclusão de botões de gatilho (`<button>`) no HTML em posições relativas aos componentes do infográfico.
* **Painéis Explicativos Inline e Acessíveis:** Caixas explicativas associadas aos hotspots que aparecem de forma integrada ao fluxo da página.
* **Navegação por Teclado:** Controle de foco, suporte a teclas `Tab`, `Enter` e `Space`.
* **Acessibilidade para Leitores de Tela:** Uso qualificado de `aria-expanded` (no botão de controle) e `aria-controls` (referenciando o painel de conteúdo).
* **Adaptação para Mobile:** Redesenho responsivo para evitar quebras de visualização ou textos truncados.
* **Ajustes de Impressão:** Linearização completa das caixas explicativas no `print.css`, exibindo-as de forma aberta e estática na versão impressa do PDF.

#### **Não-Escopo (Proibições Absolutas):**
* ❌ **Nenhuma** simulação de parâmetros reacionais, sliders ou controle do tipo range.
* ❌ **Nenhum** cálculo dinâmico de estequiometria, rendimento, temperatura ou pH dinâmico (componente C4/3E permanece bloqueado).
* ❌ **Nenhuma** persistência de dados local (`localStorage` / `sessionStorage`).
* ❌ **Nenhuma** coleta de dados, formulários de envio ou conexões de rede (`fetch`, `XMLHttpRequest`, `WebSocket`, `FormData`).
* ❌ **Nenhuma** dependência externa nova (sem bibliotecas JS, sem CDNs, sem pacotes NPM).
* ❌ **Nenhum** asset ou imagem proprietária extraída do Kotobee.

---

### 4. Elementos do Infográfico que Receberão Hotspots
Os seguintes 8 pontos do infográfico receberão caixas explicativas associadas aos hotspots:

1. **Triglicerídeo:** Descrição da molécula de triéster proveniente do óleo de fritura usado.
2. **NaOH (Hidróxido de Sódio):** Conceituação da base forte necessária para a hidrólise alcalina.
3. **Coeficiente Estequiométrico 3× (Reagente):** Explicação da proporção molar necessária (3 mols de base para 1 mol de triglicerídeo).
4. **Seta de Reação:** Representação visual do sentido da transformação química direta de saponificação.
5. **Sabão:** Descrição do produto principal (sais de ácidos graxos) com suas propriedades tensoativas.
6. **Glicerol:** Explicação do subproduto valioso (propriedades umectantes) e sua separação.
7. **Relação com a Química Verde:** Destaque para o aproveitamento de resíduos (óleo usado) e economia de átomos.
8. **Alerta de Segurança (NaOH):** Alerta destacado sobre a causticidade da base e uso obrigatório de EPIs.

---

### 5. Comportamento Esperado e Regras de Interação
1. **Acionamento:** As caixas explicativas devem ser acionáveis por clique/toque ou navegação por teclado.
2. **Uso de Semântica Nativa:** Utilizar `<button>` nativo sempre que possível para controle do estado dos blocos explicativos alternáveis.
3. **Comportamento Toggle:** Clicar em um hotspot ativo abre a explicação. Clicar novamente fecha a explicação.
4. **Foco Único:** Apenas um bloco explicativo alternável pode estar visível por vez. Ao abrir um hotspot, qualquer outro anteriormente aberto deve ser fechado automaticamente.
5. **Controle de Visual:** Manter foco visível e garantir que a percepção do conteúdo explicativo não bloqueante não dependa apenas de cor. Não bloquear a leitura e não esconder conteúdo essencial.

---

### 6. Requisitos de Impressão e Fallback
* ** print.css:** Na impressão, os marcadores visuais interativos (hotspots) podem ser ocultados, e os textos explicativos associados devem aparecer linearizados ou em blocos abertos. Nenhum conteúdo pedagógico pode depender exclusivamente da interação eletrônica.
* **Fallback sem JavaScript:** As caixas explicativas devem ser exibidas abertas em layout linear caso o JavaScript não seja carregado no navegador.

---

### 7. Requisitos de Governança Acadêmica e Aceite

#### **Critérios de Aceite:**
* [ ] O código deve ser 100% autoral em HTML/CSS/JS próprio.
* [ ] Suíte de testes atual (50 testes) continua passando 100% intacta.
* [ ] Novos testes de fumaça e unitários cobrindo todos os estados dos hotspots.
* [ ] Ausência completa de persistência, sliders, cálculos dinâmicos e rede.
* [ ] Placeholders acadêmicos (`DADOS FICTÍCIOS` e `habilidade BNCC`) preservados verbatim.

#### **Critérios de Rejeição:**
* [ ] Presença de frameworks, bibliotecas externas ou scripts de terceiros.
* [ ] Quebra de acessibilidade por teclado ou perda visual do outline de foco.
* [ ] Oclusão ou corte de texto na impressão (revisar em PDF).

---

### 8. Arquivos Afetados em Futura Implementação
* `ebook-ecosabon-prototipo/index.html` (estrutura HTML dos hotspots e painéis)
* `ebook-ecosabon-prototipo/src/styles/main.css` (estilos e posicionamentos CSS)
* `ebook-ecosabon-prototipo/src/styles/print.css` (regras de impressão estática)
* `ebook-ecosabon-prototipo/src/scripts/interactions.js` (funções JS acessíveis)
* `ebook-ecosabon-prototipo/tests/interactions.test.js` (novos testes unitários e de fumaça)
