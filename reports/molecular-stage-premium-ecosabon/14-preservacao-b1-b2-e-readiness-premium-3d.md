# Relatório Estratégico — Preservação da B1+B2 e Prontidão do Premium 3D

Este documento detalha o posicionamento estratégico, a classificação comercial e a trilha de prontidão tecnológica para a continuidade do desenvolvimento do **Molecular Stage** do projeto **EcoSabon**.

---

## 1. Decisão de Preservação da Versão Atual (B1+B2)
A versão do Palco Molecular desenvolvida nas fases B1 (visualização estática/acessível) e B2 (sequenciador pedagógico 4D qualitativo) está homologada e incorporada à branch `main` com 89/89 testes aprovados. 

Fica estabelecido que:
*   **Preservação Absoluta:** O código, estrutura HTML/CSS/JS e o fallback didático do sequenciador B1+B2 devem ser preservados como baseline estável e demonstrável do produto.
*   **Proteção à Sobrescrita:** Qualquer implementação de uma futura camada 3D não deve sobrescrever nem substituir o código leve, offline e acessível da B1+B2.
*   **Fallback Permanente:** A versão qualitativa B1+B2 continuará disponível no e-book como alternativa padrão e de alta acessibilidade para dispositivos móveis antigos ou cenários com restrições de conectividade/desempenho.

---

## 2. Classificação Comercial da Versão Atual (B1+B2)
A versão atual do Palco Molecular é formalmente classificada como:
`Demonstração Avançada / Pacote Profissional Avançado`

**Características e Valor de Negócio:**
*   **Proporção Didática Elegante:** Embora seja qualitativa e não utilize gráficos 3D dinâmicos, a versão demonstra alta sofisticação no design visual e pedagógico.
*   **Prova de Capacidade Técnica:** Serve como demonstração de excelência técnica e usabilidade de ponta para oportunidades de desenvolvimento terceirizado/freelance.
*   **Precificação Premium Inicial:** Permite uma precificação mais elevada comparada ao pacote de e-books convencionais devido à inserção de interatividade controlada.
*   **Baixo Risco e Alta Portabilidade:** Garante execução instantânea e 100% offline em qualquer dispositivo sem necessidade de downloads de recursos adicionais.

---

## 3. Matriz de Diferenciação: B1+B2 vs. Premium 3D Definitivo

| Característica | Demonstração Avançada (B1+B2) | Premium 3D Definitivo |
| :--- | :--- | :--- |
| **Tecnologia Base** | SVG puro, CSS Transitions e JavaScript isolado leve. | Modelo rotacionável multiângulo ou motor gráfico web. |
| **Interação** | Passos qualitativos discretos (etapas 0 a 8). | Rotação livre, aproximação e perspectivas multiângulo. |
| **Dependências** | Nenhuma (zero dependências adicionais). | Bibliotecas gráficas externas (ex.: Three.js, `<model-viewer>`). |
| **Acessibilidade** | Total (`aria-live`, foco visível, teclado). | Altamente complexa, requer fallbacks bidimensionais pesados. |
| **Impressão** | Nativa e linearizada (`print.css` nativo). | Depende de capturas estáticas pré-renderizadas adicionais. |
| **Execução Offline**| 100% funcional sem rede. | Pode exigir carregamento assíncrono ou CDNs. |
| **Custo/Manutenção**| Extremamente baixo. | Alto custo de licenciamento, otimização e suporte. |

---

## 4. Decisão sobre a Continuidade do Desenvolvimento
Fica deliberada a seguinte matriz de direcionamento estratégico:

*   `GO para preservar B1+B2 como demonstração avançada.`
*   `NO-GO para implementação técnica imediata do Premium 3D.`
*   `GO para estudo de viabilidade técnica, comercial e de precificação da versão Premium 3D rotacionável.`

Nenhuma linha de código referente ao Premium 3D ou à fase B3 deve ser adicionada ao repositório até a homologação deste estudo.

---

## 5. Matriz Conceitual de Precificação Proporcional
A distribuição comercial do produto e-book interativo segue a seguinte escala de entrega de valor:

1.  **Nível Básico [Placeholder: $X,XX]:** E-book navegável linear com a estrutura visual estática elementar das estações.
2.  **Nível Profissional [Placeholder: $Y,YY]:** Módulos paginados, hotspots interativos do infográfico, checklist de acompanhamento e pacote offline portátil com estilos de impressão.
3.  **Nível Avançado [Placeholder: $Z,ZZ]:** Todos os recursos anteriores enriquecidos com o **Molecular Stage B1+B2** qualitativo por etapas discreto.
4.  **Nível Premium 3D [Placeholder: $W,WW]:** Recursos anteriores integrados a um modelo didático rotacionável/multiângulo, regido por contrato e escopo próprios de engenharia de software 3D.

---

## 6. Condições Prévias para Abertura da Fase Premium 3D
Antes de qualquer desenvolvimento técnico de uma visualização rotacionável, os seguintes critérios devem ser validados e documentados:
1.  **Demanda Validada:** Existência de requisição pedagógica clara ou oportunidade comercial explícita do cliente.
2.  **Valor Incremental:** Justificativa detalhada demonstrando o valor agregado comparado à B1+B2.
3.  **Estudo de Acessibilidade:** Solução definida de navegação por teclado e fallback textual para o modelo multiângulo.
4.  **Estudo de Impressão:** Plano para representação gráfica inteligível das posições no papel.
5.  **Análise de Peso e Carregamento:** Limite de tamanho de arquivo do e-book mantido dentro das especificações de portabilidade (ex.: abaixo de 5MB totais).
6.  **Arquitetura Prévia:** Publicação prévia dos documentos de Especificação de Design de Software (SDD) e Especificação de Testes (TDD).

---

## 7. Tecnologias Candidatas para Estudo de Viabilidade Futuro
As seguintes alternativas tecnológicas devem ser investigadas no estudo de viabilidade, sob o prisma de impacto de desempenho, licenciamento e acessibilidade:
*   **SVG/CSS 2.5D Avançado:** Representação de falsa profundidade por camadas vetoriais. (Avaliar: Complexidade de design).
*   **Sequência Pré-Renderizada Multiângulo:** Imagens estáticas autorais chave alternadas de forma discreta. (Avaliar: Peso das imagens).
*   **`<model-viewer>` (Google):** Componente web nativo baseado em WebGL para visualização glTF. (Avaliar: Suporte offline, tamanho da biblioteca).
*   **Three.js:** Biblioteca JavaScript 3D flexível. (Avaliar: Licenciamento, curva de aprendizado, dependência no `package.json`).
*   **Unity WebGL / Sketchfab Embed:** Modelos integrados de plataformas externas. (Avaliar: Dependência de internet, restrições corporativas e de acessibilidade).

---
*Documento estratégico homologado sob os guardrails de linguagem e governança do projeto EcoSabon.*
