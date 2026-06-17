import type { CourseModule } from '../../domain/models/index.js';

export const module7: CourseModule = {
  id: 'mod-7', number: 7,
  title: 'Culminância: Embaixadores da Água',
  subtitle: 'Calcule seu impacto ambiental real e torne-se um Embaixador da Água.',
  engineeringPhase: 'Impacto Ambiental + Culminância',
  lessons: [
    {
      id: 'lesson-7-1', title: 'Calculando Seu Impacto Real', estimatedMinutes: 8, bloomLevel: 'Avaliar',
      objective: 'Calcular quantos litros de água foram poupados pela reciclagem do óleo.',
      blocks: [
        { type: 'text', data: { content: '<p>Cada grama de óleo que você transformou em sabão <strong>deixou de contaminar água</strong>. Vamos calcular o impacto real:</p><p><strong>Fórmula do Impacto:</strong><br/><code>Litros de água poupados = Massa de óleo (g) ÷ 1000 × 25.000</code></p><p>Se seu esquadrão usou 500g de óleo:<br/><code>0.5 L × 25.000 = 12.500 litros de água poupados!</code></p><p>Isso é equivalente a <strong>84 dias de consumo de água de uma pessoa</strong>.</p>' } },
        { type: 'scenario', data: {
          context: 'A turma do 9º Ano B produziu 15 barras de sabão usando um total de 3kg de óleo reciclado.',
          question: 'Quantos litros de água a turma poupou?',
          options: [
            { id: 'A', text: '75.000 litros (3 × 25.000)', isCorrect: true, feedback: '✅ Correto! 3L de óleo × 25.000 = 75.000 litros. Isso é mais de 500 dias de água para uma pessoa! 🌊' },
            { id: 'B', text: '25.000 litros', isCorrect: false, feedback: '❌ 25.000 é para 1 litro. A turma usou 3kg (≈ 3L), então multiplique por 3.' },
            { id: 'C', text: '375 litros', isCorrect: false, feedback: '❌ A razão de contaminação é 1:25.000 (1L contamina 25.000L), não 1:125.' },
          ],
        }},
      ],
    },
    {
      id: 'lesson-7-2', title: 'Certificado de Embaixador da Água', estimatedMinutes: 5, bloomLevel: 'Criar',
      objective: 'Compreender os critérios para obter o Certificado de Embaixador e planejar ações futuras.',
      blocks: [
        { type: 'text', data: { content: '<p>Ao completar todas as missões com nota mínima de <strong>70%</strong> e ter seu dossiê aprovado pelo professor, você recebe o <strong>Certificado de Embaixador da Água</strong> 🌊.</p><p>O certificado atesta que você:</p><p>• Compreende a ciência por trás da saponificação<br/>• Manipula reagentes com segurança<br/>• Registra dados com precisão científica<br/>• Contribuiu ativamente para a preservação hídrica</p>' } },
        { type: 'accordion', data: { sections: [
          { title: '🏅 Bronze — Aprendiz Cientista', content: 'Completou todas as missões com nota ≥ 70%. Demonstrou compreensão básica dos conceitos.' },
          { title: '🥈 Prata — Cientista Investigador', content: 'Nota ≥ 85% em todas as missões. Fotografias de alta qualidade e análise crítica dos resultados.' },
          { title: '🥇 Ouro — Embaixador da Água', content: 'Nota ≥ 95%. Análise completa de fontes de erro, sugestões de melhoria e impacto ambiental calculado.' },
        ]}},
        { type: 'progress-tracker', data: {} },
      ],
    },
  ],
};
