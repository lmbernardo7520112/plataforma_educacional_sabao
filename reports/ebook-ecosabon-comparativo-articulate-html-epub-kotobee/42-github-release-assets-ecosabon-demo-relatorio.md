# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 42: Relatório de Criação de GitHub Release e Publicação de Assets

**Release Tag:** `ecosabon-demo-v0.1.0`  
**Título da Release:** `EcoSabon Web-Book Demo v0.1.0`  
**Commit Alvo (HEAD da Main):** `ef74967796f61ad72ef62b7a596e73d6d1a21676`  
**Link da Release:** `https://github.com/lmbernardo7520112/plataforma_educacional_sabao/releases/tag/ecosabon-demo-v0.1.0`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** ✅ CONCLUÍDO (Release publicada e assets anexados)  
**Data:** 2026-06-20  

---

### 1. Resumo da Ação
Em conformidade com as regras estritas de governança do projeto EcoSabon, foi criada uma **GitHub Release** técnica a partir do commit de fechamento da branch `main`. Esta abordagem permite disponibilizar o pacote local compacto e o PDF de conferência técnica aos avaliadores de forma pública, sem versionar arquivos binários pesados no histórico Git da branch `main`.

---

### 2. Assets Anexados e Checksums SHA256

Os seguintes arquivos de distribuição gerados localmente na pasta `release/` foram publicados como assets de release:

1. **`ecosabon-webbook-demo-local.zip`**
   * **Tamanho:** 30.44 KiB (31.166 bytes)
   * **Checksum SHA256:** `25b12a071608f8c5284653c33c7c81e869201fbb2e7628a7afe83d99127f670f`
   * **Função:** Pacote estático autônomo do e-book interativo para execução e demonstração local/offline.

2. **`ecosabon-webbook-pdf-conferencia.pdf`**
   * **Tamanho:** 308.27 KiB (315.669 bytes)
   * **Checksum SHA256:** `e9d3875104976c2700a4a18bc6ddf8959829ebf56b301b7bdf02050ffa3ef82a`
   * **Função:** PDF linear de conferência gerado com base nas regras estritas de estilos de impressão do CSS (`print.css`), exibindo todos os módulos do e-book com os hotspots de saponificação expandidos em formato de lista descritiva.

---

### 3. Portões de Segurança e Validação Técnica

* **Status dos Testes Unitários/Fumaça:** ✅ **75/75 testes passando** com sucesso em ambiente local.
* **Governança de Código e Histórico Git:**
   * **Rastreabilidade da pasta `release/`:** Confirmado por `git ls-files release/` que a pasta não está rastreada.
   * **Rastreabilidade de ZIP/PDF:** Nenhum arquivo ZIP ou PDF foi adicionado ao índice Git ou commitado na branch `main`.
   * **Bloqueios Funcionais:** Confirmada a ausência de simulações com range inputs (C4/3E), renderizadores 3D complexos, ou integração com rede e persistência.
   * **Placeholders Pedagógicos:** Preservação estrita dos placeholders de teste (`DADOS FICTÍCIOS` e referências a habilidades `BNCC`).

---

### 4. Recomendações de Uso e Distribuição

A GitHub Release criada fornece o canal oficial de entrega técnica das versões de homologação estática do e-book EcoSabon. Recomenda-se:

1. **Demonstração do E-book:** Utilizar o link do ZIP da release para distribuir o protótipo offline aos revisores pedagógicos e técnicos. O manual de instruções para inicialização local de servidores HTTP simples (`python -m http.server`, PHP ou Node) está incluído no pacote e detalhado no [Documento 40](40-instrucoes-apresentacao-offline.md).
2. **Leitura Contínua e Arquivamento:** Utilizar o PDF de conferência técnica para leitura estática direta, impressão ou registro documental de gates.
3. **Próxima Etapa do Projeto:** Com a modularização de scripts finalizada e o canal de release documental consolidado na `main`, a infraestrutura está robusta para futuras etapas autorizadas do roteiro de desenvolvimento.
