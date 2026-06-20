# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 06: Checklist para Execução Futura

Este documento estabelece o checklist de controle de qualidade (QA) e os critérios de aceite obrigatórios para guiar os desenvolvedores em caso de autorização para a implementação prática das melhorias visuais e interativas.

---

### 1. Checklist de Controle de Qualidade (QA)

#### **A. Não-Cópia e Autoralidade (Direitos Autorais)**
* [ ] Confirmar que **nenhum** asset gráfico, imagem, ícone, áudio ou texto foi copiado do livro benchmark do Kotobee.
* [ ] Certificar que todos os ícones e esquemas nos hotspots do infográfico foram desenhados como SVG autoral do projeto EcoSabon.

#### **B. QA Visual (Design Rico e Responsividade)**
* [ ] Validar que os cabeçalhos hero dos módulos ocupam a largura completa de leitura de forma harmônica em resoluções de desktop (1920px) e mobile (375px).
* [ ] Testar se o tamanho de fonte e o contraste das caixas callout atendem à legibilidade sobre telas de diferentes brilhos.
* [ ] Verificar se os balões informativos de hotspots não quebram o layout do infográfico em visualizações mobile (devem empilhar verticalmente ou ajustar a largura).

#### **C. Acessibilidade (A11y)**
* [ ] Testar a navegação de teclado por todos os gatilhos dos hotspots usando apenas as teclas `Tab`, `Enter` e `Space`.
* [ ] Certificar que todos os botões de hotspot contam com descrição alternativa (`aria-label`) e estado atualizado (`aria-expanded`).
* [ ] Verificar com leitor de tela (ex: NVDA, VoiceOver) se os balões de diálogo abertos são lidos imediatamente após o acionamento do respectivo botão.
* [ ] Confirmar que o contorno visual de foco (`outline` / `:focus-visible`) é exibido de forma destacada ao redor de cada botão de hotspot.

#### **D. Otimização de Impressão (`print.css`)**
* [ ] Gerar simulação de PDF da página e verificar se os cabeçalhos hero dos módulos não criam páginas em branco ou blocos de cor sólida preta que desperdicem tinta.
* [ ] Certificar que todos os balões informativos de hotspots são impressos de forma aberta e linear, garantindo que o professor tenha acesso a todo o conteúdo do e-book em papel físico.
* [ ] Confirmar o uso de `page-break-inside: avoid` nas novas caixas de callout e cartões de estação.

#### **E. Governança Acadêmica e Ética**
* [ ] Executar script de contagem de placeholders em `index.html` e atestar a preservação exata dos baselines:
  * `"DADOS FICTÍCIOS"`: **2** ocorrências.
  * `"habilidade BNCC"`: **1** ocorrência.
* [ ] Confirmar que **nenhum** dado científico real ou cálculo de saponificação IoT foi introduzido.
* [ ] Certificar que nenhuma lógica de cookies, salvamento em disco (`localStorage`) ou requisições de rede foi adicionada nos novos scripts.

---

### 2. Critérios de Aceite para Entrega

1. **Aprovado em Testes Automatizados:** Todos os 50 testes existentes continuam passando, e novos testes cobrindo a lógica de clique e acessibilidade dos hotspots foram adicionados, mantendo a cobertura 100% verde no Vitest.
2. **Conformidade em Acessibilidade:** Validação por auditoria de acessibilidade sem barreiras para usuários de teclado.
3. **Legibilidade de Impressão:** Geração de PDF limpo com todas as descrições dos hotspots renderizadas em texto linear plano na visualização de impressão.
4. **Governança Ética Intacta:** Componente C4/3E permanentemente bloqueado e ausência total de coleta de dados de usuários.
