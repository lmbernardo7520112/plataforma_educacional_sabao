# Matriz Técnica — Premium 3D Rotacionável

Este documento analisa 9 alternativas tecnológicas sob a perspectiva de viabilidade técnica, pedagógica, de acessibilidade, peso, dependências e licenciamento para a visualização molecular rotacionável do **EcoSabon**.

---

## Análise Comparativa das Alternativas

### 1. SVG/CSS 2.5D Avançado
*   **Fidelidade Visual:** Média. Simula tridimensionalidade por sobreposição e perspectiva.
*   **Rotação Real:** Falsa (falsa profundidade e distorção programada).
*   **Peso do Pacote:** Extremamente leve (~kb adicionais).
*   **Funcionamento Offline:** 100% autônomo.
*   **Acessibilidade:** Alta (preserva estrutura vetorial manipulável pelo leitor de tela).
*   **Impressão:** Perfeita (mídia print renderiza o SVG nativo).
*   **Dependências:** Nenhuma.
*   **Manutenção:** Média (exige habilidades matemáticas e de CSS avançado).
*   **Curva de Aprendizado:** Média-alta (criação e controle manual das projeções).
*   **Licenciamento:** Livre (autoria total).
*   **Risco de Lock-in:** Nulo.
*   **Compatibilidade Escolar:** Alta (funciona em qualquer navegador de escola pública).
*   **Risco de Parecer Simulação:** Baixo (claramente ilustrativo).
*   **Maturidade para Produto:** Média-alta.

### 2. Sequência Pré-Renderizada Multiângulo
*   **Fidelidade Visual:** Alta (imagens renderizadas em software 3D externo).
*   **Rotação Real:** Falsa (simulação discreta por frames, ex.: 8 a 16 ângulos).
*   **Peso do Pacote:** Baixo-médio (depende da quantidade e compressão WebP/SVG das imagens).
*   **Funcionamento Offline:** 100% autônomo.
*   **Acessibilidade:** Alta (descrição textual associada a cada frame/ângulo).
*   **Impressão:** Perfeita (a folha imprime o frame atual ou o fallback linear didático).
*   **Dependências:** Nenhuma.
*   **Manutenção:** Baixa.
*   **Curva de Aprendizado:** Muito baixa (apenas manipulação de caminhos de imagem por botões).
*   **Licenciamento:** Livre (gerado de modelo autoral do desenvolvedor).
*   **Risco de Lock-in:** Nulo.
*   **Compatibilidade Escolar:** Alta.
*   **Risco de Parecer Simulação:** Baixo (modelo puramente demonstrativo estático).
*   **Maturidade para Produto:** Altíssima (muito estável e seguro).

### 3. Sprites/Frames Rotacionáveis (Spritesheet)
*   **Fidelidade Visual:** Alta.
*   **Rotação Real:** Falsa (interação discreta guiada por mouse/teclado para troca de frame).
*   **Peso do Pacote:** Médio (carregamento de um único arquivo de imagem contendo a matriz de frames).
*   **Funcionamento Offline:** 100% autônomo.
*   **Acessibilidade:** Alta (suporta `aria-valuenow` descrevendo o ângulo ativo).
*   **Impressão:** Média-Alta (imprime o sprite atual ou fallback).
*   **Dependências:** Nenhuma.
*   **Manutenção:** Baixa.
*   **Curva de Aprendizado:** Baixa (manipulação simples do `background-position`).
*   **Licenciamento:** Livre (autoral).
*   **Risco de Lock-in:** Nulo.
*   **Compatibilidade Escolar:** Alta.
*   **Risco de Parecer Simulação:** Baixo.
*   **Maturidade para Produto:** Altíssima.

### 4. `<model-viewer>` (Google)
*   **Fidelidade Visual:** Altíssima (renderização baseada em física - PBR).
*   **Rotação Real:** Sim (3D interativo livre).
*   **Peso do Pacote:** Muito Alto (biblioteca JS ~200kb gzipped + modelo glTF/glb ~500kb a 2MB).
*   **Funcionamento Offline:** Parcial (pode requerer acesso a CDN ou carregamento local pesado).
*   **Acessibilidade:** Média (possui leitor de tela nativo básico, mas difícil personalização didática).
*   **Impressão:** Ruim (renderiza apenas canvas vazio no papel se não configurado com capturas estáticas extras).
*   **Dependências:** Alta (depende do web component e do glTF).
*   **Manutenção:** Média (exige exportação correta de glTF e atualizações da biblioteca).
*   **Curva de Aprendizado:** Média.
*   **Licenciamento:** Apache 2.0 (livre, mas o modelo 3D precisa ser autoral).
*   **Risco de Lock-in:** Baixo.
*   **Compatibilidade Escolar:** Média (falha em computadores escolares antigos sem WebGL ativo).
*   **Risco de Parecer Simulação:** Médio-alto (interatividade fluida induz a achar que é simulação química real).
*   **Maturidade para Produto:** Alta.

### 5. Three.js
*   **Fidelidade Visual:** Altíssima.
*   **Rotação Real:** Sim.
*   **Peso do Pacote:** Crítico (biblioteca Three.js gzipped ~160kb + modelo 3D + código de órbita).
*   **Funcionamento Offline:** Sim, mas o carregamento inicial é lento.
*   **Acessibilidade:** Ruim (elementos internos ao Canvas são invisíveis para a árvore de acessibilidade do DOM).
*   **Impressão:** Ruim (Canvas WebGL comumente imprime preto/vazio).
*   **Dependências:** Altíssima (acopla o projeto a um ecossistema complexo de dependências).
*   **Manutenção:** Muito Alta (quebras de versão comuns na Three.js).
*   **Curva de Aprendizado:** Altíssima.
*   **Licenciamento:** MIT (livre, mas os modelos 3D devem ser autorais).
*   **Risco de Lock-in:** Alto (acoplamento de renderização).
*   **Compatibilidade Escolar:** Baixa-média.
*   **Risco de Parecer Simulação:** Alto.
*   **Maturidade para Produto:** Média-baixa para o contexto escolar.

### 6. Unity WebGL
*   **Fidelidade Visual:** Altíssima.
*   **Rotação Real:** Sim.
*   **Peso do Pacote:** Proibitivo (frequentemente > 15MB, carregamento demorado e uso de memória crítico).
*   **Funcionamento Offline:** Péssimo (inviável para e-books offline embarcados).
*   **Acessibilidade:** Inexistente.
*   **Impressão:** Nula.
*   **Dependências:** Crítico.
*   **Manutenção:** Crítico.
*   **Curva de Aprendizado:** Crítico (exige conhecimento de motor de jogos C#).
*   **Licenciamento:** Proprietário/Restritivo.
*   **Risco de Lock-in:** Crítico.
*   **Compatibilidade Escolar:** Nula (falha na maioria dos navegadores de escolas públicas).
*   **Risco de Parecer Simulação:** Muito Alto.
*   **Maturidade para Produto:** Inadequada.

### 7. Sketchfab / Embed Externo
*   **Fidelidade Visual:** Altíssima.
*   **Rotação Real:** Sim.
*   **Peso do Pacote:** Baixo para o e-book, mas alto no tráfego (iframe).
*   **Funcionamento Offline:** Nulo (requer internet permanente para carregar o iframe).
*   **Acessibilidade:** Ruim (controles externos sem foco e sem leitura de tela customizada).
*   **Impressão:** Nula.
*   **Dependências:** Altíssima (depende de plataforma de terceiros ativa).
*   **Manutenção:** Crítica (risco de link quebrado ou remoção do modelo).
*   **Curva de Aprendizado:** Baixa (apenas embed).
*   **Licenciamento:** Restritivo (termos de uso do Sketchfab e do autor do modelo).
*   **Risco de Lock-in:** Crítico.
*   **Compatibilidade Escolar:** Baixa (bloqueado por firewalls escolares frequentemente).
*   **Risco de Parecer Simulação:** Alto.
*   **Maturidade para Produto:** Inadequada (dependência externa).

### 8. Modelo 3D Autoral Exportado
*   **Fidelidade Visual:** Controlada pelo desenvolvedor (Blender).
*   **Rotação Real:** Depende do player (Three.js, `<model-viewer>`).
*   **Peso do Pacote:** Médio (criação de malhas otimizadas com poucos polígonos).
*   **Funcionamento Offline:** Sim.
*   **Acessibilidade:** Depende do player.
*   **Impressão:** Depende do player.
*   **Dependências:** Médio-alto.
*   **Manutenção:** Média.
*   **Curva de Aprendizado:** Alta.
*   **Licenciamento:** Livre (autoria total).
*   **Risco de Lock-in:** Médio.
*   **Compatibilidade Escolar:** Depende do player.
*   **Risco de Parecer Simulação:** Controlado no design.
*   **Maturidade para Produto:** Média.

### 9. Solução Híbrida (3D Externo para Geração de Imagens + Uso Offline em Frames)
*   **Fidelidade Visual:** Altíssima (imagens de alta fidelidade geradas previamente no Blender/Maya).
*   **Rotação Real:** Falsa (rotação por troca discreta de frames 2D).
*   **Peso do Pacote:** Baixo (imagens WebP comprimidas de forma ideal).
*   **Funcionamento Offline:** 100% autônomo.
*   **Acessibilidade:** Excelente (texto equivalente nativo associado a cada frame).
*   **Impressão:** Excelente (CSS imprime a imagem estática de fallback e o texto).
*   **Dependências:** Nenhuma.
*   **Manutenção:** Muito Baixa.
*   **Curva de Aprendizado:** Muito Baixa para a engenharia web.
*   **Licenciamento:** Livre (gerado de modelos autorais).
*   **Risco de Lock-in:** Nulo.
*   **Compatibilidade Escolar:** Máxima.
*   **Risco de Parecer Simulação:** Baixo (claramente rotulado como representação visual didática qualitativa).
*   **Maturidade para Produto:** Altíssima.

---
*Análise técnica concluída para embasamento do ADR.*
