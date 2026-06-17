// ============================================================================
// EcoSabon — Curso Interativo | Módulo 1: Fundação do Laboratório Digital
// ============================================================================
// Mapeamento de Engenharia: Fase 1 (CRUD Mestre)
// ============================================================================

import type { CourseModule } from '../../domain/models/index.js';

export const module1: CourseModule = {
  id: 'mod-1',
  number: 1,
  title: 'Fundação do Laboratório Digital',
  subtitle: 'Como o EcoSabon organiza turmas, equipes e bancadas experimentais.',
  engineeringPhase: 'Fase 1 — CRUD Mestre',
  lessons: [
    {
      id: 'lesson-1-1',
      title: 'Hierarquia: Escola → Turma → Esquadrão',
      estimatedMinutes: 7,
      bloomLevel: 'Compreender',
      objective: 'Entender a estrutura organizacional do EcoSabon e os papéis de cada ator.',
      blocks: [
        {
          type: 'text',
          data: { content: '<p>O EcoSabon funciona como um <strong>laboratório digital organizado em camadas</strong>. Cada camada tem uma função e um responsável:</p><p><strong>Escola</strong> → Cadastrada pelo administrador. Cada escola tem um código único.<br/><strong>Turma</strong> → Criada pelo professor dentro de uma escola. Ex: "9º Ano B".<br/><strong>Esquadrão</strong> → Grupo de 3-5 alunos dentro de uma turma. Cada esquadrão recebe uma bancada experimental.</p><p>Essa hierarquia garante que <em>toda atividade experimental tenha supervisão</em> e que os dados nunca se misturem entre turmas.</p>' },
        },
        {
          type: 'process',
          data: {
            steps: [
              { title: 'Professor faz login', description: 'Acessa o painel com credenciais institucionais e vê suas turmas.' },
              { title: 'Professor cria a Turma', description: 'Define nome, série e código de acesso para os alunos.' },
              { title: 'Alunos se matriculam', description: 'Usam o código da turma para se registrar na plataforma.' },
              { title: 'Professor forma Esquadrões', description: 'Agrupa alunos em equipes de 3-5 pessoas e atribui bancadas.' },
              { title: 'Missão é liberada', description: 'O professor define parâmetros e libera a missão para os esquadrões.' },
            ],
          },
        },
        {
          type: 'scenario',
          data: {
            context: 'O Professor João quer que seus 30 alunos realizem o experimento de saponificação. Ele acabou de acessar o EcoSabon pela primeira vez.',
            question: 'Qual deve ser a PRIMEIRA ação do Professor João?',
            options: [
              { id: 'A', text: 'Criar a turma "9º Ano A" no painel do professor.', isCorrect: true, feedback: '✅ Correto! O primeiro passo é criar a turma. Sem turma, não há como registrar alunos ou criar esquadrões.' },
              { id: 'B', text: 'Pedir aos alunos que criem suas contas individualmente.', isCorrect: false, feedback: '❌ Os alunos precisam de um código de turma para se registrar. O professor deve criar a turma primeiro.' },
              { id: 'C', text: 'Configurar a bancada experimental com os reagentes.', isCorrect: false, feedback: '❌ A bancada é criada DEPOIS da turma e dos esquadrões. Sem estrutura organizacional, não há onde vincular a bancada.' },
            ],
          },
        },
      ],
    },
    {
      id: 'lesson-1-2',
      title: 'Bancada Experimental: Seu Laboratório Virtual',
      estimatedMinutes: 8,
      bloomLevel: 'Aplicar',
      objective: 'Saber configurar e navegar na bancada experimental do EcoSabon.',
      blocks: [
        {
          type: 'text',
          data: { content: '<p>A <strong>Bancada Experimental</strong> é o coração do EcoSabon. É onde toda a ação acontece: registro de reagentes, cálculos estequiométricos, fotos do experimento e monitoramento da reação.</p><p>Cada bancada pertence a <em>um esquadrão</em> e contém <em>uma missão</em>. Pense nela como seu diário de bordo digital — tudo que acontece no experimento físico é registrado aqui.</p>' },
        },
        {
          type: 'accordion',
          data: {
            sections: [
              { title: '📋 Aba: Dados do Experimento', content: 'Campos para registrar massa do óleo, volume de NaOH, temperatura inicial e final, pH medido. Todos os campos são validados pelo motor Zod antes de serem aceitos.' },
              { title: '📸 Aba: Registro Fotográfico', content: 'Upload de fotos do antes, durante e depois do experimento. As imagens são vinculadas ao dossiê final e servem como evidência empírica.' },
              { title: '🧮 Aba: Cálculos Automáticos', content: 'O SaponificationEngine calcula automaticamente: massa de NaOH necessária, rendimento esperado, variação entálpica e eficiência da reação.' },
              { title: '📊 Aba: Relatório', content: 'Geração automática de PDF com todos os dados, fotos e cálculos. O Dossiê Científico pode ser baixado e impresso.' },
            ],
          },
        },
        {
          type: 'sorting-activity',
          data: {
            prompt: 'Organize cada funcionalidade na aba CORRETA da bancada:',
            categories: ['Dados do Experimento', 'Registro Fotográfico', 'Cálculos Automáticos'],
            items: [
              { label: 'Massa do óleo em gramas', correctCategory: 'Dados do Experimento' },
              { label: 'Foto do sabão pronto', correctCategory: 'Registro Fotográfico' },
              { label: 'Cálculo de rendimento', correctCategory: 'Cálculos Automáticos' },
              { label: 'Temperatura da mistura', correctCategory: 'Dados do Experimento' },
              { label: 'Foto dos EPIs utilizados', correctCategory: 'Registro Fotográfico' },
              { label: 'Variação entálpica ΔH', correctCategory: 'Cálculos Automáticos' },
            ],
            feedbackCorrect: '🎉 Perfeito! Você já sabe onde cada informação vive dentro da bancada.',
            feedbackIncorrect: '🔬 Revise: dados numéricos vão em "Dados", imagens em "Registro Fotográfico" e resultados calculados em "Cálculos".',
          },
        },
      ],
    },
    {
      id: 'lesson-1-3',
      title: 'CRUD: Criar, Ler, Atualizar e Deletar',
      estimatedMinutes: 6,
      bloomLevel: 'Compreender',
      objective: 'Entender como os dados fluem no sistema (criação, leitura, atualização e exclusão segura).',
      blocks: [
        {
          type: 'text',
          data: { content: '<p>Em sistemas de informação, <strong>CRUD</strong> é a sigla para as 4 operações fundamentais sobre dados: <strong>C</strong>reate, <strong>R</strong>ead, <strong>U</strong>pdate, <strong>D</strong>elete.</p><p>No EcoSabon, cada operação tem regras rigorosas de segurança:</p>' },
        },
        {
          type: 'flashcards',
          data: {
            cards: [
              { front: 'CREATE (Criar)', back: 'Apenas o professor pode criar turmas, esquadrões e missões. Alunos podem criar registros dentro de suas bancadas.' },
              { front: 'READ (Ler)', back: 'Alunos veem apenas seus próprios dados. Professores veem dados de toda a turma. Isso é controlado por RBAC (Role-Based Access Control).' },
              { front: 'UPDATE (Atualizar)', back: 'Dados podem ser corrigidos enquanto a missão estiver "em andamento". Após submissão, ficam travados (imutabilidade científica).' },
              { front: 'DELETE (Excluir)', back: 'Exclusão é em cascata: deletar uma turma remove todos os esquadrões e bancadas vinculados. Isso evita dados órfãos.' },
            ],
          },
        },
      ],
    },
  ],
};
