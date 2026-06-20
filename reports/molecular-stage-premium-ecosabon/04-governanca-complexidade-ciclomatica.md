# Trilha Evolução Premium Molecular Stage 2.5D/4D
## Documento 04: Governança de Complexidade Ciclomática e Métricas de Código

Este documento estabelece as métricas limites de complexidade de software para a futura implementação da camada **Molecular Stage**, visando garantir código limpo, sustentável e de fácil auditoria.

---

### 1. Limites de Complexidade Ciclomática

A complexidade ciclomática mede o número de caminhos linearmente independentes através do código de uma função. Para manter o código simples e fácil de testar, adotamos os seguintes limites formais:

* **Métricas Limites por Função:**
  * **Complexidade Ideal:** `≤ 7` por função.
  * **Limite Máximo Permitido:** `10` por função.
  * **Caso de Exceção (> 10):** Exige justificativa técnica formal detalhada em relatório antes do commit.
* **Métricas por Arquivo/Módulo:**
  * **Linhas de Código (LOC):** O arquivo `molecular-stage.js` deve ser preferencialmente menor que `150` linhas de código executável (excluindo comentários).

---

### 2. Funções Existentes Críticas (Preservadas)
Os módulos e funções de interação existentes no e-book **não devem crescer em complexidade** devido à futura camada Molecular Stage. São elas:
* **`activateModule`** (em `navigation.js`): Controla a exibição das seções. Deve permanecer limpa e focada em paginação.
* **`initModulePagination`** (em `navigation.js`): Setup do histórico e eventos da sidebar.
* **`initSaponificationHotspots`** (em `hotspots.js`): Setup de cliques dos botões do infográfico.
* **`app.js`**: Arquivo inicializador que atua apenas orchestrando as chamadas dos módulos.

A inicialização do Molecular Stage no `app.js` deve ser feita em um bloco isolado de uma linha, sem injetar condicionais aninhadas (`if`, `switch`) ou laços de repetição que elevem a complexidade ciclomática global do arquivo inicializador.

---

### 3. Métodos de Inspeção (Sem Adicionar Dependências)

Para verificar as métricas de complexidade sem poluir o `package.json` de produção com novas ferramentas nesta fase, recomenda-se:
1. **Inspeção Estática Manual:** Validar visualmente o número de caminhos lógicos (laços `for`, `while`, condicionais `if`, `else if`, operadores ternários e lógicos `&&`, `||`) em cada nova função escrita. Se a função acumular mais de 7 pontos de ramificação, ela deve ser obrigatoriamente decomposta em sub-funções puras menores.
2. **Refatoração por Tabela de Decisão:** Substituir condicionais aninhadas por mapeamentos de objetos diretos simples. Por exemplo, mapear os estados de reação utilizando um dicionário estático em vez de múltiplos blocos `if-else`.

---

### 4. Configuração Futura Recomendada
Caso o projeto decida adotar o **ESLint** ou ferramentas de análise estática de código (como SonarQube) nas fases futuras do projeto, sugere-se configurar a seguinte regra no arquivo `.eslintrc.json`:
```json
{
  "rules": {
    "complexity": ["error", { "max": 7 }]
  }
}
```
Isto automatizará o portão de segurança de complexidade diretamente nos hooks de pré-commit do Git.
