// ============================================================================
// EcoSabon — Curso Interativo | Domain Barrel Export
// ============================================================================
// Ponto único de importação para toda a camada de domínio.
// ============================================================================

// Models
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
} from './models/Course.js';

export type {
  BlockProgress,
  LessonProgress,
  ProgressState,
} from './models/ProgressState.js';

export { createInitialProgress } from './models/ProgressState.js';

// Services
export { ProgressTracker } from './services/ProgressTracker.js';
export { ContentValidator } from './services/ContentValidator.js';
