# 📋 Relatório 69 — Hardening Arquitetural H1 Pós-RC1 (EcoSabon)

| Campo              | Valor                                                    |
|--------------------|----------------------------------------------------------|
| **Fase**           | H1 — Hardening Arquitetural                              |
| **Data**           | 2026-06-22                                               |
| **Branch**         | `refactor/ecosabon-h1-architecture-hardening`             |
| **Base**           | `main`                                                   |
| **Referência**     | Auditoria de Arquitetura (Relatório pré-H1)               |
| **RC1 preservada** | `ecosabon-premium3d-v0.2.0-rc1` — NÃO ALTERADA           |

---

## 1. Objetivo

Executar um refactor técnico mínimo, seguro e de alto impacto no monorepo EcoSabon após o fechamento da RC1 Premium 3D, sem reabrir a release candidate, sem alterar o e-book Premium 3D e sem iniciar novas features.

---

## 2. Escopo Executado

### 2.1 — P1: Centralização do SaponificationEngine

**Problema:** O `SaponificationEngine` existia em 3 locais com cópias idênticas em lógica mas divergentes em comentários — risco de divergência silenciosa de constantes químicas.

**Antes:**
```
server/domain/SaponificationEngine.ts      (69 linhas)
client/src/core/domain/SaponificationEngine.ts  (66 linhas)
server/domain/SaponificationEngine.test.ts  (63 linhas)
client/src/core/domain/SaponificationEngine.test.ts (57 linhas)
```

**Depois:**
```
shared/domain/SaponificationEngine.ts       ← IMPLEMENTAÇÃO CANÔNICA ÚNICA
server/domain/SaponificationEngine.test.ts  ← importa de shared
client/src/core/domain/SaponificationEngine.test.ts ← importa de shared
```

**Verificação:**
```
$ find . -name 'SaponificationEngine*' ! -path '*/node_modules/*' ! -path '*/dist/*'
./server/domain/SaponificationEngine.test.ts
./shared/domain/SaponificationEngine.ts
./client/src/core/domain/SaponificationEngine.test.ts
```

✅ Apenas uma implementação. Constantes, fórmulas e assinaturas preservadas integralmente.

### 2.2 — P4: Remoção do JWT_SECRET Hardcoded

**Problema:** O fallback `'ecosabon_master_key'` permitia que o servidor funcionasse sem um JWT secret real, comprometendo a integridade dos tokens.

**Antes:**
- `server/middleware/auth.ts`: `jwt.verify(token, process.env.JWT_SECRET || 'ecosabon_master_key')`
- `server/services/authService.ts`: `const JWT_SECRET = process.env.JWT_SECRET || 'ecosabon_master_key'`

**Depois:**
- `server/middleware/auth.ts`: `jwt.verify(token, getJWTSecret())` — com getter que lança erro se ausente
- `server/services/authService.ts`: `getJWTSecret()` — mesma proteção
- `server/server.ts`: Validação na inicialização — server não sobe sem `JWT_SECRET`

**Verificação:**
```
$ grep -R "ecosabon_master_key" server/ shared/ client/ --include="*.ts" --include="*.tsx"
(vazio)
```

✅ Zero fallbacks inseguros.

### 2.3 — P6: Rate Limiting Básico

**Problema:** Nenhuma proteção contra abuso de requisições. Um atacante poderia enviar milhares de requests por segundo.

**Implementação:**
- Dependência: `express-rate-limit ^8.5.2` (instalada em `server/`)
- Configuração em `server/server.ts`:
  - `windowMs`: 15 minutos
  - `max`: 100 requisições por IP por janela
  - Headers `RateLimit-*` habilitados (RFC 6585)
  - Aplicado em `/api/` (todas as rotas de negócio)

✅ Rate limiting operacional.

---

## 3. Arquivos Alterados

| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `shared/domain/SaponificationEngine.ts` | **CRIADO** — implementação canônica |
| `shared/index.ts` | **EDITADO** — adicionado barrel export |
| `server/domain/SaponificationEngine.ts` | **REMOVIDO** — cópia duplicada |
| `server/domain/SaponificationEngine.test.ts` | **EDITADO** — import atualizado para shared |
| `server/services/missionService.ts` | **EDITADO** — import atualizado para shared |
| `server/middleware/auth.ts` | **EDITADO** — removido fallback, adicionado `getJWTSecret()` |
| `server/services/authService.ts` | **EDITADO** — removido fallback, adicionado `getJWTSecret()` |
| `server/server.ts` | **EDITADO** — validação JWT_SECRET + rate limiting |
| `server/package.json` | **EDITADO** — adicionado `express-rate-limit` |
| `client/src/core/domain/SaponificationEngine.ts` | **REMOVIDO** — cópia duplicada |
| `client/src/core/domain/SaponificationEngine.test.ts` | **EDITADO** — import atualizado para shared |
| `client/src/pages/MissionReactor.tsx` | **EDITADO** — import atualizado para shared |
| `package-lock.json` | **EDITADO** — lockfile atualizado |

---

## 4. Testes

| Suite | Resultado | Comando |
|-------|-----------|---------|
| E-book (Vitest) | **104/104 ✅** | `npm test --prefix ebook-ecosabon-prototipo` |
| Curso Interativo (Vitest) | **47/47 ✅** | `npm test` |
| Server Domain (Vitest) | **8/8 ✅** | `cd server && npx vitest run` |
| Shared build | **Compilou ✅** | `npm run build:shared` |

**Total: 159/159 testes passando.**

---

## 5. Segurança

| Item | Estado |
|------|--------|
| Fallback hardcoded `ecosabon_master_key` | ❌ **ELIMINADO** |
| Validação de `JWT_SECRET` no startup | ✅ **ADICIONADA** |
| Rate limiting em `/api/` | ✅ **100 req/15min por IP** |
| Headers `RateLimit-*` (RFC 6585) | ✅ **HABILITADOS** |
| Rastreamento indevido (node_modules/dist) | ✅ **LIMPO** |

---

## 6. O que NÃO foi feito (por design)

- ❌ **Não alterou** a release `ecosabon-premium3d-v0.2.0-rc1`
- ❌ **Não moveu** tags
- ❌ **Não alterou** assets de release (ZIP/PDF)
- ❌ **Não alterou** o Premium 3D
- ❌ **Não alterou** `ebook-ecosabon-prototipo/index.html`
- ❌ **Não alterou** CSS/JS do e-book
- ❌ **Não alterou** conteúdo pedagógico
- ❌ **Não componentizou** o `index.html` do e-book
- ❌ **Não refatorou** `VanillaRenderer`
- ❌ **Não alterou** `MissionReactor` (exceto import path)
- ❌ **Não implementou** novas features
- ❌ **Não iniciou** precificação/coleta/C4/3E
- ❌ **Não mexeu** em `local_release/`, `release/` ou `commercial_release/`

---

## 7. Riscos Residuais (Para H2+)

| Risco | Severidade | Fase Sugerida |
|-------|-----------|---------------|
| Uploads sem validação de MIME/tamanho | 🟡 Médio | H2 |
| Rotas GET (listagem) sem auth | 🟡 Médio | H2 |
| VanillaRenderer God Object (504 LoC) | 🟡 Médio | H3 |
| index.html monolítico (1.115 linhas) | 🟢 Baixo | H4+ |
| CORS fixo em localhost | 🟡 Médio | Deploy |
| Zustand sem persistência | 🟢 Baixo | H2 |

---

## 8. Decisão

> **H1 CONCLUÍDA COMO HARDENING ARQUITETURAL MÍNIMO PÓS-RC1.**
> **RC1 PREMIUM 3D PRESERVADA E NÃO ALTERADA.**
> **NENHUMA FEATURE NOVA INTRODUZIDA.**
