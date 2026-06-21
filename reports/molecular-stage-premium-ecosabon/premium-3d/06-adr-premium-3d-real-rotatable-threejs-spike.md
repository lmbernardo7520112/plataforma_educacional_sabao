# Registro de Decisão de Arquitetura (ADR) — Spike Premium 3D com Three.js

*   **Status:** Aprovado (Spike Isolado)
*   **Data:** 2026-06-21

---

## 1. Contexto
Com o objetivo de testar a viabilidade de uma visualização didática Premium 3D rotacionável real e contínua do Palco Molecular, avaliamos motores de renderização web e técnicas de modelagem.

## 2. Decisão
Decidiu-se construir um spike técnico de 3D real rotacionável utilizando **Three.js procedural autoral** com Orbit Controls emulados de arrasto. O experimento foi alocado de forma isolada na pasta `experiments/premium-3d-real-rotatable-spike/` e não foi integrado ao e-book principal do EcoSabon.

## 3. Justificativa das Opções Tecnológicas

*   **Three.js Procedural Autoral (Escolhida):** Permite renderizar a reação molecular de forma fluida sem acoplar bibliotecas externas pesadas no build principal. A modelagem procedural com esferas e cilindros nativos elimina dependência de arquivos externos pesados de malha (como .fbx ou .obj) e riscos de direitos autorais.
*   **`<model-viewer>` (Adiado):** Embora robusto, depende de carregamento externo complexo e foi adiado devido a dificuldades de integração offline estrita e personalização didática síncrona.
*   **Unity WebGL (Rejeitado):** Incompatível com o requisito de peso leve e portabilidade (builds gerados ultrapassam 15MB e exigem alta capacidade de CPU/RAM).
*   **Sketchfab Embed (Rejeitado):** Rejeitado por depender 100% de internet ativa (Iframe), o que viola a portabilidade de uso em salas de aula offline.

## 4. Riscos Aceitos e Rejeitados
*   **Aceitos:** Peso de bundle extra (~462KB) somente se mantido isolado na pasta de experimentos.
*   **Rejeitados:** Queda de performance, Canvas preto na impressão e falhas de leitura de tela integradas ao e-book principal de produção.

## 5. Destino do Spike
*   **Como Portfólio:** O spike atual permanece como demonstração técnica comercial avançada.
*   **Integração Futura:** Qualquer integração no e-book principal de produção exigirá **Pull Request própria**, orçamento específico de engenharia de software 3D e homologação prévia de acessibilidade e compatibilidade offline.

---
*ADR concluído sob a governança da Fase C0.*
