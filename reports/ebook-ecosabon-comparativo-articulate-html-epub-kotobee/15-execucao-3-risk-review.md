# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 15: Revisão de Riscos — Execução 3

**Branch de planejamento:** `plan/ebook-ecosabon-execucao-3`
**Data:** 2026-06-19

---

### 1. Categorias de Risco

Os riscos da Execução 3 são categorizados em 5 eixos:

1. **Técnico** — complexidade de implementação, compatibilidade;
2. **Pedagógico** — integridade do conteúdo educacional;
3. **Ético** — governança de dados, avisos, privacidade;
4. **Acessibilidade** — navegação, contraste, ARIA;
5. **Regressão** — quebra de funcionalidades existentes.

---

### 2. Matriz de Riscos

| # | Risco | Categoria | Probabilidade | Impacto | Severidade | Mitigação |
|---|-------|----------|--------------|---------|-----------|-----------|
| R1 | Infográfico SVG não renderiza corretamente em todos os navegadores | Técnico | Baixa | Médio | Baixa | Usar SVG inline simples com fallback de texto. Testar em Chrome, Firefox e Safari |
| R2 | Mapa de estações interativo não funciona em mobile (touch) | Técnico | Média | Alto | Média | Implementar handlers `click` + `keydown`. Testar em viewport mobile simulado |
| R3 | CSS dos cartões enriquecidos conflita com estilos existentes | Técnico | Média | Médio | Média | Usar namespace BEM `.station-card__*` sem sobrescrever `.card` existente. Manter `.card` como base |
| R4 | Simulação C4 é interpretada como dado científico real | Pedagógico + Ético | Alta | Muito Alto | **Crítica** | Múltiplos avisos: `[SIMULAÇÃO DEMONSTRATIVA]`, `[DADOS FICTÍCIOS]`, `[NÃO VALIDADA]`. Nunca apresentar valores como "resultado" |
| R5 | Fórmula da simulação C4 contém erro químico | Pedagógico | Média | Alto | Alta | Usar fórmula didática simplificada com disclaimer explícito. Não afirmar precisão científica |
| R6 | Novos componentes quebram impressão | Técnico | Média | Médio | Média | Testar `print.css` após cada componente. Simulação oculta na impressão |
| R7 | Novos componentes quebram testes existentes (T1–T26) | Regressão | Baixa | Muito Alto | Alta | Rodar `npm test` após cada sublote. Se T1–T26 falhar, reverter implementação |
| R8 | Excesso de SVG inline aumenta tamanho do HTML | Técnico | Baixa | Baixo | Baixa | Otimizar SVG (remover metadados). Infográfico deve ter < 5KB |
| R9 | Navegação por teclado quebrada nos novos componentes | Acessibilidade | Média | Alto | Alta | `tabindex="0"`, `role="button"`, `aria-label` em todos os elementos interativos |
| R10 | Contraste de cores insuficiente nos cabeçalhos de estação | Acessibilidade | Média | Médio | Média | Validar contraste WCAG AA (≥ 4.5:1) para texto branco sobre cada cor HSL de estação |
| R11 | Placeholders ou avisos éticos removidos acidentalmente durante reestruturação | Ético | Baixa | Muito Alto | Alta | Verificação por grep automatizado antes do commit: `grep -r "DADOS FICTÍCIOS" index.html` |
| R12 | Conteúdo pedagógico alterado acidentalmente | Pedagógico | Baixa | Muito Alto | Alta | Diff antes de cada commit. Nenhum texto pedagógico deve mudar |
| R13 | Simulação C4 adiciona dependência externa acidentalmente | Técnico + Ético | Baixa | Alto | Média | Gate: verificar `package.json` antes do PR. Nenhum `npm install` permitido |
| R14 | Grid CSS dos cartões não é suportado em navegadores muito antigos | Técnico | Baixa | Baixo | Baixa | CSS Grid é amplamente suportado (>96% global). Fallback com `display: block` |
| R15 | Simulação C4 implementada antes de C1-C3 | Regressão | Baixa | Médio | Média | Gate condicional: C4 só inicia após C1+C2+C3 concluídos e testados |

---

### 3. Riscos Críticos (Severidade ≥ Alta)

| # | Risco | Ação Obrigatória |
|---|-------|-----------------|
| R4 | Simulação interpretada como dado real | 3 avisos visuais obrigatórios + nenhum valor apresentado como "resultado científico" |
| R5 | Erro químico na fórmula | Disclaimer explícito: "valores aproximados para fins didáticos" |
| R7 | Quebra de testes existentes | `npm test` obrigatório após cada sublote |
| R9 | Navegação por teclado quebrada | ARIA + tabindex em todos os elementos interativos |
| R11 | Placeholders removidos | Grep automatizado + revisão visual |
| R12 | Conteúdo pedagógico alterado | Diff controlado |

---

### 4. Plano de Contingência para C4 (Simulação)

A simulação demonstrativa (C4) é o componente de **maior risco** da Execução 3. O plano de contingência é:

#### 4.1 Decisão de Implementar ou Não

| Condição | Decisão |
|----------|---------|
| C1, C2, C3 concluídos e todos os testes passando | **Implementar C4** |
| Qualquer teste T1–T40 falhando | **NÃO implementar C4** |
| Complexidade de C4 ameaça prazo/qualidade | **Adiar C4 para Execução 4** |

#### 4.2 Avisos Obrigatórios na Interface (se C4 implementado)

```html
<!-- Aviso 1: Cabeçalho do painel -->
<span class="placeholder-block__tag">⚠️ SIMULAÇÃO DEMONSTRATIVA — NÃO VALIDADA CIENTIFICAMENTE</span>

<!-- Aviso 2: Rodapé do painel -->
<p class="sim-disclaimer">[DADOS FICTÍCIOS PARA TESTE] — Os valores apresentados são aproximações didáticas 
simplificadas. Não utilizar para cálculos reais de saponificação.</p>

<!-- Aviso 3: Tooltip em cada output -->
<span title="Valor estimado para fins didáticos. Não reflete precisão científica.">...</span>
```

#### 4.3 Restrições Técnicas de C4

- **Sem `fetch`, `XMLHttpRequest`, `WebSocket`** — função puramente local;
- **Sem `localStorage`, `sessionStorage`** — sem persistência;
- **Sem `FormData`, `submit`** — sem coleta;
- **Fórmula exposta em comentário** — para auditabilidade;
- **Saída qualitativa** — "consistência mole", "consistência média", "consistência dura" (não numérica pura).

---

### 5. Verificações Automatizáveis

| Verificação | Comando | Quando |
|------------|---------|--------|
| Placeholders preservados | `grep -c "DADOS FICTÍCIOS" index.html` (deve ser ≥ valor pré-Execução 3) | Antes de cada commit |
| Avisos éticos preservados | `grep -c "Protótipo com dados fictícios" index.html` | Antes de cada commit |
| Nenhuma dependência adicionada | `diff <(git show main:ebook-ecosabon-prototipo/package.json) ebook-ecosabon-prototipo/package.json` | Antes do PR |
| Nenhum fetch/XHR no JS | `grep -r "fetch\|XMLHttpRequest\|WebSocket" src/scripts/` | Antes do PR |
| Testes passando | `npm test` | Após cada sublote |

---

### 6. Matriz de Impacto em Governança Acadêmica

| Aspecto | Risco de Violação | Medida |
|---------|-------------------|--------|
| Dados fictícios | Tags removidas durante refatoração | Contagem por grep antes/depois |
| Rubrica | Pesos alterados acidentalmente | Diff do `index.html` limitado às áreas de mudança |
| BNCC | Alinhamento alterado | Nenhuma alteração no Módulo 4 (Caixa de Ferramentas) |
| Formulário docente | Perguntas alteradas | Nenhuma alteração no `mod-validacao` |
| Checklist Go/No-Go | Critérios alterados | Nenhuma alteração no `mod-checklist` |
| Avisos CEP/LGPD | Removidos ou enfraquecidos | Revisão visual obrigatória |

---

### 7. Conclusão

A Execução 3 apresenta risco **moderado** nos componentes C1-C3 e risco **alto** no componente C4 (simulação). A estratégia de condicionar C4 à aprovação prévia de C1-C3 mitiga o risco geral.

Os riscos críticos estão todos cobertos por mitigações automatizáveis (grep, npm test, diff) e/ou revisões manuais obrigatórias.
