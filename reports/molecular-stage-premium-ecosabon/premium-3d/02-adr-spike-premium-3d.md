# Registro de Decisão de Arquitetura (ADR) — Estudo do Premium 3D Rotacionável

*   **Status:** Superado (Redirecionado para Spike 3D Real no ADR-06)
*   **Data:** 2026-06-21

---

## 1. Contexto
Com a homologação da Fase B1+B2, o Palco Molecular possui uma visualização pedagógica e sequenciada por etapas qualitativas. Investigamos inicialmente a viabilidade de uma visualização baseada em trocas de perspectivas de SVG (pseudo-3D/falso 3D).

## 2. Problema
O pseudo-3D baseado em SVG multiângulo discreto atua muito bem como **fallback leve**, mas não atende à ambição comercial e pedagógica de uma visualização tridimensional real com rotação livre e controle de órbita do usuário.

## 3. Opções Avaliadas
*   **Opção A:** Rotação qualitativa discreta multiângulo utilizando SVG/CSS (classificado agora como **fallback leve**).
*   **Opção B:** Rotação 3D real com câmera e órbita livre utilizando motor WebGL (Three.js procedural autoral).

## 4. Decisão de Redirecionamento
Fica estabelecido que a Opção A (pseudo-3D multiângulo anterior) é considerada um **fallback leve** e não a versão Premium 3D real. Decidiu-se redirecionar a Fase C0 para testar um spike experimental de 3D real rotacionável utilizando **Three.js procedural autoral**, isolado na pasta `experiments/premium-3d-real-rotatable-spike/`.

## 5. Justificativa
A criação de um visualizador 3D real procedural isolado permite avaliar com exatidão o peso do pacote, a compatibilidade escolar, a acessibilidade e as limitações de renderização sem depender de recursos externos pesados ou licenças de terceiros.

---
*Documento histórico atualizado para refletir o redirecionamento estratégico.*
