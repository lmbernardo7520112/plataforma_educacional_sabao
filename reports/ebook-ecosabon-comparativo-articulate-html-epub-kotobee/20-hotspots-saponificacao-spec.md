# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 20: Especificação de Engenharia (SDD) — Hotspots Acessíveis no Infográfico

**Branch de Planejamento:** `plan/ebook-ecosabon-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PLANEJAMENTO (Aguardando autorização de implementação)

---

### 1. Objetivo da Evolução
Evoluir a experiência pedagógica e visual do infográfico da reação de saponificação (`#infografico-saponificacao`) no web-book EcoSabon. O infográfico, atualmente estático, será dotado de pontos de interação locais (hotspots) baseados em padrões de acessibilidade ARIA, fornecendo descrições conceituais detalhadas sobre os reagentes, produtos e aspectos químicos/ambientais da saponificação ao clique ou foco de teclado do usuário.

---

### 2. Escopo e Não-Escopo

#### **Em Escopo:**
* **Pontos de Interação (Hotspots):** Inclusão de botões de gatilho (`<button>`) no HTML em posições relativas a cada componente do infográfico.
* **Detalhamento Conceitual:** Caixas de informação descritivas (bubbles/popups explicativos) que abrem e fecham localmente na interface.
* **Acessibilidade por Teclado:** Controle de foco, suporte a teclas `Tab`, `Enter`, `Space` e `Escape`.
* **Acessibilidade para Leitores de Tela:** Uso apropriado de `aria-expanded`, `aria-controls`, `aria-haspopup` e anúncios de mudança de estado.
* **Adaptação para Mobile:** Redesenho responsivo para evitar sobreposição ou estouro de balões explicativos na visualização vertical do celular.
* **Adaptação de Impressão:** Linearização completa das explicações dos hotspots no arquivo PDF gerado (`print.css`), exibindo todo o conteúdo de forma estática e contínua.

#### **Não-Escopo (Proibições Absolutas):**
* ❌ **Nenhuma** simulação de parâmetros reacionais, sliders ou controle do tipo range.
* ❌ **Nenhum** cálculo dinâmico de estequiometria, rendimento, temperatura ou pH dinâmico (componente C4/3E permanece bloqueado).
* ❌ **Nenhuma** persistência de dados local (`localStorage` / `sessionStorage`).
* ❌ **Nenhuma** coleta de dados, formulários de envio ou conexões de rede (`fetch`, `XMLHttpRequest`, `WebSocket`, `FormData`).
* ❌ **Nenhuma** dependência externa nova (sem bibliotecas JS, sem CDNs, sem pacotes NPM).
* ❌ **Nenhum** asset ou imagem proprietária extraída do Kotobee.

---

### 3. Elementos do Infográfico que Receberão Hotspots
Os seguintes 8 pontos do infográfico receberão hotspots identificadores:

1. **Triglicerídeo:** Descrição da molécula de triéster derivada dos óleos residuais.
2. **NaOH (Hidróxido de Sódio):** Conceituação da base forte necessária para a hidrólise alcalina.
3. **Coeficiente Estequiométrico 3× (Reagente):** Explicação sobre a proporção molar necessária (3 mols de base para 1 mol de triglicerídeo).
4. **Seta de Reação:** Representação visual do sentido da transformação química direta de saponificação.
5. **Sabão:** Descrição do produto principal (sais de ácidos graxos) com suas propriedades tensoativas.
6. **Glicerol:** Explicação do subproduto valioso (propriedades umectantes) e sua separação.
7. **Relação com a Química Verde:** Destaque para o aproveitamento de resíduos (óleo usado) e economia de átomos.
8. **Alerta de Segurança (NaOH):** Alerta destacado sobre a causticidade da base e uso obrigatório de EPIs.

---

### 4. Comportamento Esperado e Regras de Interação
1. **Comportamento Toggle:** Clicar em um hotspot ativo abre a explicação. Clicar novamente ou pressionar `Escape` fecha a explicação.
2. **Foco Único:** Apenas uma explicação de hotspot pode estar visível por vez. Ao abrir um hotspot, qualquer outro anteriormente aberto deve ser fechado automaticamente.
3. **Navegação por Teclado:** O foco do cursor deve ser deslocado de forma lógica. A ativação ocorre via `Enter` ou `Space`. Pressionar `Escape` retorna o foco para o botão ativador.

---

### 5. Requisitos de Governança Acadêmica e Aceite

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

### 6. Arquivos Afetados em Futura Implementação
* `ebook-ecosabon-prototipo/index.html` (estrutura HTML dos hotspots e popups)
* `ebook-ecosabon-prototipo/src/styles/main.css` (estilos e posicionamentos CSS)
* `ebook-ecosabon-prototipo/src/styles/print.css` (regras de impressão estática)
* `ebook-ecosabon-prototipo/src/scripts/interactions.js` (funções JS acessíveis)
* `ebook-ecosabon-prototipo/tests/interactions.test.js` (novos testes unitários e de fumaça)
