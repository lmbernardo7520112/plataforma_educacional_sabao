# R200 — Decisão de Implantação do Piloto Controlado — EcoSabon

## 1. Status do Deploy e Homologação

Após a conclusão das auditorias locais, configuração de variáveis de ambiente no Render/Vercel e homologação de segurança em produção, os seguintes fatos estão estabelecidos:

1. **Infraestrutura em Produção:** As flags `PILOT_MODE=true`, `PILOT_PUBLIC_READONLY=true`, `PILOT_ALLOW_UPLOADS=false` e `PILOT_ALLOW_SQUAD_LOGIN=true` foram configuradas com sucesso no Render. As variáveis `VITE_PILOT_MODE=true` e `VITE_PILOT_UPLOADS_BLOCKED=true` estão ativas na Vercel.
2. **Segurança de Visitantes:** Visitantes anônimos estão bloqueados de realizar qualquer escrita no banco de dados (POST/PUT/DELETE retornam HTTP 423 `PILOT_READONLY`).
3. **Proteção do Onboarding:** Os endpoints públicos não expõem nomes de estudantes ou códigos de acesso (apenas retornam o `memberCount` numérico).
4. **Responsividade Mobile:** A navbar mobile responde corretamente, com menu hamburger expandindo os links das áreas docentes e de alunos de forma desimpedida.
5. **Pendência:** A validação final do login do professor real allowlisted, a criação de bancada e o acesso do participante via código de acesso em produção exigem credenciais que não devem ser expostas e, portanto, dependem de execução humana/assistida.

## 2. Decisão Consolidada

```
DECISÃO: PILOTO CONTROLADO PARCIALMENTE ATIVADO. FLAGS DE PRODUÇÃO CONFIGURADAS, MAS HOMOLOGAÇÃO COMPLETA DEPENDE DE TESTE HUMANO COM PROFESSOR AUTORIZADO E PARTICIPANTE POR CÓDIGO. QR CODE E DIVULGAÇÃO SEGUEM BLOQUEADOS.
```

## 3. Próximos Passos Recomendados

1. **Executar a Fase `HUMAN-ASSISTED-PILOT-VALIDATION`:** Agendar uma janela curta onde os professores Leonardo ou Nadja realizam o login em produção, criam uma bancada piloto de teste e passam o código gerado para validar o login do participante.
2. **Remover Bloqueio de Divulgação (Pós-Homologação Humana):** Apenas após a confirmação do sucesso do fluxo assistido em produção, liberar a geração do QR Code e divulgação do link do piloto.

---

_Relatório de decisão registrado em 2026-07-01._
