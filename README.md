# 🧪 EcoSabon | Plataforma B2B de Química Gamificada

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions)

---

## 📄 Visão Executiva

**EcoSabon** é um *Software as a Service (SaaS)* B2B voltado à imersão educacional. A plataforma orquestra jornadas gamificadas de química e física laboratorial, guiando bancadas de estudantes através da simulação termodinâmica da técnica de "Cold Process" (Saponificação a frio).

Construído sob o rigor da **Clean Architecture** e projetado para suportar Multi-Tenancy (Múltiplas Turmas/Escolas simultâneas), o sistema garante extrema resiliência no lado do Servidor com autenticação de papéis (RBAC) e uma fluidez impecável no Front-End.

> 🔎 **Nota Arquitetural:** Este ecossistema foi metodicamente arquitetado com foco em governança de dados e escalabilidade isomórfica (reuso de lógicas físico-químicas trafegando perfeitamente entre o Banco de Dados e as Telas de UI), utilizando os preceitos de **Specification Driven Development (SDD)**.

---

## 🧠 Arquitetura Monorepo e Topologia B2B

O sistema roda sob uma topologia distribuída (Client-Server-Shared) que isola completamente Regras de Negócio, Autenticações e Componentes Visuais.

```text
[Usuários B2B: Professores] ──🔒 JWT RBAC ──┐
                                            │
[Usuários Interativos: Alunos] ─────────> [React/Vite UI]
                                            │  (State Management & Dashboards)
                                            v
                                  [Node.js / Express API]
                                            │  (Zod Validations & SaponificationEngine)
                                            v
                                   [MongoDB Atlas Cluster]
```

🛠️ **Stack Tecnológica de Elite**

**Front-End (Application & UI Layer)**
- React + Vite (CSR Otimizado)
- Tailwind CSS (Estilização Utilitária e Otimização para Impressão PDF nativa e Glassmorphism)
- Zustand (Gerenciamento de Estado complexo atrelado aos JWTs do Usuário)

**Back-End (Domain & Services Layer)**
- Node.js com Express
- Mongoose + MongoDB (Modelagem Orientada a Documentos com Cascating Deletions)
- Zod (Parseamento Strict e Firewalls de Validação de Requests)
- JSON Web Tokens (Autenticação RBAC segregada por *Teacher* e *Squads*)

**DevOps & Infraestrutura**
- Docker & Docker Compose (Containerização Espelho para reprodução de ambientes)
- GitHub Actions (Pipeline CI robusta com Strict Linting e Typechecking na Nuvem)
- Estratégia PaaS (Ready to Deploy in Vercel + Render.com)

---

## 📂 Visão Modular do Código (Monorepo)

O código adota uma postura isomórfica genial ao manter um diretório `shared` distribuindo o sangue (interfaces) para a cabeça e para o corpo da aplicação simultaneamente:

```text
plataforma_educacional_sabao/
│
├── client/              # React UI SPA
│   ├── src/pages/       # Rotas Privadas e Públicas Protegidas
│   └── src/core/        # Motor de Consumo de Estado (Zustand)
│
├── server/              # Camada de Aplicação REST
│   ├── middleware/      # Firewalls (Zod, Autenticação, RBAC Admin/User)
│   ├── routes/          # Desacoplamento de Tráfego HTTP
│   └── models/          # Schemas e Validações Mongoose DB
│
└── shared/              # O "Coração Isomórfico"
    ├── types/           # Declarações TypeScript Universais
    └── config/          # Dicionários (Ex: Saponification Math Engine)
```

---

## ⚡ Casos Fortes de Engenharia (Desafios & Soluções)

Para um recrutador ou líder técnico que lê código nas entrelinhas, as soluções aqui aplicadas convertem complexidade bruta em processos polidos:

**1. O Paradigma Isomórfico - (Single Source of Truth)**
* **O Desafio:** A fórmula matemática para calcular o excesso da base livre (Superfatting) na saponificação precisava alertar o aluno rapidamente na tela do navegador, mas de maneira algûma o banco de dados (Backend) poderia "confiar" na conta enviada pelo usuário, arriscando injeção de dados.
* **A Solução:** Transferi toda a Regra Termodinâmica (Domain Logic) para uma camada independente chamada `shared/`. Tanto o `React` quanto o `Express` consomem o mesmo arquivo exato de regras para calcular as notas químicas e validar segurança simultaneamente. Alterou num lugar, a matemática do universo inteiro do app é atualizada!

**2. A Engrenagem de Segurança do Private SaaS (B2B)**
* **O Desafio:** Impedir que curiosos entrassem numa plataforma acadêmica online e gerassem lixo desestruturado simulando serem alunos fictícios.
* **A Solução:** Desenvolvimento de um controle *Role-Based Access Control (RBAC)*. O app reage dinamicamente. Alunos não possuem capacidade técnica para enxergar ou gerar rotas de `Classrooms` (Turmas). Eles apenas recebem chaves restritas (`JWT Squad`). O Professor, dono do token Master Secret, age como Deus da instância escolar via Painel Administrativo Fechado.

**3. Geração de Dossiês em Nuvem ("Costless Architechure")**
* **O Desafio:** Emitir um documento final unificando todas as missões, cálculos e evidências fotográficas dos laboratórios de Química em um PDF Institucional sem explodir os custos de processamento numa máquina AWS (gerar PDF backend é estupidamente caro e pesado para Buffer RAM).
* **A Solução:** Subversão da carga de trabalho para Máquina do Cliente (Client-Side Rendering). Construí uma Interface Oculta de React (`GroupReport.tsx`) interceptada por media-queries estritas (`@media print`). Emulamos PDFs nativos transferindo 100% da carga de CPU para renderizar as imagens diretamente aos ombros do navegador web do usuário via `window.print()`.

---

## 📢 Nota do Desenvolvedor

A idealização e consolidação da plataforma **EcoSabon** se traduz como um manifesto técnico sobre a importância da base.
Demonstrando total proficiência ao sair do escopo minúsculo e focar na robustez: Não basta "Fazer Funcionar". Aqui, priorizou-se que um banco em nuvem reaja fluidamente através de Integrações Contínuas (CI Automations), que os dados naveguem encapsulados sob Contratos (Zod), e que a lógica não se contamine pelo Layout da Tela (Clean Architecture).

🚀 Projetado para orquestração pedagógica, codificado para atracar solidez de Engenharia de Software Moderna.
