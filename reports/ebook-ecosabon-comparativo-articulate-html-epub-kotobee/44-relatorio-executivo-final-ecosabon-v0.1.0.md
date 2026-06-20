# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 44: Relatório Executivo Final (EcoSabon Web-Book Demo v0.1.0)

> [!IMPORTANT]
> **Identificação Técnica da Release**  
> * **Nome do Produto:** EcoSabon Web-Book Demo v0.1.0  
> * **Tag de Distribuição:** `ecosabon-demo-v0.1.0`  
> * **Target Commit:** `ef74967796f61ad72ef62b7a596e73d6d1a21676`  
> * **Link da Release:** [https://github.com/lmbernardo7520112/plataforma_educacional_sabao/releases/tag/ecosabon-demo-v0.1.0](https://github.com/lmbernardo7520112/plataforma_educacional_sabao/releases/tag/ecosabon-demo-v0.1.0)  
> * **Status:** Versão Demonstrável Homologada (Homologação Pós-Release Aprovada)  
> * **Natureza:** Produto Educacional Digital Demonstrável  
> * **Escopo:** Web-book interativo estático sobre Saponificação, Estequiometria, Química Verde e Rotação por Estações  

---

### 1. Sumário Executivo

O **EcoSabon** é uma plataforma educacional voltada para o ensino gamificado e prático de Química e Física Experimental. Este e-book interativo aborda o problema da aprendizagem de conceitos de saponificação e estequiometria sob os princípios da Química Verde, estruturado pedagogicamente na metodologia ativa de **Rotação por Estações**.

O diferencial pedagógico e técnico do EcoSabon reside em sua arquitetura aberta e portátil, baseada em tecnologias web puras (HTML5, CSS3, JS Vanilla), em oposição a plataformas fechadas e proprietárias (como Articulate Storyline ou Kotobee Reader). O e-book entrega um fluxo dinâmico de leitura e interação adaptado para ambientes escolares reais:
* **Online:** Uma experiência paginada, fluida e com suporte a atalhos de acessibilidade e interatividade assistida.
* **Offline/Impressão:** Uma degradação linear progressiva perfeita, que remove elementos de interface inoperantes e expõe todo o conteúdo explicativo e pedagógico de forma legível.

A versão **v0.1.0** está homologada porque superou todos os portões de segurança técnica e pedagógica (CI/CD aprovado, 75 testes unitários e de fumaça verdes, integridade de checksums verificada). Os limites do produto referem-se à ausência de coleta de dados e simuladores numéricos complexos, mantendo o foco exclusivo em um protótipo de alta fidelidade autônomo e seguro para demonstração.

---

### 2. Entregas Consolidadas

O ciclo de desenvolvimento do protótipo consolidou os seguintes componentes:

| Componente | Tipo de Recurso | Descrição |
| :--- | :--- | :--- |
| **Web-book Core** | HTML/CSS/JS | Código limpo, sem frameworks pesados, otimizado para carregamento instantâneo. |
| **Navegação UX** | JavaScript | Sistema de paginação reativa por módulos/páginas acionado por sidebar e histórico da URL (`popstate`). |
| **Capa Editorial** | Layout CSS | Design moderno com tipografia otimizada e elementos decorativos de Química Verde. |
| **Cartões de Estações** | Componente UI | Painéis descritivos estruturados para as estações de Química Fina (C1). |
| **Infográfico de Saponificação** | SVG Interativo | Diagrama de fluxo de reação (C2) com reativos, produtos e seta de processo. |
| **Hotspots de Saponificação** | Acessibilidade / UI | 8 botões interativos nativos com atributos ARIA para revelar informações técnicas. |
| **Painéis Explicativos Inline** | UI / Acessibilidade | Seções explicativas que se expandem abaixo dos hotspots, garantindo foco único. |
| **Mapa de Estações** | Componente UI | Guia interativo e focável por teclado para navegação espacial (C3). |
| **Checklist Go/No-Go** | Validador UI | Lista interativa de checagem de insumos com resposta visual em tempo real. |
| **Impressão Linearizada** | Folha CSS | `print.css` adaptado para remover componentes de navegação e expandir hotspots. |
| **PDF de Conferência** | PDF estático | Documento de 20 páginas gerado headless via Chrome com os estilos de impressão. |
| **ZIP de Distribuição** | Arquivo compactado | Pacote autônomo limpo com instruções para execução offline. |
| **GitHub Release** | Distribuição remota | Release técnica hospedando os assets ZIP e PDF para controle de integridade. |
| **JS Modularizado** | ES Modules | Lógica JS refatorada em 6 submódulos coesos e mantendo `interactions.js` como fachada. |
| **Testes Automatizados** | Vitest | Suite com 75 testes automatizados cobrindo acessibilidade, UX e fumaça. |
| **Documentos de Governança** | Markdown | 44 relatórios documentando decisões de engenharia, SDD/TDD e auditorias. |

---

### 3. Evidências de Qualidade Técnica

Para certificar a prontidão e segurança de uso do web-book, foram coletadas as seguintes métricas:
1. **Métricas de Testes (Vitest):** ✅ **75/75 testes passando** com 100% de sucesso.
2. **Qualidade do Código JavaScript:** Arquitetura limpa baseada em módulos ES. A fachada de compatibilidade `interactions.js` reexporta funções críticas, garantindo a integridade dos testes e retrocompatibilidade com o script principal `app.js`.
3. **Controle de Dependências:** Nenhuma dependência externa foi adicionada no `package.json` de produção, mantendo a infraestrutura minimalista e portátil.
4. **Governança do Git:** Arquivos binários ZIP/PDF não constam nos commits da branch `main`, permanecendo hospedados fora da árvore Git como release assets públicos com os checksums SHA256 homologados:
   * **ZIP SHA256:** `25b12a071608f8c5284653c33c7c81e869201fbb2e7628a7afe83d99127f670f`
   * **PDF SHA256:** `e9d3875104976c2700a4a18bc6ddf8959829ebf56b301b7bdf02050ffa3ef82a`
5. **Teste de Higiene de Asset:** O pacote local (`.zip`) baixado remotamente foi descompactado e validado. Não contém pastas ocultas `.git`, arquivos `.gitignore` ou a pasta de dependências `node_modules/`.

---

### 4. O que NÃO foi Implementado (Bloqueios e Governança)

De acordo com as restrições estritas do projeto, as seguintes funcionalidades estão explicitamente fora do escopo da versão v0.1.0:

> [!WARNING]
> * **Sem simulação experimental quantitativa (C4/3E):** Não há controladores de sliders, campos numéricos interativos ou lógica de cálculo dinâmico de pH, variação térmica ou consistência física de cura.
> * **Sem persistência local ou de rede:** Ausência de chamadas a APIs de terceiros (`fetch`), banco de dados, `localStorage` ou `sessionStorage`. O e-book é totalmente sem estado (stateless) para máxima segurança de dados.
> * **Sem visualização Molecular Stage (2.5D/3D/4D):** Nenhum renderizador WebGL, biblioteca Three.js ou motores de renderização molecular gráfica 3D foram embarcados nesta versão.
> * **Sem Validação Docente Real:** O protótipo utiliza dados fictícios/placeholders marcados como `"DADOS FICTÍCIOS"` para testes de fumaça e auditoria acadêmica. Nenhuma pesquisa empírica ou validação docente com dados reais foi executada neste ciclo.

---

### 5. Limites Éticos e Pedagógicos

* **Dados Fictícios de Homologação:** A presença das strings `"DADOS FICTÍCIOS"` e tags explicativas `"habilidade BNCC"` no HTML servem apenas para validação técnica dos limites estruturais em testes automatizados. O material não deve ser interpretado como um produto educacional validado cientificamente com professores em sala de aula real.
* **Consentimento e Comitê de Ética:** Qualquer coleta futura de dados de estudantes, docentes ou gestores escolares exigirá o desenvolvimento prévio de um protocolo de pesquisa estruturado e a submissão aos comitês de ética em pesquisa (CEP/CONEP), respeitando o Termo de Consentimento Livre e Esclarecido (TCLE) e as diretrizes da LGPD (Lei Geral de Proteção de Dados).
* **Ausência de Telemetria:** A versão v0.1.0 não coleta telemetria de uso dos alunos ou professores, atuando exclusivamente como um recurso estático demonstrável seguro.

---

### 6. Como Apresentar o Produto com Segurança

Para realizar demonstrações técnicas e acadêmicas de forma estável, siga este roteiro de passos:

1. **Apresentar o Contexto:** Explicar que se trata de uma versão demonstrável técnica homologada (`ecosabon-demo-v0.1.0`) projetada com foco em acessibilidade e portabilidade estática.
2. **Acessar a Release Pública:** Abra a página de releases do repositório no GitHub para mostrar a rastreabilidade do código e dos assets binários anexados.
3. **Instalação e Execução Offline:**
   * Baixe o arquivo `ecosabon-webbook-demo-local.zip` e extraia-o.
   * Inicialize um servidor HTTP local simples de uma linha de comando na pasta extraída (evitando bloqueios de CORS para carregamento de módulos ES):
     ```bash
     python -m http.server 8000
     ```
   * Acesse `http://localhost:8000` no navegador.
4. **Demonstrar Recursos-Chave:**
   * **Navegação Modular:** Clique nos itens da sidebar e demonstre a paginação fluida e a atualização dinâmica do hash na URL (permitindo links diretos para seções).
   * **Hotspots e Painéis Explicativos:** Interaja com o infográfico de saponificação, abrindo os hotspots e mostrando que a abertura de um painel fecha o anterior automaticamente (foco único).
   * **Validação Go/No-Go:** Marque os itens do checklist da Estação 3 para exibir o feedback em tempo real.
   * **Acessibilidade por Teclado:** Navegue utilizando apenas a tecla `Tab` para demonstrar o foco visual visível e ativação de modais por teclado.
5. **Demonstrar Impressão / PDF:** Abra o arquivo `ecosabon-webbook-pdf-conferencia.pdf` para exemplificar a degradação linear progressiva, mostrando como os elementos interativos são convertidos em texto impresso contínuo legível.
6. **Esclarecer os Limites:** Caso surjam dúvidas sobre simulações ou gráficos 3D, declare explicitamente que estas funcionalidades estão bloqueadas na etapa atual de governança para manter a portabilidade e segurança da aplicação.

---

### 7. Recomendações para Banca e Avaliadores

Recomenda-se aos avaliadores técnicos e acadêmicos:
* **Auditoria da Versão:** Avaliar o produto através dos dois assets principais (ZIP para interatividade ativa no navegador e PDF para conferência estática e legibilidade).
* **Rastreabilidade:** Validar a governança do repositório, onde as regras de ignore de binários e os relatórios técnicos comprovam o zelo com a higiene de histórico e conformidade do código-fonte.
* **Classificação:** Classificar o EcoSabon v0.1.0 como um protótipo estático web de alta fidelidade e acessibilidade premium, ideal para compor a base estável de um projeto educacional.

---

### 8. Recomendações para Evolução Futura

Caso o projeto seja selecionado para futuras evoluções, a seguinte ordem de prioridades deve ser respeitada:

1. **Manutenção do Baseline:** Manter a versão `ecosabon-demo-v0.1.0` como a referência de estabilidade intocada.
2. **Planejamento Técnico Prévio:** Qualquer incremento funcional deve passar primeiro por uma fase de design de testes (TDD) e especificação arquitetural antes de qualquer escrita de código.
3. **Molecular Stage (2.5D/3D):** A introdução de componentes gráficos moleculares deve ser planejada apenas após aprovação e em formato opcional e isolado, garantindo que o web-book continue executando sem falhas em computadores escolares mais antigos.
4. **Simulações (C4/3E):** Permanecem bloqueadas até que se desenhe um modelo matemático preciso e compatível com as premissas pedagógicas de estequiometria do e-book.
5. **Desenho de Pesquisa Docente:** Estruturar a validação docente com submissão prévia a comitê de ética (CEP) e termo TCLE antes de expor o material a cenários de coleta de dados de usuários reais.

---

### 9. Score Executivo Final

Abaixo encontra-se a avaliação sóbria e justificada do e-book sob as regras técnicas e pedagógicas da versão v0.1.0:

| Critério | Nota (0–10) | Justificativa |
| :--- | :---: | :--- |
| **Qualidade Técnica** | **9.5** | Código limpo, modular, sem dependências, com 75 testes automatizados robustos e tempo de carregamento excelente. |
| **Qualidade Pedagógica** | **9.0** | Conteúdo estruturado de forma consistente sob a metodologia de Rotação por Estações e premissas da Química Verde. |
| **Acessibilidade** | **9.5** | Excelente implementação de tags ARIA, focos visuais claros, sem barreiras de teclado e compatível com leitores de tela. |
| **Portabilidade** | **10.0** | Pode ser executado em qualquer servidor local estático simples, sem dependências de compilação ou rede ativas. |
| **Impressão / PDF** | **9.5** | A folha de estilos `print.css` garante a linearização sem quebras de layout e gera um PDF limpo e ideal para conferência. |
| **Governança Ética** | **10.0** | Total ausência de scripts de rastreamento ou persistência, garantindo a proteção de dados de estudantes e docentes. |
| **Prontidão para Demonstração** | **9.5** | O produto encontra-se em estado maduro, com release pública e assets íntegros prontos para apresentação a bancas. |
| **Prontidão para Produção Final** | **7.5** | Sendo um protótipo de homologação inicial com placeholders de dados fictícios, exige polimento de conteúdo e revisão final antes de uso comercial/oficial. |
| **Risco Residual** | **0.5** | O único risco residual consiste nas restrições de CORS em conexões locais diretas (`file://`), mitigadas por instruções claras. |

---

### 10. Veredito Final

> [!TIP]
> O **EcoSabon Web-Book Demo v0.1.0** está homologado como versão demonstrável distribuível, com release pública, assets íntegros, testes passando e governança documentada. A versão é adequada para apresentação técnica e acadêmica, desde que seus limites (dados fictícios, sem simulações quantitativas ou coleta de telemetria) sejam comunicados de forma clara e objetiva aos avaliadores.
