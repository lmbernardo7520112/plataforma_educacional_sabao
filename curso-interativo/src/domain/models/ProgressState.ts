// ============================================================================
// EcoSabon — Curso Interativo | Progress State Model
// ============================================================================
// Modelo de estado de progresso do aluno.
// Persistível via JSON — serialização/deserialização determinística.
// ============================================================================

/**
 * Estado de conclusão de um bloco individual.
 */
export interface BlockProgress {
  readonly blockIndex: number;
  readonly completed: boolean;
  readonly completedAt?: string; // ISO 8601
}

/**
 * Estado de conclusão de uma lição.
 */
export interface LessonProgress {
  readonly lessonId: string;
  readonly completed: boolean;
  readonly completedAt?: string;
  readonly blocks: readonly BlockProgress[];
}

/**
 * Estado completo de progresso do aluno no curso.
 */
export interface ProgressState {
  readonly courseId: string;
  readonly currentModuleIndex: number;
  readonly currentLessonIndex: number;
  readonly lessons: Record<string, LessonProgress>;
  readonly startedAt: string;
  readonly lastAccessedAt: string;
}

/**
 * Factory: cria um ProgressState "zerado" para um curso.
 */
export function createInitialProgress(courseId: string): ProgressState {
  return {
    courseId,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    lessons: {},
    startedAt: new Date().toISOString(),
    lastAccessedAt: new Date().toISOString(),
  };
}
