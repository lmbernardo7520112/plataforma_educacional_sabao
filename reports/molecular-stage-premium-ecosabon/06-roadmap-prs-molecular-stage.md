# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 06: Roteiro de Implementação Baseado em Pull Requests

Este documento detalha o planejamento da futura implementação da camada **Molecular Stage** dividida em Pull Requests pequenas, modulares e auditáveis.

---

### 1. Fluxo de Integração Contínua (CI/CD) e Portões de Segurança
Cada PR descrita a seguir deve ser submetida de forma independente à branch `main` e passará pelos seguintes portões automáticos de validação antes de ser aprovada:
1. **Sanidade dos Testes:** Todos os testes unitários da suíte devem passar (incluindo os 75 testes existentes e os novos criados para a PR).
2. **Inspeção de Complexidade:** A complexidade ciclomática de todas as novas funções deve ser verificada (limite `≤ 7`).
3. **Validação a11y:** Verificação do foco do teclado e do anúncio dinâmico para leitores de tela.
4. **Higiene Git:** Garantir que nenhum arquivo de build ou binários pesados foram commitados.

---

### 2. Divisão das Etapas em Pull Requests

```mermaid
gantt
    title Planejamento de PRs - Molecular Stage
    dateFormat  YYYY-MM-DD
    section Documentação e Testes
    PR 1: SDD/TDD final       :active, pr1, 2026-06-21, 2d
    section Interface Estática
    PR 2: SVG Estático        : pr2, after pr1, 2d
    PR 3: Estados Visuais     : pr3, after pr2, 2d
    section Dinâmica e Acessibilidade
    PR 4: Animação Temporal 4D: pr4, after pr3, 2d
    PR 5: a11y e Impressão    : pr5, after pr4, 2d
    section Auditoria e Fechamento
    PR 6: Auditoria Final     : pr6, after pr5, 1d
```

#### **PR 1: Especificação TDD e Suíte de Testes Inicial**
* **Objetivo:** Criar os arquivos de testes no diretório `tests/molecular-stage.test.js` especificando todos os comportamentos de DOM, acessibilidade, erros e limites descritos no [Documento 03](03-tdd-plan-molecular-stage.md).
* **Entregáveis:** Arquivo de testes unitários (todos falhando por ausência de implementação do código-fonte).

#### **PR 2: Marcação SVG Estática e Estruturação HTML**
* **Objetivo:** Criar o contêiner DOM e a estrutura SVG estática com os elementos das moléculas de triacilglicerol, NaOH, água, sabão e glicerol.
* **Entregáveis:** Atualização do `index.html` injetando a marcação SVG e o painel de fallback de forma estática, sem scripts ativos.

#### **PR 3: Estados Visuais e Classes CSS**
* **Objetivo:** Adicionar os estilos CSS necessários para renderizar e ocultar os diferentes estados moleculares com base nas classes aplicadas.
* **Entregáveis:** Estilos estruturados no `main.css`, incluindo a ocultação de frames inativos e estilização dos botões de navegação.

#### **PR 4: Lógica de Controle JavaScript (Animação Temporal 4D)**
* **Objetivo:** Criar o script isolado `molecular-stage.js` implementando a máquina de estados local, navegação de etapas e manipulação das classes de transição no DOM.
* **Entregáveis:** `molecular-stage.js` criado e integrado no bootstrap do `app.js` de forma isolada. Os testes de navegação de etapas criados na PR 1 devem passar a ficar verdes.

#### **PR 5: Acessibilidade (`aria-live`) e Impressão (`print.css`)**
* **Objetivo:** Injetar os anúncios dinâmicos de acessibilidade e configurar os estilos de impressão para linearizar a exibição.
* **Entregáveis:** Atualização de scripts e estilos de impressão. Todos os testes de a11y e print criados na PR 1 devem passar.

#### **PR 6: Auditoria Final de Métricas e Encerramento**
* **Objetivo:** Realizar a varredura de complexidade ciclomática e gerar o relatório final de homologação do Molecular Stage.
* **Entregáveis:** Relatório final e encerramento técnico da funcionalidade.
