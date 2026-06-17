// ============================================================================
// EcoSabon — Curso Interativo | ProgressTracker (Domain Service)
// ============================================================================
// Responsabilidade Única: Gerenciar o estado de progresso do aluno no curso.
// - Navegação bloqueada (RF-CUR-001)
// - Persistência via JSON (RF-CUR-006)
//
// Zero dependências de infraestrutura — lógica pura.
// ============================================================================

import type { Course, ProgressState, LessonProgress, BlockProgress } from '../models/index.js';

/**
 * Serviço de domínio para rastreamento de progresso do aluno.
 * 
 * Implementa navegação sequencial bloqueada: o aluno só avança para
 * a próxima lição quando TODOS os blocos da lição atual estão concluídos.
 */
export class ProgressTracker {
  private state: ProgressState;

  /** Mapa de lessonId → total de blocos (cache para performance) */
  private readonly lessonBlockCounts: Map<string, number>;

  /** Lista ordenada de todos os lessonIds no curso (linearização) */
  private readonly orderedLessonIds: string[];

  constructor(course: Course) {
    this.lessonBlockCounts = new Map();
    this.orderedLessonIds = [];

    // Lineariza todos os lessonIds e cacheia contagem de blocos
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        this.orderedLessonIds.push(lesson.id);
        this.lessonBlockCounts.set(lesson.id, lesson.blocks.length);
      }
    }

    this.state = {
      courseId: course.id,
      currentModuleIndex: 0,
      currentLessonIndex: 0,
      lessons: {},
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    };
  }

  // ─── RF-CUR-001: Navegação Bloqueada ────────────────────────────

  /**
   * Verifica se o aluno pode navegar para uma lição específica.
   * A primeira lição é sempre acessível.
   * As demais exigem que TODAS as anteriores estejam completas.
   */
  canNavigateTo(lessonId: string): boolean {
    const targetIndex = this.orderedLessonIds.indexOf(lessonId);
    if (targetIndex === -1) return false;
    if (targetIndex === 0) return true;

    // Verifica se todas as lições anteriores estão completas
    for (let i = 0; i < targetIndex; i++) {
      const prevId = this.orderedLessonIds[i];
      if (prevId === undefined) return false;
      if (!this.isLessonComplete(prevId)) return false;
    }
    return true;
  }

  // ─── RF-CUR-001: Completude de Blocos ───────────────────────────

  /**
   * Marca um bloco como concluído.
   * @throws se lessonId ou blockIndex for inválido
   */
  completeBlock(lessonId: string, blockIndex: number): void {
    const totalBlocks = this.lessonBlockCounts.get(lessonId);
    if (totalBlocks === undefined) {
      throw new Error(`Lesson ID "${lessonId}" não encontrada no curso.`);
    }
    if (blockIndex < 0 || blockIndex >= totalBlocks) {
      throw new Error(`Block index ${blockIndex} fora do range [0, ${totalBlocks - 1}] para lição "${lessonId}".`);
    }

    // Garante que a lição tenha entry no estado
    const lessonProgress = this.getOrCreateLessonProgress(lessonId, totalBlocks);

    // Marca o bloco como completo
    const updatedBlocks = lessonProgress.blocks.map((bp) =>
      bp.blockIndex === blockIndex
        ? { ...bp, completed: true, completedAt: new Date().toISOString() }
        : bp
    );

    const allComplete = updatedBlocks.every((bp) => bp.completed);

    this.state = {
      ...this.state,
      lastAccessedAt: new Date().toISOString(),
      lessons: {
        ...this.state.lessons,
        [lessonId]: {
          lessonId,
          completed: allComplete,
          completedAt: allComplete ? new Date().toISOString() : undefined,
          blocks: updatedBlocks,
        },
      },
    };
  }

  /**
   * Verifica se um bloco específico foi concluído.
   */
  isBlockComplete(lessonId: string, blockIndex: number): boolean {
    const lesson = this.state.lessons[lessonId];
    if (!lesson) return false;
    const block = lesson.blocks.find((b) => b.blockIndex === blockIndex);
    return block?.completed ?? false;
  }

  // ─── RF-CUR-001: Completude de Lição ────────────────────────────

  /**
   * Verifica se TODOS os blocos de uma lição foram concluídos.
   */
  isLessonComplete(lessonId: string): boolean {
    const lesson = this.state.lessons[lessonId];
    if (!lesson) return false;
    return lesson.completed;
  }

  // ─── Métricas ───────────────────────────────────────────────────

  /**
   * Retorna a porcentagem de conclusão do curso (0-100).
   * Baseada no número de lições completas / total de lições.
   */
  getCompletionPercentage(): number {
    const total = this.orderedLessonIds.length;
    if (total === 0) return 0;

    const completed = this.orderedLessonIds.filter((id) =>
      this.isLessonComplete(id)
    ).length;

    return (completed / total) * 100;
  }

  // ─── RF-CUR-006: Serialização ───────────────────────────────────

  /**
   * Serializa o estado atual para JSON (para persistência).
   */
  toJSON(): ProgressState {
    return { ...this.state };
  }

  /**
   * Restaura um ProgressTracker a partir de um JSON salvo.
   */
  static fromJSON(course: Course, json: ProgressState): ProgressTracker {
    const tracker = new ProgressTracker(course);
    tracker.state = { ...json };
    return tracker;
  }

  // ─── Helpers Internos ───────────────────────────────────────────

  private getOrCreateLessonProgress(lessonId: string, totalBlocks: number): LessonProgress {
    const existing = this.state.lessons[lessonId];
    if (existing) return existing;

    const blocks: BlockProgress[] = Array.from({ length: totalBlocks }, (_, i) => ({
      blockIndex: i,
      completed: false,
    }));

    const newProgress: LessonProgress = {
      lessonId,
      completed: false,
      blocks,
    };

    this.state = {
      ...this.state,
      lessons: {
        ...this.state.lessons,
        [lessonId]: newProgress,
      },
    };

    return newProgress;
  }
}
