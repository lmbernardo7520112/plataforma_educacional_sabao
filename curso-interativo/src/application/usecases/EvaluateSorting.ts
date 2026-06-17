// ============================================================================
// EcoSabon — Curso Interativo | EvaluateSorting (Use Case)
// ============================================================================
// RF: RF-CUR-003 — Sorting Activity com validação e feedback visual
// Lógica pura: recebe dados, retorna resultado. Sem efeitos colaterais.
// ============================================================================

import type { SortingItem } from '../../domain/models/index.js';

export interface SortingError {
  readonly label: string;
  readonly userCategory: string;
  readonly correctCategory: string;
}

export interface SortingResult {
  readonly correct: boolean;
  readonly score: number;
  readonly errors: readonly SortingError[];
}

/**
 * Use Case: Avaliar uma atividade de ordenação/classificação.
 * 
 * Compara as respostas do aluno com as categorias corretas
 * e retorna resultado com score percentual e lista de erros.
 */
export class EvaluateSorting {

  /**
   * Avalia a classificação feita pelo aluno.
   * @param items - Itens com suas categorias corretas
   * @param userAnswers - Map de label → categoria escolhida pelo aluno
   * @returns Resultado com score (0-100) e lista de erros
   */
  static execute(items: readonly SortingItem[], userAnswers: Map<string, string>): SortingResult {
    const errors: SortingError[] = [];
    let correctCount = 0;

    for (const item of items) {
      const userCategory = userAnswers.get(item.label);
      if (userCategory === item.correctCategory) {
        correctCount++;
      } else {
        errors.push({
          label: item.label,
          userCategory: userCategory ?? '(sem resposta)',
          correctCategory: item.correctCategory,
        });
      }
    }

    const score = items.length > 0
      ? Math.round((correctCount / items.length) * 100)
      : 0;

    return {
      correct: errors.length === 0,
      score,
      errors,
    };
  }
}
