# R110 — FDP-SPIKE-0: Requisitos e Alinhamento de Runtime Local

## 1. Objetivo
Investigar as discrepâncias de runtime local, alinhar as portas do Client e do Server, validar as restrições e limites das contas gratuitas candidatas ao deploy e preparar o arquivo de roteamento proxy para o deploy na Vercel.

## 2. Alinhamento de Portas e Resolução de Discrepância (Proxy 3000 vs 4000)

### 2.1 Cenário Anterior
- **Client Proxy (`client/vite.config.ts`)**: Configurado para apontar para `http://localhost:4000`.
- **Server `.env`**: Configurado localmente com `PORT=4000`, rodando na porta 4000 e funcionando no host.
- **Server `.env.example`**: Documentava a porta padrão `PORT=3000`.
- **Docker Compose e Dockerfile**: Configurados para expor e mapear a porta `3000` (`"3000:3000"`).

### 2.2 Problema Identificado
Se o desenvolvedor utilizasse a porta de exemplo (`3000`), a comunicação local falharia porque o proxy do Vite continuaria enviando requisições para a porta `4000`. Se rodasse a plataforma via Docker Compose, o mapeamento mapearia a porta externa `3000` para a interna `3000`, mas o servidor, lendo o `.env` real com `PORT=4000`, estaria ouvindo em `4000` dentro do container, resultando em quebra total de acesso.

### 2.3 Resolução Aplicada
Para unificar a arquitetura e garantir compatibilidade nativa com o Docker Compose e o `.env.example`, alinhamos todo o runtime local para a porta **`3000`**:

1. **Client Proxy**: Atualizado em [vite.config.ts](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/client/vite.config.ts) para apontar para `http://localhost:3000`.
2. **Server Local Env**: Atualizado em `server/.env` para utilizar `PORT=3000`.
3. **Validação**: Testes rodados localmente confirmando que a comunicação API local está 100% verde na porta 3000.

## 3. Auditoria de Termos dos Serviços Gratuitos (Junho/2026)

### 3.1 Vercel Hobby (Client SPA)
- **Limite de Transferência (Bandwidth)**: 100 GB/mês.
- **Invocações Serverless**: 1 milhão/mês (não nos afeta diretamente, pois a API rodará no Render).
- **Tempo de Build**: 45 min por deploy.
- **Termo Central**: Uso estritamente pessoal e não comercial. Em caso de estouro de limite, a conta é suspensa temporariamente até o próximo reset de 30 dias (não há cobrança de overage automática).

### 3.2 Render Free Tier (Express API)
- **Inatividade e Spin-down**: O serviço é desligado após **15 minutos** sem tráfego de entrada.
- **Tempo de Cold Start**: O primeiro acesso após spin-down leva de **30 a 60 segundos** para recompilar/iniciar.
- **Cota Mensal**: 750 horas de execução grátis por mês por workspace.
- **Armazenamento**: O sistema de arquivos é **efêmero**. Uploads locais salvos com Multer (`server/uploads/`) serão apagados ao reiniciar.
  > ⚠️ **Aviso de Limitação**: O upload de evidências de fotos das bancadas será apagado nos ciclos de reinicialização do Render. Isso é aceitável para o piloto técnico (spike), mas exige migração futura (ex: Cloudinary) para piloto real.

### 3.3 MongoDB Atlas M0 Free Cluster (Banco de Dados)
- **Armazenamento Máximo**: 512 MB.
- **Limite de Conexões**: 500 conexões simultâneas.
- **Transferência de Rede**: Limite de 10 GB de entrada e 10 GB de saída por período de 7 dias (sujeito a gargalo de velocidade se estourado).
- **Inatividade**: O cluster pode ser pausado se ficar inativo por 60 dias.
- **Backups**: Sem suporte a backups automáticos na camada grátis. A recuperação de desastres exige `mongodump` manual.

## 4. Validação do Seed de Dados
- **Arquivo**: `server/seed/turmas_alunos.json`
- **Conteúdo**: 2 turmas fictícias ("3º ANO A" com 7 alunos, "3º ANO B" com 5 alunos) e 1 professor padrão gerado automaticamente.
- **Suficiência**: Os dados são sintéticos e totalmente adequados para validar a plataforma em ambiente público temporário sem expor informações pessoais reais (LGPD/Segurança).

## 5. Escopo e Roteiro do Spike
1. Configurar o MongoDB Atlas com IP aberto (`0.0.0.0/0`) devido a IPs dinâmicos do Render.
2. Iniciar o servidor Node.js no Render apontando para o Atlas e rodar o seed localmente redirecionado.
3. Criar a interface de redirecionamento na Vercel através do [client/vercel.json](file:///home/leonardomaximinobernardo/My_projects/plataforma_educacional_sabao/client/vercel.json) para que chamadas a `/api/*` vão para o Render.
4. Efetuar o teste manual de onboarding de alunos e submissão de relatório para testar o fluxo de ponta a ponta.
