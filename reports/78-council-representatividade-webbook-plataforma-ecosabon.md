# 📋 Relatório 78 — Council de Representatividade: Web-Book como Vitrine da Plataforma EcoSabon

| Campo              | Valor                                                        |
|--------------------|--------------------------------------------------------------|
| **Fase**           | PME — Posicionamento de Marketing Estratégico                |
| **Data**           | 2026-06-23                                                   |
| **Formato**        | Deliberação de Council (7 especialistas)                      |

---

## Composição do Council

| # | Especialista | Foco |
|---|-------------|------|
| 1 | **Produto Educacional Digital** | Proposta pedagógica representada |
| 2 | **Marketing Técnico e Posicionamento** | Web-book como peça de marketing |
| 3 | **Arquitetura de Software** | H1–H4 como prova de profundidade |
| 4 | **UX/Acessibilidade** | Acessibilidade, offline, fallback |
| 5 | **Ensino de Química** | Saponificação, Química Verde, visualização |
| 6 | **Negócios/Portfólio Freelancer** | Case de competência |
| 7 | **Governança, Ética e Risco** | Limites de promessa, transparência |

---

## Deliberações

### Especialista 1 — Produto Educacional Digital

**O que representa bem:**
O web-book comunica eficazmente a experiência de rotação por estações. A estrutura em 4 seções reproduz um itinerário pedagógico reconhecível. Os hotspots do infográfico e o checklist Go/No-Go demonstram aprendizagem ativa.

**O que não representa ainda:**
A dinâmica de squads, missões e progresso coletivo (camada backend) não aparece no web-book. O fluxo professor → turma → squad → missão → relatório é invisível ao espectador do web-book.

**Risco de comunicação:**
Quem vê apenas o web-book pode concluir que o EcoSabon é "um e-book bonito", ignorando a plataforma multiusuário.

**Recomendação incremental:**
Criar um diagrama ou infográfico (fora do web-book) que mostre o ecossistema completo, posicionando o web-book como uma camada.

**Score:** 7/10.

---

### Especialista 2 — Marketing Técnico e Posicionamento

**O que representa bem:**
Premium 3D é um diferencial visual imediato. A primeira impressão é forte: 3D rotacionável, design moderno, offline. Supera qualquer PDF estático.

**O que não representa ainda:**
O web-book não comunica backend, API, segurança, autorização. O hardening H1–H4 é invisível para o observador.

**Risco de comunicação:**
O web-book "rouba a cena" — o público pode não perceber que há uma plataforma por trás.

**Recomendação incremental:**
Usar o web-book como abertura de demo (60 segundos), depois transicionar para diagrama da plataforma e métricas técnicas (191 testes, 4 fases de hardening, 12 rotas validadas).

**Score:** 8/10.

---

### Especialista 3 — Arquitetura de Software

**O que representa bem:**
O código do web-book demonstra boas práticas: Vanilla JS, módulos ES nativos, testes Vitest, CI/CD. O motor `SaponificationEngine` centralizado mostra arquitetura de domínio.

**O que não representa ainda:**
A separação server/client/shared, o RBAC, os schemas Zod, o error handler e o request logger são invisíveis no web-book. O hardening H1–H4 só aparece em relatórios e no código.

**Risco de comunicação:**
Para um avaliador técnico, o web-book pode parecer "apenas front-end". Sem mostrar o server e o shared, a profundidade arquitetural é subestimada.

**Recomendação incremental:**
Incluir no material de portfólio um diagrama de arquitetura (monorepo, camadas, middlewares) e citar métricas: 191 testes, 5 camadas, 4 fases de hardening.

**Score:** 6/10 (como representação da arquitetura completa).

---

### Especialista 4 — UX/Acessibilidade

**O que representa bem:**
Excelente. Navegação por teclado, leitores de tela, responsividade, print.css para PDF, fallback 2D para Premium 3D, offline via build estático. Cobre os pilares de acessibilidade web.

**O que não representa ainda:**
Não há testes reais com tecnologias assistivas em dispositivos escolares. A acessibilidade foi implementada seguindo padrões, mas não validada com usuários PcD.

**Risco de comunicação:**
Afirmar "100% acessível" sem validação real com usuários PcD.

**Recomendação incremental:**
Usar a frase "projetado para acessibilidade" em vez de "100% acessível". Registrar que a validação com AT reais é um próximo passo.

**Score:** 8/10.

---

### Especialista 5 — Ensino de Química

**O que representa bem:**
A saponificação está bem estruturada: reação NaOH + ácidos graxos → sabão + glicerol. A rotação por estações é pedagogicamente coerente. O Premium 3D ilustra conceitos moleculares de forma visualmente atraente.

**O que não representa ainda:**
O Premium 3D é visualização representativa, não simulação validada. A estequiometria é qualitativa — não há cálculos estequiométricos quantitativos interativos no web-book (embora o `SaponificationEngine` os faça no backend).

**Risco de comunicação:**
Chamar o Premium 3D de "simulador molecular" ou "ferramenta de laboratório virtual" sem validação científica formal.

**Recomendação incremental:**
Usar "visualização molecular interativa" ou "representação 3D de conceitos de saponificação". Nunca "simulador validado".

**Score:** 7/10.

---

### Especialista 6 — Negócios/Portfólio Freelancer

**O que representa bem:**
Case excelente. Demonstra: código puro, sem frameworks pesados, CI/CD, versionamento, testes, acessibilidade, offline, 3D. Cobre múltiplas competências. A RC1 publicada com tag e release é demonstrável imediatamente.

**O que não representa ainda:**
O case não mostra deploy real, métricas de uso, feedback de clientes ou receita. É um protótipo avançado, não um produto em mercado.

**Risco de comunicação:**
Apresentar como "produto em produção" quando é "protótipo com governança profissional". Prometer resultados sem validação.

**Recomendação incremental:**
Usar "protótipo avançado demonstrável" ou "case de engenharia educacional com 191 testes". Evitar sugerir produto maduro em mercado. Destacar o *processo* (governança, hardening, CI/CD) tanto quanto o *resultado* (web-book).

**Score:** 8/10.

---

### Especialista 7 — Governança, Ética e Risco

**O que representa bem:**
A documentação é exemplar: 76 relatórios versionados, PRs documentados, decisões rastreáveis, limites explícitos. A auditoria H1–H4 demonstra responsabilidade técnica.

**O que não representa ainda:**
Nenhuma validação externa. Nenhuma auditoria de segurança por terceiros. Nenhum teste com usuários reais. A linguagem comercial anterior (materiais 01–12) pode conter promessas que agora devem ser contextualizadas pela evolução PME.

**Risco de comunicação:**
- Inflar capacidade sem validação externa.
- Confundir "hardened" com "production-ready".
- Usar termos como "blindado", "certificado", "comprovado" sem lastro.

**Recomendação incremental:**
Adotar linguagem de "maturidade técnica demonstrada" em vez de "segurança certificada". Registrar explicitamente os limites em qualquer apresentação. Manter honestidade radical.

**Score:** 7/10.

---

## Matriz Consolidada de Scores

| Especialista | Score |
|-------------|-------|
| Produto Educacional | 7/10 |
| Marketing Técnico | 8/10 |
| Arquitetura | 6/10 |
| UX/Acessibilidade | 8/10 |
| Ensino de Química | 7/10 |
| Negócios/Portfólio | 8/10 |
| Governança/Ética | 7/10 |
| **Média** | **7.3/10** |

---

## Consenso do Council

> O web-book Premium 3D é um **produto-vitrine avançado e representativo** da Plataforma EcoSabon, com **score médio de representatividade 7.3/10**. Ele é forte em experiência visual, acessibilidade, offline e marketing técnico, mas **sub-representa** a arquitetura backend, a dinâmica multiusuário e a profundidade do hardening H1–H4.
>
> **O web-book deve ser usado como porta de entrada** em qualquer apresentação, seguido de material complementar que revele a plataforma completa. Sozinho, ele comunica competência — mas não comunica a totalidade do EcoSabon.

---

## Recomendações Consensuais

1. **Criar diagrama de ecossistema** (fora do web-book) para contexto visual.
2. **Usar "visualização molecular interativa"**, nunca "simulador validado".
3. **Usar "projetado para acessibilidade"**, nunca "100% acessível comprovado".
4. **Usar "protótipo avançado com governança profissional"**, nunca "produto em produção".
5. **Destacar métricas reais**: 191 testes, 4 fases de hardening, 12 rotas validadas, 5 camadas.
6. **Transição em demos**: web-book (60s) → diagrama da plataforma → métricas técnicas.
7. **Manter honestidade radical** sobre limites: sem deploy, sem validação real, sem auditoria externa.

---

## Riscos de Comunicação Catalogados

| Risco | Severidade | Mitigação |
|-------|-----------|-----------|
| Web-book confundido com produto final | 🟡 Médio | Contextualizar sempre como "vitrine da plataforma" |
| Premium 3D confundido com simulador científico | 🟡 Médio | Usar "visualização representativa" |
| Acessibilidade não validada com PcD | 🟢 Baixo | Usar "projetado para" em vez de "comprovado" |
| Hardening confundido com production-ready | 🟡 Médio | Distinguir "maturidade técnica" de "pronto para produção" |
| Materiais comerciais anteriores com linguagem inflada | 🟡 Médio | PME complementa e contextualiza, sem substituir |
| Ausência de validação real citada como mérito | 🔴 Alto | Nunca omitir: sempre registrar como limitação |
