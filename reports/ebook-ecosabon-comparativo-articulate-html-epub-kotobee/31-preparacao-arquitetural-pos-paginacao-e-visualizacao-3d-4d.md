# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 31: Preparação Arquitetural Pós-Paginação e Diretrizes para Visualização 2.5D/3D/4D

**Autor:** Antigravity (Arquiteto de Software e Consultor de UX)  
**Status:** ✅ APROVADO (Fase de Planejamento e Governança)  
**Data:** 2026-06-20  

---

### 1. Diagnóstico Arquitetural Atual
O web-book EcoSabon cresceu em complexidade mantendo a robustez técnica e sem dependências externas. Entretanto, a arquitetura de arquivos começa a concentrar excessivas responsabilidades em pontos únicos:

*   `interactions.js`: Atua como repositório único de toda a lógica dinâmica, incluindo:
    *   Rolagem suave (`scrollToSection`, `scrollToTop`);
    *   Toggles de conteúdo ("Plano B", "Dicas", "Erros Comuns");
    *   Checklist Go/No-Go;
    *   Sidebar (estados ativos e navegação);
    *   Visualizador do mapa rotativo de estações;
    *   Hotspots acessíveis e painéis descritivos;
    *   Paginação por módulo (`activateModule`, `initModulePagination`, `activateModuleFromHash`).
*   `app.js`: Responsável por toda a ordem de bootstrap e amarração de listeners de eventos.
*   `main.css`: Concentra o design system editorial e as estilizações visuais de todos os componentes de estações, hotspots e animações.

> [!WARNING]
> Introduzir a nova camada premium de **Visualização Molecular 2.5D/3D/4D** diretamente em `interactions.js` e `main.css` sem um plano de modularização causará alto acoplamento, dificultando a testabilidade unitária e elevando a complexidade de manutenção.

---

### 2. Risco Ciclomático
*   **Risco Atual:** **Moderado**. As funções de paginação e hotspots estão bem segmentadas, mas o arquivo de interações ultrapassa 400 linhas.
*   **Risco Futuro:** **Alto** (caso o estágio molecular seja adicionado sem segregação de arquivos).
*   **Funções Sensíveis Identificadas:**
    *   `activateModule()`: Responsável por coordenar classes ativas, ARIA, histórico do navegador, atualização de sidebar e rolagem. Não deve acumular novas responsabilidades.
    *   `initModulePagination()`: Coordenador de listeners do histórico (`popstate` e `hashchange`).
    *   `initSaponificationHotspots()`: Inicializador de listeners do infográfico. Não deve ser transformado em controlador de animações de moléculas.

---

### 3. Regras e Limites de Complexidade para Próximas Etapas
Para manter o projeto auditável, limpo e em conformidade com o mestrado profissional:

1.  **Limites Ciclomáticos:**
    *   Nenhuma nova função criada pode ter complexidade ciclomática estimada superior a **7** (máximo de 7 caminhos lógicos ou decisões independentes).
    *   Nenhuma função existente pode ser modificada de modo a ultrapassar complexidade **10** sem justificativa formal documentada.
2.  **Separação de Módulos (Visualização Molecular):**
    *   Toda a lógica futura de modelagem tridimensional didática (SVG 2.5D ou animações de reação) deve residir em um arquivo próprio isolado, ex: `molecular-stage.js`.
    *   Esta camada molecular deve ser opcional, degradável de forma graciosa e estritamente qualitativa.
3.  **Proibição de Simulação (C4/3E):**
    *   Permanência do bloqueio total de simulações quantitativas reativas (pH, temperatura, rendimento).
    *   O recurso deve ser exclusivamente focado em animação e modelagem didática qualitativa espacial da reação de saponificação.

---

### 4. Arquitetura Modular Recomendada (Para PR Futuro)
Antes de iniciar a codificação do Palco Molecular 2.5D, recomenda-se realizar uma modularização estruturada dos scripts:

```text
src/scripts/
├── app.js                          # Bootstrap e orquestração central
├── interactions.js                 # Re-exports das funções para retrocompatibilidade
├── navigation.js                   # Lógicas de paginação, sidebar e histórico (popstate)
├── hotspots.js                     # Hotspots do infográfico e painéis explicativos
├── station-map.js                  # Lógicas de visualização de estações e rotação
├── reveal.js                       # Toggles de blocos ("Plano B", dica de mediação)
├── checklist.js                    # Validação do checklist Go/No-Go
├── scroll.js                       # Rolagem e scroll-observer legado
└── molecular-stage.js              # [Futuro] Palco Molecular 2.5D / Animação 4D didática
```

---

### 5. Esclarecimento Sobre "Animação 4D"
O conceito "4D" nesta proposta refere-se unicamente à **dimensão temporal da reação química qualitativa** (uma linha do tempo ou animação sequencial por etapas que ilustra reagentes se aproximando, clivagem simbólica e formação de sabão/glicerol). **Não descreve, de forma alguma, simulações físicas tridimensionais quantitativas**, cálculos matemáticos reativos ou coleta de telemetria.

---

### 6. Plano de Ação Recomendado
1.  **PR 1 (Atual):** Concluir a homologação da paginação por módulo robusta, saneando a governança documental.
2.  **PR 2 (Subsequente):** Executar a modularização leve de arquivos JavaScript sem alterar comportamento.
3.  **PR 3 (Futuro):** Planejar, propor e aprovar o *Molecular Stage 2.5D* autoral nas novas dependências modulares seguras.
