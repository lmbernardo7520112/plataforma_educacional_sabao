// ============================================================================
// EcoSabon — Curso Interativo | Domain Models Barrel Export
// ============================================================================

export type {
  BlockType,
  FlashcardItem,
  SortingItem,
  ScenarioOption,
  HotspotItem,
  ProcessStep,
  AccordionSection,
  Block,
  Lesson,
  CourseModule,
  Course,
} from './Course.js';

export type {
  BlockProgress,
  LessonProgress,
  ProgressState,
} from './ProgressState.js';

export { createInitialProgress } from './ProgressState.js';
