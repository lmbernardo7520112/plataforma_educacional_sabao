# R171 — Decisão: Rotação de Credenciais do MongoDB Atlas — EcoSabon

## 1. Decisão Técnica e de Segurança

DECISÃO: CREDENCIAL ATLAS ROTACIONADA COM SUCESSO. DATABASE_URL ATUALIZADA NO RENDER SEM VERSIONAMENTO DE SEGREDOS. CREDENCIAL ANTIGA REVOGADA. BACKEND RENDER E FRONTEND VERCEL HOMOLOGADOS. PLATAFORMA ECOSABON PERMANECE ONLINE EM MODO PILOTO RESTRITO.

## 2. Riscos Residuais Mapeados
- **Histórico Git**: Embora a credencial tenha sido removida de qualquer arquivo ativo e rotacionada na nuvem, ela reside nos logs de conversação anteriores. A rotação de chaves executada resolve o risco ao invalidar completamente o token antigo.
- **Pendência Opcional**: Considera-se uma futura higienização de commits antigos como tarefa secundária (`SEC-GIT-HISTORY-SECRET-HYGIENE`), embora não seja prioritária após a revogação do acesso à credencial correspondente.
