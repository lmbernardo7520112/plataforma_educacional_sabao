# Protótipo de E-book Interativo — EcoSabon

> ⚠️ **Protótipo com `[DADOS FICTÍCIOS PARA TESTE]`.** Nenhum dado real de dissertação foi utilizado.

## 1. Objetivo do Protótipo

Construir um e-book interativo, responsivo e navegável sobre ensino de saponificação e Química Verde por rotação de estações (missões), com comparação didática entre prática manual e mediação tecnológica/IoT. O produto funciona como protótipo técnico-editorial para futura substituição por dados reais da dissertação.

## 2. Como Abrir Localmente

```bash
# Opção A — Com Vite (recomendado para desenvolvimento)
cd ebook-ecosabon-prototipo
npm install
npm run dev

# Opção B — Abertura direta no navegador (produto estático)
# Basta abrir o arquivo index.html em qualquer navegador moderno.
# Nota: os caminhos de CSS/JS usam "/" absoluto, então para abertura
# direta via file://, use um servidor estático simples:
npx -y serve .
```

## 3. Estrutura de Pastas

```
ebook-ecosabon-prototipo/
├── README.md                           ← Este arquivo
├── package.json                        ← Dependências dev (Vite/Vitest)
├── index.html                          ← E-book interativo principal
├── src/
│   ├── styles/
│   │   ├── main.css                    ← Design System Dark Science
│   │   └── print.css                   ← Estilos para impressão
│   └── scripts/
│       ├── app.js                      ← Bootstrap (eventos/wiring)
│       └── interactions.js             ← Lógica testável (navegação, toggles, checklist)
├── tests/
│   └── interactions.test.js            ← Testes unitários (Vitest + jsdom)
├── docs/
│   ├── especificacao-executiva.md      ← Matriz dissertação → e-book
│   ├── matriz-estacoes.md              ← Template das 3 estações
│   ├── rubrica-avaliacao.md            ← Rubrica 0-10 com pesos
│   └── formulario-validacao-docente.md ← Escala Likert 1-5
└── anexos/
    ├── roteiro-estudante-estacao-1.md  ← Filtração do Óleo
    ├── roteiro-estudante-estacao-2.md  ← Reator IoT vs Manual
    ├── roteiro-estudante-estacao-3.md  ← Teste de pH
    ├── guia-rapido-professor.md        ← Guia do professor
    └── instrumento-avaliacao.md        ← Instrumento de avaliação
```

## 4. Partes Fictícias

Todo conteúdo fictício está marcado com `[DADOS FICTÍCIOS PARA TESTE]` ou placeholders visíveis:

| Elemento                     | Status           |
| ---------------------------- | ---------------- |
| 3 Estações de rotação        | Fictícias (demonstrativas) |
| Resultados da dissertação    | Placeholders     |
| Instrumentos de coleta       | Placeholders     |
| Alinhamento BNCC             | `[habilidade BNCC/currículo local a validar]` |
| URLs de QR Code              | Placeholders (`https://exemplo.edu/...`) |
| Formulário de validação      | Demonstrativo (requer aprovação do CEP) |

## 5. Campos a Substituir por Dados Reais

- `[resultado da dissertação]` → Resultados reais após análise
- `[instrumento de coleta]` → Instrumento real utilizado
- `[limitação metodológica]` → Limitações reais identificadas
- `[habilidade BNCC/currículo local a validar]` → Habilidade real após definição curricular
- `[nome da estação]` → Nomes reais das estações da pesquisa
- `[DADOS FICTÍCIOS PARA TESTE]` → Remover tag e inserir dados reais

## 6. Checklist de QA

- [x] O projeto abre localmente
- [x] O e-book tem navegação funcional (8 seções)
- [x] Há pelo menos 4 módulos principais
- [x] Há pelo menos 3 estações fictícias demonstrativas
- [x] Cada estação contém todos os campos obrigatórios (objetivo, conteúdo, materiais, tempo, mediação, avaliação, adaptação, anexo)
- [x] Há anexos em Markdown (5 arquivos)
- [x] Há rubrica 0-10 com pesos
- [x] Há formulário de validação docente (escala 1-5 + pergunta aberta)
- [x] Há checklist Go/No-Go funcional
- [x] O design é responsivo (mobile + desktop)
- [x] A impressão gera material legível (`print.css`)
- [x] Todo conteúdo fictício está identificado
- [x] Nenhuma afirmação indevida de resultado real foi inserida
- [x] 10/10 testes unitários passando

## 7. Próximos Passos para Produto Final

1. Substituir todas as estações fictícias por estações reais da dissertação
2. Inserir resultados reais no Módulo 3
3. Validar alinhamento curricular (BNCC / currículo local)
4. Aplicar formulário de validação com professores (após aprovação do CEP)
5. Avaliar com a rubrica 0-10
6. Executar checklist Go/No-Go final
7. Decidir plataforma definitiva de publicação
8. Produzir vídeo demonstrativo (fase posterior planejada)
