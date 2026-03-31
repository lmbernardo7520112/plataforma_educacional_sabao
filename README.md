# 🧪 EcoSabon | Plataforma Educacional Gamificada em Química

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---

## 📄 Descrição do Projeto

**EcoSabon** é uma plataforma educacional gamificada (SaaS B2B) desenvolvida com a metodologia **Specification-Driven Development (SDD)**. O sistema imerge os estudantes de laboratório ao simular e validar termodinamicamente os passos da técnica *Cold Process* (Saponificação a frio), guiando as "Bancadas" na manipulação matemática de reagentes químicos industriais.

Criada como um estudo intensivo de metodologias arquiteturais maduras (*Monorepo Isomórfico, Clean Architecture e Integração DevOps*), o projeto orquestra restrições severas de Autorização Baseadas em Papéis (RBAC) para garantir máxima governança e segurança na manipulação corporativa de turmas.

---

## 🚀 A Saga de Engenharia (As 5 Fases de Desenvolvimento)

A estruturação tecnológica deste software não foi trivial. Ela foi dividida rigorosamente em marcos, cada um endereçando gargalos técnicos inerentes ao desenvolvimento web escalonável e seguro.

### 📍 Fase 1: Fundação Estrutural e CRUD Mestre
- **Objetivo:** Estabelecer a anatomia de Bancadas (Alunos), Turmas e Missões.
- **Desafio:** Como garantir que a exclusão de uma Turma inteira não deixasse dezenas de tabelas órfãs de alunos voando no banco de dados e sugando *Memory Leaks* a longo prazo?
- **A Solução Construída:** Implementações avançadas atreladas aos preceitos do `Mongoose` com rotinas *Middlewares de Deletion in Cascade* no Node.js. Qualquer deleção no ecossistema aciona gatilhos que purgam dependentes (fotos e identidades) sem intervenção manual.

### 📍 Fase 2: Muros de Fogo e Validação Estrita de Dados
- **Objetivo:** Trançar o recebimento de missões formuladas complexas entre o Front e o Back.
- **Desafio:** Os alunos submetiam formulários científicos com falhas (valores negativos, strings onde se exigia física de pesos). O Backend precisava rejeitar envios imperfeitos antes sequer de ativar a câmera ou salvar arquivos (`Multer`).
- **A Solução Construída:** Abrasamento de `Zod` Validation Schemas e tipagens `TypeScript` rígidas. Se uma requisição de missão bater no Firewall do Express faltando 1 caractere no contrato do Schema, ela ejeta instantaneamente. Erros de sistema baseados em "undefined behavior" chegaram a zero.

### 📍 Fase 3: O Cérebro Matemático (Isomorfismo e Clean Architecture)
- **Objetivo:** Inserir a química Real do sabão na Plataforma.
- **Desafio Arquitetural Massivo:** As equações químicas de Superfatting e Índice Saponificador eram necessárias *rapidamente* na tela do navegador do aluno (Front-End) para dar avisos visuais (Feedback Loops). No entanto, de forma *alguma* o Servidor Node poderia confiar nas contas enviadas pelo usuário, devendo re-efetuar tudo sozinho por segurança sem que duplicássemos códigos.
- **A Solução Construída:** Implementação de uma arquitetura central Monorepo com motor `Shared`. Eu desenvolvi a **`SaponificationEngine`** (Motor Termodinâmico Funcional) em uma camada islada e impenetrável. Tanto a Interface React quanto o Pipeline NodeJS consomem e leem extamente do mesmo arquivo (Single Source of Truth), tornando-se Isomórficos e acabando com dessincronias.

### 📍 Fase 4: O Dossiê Científico e O Cofre Acadêmico
- **Objetivo:** Emitir o relatório final em PDF unificando todo o trabalho técnico da equipe com suas respectivas fotografias laboratoriais.
- **Desafios:** Renderizar relatórios PDFs unificados pesados do lado do servidor (AWS/DigitalOcean) derreteria o custo do processamento num modelo B2B rápido. O outro problema central? Os alunos de uma equipe não deveriam conseguir "roubar" as colunas com a nota do relatório das outras equipes trocando a URL do site.
- **A Solução Construída:** 
  1. **"Costless Architecture":** Aplicamos o preceito brutal de repassar as despesas para a máquina do cliente (`Client-Side Rendering`). Programamos uma interface CSS React interceptada por algoritmos restritos ao `@media print`, delegando para motor de impressão nativo do browser todo o PDF. Custo para o meu Servidor BackEnd em nuvem? R$ 0,00.
  2. **Governança JWT (RBAC):** Os rotas consumidas para desenhar os relatórios operam com *Role-Based Access Control*. O MiddleWare Backend cruza instantaneamente a digital primária da bancada requisitante com a da Missão solicitada e aplica um bloqueio total (`403 Forbidden`) em 50 milissegundos se tentar ler Dossiês falsos.

### 📍 Fase 5: Privacidade B2B (Mão de Ferro) e CI/CD
- **Objetivo:** Pivotar o software para um legítimo Software as a Service Institucional fechado.
- **Desafio:** O Ambiente antes agia como um Sandbox onde a criançada criava quantas Bancadas imaginárias quisesse na Nuvem. Comerciantes precisavam de Governança Estrita do Professor (Master Node). Adicionalmente, quebras no código vinham derrubando o servidor invisivelmente durante a manutenção.
- **A Solução Construída:** O aplicativo sofreu o "SaaS Lock". Agora o ambiente exige que apenas Portadores da "Cátedra Mestre" autenticada do Professor fundem a existência inicial de equipes (O aluno passou a ter acesso estrito limitado de Edição dos membros apenas). Para fechar, erguemos uma infraestrutura rigorosa de Integração DevOps em Nuvem (GitHub Actions com Ubuntu CI): Qualquer código submetido tem 5 blocos do Linter esquadrinhados nas Nuvens atestando Qualidade do Código automaticamente, ou nem chegam a ir para o repositório mestre!

---

## 🛠️ Stack Tecnológica

- **Evolução Front:** React 18, Vite (Fast HMR), Tailwind (Estilo Nativo e Print-Ready), Zustand.
- **Motor Back:** Express JS Isomórfico, Zod Firewalls, Multer (Local Storage Volátil).
- **Banco de Dados:** MongoDB Atlas escalável atrelado ao ORM rígido Mongoose.
- **Qualidade & DevOps:** Typescript Strict, ESLint, GitHub Actions (.yml CI Pipeline).

---

> 🎯 *Conclusão: Mais do que códigos ou telinhas bonitas, o EcoSabon reflete maturidade corporativa — Arquitetura desacoplada, sigilo e restrições dinâmicas de Papéis, Motores Isolados e Engenharia orientada a performance financeira na nuvem. Um case legítimo de governança ponta a ponta.*
