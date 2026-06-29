# R173 — Monitoramento do Piloto Online — EcoSabon

## 1. Objetivo
Registrar o comportamento e a estabilidade online da Plataforma EcoSabon pós-rotação de credenciais de conexão do MongoDB Atlas.

## 2. Estado de Conectividade e Desempenho
- **Conectividade do Banco**: O backend Render (`ecosabon-api`) está se comunicando de forma estável com o MongoDB Atlas utilizando o novo usuário dedicado de privilégio restrito (`ecosabon_pilot_runtime_v2`).
- **Disponibilidade da API**: O endpoint de saúde `/ping` e a raiz da API respondem consistentemente.
- **Integração Vercel/Render**: As chamadas do frontend hospedado na Vercel para a API no Render via proxy reverso estão operacionais. A chamada à listagem pública de turmas (`/api/onboarding/classrooms`) retorna status `200 OK` e dados DTO corretos em tempo de resposta médio <200ms (excluindo cold starts).
- **Recuperação Automática**: O tempo de subida (cold start) da instância gratuita do Render após períodos de inatividade é de aproximadamente 30-50 segundos, recuperando-se automaticamente sem requerer intervenções manuais.
