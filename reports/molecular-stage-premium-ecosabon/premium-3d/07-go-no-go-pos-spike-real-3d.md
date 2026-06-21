# Decisão de GO/NO-GO — Pós-Spike Real 3D Rotacionável

Este documento consolida a decisão técnica pós-experimento do visualizador 3D real com Three.js.

---

## 1. Decisão Formal de Desenvolvimento
Após a análise de peso, acessibilidade e operabilidade da prova de conceito real 3D em `experiments/premium-3d-real-rotatable-spike/`, estabelecemos as seguintes resoluções:

*   **Integração no E-book:** `NO-GO para integração imediata no e-book principal.`
*   **Destino do Spike:** `GO para manter o spike como prova técnica real 3D rotacionável` contida na pasta experimental, atuando como portfólio.
*   **Protótipo de Produção:** `GO CONDICIONAL para futuro protótipo de produto` somente se os critérios de usabilidade, acessibilidade WCAG (teclado/leitor), peso total do arquivo e fallback de WebGL forem homologados.
*   **Comercialização:** `NO-GO para precificação antes de uma versão demonstrável estabilizada` no produto principal.

## 2. Roteiro de Condicionais para Homologação
Qualquer avanço técnico futuro exigirá:
1.  **Auditoria de Compatibilidade:** Ensaio em dispositivos reais de escolas (tablets antigos, computadores baseados em Linux educacional) para validar o comportamento do WebGL.
2.  **Solução de Acessibilidade 3D:** Mapeamento de atalhos de teclado integrados à navegação por estações do e-book.
3.  **Visualização Qualitativa:** O visualizador rotacionável deve manter-se estritamente como representação qualitativa, sem cálculos moleculares ou cinéticos.

---
*Decisão documentada sob a governança da Fase C0.*
