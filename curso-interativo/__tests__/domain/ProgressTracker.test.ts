// ============================================================================
// EcoSabon — Curso Interativo | TDD RED: ProgressTracker Tests
// ============================================================================
// Estes testes são escritos ANTES da implementação (TDD RED phase).
// Todos devem FALHAR até o Commit #4 implementar o ProgressTracker.
//
// RF: RF-CUR-001 (navegação bloqueada), RF-CUR-006 (persistência)
// ============================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressTracker } from '../../src/domain/services/ProgressTracker.js';
import type { Course } from '../../src/domain/models/index.js';

// Fixture: Curso mínimo para testes
const mockCourse: Course = {
  id: 'test-course',
  title: 'Curso de Teste',
  version: '1.0.0',
  modules: [
    {
      id: 'mod-0',
      number: 0,
      title: 'Módulo 0',
      subtitle: 'Teste',
      engineeringPhase: 'Fase 0',
      lessons: [
        {
          id: 'lesson-0-1',
          title: 'Lição 0.1',
          estimatedMinutes: 5,
          bloomLevel: 'Compreender',
          objective: 'Testar',
          blocks: [
            { type: 'text', data: { content: 'Texto de teste' } },
            { type: 'flashcards', data: { cards: [{ front: 'F', back: 'B' }] } },
          ],
        },
        {
          id: 'lesson-0-2',
          title: 'Lição 0.2',
          estimatedMinutes: 5,
          bloomLevel: 'Aplicar',
          objective: 'Testar 2',
          blocks: [
            { type: 'text', data: { content: 'Outro texto' } },
          ],
        },
      ],
    },
    {
      id: 'mod-1',
      number: 1,
      title: 'Módulo 1',
      subtitle: 'Teste 2',
      engineeringPhase: 'Fase 1',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Lição 1.1',
          estimatedMinutes: 8,
          bloomLevel: 'Analisar',
          objective: 'Testar 3',
          blocks: [
            { type: 'sorting-activity', data: { prompt: 'Ordene', items: [{ label: 'A', correctCategory: 'X' }], categories: ['X', 'Y'], feedbackCorrect: 'OK', feedbackIncorrect: 'Erro' } },
          ],
        },
      ],
    },
  ],
};

describe('ProgressTracker (Domain Service)', () => {
  let tracker: ProgressTracker;

  beforeEach(() => {
    tracker = new ProgressTracker(mockCourse);
  });

  // ─── RF-CUR-001: Navegação sequencial bloqueada ───────────────────

  describe('canNavigateTo()', () => {
    it('should allow navigating to the first lesson', () => {
      expect(tracker.canNavigateTo('lesson-0-1')).toBe(true);
    });

    it('should block navigating to the second lesson when first is incomplete', () => {
      expect(tracker.canNavigateTo('lesson-0-2')).toBe(false);
    });

    it('should allow navigating to the second lesson after first is completed', () => {
      tracker.completeBlock('lesson-0-1', 0);
      tracker.completeBlock('lesson-0-1', 1);
      expect(tracker.canNavigateTo('lesson-0-2')).toBe(true);
    });

    it('should block navigating to module 1 when module 0 is incomplete', () => {
      expect(tracker.canNavigateTo('lesson-1-1')).toBe(false);
    });

    it('should allow navigating to module 1 after all module 0 lessons are complete', () => {
      // Complete lesson 0.1 (2 blocks)
      tracker.completeBlock('lesson-0-1', 0);
      tracker.completeBlock('lesson-0-1', 1);
      // Complete lesson 0.2 (1 block)
      tracker.completeBlock('lesson-0-2', 0);
      expect(tracker.canNavigateTo('lesson-1-1')).toBe(true);
    });
  });

  // ─── RF-CUR-001: Completude de blocos ─────────────────────────────

  describe('completeBlock()', () => {
    it('should mark a specific block as completed', () => {
      tracker.completeBlock('lesson-0-1', 0);
      expect(tracker.isBlockComplete('lesson-0-1', 0)).toBe(true);
    });

    it('should not mark other blocks as completed', () => {
      tracker.completeBlock('lesson-0-1', 0);
      expect(tracker.isBlockComplete('lesson-0-1', 1)).toBe(false);
    });

    it('should throw on invalid lesson ID', () => {
      expect(() => tracker.completeBlock('nonexistent', 0)).toThrow();
    });

    it('should throw on invalid block index', () => {
      expect(() => tracker.completeBlock('lesson-0-1', 99)).toThrow();
    });
  });

  // ─── RF-CUR-001: Completude de lição ──────────────────────────────

  describe('isLessonComplete()', () => {
    it('should return false when no blocks are completed', () => {
      expect(tracker.isLessonComplete('lesson-0-1')).toBe(false);
    });

    it('should return false when only some blocks are completed', () => {
      tracker.completeBlock('lesson-0-1', 0);
      expect(tracker.isLessonComplete('lesson-0-1')).toBe(false);
    });

    it('should return true when ALL blocks are completed', () => {
      tracker.completeBlock('lesson-0-1', 0);
      tracker.completeBlock('lesson-0-1', 1);
      expect(tracker.isLessonComplete('lesson-0-1')).toBe(true);
    });
  });

  // ─── RF-CUR-006: Serialização/Persistência ────────────────────────

  describe('toJSON() / fromJSON()', () => {
    it('should produce valid JSON from current state', () => {
      const json = tracker.toJSON();
      expect(json).toHaveProperty('courseId', 'test-course');
      expect(json).toHaveProperty('lessons');
      expect(json).toHaveProperty('startedAt');
    });

    it('should restore state from JSON (idempotent)', () => {
      tracker.completeBlock('lesson-0-1', 0);
      const json = tracker.toJSON();

      const restored = ProgressTracker.fromJSON(mockCourse, json);
      expect(restored.isBlockComplete('lesson-0-1', 0)).toBe(true);
      expect(restored.isBlockComplete('lesson-0-1', 1)).toBe(false);
    });

    it('should preserve navigation state after restore', () => {
      tracker.completeBlock('lesson-0-1', 0);
      tracker.completeBlock('lesson-0-1', 1);
      const json = tracker.toJSON();

      const restored = ProgressTracker.fromJSON(mockCourse, json);
      expect(restored.canNavigateTo('lesson-0-2')).toBe(true);
    });
  });

  // ─── Métricas de progresso ────────────────────────────────────────

  describe('getCompletionPercentage()', () => {
    it('should return 0% when nothing is completed', () => {
      expect(tracker.getCompletionPercentage()).toBe(0);
    });

    it('should return correct percentage after partial completion', () => {
      // 3 lessons total in mockCourse, complete 1
      tracker.completeBlock('lesson-0-1', 0);
      tracker.completeBlock('lesson-0-1', 1);
      // 1/3 lessons = ~33.33%
      expect(tracker.getCompletionPercentage()).toBeCloseTo(33.33, 0);
    });

    it('should return 100% when all lessons are completed', () => {
      tracker.completeBlock('lesson-0-1', 0);
      tracker.completeBlock('lesson-0-1', 1);
      tracker.completeBlock('lesson-0-2', 0);
      tracker.completeBlock('lesson-1-1', 0);
      expect(tracker.getCompletionPercentage()).toBe(100);
    });
  });
});
