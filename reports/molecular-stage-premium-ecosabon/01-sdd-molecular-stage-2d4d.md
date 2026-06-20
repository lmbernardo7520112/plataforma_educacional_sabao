# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 01: Especificação de Design de Software (SDD)

---

### 1. Visão Geral do Molecular Stage

O **Molecular Stage** é planejado como uma camada autoral de visualização molecular qualitativa do processo de saponificação no e-book interativo EcoSabon. Esta feature tem como foco representar de forma rica e acessível como as moléculas de triacilglicerol (óleo) e hidróxido de sódio (NaOH/base) reagem para formar sabão (sais de ácidos graxos) e glicerol.

A especificação adota o conceito de **"4D"**, definido exclusivamente como a **dimensão temporal de animação sequencial por etapas qualitativas**, demonstrando a quebra de ligações e reconfiguração dos átomos ao longo do tempo, em oposição a simulações científicas moleculares dinâmicas em tempo real baseadas em colisões físicas.

---

### 2. Objetivos Pedagógicos
* Auxiliar o estudante a visualizar a transposição química do nível macroscópico (mistura de óleo e soda em estações) para o nível submicroscópico (saponificação em nível atômico).
* Demonstrar os princípios de estequiometria qualitativa por meio da conservação de massa/átomos na reação.
* Ilustrar os preceitos da Química Verde e rendimento atômico elevado do processo.

---

### 3. Escopo da Feature

#### **O que está no escopo:**
* **Visualização Estática SVG:** Representação gráfica qualitativa e limpa das moléculas envolvidas.
* **Estados Visuais de Reação:** Três estados principais estáticos (Início: Reagentes separados; Meio: Quebra das ligações e hidrólise; Fim: Sabão e Glicerol formados).
* **Animação Temporal Sequencial (4D):** Transição suave de frames de animação acionada por controle de etapas (Avançar/Voltar).
* **Acessibilidade Total:** Suporte a leitores de tela contendo descrições textuais ricas de cada estado e navegação completa por teclado.
* **Compatibilidade e Impressão:** Folha de estilos configurada para linearizar os estados visuais da reação em formato de lista ilustrada de etapas, omitindo botões de animação.
* **Redução de Movimento:** Suporte a `prefers-reduced-motion` no CSS, desativando transições de quadros para usuários com sensibilidade vestibular.

#### **O que NÃO está no escopo (Proibições Absolutas):**
* **Sem range inputs, sliders ou controles dinâmicos de parâmetros químicos (C4/3E).**
* **Sem simulação quantitativa:** Não há cálculo dinâmico de estequiometria, pH ou rendimento térmico.
* **Sem WebGL ou 3D pesado:** Proibido o uso de bibliotecas de renderização molecular 3D complexas (Three.js, Unity, Sketchfab ou correlatos). A renderização deve ser baseada em SVGs estáticos leves manipulados via CSS/JS Vanilla.
* **Sem Telemetria ou Persistência:** Nenhuma coleta de progresso ou comunicação com servidores na nuvem.

---

### 4. Requisitos

#### **Requisitos Funcionais (RF):**
* **RF01:** O Molecular Stage deve fornecer controles de navegação por teclado (botões "Etapa Anterior" e "Próxima Etapa").
* **RF02:** O sistema deve alternar entre 3 estados de reação (Reagentes, Transição de Ligação, Produtos).
* **RF03:** A descrição acessível (aria-live) deve ser atualizada em tempo real conforme a etapa exibida.
* **RF04:** A visualização deve conter um painel descritivo textual estático atuando como fallback e facilitando a leitura contínua.

#### **Requisitos Não-Funcionais (RNF):**
* **RNF01 (Portabilidade):** O tamanho total dos scripts do Molecular Stage não deve exceder 15 KiB gzip.
* **RNF02 (Responsividade):** O contêiner gráfico SVG deve se adaptar de forma fluida a diferentes resoluções de tela.
* **RNF03 (Performance):** A animação temporal deve utilizar propriedades CSS aceleradas por GPU (`transform`, `opacity`) para garantir 60 FPS estáveis sem gargalos de CPU.
* **RNF04 (Acessibilidade):** Cumprir as diretrizes WCAG 2.1 AA para foco visual e teclado.
