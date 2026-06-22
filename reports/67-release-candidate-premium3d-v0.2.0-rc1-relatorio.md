# Relatório 67 — Release Candidate Premium 3D v0.2.0-rc1

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Tag proposta** | `ecosabon-premium3d-v0.2.0-rc1` |
| **Branch** | `release/ecosabon-premium3d-v0.2.0-rc1` |
| **Base commit** | `5ac1d58acb968421e7e9e31d1dea1b9bfa6f2281` |
| **Data** | 2026-06-21 |
| **Objetivo** | Release Candidate do EcoSabon com Premium 3D integrado |

---

## 2. Escopo da Release

EcoSabon Web-Book com as seguintes camadas integradas:

- **B1** — Palco Molecular Estático (SVG qualitativo)
- **B2** — Sequenciador 4D Qualitativo (stepper pedagógico)
- **C3** — Premium 3D Real Rotacionável (Three.js procedural autoral)
- **C3.2** — Homologação offline pós-merge

A release inclui:

- Build estático via Vite para distribuição offline
- PDF de conferência gerado por Chrome headless
- ZIP offline contendo `dist/`
- Checksums SHA256

A release **não** inclui:

- Precificação
- Coleta de dados
- Validação docente real
- Simulação molecular validada
- Dependências externas de rede obrigatórias

---

## 3. Testes

### 3.1 Testes automatizados

**Comando**: `npm test --prefix ebook-ecosabon-prototipo`
**Resultado**: **104/104 testes passando** ✅

| Suíte | Testes | Status |
|-------|--------|--------|
| Smoke tests HTML | T1–T40 | ✅ |
| Smoke tests HTML real | T41–T50 | ✅ |
| Hotspots infográfico | T51–T63 | ✅ |
| Paginação por módulo | T64–T75 | ✅ |
| Palco Molecular B1 | T76–T80 | ✅ |
| Sequenciador 4D B2 | T81–T89 | ✅ |
| Integração Premium 3D C3 | T90–T104 | ✅ |

### 3.2 Build de produção

**Comando**: `npm run build --prefix ebook-ecosabon-prototipo`
**Engine**: Vite v6.4.3
**Resultado**: ✅ Build bem-sucedido em ~597ms, sem warnings críticos

| Arquivo | Tamanho | Gzip |
|---------|---------|------|
| `dist/index.html` | 84.38 KB | 16.18 KB |
| `dist/assets/index-uGeiHXe-.css` | 28.03 KB | 5.80 KB |
| `dist/assets/index-D4MJhfW0.js` | 472.93 KB | 121.76 KB |

### 3.3 Servidor estático simples

**Comando**: `python3 -m http.server 4180 --bind 127.0.0.1 --directory ebook-ecosabon-prototipo/dist`
**Resultado**: Todos os assets retornaram HTTP 200. Apenas `favicon.ico` retornou 404 (esperado).

### 3.4 Inspeção visual e funcional

| Verificação | Resultado |
|-------------|-----------|
| Página inicial abre | ✅ |
| Navegação por módulos funciona | ✅ |
| Módulo 2 abre | ✅ |
| B1 — Palco Molecular Estático presente | ✅ |
| B2 — Stepper Sequenciador funcional | ✅ |
| Hotspots do infográfico funcionais | ✅ |
| Seção Premium 3D aparece | ✅ |
| Canvas Premium 3D renderiza | ✅ |
| Controles de câmera funcionam | ✅ |
| Fallback textual presente | ✅ |
| Disclaimer científico presente | ✅ |
| Erros críticos no console | ❌ Nenhum |
| Chamadas externas de rede | ❌ Nenhuma funcional* |

*Nota: O CSS contém `@import url('https://fonts.googleapis.com/...')` para Google Fonts (Inter, Outfit). Em ambiente offline real sem rede, as fontes web não carregarão e o navegador usará o fallback `system-ui, sans-serif`. Isto é degradação graciosa e não afeta a funcionalidade do e-book.

---

## 4. Artefatos

| Artefato | Arquivo | Tamanho |
|----------|---------|---------|
| ZIP offline | `ecosabon-premium3d-v0.2.0-rc1-offline.zip` | 141 KB |
| PDF conferência | `ecosabon-premium3d-v0.2.0-rc1-conferencia.pdf` | 309 KB (22 páginas) |

### Checksums SHA256

```
0c963a387c1d9806a23cfeb780e17c3958e54ed36505c40cdb35cf2150f2977c  ecosabon-premium3d-v0.2.0-rc1-offline.zip
b8a2ccba78dc75f12f3326bcfa2d6c5699747194d883e4b79318d52f2bc2dcdb  ecosabon-premium3d-v0.2.0-rc1-conferencia.pdf
```

### Conteúdo do ZIP

```
  Length      Date    Time    Name
---------  ---------- -----   ----
    84384  2026-06-21 20:43   index.html
        0  2026-06-21 20:43   assets/
    28031  2026-06-21 20:43   assets/index-uGeiHXe-.css
   472928  2026-06-21 20:43   assets/index-D4MJhfW0.js
---------                     -------
   585343                     4 files
```

Confirmações:

- ✅ Nenhum `node_modules/` no ZIP
- ✅ Nenhum `dist/` aninhado no ZIP
- ✅ Nenhum arquivo de desenvolvimento no ZIP
- ✅ Nenhum relatório interno no ZIP
- ✅ Nenhum `.git` no ZIP

---

## 5. Modo Oficial de Execução Offline

### Opção A — A partir do código-fonte

```bash
git clone https://github.com/lmbernardo7520112/plataforma_educacional_sabao.git
cd plataforma_educacional_sabao/ebook-ecosabon-prototipo
npm install
npm run build
cd dist
python3 -m http.server 4180 --bind 127.0.0.1
```

Abrir: `http://127.0.0.1:4180/`

### Opção B — A partir do ZIP

1. Baixar `ecosabon-premium3d-v0.2.0-rc1-offline.zip` da GitHub Release
2. Extrair o conteúdo
3. Servir a pasta extraída com servidor local:

```bash
cd ecosabon-premium3d-v0.2.0-rc1-offline
python3 -m http.server 4180 --bind 127.0.0.1
```

4. Abrir: `http://127.0.0.1:4180/`

---

## 6. Ressalvas

1. **Abertura via `file://`**: Não testado, não prometido. Módulos ES6 e Three.js podem não funcionar via protocolo `file://` devido a restrições CORS do navegador. O modo oficial é via servidor estático local.

2. **Google Fonts**: O CSS importa fontes do Google Fonts. Em ambiente offline real sem rede, as fontes degradam graciosamente para `system-ui, sans-serif`. A funcionalidade do e-book não é afetada.

3. **Tamanho do bundle JS**: 473 KB (122 KB gzip) inclui Three.js completo. Otimização de tree-shaking pode ser explorada futuramente.

4. **Cobertura de navegadores**: Testado em Chromium. Firefox e Safari devem funcionar (WebGL2 amplamente suportado), mas não foram testados formalmente.

5. **Dispositivos móveis**: A interação 3D funciona via touch, mas desempenho em dispositivos de baixa capacidade gráfica não foi avaliado.

---

## 7. Governança

| Princípio | Status |
|-----------|--------|
| Sem rede obrigatória | ✅ |
| Sem coleta de dados | ✅ |
| Sem persistência (localStorage, sessionStorage) | ✅ |
| Sem modelos 3D externos (.glb, .gltf, .fbx, .obj) | ✅ |
| Sem CDN obrigatório | ✅ |
| Sem simulação quantitativa | ✅ |
| Sem validação docente real | ✅ (não executada) |
| Sem validação em computadores escolares reais | ✅ (não executada) |
| Sem validação com leitores de tela reais | ✅ (não executada) |
| Sem precificação | ✅ |
| Sem declaração de simulação molecular validada | ✅ |
| Release anterior `ecosabon-demo-v0.1.0` preservada | ✅ |
| Binários não versionados no Git | ✅ |

---

## 8. Decisão

| Item | Decisão |
|------|---------|
| Publicar GitHub Release Candidate | ✅ **GO** |
| Declarar produto final | ❌ **NO-GO** |
| Precificação | ❌ **NO-GO** |
| Validação futura em dispositivos reais | ✅ **GO** (recomendada) |
| Validação docente real futura | ✅ **GO** (recomendada) |

---

## 9. Release anterior preservada

```
Tag: ecosabon-demo-v0.1.0
Nome: EcoSabon Web-Book Demo v0.1.0
Criada em: 2026-06-20T22:32:04Z
Draft: false
Prerelease: false
Status: inalterada ✅
```
