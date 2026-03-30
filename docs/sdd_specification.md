# EcoSabon — Especificação Formal Completa (SDD)

*Nota: Este documento adota a metodologia Specification Driven Development (SDD) e será a fonte primária da verdade para as equipes de Produto, Pedagogia, Design e Engenharia.*

---

## SEÇÃO 1 — VISÃO DO PRODUTO

**Nome da Plataforma:** EcoSabon

**Declaração de Visão:**
Ser o ambiente virtual definitivo de aprendizagem, investigação e experimentação científica para estudantes do ensino básico, transformando um passivo ambiental (óleo de cozinha usado) em um elemento ativo de transformação socioeducacional através de uma jornada gamificada, interdisciplinar e de alto rigor tecnológico.

**Problema Educacional, Científico e Ambiental Resolvido:**
* **Ambiental:** O descarte incorreto do óleo de cozinha usado contamina milhares de litros de água, impermeabiliza o solo e danifica redes de esgoto.
* **Científico/Educacional:** O ensino de Ciências Naturais (Química, Física e Biologia) frequentemente falha em conectar a teoria matemática/abstrata com aplicações práticas e significativas. Faltam laboratórios físicos equipados na maioria das escolas e ferramentas de medição adequadas.
* **Solução:** O EcoSabon resolve essa tríade ao guiar o aluno por um processo de fabricação real de sabão, suportado por um laboratório digital que registra, analisa e valida cada etapa, ancorando a prática empírica em sólida teoria científica.

**Proposta de Valor:**
Para o estudante, o EcoSabon é uma jornada investigativa, gamificada e recompensadora, onde ele atua como um verdadeiro cientista e engenheiro ambiental. Para o professor e a escola, é uma plataforma pronta para uso, baseada em BNCC/metodologias ativas, que automatiza a avaliação de competências complexas e fornece analytics do desenvolvimento científico da turma.

**Público-Alvo:**
* **Primário:** Estudantes do Ensino Fundamental II (anos finais) e Ensino Médio.
* **Secundário:** Professores de Ciências, Química, Física e Biologia.
* **Terciário:** Gestores escolares e coordenação pedagógica.

**Contexto de Uso:**
A plataforma será utilizada primariamente em ambiente escolar (salas maker, laboratórios de informática, ou via mobile na sala de aula/pátio), complementando a execução física do experimento. Serve como diário de bordo antes, durante e após a fabricação manual do sabão.

**Diferenciais Pedagógicos, Científicos e Tecnológicos:**
* **Integração Real/Virtual:** Não é apenas um simulador; é uma ferramenta de instrumentação e registro de um experimento físico real (fabricação do sabão).
* **Dupla Abordagem Tecnológica:** Operacional tanto com instrumentação didática IoT (Versão A - Sensores) quanto por inferência qualitativa (Versão B - Simplificada), garantindo equidade de acesso.
* **Gamificação Intrínseca:** O avanço na trilha depende de evidências reais (fotos, tabelas de pH, medição de temperatura), não apenas de cliques.
* **Fundamentação SDD:** Arquitetura limpa reflete a pedagogia estruturada, garantindo que regras de negócio reflitam regras científicas.

---

## SEÇÃO 2 — PRINCÍPIOS METODOLÓGICOS

A engenharia e formatação da plataforma "EcoSabon" baseiam-se em quatro pilares metodológicos:

**1. Specification Driven Development (SDD):**
Toda regra de negócio, comportamento de tela, lógica de gamificação ou cálculo científico deve estar explicitamente definido em uma Especificação antes de qualquer linha de código. O fluxo é: `Requisito → Especificação → Critério de Aceitação → Código`.
* *Justificativa:* Evita "achismos" de desenvolvedores traduzindo mal conceitos químicos de pH e solubilidade.

**2. Model Text Protocol (MTP):**
O intercâmbio de informações entre agentes (humanos e artificiais), componentes de software e IA generativa (se usada futuramente para avaliações textuais) será formatado usando MTP. Isso garante que as descrições científicas geradas ou consumidas sejam estruturadas, previsíveis e validadas por parser textual, evitando ambiguidades entre a camada pedagógica e a camada de software.

**3. Clean Code & Clean Architecture:**
Separação estrita de responsabilidades. O motor de validação pedagógica ("Core Domain") não saberá se os dados vêm de uma requisição HTTP, de um sensor IoT MQTT, ou de uma input manual no React.
* *Justificativa:* Permite a paridade das versões A (sensores) e B (manual) sem reescrever a lógica de avaliação da qualidade química do sabão.

**4. TDD (Text Driven Development):**
Desenvolvimento guiado por especificações textuais e testes de aceitação claros. No contexto do EcoSabon, os testes não validam apenas funções matemáticas, mas critérios pedagógicos. 
*Exemplo:* O TDD validará se, caso o aluno digite uma temperatura acima de 80°C (risco de fervura excessiva do óleo), o sistema acionará o alerta de segurança obrigatoriamente *antes* de prosseguir para a etapa de mistura da soda.

**Rastreabilidade:**
Os *Artefatos Textuais Obrigatórios* (Seção 18) serão numerados e integrados. Um artefato "Protocolo de Segurança Térmica" rastreia para o Requisito Funcional "RF-012" que rastreia para a Feature "Alertas de Risco" no Backlog, culminando num componente React `<ThermalAlert />` coberto por testes unitários.

---

## SEÇÃO 3 — OBJETIVOS DO PRODUTO

**Objetivo Geral:**
Fornecer um ecossistema digital completo (web/mobile responisvo) que orquestre, registre e valide o processo de fabricação de sabão ecológico nas escolas, garantindo rigor científico, engajamento e segurança.

**Objetivos Específicos:**
* Guiar o passo a passo experimental, desde o EPI até o tempo de cura do sabão.
* Capturar dados quantitativos (temperatura, massa, tempo) e qualitativos (cor, textura, fotos).
* Fornecer feedback avaliativo contínuo sobre os resultados da reação.
* Comparar a eficiência de diferentes formulações.

**Resultados Educacionais Esperados:**
* Compreensão empírica dos conceitos de saponificação, entalpia, bases fortes e polímeros.
* Desenvolvimento de letramento científico (capacidade de formular hipóteses e registrar métodos).
* Conscientização ambiental tangível por meio do cálculo de impacto positivo (litros de água poupados).

**Resultados Técnicos Esperados:**
* Plataforma de alta disponibilidade (>99%), rápida (<2s Time To Interactive) e acessível.
* Base de dados estruturada que permita *machine learning* pedagógico futuro para prever áreas de dificuldade dos alunos.

---

## SEÇÃO 4 — ESCOPO E NÃO ESCOPO

**Dentro do Escopo do MVP (Ver Seção 19):**
* Cadastro e gestão básica de turmas pelo professor.
* Trilha pedagógica gamificada da fabricação (Versão B - Simplificada predominantemente, base da Versão A).
* Diário de bordo experimental (upload de fotos e entrada manual de dados escalares).
* Lógica estática de validação de resultados (comparações matemáticas simples via backend).
* Dashboard gamificado (badges) do aluno e visualização em tabela para o professor.

**Dentro do Escopo do Produto Evolutivo:**
* Integração nativa e tempo real com hardware (Versão A - Bluetooth/MQTT de microcontroladores enviando dados de sensores de temperatura/pH ao EcoSabon).
* Relatórios em PDF gerados dinamicamente para Mostras Científicas.
* Módulo social: Competição ou colaboração interescolar ("Ranking de Água Salva").
* Correção de hipóteses textuais baseada em IA generativa educacional.

**Fora do Escopo (Não fazer):**
* E-commerce para venda do sabão produzido.
* Módulos para gerenciar disciplinas que não sejam relacionadas à experiência do sabão.
* Fabricação ou homologação do hardware físico (a plataforma APENAS recebe dados, não desenvolve o robô C++).
* Integração com Sistemas de Gestão Escolar (SIGE/ERP) — a plataforma atua independente.

---

## SEÇÃO 5 — PÚBLICOS E PERSONAS

**Persona 1: Marina, A Estudante Investigadora (14-16 anos)**
* **Perfil:** Nativa digital, acostumada com a recompensa rápida de jogos e redes sociais, acha ciência maçante no quadro-negro.
* **Necessidades:** Reações imediatas do sistema a cada dado inserido. Gamificação que faça sentido (não pontos vazios, mas "desbloqueio de conhecimento"). Tarefas pequenas (`chunking`).
* **Uso da Plataforma:** Visualização mobile. Foco na interface de "Laboratório Digital" e "Registro Fotográfico".

**Persona 2: Professor Carlos, O Facilitador Científico (35-50 anos)**
* **Perfil:** Formado em Biologia/Química, apaixonado pelo ensino prático, mas com pouco tempo de planejamento. Lida com salas de 40 alunos e caos no laboratório.
* **Necessidades:** Organização rápida, alertas visuais se algo der errado ("Grupo 3 adicionou água na soda, RISCO!"), relatórios automatizados para compor nota.
* **Uso da Plataforma:** Dashboard desktop web. Visão macro de todos os grupos ("Painel de Monitoramento").

**Persona 3: Roberta, A Coordenadora Pedagógica**
* **Perfil:** Foco em alcance de currículo (BNCC) e engajamento da comunidade escolar.
* **Necessidades:** Dados quantificáveis para apresentar a diretores ou aos pais sobre o sucesso do projeto maker. Relatórios de interdisciplinaridade.
* **Uso da Plataforma:** Mensal. Dashboard administrativo de "Impacto da Escola" (ex: 50 litros de óleo reciclados).

---

## SEÇÃO 6 — PREMISSAS PEDAGÓGICAS E CIENTÍFICAS

A plataforma operará sob a validação estrita das seguintes premissas acadêmicas:

**1. Fundamentos de Química:**
* **Saponificação:** A plataforma deve validar ativamente os cálculos estequiométricos (Índice de Saponificação). Se o usuário insere 1000ml de óleo, a plataforma deve esperar a resposta de X gramas de $NaOH$.
* **Reagentes e Polaridade:** Diferenciação visual na UI entre solventes apolares (óleo) e polares (água), justificando a ação emulsificante da micela do sabão.
* **pH e Qualidade:** O sabão curado deve ter o pH medido. A UI bloqueará a "Certificação de Qualidade" se o pH estiver muito alcalino (>10), orientando o processo de refação ou espera de cura.

**2. Fundamentos de Física:**
* **Termodinâmica:** A reação da soda cáustica com água é *exotérmica*. A plataforma registrará (manual ou via sensor) e alertará: o recipiente esquenta sem fogo. Este é um dado obrigatório do fluxo.
* **Viscosidade e Mudança de Estado:** O "ponto de traço" (trace) do sabão. O sistema pedirá que o aluno descreva qualitativamente (Versão B) a viscosidade comparada a "maionese" ou "mel" em um determinado tempo.

**3. Biologia e Educação Ambiental:**
* **Fator de Impacto:** O algoritmo central traduzirá todo óleo processado em "Milhões de litros de água poupados" (Fator: 1 litro de óleo contamina até 25.000L).
* **Biodegradabilidade:** Etapa final da jornada ensinará por que o sabão artesanal contamina menos que detergentes sulfatados comerciais.

**4. Metodologia Científica e Rigor:**
* A plataforma não permitirá a técnica de "tentativa e erro desenfreada". O botão "Avançar" só será ativado após o sistema registrar uma Hipótese prévia e uma Coleta de Observação subsequente de acordo com o paradigma hipotético-dedutivo.

**5. Segurança (Segurança Máxima como Regra de Negócio):**
* A ordem universal "Nunca jogue água sobre o ácido/base forte, mas sim o soluto na água" será um *hard block* no fluxo do sistema. Qualquer desvio no registro disparará alertas e invalidará a experiência temporalmente. O sistema de EPIs será validado via *checklist* assinado digitalmente na UI antes do acesso às etapas experimentais.

---

## SEÇÃO 7 — JORNADA PEDAGÓGICA DA PLATAFORMA

A trilha gamificada é estruturada em 9 missões progressivas, bloqueadas sequencialmente:

**Missão 1: O Ciclo da Água e o Inimigo Invisível**
*   **Objetivo:** Compreender o impacto do descarte de óleo na água.
*   **Conteúdos:** Poluição hídrica, tensão superficial, micelas.
*   **Atividade Principal:** Quiz interativo de diagnóstico e simulação visual da gota de óleo na água.
*   **Desafio Gamificado:** "Salvar o primeiro litro de água".
*   **Critérios de Sucesso:** Acerto > 70% no quiz.

**Missão 2: Vestindo o Jaleco (Segurança)**
*   **Objetivo:** Garantir a integridade física na manipulação de bases fortes.
*   **Conteúdos:** EPIs (óculos, luvas, avental), neutralização, ventilação.
*   **Atividade Principal:** Checklist digital assinado pelo aluno e validado (por PIN) pelo professor.
*   **Evidências:** Upload de foto do grupo portando os EPIs.

**Missão 3: A Receita do Alquimista (Planejamento)**
*   **Objetivo:** Matemática aplicada à química.
*   **Conteúdos:** Cálculo de índice de saponificação, concentração, regra de três, conversão de unidades.
*   **Atividade Principal:** Inserir a quantidade de óleo coletado. O sistema solicita que o grupo calcule a quantidade exata de soda (NaOH) e água necessária.
*   **Critérios de Sucesso:** Aluno informa valores de reagentes com margem de erro máxima de ±2%.

**Missão 4: Purificação (Filtração do Óleo)**
*   **Objetivo:** Preparo da amostra.
*   **Conteúdos:** Separação de misturas heterogêneas.
*   **Atividade Principal:** Filtrar o óleo fisicamente para retirar detritos de decantação.
*   **Evidências:** Input qualitativo ("Cor do óleo: Escuro/Claro/Turvo") e foto do filtro.

**Missão 5: O Despertar do Dragão (A Solução de Soda)**
*   **Objetivo:** Reação exotérmica.
*   **Conteúdos:** Dissolução, entalpia, bases fortes.
*   **Atividade Principal:** Registro do aumento de temperatura ao adicionar soda à água (nunca o inverso).
*   **Evidências:** Versão A: gráfico capturado via sensor de temperatura; Versão B: registro manual da temperatura lida no termômetro de vidro com relato descritivo do calor no frasco.

**Missão 6: A Fusão (Saponificação)**
*   **Objetivo:** Compreender a reação de obtenção de um sal orgânico.
*   **Conteúdos:** Ésteres + Base -> Sal orgânico (sabão) + Álcool (glicerina).
*   **Atividade Principal:** Misturar a lixívia ao óleo até atingir o *Trace* (ponto de traço).
*   **Evidências:** Escolha em UI gamificada do estado de viscosidade (Ex: textura de pudim/maionese) + Foto do *trace*.

**Missão 7: Molde e Repouso**
*   **Objetivo:** Solidificação e organização molecular.
*   **Conteúdos:** Mudança de estado físico, cristalização parcial.
*   **Atividade Principal:** Input do peso final bruto no molde. Início do contador regressivo de cura (geralmente 30 dias na vida real - a UI reflete esse calendário).

**Missão 8: O Teste do pH (Controle de Qualidade)**
*   **Objetivo:** Segurança do produto final.
*   **Conteúdos:** Escala de pH, indicadores ácido-base.
*   **Atividade Principal:** Testar o sabão curado com papel tornassol/fita de pH e registrar a cor.
*   **Critérios de Sucesso:** pH entre 8 e 10. Se >10, o próprio sistema acusa "Falha no Lote: Excesso de Base".

**Missão 9: Embaixadores da Água (Culminância)**
*   **Objetivo:** Conclusão ambiental sociável.
*   **Conteúdos:** Biodegradabilidade.
*   **Atividade Principal:** Geração de Certificado apontando a contribuição líquida (Ex: "O Grupo 3 poupou 50.000 litros de água").
*   **Evidências:** Relatório final em PDF gerado para feira de ciências.

---

## SEÇÃO 8 — REQUISITOS FUNCIONAIS

**Módulo de Usuários e Autenticação**
*   **RF-001 (Cadastro/Login):** O sistema deve permitir login via e-mail/senha ou Google OAuth (Aluno/Professor).
*   **RF-002 (Gestão de Turmas):** O professor deve poder criar turmas gerando um Código de Convite (ex: `A7B9`).
*   **RF-003 (Criação de Grupos):** Os alunos, ao entrarem na turma com o código, devem formar "Bancadas" (grupos de 2-5 alunos).

**Módulo de Laboratório Gamificado (Jornada)**
*   **RF-004 (Progresso Travado):** O sistema não deve permitir o acesso da Bancada à Missão $N+1$ sem concluir a Missão $N$.
*   **RF-005 (Upload de Evidências):** O sistema deve permitir o upload de imagens (máx 5MB) nas etapas que exigem fotos (EPIs, *Trace*, papel de pH).
*   **RF-006 (Validador de Cálculos):** O sistema deve receber o array `[Massa_Oleo, Massa_Soda, Massa_Agua]` e aplicar a fórmula estequiométrica em background, retornando Sucesso ou Falha.
*   **RF-007 (Timer de Cura):** O sistema deve registrar um `timestamp` no término da Missão 6/7 e exibir uma barra de progresso em dias (Data Alvo: +30 dias) para liberação da Missão 8.

**Módulo de Sensores vs Simplificado**
*   **RF-008 (Coleta Automática - Versão A):** O sistema deve expor um endpoint/API que receba JSON `{bancadaId, timestamp, temp, ph}` via POST de um ESP32/Arduino, populando a tabela do aluno em realtime.
*   **RF-009 (Coleta Manual - Versão B):** O sistema deve fornecer um formulário web com inputs de UI deslizantes (sliders) para que o aluno reporte temperatura e pH lidos visualmente.

**Módulo do Professor (Dashboard)**
*   **RF-010 (Visão Macro):** O professor deve visualizar uma matriz onde linhas são "Bancadas" e colunas são "Missões 1 a 9", coloridas em verde/amarelo/vermelho (status).
*   **RF-011 (Override/Aprovação Manual):** O professor pode usar um PIN numérico para ignorar uma trava ou aprovar uma etapa que o sistema tenha sinalizado como duvidosa.

---

## SEÇÃO 9 — REQUISITOS NÃO FUNCIONAIS

*   **RNF-01 (Desempenho/Carregamento):** A SPA em React deve carregar o First Contentful Paint em < 2 segundos em redes 3G (foco em escolas com internet precária).
*   **RNF-02 (Acessibilidade):** O frontend deve respeitar a paleta de contraste W3C AA (dark mode garantindo leitura), suportar navegação por tab (teclado) e ter atributos `aria-labels` em todos os botões experimentais.
*   **RNF-03 (Responsividade):** A UI do estudante (laboratório digital) deve ser 100% *Mobile-First*, pois a inserção de dados ocorrerá simultaneamente à atividade com mãos sujas na bancada escolar usando smartphones.
*   **RNF-04 (Segurança de Dados):** Dados de estudantes menores de idade não devem vazar; senhas sob bcrypt(salt de 10) e JWT sessions com short expiration (1h).
*   **RNF-05 (Resiliência Offline):** O PWA deve manter o estado não salvo no `localStorage` caso a rede da escola caia durante o preenchimento da Missão, sincronizando no reestabelecimento ('offline-first approach').
*   **RNF-06 (Armazenamento de Mídia):** Fotos enviadas devem ser comprimidas no cliente (via Canvas API ou lib similar) para no máximo 1024x1024 / JSON para aliviar uso do banco/S3 Amazon e rede local.

---

## SEÇÃO 10 — REGRAS DE NEGÓCIO

*   **RN-001 (Paridade de Ensino):** A *Versão B (Simplificada)* não resultará em dedução de pontuação/badges para o aluno comparada à *Versão A*. Ambas garantem 100% de conclusão.
*   **RN-002 (Hard Block de Segurança Térmica):** A soma da Soda + Água só avança se o usuário afirmar (checkbox afirmativo de risco) que despejou *O Sólido no Líquido*, e não o contrário. Respostas incorretas trazem pop-up vermelho educacional bloqueante.
*   **RN-003 (Cálculo Fator de Impacto):** 1 litro de óleo reciclado = 25.000 litros de água preservados. O sistema sempre apresentará os cálculos multiplicados por este fator na UI de culminância.
*   **RN-004 (Limites Químicos de Sucesso):** Índice de Saponificação base de tolerância deve ser configurado no banco. Margem de segurança de segurança de soda: *Superfatting* sugerido na plataforma de pelo menos 5% (Garantir que sobre óleo e nunca soda no sabão resultante).
*   **RN-005 (Gamificação Acumulativa):** A pontuação escolar não decrementar em tentativas erradas, priorizando a avaliação formativa (aprender com o erro) e não punitiva.

---

## SEÇÃO 11 — FLUXOS PRINCIPAIS

**Fluxo 1: Onboarding do Laboratório (Grupos)**
1.  Aluno abre o EcoSabon Mobile.
2.  Insere o Código da Turma fornecido pelo Professor.
3.  Escolhe seu nome e seleciona a "Bancada X".
4.  É levado à tela inicial gamificada (Mapa da Jornada do Ciclo da Água).

**Fluxo 2: Planejamento Estequiométrico (Missão 3)**
1.  Bancada acessa "A Receita".
2.  Input UI: "Pesamos X gramas de Óleo".
3.  Sistema: Desafio aberto - "Dez gramas de soda saponificam N gramas do óleo atual. De quanta soda você precisará?"
4.  Aluno insere resposta (ex: 135g).
5.  Backend valida: resposta $\in$ [Range Correto]?
6.  (SE SIM): Animação de sucesso (confetes/badge ganha) -> Avança missão.
7.  (SE NÃO): Animação de erro moderado -> Mostra "Dica do Químico" ensinando regra de 3. -> Tenta novamente.

**Fluxo 3: Integração de Sensor (Versão A - Missão 5)**
1.  Professor habilita modo Arduino no seu Dashboard para a Bancada X. Dá aos alunos a API Key temporária.
2.  Na Missão 5, o app diz "Aguardando transmissão do Termômetro Bluetooth...".
3.  Backend recebe POST do Arduino: `{id: 'BancadaX', temp: 82}`.
4.  Sistema via Socket.io/Polling reflete o gráfico subindo na tela do Aluno vivo (Real-time).
5.  Quando atinge estabilidade ou >80°C, a missão conclui.

**Fluxo 4: Verificação de Segurança (Professor)**
1.  Professor em seu tablet vê notificação: "Bancada 3 enviou Foto de EPI".
2.  Clica para expandir a foto.
3.  Aprova rapidamente (Swipe Right) ou Rejeita (Swipe Left informando "Joãozinho está sem óculos").
4.  Se rejeita, o grupo 3 tem a missão 2 reiniciada com alerta do professor.

---

## SEÇÃO 12 — CRITÉRIOS DE ACEITAÇÃO

**CA-1: Trilha Gamificada (Missões e Bloqueios)**
*   **Dado** que a Bancada Y está atualmente na Missão 4
*   **Quando** tentarem acessar o roteiro prático da Missão 5
*   **Então** o sistema deve bloquear o acesso visual e exibir a mensagem "Termine de Filtrar o Óleo antes do Reator" com um cadeado em UI.

**CA-2: Validação de Reagentes Estequiométricos**
*   **Dado** que o input de óleo pesou `1000g` e o índice padrão do banco é `0.135`
*   **Quando** o aluno submeter a massa da soda e a mesma for `145g` (falha na tolerância de 5%)
*   **Então** o sistema deve negar o avanço E retornar um alerta: *"Atenção! Esta formulação está muito cáustica e excedeu a tolerância, tente rever os cálculos"*.

**CA-3: Comportamento Sem Conectividade (Sensibilidade do Local)**
*   **Dado** que o device do Aluno perdeu conexão na Missão 6 (Tempo de Trace)
*   **Quando** ele tirar a foto e clicar "Avançar Missão"
*   **Então** o EcoSabon fará PWA Cache, indicará um ícone flutuante de nuvem cortada (Sync Pendente) e deixará ele iniciar o cronômetro localmente.
*   **E Quando** a internet voltar, deve subir o payload ao banco automaticamente.

**CA-4: Versão A (Sensores)**
*   **Dado** que o endpoint MQTT/REST do sistema recebeu temperatura constante (ex: 5 retornos seguidos de 25°C) no período de reação da base,
*   **Quando** o aluno solicitar "Validar Aumento de Entalpia"
*   **Então** o EcoSabon deve rejeitar a conclusão e informar ao Professor: *"Alerta de Sensor Bancada X: Sem Variação Térmica Detectada"*.

---

## SEÇÃO 13 — ESPECIFICAÇÃO FUNCIONAL DOS MÓDULOS

**1. Módulo Core (Saponification Engine)**
*   **Finalidade:** Módulo isolado, agnóstico a framework, que detém 100% das fórmulas físico-químicas. Representa o *Domain* na Clean Architecture.
*   **Funcionalidades:** `calculateSaponificationValue(oilType, oilMass)`, `validateEnergyRelease(startTemp, currentTemp)`, `evaluatePHTolerance(ph)`.
*   **Critérios de Aceitação:** O módulo deve lançar erro explícito `StoichiometryError` se as proporções fornecidas gerarem uma base cáustica fatal. Coberto 100% por testes unitários no Jest/Vitest.

**2. Módulo Integrador IoT (Versão A)**
*   **Finalidade:** *Gateway* para receber payloads dos Arduinos/ESP32s do laboratório escolar via REST (ou futuramente MQTT).
*   **Funcionalidades:** Autenticação dos nós sensoriais usando JWT temporários. `IngestTemperatureData()`, `IngestPHData()`.
*   **Riscos:** Rede instável na escola causando perda de pacote de dados térmicos. (Mitigação: PWA cache no lado cliente humano preenchendo o buraco).

**3. Módulo "Diário de Bordo" e Evidência Visual**
*   **Finalidade:** Substituto digital do caderno físico do aluno.
*   **Funcionalidades:** Tirar foto in-app, escolher textura visual do traço, entrada manual de Temperatura e Volume (Versão B).
*   **Dependências:** Requere Canvas API para compressão de imagem antes de envio ao backend para não estourar payload da request.

---

## SEÇÃO 14 — ESPECIFICAÇÃO TÉCNICA E ARQUITETURA

A arquitetura do projeto segue os princípios de separação de *Frontend/Backend*, componentização, forte tipagem estática e conteinerização para padronização do ambiente local de times distribuídos.

**1. Visão Geral e Stack Exigida**
*   **Backend:** Node.js (v20 LTS), Express ou Fastify, e *TypeScript*.
*   **Frontend:** React (v19), SSR/SSG opcional, gerenciamento de build por *Vite*, linguagem *TypeScript*.
*   **Banco de Dados:** *MongoDB* (NoSQL document-based, ideal para armazenar diários de bordo com arrays variáveis de fotografias e timelines não rígidas).
*   **Infra/Deploy Local:** *Docker* e *Docker Compose*.

**2. Estrutura de Pastas Sugerida (Monorepo ou Multirepo, exposto como projeto único para a equipe)**

```
ecosabon/
├── backend/
│   ├── src/
│   │   ├── domain/ (Clean Arch: Regras científicas isoladas - Core Engine)
│   │   ├── applications/ (Casos de uso: AvançarMissão, CalcularReceita)
│   │   ├── infrastructure/ (Repos do Mongo, Auth Tokens, Rotas Express)
│   │   └── server.ts
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ (Botões, Timelines, Uploaders)
│   │   ├── core/ (Hooks, Stores - Zustand/Redux)
│   │   ├── pages/ (Login, Dashboard, LabStation)
│   │   └── App.tsx
└── docker-compose.yml
```

**3. Estratégia de API (Comunicação Fr/Bk)**
A comunicação principal será *RESTful JSON*. Para a página de "Monitoramento Docente" e para a "Versão A" (Laboratório Conectado), o sistema implementará WebSockets (`Socket.io`) para que o professor veja os dados dos sensores subindo em tempo real sem precisar atualizar a página.

**4. Modelo de Dados de Alto Nível (MongoDB Collections)**
*   `Users`: _{ _id, role(student/teacher), name, email, passwordHash }_
*   `Classrooms`: _{ _id, teacherId, inviteCode, name, school }_
*   `Workbenches`: _{ _id, classroomId, students[], currentMissionId, lockStatus }_
*   `Journeys`: _{ _id, workbenchId, startTime, mission1Data{}, mission2Data{}, ... }_

**5. Estratégia para Integração de Sensores vs Simplificada**
A abstração no Backend (`IngestDataUseCase`) será cega à origem.
Se a requisição vier do endpoint `/api/v1/sensors/temp`, ela acionará o serviço com uma tag `source: 'hardware'`.
Se vier do Frontend `/api/v1/manual/temp`, acionará com `source: 'manual'`.
A regra de negócio e os ganhos de XP gamificados serão idênticos, garantindo equidade escolar.

**6. Segurança Básica**
*   Políticas severas de CORS (apenas domínios `.ecosabon.net` permitidos).
*   Uploads de fotos de EPIs não devem ser públicos; URLs presigned (ex: `AWS S3`) ou rotas Node bloqueadas por JWT (para os colegas não verem as respostas dos outros).
*   Rate limiting nos endpoints do Arduino (Versão A) para evitar DDoS escolar (um loop quebrado de `delay()` no Arduino de um aluno não deve derrubar o servidor).

---

## SEÇÃO 15 — UX/UI

O design system adotará a estética **"Dark Science"** (Dark Mode, UI imersiva, "Glassmorphism" — desfoque e translucidez). O visual não deve ser infantil, e sim profissional (jovens anseiam usar algo moderno, similar à interface de naves ou games Sci-Fi).

**Diretrizes de UX (Estudante):**
*   **Chunking Cognitivo:** O laboratório apresentará APENAS a missão ativa na tela (foco), obscurecendo (dim) as fases passadas e bloqueando cadeados (lock) nas futuras.
*   **Visualização de Dados Reativos:** Quando o aluno digitar "125g" de soda em um input, uma barra lateral de pH teórico deve responder com uma animação de "verde" (seguro) para "vermelho" (cáustico) em *real-time* no frontend.
*   **Botões Fat Finger:** Na bancada real, o aluno pode estar com a mão no mouse e luvas sujas (hipoteticamente). Os *Tap Targets* devem ser largos, e interações críticas exigem Swipe ou Double Tap ("Deslize para confirmar mistura de soda e água").

**Diretrizes de UI (Professor):**
*   **Clean List:** Visual tabular, alto contraste. Ícones de Warning vermelhos grandes ao lado de grupos que tentaram enviar pH > 10.
*   **Filtros Rápidos:** Botão no topo: "Ver grupos estagnados".

---

## SEÇÃO 16 — DEVOPS, DOCKER E CI/CD

A qualidade técnica é inegociável em desenvolvimento profissional moderno.

**1. Ambiente Local com Docker (DevEx):**
Nenhum programador deve instalar ou configurar instâncias do MongoDB nativamente. O repositório conterá um `docker-compose.yml` que sobe três containers em uma rede virtual:
*   `db`: Imagem oficial do MongoDB.
*   `api`: Node.js rodando o backend em watch mode (Nodemon/ts-node-dev).
*   `client`: O Vite.js servindo o frontend React para HMR.
*Gatilho:* Um único comando `docker compose up` deve prover o ambiente 100% funcional.

**2. Lint e Code Quality:**
*   TypeScript com *Strict Mode = true*.
*   *ESLint* e *Prettier* travados na pipeline via `Husky` (pre-commit hook). Se não formatar o arquivo ou houver erro TS ou alerta no linter ("any" não justificado), bloqueia o commit.

**3. Pipeline CI/CD (GitHub Actions / GitLab CI):**
*   **Build:** Compila TS para JS (Back) e gera pacote Bundle+Minified Vite (Front).
*   **Test:** Roda suíte vitest/jest (Testes no motor de domínio são os mais críticos).
*   **Lint:** Varredura ESLint de segurança.
*   **Deploy (Staging/Prod):** Se a branch for `main`, envia o container Docker para o registry (ex: DockerHub/AWS ECR) e aciona serviço em nuvem. A branch não será mergeada sem CI passar no verde (Vínculo de Status Checks).

---

## SEÇÃO 17 — BACKLOG ESTRUTURADO

**ÉPICO 1: Fundação do Laboratório Digital**
*   *Feature 1.1:* Autenticação e Perfis (Student/Teacher)
    *   *História:* Como professor, quero gerar um código de convite para minha turma. (Pedagógico)
    *   *Tarefa (Tech):* Implementar JWT login.
    *   *Tarefa (UX):* Desenhar tela de Login estilo Sci-Fi/Dark.
*   *Feature 1.2:* Criação de Bancadas (Grupos)
    *   *História:* Como aluno, quero me unir ao Grupo 3 com meu colega.

**ÉPICO 2: Motor Estequiométrico (Domain)**
*   *Feature 2.1:* Validador de Receita (Missão 3)
    *   *História:* Como sistema, quero recalcular a quantidade de NaOH baseada no input de óleo.
    *   *Tarefa (Tech):* Escrever `SaponificationEngine.test.ts` (TDD).

**ÉPICO 3: Trilha de Aulas Práticas (O Backend da Jornada)**
*   *Feature 3.1:* Mecanismo de Avanço Condicional
    *   *História:* Como aluno, só posso ver o reator se eu vesti meus EPIs.
    *   *Tarefa (Tech):* Middleware de bloqueio de rotas se `journeyState < requiredState`.
*   *Feature 3.2:* Upload de Evidências Fotográficas
    *   *Tarefa (DevOps):* Configurar bucket S3 para imagens ou Multer local.

**ÉPICO 4: A Versão IoT (Fase 2 / Evolutivo)**
*   *Feature 4.1:* Endpoint de Ingestão de Telemetria
    *   *Tarefa (Tech):* Criar rota `/telemetry/temp` rate-limited.
    *   *Tarefa (UX):* Desenhar gráfico de linha reativo (Recharts.js).

---

## SEÇÃO 18 — ARTEFATOS TEXTUAIS OBRIGATÓRIOS

Para governar a plataforma técnica e metodologicamente sob SDD, existirão os seguintes artefatos versionados em Git (`/docs`):

1.  **Visão do Produto** (Este documento)
2.  **MTP Base (Model Text Protocol):** Normatiza como IAs/Sistemas devem serializar dados químicos do sabão.
3.  **Protocolo Experimental Padronizado:** O manual "físico" de como a escola deve fazer a aula, refletido na UI.
4.  **Matriz de Avaliação:** Tabela de rubricas (Como a Missão 3 gera nota B+).
5.  **Guia Hard Block de Segurança:** A bula inegociável do uso da soda.
6.  **Guia de Hardware (Versão A):** Como montar o ESP32, esquema Fritzing, script Arduino `.ino`.
7.  **Guia de Contingência (Versão B):** O que fazer se o termômetro escolar quebrar na hora da aula.
8.  **Guia de Arquitetura (Clean Code):** Onde salvar as *entities*, *use-cases* e *adapters*.
9.  **Plano de CI/CD:** Desenho da pipeline do GitHub Actions.

---

## SEÇÃO 19 — MVP (Minimum Viable Product)

**O que ENTRA no MVP (Entrega 1):**
*   Versão B (Simplificada) completa de ponta a ponta.
*   Cadastro de turma, aluno em bancadas.
*   A trilha de 9 missões operando com inputs manuais (slidders de pH, seleção de "textura de pudim").
*   Motor de validação estequiométrica rigorosa no backend.
*   Dashboard tabular simples para o professor.
*   *Justificativa:* O foco é entregar valor pedagógico imediato às escolas sem depender de compra de hardware (gargalo crítico de adoção escolar).

**O que FICA PARA ITERAÇÃO POSTERIOR:**
*   Versão A (Sensores MQTT, gráficos real-time Socket.io).
*   Rankings interescolares na rede municipal.
*   Correção de relatórios por IA Generativa.
*   *Justificativa:* Alta complexidade técnica de infraestrutura que pode atrasar a validação do *Core Loop* (ensinar reações exotérmicas via gamificação).

---

## SEÇÃO 20 — RISCOS, PONTOS CEGOS E MITIGAÇÕES

| Dimensão | Risco / Ponto Cego | Mitigação Sistêmica |
| :--- | :--- | :--- |
| **Segurança Física** | Alunos podem se queimar gravemente com NaOH ignorando os alertas. | Contrato digital in-app. Bloqueio de fluxo "Sódio na Água". Guia explícito exigindo óculos EPI na foto-evidência para liberar o botão Iniciar. |
| **Infra/Técnica** | Wi-Fi da escola cai no meio da reação química. | UX Offline-first (PWA Service Workers ou IndexedDB) que permite preencher a missão e sincroniza fundo na nuvem depois. |
| **Pedagógico** | Aluno clica em "Próximo" sem aprender, como um jogo burro. | Validações assíncronas obrigatórias via motor matemático. Sem chutar "100g de soda" o sistema trava e ensina a regra de três. |
| **UX/UI** | "Fat finger" em telas sujas. Mãos com sabão/luvas estragam touch. | UI projetada com *oversized targets*, uso de scroll ao invés de clique de precisão em momentos críticos. |
| **Sensores** (Futuro) | Termistor do Arduino descalibrado envia 1000°C. | Sanitização (Zod/Joi) pesada no endpoint. Backend rejeita outliers e informa na tela "Calibre seu sensor antes de prosseguir". |

---

## SEÇÃO 21 — CRITÉRIOS DE QUALIDADE E SUCESSO

A plataforma EcoSabon só será considerada **"Excelente"** se atender a:
1.  **Rigor Científico:** Não existe *bugs* de estequiometria. Um químico valida que o sabão gerado na plataforma é seguro e alcalinamente perfeito.
2.  **Profissionalismo de Engenharia:** Código coberto 90% por testes nos *Use Cases*, builds Docker que funcionam em qualquer máquina Mac/Linux/Windows da equipe de base, deploy contínuo livre de intervenção humana (GitOps).
3.  **Aplicabilidade Escolar:** Professor leva menos de 5 minutos para orquestrar e engajar uma sala de 35 alunos indisciplinados no experimento do dia.
4.  **Sustentabilidade (UX):** A métrica base (Fator de Impacto) faz alunos da rede pública perceberem quantitativamente o valor social do projeto.

---

## SEÇÃO 22 — RECOMENDAÇÃO FINAL

Recomenda-se a adoção imediata da **Estratégia Bifurcada Iterativa**:
*   *Curto Prazo (Mês 1-3):* Implementar a Plataforma Web Base e a Versão Simplificada (Inputs Manuais) sob Clean Architecture. Realizar projeto piloto em *uma* escola estadual.
*   *Médio Prazo (Mês 4-6):* Validado o modelo pedagógico gamificado, abrir o endpoint de IoT e acoplar a Versão "Sensorizada" (Arduino). Realizar piloto em feiras de ciências.
*   *Longo Prazo (+6 Meses):* Agregar machine learning e analytics distrital das escolas, tornando o EcoSabon um SaaS governamental ou particular de "Química Ambiental em Escala".

---

## SAÍDAS EXTRAS OBRIGATÓRIAS

### A. Resumo Executivo
O **EcoSabon** é uma SPA moderna (React/TypeScript + Node.js) concebida sob rigorosos dogmas de engenharia (SDD e Clean Code) e voltada ao ensino prático de Química e Física Ambiental. Ao gamificar a produção de sabão com óleo usado — integrando dados manuais ou IoT —, preenche um buraco curricular crítico: a união entre letramento científico teórico e experimentação engajadora e ecológica de baixo custo em escolas públicas e privadas.

### B. Tabela Comparativa (Versão Sensores vs Simplificada)
| Fator | Versão A (Sensores) | Versão B (Simplificada) |
| :--- | :--- | :--- |
| **Custo Escolar** | Médio (Kit Arduino DS18B20/pH ~$50/bancada) | Baixo (Apenas insumos e celular do aluno) |
| **Viabilidade Escolar** | Exige Wi-Fi constante p/ telemetria IoT | Funciona offline/online (PWA Sync) |
| **Profundidade Científica**| Alta (Coleta paramétrica real-time, Big Data) | Moderada (Observação qualitativa e relatórios) |
| **Complexidade Técnica** | Alta (Sockets, IoT Security, Calibração) | Média (CRUD clássico com validações estritas) |
| **Escalabilidade** | Baixa a Média (Manutenção de Hardware) | Altíssima (Apenas Software) |
| **Impacto Pedagógico** | Imersão futurista (Laboratório 4.0) | Conscientização sólida pela superação de obstáculos reais |

### C. Proposta Resumida de Arquitetura
Arquitetura *Client-Server (REST API)* conteinerizada (Docker).
Backend em **Node.js + TypeScript** (Express) adotando *Clean Architecture* rigorosa, onde o motor estequiométrico reside isolado e pode ser coberto 100% por Testes Unitários. Banco **MongoDB** focado na flexibilidade de diários de bordo recheados com diferentes arrays visuais e de telemetria. Frontend em **React+Vite** atuando primariamente como uma PWA *Mobile-First* que expede comandos ao Backend via `Bearer Tokens` e retém *offline local-storage*.

### D. Proposta Resumida de Pipeline CI/CD
Pipeline construída via **GitHub Actions**.
*Evento:* Push para ramificação de PR (Pull Request).
*Passos:* 1️⃣ `npm audit` 2️⃣ `ESLint` com zero tolerância 3️⃣ Run Testes (`Vitest`) e gerar badge de cobertura.
*Evento Merge no Trunk (main):* Action faz build das imagens Docker -> Envia (push) via `AWS ECR/DockerHub` -> Aciona Webhook da infra de Prod (Vercel ou Instância EC2) -> Faz Pull da imagem limpa -> Recarrega sem *Downtime*.

### E. Top 10 Decisões mais críticas de Produto/Arquitetura
1. Implementar versão "Agnóstica a Hardware" (Versão B) como Core do MVP (Acessibilidade Nacional).
2. O Motor Matemático Físico-Químico ficar no Servidor (Não confiar no JS do navegador para cálculos corretos).
3. Hard-blocking pedagógico das Missões (Não se avança a tela 4 sem a 3 perfeita).
4. Adotar PWA/Offline-first para compensar a péssima rede 3G das escolas públicas periféricas.
5. Obrigação de Upload de EPI na UI *antes* do cálculo base (Segurança física intrínseca ao Software).
6. Escolher MongoDB para não lidar com refatoração massiva relacional caso o sensor Y mude seu JSON.
7. Uso de TypeScript no Full-stack (Compartilhar os Tipos de Saponificação entre Browser e Servidor).
8. UX em Dark Mode/Sci-Fi (Fator Coolness para adolescentes, sem apelo infantil ou "lousa").
9. Uso universal do ecossistema Node (Baixa atrito cognitivo para encontrar desenvolvedores que mexam em ambas pontas).
10. O "Fator de Impacto 25.000L" ser a métrica mestre de gamificação, acima de pontos de Experiência (XP).

### F. Top 10 Erros Mais Prováveis da Equipe Executante
1. **Pular testes TDD no Engine Químico:** Lançar uma versão que sugere a fórmula errada e causa excesso de soda irritante nas mãos. (Critico).
2. **Desenvolver desktop primeiro:** O desenvolvedor faz no monitor 4K e a tela fica injogável para um adolescente sujando um celular moto g velhinho na bancada.
3. **Acoplamento Arduino x API:** Deixar o backend dependente de um formato estrito do ESP32 que muda de laboratório para laboratório. O backend e as rotas precisam abstrair a origem (Adapter pattern).
4. **Focar em Sensores IoT no primeiro mês:** Gastar meses validando Sockets e esquecer do funil do aluno.
5. **Abaixar o "Nível" científico:** Transformar os inputs de temperatura e Entalpia num joguinho bobo que basta apertar OK repetidamente. O professor perderia interesse na plataforma, a considerando um "video game" fútil.
6. **Armazenamento:** Enviar fotos Full HD pro Mongo e travar a banda dos servidores escolares. Carece de compressão massiva LocalJS antes do Upload API.
7. **UX de "Bloqueio Seco":** Bater a testa no muro da Missão 3 sem dicas de como acertar o cálculo da soda gerando "Churn Rate" massivo de estudantes parando o projeto frustrados.
8. **Segredos no Client-Side:** Expor margens de superfatting base/arquitetura via React Dev Tools, embora menos critico para uma plataforma educacional, revela falhas arquiteturais.
9. **Não utilizar SDD na veia:** O dev júnior codifica direto, o requisito muda "O limite de segurança da água cai de 30% a 25% do óleo", e todos perdem a referência da verdade no código bagunçado.
10. **Tratar professor como secundário:** O Dashboard vira "só uma lista final do que rolou". Ele perde controle pedagógico da baderna do fundo da sala se não houver flags visuais macro-time.

### G. Roadmap Resumido
*   **Fase 0:** Setup, Repositórios, Especificação MTP/SDD.
*   **Fase 1 (MVP):** Criação das Contas Turmas, Backend Autenticado, UX PWA das Etapas 1-4, Validador Químico Abstrato.
*   **Fase 2:** Evolução Gamificada Missões 5-9, Módulo Diário Bordo Visual, Upload Comprimido.
*   **Fase 3:** Refinamento UI/UX "Sci-Fi", Dashboard Professor Macro, Produção do Guia Pedagógico em PDF. *Lançamento Versão B (Simplificada) Escolas Estaduais Piloto.*
*   **Fase 4:** Desenvolvimento Firmware Arduino C++, Endpoints IoT Segurança REST/WebSockets em Realtime. *Lançamento Versão A (HighTech).*
*   **Fase 5:** IA Generativa para validar os "Relatórios Científicos Discursivos Finais".

### H. Sugestão de MVP
**A Plataforma Versão B para 1 Escola, com 1 Motor Funcional:** O aluno faz login, abre missão "Reator Gamificado", preenche os Inputs textuais (Lí temperatura, Coloquei Óleo X, NaOH Y), o sistema aprova sob estequiometria, envia a foto do resultado, o Professor recebe pelo PC em lista e expede a "Aprovação de Lote". O ciclo end-to-end comprova o engajamento sem precisar comprar fios e arduinos antecipadamente.

### I. Sugestão de Evolução Pós-MVP
Transformar o "Produto Fechado" num **Hub Científico Aberto**:
Permitir que a Engine calcule biodiesel no futuro, criação de Hub de Feiras de Ciências e Gamificação Multi-Player assíncrona ("Escola X bateu o recorde em Sabão ecológico salvando Z milhões de litros de esgoto"). Inserção do motor MTP alimentando avaliações pedagógicas baseadas em IA LLM atuando junto ao professor.

***FIM DO DOCUMENTO DE ESPECIFICAÇÃO***
