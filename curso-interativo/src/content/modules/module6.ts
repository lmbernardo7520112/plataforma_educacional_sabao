import type { CourseModule } from '../../domain/models/index.js';

export const module6: CourseModule = {
  id: 'mod-6', number: 6,
  title: 'Governança do Professor',
  subtitle: 'RBAC, gestão de turmas e o painel administrativo.',
  engineeringPhase: 'Fase 5 — RBAC + B2B',
  lessons: [
    {
      id: 'lesson-6-1', title: 'RBAC: Quem Pode O Quê', estimatedMinutes: 7, bloomLevel: 'Compreender',
      objective: 'Entender o sistema de controle de acesso baseado em papéis.',
      blocks: [
        { type: 'text', data: { content: '<p><strong>RBAC</strong> (Role-Based Access Control) é o sistema que define <em>quem pode fazer o quê</em> na plataforma. Cada usuário tem um <strong>papel</strong> (role) que determina suas permissões:</p>' } },
        { type: 'flashcards', data: { cards: [
          { front: 'Role: student', back: 'Pode: Ver sua bancada, registrar dados, submeter missões, ver seu dossiê.\nNão pode: Criar turmas, ver dados de outros alunos, acessar painel do professor.' },
          { front: 'Role: teacher', back: 'Pode: Criar turmas, formar esquadrões, definir missões, ver relatórios de toda a turma, gerar relatórios.\nNão pode: Alterar dados já submetidos pelos alunos (imutabilidade).' },
          { front: 'Role: admin', back: 'Pode: Cadastrar escolas, gerenciar professores, acessar métricas globais.\nNão pode: Interferir em dados de experimentos (separação de responsabilidades).' },
        ]}},
        { type: 'scenario', data: {
          context: 'Um aluno descobre a URL da área do professor (/professor) e tenta acessar diretamente no navegador.',
          question: 'O que acontece?',
          options: [
            { id: 'A', text: 'O middleware de autenticação verifica o JWT do aluno, detecta role="student" e retorna erro 403 (Forbidden).', isCorrect: true, feedback: '✅ Exato! O RBAC no backend verifica o papel no token JWT a cada requisição. Conhecer a URL não é suficiente — precisa ter o papel correto.' },
            { id: 'B', text: 'O aluno consegue ver o painel do professor.', isCorrect: false, feedback: '❌ Impossível! O RBAC opera no backend, não no frontend. Mesmo acessando a URL correta, o servidor rejeita a requisição.' },
          ],
        }},
      ],
    },
    {
      id: 'lesson-6-2', title: 'O Painel do Professor', estimatedMinutes: 6, bloomLevel: 'Compreender',
      objective: 'Conhecer as ferramentas disponíveis no painel administrativo do professor.',
      blocks: [
        { type: 'text', data: { content: '<p>O professor tem acesso a um painel exclusivo com ferramentas para gerenciar todo o ciclo experimental:</p>' } },
        { type: 'accordion', data: { sections: [
          { title: '📋 Gestão de Turmas', content: 'Criar, editar e arquivar turmas. Cada turma tem código de acesso único para os alunos se matricularem.' },
          { title: '👥 Formação de Esquadrões', content: 'Agrupar alunos em equipes de 3-5 pessoas. Drag-and-drop para reorganizar membros entre esquadrões.' },
          { title: '🔬 Configuração de Missões', content: 'Definir parâmetros da missão: tipo de óleo, faixa de temperatura aceita, prazo de entrega.' },
          { title: '📊 Relatórios e Analytics', content: 'Visualizar desempenho da turma: médias de pH, ranking de XP, taxa de conclusão, fotos submetidas.' },
          { title: '📄 Exportação de Dossiês', content: 'Baixar todos os dossiês da turma em lote para avaliação e arquivamento.' },
        ]}},
      ],
    },
    {
      id: 'lesson-6-3', title: 'Modelo B2B: Escola → Professor → Aluno', estimatedMinutes: 5, bloomLevel: 'Compreender',
      objective: 'Entender por que o EcoSabon opera no modelo B2B e suas vantagens.',
      blocks: [
        { type: 'text', data: { content: '<p>O EcoSabon opera no modelo <strong>B2B (Business-to-Business)</strong>: a plataforma é contratada pela <em>escola</em>, que atribui acesso aos <em>professores</em>, que por sua vez gerenciam seus <em>alunos</em>.</p><p>Isso garante:</p><p>• <strong>Supervisão pedagógica:</strong> Nenhum aluno experimenta sem orientação<br/>• <strong>Responsabilidade institucional:</strong> A escola é responsável pelos experimentos<br/>• <strong>Controle de qualidade:</strong> O professor valida os resultados antes da publicação</p>' } },
        { type: 'flashcards', data: { cards: [
          { front: 'Por que não é B2C (direto para o aluno)?', back: 'Porque manipulação de NaOH requer supervisão de adulto. O modelo B2B garante que todo experimento tem um professor responsável.' },
          { front: 'O que é um "sandbox público"?', back: 'Seria um ambiente onde qualquer pessoa pode experimentar sem supervisão. O EcoSabon proíbe sandboxes públicos por razões de segurança.' },
        ]}},
      ],
    },
  ],
};
