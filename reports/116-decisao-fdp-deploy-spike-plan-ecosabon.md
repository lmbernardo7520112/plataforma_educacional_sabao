# R116 — Decisão: Plano Operacional para Spike de Deploy da Plataforma EcoSabon

## 1. Decisão Executiva
Aprovamos formalmente o Plano Operacional de Deploy (R114) e o correspondente Checklist de Execução (R115) para orientar o futuro spike experimental da Plataforma EcoSabon. Esta fase limitou-se estritamente ao planejamento e à documentação, sem criar qualquer infraestrutura real ou alterar o código de produção.

## 2. Pré-Condições Obrigatórias para a Execução Futura
O início da próxima fase de implantação real (`FDP-DEPLOY-SPIKE`) fica condicionado ao cumprimento dos seguintes requisitos:
1. **Isolamento de Dados**: Utilização exclusiva dos dados mock de turmas e alunos contidos em `turmas_alunos.json`. Nenhuma informação de estudantes reais pode ser inserida no banco Atlas.
2. **Dashboard de Segredos**: As chaves privadas (`JWT_SECRET` e `DATABASE_URL`) devem ser configuradas diretamente nos painéis administrativos do Render e Atlas, impedindo qualquer exposição estática em código versionado.
3. **Comunicação Transparente**: O ambiente publicado na nuvem deve ser apresentado e rotulado estritamente como "Spike/Demonstração Pedagógica Temporária".

## 3. Riscos Residuais Aceitos
- O tempo de carregamento da primeira chamada de API (cold start de ~60 segundos no Render) é aceito pelo fato de ser um ambiente de demonstração técnica e custo zero.
- A natureza efêmera do armazenamento do Render (que resulta na perda dos uploads de imagens salvos localmente) é aceita.

## 4. Decisão Formal

`DECISÃO: GO CONDICIONAL PARA FDP-DEPLOY-SPIKE EM FASE SEPARADA. ESTA FASE APENAS PLANEJOU A EXECUÇÃO. NENHUM SERVIÇO EXTERNO FOI CRIADO, NENHUM BANCO FOI MIGRADO E NENHUM DEPLOY DA PLATAFORMA FOI EXECUTADO.`
