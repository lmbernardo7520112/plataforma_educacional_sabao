# R123 — Decisão: Homologação do Modo Piloto Restrito

## 1. Decisão Executiva
Homologamos a implementação técnica do modo piloto restrito no backend Express da Plataforma EcoSabon. O código atende plenamente aos critérios de Specification-Driven Development e Domain-Driven Development, estando preparado para um futuro deploy em nuvem seguro e isolado por e-mail de allowlist.

## 2. Resultados das Validações
- **Testes Unitários**: ✅ **230 testes verdes, 0 falhas** no total do monorepo (124 web-book, 47 workspace, 59 server). Os 19 novos testes do piloto foram executados com sucesso.
- **Client Build**: ✅ Compilação do client Vite concluída com sucesso sem erros TypeScript.
- **ESLint**: ✅ Linter executado com 100% de sucesso (0 erros).

## 3. Bloqueios de Segurança Mantidos (Modo Estrito)
Fica expressamente reiterado o bloqueio das seguintes operações nesta fase:
- **Sem Deploy**: Nenhum deploy online foi efetuado.
- **Sem Contas**: Nenhuma conta na Vercel, Render ou MongoDB Atlas foi criada.
- **Sem Migração**: Nenhum dado do banco local em Docker foi exportado ou migrado para a nuvem.
- **Sem Dados Reais**: Proibido o uso de informações de estudantes ou e-mails institucionais reais no repositório de desenvolvimento.

## 4. Decisão Formal

`DECISÃO: PILOT_MODE IMPLEMENTADO PARA PREPARAR O PILOTO RESTRITO DA PLATAFORMA ECOSABON. ACESSO EM MODO PILOTO DEVE SER LIMITADO À ALLOWLIST DE PROFESSORES AUTORIZADOS VIA VARIÁVEL DE AMBIENTE. NENHUM DEPLOY EXECUTADO. NENHUM SERVIÇO EXTERNO CRIADO. NENHUM DADO REAL UTILIZADO.`
