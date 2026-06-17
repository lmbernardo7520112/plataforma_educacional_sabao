# Especificação Executiva — Protótipo de E-book EcoSabon

> **Status:** Protótipo com `[DADOS FICTÍCIOS PARA TESTE]`. Nenhum dado real de dissertação foi utilizado.

---

## 1. Objetivo do Documento

Definir a arquitetura editorial, as restrições de governança e os critérios técnicos que orientam a construção do protótipo de e-book interativo do projeto EcoSabon.

Este documento é a **especificação de referência obrigatória** (Specification-Driven Development) e deve ser consultado antes de qualquer decisão de implementação.

---

## 2. Matriz Dissertação → E-book

| Elemento da Dissertação                | Representação no E-book                                          |
| -------------------------------------- | ---------------------------------------------------------------- |
| Fundamentação teórica                  | Módulo 1 — O Desafio da Saponificação                            |
| Metodologia (rotação por estações)     | Módulo 2 — Missões na Prática (3 estações fictícias)             |
| Resultados e discussão                 | Módulo 3 — Evidências da Aplicação (`[DADOS FICTÍCIOS]`)         |
| Produto educacional / materiais        | Módulo 4 — Caixa de Ferramentas (anexos)                         |
| Validação com professores              | Seção de Validação Externa (formulário demonstrativo)            |
| Critérios de qualidade                 | Seção de Governança (rubrica 0-10 + checklist Go/No-Go)          |

---

## 3. Ordem de Produção vs. Ordem de Leitura

| Ordem de Produção (SDD)                         | Ordem de Leitura (Usuário Final)           |
| ------------------------------------------------ | ------------------------------------------ |
| 1. Especificação executiva (`docs/`)              | 1. Tela inicial (contexto e navegação)     |
| 2. Matriz de estações (`docs/matriz-estacoes.md`) | 2. Módulo 1 — O Desafio                    |
| 3. Rubrica e formulário de validação              | 3. Módulo 2 — Missões na Prática           |
| 4. Anexos em Markdown                             | 4. Módulo 3 — Evidências                   |
| 5. Testes de interatividade (TDD)                 | 5. Módulo 4 — Caixa de Ferramentas         |
| 6. Implementação da UI (HTML/CSS/JS)              | 6. Governança e Validação                  |

A produção segue a lógica SDD (especificação antes de código). A leitura segue a lógica pedagógica (contexto → prática → evidência → ferramentas).

---

## 4. Critérios de Plataforma

| Critério                      | Decisão                                                                 |
| ----------------------------- | ----------------------------------------------------------------------- |
| Tecnologia                    | HTML/CSS/JS puros (Vanilla Web Estático)                                |
| Dependência de backend        | Nenhuma. O produto deve abrir localmente no navegador.                  |
| Dependência de internet       | Nenhuma. Sem imagens externas, APIs externas ou CDNs obrigatórios.      |
| Ambiente de desenvolvimento   | Vite + Vitest (apenas para dev/testes; não são dependência do produto)  |
| Responsividade                | Obrigatória (mobile-first, mínimo 320px)                               |
| Impressão                     | Suportada via `@media print` em `print.css`                            |
| Acessibilidade                | WCAG AA (contraste, navegação por teclado, texto claro em botões)       |
| Plataforma definitiva         | **Não definida neste protótipo.** Decisão para fase posterior.          |

---

## 5. Governança Geral

### 5.1 Restrições de Governança e Editoriais Rigorosas

* Não inventar resultados reais.
* Não inventar validação acadêmica.
* Não inventar habilidades BNCC (utilizar `[habilidade BNCC/currículo local a validar]`).
* Não apresentar dados fictícios como evidência real.
* Não impor plataforma definitiva.
* Não ampliar o escopo além do protótipo de e-book nesta etapa.
* Todo conteúdo demonstrativo deve estar marcado como `[DADOS FICTÍCIOS PARA TESTE]`.

### 5.2 Versionamento

A pasta `ebook-ecosabon-prototipo/` é tratada como **entrega governada** e deve ser versionada normalmente no repositório Git (não adicionada ao `.gitignore`).

---

## 6. Limitações do Protótipo

1. As 3 estações são fictícias e demonstrativas. Devem ser substituídas por estações reais após definição metodológica da dissertação.
2. O alinhamento curricular é um placeholder (`[habilidade BNCC/currículo local a validar]`). Deve ser validado após definição de segmento, série e recorte curricular.
3. O formulário de validação docente é demonstrativo. Deve ser aplicado em campo com professores reais para coleta de dados.
4. Nenhum resultado quantitativo ou qualitativo foi apresentado. Os blocos de evidências são placeholders para inserção futura.
5. O design system reutiliza tokens do EcoSabon, mas o e-book é auto-contido e não depende do código React da plataforma.
