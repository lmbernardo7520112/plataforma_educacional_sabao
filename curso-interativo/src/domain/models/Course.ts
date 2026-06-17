// ============================================================================
// EcoSabon — Curso Interativo | Domain Models
// ============================================================================
// Camada de Domínio: Zero dependências externas.
// Estas interfaces definem o contrato de dados para todo o sistema.
// ============================================================================

/**
 * Tipos de blocos interativos disponíveis no curso.
 * Cada tipo mapeia diretamente para um componente de apresentação.
 */
export type BlockType =
  | 'text'
  | 'process'
  | 'labeled-graphic'
  | 'flashcards'
  | 'accordion'
  | 'sorting-activity'
  | 'scenario'
  | 'progress-tracker';

/**
 * Item individual de um Flashcard (frente e verso).
 */
export interface FlashcardItem {
  readonly front: string;
  readonly back: string;
}

/**
 * Item de uma Sorting Activity com sua classificação correta.
 */
export interface SortingItem {
  readonly label: string;
  readonly correctCategory: string;
}

/**
 * Opção de resposta em um Scenario Block.
 */
export interface ScenarioOption {
  readonly id: string;
  readonly text: string;
  readonly isCorrect: boolean;
  readonly feedback: string;
}

/**
 * Hotspot para um Labeled Graphic.
 */
export interface HotspotItem {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  /** Posição relativa (%) no eixo X da imagem base */
  readonly x: number;
  /** Posição relativa (%) no eixo Y da imagem base */
  readonly y: number;
}

/**
 * Etapa de um Process Block.
 */
export interface ProcessStep {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
}

/**
 * Seção de um Accordion.
 */
export interface AccordionSection {
  readonly title: string;
  readonly content: string;
}

/**
 * Bloco genérico do curso.
 * O campo `data` varia conforme o `type` (discriminated union).
 */
export type Block =
  | { readonly type: 'text'; readonly data: { readonly content: string } }
  | { readonly type: 'process'; readonly data: { readonly steps: readonly ProcessStep[] } }
  | { readonly type: 'labeled-graphic'; readonly data: { readonly imageUrl: string; readonly hotspots: readonly HotspotItem[] } }
  | { readonly type: 'flashcards'; readonly data: { readonly cards: readonly FlashcardItem[] } }
  | { readonly type: 'accordion'; readonly data: { readonly sections: readonly AccordionSection[] } }
  | { readonly type: 'sorting-activity'; readonly data: { readonly prompt: string; readonly items: readonly SortingItem[]; readonly categories: readonly string[]; readonly feedbackCorrect: string; readonly feedbackIncorrect: string } }
  | { readonly type: 'scenario'; readonly data: { readonly context: string; readonly question: string; readonly options: readonly ScenarioOption[] } }
  | { readonly type: 'progress-tracker'; readonly data: Record<string, never> };

/**
 * Uma lição dentro de um módulo.
 */
export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly estimatedMinutes: number;
  readonly bloomLevel: string;
  readonly objective: string;
  readonly blocks: readonly Block[];
}

/**
 * Um módulo do curso (agrupa lições por tema).
 */
export interface CourseModule {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  readonly engineeringPhase: string;
  readonly lessons: readonly Lesson[];
}

/**
 * Curso completo (raiz da árvore de conteúdo).
 */
export interface Course {
  readonly id: string;
  readonly title: string;
  readonly version: string;
  readonly modules: readonly CourseModule[];
}
