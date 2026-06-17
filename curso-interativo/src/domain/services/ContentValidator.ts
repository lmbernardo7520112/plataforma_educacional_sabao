// ============================================================================
// EcoSabon — Curso Interativo | ContentValidator (Domain Service)
// ============================================================================
// Responsabilidade Única: Validar a integridade estrutural do conteúdo do curso.
// RF: RF-CUR-002 (validação de estrutura)
//
// Zero dependências de infraestrutura — lógica pura.
// ============================================================================

import type { Course } from '../models/index.js';

/**
 * Validador estático de integridade estrutural do curso.
 * 
 * Garante que o conteúdo do curso é estruturalmente válido antes
 * de ser renderizado, prevenindo erros de runtime.
 */
export class ContentValidator {

  /**
   * Valida a estrutura completa do curso.
   * @throws EmptyCourseError, EmptyModuleError, EmptyLessonError, DuplicateLessonIdError
   */
  static validate(course: Course): void {
    // Curso sem módulos
    if (course.modules.length === 0) {
      throw new Error('EmptyCourseError: O curso não contém nenhum módulo.');
    }

    const seenLessonIds = new Set<string>();

    for (const mod of course.modules) {
      // Módulo sem lições
      if (mod.lessons.length === 0) {
        throw new Error(`EmptyModuleError: O módulo "${mod.title}" (${mod.id}) não contém nenhuma lição.`);
      }

      for (const lesson of mod.lessons) {
        // Lição sem blocos
        if (lesson.blocks.length === 0) {
          throw new Error(`EmptyLessonError: A lição "${lesson.title}" (${lesson.id}) não contém nenhum bloco.`);
        }

        // IDs duplicados
        if (seenLessonIds.has(lesson.id)) {
          throw new Error(`DuplicateLessonIdError: O ID "${lesson.id}" aparece em mais de uma lição.`);
        }
        seenLessonIds.add(lesson.id);
      }
    }
  }

  /**
   * Conta o total de lições em todos os módulos.
   */
  static getLessonCount(course: Course): number {
    return course.modules.reduce((total, mod) => total + mod.lessons.length, 0);
  }
}
