import { Squad } from '../models/Squad.ts';
import { JourneyState } from '../models/JourneyState.ts';

export class ReportService {
  /**
   * Constrói o Dossiê Agregado para Impressão e Auditoria:
   * Mescla os dados da Bancada com o Histórico Científico (JourneyState)
   */
  async getSquadDossier(squadId: string) {
    // Puxa a bancada com os dados da sala de aula anexados (-v apaga versão do mongoose)
    const squad = await Squad.findById(squadId)
      .populate('classroomId', 'nome ano')
      .lean();
      
    if (!squad) throw new Error('Falha de Auditoria: A Bancada acadêmica informada foi extinta ou não existe.');

    // Puxa a cronologia das missões para montar o extrato PDF
    const missions = await JourneyState.find({ squadId })
      .sort({ missionId: 1 }) // Ordena Fase 1 a Fase 9
      .lean();

    return {
      squad,
      missions
    };
  }
}

export const reportService = new ReportService();
