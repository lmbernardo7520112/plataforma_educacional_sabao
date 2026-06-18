# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 10a: Especificação — Execução 2 (SDD)

**Branch:** `style/ebook-ecosabon-execucao-2`
**Base:** `style/ebook-ecosabon-execucao-1`
**Data:** 2026-06-18

---

### 1. Objetivo da Execução 2

Transformar a experiência visual e editorial do protótipo HTML/CSS/JS em um **web-book de leitura contínua**, com:

1. Capa editorial integrada (`min-height: 90vh`);
2. Banners de abertura de módulos/capítulos;
3. Sumário lateral de leitura (sidebar);
4. Atualização do módulo ativo por rolagem (`IntersectionObserver`);
5. Fluxo de leitura vertical contínuo (scroll-based).

---

### 2. Escopo Autorizado

- Criar capa editorial integrada com metadados do produto;
- Criar banners/divisores de abertura dos módulos;
- Criar sumário lateral de leitura (sidebar);
- Implementar `IntersectionObserver` como progressive enhancement;
- Implementar fallback funcional sem `IntersectionObserver`;
- Melhorar a sensação de leitura contínua/web-book;
- Manter compatibilidade mobile e desktop;
- Manter impressão limpa e legível;
- Adicionar testes para a nova navegação;
- Criar documentação técnica.

### 3. Não-Escopo (Proibições)

- **Fase 3** (além de banners/capa): infográficos, mapa interativo de estações;
- **Fase 4**: exportação de respostas, localStorage, persistência;
- **Fase 5**: homologação, dados reais, publicação;
- Frameworks, CDN, APIs externas, fontes externas, imagens externas;
- Alteração de conteúdo científico, rubrica, BNCC;
- Remoção de `[DADOS FICTÍCIOS PARA TESTE]` ou avisos éticos;
- Coleta de dados;
- Código morto ou duplicado.

---

### 4. Arquivos a Alterar

| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `index.html` | Reestruturar para leitura contínua, adicionar capa, sidebar, banners |
| `src/styles/main.css` | Estilos da capa, sidebar, banners, layout contínuo, responsivo |
| `src/styles/print.css` | Ocultar sidebar na impressão, ajustes de leitura linear |
| `src/scripts/interactions.js` | Novas funções: initSidebar, initScrollObserver, scrollToSection |
| `src/scripts/app.js` | Inicializar sidebar e scroll observer |
| `tests/interactions.test.js` | Novos testes para navegação, fallback, sidebar |

---

### 5. Critérios de Aceite

1. A capa editorial integrada existe e é responsiva (desktop + mobile);
2. Cada módulo principal tem abertura visual clara (banner);
3. O sumário lateral permite pular para módulos;
4. O módulo ativo é destacado no sumário durante a rolagem;
5. Fallback funcional quando `IntersectionObserver` não existe;
6. Navegação por teclado permanece possível;
7. Mobile continua utilizável (sidebar recolhível);
8. Impressão continua limpa (sidebar oculta);
9. `npm test` passa (todos os testes antigos + novos);
10. Nenhum placeholder ou aviso ético removido.

---

### 6. Riscos Técnicos

| Risco | Probabilidade | Mitigação |
|-------|--------------|-----------|
| IntersectionObserver indisponível em navegadores antigos | Baixa | Fallback com detecção de feature |
| Mudança de SPA (abas) para scroll contínuo quebra testes existentes | Média | Manter ambos os modos, testes adaptados |
| Sidebar ocupa espaço excessivo em mobile | Média | Sidebar recolhível com botão hamburger |
| JSDOM não suporta IntersectionObserver | Alta | Mock/stub em testes, lógica pura separada |

---

### 7. Estratégia de Fallback

A detecção será feita via `'IntersectionObserver' in window`:

- **Se disponível:** `IntersectionObserver` monitora seções e atualiza sidebar;
- **Se indisponível:** O sumário continua navegável por cliques (âncoras), sem destaque automático do módulo ativo. A navegação não quebra.

---

### 8. Estratégia de Acessibilidade

- Sidebar com `role="navigation"` e `aria-label`;
- Links do sumário com `aria-current="true"` no item ativo;
- Foco visível em todos os links do sumário;
- Contraste WCAG AA mantido;
- Sumário navegável por teclado (Tab + Enter);
- Não depender apenas de cor para indicar módulo ativo (negrito + borda).

---

### 9. Estratégia de Impressão

- Sidebar oculta via `display: none !important` em `print.css`;
- Botão de toggle do sumário oculto;
- Todos os módulos exibidos em sequência linear;
- Capa impressa com margens adequadas;
- Banners de módulo impressos sem fundos escuros.

---

### 10. Estratégia de Testes

| # | Teste | Motivo |
|---|-------|--------|
| T1 | Clique no item do sumário leva ao módulo correto | Validar navegação |
| T2 | Módulo ativo atualizado de modo seguro | Validar setActiveNavItem |
| T3 | Fallback funciona sem IntersectionObserver | Validar degradação graciosa |
| T4 | Blocos de revelação continuam funcionando | Regressão |
| T5 | Checklist Go/No-Go continua funcionando | Regressão |
| T6 | Navegação não quebra com ID inexistente | Robustez |
| T7 | Navegação por teclado permanece possível | Acessibilidade |
| T8 | Nenhuma função lança erro em JSDOM | Estabilidade |

Testes antigos (10) devem ser preservados. Novos testes adicionados sem remover nenhum anterior.

---

### 11. Métricas de Governança

| Gate | Critério | Status |
|------|----------|--------|
| G1 — SDD | Este arquivo existe antes da implementação | ✅ |
| G2 — TDD | Plano de testes criado antes/junto da implementação | Pendente |
| G3 — Clean Code | Funções pequenas, sem código morto | Pendente |
| G4 — Acessibilidade | Teclado, foco, contraste, aria | Pendente |
| G5 — Impressão | Sidebar oculta, leitura linear | Pendente |
| G6 — Governança Acadêmica | Placeholders preservados | Pendente |
| G7 — Testes | npm test passa | Pendente |
| G8 — Commits | Pequenos e semânticos | Pendente |

---

### 12. Arquitetura da Transformação

A transformação principal é converter o sistema de **abas (SPA com display:none)** para um **fluxo de leitura contínua** onde todos os módulos são visíveis simultaneamente e o scroll determina o módulo ativo.

```
ANTES (SPA):
  navbar → [mod-inicio] [mod-1] [mod-2] ... (apenas 1 visível)

DEPOIS (Web-book contínuo):
  sidebar ─┐
           ├── hero-cover (90vh)
           ├── mod-inicio (seção visível)
           ├── mod-1 (seção visível)
           ├── mod-2 (seção visível)
           ├── mod-3 (seção visível)
           ├── mod-4 (seção visível)
           ├── mod-governanca (seção visível)
           ├── mod-validacao (seção visível)
           └── mod-checklist (seção visível)
```

A navbar de abas será substituída pela sidebar lateral. O `navigateToModule()` continua existindo para scroll-to-section, mas o `display:none` dos módulos será removido em favor de visibilidade contínua.
