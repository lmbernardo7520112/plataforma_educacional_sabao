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
DECISÃO: PILOTO CONTROLADO HOMOLOGADO COM VALIDAÇÃO HUMANA ASSISTIDA. PROFESSOR AUTORIZADO ACESSOU A ÁREA DOCENTE, CRIOU BANCADA, PARTICIPANTE ENTROU POR CÓDIGO, PROGRESSO FOI PERSISTIDO APENAS NO ESCOPO DA BANCADA, UPLOADS PERMANECERAM BLOQUEADOS E PAYLOAD PÚBLICO CONTINUOU MÍNIMO. QR CODE AINDA DEPENDE DE AUTORIZAÇÃO HUMANA ESPECÍFICA.
```

## 3. Justificativa da Decisão

A homologação online foi concluída após a resolução de dois impasses de produção:
1. **Edição do Onboarding:** Resolvido o bug de permissão de escrita e o layout de clipping visual no formulário de edição de bancadas no Onboarding. O professor e alunos agora conseguem selecionar os integrantes da turma e salvar as alterações.
2. **Autenticação Docente (Allowlist):** O e-mail da professora Nadja foi cadastrado com sucesso na produção via endpoint seguro de reitoria, validando o isolamento do controle de acessos da allowlist.

Os testes de fumaça e intrusão anônima confirmaram a eficácia de 100% dos bloqueios de visitantes comuns no banco de dados e nos uploads.

## 4. Próximas Ações Recomendadas

1. **Janela de Uso Controlado (`FDP-RESTRICTED-PILOT-VALIDATION-WINDOW`):** Iniciar o uso restrito piloto com a turma real de alunos e professores, observando o comportamento em tempo real.
2. **Liberação de QR Code:** O QR Code de onboarding e o link de divulgação ampla podem ser gerados e liberados apenas após a primeira aula piloto assistida de validação de campo.

---

_Relatório de decisão atualizado e homologado em 2026-07-01._
