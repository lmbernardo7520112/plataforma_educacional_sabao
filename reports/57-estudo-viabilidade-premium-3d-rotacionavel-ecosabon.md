# Relatório Integrador — Estudo de Viabilidade do Premium 3D Rotacionável

Este relatório reúne as conclusões do estudo técnico de viabilidade e da Prova de Conceito (Spike) da versão Premium 3D rotacionável do Molecular Stage do **EcoSabon**.

---

## 1. Resumo Executivo
Na Fase C0, investigou-se a viabilidade técnica, pedagógica e comercial de uma futura visualização molecular tridimensional real e rotacionável para o Palco Molecular. As alternativas tecnológicas foram avaliadas sob os critérios de suporte offline, acessibilidade e compatibilidade em ambientes escolares.

---

## 2. Prova Técnica Real 3D (Spike)
*   **Implementação Isolada:** Desenvolveu-se um spike técnico de 3D real com câmera e órbita livre utilizando **Three.js procedural autoral** (versão `^0.160.0`), localizado na pasta [experiments/premium-3d-real-rotatable-spike/](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/experiments/premium-3d-real-rotatable-spike/).
*   **Pseudo-3D anterior:** A prova de conceito vetorial anterior baseada em SVG/CSS é classificada como **fallback leve**, ideal para dispositivos de baixo desempenho.
*   **Governança:** A dependência `three` está restrita localmente à pasta experimental, não tendo sido integrada ao produto principal ou ao build de produção.

---

## 3. Deliberação e Recomendações
*   **Produto Principal Intocado:** Nenhuma linha de código, estilo ou teste do e-book principal do EcoSabon foi alterada.
*   **B1+B2 Preservadas:** A visualização qualitativa por etapas (Fase B1+B2) continua ativa no e-book principal como baseline estável e homologado.
*   **Premium 3D Real Não Integrado:** A visualização 3D real não foi integrada ao e-book, permanecendo como ativo isolado de demonstração comercial de portfólio.
*   **Bloqueio de Precificação:** A precificação da camada Premium 3D continua suspensa e bloqueada nesta etapa.
*   **Próxima Decisão:** A próxima decisão do projeto deve ser estritamente de caráter técnico (auditoria de dispositivos escolares antigos e acessibilidade WCAG) e pedagógico, não devendo iniciar precificação até a validação do produto demonstrável no e-book.

---
*Relatório integrador estratégico homologado sob a governança da Fase C0.*
