# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 04: Avaliação Estrutural e Crítica do EPUB3

Este documento apresenta a auditoria técnica da versão EPUB do e-book **EcoSabon**, identificando sua arquitetura de empacotamento, qualidade de estilização, severas limitações de interatividade e fornecendo a recomendação final de governança sobre o uso deste formato.

---

### 1. Estrutura Interna e Arquitetura do EPUB

O arquivo `ecosabon-ebook.epub` foi descompactado e inspecionado em uma estrutura de diretórios isolada. A análise revelou a seguinte composição de arquivos:

```text
tools/epub_temp/
├── mimetype (Declara o tipo MIME do arquivo: application/epub+zip)
├── META-INF/
│   ├── container.xml (Define o caminho para o arquivo de metadados principal)
│   └── com.apple.ibooks.display-options.xml (Configurações específicas para Apple Books)
└── EPUB/
    ├── content.opf (Arquivo de manifesto de metadados e espinha dorsal do livro)
    ├── toc.ncx (Sumário legado para compatibilidade com leitores EPUB2)
    ├── nav.xhtml (Sumário semântico estruturado para leitores EPUB3)
    ├── styles/
    │   └── stylesheet1.css (Folha de estilos gerada na conversão)
    └── text/
        ├── title_page.xhtml (Página de rosto e capa)
        └── ch001.xhtml (Arquivo contendo TODO o corpo do e-book)
```

#### Falha Crítica de Divisão Física (Monólito)
O maior problema estrutural encontrado está no arquivo `EPUB/text/ch001.xhtml`. O e-book inteiro (com seus 4 módulos, rubricas de governança, formulários de validação, checklist final e 5 anexos extensos) foi agrupado em um **único arquivo monolítico de 1.249 linhas (47.4 KB)**.
* **Impacto Técnico:** Isso viola a recomendação oficial do IDPF/W3C de que os capítulos de um EPUB devem ser divididos em arquivos XHTML individuais (ex: `ch01.xhtml`, `ch02.xhtml`, etc.). Arquivos monolíticos causam gargalos de memória e travamentos em e-readers e smartphones de baixo desempenho durante o cálculo de quebra de página dinâmica.

---

### 2. Metadados e Navegação

* **Metadados (`content.opf`):**
  * O arquivo contém campos corretos para título (`EcoSabon — E-book Interativo de Química Verde e Saponificação`), idioma (`pt-BR`) e metadados de acessibilidade importantes (`accessMode: textual`, `accessibilityFeature: tableOfContents, readingOrder`).
  * Porém, possui placeholders evidentes em campos chave:
    * `<dc:creator id="epub-creator-1">[autor a definir]</dc:creator>`
    * `<dc:publisher>[instituição a definir]</dc:publisher>`
  * Esses placeholders exigem substituição imediata antes de qualquer validação.

* **Navegação (`nav.xhtml` e `toc.ncx`):**
  * O sumário (`nav`) possui apenas um único item mapeado: `EcoSabon — E-book Interativo de Química Verde e Saponificação` apontando para a âncora principal de `ch001.xhtml`.
  * **Problema:** O sumário é inútil para o professor ou avaliador que queira pular diretamente para a "Estação 2" ou para o "Roteiro de Validação". Toda a navegação por seções internas depende do scroll contínuo e exaustivo.

---

### 3. CSS e Perda de Riqueza Gráfica

A folha de estilos `styles/stylesheet1.css` foi gerada automaticamente pelo motor de conversão (Pandoc).
* **Perda do Visual Premium:** As regras de CSS flexbox, grids tridimensionais do diagrama de sala de aula e efeitos de desfoque de fundo (backdrop-filter) do protótipo HTML foram achatados ou descartados.
* **Visual Inconsistente:** Em leitores como o Calibre ou Google Books, o layout assume uma aparência de documento de texto corrido cru, sem hierarquia cromática de destaque para alertas de segurança ou conceitos químicos.
* **Quebra de Tabelas:** A tabela de rubricas de governança e as tabelas comparativas perdem a largura de coluna em telas pequenas de smartphones, forçando barras de rolagem horizontais horrorosas ou quebra de palavras.

---

### 4. Limitações Críticas de Interatividade

A maior perda da versão EPUB em relação ao HTML original ocorre nas dinâmicas de e-learning interativo:

1. **Destruição do Efeito de Revelação (Disclosure):** As caixas interativas "Plano B" e "Erro Comum", que no HTML ocultam o texto até que o usuário clique no botão para expandir (promovendo a reflexão didática do professor), foram forçadas a um estado aberto permanente (`style="display: block;"`). O suspense pedagógico é totalmente desfeito.
2. **Formulários e Likert Estáticos:** A escala Likert do formulário de validação docente (que coleta notas de 1 a 5) perdeu seus botões do tipo radio interativos. Eles foram renderizados como caracteres textuais estáticos inertes: `( ) 1     ( ) 2     ( ) 3...`. O usuário não consegue interagir ou simular o preenchimento.
3. **Mapeamento de Checklist Go/No-Go:** O checklist de conformidade perdeu sua lógica JavaScript associada. Os inputs do tipo checkbox estão visíveis, mas marcá-los não altera o contador de dimensões verificadas (que fica travado estaticamente em "⏳ 0/14 dimensões verificadas").
4. **Perda de Mídia Dinâmica:** O vídeo demonstrativo não pôde ser embutido e os links de anexos viraram âncoras locais que quebram a navegação se o leitor tentar abri-los.

---

### 5. Recomendação Técnica Final

> [!IMPORTANT]
> **Parecer de Engenharia Editorial:** O EPUB3 gerado por conversão simples deve ser tratado como uma **saída acessória secundária de acessibilidade** e **NÃO** como o produto educacional principal.

* **Decisão:** Manter o EPUB como alternativa complementar exclusiva para usuários que necessitam de leitura por sintetizadores de voz específicos de e-readers ou para dispositivos de baixíssima resolução de tela.
* **Ações Corretivas Necessárias (caso decida-se manter a saída complementar):**
  1. Configurar o gerador (Pandoc/Script) para dividir fisicamente o livro em múltiplos arquivos XHTML para cada módulo (ex: `ch01_intro.xhtml`, `ch02_mod1.xhtml`, etc.), corrigindo o monólito.
  2. Substituir placeholders de autor e instituição nos metadados do `content.opf`.
  3. Estruturar o sumário de navegação de forma hierárquica completa no `nav.xhtml`, permitindo acesso direto aos 4 módulos e aos 5 roteiros anexos.
  4. Substituir os blocos que exigiam JavaScript por versões estáticas reescritas de forma elegante e adaptada para leitura sequencial.
