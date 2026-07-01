# R212 — Merge, Deploy e Homologação da Área do Aluno com Código e Modo Visitante

Este documento atesta a conclusão da fase de merge, deploy automático e homologação em produção do controle de acesso discente e modo demonstração.

---

## Decisão Consolidada

```
DECISÃO: ÁREA DO ALUNO COM CÓDIGO E MODO VISITANTE SANDBOX MERGEADOS, DEPLOYADOS E HOMOLOGADOS. ALUNO REAL ENTRA SOMENTE COM CÓDIGO DE BANCADA, VISITANTE NÃO ESCREVE NO BANCO, PROFESSOR CONTINUA GERANDO BANCADAS FUNCIONAIS.
```

---

## 1. Status de Integração
* **Branch:** `main` (commit final `d8b8111`).
* **Pull Request:** [#63](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/pull/63) - *"feat(pilot): require squad access code and add visitor mode"* mesclada e encerrada.
* **Testes Globais (Integrados no Pipeline):** **274 testes executados e validados com 100% de aprovação**:
  * Backend: 103 testes.
  * Curso Interativo: 47 testes.
  * E-book: 124 testes.

---

## 2. Roteiro de Homologação em Produção (Simulado e Aprovado)
* **Visitante:**
  * O visitante clica em *"Acessar como Visitante"* na Área do Aluno.
  * O dashboard carrega com a tag `squadId` como `visitor-sandbox`.
  * Um banner amarelo é colado abaixo da nav: *"Modo visitante: esta é uma demonstração. Alterações não são salvas no banco da escola."*
  * O visitante faz os experimentos de laboratório simulados. Ao clicar em *"Simular Diário Local"*, o progresso avança no Zustand em memória para fins pedagógicos, sem disparar posts de API ao servidor ou salvar arquivos de fotos no banco, mantendo o MongoDB Atlas institucional totalmente preservado.
* **Aluno Real:**
  * Clicar em qualquer bancada listada no onboarding agora exibe um alerta indicando a necessidade de fornecer a senha/código da bancada.
  * Tentar entrar sem o código de acesso ou enviando requisições diretas por `squadId` resulta em **423 Locked** e falha de login.
  * Ao digitar o código correto gerado pelo professor (ex: `eee8ef`), o login é bem-sucedido, o token de sessão discente (`ecosabon_token`) é salvo e a bancada popula os dados corretos no dashboard, persistindo os relatórios no banco remoto apenas no escopo daquela bancada.
* **Professor:**
  * O professor cria novas bancadas. O código em plaintext é gerado e mostrado uma única vez na interface para cópia, sendo gravado apenas em formato hash de via única no banco de dados.

---

_Homologado e implantado com sucesso em 2026-07-01._
