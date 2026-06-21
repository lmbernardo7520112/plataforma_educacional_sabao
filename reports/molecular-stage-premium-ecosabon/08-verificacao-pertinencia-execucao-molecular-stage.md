# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 08: Verificação de Pertinência de Execução Técnica

Este relatório analisa se é oportuno e vantajoso iniciar o desenvolvimento da camada de visualização molecular (**Molecular Stage 2.5D/4D**) neste momento, sopesando riscos técnicos, custo de desenvolvimento e valor pedagógico e de negócios.

---

### 1. Pergunta Central

> **"É pertinente iniciar agora a execução técnica (escrita de código-fonte) do Molecular Stage 2.5D/4D?"**

---

### 2. Critérios de Avaliação (Pontuação de 0 a 10)

Para responder a esta pergunta, foram avaliados 10 vetores críticos sob a escala de 0 a 10 (onde pontuações mais altas em "valor/maturidade" indicam prontidão positiva, e em "risco/custo" representam alertas de impedimento):

* **Valor Pedagógico Incremental:** `6/10` (A transposição molecular qualitativa ajuda, mas o infográfico macroscópico de estações já cobre os conceitos exigidos pela BNCC na versão v0.1.0).
* **Valor Comercial Incremental:** `5/10` (Clientes de mestrados profissionais buscam principalmente portabilidade e acessibilidade; a camada molecular premium é considerada um "desejável extra" e não um fator decisivo de contratação inicial).
* **Custo Técnico:** `8/10` (Alto esforço de design vetorial de múltiplos quadros de reação e injeção de lógica JS modular complexa).
* **Risco de Acessibilidade:** `7/10` (Alta complexidade para gerenciar focos de teclado e descrições `aria-live` em tempo real para múltiplos frames de transição sem gerar poluição para leitores de tela).
* **Risco de Performance:** `4/10` (Moderado risco, pois seria mitigado pelo uso de CSS acelerado por hardware e SVG leve).
* **Risco de Distração Pedagógica:** `6/10` (Risco de o aluno focar nas transições moleculares em detrimento do processo prático do laboratório de saponificação).
* **Risco de Parecer Simulação Científica:** `8/10` (Alto risco de o usuário confundir uma visualização qualitativa estática com um simulador estequiométrico numérico interativo, gerando falsas expectativas científicas).
* **Maturidade Arquitetural Atual:** `9/10` (Excelente nível de documentação prévia em SDD, Clean Architecture, plano de TDD e governança de complexidade).
* **Necessidade de Validação com Usuário:** `9/10` (Crítico validar primeiro se docentes e bancas realmente demandam ou compreendem essa transição molecular antes de codificar).
* **Urgência Comercial:** `2/10` (Nula urgência comercial, dado que o portfólio baseado no EcoSabon v0.1.0 já está 100% convergido e pronto para uso).

---

### 3. Condições Mínimas para GO Futuro

Qualquer início de codificação futura do Molecular Stage está condicionado ao cumprimento obrigatório de todas as premissas abaixo:

1. **Objetivo Pedagógico Claro:** Justificativa didática formal escrita de como a animação molecular apoia a aula.
2. **Wireframe Conceitual:** Desenho visual prévio de todos os quadros (frames) de reação de saponificação.
3. **Texto Explicativo Fechado:** Roteiro textual descritivo final que acompanhará os frames de reação.
4. **Testes TDD Definidos Antes:** Criação prévia de testes automatizados (Vitest) para falharem antes do código ser escrito.
5. **Fallback Textual:** Painel estático alternativo contendo toda a descrição linearizada para leitores de tela.
6. **Regra de Impressão:** CSS configurado para ocultar botões e renderizar os frames em formato de lista ilustrada contínua ao imprimir.
7. **Suporte a `prefers-reduced-motion`:** CSS de transições desativável por flags de acessibilidade de movimento.
8. **Proibição de Sliders/Simulação:** Bloqueio estrito a barras de arrastar (sliders) ou simulações matemáticas numéricas (C4/3E).
9. **Revisão de Linguagem:** Garantir que o texto descreva o material como "animação ilustrativa qualitativa" e nunca como "cálculo científico dinâmico".
10. **Branch Técnica Própria:** Isolamento do desenvolvimento em branch separada para não contaminar a `main`.
11. **PR Pequeno por Sublote:** Divisão do código em Pull Requests de tamanho reduzido focadas em componentes isolados.

---

### 4. Condições de NO-GO Imediato

O desenvolvimento técnico deve ser suspenso imediatamente (NO-GO) se ocorrer qualquer uma das condições:

* A execução for motivada apenas por impacto visual ("perfumaria tecnológica").
* Não houver roteiro didático-pedagógico consolidado para as transições da animação.
* Houver risco perceptível de o estudante ou banca confundir a animação qualitativa com um simulador de física/química dinâmico.
* Houver exigência ou tentativa de uso de WebGL, Three.js, Canvas 3D ou Unity.
* Exigir a adição de dependências pesadas e externas de npm que inflem o `package.json`.
* Prejudicar a linearização e a fidelidade da folha de estilos de impressão PDF.
* Prejudicar ou rebaixar o nível de acessibilidade WCAG 2.1 AA da aplicação atual.
* Competir em atenção ou atrasar a prospecção comercial do kit recém-concluído e operacional.

---

### 5. Opções Estratégicas

* **Opção B1 (Recomendada):** Não implementar agora e utilizar a Fase A comercial para prospecção ativa de novos clientes didáticos.
* **Opção B2:** Desenvolver apenas protótipos conceituais visuais e wireframes em documentação estática, sem codificar lógica dinâmica.
* **Opção B3:** Implementar um SVG/CSS 2.5D leve em uma Pull Request futura e isolada, exclusivamente sob demanda formal validada de mercado.
* **Opção B4:** Implementar a dimensão temporal (4D) sequencial estrita por etapas controladas e progressivas.
* **Opção B5 (Rejeitada Permanentemente):** Adotar WebGL/Three.js/Unity. Opção descartada devido a incompatibilidades de acessibilidade, portabilidade offline e tamanho de pacote.

---

### 6. Recomendação e Veredito Final

* **Veredito:** `NO-GO PARA IMPLEMENTAÇÃO TÉCNICA IMEDIATA`

* **Diretriz de Ação:** Recomenda-se manter a Trilha B exclusivamente documental e de planejamento neste estágio. Fica autorizado o **GO apenas para refinamento de especificação visual, conceituação ou wireframe estático** do Molecular Stage em novos relatórios Markdown se desejado, sem qualquer escrita de código no protótipo técnico. O foco imediato deve permanecer em prospectar e validar comercialmente os serviços com base na Fase A convergida.
