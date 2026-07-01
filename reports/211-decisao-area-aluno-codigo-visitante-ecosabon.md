# R211 — Decisão Arquitetural: Área do Aluno com Código e Modo Visitante Sandbox

Este documento formaliza a decisão de design de segurança implementada no acesso discente da plataforma EcoSabon.

---

## Decisão Consolidada

```
DECISÃO: ÁREA DO ALUNO PASSA A EXIGIR CÓDIGO/SENHA DE BANCADA GERADO PELO PROFESSOR. O LOGIN DIRETO POR SQUADID FOI BLOQUEADO NO PILOTO. O MODO VISITANTE FOI IMPLEMENTADO COMO SANDBOX SEM ESCRITA REMOTA, SEM TOKEN REAL, SEM UPLOAD E SEM PERSISTÊNCIA NO ATLAS. PROFESSORES ALLOWLISTED MANTÊM GESTÃO DE BANCADAS FUNCIONAIS.
```

---

## 1. Justificativa
A decisão atende à necessidade de blindar as bancadas reais da escola contra interferências acidentais ou maliciosas de visitantes ou curiosos que acessassem a plataforma em produção. Ao mesmo tempo, preserva o caráter aberto e demonstrativo por meio do modo visitante sandbox, que simula o laboratório qualitativo localmente na memória sem onerar o banco de dados institucional.

---

## 2. Padrões de Segurança Atendidos
* **Zero Trust Estudantil:** O acesso à bancada requer prova de conhecimento (código PIN gerado pelo professor) para obtenção de token.
* **Redução de Superfície de Ataque:** Endpoint legado `/auth/squad/login` bloqueado com status **423 Locked** em modo piloto.
* **Higiene de Logs:** Segredos de código de acesso são persistidos apenas na forma de hash SHA-256 de via única.
* **Isolamento de Memória:** O modo visitante opera em sandbox em memória do estado, sem persistência do Zustand no navegador ou chamadas de escrita na API.

---

_Decisão homologada e integrada na branch main em 2026-07-01._
