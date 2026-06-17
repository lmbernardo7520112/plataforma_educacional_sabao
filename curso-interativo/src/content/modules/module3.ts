import type { CourseModule } from '../../domain/models/index.js';

export const module3: CourseModule = {
  id: 'mod-3', number: 3,
  title: 'A Precisão Científica',
  subtitle: 'Validação dupla de dados e a importância da precisão na pesagem.',
  engineeringPhase: 'Fase 2 — Zod Firewalls',
  lessons: [
    {
      id: 'lesson-3-1', title: 'Por Que Seus Dados São Validados Duas Vezes', estimatedMinutes: 7, bloomLevel: 'Compreender',
      objective: 'Entender o conceito de validação dupla (frontend + backend) e sua importância científica.',
      blocks: [
        { type: 'text', data: { content: '<p>No EcoSabon, cada dado que você digita passa por <strong>duas camadas de validação</strong>:</p><p><strong>Camada 1 (Frontend):</strong> O formulário no navegador verifica se o valor faz sentido (ex: massa > 0, pH entre 0 e 14).<br/><strong>Camada 2 (Backend):</strong> O servidor valida novamente usando <em>schemas Zod</em> — mesmo que alguém tente burlar o frontend.</p><p>Essa redundância existe porque em ciência, <em>um dado errado contamina toda a análise</em>. Um pH registrado como "15" (impossível) invalidaria todos os cálculos do SaponificationEngine.</p>' } },
        { type: 'flashcards', data: { cards: [
          { front: 'O que é Zod?', back: 'Uma biblioteca TypeScript de validação de schemas. Define a "forma" que os dados devem ter. Se o dado não se encaixa, é rejeitado antes de chegar ao banco de dados.' },
          { front: 'Por que validar no backend se já validou no frontend?', back: 'O frontend pode ser manipulado (DevTools). O backend é a última linha de defesa — "never trust the client".' },
          { front: 'O que acontece se um dado inválido chegar ao backend?', back: 'O Zod rejeita com erro 400 (Bad Request) e o dado NÃO é salvo. O frontend exibe a mensagem de erro para o aluno corrigir.' },
        ]}},
        { type: 'scenario', data: {
          context: 'Carlos digitou "abc" no campo de massa do óleo e clicou em "Salvar". O formulário no frontend já mostra um erro vermelho: "Valor deve ser um número positivo".',
          question: 'Se Carlos usar o DevTools para burlar o frontend e enviar "abc" direto para o servidor, o que acontece?',
          options: [
            { id: 'A', text: 'O backend rejeita com erro 400 porque o schema Zod exige um número positivo.', isCorrect: true, feedback: '✅ Exato! A validação Zod no backend é independente do frontend. Dados inválidos são SEMPRE rejeitados.' },
            { id: 'B', text: 'O dado "abc" é salvo no banco de dados.', isCorrect: false, feedback: '❌ Nunca! O middleware Zod intercepta a requisição antes de ela chegar ao controlador. Dados inválidos não passam.' },
          ],
        }},
      ],
    },
    {
      id: 'lesson-3-2', title: 'Pesagem: A Base de Todo Cálculo', estimatedMinutes: 6, bloomLevel: 'Aplicar',
      objective: 'Compreender como erros de pesagem afetam diretamente o resultado da saponificação.',
      blocks: [
        { type: 'text', data: { content: '<p>A reação de saponificação depende de <strong>proporções estequiométricas precisas</strong>. Se você erra na pesagem do óleo ou do NaOH, o resultado muda drasticamente:</p><p>• <strong>NaOH insuficiente:</strong> Sabão "gordo" — oleoso, não limpa, pH baixo (< 8)<br/>• <strong>NaOH em excesso:</strong> Sabão cáustico — perigoso para a pele, pH alto (> 10.5)<br/>• <strong>Proporção correta:</strong> Sabão seguro e eficaz, com 5% de superfat para hidratação</p>' } },
        { type: 'sorting-activity', data: {
          prompt: 'Classifique cada sintoma como indicativo de NaOH INSUFICIENTE ou NaOH EM EXCESSO:',
          categories: ['NaOH Insuficiente', 'NaOH em Excesso'],
          items: [
            { label: 'Sabão oleoso ao toque', correctCategory: 'NaOH Insuficiente' },
            { label: 'pH acima de 10.5', correctCategory: 'NaOH em Excesso' },
            { label: 'Sabão não produz espuma', correctCategory: 'NaOH Insuficiente' },
            { label: 'Queima a pele ao contato', correctCategory: 'NaOH em Excesso' },
            { label: 'Aspecto "melado"', correctCategory: 'NaOH Insuficiente' },
            { label: 'Aparência cristalina dura', correctCategory: 'NaOH em Excesso' },
          ],
          feedbackCorrect: '⚖️ Perfeito! Você entende como a proporção afeta o produto final.',
          feedbackIncorrect: '🔬 Dica: NaOH insuficiente = óleo sobrando (gordo). NaOH em excesso = base livre (cáustico).',
        }},
      ],
    },
    {
      id: 'lesson-3-3', title: 'Limites de Aceitação e Superfat', estimatedMinutes: 5, bloomLevel: 'Analisar',
      objective: 'Entender o conceito de superfat e os limites de aceitação do SaponificationEngine.',
      blocks: [
        { type: 'text', data: { content: '<p>O EcoSabon usa um <strong>superfat de 5%</strong> — isso significa que intencionalmente usamos 5% MENOS NaOH do que o necessário para saponificar todo o óleo. O resultado é um sabão com 5% de óleos não-reagidos, que atuam como <em>hidratantes naturais</em>.</p><p>As constantes do motor são: <strong>SAP = 191</strong> (índice de saponificação do óleo de cozinha usado), <strong>Ratio = 0.713</strong> (conversão para NaOH), <strong>Superfat = 5%</strong>.</p>' } },
        { type: 'flashcards', data: { cards: [
          { front: 'SAP = 191', back: 'Índice de saponificação: 191 mg de KOH são necessários para saponificar 1g de óleo de cozinha usado.' },
          { front: 'Ratio = 0.713', back: 'Fator de conversão KOH→NaOH: como usamos NaOH (não KOH), multiplicamos por 0.713.' },
          { front: 'Superfat = 5%', back: 'Reduzimos o NaOH em 5% para deixar óleos não-reagidos que hidratam a pele.' },
          { front: 'Fórmula: NaOH = Óleo × (SAP/1000) × Ratio × (1 - Superfat)', back: 'Ex: 500g óleo → 500 × 0.191 × 0.713 × 0.95 = 64.6g de NaOH' },
        ]}},
      ],
    },
  ],
};
