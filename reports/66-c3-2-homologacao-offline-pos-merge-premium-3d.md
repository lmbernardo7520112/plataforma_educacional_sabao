# Relatório 66 — C3.2 Homologação Offline Pós-Merge do Premium 3D Integrado

**Data**: 2026-06-21
**Branch**: `docs/c3-2-post-merge-offline-homologation`
**Fase**: C3.2 — Homologação Offline Pós-Merge

---

## 1. Contexto

O PR #22 (`feat/ecosabon-integrate-premium-3d-stage-c3`) foi mergeado na `main` em 2026-06-21, integrando o Premium 3D real rotacionável (Three.js procedural autoral) ao e-book principal EcoSabon como camada complementar. Esta homologação comprova formalmente a reprodutibilidade offline do pacote de distribuição pós-merge.

**Merge commit**: `0fb86eb`

---

## 2. Testes Automatizados

**Comando**: `npm test --prefix ebook-ecosabon-prototipo`
**Resultado**: **104/104 testes passando** ✅

Suítes cobertas:
- T1–T40: Smoke tests HTML, acessibilidade, cartões, mapa
- T41–T50: Smoke tests HTML real (index.html)
- T51–T63: Hotspots do infográfico
- T64–T75: Paginação por módulo
- T76–T80: Palco Molecular Estático B1
- T81–T89: Sequenciador 4D Qualitativo B2
- T90–T104: Integração Premium 3D C3

---

## 3. Build de Produção

**Comando**: `npm run build --prefix ebook-ecosabon-prototipo`
**Engine**: Vite v6.4.3
**Resultado**: ✅ Build bem-sucedido em ~857ms

### Arquivos gerados em `dist/`

| Arquivo | Tamanho | Gzip |
|---------|---------|------|
| `index.html` | 84.38 KB | 16.18 KB |
| `assets/index-uGeiHXe-.css` | 28.03 KB | 5.80 KB |
| `assets/index-D4MJhfW0.js` | 472.93 KB | 121.76 KB |

**Total (3 arquivos)**: ~585 KB (raw), ~144 KB (gzip)

---

## 4. Servidor Estático Simples

**Comando**: `python3 -m http.server 4180 --bind 127.0.0.1 --directory ebook-ecosabon-prototipo/dist`
**URL**: `http://127.0.0.1:4180/`

### Logs do servidor

- `GET / HTTP/1.1` → **200** ✅
- `GET /assets/index-D4MJhfW0.js HTTP/1.1` → **200** ✅
- `GET /assets/index-uGeiHXe-.css HTTP/1.1` → **200** ✅
- `GET /favicon.ico HTTP/1.1` → 404 (esperado, sem favicon no projeto)

**Resultado**: O servidor estático simples serviu todos os assets necessários sem erro.

---

## 5. Verificação Visual e Funcional

| Verificação | Resultado |
|-------------|-----------|
| E-book abre no navegador | ✅ OK |
| Navegação por módulos funciona | ✅ OK |
| Módulo 2 abre | ✅ OK |
| B1 — Palco Molecular Estático preservado | ✅ OK |
| B2 — Stepper Sequenciador preservado | ✅ OK |
| Hotspots do infográfico funcionais | ✅ OK |
| Seção Premium 3D aparece | ✅ OK |
| Three.js carrega | ✅ OK |
| Canvas WebGL renderiza | ✅ OK |
| Botões de câmera (Frontal, Lateral, Topo) funcionam | ✅ OK |
| Fallback textual presente | ✅ OK |
| Disclaimer qualitativo presente | ✅ OK |
| Erros críticos no console | ❌ Nenhum |

---

## 6. Pacote ZIP Offline

**Comando**: `zip -r ../../local_release/ecosabon-premium3d-offline-dist.zip .`
**Localização**: `local_release/ecosabon-premium3d-offline-dist.zip`
**Tamanho**: **141 KB**

### Conteúdo do ZIP

```
  Length      Date    Time    Name
---------  ---------- -----   ----
    84384  2026-06-21 20:11   index.html
        0  2026-06-21 20:11   assets/
    28031  2026-06-21 20:11   assets/index-uGeiHXe-.css
   472928  2026-06-21 20:11   assets/index-D4MJhfW0.js
---------                     -------
   585343                     4 files
```

---

## 7. Exclusões de Versionamento

| Artefato | Rastreado pelo Git? |
|----------|---------------------|
| `node_modules/` | ❌ Ignorado (.gitignore) |
| `ebook-ecosabon-prototipo/dist/` | ❌ Ignorado (.gitignore) |
| `local_release/` | ❌ Ignorado (.gitignore) |
| `local_evidence/` | ❌ Não rastreado |

**Confirmação**: `git ls-files` retorna CLEAN para todos os artefatos acima.

---

## 8. Modo Oficial de Distribuição Offline

1. Clonar o repositório ou obter o código-fonte
2. `cd ebook-ecosabon-prototipo`
3. `npm install`
4. `npm run build`
5. Servir `dist/` com qualquer servidor estático (e.g., `python3 -m http.server`, nginx, Apache, Live Server)
6. Abrir `http://localhost:<porta>/` no navegador

**Alternativa**: Distribuir o conteúdo de `dist/` como ZIP (141 KB) e instruir o destinatário a servir com servidor estático local.

---

## 9. Ressalvas

- **Abertura via `file://`**: Não testado nem prometido. O Three.js e módulos ES6 podem não funcionar via protocolo `file://` devido a restrições CORS do navegador. O modo oficial é via servidor estático.
- **Favicon**: Não incluído no pacote. O 404 de favicon é cosmético e não afeta funcionalidade.
- **Three.js bundle**: O JS final (~473 KB) inclui Three.js inteiro; otimização de tree-shaking pode ser explorada futuramente, mas não é escopo desta fase.

---

## 10. Decisão

| Item | Decisão |
|------|---------|
| C3 integrada | ✅ **Confirmada** — PR #22 mergeado |
| C3.2 homologada pós-merge | ✅ **Confirmada** — build, servidor estático, ZIP, verificação visual |
| Distribuição offline | ✅ **Comprovada** — dist/ funcional sem rede |
| B1+B2 preservados | ✅ **Confirmado** |
| C4/3E | ❌ **NO-GO** |
| Coleta de dados | ❌ **NO-GO** |
| Precificação | ❌ **NO-GO** |
| Produto Premium 3D final | ❌ **NO-GO** |

---

## 11. Riscos Residuais

1. **Compatibilidade `file://`**: O pacote ZIP pode não funcionar abrindo `index.html` diretamente no navegador sem servidor local, por restrições de CORS em módulos ES6.
2. **Tamanho do bundle JS**: 473 KB (122 KB gzip) é aceitável, mas pode ser otimizado com tree-shaking ou import maps se necessário no futuro.
3. **Cobertura de navegadores**: Testado em Chromium. Firefox e Safari devem funcionar (WebGL2 amplamente suportado), mas não foram testados formalmente nesta fase.
4. **Dispositivos móveis**: A interação 3D funciona via touch, mas o desempenho em dispositivos de baixa capacidade gráfica não foi avaliado.

---

## 12. Baseline Atualizado

A `main` contém **B1 + B2 + C3 (Premium 3D integrado)** como baseline estável de produção.
A distribuição offline via `dist/` + servidor estático é o modo oficial de entrega.
