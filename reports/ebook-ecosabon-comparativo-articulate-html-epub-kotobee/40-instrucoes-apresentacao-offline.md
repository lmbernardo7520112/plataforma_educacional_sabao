# Estudo Comparativo EcoSabon: HTML/CSS/JS, Articulate PDF, EPUB e Kotobee
## Documento 40: Instruções para Apresentação Offline do Web-book

**Branch Relacionada:** `release/ecosabon-local-package-and-pdf`  
**Autor:** Antigravity (Pair Programming AI)  
**Status:** ✅ CONCLUÍDO (Instruções documentadas)  
**Data:** 2026-06-20  

---

### 1. Introdução e Objetivo
Este guia orienta a abertura, teste e apresentação offline do web-book interativo **EcoSabon** a partir do pacote estático de distribuição local. Como o projeto adota o padrão moderno de **ES Modules** nativos (JavaScript modularizado), alguns navegadores bloqueiam a execução de scripts locais via protocolo de arquivo direto por motivos de segurança (CORS). Estas instruções garantem uma inicialização correta em qualquer ambiente local.

---

### 2. Como Abrir o Web-book Offline

#### **Opção 1: Servidor Local de Desenvolvimento Simples (Altamente Recomendada)**
Esta opção garante a execução completa de todos os scripts e interatividades do e-book (navegação por módulos ativos, popstate, hotspots do infográfico, cartões e Go/No-Go checklist).

1. Extraia o conteúdo de `ecosabon-webbook-demo-local.zip` em uma pasta.
2. Abra o terminal (bash/cmd) na pasta extraída.
3. Inicie um servidor HTTP local de uma linha dependendo do seu ecossistema instalado:
   * **Se possui Python (3.x instalado):**
     ```bash
     python -m http.server 8000
     ```
   * **Se possui Node.js:**
     ```bash
     npx http-server -p 8000
     ```
   * **Se possui PHP:**
     ```bash
     php -S localhost:8000
     ```
4. Abra o navegador e acesse a URL:
   `http://localhost:8000`

#### **Opção 2: Abertura Direta do Arquivo index.html (Fallback Linear)**
Se não houver interpretadores como Python ou Node disponíveis no computador de apresentação:
1. Clique duas vezes no arquivo `index.html` ou arraste-o para o navegador.
2. **Resultado esperado:** Devido às restrições de segurança do protocolo `file://`, o navegador bloqueará o carregamento dos scripts modulares. O web-book iniciará em modo de **degradação progressiva linear**, no qual todos os capítulos/módulos aparecem renderizados abertos e sequenciais (fluxo contínuo), igualando-se ao comportamento da folha de estilos de impressão e permitindo a leitura contínua do conteúdo pedagógico sem interrupções.

---

### 3. Como Gerar o PDF de Conferência Novamente
Caso queira atualizar ou reconstruir o PDF de conferência técnica:
1. Certifique-se de que o servidor local está ativo (conforme a Opção 1).
2. Abra o e-book no navegador (ex: Chrome).
3. Pressione a combinação de teclas **Ctrl + P** (ou vá em Menu > Imprimir).
4. No campo "Destino", escolha **"Salvar como PDF"**.
5. Em "Mais definições", verifique se a opção **"Gráficos de fundo"** está marcada (para garantir a renderização adequada de cores de blocos).
6. Clique em **Salvar** e salve com o nome `ecosabon-webbook-pdf-conferencia.pdf`.

*Alternativamente, via linha de comando (headless):*
```bash
google-chrome --headless --disable-gpu --print-to-pdf=release/ecosabon-webbook-pdf-conferencia.pdf http://localhost:8000/
```

---

### 4. Limitações Conhecidas e Recomendações
* **CORS Local:** O protocolo `file://` impede o funcionamento da navegação paginada por módulo na tela. Utilize preferencialmente a Opção 1 (Vite local ou servidores simples de terminal).
* **Dados Fictícios:** O material é uma versão prototípica de homologação e de caráter técnico. Portanto, as strings marcadas como `"DADOS FICTÍCIOS"` e referências a habilidades `"habilidade BNCC"` são mantidas de propósito no e-book para fins de auditoria de gates pedagógicos.
* **Governança de Interatividades Complexas:** As simulações experimentais avançadas (C4/3E) e visualizações moleculares 3D dinâmicas com dependência de bibliotecas de terceiros (Unity/WebGL/Three.js) estão **desativadas** nesta versão, com governança mantida sob as diretrizes SDD/TDD do projeto.
