import type { CourseModule } from '../../domain/models/index.js';

export const module5: CourseModule = {
  id: 'mod-5', number: 5,
  title: 'Da Bancada ao Sabão',
  subtitle: 'Execute a missão completa: registro de dados, monitoramento e geração do Dossiê.',
  engineeringPhase: 'Fase 4 — Dashboard + PDF',
  lessons: [
    {
      id: 'lesson-5-1', title: 'Passo a Passo: Sua Primeira Missão', estimatedMinutes: 10, bloomLevel: 'Aplicar',
      objective: 'Executar o fluxo completo de uma missão no Dashboard.',
      blocks: [
        { type: 'process', data: { steps: [
          { title: '1. Acesse o Dashboard', description: 'Faça login e entre na sua bancada experimental. Verifique se a missão está com status "Em Andamento".' },
          { title: '2. Registre os Reagentes', description: 'Pese o óleo e o NaOH. Digite as massas nos campos. O motor calcula automaticamente a proporção.' },
          { title: '3. Fotografe o Setup', description: 'Tire fotos do óleo medido, do NaOH pesado e dos EPIs. Upload direto pela câmera do celular.' },
          { title: '4. Execute a Reação', description: 'Dissolva o NaOH em água, adicione ao óleo e mexa por 20 min. Registre temperatura a cada 5 min.' },
          { title: '5. Registre pH Final', description: 'Após 24h de descanso, meça o pH com fita indicadora e registre no sistema.' },
          { title: '6. Submeta a Missão', description: 'Clique em "Submeter Missão". O sistema valida TUDO antes de aceitar. Se tiver Hard Block, corrija e tente novamente.' },
        ]}},
        { type: 'scenario', data: {
          context: 'Ao clicar em "Submeter Missão", o sistema exibe: "❌ Submissão bloqueada: campo pH está vazio."',
          question: 'O que isso significa?',
          options: [
            { id: 'A', text: 'O campo pH é obrigatório — é necessário medir e registrar o pH antes de submeter.', isCorrect: true, feedback: '✅ Correto! O schema Zod define pH como campo required. Sem pH, a análise de qualidade do sabão é impossível.' },
            { id: 'B', text: 'É um bug do sistema que deve ser reportado.', isCorrect: false, feedback: '❌ Não é bug — é validação intencional. Dados científicos incompletos não podem ser aceitos.' },
          ],
        }},
      ],
    },
    {
      id: 'lesson-5-2', title: 'Dossiê Científico: Seu Relatório em PDF', estimatedMinutes: 7, bloomLevel: 'Compreender',
      objective: 'Entender a estrutura e conteúdo do Dossiê Científico gerado automaticamente.',
      blocks: [
        { type: 'text', data: { content: '<p>Após submeter a missão, o EcoSabon gera automaticamente um <strong>Dossiê Científico em PDF</strong>. Este documento contém:</p>' } },
        { type: 'accordion', data: { sections: [
          { title: '📊 Dados Brutos', content: 'Massas de óleo e NaOH, temperaturas registradas, pH final, timestamps de cada registro.' },
          { title: '🧮 Cálculos do Motor', content: 'Massa de NaOH calculada, rendimento teórico vs. real, variação entálpica estimada, porcentagem de superfat efetiva.' },
          { title: '📸 Evidências Fotográficas', content: 'Todas as fotos enviadas durante a missão, com timestamp e legenda.' },
          { title: '📈 Análise de Qualidade', content: 'Classificação do sabão (Adequado/Gordo/Cáustico) baseada no pH e nos limites do SaponificationEngine.' },
          { title: '🏆 Gamificação', content: 'XP ganho, ranking na turma, badges conquistadas, comparação com médias da turma.' },
        ]}},
      ],
    },
    {
      id: 'lesson-5-3', title: 'Interpretando seus Resultados', estimatedMinutes: 8, bloomLevel: 'Avaliar',
      objective: 'Analisar criticamente os resultados do experimento e identificar fontes de erro.',
      blocks: [
        { type: 'text', data: { content: '<p>Depois de gerar o dossiê, é hora de pensar como cientista: <strong>o que deu certo? O que pode melhorar? Quais foram as fontes de erro?</strong></p>' } },
        { type: 'sorting-activity', data: {
          prompt: 'Classifique cada fator como FONTE DE ERRO EXPERIMENTAL ou RESULTADO ESPERADO:',
          categories: ['Fonte de Erro', 'Resultado Esperado'],
          items: [
            { label: 'Balança com precisão de ±5g', correctCategory: 'Fonte de Erro' },
            { label: 'pH entre 8 e 10.5', correctCategory: 'Resultado Esperado' },
            { label: 'Temperatura ambiente variou durante o experimento', correctCategory: 'Fonte de Erro' },
            { label: 'Sabão endureceu após 24h', correctCategory: 'Resultado Esperado' },
            { label: 'NaOH absorveu umidade do ar', correctCategory: 'Fonte de Erro' },
            { label: 'Glicerina separou naturalmente', correctCategory: 'Resultado Esperado' },
          ],
          feedbackCorrect: '🔬 Excelente análise crítica! Identificar erros é parte fundamental do método científico.',
          feedbackIncorrect: '💡 Dica: "fontes de erro" são fatores que introduzem imprecisão. "Resultados esperados" são fenômenos previstos pela teoria.',
        }},
      ],
    },
  ],
};
