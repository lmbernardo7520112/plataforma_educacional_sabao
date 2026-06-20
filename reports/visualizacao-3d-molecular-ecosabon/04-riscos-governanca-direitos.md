# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 34: Gestão de Riscos, Governança e Direitos Autorais

**Autor:** Antigravity (Arquiteto de Produto Educacional Digital)  
**Status:** ✅ Concluído (Fase de Planejamento)  
**Data:** 2026-06-20  

---

### 1. Mapeamento de Riscos e Mitigações

#### Risco 1: Violação de Propriedade Intelectual (Direitos Autorais do Kotobee)
*   **Descrição:** Copiar código, imagens, assets tridimensionais, arquivos de textura ou descrições científicas de botânica do e-book *Plant Anatomy* para o repositório do *EcoSabon*.
*   **Mitigação:** Implementação limpa de design instrucional (Clean-room design). Todos os SVGs das moléculas, textos sobre saponificação, identidades visuais de botões e comportamentos de animação são gerados de forma 100% inédita e autoral pelo EcoSabon, sem reaproveitar nenhum pixel ou byte do Kotobee.

#### Risco 2: Dependência de Redes Externas (Lock-in de Conexão)
*   **Descrição:** Utilizar iframes externos (como Sketchfab, Biodigital Human, YouTube ou APIs proprietárias) que requerem conexão à internet, quebrando a portabilidade offline completa do EcoSabon.
*   **Mitigação:** Proibir o uso de embeds externos. A rota recomendada apoia-se em SVG inline nativo e estilização CSS local. O aplicativo é 100% auto-contido e funciona sem acesso à rede.

#### Risco 3: Perda de Acessibilidade (A11y Breakdown)
*   **Descrição:** O uso de Canvas WebGL ou de animações ricas pode impossibilitar o uso de leitores de tela por alunos cegos.
*   **Mitigação:** Criação de um fallback textual descritivo robusto associado a tags Aria adequadas, além do suporte estrito à diretiva `prefers-reduced-motion` no CSS.

#### Risco 4: Degradamento de Impressão e PDF
*   **Descrição:** O visualizador interativo molecular sumir ou quebrar o visual da página impressa.
*   **Mitigação:** CSS de impressão (`print.css`) dedicado a desativar as animações e dispor as moléculas de reagentes e produtos sequencialmente, simulando um livro didático convencional estático impresso de alto padrão.

#### Risco 5: Confusão Conceitual com Simulação Científica Validada (C4/3E)
*   **Descrição:** O usuário acreditar que a animação representa um reator químico virtual real capaz de fazer cálculos estequiométricos de pH, temperatura ou rendimento de saponificação, o que infringe as regras éticas do mestrado profissional (bloqueio do C4/3E).
*   **Mitigação:** Rotular o elemento explicitamente como "Visualização Molecular Didática (Qualitativa)". Não adicionar nenhum input de controle numérico dinâmico, sliders ou campos de fórmula.

---

### 2. Matriz de Governança
*   **Versionamento:** Todos os documentos de planejamento e códigos de visualização 2.5D desenvolvidos no futuro devem pertencer ao repositório local e ser versionados.
*   **Arquivos do Kotobee:** Fica terminantemente proibido clonar, fazer download ou versionar no Git qualquer arquivo temporário de benchmark do Kotobee Plant Anatomy.

---

### 3. Declaração Obrigatória de Não-Cópia
> [!IMPORTANT]
> Nenhum conteúdo textual, imagem, screenshot, vídeo, modelo 3D, textura, ícone, asset, script, identidade visual ou arquivo multimídia do Plant Anatomy/Kotobee foi copiado, extraído ou incorporado ao EcoSabon. A análise usa o exemplo exclusivamente como benchmark de padrões abstratos de UX, visualização científica e interação.
