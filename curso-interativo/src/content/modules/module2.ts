import type { CourseModule } from '../../domain/models/index.js';

export const module2: CourseModule = {
  id: 'mod-2', number: 2,
  title: 'Segurança Máxima: O Jaleco Digital',
  subtitle: 'Protocolos de segurança, EPIs e os Hard Blocks que impedem operações perigosas.',
  engineeringPhase: 'Regras de Negócio — Hard Blocks',
  lessons: [
    {
      id: 'lesson-2-1', title: 'EPIs Obrigatórios no Laboratório', estimatedMinutes: 8, bloomLevel: 'Aplicar',
      objective: 'Identificar e utilizar corretamente os EPIs para manipulação de NaOH.',
      blocks: [
        { type: 'text', data: { content: '<p>A soda cáustica (NaOH) é uma <strong>base forte com pH ~14</strong>. Contato com pele causa queimaduras químicas graves. Por isso, EPIs são <em>obrigatórios e inegociáveis</em> antes de tocar em qualquer reagente.</p>' } },
        { type: 'sorting-activity', data: {
          prompt: 'Classifique cada item como EPI OBRIGATÓRIO ou NÃO PERMITIDO no laboratório:',
          categories: ['EPI Obrigatório', 'Não Permitido'],
          items: [
            { label: 'Óculos de proteção', correctCategory: 'EPI Obrigatório' },
            { label: 'Luvas de borracha nitrílica', correctCategory: 'EPI Obrigatório' },
            { label: 'Avental/jaleco de manga longa', correctCategory: 'EPI Obrigatório' },
            { label: 'Sandálias abertas', correctCategory: 'Não Permitido' },
            { label: 'Relógio e pulseiras', correctCategory: 'Não Permitido' },
            { label: 'Calçado fechado', correctCategory: 'EPI Obrigatório' },
          ],
          feedbackCorrect: '🛡️ Excelente! Você domina o protocolo de EPIs.',
          feedbackIncorrect: '⚠️ ATENÇÃO: Acessórios soltos podem cair nos reagentes. Calçados abertos expõem os pés a respingos de NaOH.',
        }},
        { type: 'scenario', data: {
          context: 'Durante o experimento, Pedro percebe que suas luvas de borracha rasgaram. Ele está no meio da dissolução de NaOH em água.',
          question: 'O que Pedro deve fazer IMEDIATAMENTE?',
          options: [
            { id: 'A', text: 'Parar imediatamente, afastar-se da bancada e trocar as luvas antes de continuar.', isCorrect: true, feedback: '✅ Correto! Segurança é a prioridade nº 1. Nunca manipular NaOH com EPI comprometido.' },
            { id: 'B', text: 'Continuar rapidamente para terminar antes que algo aconteça.', isCorrect: false, feedback: '❌ PERIGO! NaOH pode causar queimaduras em segundos. Jamais priorize velocidade sobre segurança.' },
            { id: 'C', text: 'Cobrir o rasgo com fita adesiva e continuar.', isCorrect: false, feedback: '❌ Fita não é barreira contra bases fortes. A luva deve ser SUBSTITUÍDA integralmente.' },
          ],
        }},
      ],
    },
    {
      id: 'lesson-2-2', title: 'Hard Blocks: Quando o Sistema Diz NÃO', estimatedMinutes: 7, bloomLevel: 'Analisar',
      objective: 'Entender os bloqueios automáticos de segurança implementados pelo backend.',
      blocks: [
        { type: 'text', data: { content: '<p>O EcoSabon possui <strong>Hard Blocks</strong> — validações do backend que <em>impedem fisicamente</em> o avanço se condições de segurança não forem atendidas. Diferente de um simples alerta, o Hard Block trava a operação até que o problema seja corrigido.</p>' } },
        { type: 'flashcards', data: { cards: [
          { front: 'Hard Block: Temperatura > 80°C', back: 'Se o aluno registra temperatura acima de 80°C na mistura, o sistema bloqueia a submissão e exige verificação. NaOH + água é exotérmico e pode ferver.' },
          { front: 'Hard Block: pH fora do range 8-10.5', back: 'pH abaixo de 8 indica saponificação incompleta (sabão "gordo"). Acima de 10.5, excesso de NaOH livre (sabão cáustico). Ambos são rejeitados.' },
          { front: 'Hard Block: Massa negativa ou zero', back: 'O schema Zod rejeita qualquer valor ≤ 0 para massa de óleo ou NaOH. Isso previne erros de digitação e dados impossíveis.' },
          { front: 'Hard Block: Foto obrigatória', back: 'Não é possível submeter a missão sem pelo menos 1 foto do experimento. Evidência empírica é requisito científico.' },
        ]}},
      ],
    },
    {
      id: 'lesson-2-3', title: 'Protocolo de Emergência', estimatedMinutes: 5, bloomLevel: 'Aplicar',
      objective: 'Conhecer os procedimentos de emergência em caso de acidentes com NaOH.',
      blocks: [
        { type: 'process', data: { steps: [
          { title: 'PARE imediatamente', description: 'Interrompa toda manipulação. Afaste-se da bancada.' },
          { title: 'LAVE a área afetada', description: 'Em caso de contato com pele: lave com água corrente abundante por 15-20 minutos.' },
          { title: 'NÃO use vinagre', description: 'Mito! Neutralizar NaOH com ácido na pele causa reação exotérmica e piora a queimadura.' },
          { title: 'AVISE o professor', description: 'Todo incidente deve ser reportado. O professor acionará o protocolo institucional.' },
          { title: 'REGISTRE no sistema', description: 'O EcoSabon tem campo de "Incidente" na bancada para registro formal.' },
        ]}},
        { type: 'scenario', data: {
          context: 'Ana respingou uma gota de solução de NaOH no braço. A pele ficou vermelha e ardendo.',
          question: 'Qual a ação CORRETA?',
          options: [
            { id: 'A', text: 'Lavar imediatamente com água corrente por 15-20 minutos e avisar o professor.', isCorrect: true, feedback: '✅ Correto! Água abundante é o melhor tratamento inicial. Nunca tente neutralizar com ácido.' },
            { id: 'B', text: 'Aplicar vinagre para neutralizar a base.', isCorrect: false, feedback: '❌ MITO PERIGOSO! A reação ácido-base na pele é exotérmica e agrava a queimadura.' },
          ],
        }},
      ],
    },
  ],
};
