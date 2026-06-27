# R111 — Decisão da Fase FDP-SPIKE-0

## 1. Síntese Executiva
Esta fase validou com sucesso as restrições locais e de nuvem e resolveu o desalinhamento de portas que impedia o build do Docker e a consistência do desenvolvimento local. Com a criação do arquivo `client/vercel.json` e a unificação da porta do servidor local para `3000`, a plataforma está devidamente preparada para um deploy experimental seguro.

## 2. Decisão de Alinhamento de Portas
- **Decisão**: A porta do servidor local em desenvolvimento foi alterada de `4000` para `3000` em [server/.env](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/server/.env), e o proxy de desenvolvimento do client Vite em [client/vite.config.ts](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/client/vite.config.ts) foi reconfigurado para `http://localhost:3000`.
- **Justificativa**: Evitar falhas de conexão ao rodar no Docker (que expõe e mapeia a porta `3000`), restaurar a conformidade com o `.env.example` e reduzir a fricção de onboarding de novos engenheiros na plataforma.

## 3. Próxima Etapa (FDP-DEPLOY-SPIKE)
Recomendamos prosseguir para a fase **FDP-DEPLOY-SPIKE** sob as seguintes premissas de segurança:
1. **Sem dados reais**: O banco hospedado na nuvem (Atlas) deve receber apenas a massa de dados fictícios do seed (`turmas_alunos.json`).
2. **Secrets fortes**: Gerar senhas e chaves JWT únicas para o ambiente online, nunca reutilizando chaves locais de desenvolvimento.
3. **Limitação de upload aceita**: O upload de evidências fotográficas no Render grátis será efêmero (as fotos expiram/somem nos resets de 15 minutos). Essa limitação é aceita para fins de demonstração tecnológica.

## 4. Decisão Formal

`DECISÃO: REQUISITOS DE RUNTIME ALINHADOS NA PORTA 3000. ARQUIVO VERCEL.JSON CRIADO PARA PROXY DE PRODUÇÃO. CONDIÇÕES DOS FREE TIERS DA VERCEL, RENDER E MONGODB ATLAS AUDITADAS COM SUCESSO. VEREDICTO: GO PARA SPIKE CONTROLADO DE DEPLOY DA PLATAFORMA. PRÓXIMA ETAPA: FDP-DEPLOY-SPIKE.`
