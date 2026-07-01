# R203 — Decisão da Validação Humana do Piloto Controlado — EcoSabon

## 1. Conclusões da Validação Assistida

Após o deploy das flags de segurança e a execução das tarefas de navegação assistida em produção, os seguintes resultados foram consolidados:

1. **Visitante Anônimo:** Totalmente seguro. Tentativas de escrita (criação de bancadas, envio de respostas e uploads) são rejeitadas com **HTTP 423** (`PILOT_READONLY`).
2. **Dashboard do Professor:** Mapeado e operacional em `/professor` na Vercel. O login do professor Leonardo foi bem-sucedido e a bancada de teste `Bancada Homologacao Piloto` foi criada na turma `3ºANO A`.
3. **Criptografia de Códigos:** O backend está gerando códigos alfanuméricos de 8 caracteres e persistindo apenas o hash SHA-256 no MongoDB Atlas.
4. **Onboarding Público:** Endurecido de forma estrita. Não exibe nomes de estudantes (`members` ou `students`), retornando unicamente o `memberCount` numérico para a interface.
5. **Mobile Responsiveness:** A navbar mobilehamburger está validada e funcional em viewports de 375px a 414px de largura.
6. **Upload Bloqueado:** O frontend está configurado para omitir o passo de captura de fotos e enviar o progresso pedagógico de forma textual, contornando o bloqueio de uploads do Render sem quebrar a experiência do aluno.

## 2. Decisão Consolidada

```
DECISÃO: PILOTO CONTROLADO AINDA NÃO HOMOLOGADO COMPLETAMENTE. A VALIDAÇÃO HUMANA ASSISTIDA IDENTIFICOU PENDÊNCIAS EM LOGIN DO PARTICIPANTE POR CÓDIGO E TESTE DE PERSISTÊNCIA ONLINE. QR CODE E DIVULGAÇÃO SEGUEM BLOQUEADOS.
```

## 3. Justificativa da Decisão

A homologação online do participante por código de acesso não pôde ser completada devido ao encerramento da sessão de navegação do subagent. Isso impediu a leitura do código de acesso ativo (`<ACCESS_CODE_REAL>`) de dentro do painel do professor para a realização do login do aluno no mesmo ciclo.

Para garantir que o fluxo de persistência de progresso esteja 100% livre de bugs em produção, o login com o código da bancada e a submissão de uma missão teste na trilha online precisam ser testados em conjunto com os professores reais Leonardo e Nadja.

## 4. Próximas Ações Recomendadas

1. **Ativar a Janela de Validação (`FDP-RESTRICTED-PILOT-VALIDATION-WINDOW`):** Disponibilizar o link da plataforma para os professores Leonardo e Nadja realizarem o teste prático de criação e acesso a bancadas no ambiente de produção.
2. **Remover o Bloqueio de Divulgação (Pós-Validação):** Assim que os professores confirmarem o sucesso dos testes online de estudante com código, a homologação humana será declarada completa e o QR Code de onboarding poderá ser gerado.

---

_Relatório de decisão registrado em 2026-07-01._
