# R127 — Decisão: Validação do Sandbox do Piloto Restrito

## 1. Decisão Executiva
Aprovamos a homologação da simulação em sandbox local do modo piloto restrito da Plataforma EcoSabon. O comportamento das invariantes de allowlist, feature flags de modo piloto, bloqueio de cadastro público e a validação do token JWT com e-mail incorporado respondem perfeitamente aos requisitos técnicos.

Damos o parecer de **GO** para prosseguir ao planejamento operacional do deploy piloto na nuvem de produção (Vercel e Render), utilizando variáveis de ambiente reais injetadas remotamente (fora do repositório).

## 2. Invariantes de Segurança Confirmadas
As seguintes premissas de segurança foram exaustivamente validadas:
- **Allowlist restritiva**: Qualquer cadastro ou login fora de e-mails permitidos é respondido com erro genérico e status `403 Forbidden` sob `PILOT_MODE=true`.
- **Validação contínua JWT**: Se a allowlist for alterada remotamente, tokens ativos pertencentes a e-mails revogados são rejeitados de forma instantânea em O(1) pelo middleware protected, eliminando riscos de sessões órfãs desautorizadas.
- **Isolamento de bancadas (Squads)**: Por padrão, nenhuma bancada externa consegue efetuar login em ambiente de piloto a menos que seja habilitada por liberação explícita via variável de ambiente.

## 3. Bloqueios de Governança Mantidos
Reiteramos os bloqueios absolutos operacionais:
- ❌ Nenhum deploy na Vercel ou Render foi disparado.
- ❌ Nenhum banco MongoDB Atlas foi provisionado.
- ❌ Nenhuma migração de dados locais para a nuvem foi executada.
- ❌ Proibido o hardcode de credenciais ou e-mails reais no repositório.

## 4. Decisão Final

`DECISÃO: SANDBOX LOCAL DO MODO PILOTO RESTRITO VALIDADO. PILOT_MODE=true BLOQUEIA USUÁRIOS NÃO AUTORIZADOS E PRESERVA ACESSO APENAS À ALLOWLIST. NENHUM DEPLOY EXECUTADO. NENHUM SERVIÇO EXTERNO CRIADO. PRÓXIMA FASE: PLANEJAR DEPLOY RESTRITO COM VARIÁVEIS REAIS FORA DO CÓDIGO.`
