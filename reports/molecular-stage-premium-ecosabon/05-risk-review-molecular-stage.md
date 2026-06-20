# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 05: Análise de Riscos Técnicos e Pedagógicos do Molecular Stage

Este relatório apresenta a revisão de riscos e a matriz de probabilidade x impacto para o planejamento da futura camada **Molecular Stage**.

---

### 1. Matriz de Análise de Riscos (Probabilidade x Impacto)

| Identificador do Risco | Descrição do Risco | Probabilidade (1-5) | Impacto (1-5) | Criticidade (P x I) | Mitigação Proposta |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Risco T01 (Visual)** | Parecer uma simulação científica dinâmica quantitativa, induzindo o aluno ao erro de que os átomos se comportam exatamente daquela forma mecânica. | 3 | 4 | **12 (Médio)** | Utilizar legendas explicativas explícitas informando que a representação é um modelo qualitativo simplificado com fins didáticos. |
| **Risco T02 (a11y)** | Falha de acessibilidade para leitores de tela na transição de estados atômicos do SVG. | 2 | 5 | **10 (Médio)** | Implementar injeção textual robusta via regiões `aria-live="polite"` detalhando a mudança química de cada etapa. |
| **Risco T03 (Performance)** | Lentidão ou travamento em dispositivos móveis antigos devido a transições de quadros SVG complexas. | 2 | 4 | **8 (Baixo)** | Otimizar o SVG usando o mínimo de nós e animando apenas propriedades aceleradas por GPU (`opacity` e `transform`). |
| **Risco T04 (Impressão)** | Elemento da animação temporal ser omitido ou impresso como uma mancha preta sobreposta. | 2 | 5 | **10 (Médio)** | Configurar o CSS de impressão (`@media print`) para desativar a interatividade e expandir todos os frames em uma grade de imagens estáticas lineares. |
| **Risco T05 (Escopo)** | Implementação de renderizadores 3D WebGL pesados (Three.js/Unity) inflarem o pacote de 31 KB para vários megabytes. | 4 | 5 | **20 (Alto)** | **Proibição estrita de WebGL/3D**. A renderização deve limitar-se a SVGs estáticos leves animados por CSS/JS nativos. |
| **Risco T06 (Lock-in)** | Acoplar a feature em bibliotecas de visualização molecular proprietárias que exijam dependências no `package.json`. | 3 | 4 | **12 (Médio)** | Desenvolver 100% da visualização e controle usando JavaScript Vanilla nativo e manipulação de estado local. |

---

### 2. Riscos Pedagógicos (Distração vs. Aprendizagem)
* **O Risco da Distração Visual:** Uma animação excessivamente fluida ou decorativa pode desviar a atenção do estudante do foco pedagógico principal: compreender as reações de hidrólise e formação de sabão (Estequiometria qualitativa).
* **Mitigação Pedagógica:** As animações devem ser discretas, sequenciais, acionadas por etapas ativas controladas pelo aluno (foco no controle do ritmo pelo leitor) e acompanhadas de textos explicativos de transposição didática curtos e objetivos.
