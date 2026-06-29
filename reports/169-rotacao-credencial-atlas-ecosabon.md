# R169 — Rotação de Credenciais do MongoDB Atlas — EcoSabon

## 1. Objetivo
Registrar a rotação segura da credencial de conexão com o MongoDB Atlas anteriormente exposta, mitigando o risco de segurança sem comprometer o histórico ou a integridade dos dados sintéticos do piloto restrito.

## 2. Motivo da Rotação
A connection string de acesso ao banco Atlas foi compartilhada anteriormente durante a fase de depuração do deploy em canais de comunicação integrados. De acordo com as melhores práticas de segurança cibernética (cybersecurity-first), qualquer credencial exposta fora do ambiente seguro de variáveis de ambiente deve ser tratada como permanentemente comprometida e rotacionada imediatamente.

## 3. Credencial Nova Criada
No painel do MongoDB Atlas:
- Foi criado o usuário dedicado **`ecosabon_pilot_runtime_v2`**.
- Foi gerada uma senha forte aleatória para o usuário.
- O privilégio foi configurado sob o princípio do menor privilégio, permitindo apenas leitura e escrita exclusivas no banco de dados do piloto (`ecosabon_pilot`).
- A nova connection string foi gerada no formato `mongodb+srv://ecosabon_pilot_runtime_v2:<PASSWORD>@<CLUSTER>/ecosabon_pilot?retryWrites=true&w=majority`.

## 4. Transição e Atualização no Render
- A credencial antiga comprometida foi mantida temporariamente ativa até a propagação completa da nova credencial para evitar interrupções de serviço.
- A variável de ambiente **`DATABASE_URL`** no dashboard do Render (serviço `ecosabon-api`) foi atualizada com o novo valor da URI do Atlas.
- Nenhuma outra variável de ambiente do Render foi alterada, e nenhum segredo foi exposto em commits ou logs de build do repositório.
