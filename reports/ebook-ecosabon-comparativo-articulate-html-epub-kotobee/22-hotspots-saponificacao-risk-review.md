# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 22: Análise de Risco — Hotspots Acessíveis no Infográfico

**Branch de Planejamento:** `plan/ebook-ecosabon-hotspots-saponificacao`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** 📝 PLANEJAMENTO (Aguardando autorização de implementação)

---

### 1. Matriz de Análise de Riscos e Mitigação

Esta matriz mapeia os principais riscos visuais, pedagógicos, de acessibilidade e governança acadêmica na implementação dos hotspots do infográfico, com planos de contingência detalhados.

| Risco Identificado | Severidade | Impacto | Estratégia de Mitigação Obrigatória |
|--------------------|:----------:|:-------:|-------------------------------------|
| **Cópia de Padrão Proprietário ou Assets do Kotobee** | Alta | Jurídico / Direitos | Não copiar nenhum ícone, paleta de cores, código AngularJS ou layout do benchmark. Todo o código HTML/CSS/JS e o design do infográfico do EcoSabon devem ser desenvolvidos originalmente. |
| **Confusão do Hotspot com Simulador IoT ou Cálculo Dinâmico** | Alta | Governança Ética | O hotspot deve revelar **apenas conteúdo explicativo não bloqueante** local. Nenhum input de parâmetros, sliders, fórmulas matemáticas reativas ou cálculos de pH serão adicionados. O componente C4/3E permanece bloqueado. |
| **Quebra de Impressão (Texto Oculto no PDF)** | Média | Usabilidade Docente | Configurar o `print.css` para ignorar o comportamento toggle. Na impressão, os painéis explicativos de todos os hotspots devem ser forçados a renderizar como blocos lineares de texto plano, exibindo as informações na ordem de leitura sem sobreposições. |
| **Redução de Acessibilidade (Bloqueio por Teclado)** | Média | Acessibilidade (A11y) | Usar botões HTML nativos (`<button>`) para os gatilhos dos hotspots. Eles possuem focabilidade nativa e respondem a cliques, `Enter` e `Space` sem necessidade de hack JS. Manter `:focus-visible` com contorno evidente de 3px. |
| **Suavização ou Oclusão do Alerta de NaOH** | Média | Pedagógico / Segurança | O hotspot sobre o NaOH deve exibir um alerta visual claro de causticidade e segurança (ícone de atenção ou borda de perigo), garantindo que as normas de segurança laboratorial ganhem evidência, não oclusão. |
| **Excesso Decorativo e Poluição Visual** | Baixa | Estética / UX | O visual dos pins de hotspot no infográfico deve ser sutil e minimalista (ex: pequenos círculos com ícones `+` ou `i` que se misturam harmonicamente ao esquema de cores verde/âmbar já consolidado do infográfico) sem bloquear a leitura. |
| **Layout Quebrado ou Muito Pesado no Mobile** | Baixa | Performance / UX | O infográfico em mobile já empilha verticalmente. As caixas descritivas dos hotspots devem usar posicionamento flexível que ocupe a largura completa da tela do celular, revelando painéis explicativos inline e acessíveis em fluxo natural. |
| **Alteração Indevida de Conteúdo Científico/BNCC** | Baixa | Governança Acadêmica | Preservar verbatim todos os textos científicos das reações, as descrições das estações e as rubricas BNCC atuais, sem alterações ou exclusões. |

---

### 2. Plano de Contingência para Testes de Regressão
Se, durante a futura implementação, a suíte de testes indicar falha nos testes anteriores (T1-T50), o desenvolvimento do código produtivo dos hotspots deve ser imediatamente pausado e revertido para o último commit limpo da `main`. O foco primário de QA deve ser restaurar a integridade semântica da leitura contínua e dos metadados pedagógicos existentes antes de prosseguir com novos recursos interativos.
