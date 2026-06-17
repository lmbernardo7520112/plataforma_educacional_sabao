// ============================================================================
// EcoSabon — Curso Interativo | TDD RED: EvaluateSorting Tests
// ============================================================================
// RF: RF-CUR-003 (Sorting Activity com validação e feedback)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { EvaluateSorting } from '../../src/application/usecases/EvaluateSorting.js';
import type { SortingItem } from '../../src/domain/models/index.js';

const items: SortingItem[] = [
  { label: 'Óculos de proteção', correctCategory: 'EPI' },
  { label: 'Luvas de borracha', correctCategory: 'EPI' },
  { label: 'Relógio digital', correctCategory: 'NÃO EPI' },
  { label: 'Brincos e colares', correctCategory: 'NÃO EPI' },
];

describe('EvaluateSorting (Use Case)', () => {

  it('should return correct=true when ALL items are in the right category', () => {
    const userAnswers = new Map<string, string>([
      ['Óculos de proteção', 'EPI'],
      ['Luvas de borracha', 'EPI'],
      ['Relógio digital', 'NÃO EPI'],
      ['Brincos e colares', 'NÃO EPI'],
    ]);
    const result = EvaluateSorting.execute(items, userAnswers);
    expect(result.correct).toBe(true);
    expect(result.score).toBe(100);
    expect(result.errors).toHaveLength(0);
  });

  it('should return correct=false with errors when some items are wrong', () => {
    const userAnswers = new Map<string, string>([
      ['Óculos de proteção', 'EPI'],
      ['Luvas de borracha', 'NÃO EPI'],  // WRONG
      ['Relógio digital', 'NÃO EPI'],
      ['Brincos e colares', 'EPI'],       // WRONG
    ]);
    const result = EvaluateSorting.execute(items, userAnswers);
    expect(result.correct).toBe(false);
    expect(result.score).toBe(50);
    expect(result.errors).toHaveLength(2);
    expect(result.errors).toContainEqual({
      label: 'Luvas de borracha',
      userCategory: 'NÃO EPI',
      correctCategory: 'EPI',
    });
  });

  it('should return score 0 when ALL items are wrong', () => {
    const userAnswers = new Map<string, string>([
      ['Óculos de proteção', 'NÃO EPI'],
      ['Luvas de borracha', 'NÃO EPI'],
      ['Relógio digital', 'EPI'],
      ['Brincos e colares', 'EPI'],
    ]);
    const result = EvaluateSorting.execute(items, userAnswers);
    expect(result.correct).toBe(false);
    expect(result.score).toBe(0);
    expect(result.errors).toHaveLength(4);
  });

  it('should handle missing answers by counting them as errors', () => {
    const userAnswers = new Map<string, string>([
      ['Óculos de proteção', 'EPI'],
      // 3 items missing
    ]);
    const result = EvaluateSorting.execute(items, userAnswers);
    expect(result.correct).toBe(false);
    expect(result.score).toBe(25);
    expect(result.errors).toHaveLength(3);
  });
});
