import type { CourseModule } from '../../domain/models/index.js';

export const module4: CourseModule = {
  id: 'mod-4', number: 4,
  title: 'Matemática e Termodinâmica do Sabão',
  subtitle: 'O SaponificationEngine: cálculos estequiométricos e monitoramento exotérmico.',
  engineeringPhase: 'Fase 3 — SaponificationEngine',
  lessons: [
    {
      id: 'lesson-4-1', title: 'A Reação de Saponificação', estimatedMinutes: 10, bloomLevel: 'Compreender',
      objective: 'Compreender a equação química da saponificação e seus produtos.',
      blocks: [
        { type: 'text', data: { content: '<p>A <strong>saponificação</strong> é uma reação entre um <em>éster</em> (o triglicerídeo do óleo) e uma <em>base forte</em> (NaOH), produzindo <strong>sabão</strong> (sal de ácido graxo) + <strong>glicerina</strong>:</p><p style="text-align:center;font-family:monospace;font-size:1.2em;">Triglicerídeo + 3 NaOH → 3 Sabão + Glicerol</p><p>É uma reação <strong>exotérmica</strong> — libera calor. Por isso a temperatura da mistura sobe durante o processo. Monitorar essa temperatura é crucial para a segurança.</p>' } },
        { type: 'flashcards', data: { cards: [
          { front: 'O que é um Triglicerídeo?', back: 'Molécula de glicerol ligada a 3 ácidos graxos. É o principal componente dos óleos vegetais e gorduras.' },
          { front: 'O que é NaOH?', back: 'Hidróxido de sódio (soda cáustica). Base forte com pH ~14. É o reagente que "quebra" o triglicerídeo.' },
          { front: 'O que é Glicerol?', back: 'Álcool tri-hídrico (3 grupos OH). Subproduto da saponificação. Usado em cosméticos e farmacêuticos.' },
          { front: 'Por que a reação é exotérmica?', back: 'A energia das ligações dos produtos (sabão + glicerol) é menor que a dos reagentes. A diferença é liberada como calor (ΔH < 0).' },
        ]}},
      ],
    },
    {
      id: 'lesson-4-2', title: 'O Motor de Cálculo: SaponificationEngine', estimatedMinutes: 8, bloomLevel: 'Analisar',
      objective: 'Entender como o motor de cálculo do EcoSabon determina a quantidade exata de NaOH.',
      blocks: [
        { type: 'text', data: { content: '<p>O <strong>SaponificationEngine</strong> é o "cérebro matemático" do EcoSabon. É um módulo TypeScript que vive na camada de domínio (shared) e executa os cálculos estequiométricos.</p><p>Quando você registra a massa do óleo na bancada, o motor calcula automaticamente:</p>' } },
        { type: 'process', data: { steps: [
          { title: 'Entrada: Massa do óleo (g)', description: 'Exemplo: 500g de óleo de cozinha usado filtrado.' },
          { title: 'Constante SAP = 191', description: 'Índice de saponificação: 191 mg KOH por grama de óleo.' },
          { title: 'Conversão: Ratio = 0.713', description: 'Converte de KOH para NaOH (pesos moleculares diferentes).' },
          { title: 'Ajuste: Superfat = 5%', description: 'Reduz NaOH em 5% para deixar óleos hidratantes.' },
          { title: 'Saída: Massa de NaOH (g)', description: 'Resultado: 500 × 0.191 × 0.713 × 0.95 = 64.6g de NaOH.' },
        ]}},
        { type: 'scenario', data: {
          context: 'O esquadrão "Os Alquimistas" registrou 300g de óleo na bancada. O SaponificationEngine calculou 38.8g de NaOH.',
          question: 'Se eles registrarem 600g de óleo (o dobro), quanto NaOH o motor vai calcular?',
          options: [
            { id: 'A', text: '77.5g (aproximadamente o dobro)', isCorrect: true, feedback: '✅ Correto! A relação é linear: dobrar o óleo dobra o NaOH. Isso reflete a estequiometria da reação (proporção molar fixa).' },
            { id: 'B', text: '38.8g (mesmo valor)', isCorrect: false, feedback: '❌ Se a massa de óleo muda, a quantidade de NaOH muda proporcionalmente. A fórmula é linear.' },
            { id: 'C', text: '155g (o quádruplo)', isCorrect: false, feedback: '❌ A relação é linear, não quadrática. O dobro de óleo = o dobro de NaOH.' },
          ],
        }},
      ],
    },
    {
      id: 'lesson-4-3', title: 'Monitoramento Térmico', estimatedMinutes: 7, bloomLevel: 'Aplicar',
      objective: 'Saber monitorar e interpretar a temperatura durante a saponificação.',
      blocks: [
        { type: 'text', data: { content: '<p>A saponificação a frio (Cold Process) opera idealmente entre <strong>35-45°C</strong>. Temperaturas acima de 80°C indicam perigo:</p><p>• <strong>35-45°C:</strong> Faixa ideal. Reação controlada.<br/>• <strong>45-60°C:</strong> Aceitável, mas monitore. Reação está acelerada.<br/>• <strong>60-80°C:</strong> Alerta. Afaste-se e aguarde resfriamento.<br/>• <strong>&gt;80°C:</strong> HARD BLOCK. O sistema trava a submissão. Risco de fervura.</p>' } },
        { type: 'sorting-activity', data: {
          prompt: 'Classifique cada faixa de temperatura no nível correto de alerta:',
          categories: ['✅ Normal', '⚠️ Atenção', '🔴 Perigo'],
          items: [
            { label: '38°C', correctCategory: '✅ Normal' },
            { label: '72°C', correctCategory: '⚠️ Atenção' },
            { label: '85°C', correctCategory: '🔴 Perigo' },
            { label: '42°C', correctCategory: '✅ Normal' },
            { label: '55°C', correctCategory: '⚠️ Atenção' },
            { label: '91°C', correctCategory: '🔴 Perigo' },
          ],
          feedbackCorrect: '🌡️ Excelente! Você sabe interpretar as faixas de temperatura.',
          feedbackIncorrect: '🔬 Lembre: 35-45°C é normal, 45-80°C é atenção, acima de 80°C é perigo (Hard Block).',
        }},
      ],
    },
  ],
};
