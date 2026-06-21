# Homologação do Pacote Offline — Premium 3D (Fase C3.2)

Este documento homologa a distribuição offline do e-book **EcoSabon** com o visualizador tridimensional integrado.

---

## 1. Objetivo da Fase C3.2
Homologar formalmente o pacote offline, demonstrando que o build Vite gera uma estrutura estática portável em ZIP, sem requisições a redes externas ou CDNs, preservando intactos o Palco Molecular (B1) e o Sequenciador 4D (B2) como baseline.

## 2. Comandos Executados
*   **Build Oficial:**
    `npm run build --prefix ebook-ecosabon-prototipo`
*   **Validação de Servidor Simples:**
    `python3 -m http.server 4180 --bind 127.0.0.1` (sobre a pasta `dist/`)
*   **Criação do ZIP Offline:**
    `cd ebook-ecosabon-prototipo/dist && zip -r ../../local_release/ecosabon-premium3d-offline-dist.zip .`
*   **Inspeção de Integridade do Repositório:**
    `git status --ignored` e `git ls-files`

## 3. Resultado dos Testes e Build
*   **Testes Unitários:** Todos os 104 testes da suíte automatizada estão **passando com sucesso** (Vitest).
*   **Build de Produção:** Compilação concluída com sucesso em 1.69 segundos.
*   **Medição de Tamanhos de Arquivos (`dist/`):**
    *   `dist/index.html`: **84.38 kB**
    *   `dist/assets/index-uGeiHXe-.css`: **28.03 kB**
    *   `dist/assets/index-D4MJhfW0.js`: **472.93 kB** (Three.js compilada e embutida localmente).

## 4. Teste em Servidor Estático Simples
O comportamento do build foi exaustivamente inspecionado por um subagente de navegação no servidor local Python na porta `4180`:
*   A página inicial e a paginação por módulos funcionam normalmente.
*   A transição para o Módulo 2 exibe o contêiner 3D renderizando as moléculas coloridas (Triglicerídeo em verde, NaOH em vermelho/cinza, Sabão em azul e Glicerol em laranja).
*   A interatividade (mouse drag, setas direcionais, zoom com `+`/`-`) e botões de câmera funcionam perfeitamente.
*   Nenhum erro de script ou aviso de recurso quebrado foi reportado no console.

## 5. Teste via Protocolo `file://` (Local Direto)
*   **Comportamento:** A abertura direta do arquivo `dist/index.html` no navegador via `file://` **falha** no carregamento do Javascript principal.
*   **Mensagem de Erro:** `Access to script at 'file://.../assets/index-D4MJhfW0.js' from origin 'null' has been blocked by CORS policy.`
*   **Justificativa Técnica:** Trata-se de uma restrição nativa de segurança (CORS) aplicada por navegadores modernos a módulos ES (`type="module"`) carregados localmente a partir de arquivos.
*   **Aviso de Governança:** O modo oficial suportado de distribuição offline é exclusivamente por servidor local estático a partir do diretório `dist/`, ou via encapsulamento em contêiner nativo (como Electron ou WebView de aplicativo), e não por abertura direta via `file://`.

## 6. Pacote ZIP Offline (local_release)
Compactado com sucesso:
*   **Caminho do arquivo:** `local_release/ecosabon-premium3d-offline-dist.zip` (não versionado).
*   **Tamanho final do ZIP:** **141 KB** (extremamente otimizado para distribuição offline por pendrive ou intranet).
*   **Conteúdo do ZIP:** `index.html` e a pasta `assets/` contendo o bundle unificado de CSS e JS.

## 7. Confirmação de Governança
*   **Não Versionados:** Confirmado que a pasta de build `dist/`, a pasta temporária de lançamentos `local_release/`, screenshots e logs brutos foram ignorados pelo Git e permanecem estritamente fora do repositório.
*   **Sem CDNs/Modelos:** Nenhuma chamada a dependências de rede dinâmicas ou carregamento de arquivos tridimensionais proprietários externos (`.glb`/`.gltf`).
