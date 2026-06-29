# R175 — Decisão: Monitoramento e QR Gate — EcoSabon

## 1. Veredito Executivo

DECISÃO: PILOTO ONLINE MONITORADO E OPERACIONAL. QR CODE PERMANECE BLOQUEADO ATÉ AUTORIZAÇÃO HUMANA EXPLÍCITA E DECISÃO SOBRE O WARN DO PAYLOAD PÚBLICO DE SQUADS/MEMBERS.

GO CONDICIONAL para futura geração de QR restrito, condicionado a:
1. Aceitar temporariamente `members` apenas porque os dados são sintéticos e o piloto é restrito.
2. Ou, preferencialmente, executar hardening adicional para substituir `members` por `memberCount` no endpoint público antes do QR.

WARN: o endpoint público de squads ainda retorna a lista sintética members. Embora não contenha dados reais, a forma mais segura para QR/divulgação restrita é substituir essa lista por memberCount ou studentCount antes de qualquer divulgação mais ampla.

## 2. Posição do QR Gate
A geração de QR Code permanece bloqueada nesta fase por motivos de conformidade operacional, necessitando da seguinte frase de consentimento humano expresso no chat para ser disparada em fase futura:
`AUTORIZO GERAR QR CODE RESTRITO DA PLATAFORMA ECOSABON PARA DIVULGAÇÃO CONTROLADA DO PILOTO.`
