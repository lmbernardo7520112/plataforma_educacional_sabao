# R172 — Relatório de Merge da Rotação de Credenciais Atlas — EcoSabon

## 1. Pull Request e Merge
- **Pull Request**: [#57](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/pull/57)
- **Título**: `docs(ecosabon): report Atlas credential rotation and validation`
- **Hash do Merge**: `b244360`
- **Status do Pipeline**: ✅ 7/7 checks bem-sucedidos

## 2. Ações de Rotação Executadas
- **Credencial Atlas**: Criado novo usuário de runtime restrito (`ecosabon_pilot_runtime_v2`) sob privilégios mínimos.
- **Configuração no Render**: A variável de ambiente `DATABASE_URL` do backend Render foi atualizada com a nova connection string do Atlas. O valor secreto não foi compartilhado ou exposto nos logs/commits.
- **Revogação**: Após validação, o usuário de banco Atlas antigo comprometido foi permanentemente removido.
- **Web-book**: Intocado e inalterado.

## 3. Homologação e Validação Técnica
- **Backend (Render)**: Validado após reinicialização e respondendo status `200 OK` na rota pública de saúde `/ping`.
- **Frontend (Vercel)**: Validado através de simulação de ponta a ponta no navegador, acessando onboarding, listando turmas/bancadas e acessando o dashboard de missões sem erros.
- **Testes**: Executada a suíte de testes de desenvolvimento, com **242/242 testes passados**.

## 4. Decisão

DECISÃO: SEC-ROTATE-ATLAS-CREDENTIALS MERGEADO. CREDENCIAL ATLAS ROTACIONADA, DATABASE_URL ATUALIZADA NO RENDER, CREDENCIAL ANTIGA REVOGADA, BACKEND E FRONTEND VALIDADOS, NENHUM SEGREDO VERSIONADO.
