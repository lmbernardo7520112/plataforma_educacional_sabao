import { MissionStatus } from '../types/mission.js';

export type ScientificField = 'hypothesis' | 'procedure' | 'observations' | 'conclusion';

export interface IMissionDocumentation {
  id: number;
  context: string;
  objective: string;
  actionPrompt: string;
  requiredScientificFields: ScientificField[];
}

/**
 * Material Didático Preliminar (Química - Novo Ensino Médio). 
 * Contém a fundamentação rica de cada etapa para basear a hipótese do estudante, e a configuração de campos adaptativa.
 */
export const MISSION_DOCS: Record<number, IMissionDocumentation> = {
  1: {
    id: 1,
    context: "A poluição hídrica pelo descarte inadequado de óleos residuais fritos é um entrave ambiental gigantesco: estima-se que 1 litro de óleo pode contaminar até 25.000 litros de água (comprometendo o oxigênio celular no DBO/DQO). A Química Verde sugere a reciclagem ativa dos resíduos por meio da Saponificação.",
    objective: "Sintetizar a contextualização teórica do projeto.",
    actionPrompt: "No diário, documente brevemente por que você e sua bancada aceitaram esta missão e qual o impacto hídrico estimado se tivermos sucesso.",
    requiredScientificFields: ['observations', 'conclusion'] // Introdutório, flexível
  },
  2: {
    id: 2,
    context: "Segurança de Laboratório e EPI (Equipamento de Proteção Individual) não são opcionais. A Saponificação faz o uso de Hidróxido de Sódio (NaOH), uma base forte (pH ~ 14) altamente corrosiva que dissolve matérias orgânicas.",
    objective: "Vestimentas rigorosas.",
    actionPrompt: "Descreva a organização de segurança da sua bancada e o check-list dos materiais a serem manuseados.",
    requiredScientificFields: ['procedure', 'observations']
  },
  3: {
    id: 3,
    context: "Saponificação (ou hidrólise alcalina) é a reação que ocorre entre um éster (presente no de óleo vegetal - triacilgliceróis) e uma base inorgânica forte. O coeficiente ou 'Índice de Saponificação' dita a massa exata de base necessária para saponificar 1 grama de óleo sem sobrar base ativa que possa criar queimaduras químicas.",
    objective: "Cálculo Estequiométrico Fundamental.",
    actionPrompt: "Calcule e compare a massa exata de NaOH necessária baseada na massa de óleo coletado. Construa a Hipótese e detalhe seu Procedimento.",
    requiredScientificFields: ['hypothesis', 'procedure', 'observations', 'conclusion'] // Rigor Acadêmico Completo
  },
  4: {
    id: 4,
    context: "Óleo residual contém resíduos orgânicos suspensos (água e restos alimentares da fritura). Uma mistura heterogênea não processará a reação de forma limpa. Emprega-se aqui técnicas de separação de misturas simples, como a decantação ou a filtração física.",
    objective: "Filtragem e purificação por Separação Magnética / Filtração.",
    actionPrompt: "Descreva o aspecto macroscópico do óleo recebido e por que a filtração modificou seu estado útil.",
    requiredScientificFields: ['observations']
  },
  5: {
    id: 5,
    context: "A diluição da base forte (NaOH) em água libera energia térmica devido à quebra de ligações no retículo cristalino e forte solvatação iônica pelo dipolo da água. Este é um clássico de uma 'Reação Exotérmica' termodinâmica (ΔH < 0).",
    objective: "Monitoramento e Comprovação do Gradiente de Temperatura (ΔT°).",
    actionPrompt: "Levante a hipótese: A temperatura subirá bruscamente? Meça o antes e depois da dissolução química.",
    requiredScientificFields: ['hypothesis', 'observations', 'conclusion']
  },
  6: {
    id: 6,
    context: "Ao misturar fisicamente e termicamente o reativo (lixívia) com a cadeia de ácidos graxos, passamos por uma transição de estado da emulsão: O 'Trace' (Traço). É o ponto exato macroscópico em que a saponificação é atingida de forma coloidal irreversível.",
    objective: "Agitação Emulsionadora.",
    actionPrompt: "Registre visualmente e textualmente o momento e o aspecto da massa saponificada endurecendo.",
    requiredScientificFields: ['procedure', 'observations']
  },
  7: {
    id: 7,
    context: "Cristalização Base: Ao desenformarmos o molde, o arranjo celular de sabão formado estará em forma salina (Sal Orgânico). Inicia-se então um período longo de 'Cura', onde a água excedente irá evaporar para estruturar as pontes de hidrogênio da micela sólida.",
    objective: "Espera Ativa e Empacotamento.",
    actionPrompt: "Anote sua percepção do sabonete cru após a desformação do dia 1.",
    requiredScientificFields: ['observations', 'conclusion']
  },
  8: {
    id: 8,
    context: "Auditoria Química: Sabões naturais saudáveis para o manto ácido da pele humana (pH em torno de 5.5) devem performar um pH em repouso entre 8.0 e 10.0 máximos (levemente amônico). Valores muito superiores indicarão uma estequiometria falha e alta causticidade (excesso de base que não reagiu).",
    objective: "Teste Empírico com Escala Universal de pH.",
    actionPrompt: "Sua hipótese estava correta desde a fase 3? Qual o Nível de pH atestado pela fita em laboratório?",
    requiredScientificFields: ['hypothesis', 'observations', 'conclusion'] // Rigor Alto
  },
  9: {
    id: 9,
    context: "A química aplicada tem efeito colateral socioambiental quantificável. Como agentes ecossistêmicos, transformamos o passivo ambiental de resíduos em um ativo de limpezas que emana tensoativos biodegradáveis nas redes fluviais.",
    objective: "Defesa e Reforço Positivo Final.",
    actionPrompt: "Você venceu! Documente a conclusão científica de peso sobre toda a cadeia produtiva química em que operou.",
    requiredScientificFields: ['conclusion']
  }
};
