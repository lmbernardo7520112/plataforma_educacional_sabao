# Auditoria Pedagógica — Spike Premium 3D Real (Fase C1)

Este documento apresenta o laudo da auditoria pedagógica realizada sobre o Spike (Prova de Conceito) do visualizador tridimensional real para o Palco Molecular do **EcoSabon**.

---

## 1. Objetivo Pedagógico
O objetivo fundamental desta auditoria é analisar se a inserção de um modelo tridimensional real e interativo (Three.js com rotação orbital livre) contribui significativamente para o processo de ensino-aprendizagem da reação de saponificação ou se gera sobrecarga cognitiva e riscos conceituais que inviabilizam sua integração imediata.

## 2. Contribuição para a Aprendizagem
*   **Visualização Espacial:** O modelo 3D real facilita a compreensão da tridimensionalidade da molécula de triglicerídeo e do ataque espacial dos íons hidróxido. Ao contrário das representações 2D bidimensionais tradicionais dos livros didáticos, a visualização em perspectiva orbital permite que o estudante observe o "ataque didático" às carbonilas sob múltiplos ângulos.
*   **Identificação Visual de Componentes:** O código do Spike separa por cores padronizadas e legendas claras cada elemento:
    *   **Triglicerídeo (Verde):** Demonstra a estrutura contínua do éster triplo do óleo vegetal.
    *   **NaOH (Vermelho/Cinza):** Destaca o reagente alcalino flutuando de forma didática na região intermediária.
    *   **Sabão (Azul):** Ilustra as caudas longas de tensoativos.
    *   **Glicerol (Laranja):** Destaca o coproduto gerado ao fim da quebra ácida/alcalina.

## 3. Riscos de Distração e Cognição
*   **Sobrecarga Cognitiva (Interatividade Sem Foco):** A rotação orbital livre por meio do mouse/toque pode distrair o aluno, transformando o Palco Molecular em um elemento meramente lúdico, sem foco didático. A ausência de guias explicativos dinâmicos que conectem a rotação ao conceito de saponificação é um fator limitante.
*   **Efeito Visual vs. Valor Didático:** Sem uma roteirização pedagógica estrita, a manipulação livre da câmera tridimensional agrega pouco valor conceitual em comparação ao tempo de engajamento do estudante.

## 4. Risco de Confusão com Simulação Real
*   **Representação Qualitativa:** O Spike não é uma simulação cinética nem um motor físico molecular em tempo real. Não há cálculos de colisões reais, distâncias interatômicas exatas ou forças intermoleculares dinâmicas.
*   **Necessidade de Salvaguardas:** Há um risco real de que estudantes ou docentes confundam o modelo esquemático procedural com uma simulação computacional cientificamente rigorosa. Por este motivo, o uso de um aviso de isenção de responsabilidade qualitativo visível é mandatório e crucial.

## 5. Relação com o Baseline Estável B1+B2
*   **Superioridade Atual de B1+B2:** O baseline implementado no e-book principal (Palco Molecular Estático B1 + Sequenciador Qualitativo em Etapas B2) permanece pedagogicamente superior para a produção atual pelas seguintes razões:
    1.  **Linearidade Didática:** Conduz o aluno passo a passo pela reação (início, meio e fim), garantindo que a sequência lógica da reação seja assimilada antes da exploração espacial livre.
    2.  **Baixa Carga Cognitiva:** Foca inteiramente na leitura dirigida e na compreensão textual-visual sequencial.
    3.  **Acessibilidade Universal:** B1+B2 funcionam em qualquer leitor de tela ou dispositivo antigo sem demandar aceleração gráfica de hardware.

## 6. Linguagem Adequada e Salvaguardas
A linguagem adotada no Spike é suficientemente cautelosa. O aviso de isenção qualitativo está destacado e explicita que se trata de uma "representação qualitativa simplificada". Esta formulação de isenção deve ser mantida obrigatoriamente se o projeto evoluir para um protótipo integrado no futuro.

## 7. Recomendações e Veredito Pedagógico
O visualizador tridimensional real contido no Spike é avaliado como:
*   **Útil como Portfólio Técnico:** Serve como evidência de alto nível de engenharia gráfica offline;
*   **Promissor como Protótipo Futuro:** Apresenta grande potencial educacional se combinado a um sistema de guia pedagógico dirigido por etapas (sequenciador 3D híbrido);
*   **Insuficiente para Integração Imediata:** Não deve ser mesclado ao produto principal devido à falta de validação real do impacto pedagógico em sala de aula;
*   **Dependente de Validação Pedagógica Posterior:** Exige acompanhamento docente especializado em química de ensino médio antes de qualquer homologação em produção.

**Recomendação:** Manter o Spike estritamente isolado da branch de produção. O 3D real deve ser tratado como uma camada adicional e opcional no futuro, sem nunca substituir a robustez didática inclusiva de B1+B2.

---
*Laudo de auditoria pedagógica homologado pela equipe pedagógica do EcoSabon.*
