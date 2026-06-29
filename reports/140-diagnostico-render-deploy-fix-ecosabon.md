# R140 — Diagnóstico: Render Deploy TypeScript e Start Command

## 1. Erro Observado

```
tsconfig.json(7,25): error TS5107: Option 'moduleResolution=node10' is deprecated
and will stop functioning in TypeScript 7.0. Specify compilerOption
'"ignoreDeprecations": "6.0"' to silence this error.
```

Build do Render falhou durante `npm run build -w shared` → `tsc`.

## 2. Causa Raiz

Três problemas independentes:

### 2.1. `shared/tsconfig.json` com configuração deprecated

| Parâmetro | Valor anterior | Problema |
|---|---|---|
| `module` | `"ESNext"` | Funcional, mas desalinhado com server |
| `moduleResolution` | `"node"` | Alias para `"node10"`, deprecated desde TS 5.5 |
| `ignoreDeprecations` | `"5.0"` | Band-aid incorreto; TS 5.9.3 exige `"6.0"` |

### 2.2. Start Command incorreto no Render

| Estado | Valor |
|---|---|
| Incorreto (atual) | `node api/dist/index.js` |
| Correto | `npm run start -w server` |

O browser subagent alterou para um caminho inexistente.

### 2.3. Build Command e Root Directory

| Configuração | Valor necessário |
|---|---|
| Root Directory | vazio (raiz do repo, para workspaces) |
| Build Command | `npm install && npm run build -w shared` |
| Start Command | `npm run start -w server` |

## 3. Arquivos Inspecionados

| Arquivo | Observação |
|---|---|
| `shared/tsconfig.json` | `moduleResolution: "node"` — deprecated |
| `server/tsconfig.json` | `module: "Node16"`, `moduleResolution: "Node16"` — correto |
| `client/tsconfig.app.json` | `moduleResolution: "bundler"` — correto para Vite |
| `shared/index.ts` | Imports já usam extensões `.js` |
| `server/package.json` | `tsx` em `dependencies`, `start: "tsx server.ts"` |
| `package.json` (root) | Workspaces configurados, `prestart: "npm run build -w shared"` |

## 4. Comparação Node16 vs Bundler

| Critério | Node16 | Bundler |
|---|---|---|
| `tsc --noEmit` | ✅ exit 0 | ✅ exit 0 |
| `tsc` (build real) | ✅ exit 0, dist gerado | Não testado |
| Imports `.js` | ✅ compatível | ✅ compatível |
| Alinhamento server | ✅ idêntico | ❌ diferente |
| Emissão `declaration` | ✅ funciona | ⚠️ edge cases possíveis |
| 238 testes | ✅ todos verdes | Não testado |
| Client build | ✅ sucesso | Não testado |

## 5. Decisão Técnica

**Escolhido: `Node16`**

Justificativa:
- Alinha completamente com `server/tsconfig.json`
- Imports do shared já usam `.js` (zero alterações necessárias)
- Elimina `ignoreDeprecations` permanentemente
- Validado com 238 testes + build shared + build client
- Menor risco de regressão

**Rejeitado: `Bundler`**

Justificativa:
- Não alinha com server
- `module: "ESNext"` com `Bundler` pode ter edge cases na emissão de declarations
- Sem benefício adicional para este projeto

## 6. Comandos Render Candidatos (validação pós-merge)

```
Root Directory: (vazio)
Build Command:  npm install && npm run build -w shared
Start Command:  npm run start -w server
Branch:         main
```

## 7. Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Node16 quebra imports | Nula | Imports já usam `.js`; testado |
| tsx indisponível no Render | Baixa | `tsx` é dependency do server |
| Render não detecta commit | Baixa | Manual Deploy como fallback |

## 8. Estratégia de Rollback

Se a correção falhar no Render:
1. Reverter `shared/tsconfig.json` para `ignoreDeprecations: "6.0"` (band-aid temporário)
2. Revalidar localmente
3. Push + redeploy

---

**Nenhum segredo, e-mail real ou `.env` foi registrado neste relatório.**
