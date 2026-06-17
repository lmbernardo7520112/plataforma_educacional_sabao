// ============================================================================
// EcoSabon — Curso Interativo | Módulo 0: Porta de Entrada
// ============================================================================
// Contextualização do problema ambiental e apresentação da plataforma.
// Mapeamento de Engenharia: Onboarding + Contextualização
// ============================================================================

import type { CourseModule } from '../../domain/models/index.js';

export const module0: CourseModule = {
  id: 'mod-0',
  number: 0,
  title: 'Porta de Entrada: O Problema Invisível',
  subtitle: 'Entenda por que transformar óleo usado em sabão é ciência, não receita de vó.',
  engineeringPhase: 'Contextualização + Onboarding',
  lessons: [
    // ─── Lição 0.1 ──────────────────────────────────────────────────
    {
      id: 'lesson-0-1',
      title: 'O Desastre Invisível no Ralo',
      estimatedMinutes: 8,
      bloomLevel: 'Lembrar',
      objective: 'Identificar o impacto ambiental do descarte incorreto de óleo de cozinha.',
      blocks: [
        {
          type: 'text',
          data: {
            content: '<p>Toda vez que alguém joga <strong>1 litro de óleo</strong> no ralo da pia, até <strong>25.000 litros de água</strong> ficam impróprios para consumo. Isso equivale a <em>toda a água que uma pessoa bebe em 34 anos</em>.</p><p>O óleo forma uma película impermeável na superfície da água, impedindo a troca de oxigênio e matando organismos aquáticos por asfixia. Nas tubulações, endurece e causa entupimentos que geram transbordamentos de esgoto.</p><p>Mas existe uma <strong>reação química elegante</strong> que transforma esse vilão ambiental em um produto útil: o <em>sabão</em>. E é exatamente isso que vamos aprender a fazer — com rigor científico, segurança e tecnologia.</p>',
          },
        },
        {
          type: 'flashcards',
          data: {
            cards: [
              {
                front: '1 litro de óleo contamina quantos litros de água?',
                back: 'Até 25.000 litros — água suficiente para uma pessoa beber por 34 anos.',
              },
              {
                front: 'Por que o óleo é perigoso na água?',
                back: 'Forma uma película impermeável que impede a troca de oxigênio, causando morte de organismos por asfixia.',
              },
              {
                front: 'O que acontece com óleo nas tubulações?',
                back: 'Endurece ao esfriar, causando entupimentos e transbordamentos de esgoto.',
              },
              {
                front: 'Qual reação química transforma óleo em sabão?',
                back: 'Saponificação: reação entre um éster (óleo) e uma base forte (NaOH), produzindo sabão + glicerina.',
              },
            ],
          },
        },
        {
          type: 'sorting-activity',
          data: {
            prompt: 'Classifique cada item como CONSEQUÊNCIA DO DESCARTE INCORRETO ou BENEFÍCIO DA RECICLAGEM:',
            categories: ['Consequência do Descarte', 'Benefício da Reciclagem'],
            items: [
              { label: 'Contaminação de lençóis freáticos', correctCategory: 'Consequência do Descarte' },
              { label: 'Produção de sabão ecológico', correctCategory: 'Benefício da Reciclagem' },
              { label: 'Entupimento de tubulações', correctCategory: 'Consequência do Descarte' },
              { label: 'Geração de glicerina para cosméticos', correctCategory: 'Benefício da Reciclagem' },
              { label: 'Proliferação de insetos em esgoto', correctCategory: 'Consequência do Descarte' },
              { label: 'Redução do volume de lixo', correctCategory: 'Benefício da Reciclagem' },
            ],
            feedbackCorrect: '🎉 Excelente! Você compreendeu o impacto ambiental e os benefícios da transformação química.',
            feedbackIncorrect: '🔬 Revise: lembre-se que descarte incorreto causa DANOS ao meio ambiente, enquanto reciclagem TRANSFORMA o problema em solução.',
          },
        },
      ],
    },
    // ─── Lição 0.2 ──────────────────────────────────────────────────
    {
      id: 'lesson-0-2',
      title: 'O Que é o EcoSabon?',
      estimatedMinutes: 6,
      bloomLevel: 'Compreender',
      objective: 'Compreender a proposta pedagógica e funcionalidades da plataforma EcoSabon.',
      blocks: [
        {
          type: 'text',
          data: {
            content: '<p>O <strong>EcoSabon</strong> é uma plataforma educacional gamificada que transforma a fabricação de sabão ecológico em uma <em>jornada científica investigativa</em>.</p><p>Aqui você não é um mero espectador — você é um <strong>Cientista Aprendiz</strong> que registra dados reais, calcula proporções estequiométricas, monitora reações exotérmicas e publica relatórios científicos. Tudo isso enquanto acumula XP, sobe de ranking e desbloqueia conquistas.</p>',
          },
        },
        {
          type: 'process',
          data: {
            steps: [
              {
                title: 'Receba sua Missão',
                description: 'O professor cria a bancada experimental e define os parâmetros da missão.',
              },
              {
                title: 'Registre no Laboratório Digital',
                description: 'Fotografe seus reagentes, pese os materiais e registre tudo na plataforma.',
              },
              {
                title: 'O Motor Calcula',
                description: 'O SaponificationEngine valida seus dados e calcula a proporção NaOH/óleo.',
              },
              {
                title: 'Execute com Segurança',
                description: 'Siga o protocolo de segurança, monitore temperatura e pH em tempo real.',
              },
              {
                title: 'Publique seus Resultados',
                description: 'Gere seu Dossiê Científico em PDF com todos os dados da missão.',
              },
            ],
          },
        },
        {
          type: 'scenario',
          data: {
            context: 'Marina, aluna do 9º ano, acessou o EcoSabon pela primeira vez. Ela vê a tela de Dashboard mas todos os botões de missão estão com um ícone de cadeado 🔒. Ela tenta clicar mas nada acontece.',
            question: 'O que Marina deve fazer?',
            options: [
              {
                id: 'A',
                text: 'Procurar o Professor Carlos para que ele crie uma bancada experimental e adicione Marina a uma equipe.',
                isCorrect: true,
                feedback: '✅ Correto! No modelo B2B do EcoSabon, apenas o professor pode criar bancadas experimentais e atribuir alunos a esquadrões. O cadeado não é um erro — é uma feature de segurança que garante supervisão pedagógica.',
              },
              {
                id: 'B',
                text: 'Limpar o cache do navegador e tentar novamente.',
                isCorrect: false,
                feedback: '❌ O cadeado não é um erro técnico. É uma feature de segurança proposital. No EcoSabon, o fluxo começa pelo professor, que cria a bancada e libera as missões para seus alunos.',
              },
              {
                id: 'C',
                text: 'Criar sua própria bancada experimental usando o botão "Nova Bancada".',
                isCorrect: false,
                feedback: '❌ O botão "Nova Bancada" só aparece para usuários com perfil de professor. Alunos não podem criar bancadas — isso garante que toda atividade experimental tenha supervisão de um adulto responsável.',
              },
            ],
          },
        },
      ],
    },
    // ─── Lição 0.3 ──────────────────────────────────────────────────
    {
      id: 'lesson-0-3',
      title: 'Sua Jornada Começa Aqui',
      estimatedMinutes: 5,
      bloomLevel: 'Compreender',
      objective: 'Visualizar a jornada completa de módulos e comprometer-se com o aprendizado.',
      blocks: [
        {
          type: 'text',
          data: {
            content: '<p>Ao longo dos próximos <strong>7 módulos</strong> e <strong>24 lições</strong>, você será guiado desde os fundamentos da segurança laboratorial até a publicação do seu relatório científico final.</p><p>Cada módulo corresponde a uma <em>fase da engenharia</em> da plataforma EcoSabon. Ao completá-los, você não apenas aprende química — você entende como a tecnologia por trás da plataforma funciona.</p>',
          },
        },
        {
          type: 'accordion',
          data: {
            sections: [
              { title: '🔬 Módulo 1 — Fundação do Laboratório Digital', content: 'Aprenda como o EcoSabon organiza turmas, equipes e bancadas experimentais. Entenda o CRUD Mestre e a hierarquia de dados.' },
              { title: '🛡️ Módulo 2 — Segurança Máxima: O Jaleco Digital', content: 'Domine os protocolos de segurança, EPIs obrigatórios e os "Hard Blocks" que impedem operações perigosas.' },
              { title: '⚖️ Módulo 3 — A Precisão Científica', content: 'Entenda por que seus dados passam por validação dupla (Zod Firewalls) e como a precisão na pesagem afeta o resultado final.' },
              { title: '🌡️ Módulo 4 — Matemática e Termodinâmica do Sabão', content: 'Mergulhe no SaponificationEngine: constantes (SAP 191, Ratio 0.713), cálculos estequiométricos e monitoramento da reação exotérmica.' },
              { title: '🧪 Módulo 5 — Da Bancada ao Sabão', content: 'Execute a missão completa no Dashboard: registre dados, monitore pH e temperatura, e gere seu Dossiê Científico em PDF.' },
              { title: '👨‍🏫 Módulo 6 — Governança do Professor', content: 'Compreenda como o RBAC protege o sistema e como o professor gerencia turmas, relatórios e avaliações.' },
              { title: '🌍 Módulo 7 — Culminância: Embaixadores da Água', content: 'Calcule seu impacto ambiental real, publique seus resultados e torne-se um Embaixador da Água.' },
            ],
          },
        },
        {
          type: 'progress-tracker',
          data: {},
        },
      ],
    },
  ],
};
