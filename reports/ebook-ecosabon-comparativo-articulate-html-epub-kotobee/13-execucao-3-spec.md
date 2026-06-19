# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 13: Especificação — Execução 3 (SDD)

**Branch de planejamento:** `plan/ebook-ecosabon-execucao-3`
**Branch de implementação futura:** `style/ebook-ecosabon-execucao-3`
**Base:** `main` (pós-merge da Execução 2)
**Data:** 2026-06-19

---

### 1. Objetivo da Execução 3

Enriquecer a camada de interatividade e visualização do web-book EcoSabon com **componentes gráficos e interativos** que potencializem a compreensão pedagógica, implementando a **Fase 3** do Plano de Ação Evolutivo (documento 06), com um componente adicional de simulação demonstrativa.

Os componentes alvo são:

1. **Cartões interativos enriquecidos** para as estações/missões;
2. **Infográfico visual CSS/SVG da reação de saponificação**;
3. **Visualizador didático de rotação por estações** (mapa interativo do diagrama de sala);
4. **Simulação demonstrativa de parâmetros** da saponificação (não-coletora, não-validativa).

---

### 2. Escopo Autorizado

#### 2.1 Componentes Obrigatórios

| # | Componente | Descrição |
|---|-----------|-----------|
| C1 | Cartões interativos de estação | Redesenhar os cartões das 3 estações (Módulo 2) com layout visual mais rico: cabeçalho colorido por estação, ícone SVG identificador, campos de dados organizados em grid, efeitos de hover/focus, e transição suave ao expandir conteúdo revelável |
| C2 | Infográfico da saponificação | Diagrama CSS/SVG estilizado da equação estequiométrica `Triglicerídeo + 3 NaOH → 3 Sabão + Glicerol`, com representação visual dos reagentes e produtos, setas de reação, e rótulos didáticos. Não interativo — puramente visual e informativo |
| C3 | Visualizador de rotação por estações | Transformar o diagrama de sala de aula existente (`.classroom-diagram`) em um mapa interativo onde clicar/tocar em cada estação rola suavemente até a descrição detalhada da estação correspondente no Módulo 2 |

#### 2.2 Componente Condicional

| # | Componente | Descrição | Condição |
|---|-----------|-----------|----------|
| C4 | Simulação demonstrativa de parâmetros | Painel interativo leve (sliders/inputs) que permita ao leitor visualizar hipoteticamente como variações de proporção óleo:NaOH, temperatura e tempo afetam indicadores demonstrativos (pH estimado, consistência qualitativa). Puramente ilustrativo, com dados fictícios fixos, sem coleta, sem validação, sem persistência | Implementar apenas se C1, C2 e C3 estiverem concluídos e testados sem regressão |

#### 2.3 Alterações de Suporte

- Estilos CSS adicionais para os novos componentes;
- Novas funções em `interactions.js` para interatividade (clique no mapa de estações, simulação);
- Atualização de `app.js` para inicializar novos componentes;
- Testes unitários para todas as novas funções;
- Ajustes de `print.css` para impressão limpa dos novos componentes.

---

### 3. Não-Escopo (Proibições Absolutas)

| # | Proibição |
|---|----------|
| N1 | **Fase 4** — exportação de respostas, localStorage, persistência de dados |
| N2 | **Fase 5** — homologação, dados reais, publicação |
| N3 | Frameworks JS (React, Vue, Angular, Svelte) |
| N4 | CDNs, APIs externas, fontes externas, imagens externas |
| N5 | Bibliotecas de gráficos/charts (D3.js, Chart.js, Plotly) |
| N6 | Bibliotecas de animação (GSAP, Framer Motion, anime.js) |
| N7 | Alterar conteúdo pedagógico existente (texto, dados, valores) |
| N8 | Alterar rubrica de qualidade (pesos, dimensões) |
| N9 | Alterar formulário de validação docente |
| N10 | Alterar BNCC, currículo ou alinhamento curricular |
| N11 | Remover ou enfraquecer `[DADOS FICTÍCIOS PARA TESTE]` ou avisos éticos |
| N12 | Remover testes existentes ou enfraquecer gates |
| N13 | Adicionar coleta real de dados |
| N14 | Adicionar funcionalidade de backend |
| N15 | Remover fallbacks de acessibilidade |
| N16 | Alterar a arquitetura de scroll contínuo da Execução 2 |
| N17 | Quebrar compatibilidade mobile |

---

### 4. Arquivos a Alterar

| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `index.html` | Reestruturar cartões de estação, adicionar infográfico SVG, tornar diagrama interativo, adicionar painel de simulação (se C4 aprovado) |
| `src/styles/main.css` | Estilos dos cartões enriquecidos, infográfico, mapa interativo, painel de simulação, efeitos hover/focus |
| `src/styles/print.css` | Ajustes de impressão: infográfico e mapa sem interatividade, simulação oculta ou linearizada |
| `src/scripts/interactions.js` | Novas funções: `scrollToStation()`, `initStationMap()`, opcionalmente `updateSimulation()` |
| `src/scripts/app.js` | Inicializar mapa de estações e simulação |
| `tests/interactions.test.js` | Testes para novas funções |

---

### 5. Critérios de Aceite

#### 5.1 Cartões Interativos de Estação (C1)

- [ ] Cada estação possui cabeçalho visual distinto com cor e ícone SVG;
- [ ] Layout de campos de dados organizado em grid responsivo;
- [ ] Efeito visual de hover/focus não intrusivo;
- [ ] Blocos de revelação (Plano B, Erro, Dica) mantêm funcionalidade;
- [ ] Acessibilidade preservada (tab, foco visível, contraste WCAG AA);
- [ ] Impressão mantém legibilidade sem dependência de cores.

#### 5.2 Infográfico da Saponificação (C2)

- [ ] Diagrama visual da reação `Triglicerídeo + 3 NaOH → 3 Sabão + Glicerol`;
- [ ] Renderizado com CSS/SVG inline (sem imagens externas);
- [ ] Rótulos didáticos legíveis em mobile e desktop;
- [ ] Impressão em preto e branco preserva legibilidade;
- [ ] Tag `[DADOS FICTÍCIOS PARA TESTE]` presente se valores numéricos forem usados.

#### 5.3 Visualizador de Rotação (C3)

- [ ] Clicar em estação rola até a descrição detalhada correspondente;
- [ ] Estação ativa é destacada visualmente;
- [ ] Navegação por teclado funciona (Tab + Enter);
- [ ] Toque funciona em dispositivos móveis;
- [ ] Acessibilidade: `role="button"`, `aria-label`, foco visível;
- [ ] Impressão preserva layout estático do diagrama.

#### 5.4 Simulação Demonstrativa (C4 — condicional)

- [ ] Sliders/inputs para proporção óleo:NaOH, temperatura e tempo;
- [ ] Valores de saída são pré-calculados com fórmula didática fixa;
- [ ] Nenhum dado é coletado, persistido ou exportado;
- [ ] Aviso claro: `[SIMULAÇÃO DEMONSTRATIVA — NÃO VALIDADA CIENTIFICAMENTE]`;
- [ ] Aviso adicional: `[DADOS FICTÍCIOS PARA TESTE]` nos valores numéricos;
- [ ] Funciona offline sem dependências externas;
- [ ] Impressão: painel linearizado ou oculto via `print.css`.

#### 5.5 Gates Gerais

| Gate | Critério |
|------|----------|
| G1 — SDD | Documento 13 criado antes da implementação |
| G2 — TDD | Documento 14 criado antes da implementação |
| G3 — Risco | Documento 15 criado antes da implementação |
| G4 — Plano de Implementação | Documento 16 criado antes da implementação |
| G5 — Testes existentes | Todos os 26 testes da Execução 2 passam |
| G6 — Testes novos | Novos testes adicionados para C1, C2, C3 (e C4 se aplicável) |
| G7 — Clean Code | Funções pequenas, nomeadas semanticamente, sem código morto |
| G8 — Acessibilidade | Navegação por teclado, ARIA, contraste WCAG AA |
| G9 — Impressão | `print.css` ajustado para novos componentes |
| G10 — Governança Acadêmica | Todos os placeholders e avisos éticos preservados |
| G11 — Commits | Pequenos, semânticos, rastreáveis |
| G12 — npm test | Todos os testes passam antes do PR |

---

### 6. Arquitetura dos Componentes

```
index.html
├── mod-1 (inalterado)
│
├── mod-2 (Missões na Prática)
│   ├── classroom-diagram (MELHORADO → mapa interativo C3)
│   │   ├── station-node[1] → clica → scroll para #estacao-1
│   │   ├── station-node[2] → clica → scroll para #estacao-2
│   │   └── station-node[3] → clica → scroll para #estacao-3
│   │
│   ├── infografico-saponificacao (NOVO — C2)
│   │   └── SVG/CSS inline: reagentes → seta → produtos
│   │
│   ├── estacao-1 (REDESENHADO — C1)
│   │   ├── station-card__header (cor + ícone SVG)
│   │   ├── station-card__grid (campos em grid)
│   │   └── station-card__actions (botões de revelação)
│   │
│   ├── estacao-2 (REDESENHADO — C1)
│   │   ├── station-card__header
│   │   ├── station-card__grid
│   │   ├── station-card__actions
│   │   └── simulation-panel (NOVO — C4, condicional)
│   │       ├── slider: proporção óleo:NaOH
│   │       ├── slider: temperatura
│   │       ├── slider: tempo
│   │       └── output: indicadores estimados
│   │
│   └── estacao-3 (REDESENHADO — C1)
│       ├── station-card__header
│       ├── station-card__grid
│       └── station-card__actions
│
└── ... (demais seções inalteradas)
```

---

### 7. Decisões de Design

| Decisão | Justificativa |
|---------|---------------|
| Usar SVG inline para ícones e infográfico | Sem dependências externas, controlável via CSS, imprimível |
| Grid CSS para campos da estação | Responsivo nativo, sem framework |
| `scrollIntoView()` para mapa de estações | Consistente com navegação existente (Execução 2) |
| Fórmula didática fixa para simulação (C4) | Evita complexidade científica, mantém caráter demonstrativo |
| Cores HSL pastel por estação | Diferenciação visual sem agressividade, compatível com impressão |
| Simulação como enhancement condicional | Só implementar se C1-C3 passarem — risco controlado |

---

### 8. Paleta de Cores por Estação

| Estação | Identidade | HSL Base | Uso |
|---------|-----------|----------|-----|
| Estação 1 — Filtração | Verde-azulado | `hsl(175, 45%, 35%)` | Cabeçalho, borda, ícone |
| Estação 2 — Reator | Âmbar-dourado | `hsl(38, 65%, 50%)` | Cabeçalho, borda, ícone |
| Estação 3 — pH | Violeta-azul | `hsl(260, 40%, 45%)` | Cabeçalho, borda, ícone |

Estas cores devem manter contraste WCAG AA (≥ 4.5:1) com texto branco no cabeçalho.

---

### 9. Estratégia de Impressão

- **C1 (Cartões):** Imprimir com layout linearizado, sem efeitos de hover, cores reduzidas;
- **C2 (Infográfico):** Imprimir com contornos e rótulos, sem fundos coloridos pesados;
- **C3 (Mapa):** Imprimir como diagrama estático (sem interatividade);
- **C4 (Simulação):** Ocultar completamente na impressão (`display: none !important`).

---

### 10. Dependências

**Nenhuma nova dependência será adicionada.**

O projeto continua com:
- Vite `^6.3.0` (build/dev)
- Vitest `^3.2.0` (testes)
- JSDOM `^26.1.0` (ambiente de teste)
