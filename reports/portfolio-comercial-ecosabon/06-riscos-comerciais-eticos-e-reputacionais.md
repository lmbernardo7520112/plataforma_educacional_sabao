# Trilha Portfólio / Comercial — EcoSabon
## Documento 06: Análise de Riscos Comerciais, Éticos e Reputacionais

Este documento apresenta a matriz de riscos comerciais, éticos e reputacionais relacionados à oferta de serviços de desenvolvimento de web-books interativos pedagógicos.

---

### 1. Riscos de Escopo e Gestão de Clientes

#### **Risco A: O Inchaço de Escopo (Scope Creep)**
* **Descrição:** O cliente solicita pequenas mudanças incrementais contínuas (ex: "só mais um botão", "ajuste este parágrafo novamente") que destroem a margem de lucro e atrasam o cronograma.
* **Mitigação:** Fixar em contrato o número exato de módulos e rodadas de revisão (máximo de 2 a 3 dependendo do pacote). Exigir o texto final em documento unificado e assinar termos de aceite formais por etapa.

#### **Risco B: Atraso de Conteúdo pelo Cliente**
* **Descrição:** O projeto trava porque o cliente não envia os textos, imagens ou roteiro pedagógico aprovados a tempo.
* **Mitigação:** Incluir cláusula contratual estipulando que o cronograma de desenvolvimento é pausado proporcionalmente ao atraso de entrega de insumos pelo cliente, e estabelecer uma taxa de reativação de projeto após 30 dias de inatividade.

---

### 2. Riscos Éticos, Regulatórios e Legais

#### **Risco C: Coleta de Dados Sem Aprovação do CEP/CONEP**
* **Descrição:** O cliente insere lógica de coleta de dados de alunos ou professores no web-book (ex: telemetria de notas, cliques ou progresso de leitura) para validação acadêmica sem aprovação de Comitê de Ética.
* **Mitigação:** Proibir categoricamente a implementação de qualquer script de persistência ativa ou rastreamento no código-fonte até que o cliente forneça o parecer de aprovação do Comitê de Ética em Pesquisa (CEP). O web-book de homologação deve permanecer estritamente *stateless* e sem conexão de rede.

#### **Risco D: Violação de Direitos Autorais e LGPD**
* **Descrição:** O cliente fornece imagens protegidas por copyright de terceiros ou insere nomes, e-mails e dados de identificação de alunos e docentes no código.
* **Mitigação:** Exigir termos de responsabilidade autoral nos quais o cliente atesta a autoria de todo o conteúdo e imagens fornecidas. O desenvolvedor deve auditar o código para garantir a substituição de dados sensíveis de participantes por placeholders neutros (`DADOS FICTÍCIOS`).

---

### 3. Riscos de Reputação e Expectativa

#### **Risco E: Prometer Demais na Demonstração Comercial**
* **Descrição:** O cliente ou banca interpretam o web-book de portfólio como um sistema EaD completo integrado (SaaS) ou esperam simulações dinâmicas complexas do Molecular Stage (3D) no pacote básico.
* **Mitigação:** Alinhar as expectativas desde o primeiro pitch. Classificar o e-book como um protótipo estático interativo de alta fidelidade e acessibilidade, e incluir no manual técnico os limites estritos de governança (sem simuladores químicos reais ou renderizadores WebGL pesados).

#### **Risco F: Mau Funcionamento Offline Local**
* **Descrição:** O cliente tenta apresentar o e-book interativo clicando duas vezes no index.html e as interações falham devido ao bloqueio de CORS dos navegadores modernos.
* **Mitigação:** Entregar o arquivo `instrucoes.txt` de forma destacada contendo o manual técnico rápido e o roteiro seguro de apresentação com servidores HTTP estáticos leves de uma linha de terminal.
