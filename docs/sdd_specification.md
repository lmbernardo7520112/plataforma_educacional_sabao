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
