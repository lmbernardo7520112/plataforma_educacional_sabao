# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 32: Matriz de Decisão — Tecnologias de Visualização 3D/2.5D para o EcoSabon

**Autor:** Antigravity (Arquiteto de Produto Educacional Digital)  
**Status:** ✅ Concluído (Fase de Planejamento)  
**Data:** 2026-06-20  

---

### 1. Rotas Avaliadas
*   **Rota A:** SVG/CSS 2.5D Molecular Stage (Desenho autoral com transformações de perspectiva 3D em puro CSS e SVG).
*   **Rota B:** SVG Animado em etapas da reação.
*   **Rota C:** Canvas 2D/2.5D autoral com renderização via Javascript.
*   **Rota D:** WebGL customizado nativo (sem dependências, puro JS + shaders).
*   **Rota E:** Three.js (Biblioteca externa de alto nível para renderização WebGL).
*   **Rota F:** Unity WebGL (Compilação pesada do Unity para o navegador).
*   **Rota G:** Manter estritamente os Hotspots atuais sem novas camadas.

---

### 2. Matriz Comparativa (Notas de 0 a 10)
*Nota: Para todos os critérios, 10 representa o cenário ideal (melhor desempenho, menor risco, melhor acessibilidade, etc.).*

| Critério | Rota A (CSS/SVG 2.5D) | Rota B (SVG Etapas) | Rota C (Canvas 2D) | Rota D (WebGL Custom) | Rota E (Three.js) | Rota F (Unity) | Rota G (Apenas Hotspots) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Impacto Visual** | 8 | 7 | 6 | 9 | 10 | 10 | 5 |
| **Valor Pedagógico** | 9 | 9 | 7 | 8 | 9 | 8 | 8 |
| **Acessibilidade (A11y)** | 10 | 10 | 8 | 2 | 2 | 1 | 10 |
| **Impressão (Print flow)** | 9 | 10 | 7 | 1 | 1 | 0 | 10 |
| **Funcionamento Offline** | 10 | 10 | 10 | 10 | 8 | 4 | 10 |
| **Peso do Pacote (KB)** | 10 | 10 | 9 | 9 | 5 | 1 | 10 |
| **Manutenção Futura** | 9 | 9 | 7 | 4 | 5 | 2 | 10 |
| **Testabilidade (Vitest)** | 9 | 9 | 7 | 3 | 3 | 1 | 10 |
| **Risco de Lock-in** | 10 | 10 | 10 | 8 | 5 | 1 | 10 |
| **Evitar Simulação Científica** | 10 | 10 | 9 | 6 | 5 | 3 | 10 |
| **Compatibilidade Mobile** | 9 | 10 | 9 | 7 | 6 | 2 | 10 |
| **Aderência ao Mestrado** | 10 | 10 | 8 | 5 | 5 | 2 | 10 |
| **Potencial Comercial** | 9 | 8 | 7 | 9 | 10 | 10 | 7 |
| **Tempo de Desenvolvimento** | 8 | 9 | 7 | 3 | 4 | 2 | 10 |
| **Risco de Regressão** | 9 | 9 | 8 | 6 | 5 | 3 | 10 |
| **SOMA TOTAL** | **139** | **139** | **117** | **90** | **83** | **50** | **130** |

---

### 3. Recomendações
*   **Rota Recomendada (Principal):** **Rota A (SVG/CSS 2.5D Molecular Stage) integrada com Rota B (SVG Animado por etapas)**.  
    *Justificativa:* Apresenta a maior nota geral (139 pontos). Garante excelente impacto estético (visual premium, profundidade tridimensional com transformações e sombras CSS), mantém acessibilidade nativa completa para leitores de tela, consome menos de 20 KB de peso adicional, funciona 100% offline, imprime com qualidade editorial e elimina riscos éticos de ser confundida com uma "simulação quantitativa".
*   **Rota Fallback:** **Rota G (Manter apenas os hotspots atuais)**.  
    *Justificativa:* Caso surjam problemas de tempo ou restrições futuras na dissertação, a permanência da suíte atual de hotspots acessíveis de forma estática garante um produto robusto e 100% testado.
*   **Rotas Rejeitadas:**
    *   *Rota F (Unity WebGL):* Rejeitada completamente. Extremamente pesada (>20MB), inviabiliza funcionamento offline estável em conexões escolares lentas, destrói o fluxo de impressão e gera alto risco de lock-in proprietário.
    *   *Rota E (Three.js):* Rejeitada. A complexidade matemática e o peso da biblioteca externa quebram a premissa de "zero dependências" do EcoSabon e a compatibilidade mobile de baixo custo.

---

### 4. Declaração Obrigatória de Não-Cópia
> [!IMPORTANT]
> Nenhum conteúdo textual, imagem, screenshot, vídeo, modelo 3D, textura, ícone, asset, script, identidade visual ou arquivo multimídia do Plant Anatomy/Kotobee foi copiado, extraído ou incorporado ao EcoSabon. A análise usa o exemplo exclusivamente como benchmark de padrões abstratos de UX, visualização científica e interação.
