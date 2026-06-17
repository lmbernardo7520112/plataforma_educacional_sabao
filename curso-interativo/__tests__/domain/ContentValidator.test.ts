// ============================================================================
// EcoSabon — Curso Interativo | TDD RED: ContentValidator Tests
// ============================================================================
// RF: RF-CUR-002 (validação de estrutura de conteúdo)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { ContentValidator } from '../../src/domain/services/ContentValidator.js';
import type { Course, CourseModule, Lesson } from '../../src/domain/models/index.js';

describe('ContentValidator (Domain Service)', () => {

  const validLesson: Lesson = {
    id: 'valid-lesson',
    title: 'Lição Válida',
    estimatedMinutes: 5,
    bloomLevel: 'Compreender',
    objective: 'Testar validação',
    blocks: [
      { type: 'text', data: { content: 'Conteúdo válido' } },
    ],
  };

  const validModule: CourseModule = {
    id: 'valid-module',
    number: 0,
    title: 'Módulo Válido',
    subtitle: 'Teste',
    engineeringPhase: 'Fase 0',
    lessons: [validLesson],
  };

  // ─── Curso válido ─────────────────────────────────────────────────

  it('should accept a structurally valid course', () => {
    const course: Course = {
      id: 'valid-course',
      title: 'Curso Válido',
      version: '1.0.0',
      modules: [validModule],
    };
    expect(() => ContentValidator.validate(course)).not.toThrow();
  });

  // ─── Curso sem módulos ────────────────────────────────────────────

  it('should reject a course with no modules', () => {
    const course: Course = {
      id: 'empty-course',
      title: 'Vazio',
      version: '1.0.0',
      modules: [],
    };
    expect(() => ContentValidator.validate(course)).toThrow('EmptyCourseError');
  });

  // ─── Módulo sem lições ────────────────────────────────────────────

  it('should reject a module with no lessons', () => {
    const course: Course = {
      id: 'no-lessons',
      title: 'Sem Lições',
      version: '1.0.0',
      modules: [{
        ...validModule,
        lessons: [],
      }],
    };
    expect(() => ContentValidator.validate(course)).toThrow('EmptyModuleError');
  });

  // ─── Lição sem blocos ─────────────────────────────────────────────

  it('should reject a lesson with no blocks', () => {
    const course: Course = {
      id: 'no-blocks',
      title: 'Sem Blocos',
      version: '1.0.0',
      modules: [{
        ...validModule,
        lessons: [{
          ...validLesson,
          blocks: [],
        }],
      }],
    };
    expect(() => ContentValidator.validate(course)).toThrow('EmptyLessonError');
  });

  // ─── IDs duplicados ───────────────────────────────────────────────

  it('should reject duplicate lesson IDs', () => {
    const course: Course = {
      id: 'dup-ids',
      title: 'IDs Duplicados',
      version: '1.0.0',
      modules: [{
        ...validModule,
        lessons: [validLesson, { ...validLesson }],  // Same ID
      }],
    };
    expect(() => ContentValidator.validate(course)).toThrow('DuplicateLessonIdError');
  });

  // ─── Contagem de lições ───────────────────────────────────────────

  it('should return correct lesson count for a valid course', () => {
    const course: Course = {
      id: 'count-test',
      title: 'Contagem',
      version: '1.0.0',
      modules: [validModule],
    };
    expect(ContentValidator.getLessonCount(course)).toBe(1);
  });
});
