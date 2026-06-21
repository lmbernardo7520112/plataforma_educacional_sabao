# Prova de Conceito (Spike) — Premium 3D Real Rotacionável com Three.js

Este diretório contém uma prova de conceito experimental isolada para testar a viabilidade de uma visualização didática rotacionável em 3D real para o Palco Molecular do **EcoSabon**.

---

## 1. Finalidade do Spike
Este experimento utiliza **Three.js procedural autoral** para construir uma representação tridimensional qualitativa da saponificação, oferecendo interação de órbita livre (drag com mouse), câmera orbital, reset de posições de visualização rápida e suporte a acessibilidade via descrição síncrona.

> [!WARNING]
> **Aviso Importante:** Esta é uma prova técnica isolada. Não está integrada ao e-book principal do EcoSabon. Não representa uma simulação científica real, cálculo químico ou modelo validado, tratando-se unicamente de uma representação demonstrativa didática.

---

## 2. Dependência Experimental
*   **Biblioteca:** `three` (versão `^0.160.0`)
*   **Declaração:** Declarada localmente no arquivo [package.json](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/experiments/premium-3d-real-rotatable-spike/package.json).
*   **Isolamento:** Esta dependência está restrita a este diretório experimental e não afeta o build ou dependências do e-book principal.

---

## 3. Como Executar
1.  Inicie o servidor de desenvolvimento local no diretório do experimento:
    ```bash
    npm run dev
    ```
2.  Acesse o link indicado no console (comumente `http://localhost:5173`) para interagir com o visualizador.
3.  Use o mouse (drag para girar, scroll para zoom) ou use os botões rápidos na tela para alternar perspectivas.
