# Análise de Projeção Realista Pós-Integração — Premium 3D (Fase C3)

Este documento especifica a projeção técnica e a análise preditiva sobre a compatibilidade e o uso do visualizador tridimensional em cenários de uso real no contexto escolar brasileiro.

---

## 1. Distinção Crucial: Validação Real vs. Projeção Técnica
*   **Atenção:** As conclusões apresentadas aqui são **projeções técnicas estimadas** com base em testes unitários e de simulação local. Nenhuma validação em computadores escolares reais, com leitores de tela reais de usuários finais, ou testes pedagógicos em sala de aula foram efetuados até o momento.

## 2. Tabela de Cenários de Compatibilidade e Performance

| Dispositivo / Cenário | Nível de Risco | Funcionamento Estimado | Ação de Mitigação / Fallback |
| :--- | :--- | :--- | :--- |
| **Notebook Moderno com GPU ativa** | Baixo | Alta probabilidade de renderização a 60 FPS com órbita mouse e teclado fluida. | Nenhuma ação corretiva imediata necessária. |
| **Computador Escolar Antigo (GPU fraca)** | Médio / Alto | Risco de baixo FPS, travamentos na renderização tridimensional ou aquecimento do hardware. | O usuário poderá ler a descrição textual equivalente; a cena Three.js usa geometrias de baixa contagem de polígonos para mitigar. |
| **Computador com WebGL Desativado/Bloqueado**| Alto | O canvas 3D não será renderizado de forma alguma. | O script detecta a ausência de contexto WebGL e exibe automaticamente o card de fallback de erro, sem travar a navegação. |
| **Celular Android Intermediário** | Médio | Provável carregamento correto no Chrome Mobile, porém com risco de consumo acelerado de bateria. | A largura do contêiner é responsiva e a altura é reajustada para 300px via media queries. |
| **Leitores de Tela (NVDA / JAWS / TalkBack)** | Alto | O canvas WebGL em si é invisível semântica e estruturalmente para leitores de tela. | O contêiner possui `aria-hidden="true"` para o canvas. Toda a interação de foco por teclado aciona mensagens na div `aria-live="polite"` e a descrição textual permanece visível. |
| **Impressão em Papel ou PDF** | Baixo | Mídia impressa não suporta animações ou canvas WebGL interativo. | O CSS de impressão (`print.css`) oculta o visualizador e os controles, imprimindo apenas o disclaimer de isenção e as legendas de átomos e moléculas. |

## 3. Nível de Confiança da Previsão
*   **Confiança Média-Alta:** A lógica de fallback técnico e a acessibilidade por teclado foram cobertas por testes automatizados rigorosos na suíte Vitest, mas o desempenho em GPUs legadas (processadores Celeron antigos de escolas públicas) permanece com nível de confiança de predição baixo-médio até a realização de testes de campo.

## 4. O que Falta Testar no Futuro (Recomendações)
*   **Testes de Campo:** Rodar o e-book EcoSabon em computadores de laboratórios de informática escolares reais (sistemas operacionais antigos, computadores com pouca RAM).
*   **Auditoria de Acessibilidade Real:** Convidar usuários reais com deficiência visual para navegar pela seção usando leitores de tela nativos do sistema.
*   **Estudo de Distração Pedagógica:** Avaliar se a rotação 3D do modelo serve como facilitador cognitivo ou causa distração excessiva para alunos do ensino fundamental/médio.

## 5. Linguagem de Cautela
Sempre que o Premium 3D for apresentado a stakeholders ou relatórios de produto, deve-se adotar o termo **"Integração Experimental Controlada"** e jamais denominá-lo como "simulador validado" ou "solução finalizada homologada".
