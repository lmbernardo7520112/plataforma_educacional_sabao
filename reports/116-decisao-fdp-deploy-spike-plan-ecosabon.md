# R116 — Decisão: Plano Operacional para Piloto Restrito da Plataforma EcoSabon

## 1. Decisão Executiva
Aprovamos formalmente o Plano Operacional de Deploy para Piloto Restrito (R114) e o correspondente Checklist de Execução (R115) para orientar o futuro spike experimental da Plataforma EcoSabon. Esta fase limitou-se estritamente ao planejamento e à documentação, sem criar qualquer infraestrutura real ou alterar o código de produção.

## 2. Pré-Condições Obrigatórias para a Execução Futura
O início da próxima fase de implantação real (`FDP-DEPLOY-SPIKE`) fica condicionado ao cumprimento dos seguintes requisitos:
1. **Isolamento de Dados**: Utilização exclusiva dos dados mock das turmas de teste (`3ºA` e `3ºB`) com bancadas de 5 alunos. Nenhuma informação de estudantes reais pode ser inserida no banco Atlas.
2. **Controle de Acesso por Allowlist**: Desabilitar o auto cadastro público e limitar o login estritamente aos professores Leonardo e Nadja via variável de ambiente `PILOT_ALLOWED_TEACHER_EMAILS`.
3. **Cofre de Segredos**: As chaves privadas (`JWT_SECRET` e `DATABASE_URL`) devem ser configuradas diretamente nos painéis administrativos do Render e Atlas, impedindo qualquer exposição estática em código versionado.
4. **Comunicação Transparente**: O ambiente publicado na nuvem deve ser apresentado e rotulado estritamente como "Piloto Restrito e Controlado / Demonstração Pedagógica Temporária".

## 3. Riscos Residuais Aceitos
- O tempo de carregamento da primeira chamada de API (cold start de ~60 segundos no Render) é aceito pelo fato de ser um ambiente de demonstração técnica e custo zero.
- A natureza efêmera do armazenamento do Render (que resulta na perda dos uploads de imagens salvos localmente) é aceita.

## 4. Decisão Formal

`DECISÃO: GO CONDICIONAL PARA PLANEJAR UM PILOTO RESTRITO ONLINE DA PLATAFORMA ECOSABON. O DEPLOY FUTURO NÃO DEVE SER PÚBLICO, NEM SAAS, NEM ABERTO A CADASTROS. O ACESSO DEVE SER LIMITADO AOS PROFESSORES AUTORIZADOS LEONARDO E NADJA, COM TURMAS TESTE 3ºA E 3ºB E BANCADAS DE 5 ALUNOS. A EVOLUÇÃO PARA SAAS FICA RESERVADA A FASE POSTERIOR.`
