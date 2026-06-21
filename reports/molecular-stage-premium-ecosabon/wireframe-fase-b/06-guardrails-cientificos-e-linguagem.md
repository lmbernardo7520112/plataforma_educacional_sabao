# Molecular Stage — Wireframe & Especificação Fase B
## Documento 06: Guardrails Científicos e Diretrizes de Linguagem

Este documento estabelece as regras de terminologia e controle de discurso científico para a futura camada Molecular Stage, definindo termos proibidos e microcopies para evitar que a ferramenta seja mal interpretada como um simulador quantitativo real.

---

### 1. Terminologia Controlada de Discurso

Para proteger a integridade técnica e evitar promessas indevidas de exatidão de dados moleculares, a redação e os textos da interface devem seguir o seguinte dicionário de regras:

#### **Termos Permitidos (Foco Didático):**
* *"Ilustração atômica simplificada"*
* *"Esquema molecular qualitativo"*
* *"Animação conceitual de etapas"*
* *"Representação didática da reação"*
* *"Reorganização qualitativa de ligações"*

#### **Termos Terminantemente Proibidos (Discurso Comercial ou Técnico):**
* *"Simulador químico de alta precisão"*
* *"Cálculo estequiométrico em tempo real"*
* *"Modelo molecular cientificamente validado"*
* *"Previsão de resultados experimentais"*
* *"Simulador de pH e entalpia"*
* *"Laboratório virtual dinâmico quantitativo"*

---

### 2. Como Declarar a Natureza Qualitativa e Evitar "Simulação"

Deve-se deixar claro em toda a documentação externa e interna que a feature:
* **Não é um software de modelagem molecular:** Não calcula campos de força atômica, conformação de energia de proteínas, nem otimização geométrica molecular real.
* **Não prevê resultados químicos:** Não calcula o rendimento do sabão se o usuário mudar a concentração da soda ou o tipo de gordura.
* **É uma transposição didática estática linearizada:** Funciona como uma sequência de quadros (slides) explicativos ilustrados que se alternam com base na interação do usuário, sem qualquer cálculo matemático químico dinâmico rodando em segundo plano.

---

### 3. Texto Padrão de Disclaimer (Aviso de Isenção)

> [!WARNING]
> **Aviso de Isenção Científica (Disclaimer):**  
> *Esta visualização molecular é uma representação esquemática qualitativa simplificada para fins didáticos, ilustrando a reorganização de átomos e clivagem de ligações químicas durante o processo de saponificação. Não corresponde a uma simulação científica quantitativa ou software de modelagem molecular real baseada em dinâmica molecular.*

Este texto deve ser exibido permanentemente no rodapé do componente do Palco Molecular em tamanho de fonte legível de 12px, ou acessível através de um botão de ajuda interativo (`aria-label="Aviso de isenção de precisão científica"`).

---

### 4. Microcopy Recomendada para a Interface

* **Título do Palco:** *"Mecanismo da Reação (Qualitativo)"*
* **Legenda dos Botões:** *"Avançar Etapa Didática"* / *"Recuar Etapa Didática"*
* **Identificação de Átomo:** *"Carbono (representação esquemática)"*
* **Explicação do Rendimento:** *"Economia Atômica: Ilustração da conservação de massa onde 100% dos átomos de reagentes se reorganizam nos produtos finais úteis."*
