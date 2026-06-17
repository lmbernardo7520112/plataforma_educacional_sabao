// ============================================================================
// EcoSabon — Curso Interativo | EvaluateScenario (Use Case)
// ============================================================================
// RF: RF-CUR-004 — Scenario Block com ramificação e feedback
// Lógica pura: recebe opções + seleção, retorna resultado.
// ============================================================================

import type { ScenarioOption } from '../../domain/models/index.js';

export interface ScenarioResult {
  readonly isCorrect: boolean;
  readonly selectedOptionId: string;
  readonly feedback: string;
}

/**
 * Use Case: Avaliar a resposta do aluno em um cenário ramificado.
 */
export class EvaluateScenario {

  /**
   * Avalia a opção selecionada pelo aluno.
   * @param options - Opções disponíveis no cenário
   * @param selectedId - ID da opção selecionada
   * @returns Resultado com feedback diferenciado
   * @throws se o ID selecionado não existir nas opções
   */
  static execute(options: readonly ScenarioOption[], selectedId: string): ScenarioResult {
    const selected = options.find((o) => o.id === selectedId);
    if (!selected) {
      throw new Error(`Opção "${selectedId}" não encontrada. IDs válidos: ${options.map(o => o.id).join(', ')}`);
    }

    return {
      isCorrect: selected.isCorrect,
      selectedOptionId: selected.id,
      feedback: selected.feedback,
    };
  }
}
