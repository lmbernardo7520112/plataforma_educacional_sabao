# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 28: Plano de Distribuição Local do E-book EcoSabon

**Autor:** Antigravity (Pair Programming AI)  
**Status:** ✅ APROVADO  
**Data:** 2026-06-20  

---

### 1. Filosofia de Funcionamento Offline
O web-book **EcoSabon** foi desenvolvido para ser totalmente auto-contido e livre de dependências de rede. Isso significa que ele pode rodar em cenários com internet instável ou inexistente (como salas de aula públicas e laboratórios escolares), sem requisições a servidores externos ou CDNs de terceiros.

---

### 2. Como Abrir o Web-Book Localmente

#### **Método A: Duplo Clique (Abertura Direta via File Protocol)**
1. Navegue até a pasta `ebook-ecosabon-prototipo/` no seu computador.
2. Dê um duplo clique no arquivo `index.html`.
3. O e-book será aberto no navegador padrão usando o protocolo `file://`.
* **Nota técnica:** Todas as funções essenciais (scroll, sidebar, hotspots, reveal blocks, checklists) funcionam de forma idêntica à web. O IntersectionObserver não emitirá erros graças à verificação de recursos no código JavaScript.

#### **Método B: Servidor Local Temporário (Vite)**
Para demonstrações integradas ou desenvolvimento:
1. Abra o terminal na pasta `ebook-ecosabon-prototipo/`.
2. Rode `npm run dev` (ou `npx vite`).
3. Acesse `http://localhost:5173/` no navegador.

---

### 3. Geração de PDF de Conferência
O web-book conta com uma folha de estilos dedicada para impressão ([print.css](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/ebook-ecosabon-prototipo/src/styles/print.css)). Para gerar o PDF:
1. Abra o `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
2. Pressione `Ctrl + P` (ou `Cmd + P` no macOS).
3. No painel de visualização:
   * Escolha "Salvar como PDF" como Destino.
   * Marque a opção "Gráficos de segundo plano" (para reter as cores suaves dos cards e caixas).
   * Verifique se as explicações do infográfico aparecem abertas de forma linearizada e os pins estão ocultos.
4. Salve o arquivo.

---

### 4. Diretrizes de Empacotamento em Arquivo ZIP
Para distribuir a versão demonstrável a professores, escolas ou avaliadores, gere um arquivo compactado (ZIP).

#### **Arquivos que DEVEM ser incluídos no pacote:**
```
ebook-ecosabon-prototipo/
├── index.html (Página principal do e-book)
├── package.json (Configuração e comandos locais)
└── src/
    ├── scripts/
    │   ├── app.js (Bootstrap da aplicação)
    │   └── interactions.js (Lógica interativa)
    └── styles/
        ├── main.css (Estilos gerais da aplicação)
        └── print.css (Estilos de impressão física e PDF)
```

#### **Arquivos e pastas que NÃO DEVEM ser incluídos no pacote (excluir ou adicionar a regras de ignore):**
* `node_modules/` (Devem ser instalados apenas para testes automatizados locally; o e-book offline não necessita desta pasta).
* `tests/` (Suíte de testes Vitest).
* `reports/` ou relatórios locais de benchmark (Devem permanecer locais sob governança).
* Arquivos temporários ou de controle como `.DS_Store` ou logs.

---

### 5. Limitações Conhecidas
* **Vídeos e Fontes:** Como não há conexões externas ativas ou dependências de rede, se houver futuras inserções de fontes personalizadas ou vídeos, estes deverão ser baixados e mantidos localmente na pasta `src/assets/` para manter a integridade offline.
* **Persistência de Progresso:** Como o uso de `localStorage` ou `sessionStorage` está bloqueado por governança (evitando vazamentos ou lógicas persistentes em computadores públicos), as marcações do checklist de fumaça serão reiniciadas a cada recarregamento da página.
