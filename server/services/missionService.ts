import { Types } from 'mongoose';
import { JourneyState } from '../models/JourneyState.ts';
import { SaponificationEngine } from 'shared/domain/SaponificationEngine.js';
import { MISSION_DOCS } from 'shared/config/missionDocs.js';

export class MissionService {
  async getSquadMissions(squadId: string) {
    const missions = await JourneyState.find({ squadId: new Types.ObjectId(squadId) })
      .sort({ missionId: 1 })
      .lean();
    return missions;
  }

  async evaluateAndCompleteMission(
    squadId: string,
    missionId: number,
    scientificMethod: Record<string, string>,
    numericInputs: Record<string, number>,
    evidenceFileUrl?: string
  ) {
    const docs = MISSION_DOCS[missionId];
    if (!docs) throw new Error('Missão Científica não identificada.');

    // --- Hard-Validation: Saponification Engine Check ---
    
    // Fase 3: Cálculos Estequiométricos da Soda Cáustica
    if (missionId === 3) {
      if (!numericInputs.oilMassGrams || !numericInputs.naohGrams) {
        throw new Error('A Estequiometria Clássica exige as massas do Óleo e da Base (NaOH).');
      }
      const engine = new SaponificationEngine();
      const calcResult = engine.calculateSaponificationValue(numericInputs.oilMassGrams);
      
      // Margem de erro estrita de ± 1 grama para o safe superfatting.
      const margin = 1;
      if (Math.abs(numericInputs.naohGrams - calcResult.naohGrams) > margin) {
        throw new Error(`Cálculo Crítico Falhou! Para ${numericInputs.oilMassGrams}g de óleo, aplicar ${numericInputs.naohGrams}g de base resultará num produto supercaústico ou sub-reagido. Tente novamente!`);
      }
    }
    
    // Fase 5: Diluição Exotérmica
    if (missionId === 5) {
      if (numericInputs.endTemp === undefined || numericInputs.startTemp === undefined) {
          throw new Error('As temperaturas do soluto antes e depois da base são requerimentos metodológicos.');
      }
      const engine = new SaponificationEngine();
      const isValidHeat = engine.validateEnergyRelease(numericInputs.startTemp, numericInputs.endTemp);
      if (!isValidHeat) {
          throw new Error('Leitura Termodinâmica Reprovada! A quebra do retículo cristalino da NaOH libera altíssimos volumes de calor (ΔH < 0). A temperatura final deve subir no mínimo 2°C. Meça novamente!');
      }
    }
    
    // Fase 8: Teste Unitário Físico do pH do Lote
    if (missionId === 8) {
      if (numericInputs.phLevel === undefined) throw new Error('O teste de fita / reagente do pH final é obrigatório no Formulário.');
      const engine = new SaponificationEngine(); 
      const isPHSafe = engine.evaluatePHTolerance(numericInputs.phLevel);
      if (!isPHSafe) {
        throw new Error(`Risco Toxicológico Tissular Grave! Seu sabão solidificou com pH ${numericInputs.phLevel}. O manto cutâneo só suportará níveis limitados de basicidade de saponificação (pH Seguro 8~10.5).`);
      }
    }

    // Avaliza Inédita
    const existing = await JourneyState.findOne({ squadId: new Types.ObjectId(squadId), missionId });
    if (existing && existing.status === 'COMPLETED') {
      throw new Error('Missão Trancada e Relatório Submetido anteriormente! Revisão não autorizada.');
    }

    // Salvar Status Global
    const update = await JourneyState.findOneAndUpdate(
      { squadId: new Types.ObjectId(squadId), missionId },
      { 
        $set: {
          status: 'COMPLETED',
          scientificMethod,
          numericInputs,
          completedAt: new Date(),
          evidenceUrl: evidenceFileUrl || existing?.evidenceUrl || '',
          xpEarned: 100 // Pontuação gamificada estática no modelo MVP
        } 
      },
      { new: true, upsert: true }
    );

    return update;
  }
}
