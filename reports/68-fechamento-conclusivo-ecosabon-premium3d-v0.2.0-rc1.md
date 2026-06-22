# Relatório 68 — Fechamento Conclusivo: EcoSabon Premium 3D v0.2.0-rc1

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Projeto** | Plataforma Educacional Sabão — EcoSabon Web-Book |
| **Tag** | `ecosabon-premium3d-v0.2.0-rc1` |
| **Release** | [EcoSabon Web-Book Premium 3D v0.2.0-rc1](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/releases/tag/ecosabon-premium3d-v0.2.0-rc1) |
| **Tipo** | Pre-release (Release Candidate) |
| **Branch final** | `main` |
| **Commit base** | `4c7b030` |
| **Data de publicação** | 2026-06-22T00:56:34Z |
| **Versão anterior** | `ecosabon-demo-v0.1.0` — preservada e inalterada |

---

## 2. Linha do Tempo

| Fase | Descrição | PR | Status |
|------|-----------|----|--------|
| **B1** | Palco Molecular Estático — SVG qualitativo com contagem de átomos e disclaimer | — | ✅ Integrado |
| **B2** | Sequenciador 4D Qualitativo — stepper pedagógico de etapas da saponificação | — | ✅ Integrado |
| **C1** | Spike experimental do Premium 3D real rotacionável (isolado em `experiments/`) | PR #20 | ✅ Mergeado |
| **C2** | Protótipo demonstrável controlado do Premium 3D (isolado em `experiments/`) | PR #21 | ✅ Mergeado |
| **C3** | Integração controlada do Premium 3D ao e-book principal | PR #22 | ✅ Mergeado |
| **C3.2** | Homologação offline pós-merge | PR #23 | ✅ Mergeado |
| **RC1** | Preparação e publicação da Release Candidate | PR #24 | ✅ Mergeado e publicado |
| **RC1-fix** | Correção do print CSS (`media="print"`) e regeneração do PDF de conferência | PR #25 | ✅ Em andamento |

---

## 3. Resultado Consolidado

O EcoSabon possui agora uma **Release Candidate demonstrável** (`v0.2.0-rc1`) contendo:

- **E-book integrado** com 5 módulos pedagógicos sobre saponificação em estações
- **B1 — Palco Molecular Estático**: diagrama SVG qualitativo com contagem de átomos simplificada, legenda e disclaimer científico
- **B2 — Sequenciador 4D Qualitativo**: stepper pedagógico com 4 etapas da saponificação, painel aria-live e navegação acessível
- **C3 — Premium 3D Real Rotacionável**: modelo molecular procedural autoral em Three.js, com controles de câmera (Frontal, Lateral, Topo), fallback textual acessível e disclaimer qualitativo
- **Build estático** via Vite v6.4.3, gerando pacote de 4 arquivos (~590 KB raw, ~145 KB gzip) — print CSS separado via `media="print"`
- **ZIP offline** distribuível (142 KB)
- **PDF de conferência** (1.3 MB, 22 páginas, gerado via Chrome CDP com emulação de @media print, contendo todos os módulos com conteúdo completo)
- **GitHub Release publicada** como pre-release com ambos os artefatos anexados
- **104 testes automatizados** passando (T1–T104)

---

## 4. Modo Correto de Uso

### Modo oficial de execução offline

1. Baixar `ecosabon-premium3d-v0.2.0-rc1-offline.zip` da [GitHub Release](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/releases/tag/ecosabon-premium3d-v0.2.0-rc1)
2. Extrair o conteúdo do ZIP
3. Servir a pasta extraída com qualquer servidor estático local:

```bash
cd ecosabon-premium3d-v0.2.0-rc1-offline
python3 -m http.server 4180 --bind 127.0.0.1
```

4. Abrir no navegador: `http://127.0.0.1:4180/`

### Sobre abertura via `file://`

A abertura direta do `index.html` via duplo clique (`file://`) **não foi testada nem é prometida**. Módulos ES6 e Three.js podem não funcionar via protocolo `file://` devido a restrições CORS do navegador. O modo oficial é via servidor estático local.

---

## 5. Linguagem Correta sobre Rede

- O e-book **não possui rede obrigatória para funcionamento**. Toda a lógica, o HTML, o CSS e o JavaScript (incluindo Three.js) são servidos localmente a partir do pacote estático.
- O CSS contém uma referência a Google Fonts (`Inter` e `Outfit`) via `@import url('https://fonts.googleapis.com/...')`. Esta é uma **dependência estética degradável**: em ambiente offline real sem rede, as fontes web não carregarão e o navegador usará o fallback `system-ui, sans-serif`. A funcionalidade e a legibilidade do e-book não são afetadas.
- O HTML contém referências a URLs fictícias de exemplo (`https://exemplo.edu/estacaoN`) como conteúdo pedagógico textual. Estas não são chamadas de rede.
- O HTML contém namespaces SVG (`xmlns="http://www.w3.org/2000/svg"`), que são declarações XML padrão e não constituem dependência de rede.
- **Não é correto afirmar "zero referências externas"**, pois a referência a Google Fonts existe. O correto é afirmar: "sem rede obrigatória para funcionamento; a única referência externa é a importação de fontes web, que degrada graciosamente para fontes do sistema".

---

## 6. Limites

| Aspecto | Status |
|---------|--------|
| Produto final | ❌ **Não é produto final** — é Release Candidate |
| Simulação molecular | ❌ **Não validada** — representação estritamente qualitativa e pedagógica |
| Validação docente real | ❌ **Não executada** |
| Validação em computadores escolares reais | ❌ **Não executada** |
| Auditoria de acessibilidade com leitores de tela reais | ❌ **Não executada** |
| Precificação | ❌ **Não iniciada** |
| Coleta de dados | ❌ **Não implementada** |
| Persistência (localStorage, sessionStorage) | ❌ **Não implementada** |
| Simulação quantitativa (C4/3E) | ❌ **Não implementada** |
| Dependência de CDN obrigatório | ❌ **Não existe** |
| Modelos 3D externos (.glb, .gltf, .fbx, .obj) | ❌ **Não existem** — modelo é procedural autoral |

---

## 7. Decisão Final

> **DECISÃO: RC1 CONCLUÍDA E PUBLICADA COM SUCESSO COMO RELEASE CANDIDATE DEMONSTRÁVEL. CICLO TÉCNICO DE INTEGRAÇÃO PREMIUM 3D ENCERRADO NESTA ETAPA.**

---

## 8. Próximos Passos Permitidos

Os seguintes passos são recomendados, mas **nenhum deve ser iniciado sem nova autorização explícita**:

1. **Validação em dispositivos reais**: testar o e-book em computadores escolares, tablets e smartphones com diferentes capacidades gráficas
2. **Validação de acessibilidade**: auditar com leitores de tela reais (NVDA, VoiceOver, JAWS) e ferramentas como Lighthouse e axe
3. **Validação docente**: submeter a professores de ciências para avaliação pedagógica
4. **Refinamento comercial**: somente após validações práticas concluídas
5. **Internalização de fontes**: considerar o download e bundling das fontes Google Fonts para eliminar a última referência externa estética

Nenhuma nova feature técnica deve ser implementada sem nova autorização.

---

## 9. Score Final

| Dimensão | Score | Justificativa |
|----------|-------|---------------|
| **Maturidade técnica demonstrável** | **9.0 / 10** | Build estático funcional, 104 testes passando, Three.js procedural autoral, fallback acessível, print CSS, ZIP offline validado. Ponto de melhoria: tree-shaking do Three.js e internalização de fontes. |
| **Governança** | **9.5 / 10** | Sem coleta, sem persistência, sem rede obrigatória, sem modelos externos, disclaimers presentes, PRs formais com revisão, releases versionadas com checksums. Ponto de melhoria: referência residual a Google Fonts como dependência estética. |
| **Prontidão comercial demonstrativa** | **8.5 / 10** | Release candidate publicada com artefatos anexados, modo de uso documentado, PDF de conferência disponível. Ponto de melhoria: falta material de apresentação comercial e landing page dedicada. |
| **Prontidão como produto final** | **6.5 / 10** | Faltam validações reais externas (docente, dispositivos escolares, acessibilidade com leitores de tela). A nota reflete que a qualidade técnica é alta, mas a validação prática com usuários finais não foi executada. |

---

## 10. Artefatos da Release

| Artefato | Nome | Tamanho | Estado |
|----------|------|---------|--------|
| ZIP offline | `ecosabon-premium3d-v0.2.0-rc1-offline.zip` | 142 KB | ✅ Anexado à release (atualizado) |
| PDF conferência | `ecosabon-premium3d-v0.2.0-rc1-conferencia.pdf` | 1.3 MB | ✅ Anexado à release (corrigido — todos os módulos visíveis) |

### Checksums SHA256

```
786bb8058c729694efa507077a6b04e21a3ef7558852a9f45811c6f80f32a4b7  ecosabon-premium3d-v0.2.0-rc1-offline.zip
8cce862882fa6ed3c1caea064ee0d7679e3b15495aed27670a1eb1dc2dbb16fb  ecosabon-premium3d-v0.2.0-rc1-conferencia.pdf
```

### Correção aplicada no print CSS

O PDF de conferência original (v0.1.0 e primeira geração da RC1) exibia apenas a primeira página com conteúdo, com as demais páginas em branco. Causa raiz: o `<link>` para `print.css` no `index.html` não possuía o atributo `media="print"`, fazendo com que o Vite concatenasse as regras de impressão ao CSS principal sem preservar o contexto `@media print`. Correções aplicadas:

1. **`index.html`**: adicionado `media="print"` ao `<link>` de `print.css`
2. **`print.css`**: adicionado `body.js-enabled .ebook-section` ao seletor de impressão para alinhar especificidade com a regra `@media screen`
3. **Geração do PDF**: substituído `--print-to-pdf` do Chrome CLI pelo método CDP `Page.printToPDF` com `Emulation.setEmulatedMedia({ media: 'print' })`, que aciona corretamente `@media print`

---

## 11. Releases do Projeto

| Tag | Nome | Tipo | Data | Status |
|-----|------|------|------|--------|
| `ecosabon-demo-v0.1.0` | EcoSabon Web-Book Demo v0.1.0 | Release | 2026-06-20 | ✅ Preservada |
| `ecosabon-premium3d-v0.2.0-rc1` | EcoSabon Web-Book Premium 3D v0.2.0-rc1 | Pre-release | 2026-06-22 | ✅ Publicada |
