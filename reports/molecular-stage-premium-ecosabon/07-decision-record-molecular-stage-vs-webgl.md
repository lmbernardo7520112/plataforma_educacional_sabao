# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 07: Registro de Decisão Arquitetural (ADR) — SVG/CSS vs. WebGL/Three.js

### 1. Contexto Técnico
O desenvolvimento de visualizações moleculares interativas na web geralmente adota um dos dois caminhos principais:
1. **Motores Gráficos 3D Pesados (WebGL, Three.js, Unity, Sketchfab):** Permitem a exibição de modelos tridimensionais rotativos complexos com iluminação e física de colisão em tempo real.
2. **Gráficos Vetoriais 2D Estáticos/Animados (SVG, CSS3, JS Vanilla):** Permitem renderizações bidimensionais ou representações tridimensionais simuladas (2.5D) leves, com controle direto de marcação DOM e acessibilidade nativa.

---

### 2. Decisão Adotada

> [!IMPORTANT]
> **Decisão de Arquitetura:**  
> Fica determinado a **rejeição** de qualquer framework 3D pesado (WebGL, Three.js, Unity, Sketchfab) e a **adoção exclusiva de gráficos vetoriais SVG manipulados via CSS3 e JavaScript Vanilla** para a futura camada Molecular Stage.

---

### 3. Justificativa da Decisão

#### **1. Portabilidade e Infraestrutura Escolar (Mestrado Profissional):**
O EcoSabon é projetado para atuar como um recurso didático de ampla distribuição em escolas brasileiras. A maioria dos computadores de laboratórios de informática escolar e dispositivos móveis de estudantes da rede pública possui hardware modesto e navegadores desatualizados. 
* O uso de WebGL/3D exigiria processamento gráfico elevado (GPU), resultando em travamentos e alto consumo de bateria.
* O uso de SVG/CSS garante execução fluida a 60 FPS estáveis mesmo em dispositivos obsoletos.

#### **2. Limitação de Tamanho de Pacote (ZIP Offline):**
Uma das metas principais do projeto é manter a distribuição offline viável através de e-mails ou mídias removíveis leves.
* Adicionar o Three.js ou motores equivalentes aumentaria o tamanho do ZIP de 31 KiB para vários megabytes.
* A solução SVG/CSS/JS consome menos de 10 KiB adicionais de código.

#### **3. Acessibilidade Nativa (WCAG):**
Os elementos renderizados dentro do WebGL (Canvas) são invisíveis para leitores de tela e não possuem suporte a foco do teclado nativo.
* A marcação SVG permite indexar atributos `aria-label`, estruturar tags de acessibilidade internas e gerenciar o foco visual direto de botões por teclado nativo.

#### **4. Linearização e Impressão:**
Visualizações 3D em Canvas não possuem tradução direta para folhas de estilo de impressão (@media print), resultando em telas pretas ou em branco na versão física do e-book.
* A marcação SVG é linearizada nativamente por CSS, permitindo a separação automática dos estados visuais da reação na versão física de conferência em PDF.

---

### 4. Consequências da Decisão
* **Consequências Positivas:** Manutenção da portabilidade offline, 100% de acessibilidade por teclado/leitores de tela, folha de estilos de impressão robusta, tamanho de pacote minimalista e sem dependências no `package.json`.
* **Consequências Negativas:** A representação molecular será qualitativa bidimensional ou pseudo-3D estática (perspectiva flat 2.5D), sem rotação livre da molécula em eixos X, Y e Z pelo usuário. Esta limitação é considerada aceitável e pedagogicamente recomendada para manter o foco cognitivo no processo de reação química de saponificação.
