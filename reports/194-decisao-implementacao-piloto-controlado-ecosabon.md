# R194 — Decisão: Implementação Piloto Controlado — Plataforma EcoSabon

## 1. PRs Documentais Consolidados

- PR #60 (R182–R186) → mergeado ✅
- PR #61 (R187–R191) → mergeado ✅
- R186 propôs `PILOT_READONLY_MODE` (bloqueio total).
- R191 refinou para `PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS`.
- **A implementação segue R191, que prevalece conceitualmente sobre R186.**

## 2. Arquitetura Implementada

```
PUBLIC_READONLY + TEACHER_CONTROLLED_WRITABLE_SQUADS

Visitante Anônimo ─────► READ-ONLY (423 para POST/PUT/DELETE)
Professor Allowlisted ──► GESTÃO DE BANCADAS (criar/editar/deletar + código de acesso)
Participante (código) ──► TRILHA FUNCIONAL (submeter missões, salvar progresso)
Uploads ─────────────────► BLOQUEADOS no piloto
Mobile ──────────────────► HAMBURGER com Área do Professor
```

## 3. Testes: 265/265 ✅ + Build Vite ✅

| Suite | Contagem |
|---|---|
| server | 86 (76+10 novos = 86... 63 originais + 23 novos = 86) |
| client | 8 |
| curso-interativo | 47 |
| ebook | 124 |
| **Total** | **265** |

## 4. DECISÃO FINAL

```
DECISÃO: IMPLEMENTADO MODO PILOTO CONTROLADO COM VISITANTES READ-ONLY,
PROFESSORES ALLOWLISTED COM GESTÃO DE BANCADAS, PARTICIPANTES COM TOKEN
ESCOPADO E PERSISTÊNCIA LIMITADA À PRÓPRIA BANCADA.

CRIAÇÃO PÚBLICA DE BANCADAS BLOQUEADA. UPLOADS BLOQUEADOS NO PILOTO.
RESPONSIVIDADE MOBILE CORRIGIDA COM MENU HAMBURGER.

QR CODE E DIVULGAÇÃO AMPLA CONTINUAM BLOQUEADOS ATÉ HOMOLOGAÇÃO ONLINE.
```

## 5. Governança

- ❌ QR Code: NÃO gerado
- ❌ Link: NÃO divulgado
- ❌ Atlas: NÃO alterado
- ❌ Render: NÃO alterado (flags serão setadas após merge)
- ❌ Vercel: NÃO alterado
- ❌ Web-book: intocado
- ❌ GitHub Pages: intocado
- ❌ Segredos: nenhum versionado
- ❌ E-mails reais: nenhum exposto
- ❌ Dados reais: nenhum utilizado
- ✅ Código: implementado e testado
- ✅ Relatórios: R192–R194 criados

## 6. Próxima Fase

```
FDP-RESTRICTED-PILOT-VALIDATION-WINDOW — janela de validação real com Leonardo/Nadja
antes de qualquer nova divulgação ou geração de QR Code.

Etapas:
1. Setar flags PILOT_PUBLIC_READONLY=true e PILOT_ALLOW_UPLOADS=false no Render
2. Deploy automático via merge na main
3. Professor Leonardo faz login real
4. Professor Leonardo cria bancada real de teste
5. Professor Leonardo obtém código de acesso
6. Participante entra com código
7. Participante percorre trilha e submete missão
8. Verificar que visitante anônimo é bloqueado
9. Se aprovado: gerar QR Code para distribuição controlada
```

---

_Decisão registrada em 2026-07-01._
