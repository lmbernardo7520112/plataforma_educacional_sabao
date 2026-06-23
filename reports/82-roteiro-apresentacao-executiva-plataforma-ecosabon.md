# Plataforma EcoSabon — Roteiro de Apresentação Executiva

---

## 1. Pitch de 30 Segundos

> "O EcoSabon é uma plataforma educacional que transforma conteúdo de Química Verde e saponificação em experiências digitais interativas. Nosso web-book Premium 3D — com visualização molecular, acessibilidade e funcionamento offline — demonstra o que a plataforma entrega. Temos 191 testes automatizados, 4 fases de hardening de segurança e governança profissional. É um protótipo avançado, não um produto final — e estamos abertos a parcerias para validação em contexto escolar real."

---

## 2. Pitch de 1 Minuto

> "Materiais didáticos de Química costumam ser PDFs estáticos, inacessíveis e dependentes de internet. O EcoSabon resolve isso com uma plataforma educacional modular.
>
> Nosso web-book Premium 3D é a demonstração funcional: conteúdo de saponificação estruturado em estações, com infográfico interativo, checklist de laboratório e uma molécula 3D rotacionável. Tudo funciona offline, é acessível por teclado e leitores de tela, e gera PDF formatado automaticamente.
>
> Por trás do web-book, há uma plataforma real: backend com autenticação JWT, autorização por papel, validação de dados com Zod e 4 fases de hardening. São 191 testes automatizados em CI/CD.
>
> Ainda é protótipo — não temos validação com alunos ou deploy público. Mas o case demonstra capacidade real de criar experiências educacionais digitais completas. Estamos prontos para conversar sobre parcerias e pilotos."

---

## 3. Pitch de 5 Minutos

### [0:00–1:00] O Problema
- PDFs de Química são estáticos e inacessíveis.
- Plataformas EaD exigem internet estável — indisponível em muitas escolas.
- Ferramentas proprietárias (Articulate, Kotobee) criam dependência.
- Conteúdos científicos precisam de visualização — não só texto.

### [1:00–2:00] A Plataforma
- EcoSabon = ecossistema educacional com 5 camadas.
- Conteúdo, curso interativo, backend/API, domínio compartilhado, governança.
- Metodologia de rotação por estações e missões.
- Squads colaborativos com submissão de evidências.

### [2:00–3:30] A Demonstração (web-book)
- Abrir o web-book → navegar pelas estações.
- Mostrar o Premium 3D → rotacionar molécula.
- Mostrar offline → ZIP auto-suficiente.
- Mostrar acessibilidade → Tab + teclado.
- Mostrar PDF → print.css inteligente.

### [3:30–4:30] A Engenharia
- 191 testes automatizados.
- 4 fases de hardening (H1: motor/JWT, H2: CORS/env, H3: schemas/logs, H4: RBAC).
- CI/CD verde no GitHub Actions.
- Código puro — zero dependência de SaaS.

### [4:30–5:00] Limites e Próximos Passos
- Protótipo avançado, não produto final.
- Sem validação com docentes/alunos (ainda).
- Sem deploy público (ainda).
- Aberto a parcerias para piloto escolar.

---

## 4. Roteiro de Demonstração (10 Minutos)

### [0:00–0:30] Contexto
- Apresentar o problema (PDFs estáticos, escolas sem internet estável).
- Posicionar: "O EcoSabon é uma plataforma. O web-book é a demonstração."

### [0:30–1:30] Primeira Impressão
- Abrir o web-book no navegador.
- Navegar pela capa e introdução.
- Destacar: design responsivo, tipografia, layout modular.

### [1:30–3:00] Estação 2 — Infográfico Interativo
- Navegar pelos hotspots (clique e teclado).
- Demonstrar acessibilidade: Tab, Enter, foco visível.
- Mostrar reações químicas nos hotspots.

### [3:00–4:30] Premium 3D — Visualização Molecular
- Navegar até a seção Premium 3D.
- Rotacionar a molécula com mouse.
- Explicar: "Visualização representativa, não simulação validada."
- Mostrar fallback 2D (redimensionar janela ou desabilitar WebGL).

### [4:30–5:30] Offline e PDF
- Abrir o web-book via ZIP local (sem servidor).
- Demonstrar: funciona offline.
- `Ctrl+P` → mostrar PDF com layout inteligente.
- Destacar: hotspots expandidos no print.

### [5:30–7:00] Engenharia e Governança
- Terminal: `npm test` → 191 testes verdes.
- GitHub: mostrar CI/CD verde, PRs, tags, release.
- Explicar: "Isso não é apenas front-end. Há backend, autenticação, autorização."
- Mencionar: 4 fases de hardening, 82 relatórios.

### [7:00–8:30] Plataforma Completa
- Mostrar diagrama de ecossistema (5 camadas).
- Explicar: squads, missões, professor, dossiê.
- Explicar: "O web-book é uma camada. A plataforma tem mais."
- Mostrar: `SaponificationEngine`, schemas Zod, auth middleware.

### [8:30–9:30] Limites Honestos
- "Protótipo avançado, não produto final."
- "Sem validação com alunos ou docentes."
- "Sem deploy público."
- "Projetado para acessibilidade, não comprovado com PcD."
- "Aberto a parcerias."

### [9:30–10:00] Encerramento
- Mensagem principal: "O EcoSabon não é apenas um e-book; é uma plataforma educacional em evolução, demonstrada por um web-book Premium 3D como vitrine funcional."
- Abrir para perguntas.

---

## 5. Ordem Recomendada de Apresentação

| Etapa | Conteúdo | Tempo |
|-------|---------|-------|
| 1 | **Problema** — PDFs estáticos, escolas sem internet | 30s |
| 2 | **Plataforma** — visão de ecossistema, 5 camadas | 60s |
| 3 | **Web-book como vitrine** — não é o produto, é a demo | 30s |
| 4 | **Demonstração** — navegar, 3D, offline, PDF | 3–5 min |
| 5 | **Governança** — testes, CI/CD, hardening | 60s |
| 6 | **Limites e próximos passos** — honestidade radical | 60s |

---

## 6. Mensagem Principal

> **O EcoSabon não é apenas um e-book; é uma plataforma educacional em evolução, demonstrada por um web-book Premium 3D como vitrine funcional.**

---

## 7. Perguntas Difíceis e Respostas Seguras

### "Já foi validado com alunos?"

> "Ainda não. O protótipo está pronto para piloto, mas ainda não foi testado em contexto escolar real. Estamos abertos a parcerias para validação."

### "Funciona offline?"

> "Sim. O web-book funciona 100% offline via ZIP local, sem nenhuma chamada de rede. O backend, naturalmente, exige servidor — mas o conteúdo educacional é independente."

### "É uma simulação molecular real?"

> "É uma visualização molecular interativa em Three.js. Ela representa conceitos de saponificação de forma visual, mas não é uma simulação científica validada como ferramentas de pesquisa. É ferramenta pedagógica, não de laboratório."

### "A plataforma já está pronta?"

> "O web-book Premium 3D está publicado como release candidate. O backend passou por 4 fases de hardening com 191 testes. Mas não há deploy público nem monitoramento de produção. É um protótipo avançado com governança profissional."

### "Quanto custa?"

> "Temos pacotes exploratórios para desenvolvimento de web-books educativos sob medida. A precificação definitiva depende de briefing e escopo. Nossos materiais comerciais detalham as opções — posso enviá-los."

### "Pode ser usado por escolas agora?"

> "O web-book pode ser distribuído hoje via ZIP para qualquer escola com computadores — funciona offline com um duplo clique. A plataforma multiusuário (squads, missões, relatórios) ainda exige deploy e validação. Estamos abertos a parcerias para piloto."

### "Qual a diferença entre o e-book e a plataforma?"

> "O e-book é o produto-vitrine — a demonstração tangível. A plataforma inclui backend com autenticação, autorização por papel, squads, missões e dossiê acadêmico. O e-book mostra o que a plataforma entrega em termos de experiência; a plataforma é o ecossistema completo."

### "O 3D funciona em celular?"

> "A visualização 3D funciona em navegadores modernos com WebGL. Em dispositivos sem suporte, há fallback automático para representação 2D. O layout é responsivo."

---

## 8. Checklist Pré-Apresentação

- [ ] Web-book RC1 aberto e funcionando localmente
- [ ] ZIP offline testado (abrir sem internet)
- [ ] Terminal pronto para rodar `npm test` (191 verdes)
- [ ] GitHub aberto com CI/CD verde
- [ ] Diagrama de ecossistema disponível
- [ ] Materiais comerciais acessíveis (R01–R12)
- [ ] Frases proibidas memorizadas (não usar)
- [ ] Limites honestos preparados para declarar
