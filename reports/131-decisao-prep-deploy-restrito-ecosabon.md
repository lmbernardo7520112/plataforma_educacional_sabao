# R131 — Decisão: Preparação do Deploy Restrito

## 1. Decisão Executiva
Aprovamos a homologação do planejamento operacional e de segurança para o deploy restrito da Plataforma EcoSabon. As premissas arquiteturais, os mapas de variáveis de ambiente de nuvem e as rotinas de mitigação de riscos foram desenhados em conformidade com as restrições estritas do projeto.

## 2. Status do GO/NO-GO
- **GO (Preparação Operacional)**: Aprovado para consolidar os planos de deploy.
- **NO-GO (Execução Imediata)**: Fica **proibido** qualquer deploy de código ou criação de recursos reais externos nesta fase documental de planejamento.

## 3. Pré-Condições para Execução Futura
O avanço para a fase de deploy real na nuvem está condicionado a:
1. Recebimento dos e-mails reais de Leonardo e Nadja apenas em tempo de execução no Render (nunca commitados).
2. Validação da suite completa de testes contendo 238 testes bem-sucedidos em branch limpa.
3. Autorização formal do cliente para criação e provisionamento das contas de nuvem gratuitas (Vercel, Render, MongoDB Atlas).

## 4. Bloqueios e Restrições de Governança Mantidos
- ❌ Proibido criar clusters, serviços web ou projetos em nuvem nesta fase.
- ❌ Proibido o hardcode de credenciais ou e-mails reais.
- ❌ Proibido versionar arquivos `.env` com valores reais.
- ❌ Nenhuma alteração no código técnico da plataforma ou do e-book é permitida nesta branch.

## 5. Decisão Final

`DECISÃO: PREPARAÇÃO DO DEPLOY RESTRITO CONCLUÍDA. VARIÁVEIS, SECRETS, IDENTIDADES AUTORIZADAS, ATLAS, RENDER, VERCEL, CORS, JWT, SEED SINTÉTICO E ROLLBACK FORAM PLANEJADOS. NENHUM DEPLOY EXECUTADO. NENHUM SERVIÇO EXTERNO CRIADO. GO APENAS PARA FASE FUTURA DE EXECUÇÃO ASSISTIDA, COM AUTORIZAÇÃO EXPLÍCITA.`
