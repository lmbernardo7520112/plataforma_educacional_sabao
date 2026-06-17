// ============================================================================
// EcoSabon — Curso Interativo | TDD RED: EvaluateScenario Tests
// ============================================================================
// RF: RF-CUR-004 (Scenario Block com ramificação e feedback)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { EvaluateScenario } from '../../src/application/usecases/EvaluateScenario.js';
import type { ScenarioOption } from '../../src/domain/models/index.js';

const options: ScenarioOption[] = [
  {
    id: 'A',
    text: 'Marina deve procurar o Professor Carlos.',
    isCorrect: true,
    feedback: 'Correto! No modelo B2B apenas o professor pode criar bancadas.',
  },
  {
    id: 'B',
    text: 'Marina deve limpar o cache do navegador.',
    isCorrect: false,
    feedback: 'Não! O cadeado não é erro técnico — é segurança proposital.',
  },
];

describe('EvaluateScenario (Use Case)', () => {

  it('should return isCorrect=true when selecting the correct option', () => {
    const result = EvaluateScenario.execute(options, 'A');
    expect(result.isCorrect).toBe(true);
    expect(result.selectedOptionId).toBe('A');
    expect(result.feedback).toContain('Correto');
  });

  it('should return isCorrect=false when selecting an incorrect option', () => {
    const result = EvaluateScenario.execute(options, 'B');
    expect(result.isCorrect).toBe(false);
    expect(result.selectedOptionId).toBe('B');
    expect(result.feedback).toContain('Não');
  });

  it('should throw on invalid option ID', () => {
    expect(() => EvaluateScenario.execute(options, 'Z')).toThrow();
  });

  it('should return the full feedback text from the selected option', () => {
    const result = EvaluateScenario.execute(options, 'A');
    expect(result.feedback).toBe('Correto! No modelo B2B apenas o professor pode criar bancadas.');
  });
});
