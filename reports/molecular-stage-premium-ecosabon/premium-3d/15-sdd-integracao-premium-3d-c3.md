# Documento de Especificação de Design de Software (SDD) — Integração Premium 3D (Fase C3)

Este documento especifica o design da integração controlada do visualizador tridimensional real (baseado em Three.js) ao e-book **EcoSabon**.

---

## 1. Objetivo da Integração
Integrar o visualizador Premium 3D real rotacionável (desenvolvido e endurecido nas fases C0-C2) ao e-book principal do EcoSabon como uma camada complementar e opcional. A integração visa enriquecer a percepção espacial da reação de saponificação, mantendo a estabilidade absoluta, o funcionamento offline e os recursos de acessibilidade e impressão já estabelecidos na baseline B1+B2.

## 2. Posicionamento no E-book
A seção Premium 3D será inserida dentro do **Módulo 2 (Estação 2: Reator de Saponificação / Palco Molecular)**, imediatamente abaixo da seção de visualização estática e stepper qualitativo (B1+B2).
*   **Título:** `Experiência Premium 3D — visualização molecular didática`
*   **Identificador HTML:** `.premium-3d-stage`

## 3. Comportamento e Modularidade Técnica
*   **Arquitetura Isolada:** A lógica de renderização WebGL e manipulação de câmera Three.js será contida no novo arquivo `ebook-ecosabon-prototipo/src/scripts/premium-3d-stage.js`.
*   **Carregamento Condicional:** A inicialização ocorrerá apenas se o contêiner `#premium-3d-canvas-container` estiver presente no DOM.
*   **Sem CDNs ou Rede:** Toda a biblioteca `three` será empacotada localmente a partir de `node_modules` no bundle final via Vite. Não haverá nenhuma requisição a servidores remotos ou CDNs.
*   **Modelo Procedural Autoral:** Nenhuma geometria externa (`.glb`, `.gltf`, `.obj`) será importada. As moléculas serão geradas em tempo de execução usando primitivas de `SphereGeometry` e `CylinderGeometry` com materiais sem sombras dinâmicas complexas, mantendo a performance ideal a 60 FPS.

## 4. Salvaguardas de Acessibilidade
*   **Foco por Teclado:** O container 3D será focável (`tabindex="0"`, `role="region"`) e permitirá que o usuário gire a câmera e altere o zoom via setas direcionais e teclas `+`/`-`.
*   **Leitor de Tela Semântico:** As mudanças de câmera e zoom serão anunciadas de forma textual por uma região `aria-live="polite"`. O canvas WebGL conterá `aria-hidden="true"`, delegando a compreensão didática ao painel de descrição detalhada e legendas estáticas associadas.

## 5. WebGL Fallback e Impressão
*   **Detecção de GPU:** Em caso de ausência ou bloqueio de WebGL, o contêiner 3D ocultará a tela de renderização e exibirá um card de aviso elegante. A página e o e-book não serão quebrados, permitindo o uso regular das descrições equivalentes.
*   **CSS de Impressão:** Sob `@media print`, todos os elementos interativos e o Canvas WebGL serão ocultados. Um bloco estático contendo explicações das quatro perspectivas principais de visualização da reação química (Frontal, Lateral, Superior e Perspectiva) será impresso de maneira linear.

## 6. Governança e Limitações Científicas
*   **Isenção Qualitativa:** Exibição mandatória na interface do aviso: 
    *   *“Esta é uma visualização tridimensional didática e qualitativa. Não representa simulação molecular validada, cálculo químico ou previsão real da reação.”*
*   **Bloqueio de Parâmetros Proibidos:** Fica proibida qualquer representação quantitativa, sliders de temperatura/pH ou persistência local via `localStorage`/`sessionStorage`.
*   **Ausência de Precificação:** O Premium 3D não será precificado ou categorizado como pacote finalizado nesta etapa de integração experimental controlada.

---
*Especificação de design homologada sob a governança da Fase C3 do EcoSabon.*
