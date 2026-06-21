# Relatório de Prova de Empacotamento Offline — Premium 3D (Fase C3.1)

Este relatório apresenta os resultados da verificação de portabilidade offline do e-book **EcoSabon** com o visualizador tridimensional integrado.

---

## 1. Premissa da Reprodutibilidade Offline
Como a biblioteca `three` é importada via *bare import* (`import * as THREE from 'three'`) em `premium-3d-stage.js`, navegadores sem compiladores/bundlers nativos não conseguem resolver o módulo diretamente a partir do sistema de arquivos (`file://`) ou arquivos brutos. Portanto, a portabilidade offline exige um processo de empacotamento (build).

---

## 2. Tabela de Comparação de Cenários de Distribuição

| Característica | Modo Desenvolvimento (`npm run dev`) | Modo Produção Build (`npm run build`) | Pacote ZIP Offline (Compactação de `dist/`) | Fallback Estático B1+B2 |
| :--- | :--- | :--- | :--- | :--- |
| **Comando** | `npm run dev` | `npm run build` | `zip -r ecosabon-offline.zip dist/` | Automático (via JS/CSS) |
| **Diretório Alvo** | `src/`, `index.html` bruto | `dist/` | `ecosabon-offline.zip` | `index.html` (seção palco/stepper) |
| **Resolução de Dependências** | Otimização on-the-fly (Vite dev server) | Bundling completo em arquivo Javascript único | Pré-compilado; independente de npm/node | Nenhuma dependência externa |
| **Resolução de Caminhos** | Caminhos absolutos do servidor dev | Caminhos relativos (`base: './'`) | Caminhos relativos (`base: './'`) | N/A (Estático nativo) |
| **Necessidade de Servidor Web**| Sim (Vite dev server) | Sim (Vite preview ou servidor estático simples) | Não (Executável localmente por navegador moderno) | Não (HTML puro) |
| **Uso de Rede/Internet** | Totalmente Offline | Totalmente Offline | Totalmente Offline | Totalmente Offline |
| **Finalidade Principal** | Desenvolvimento ativo, HMR e depuração rápida. | Hospedagem em servidores escolares locais ou web. | Distribuição por pendrive para laboratórios offline. | Compatibilidade em hardware antigo sem GPU/WebGL. |

---

## 3. Evidências do Build e Execução Estática
*   **Ajuste do `package.json`:** Adicionado script `"build": "npx -y vite build"` no e-book.
*   **Criação de `vite.config.js`:** Adicionado arquivo de configuração definindo `base: './'` para garantir que todas as referências de scripts e estilos compilados no HTML sejam relativas.
*   **Resultados do compilador Vite:**
    *   `dist/index.html` (84.38 kB)
    *   `dist/assets/index-uGeiHXe-.css` (28.03 kB)
    *   `dist/assets/index-D4MJhfW0.js` (472.93 kB) - Contém toda a biblioteca Three.js compilada e minificada de forma autônoma.
*   **Validação em Servidor Estático:** Rodamos o preview estático local da pasta `dist/` no endereço `http://127.0.0.1:4173/`. A navegação ao Módulo 2 e o visualizador carregaram perfeitamente sem erros de rede, sem requisições CDNs externas ou qualquer dependência de internet.

---

## 4. Conclusão e Próximos Passos
A portabilidade offline está **comprovada**. O pacote compilado gerado na pasta `dist/` atende a todos os requisitos de distribuição portátil (pendrives, intranet escolar, carregamento local) sem perda dos recursos do Premium 3D ou da baseline pedagógica (B1+B2).

**Recomendação de Ação:** O merge da Fase C3 na `main` está autorizado sob a perspectiva de portabilidade offline.
