# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 05: Avaliação Técnica e Viabilidade do Kotobee Author

Este documento detalha os testes de extração, análise de binários, requisitos de dependências e avaliação de riscos do software autoral **Kotobee Author v1.9.7**, confrontando-o com as soluções baseadas em HTML customizado e Articulate Rise.

---

### 1. Inventário do Conteúdo do Arquivo ZIP

O arquivo baixado `kotobeeauthor-1.9.7-ubuntu64.zip` foi descompactado na pasta local `/home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/tools/kotobeeauthor/`. O conteúdo revelou a seguinte composição:

1. **`README.txt`:** Arquivo com instruções básicas de instalação que recomendam instalar o pacote `.deb` no Ubuntu.
2. **`kotobee-author.deb`:** O instalador binário empacotado para sistemas Debian/Ubuntu (165 MB).
3. **`patch/`:** Diretório contendo scripts para correção de dependências.

#### Análise da Extração do Pacote DEB
Para evitar alterações destrutivas ou instalações globais que pudessem desestabilizar o sistema do usuário, o pacote `.deb` foi extraído localmente na pasta `extracted/` através de comandos de extração de arquivo (`dpkg -x`):
* Estrutura interna em `/tools/kotobeeauthor/extracted/opt/kotobee-author/`:
  * Contém a aplicação baseada em **NW.js** (antigo node-webkit), versão de Chromium empacotado com Node.js runtime.
  * O executável binário principal é o arquivo `nw` (`sizeBytes: 222288`).
  * Contém bibliotecas compartilhadas locais em `lib/`, componentes do Chromium em `locales/` e o código-fonte empacotado em `resources.pak` e `package.json`.

---

### 2. Tentativa de Execução e Limitações do Ambiente

Para fins de avaliação de ajuda ou versão, tentou-se executar o binário do Kotobee Author localmente a partir de um subprocesso de console:

```bash
cd tools/kotobeeauthor/extracted/opt/kotobee-author
./nw --help
```

#### Resultado do Log de Execução (Task-887)
A execução falhou no console e retornou erros característicos de falta de ambiente gráfico e sandbox:

```text
LaunchProcess: failed to execvp: nacl_helper
[544725:544725:0617/233626.763106:ERROR:nacl_fork_delegate_linux.cc(329)] Bad NaCl helper startup ack (0 bytes)
[544802:544802:0617/233627.628823:ERROR:sandbox_linux.cc(376)] InitializeSandbox() called with multiple threads in process gpu-process.
[544802:544802:0617/233633.005010:ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for 1 times!
```

#### Diagnóstico Técnico
1. **Dependência de Servidor Gráfico (X11/Wayland):** Sendo um aplicativo baseado em Chromium/NW.js, o Kotobee Author exige a presença de um servidor gráfico ativo (`DISPLAY` definido). Executar o binário de forma headless (via terminal remoto puro) falha pois ele tenta renderizar a janela de design gráfico da interface.
2. **Obsolecência Tecnológica (Chromium v92):** O NW.js empacotado no Kotobee v1.9.7 é baseado no Chromium 92 (de 2021). Isso causa problemas de compatibilidade e segurança em sistemas Linux modernos que utilizam versões de kernel e bibliotecas C (`glibc`) mais recentes.
3. **Dependência de Sandboxing de Terceiros (NaCl):** O NaCl (Native Client) do Chromium falha ao inicializar sem permissões de namespace de usuário configuradas no Linux local.

---

### 3. Requisitos e Dependências Globais do Sistema

De acordo com o manifesto de controle do pacote, para o Kotobee Author funcionar com todas as suas funcionalidades (especialmente importação de PDF e exportações), o sistema operacional exige a instalação global de ferramentas adicionais via gerenciador de pacotes (`apt`):

1. **`pdf2htmlEX`:** Utilitário global exigido para converter arquivos PDF de entrada em representações HTML limpas e vetoriais de e-book. Ele está ausente e é de difícil compilação em distribuições modernas do Ubuntu, pois depende de bibliotecas descontinuadas (como `poppler` antigas).
2. **`wkhtmltopdf`:** Utilitário baseado no WebKit para converter arquivos HTML do e-book em PDF.
3. **Bibliotecas de Sistema:** Exige `libnss3`, `libatk1.0-0`, `libgconf-2-4` e `libxss1`.

> [!WARNING]
> **Risco de Governança de Instalação:** Instalar essas ferramentas de forma global exige privilégios de administrador (`sudo`). Devido à incompatibilidade de pacotes legados (especialmente o `pdf2htmlEX`), forçar essa instalação em distribuições modernas do Linux pode quebrar repositórios de sistema ou forçar o downgrade de pacotes essenciais.

---

### 4. Kotobee Author na Criação de E-books Ricos e Interativos

#### Potencialidades da Ferramenta
* **Efeito Page-Flip Realista:** Ele é excelente para criar e-books que emulam a virada de páginas física no navegador.
* **Componentes H5P e Multimídia:** Oferece interface WYSIWYG simples para arrastar e soltar imagens, áudio, vídeos e criar pequenos testes interativos (múltipla escolha, arraste e solte) sem programar.
* **Exportação Multiformato:** Permite exportar o mesmo livro digital para EPUB, Web-book (HTML/JS empacotados), aplicativos móveis (Android/iOS) e desktop (Windows/macOS).

#### Limitações e Desvantagens para o EcoSabon
* **Ferramenta Proprietária Fechada:** Embora salve arquivos no formato EPUB modificado, o arquivo de projeto é proprietário. O código gerado é redundante e pesado.
* **Interatividade Rígida:** Não suporta de forma simples a lógica personalizada do EcoSabon, que requer um cálculo de estequiometria reativo com base na massa de óleo filtrado e a verificação automática de um checklist de 14 critérios Go/No-Go que atualiza o status de aceite. Adaptar isso no Kotobee exigiria abrir o código HTML interno gerado e injetar JS manualmente, anulando a facilidade da interface visual.
* **Custo de Licença:** A versão gratuita insere marcas d'água agressivas nos e-books e limita severamente o número de páginas e exportações. Licenças completas exigem pagamentos em dólar.

---

### 5. Tabela Comparativa: Kotobee vs Articulate vs HTML Próprio

| Recurso / Dimensão | HTML/CSS/JS Próprio | Articulate Rise 360 | Kotobee Author |
|--------------------|:-------------------:|:-------------------:|:--------------:|
| **Propriedade do Código** | 100% Livre / Código Aberto | Fechado (SaaS Proprietário) | Fechado (Licença Comercial) |
| **Custo de Licenciamento** | Zero | Altíssimo (Assinatura Anual) | Médio (Licença Vitalícia Individual) |
| **Customização da Lógica** | Ilimitada (JavaScript Nativo) | Muito Baixa (Componentes Fixos) | Baixa (Necessita injeção manual) |
| **Qualidade Visual** | Customizável via CSS | Excepcional / Automatizada | Mediana (Baseada em templates) |
| **Dependência de Software** | Nenhuma (Apenas VS Code/Git) | Total da Nuvem Articulate | Total da Ferramenta Local |
| **Impressão Otimizada (A4)** | Excelente (via `@media print`) | Péssima (PDF esticado 140 pág) | Mediana (Layout de leitor fixo) |

### 6. Recomendação Final sobre o Kotobee Author

**Recomenda-se que o Kotobee não seja adotado como rota principal neste momento, mantendo-se apenas como referência visual ou ferramenta exploratória caso testado em ambiente gráfico local.**

As limitações de compatibilidade em sistemas Linux modernos, a necessidade de instalação de dependências globais legadas e invasivas no sistema operacional, a barreira do custo de licença proprietária e a impossibilidade de manter um fluxo de trabalho baseado em versionamento por Git justificam o posicionamento do Kotobee como ferramenta secundária/exploratória. A evolução do HTML próprio, mimetizando o alto nível de acabamento editorial, boa hierarquia visual, ritmo de leitura e uso qualificado de espaços brancos do Articulate Rise, é tecnicamente mais limpa, segura e alinhada com as boas práticas de governança de software acadêmico.
