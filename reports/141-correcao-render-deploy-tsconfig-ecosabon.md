# R141 — Correção: Render Deploy TypeScript Config

## 1. Objetivo

Modernizar `shared/tsconfig.json` para eliminar o erro TS5107 que impede o build no Render.

## 2. Arquivo Alterado

Único arquivo alterado: `shared/tsconfig.json`

## 3. Diff Conceitual

```diff
 {
   "compilerOptions": {
-    "ignoreDeprecations": "5.0",
     "target": "ES2022",
     "lib": ["ES2022"],
-    "module": "ESNext",
-    "moduleResolution": "node",
+    "module": "Node16",
+    "moduleResolution": "Node16",
     "allowSyntheticDefaultImports": true,
```

## 4. Por que `Node16` foi escolhido

- Os imports do `shared/` já usam extensões `.js` (`./types/classroom.js`, etc.)
- O `server/tsconfig.json` já usa `module: "Node16"` + `moduleResolution: "Node16"`
- Alinhamento completo entre shared e server
- Elimina `ignoreDeprecations` permanentemente (não é band-aid)
- Testado com `tsc --noEmit` (exit 0), `tsc` build real (exit 0), 238 testes verdes

## 5. Por que `Bundler` foi rejeitado

- Não alinha com `server/tsconfig.json`
- `module: "ESNext"` com `Bundler` pode ter edge cases na emissão de declarations
- Sem benefício adicional para este projeto específico
- `Node16` já é compatível com os imports existentes

## 6. Validações Locais

| Validação | Resultado |
|---|---|
| `npm run build -w shared` | ✅ exit 0, dist gerado |
| `tsc --noEmit` no shared | ✅ exit 0 |
| `npm test --prefix ebook-ecosabon-prototipo` | ✅ 124 testes |
| `npm test` (client workspace) | ✅ 8 testes |
| `cd server && npx vitest run` | ✅ 59 testes |
| Total curso-interativo | ✅ 47 testes |
| **Total** | **238 testes ✅** |
| `npm run build -w client` | ✅ sucesso (898ms) |

## 7. Testes Reais

```
web-book:   124 passed
client:       8 passed
curso:       47 passed
server:      59 passed
TOTAL:      238 passed (0 falhas)
Build:      OK (898ms)
```

## 8. Build Real do Shared

```
> shared@1.0.0 build
> tsc
(exit 0, dist gerado com index.js, index.d.ts, etc.)
```

## 9. Segurança

| Verificação | Resultado |
|---|---|
| `.env` versionado | ❌ Nenhum (só `.env.example`) |
| E-mail real | ❌ Nenhum |
| JWT real | ❌ Nenhum |
| Connection string real | ❌ Nenhuma |
| Senha real | ❌ Nenhuma |

## 10. Comandos Render Recomendados (candidatos validados)

Estes comandos serão aplicados na Etapa B, após merge:

```
Root Directory: (vazio — raiz do repo)
Build Command:  npm install && npm run build -w shared
Start Command:  npm run start -w server
Branch:         main
```

## 11. Confirmação

**O Render ainda NÃO foi alterado nesta etapa.**
Todas as alterações são apenas no repositório local.

---

**Nenhum segredo, e-mail real ou `.env` foi registrado neste relatório.**
