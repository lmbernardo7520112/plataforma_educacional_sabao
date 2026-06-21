# Kit Comercial Apresentável — EcoSabon
## Documento 09: Relatório de Governança dos Artefatos Comerciais Externos

Este relatório define a política de governança, o controle de versionamento de arquivos binários e as diretrizes de integridade técnica para a geração e distribuição dos artefatos comerciais externos da plataforma educacional **EcoSabon**.

---

### 1. Objetivo dos Artefatos Comerciais

Os artefatos comerciais externos têm como finalidade posicionar o desenvolvimento de web-books baseados no case **EcoSabon v0.1.0** como um modelo profissional de serviços didáticos interativos, acessíveis e portáteis. Eles servem de demonstração prática e tangível a potenciais clientes, coordenadores pedagógicos e comissões acadêmicas sobre a viabilidade e excelência dos entregáveis técnicos da plataforma.

---

### 2. Arquivos-Base Utilizados

Para a compilação e consolidação dos materiais, foram revisados os seguintes arquivos-base na branch `main`:
* [01-one-page-comercial-apresentavel.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/01-one-page-comercial-apresentavel.md)
* [02-proposta-comercial-apresentavel-modelo.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/02-proposta-comercial-apresentavel-modelo.md)
* [03-tabela-pacotes-comerciais-para-cliente.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/03-tabela-pacotes-comerciais-para-cliente.md)
* [04-mensagens-prospeccao-whatsapp-linkedin.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/04-mensagens-prospeccao-whatsapp-linkedin.md)
* [05-roteiro-demo-comercial-10min.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/05-roteiro-demo-comercial-10min.md)
* [06-checklist-briefing-comercial.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/06-checklist-briefing-comercial.md)
* [07-governanca-comercial-e-limites-de-promessa.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/07-governanca-comercial-e-limites-de-promessa.md)
* [08-merge-kit-comercial-apresentavel-relatorio.md](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/reports/kit-comercial-apresentavel-ecosabon/08-merge-kit-comercial-apresentavel-relatorio.md)

---

### 3. Artefatos Gerados Localmente e Caminhos

Os seguintes arquivos finais de distribuição comercial foram gerados localmente no ambiente de desenvolvimento:

* **One-Page Comercial (PDF):**  
  `commercial_release/ecosabon-one-page-comercial.pdf`
* **Proposta Comercial Modelo (PDF):**  
  `commercial_release/ecosabon-proposta-comercial-modelo.pdf`
* **Mensagens de Prospecção (TXT):**  
  `commercial_release/ecosabon-mensagens-prospeccao.txt`
* **Checklist de Briefing Comercial (PDF):**  
  `commercial_release/ecosabon-checklist-briefing.pdf`

---

### 4. Governança contra Versionamento de Binários (Git Ignore)

> [!IMPORTANT]
> **Regra Estrita de Versionamento:** Os arquivos binários compilados (PDF, DOCX e ZIP) de natureza comercial destinam-se exclusivamente para envio a contatos externos e **não devem sob qualquer circunstância ser commitados ou rastreados no repositório principal**.

A pasta `commercial_release/` foi configurada e adicionada explicitamente ao arquivo `.gitignore` do repositório:
```gitignore
# Generated commercial artifacts — not versioned in main
commercial_release/
```
Esta configuração garante que o repositório Git permaneça leve e puramente dedicado à infraestrutura técnica de código e documentação.

---

### 5. Instruções de Regeneração dos Artefatos

Caso os arquivos Markdown de origem sofram alterações, os PDFs correspondentes podem ser regenerados no ambiente Linux executando os seguintes comandos baseados na ferramenta `pandoc` e no motor LaTeX:

```bash
# 1. Regenerar One-Page Comercial PDF
pandoc reports/kit-comercial-apresentavel-ecosabon/01-one-page-comercial-apresentavel.md -o commercial_release/ecosabon-one-page-comercial.pdf

# 2. Regenerar Proposta Comercial Modelo PDF
pandoc reports/kit-comercial-apresentavel-ecosabon/02-proposta-comercial-apresentavel-modelo.md -o commercial_release/ecosabon-proposta-comercial-modelo.pdf

# 3. Regenerar Checklist de Briefing PDF
pandoc reports/kit-comercial-apresentavel-ecosabon/06-checklist-briefing-comercial.md -o commercial_release/ecosabon-checklist-briefing.pdf
```

*(Caso o LaTeX não esteja disponível no ambiente de produção do cliente, o Pandoc pode utilizar os motores `weasyprint` ou `wkhtmltopdf`, ou os arquivos Markdown podem ser importados no LibreOffice Writer e exportados como PDF).*

---

### 6. Limites Comerciais, Éticos e de Promessa

Ao utilizar estes artefatos em negociações reais, as seguintes regras éticas devem ser rigorosamente seguidas:

1. **Preços são Editáveis e Placeholders:** Todos os valores expressos na proposta modelo ou tabelas são ilustrativos/placeholders. O prestador deve ajustar os custos de acordo com as especificidades do escopo real do cliente.
2. **Recomendação de Revisão Jurídica:** A proposta modelo fornecida destina-se a fins estruturais. Qualquer contratação definitiva exige a confecção de um instrumento particular de prestação de serviços revisado e assinado por profissional de advocacia qualificado.
3. **EcoSabon como Case Demonstrável:** A demonstração do case EcoSabon destina-se a comprovar a qualidade do código (HTML/CSS/JS), acessibilidade e a portabilidade offline-first, não devendo ser vendido como uma plataforma SaaS pronta ou aplicativo comercial empacotado.
4. **Sem Promessa de Validação Docente Real:** Fica expressamente vetado garantir ao cliente aprovação acadêmica de mestrado/doutorado ou aceitação cega de bancas examinadoras. A validação metodológica de sala de aula e o protocolo de aprovação no Comitê de Ética em Pesquisa (CEP/CONEP/TCLE) são responsabilidades exclusivas da equipe científica do cliente.
