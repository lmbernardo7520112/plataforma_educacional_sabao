// ============================================================================
// EcoSabon — Curso Interativo | Storage Port (Interface)
// ============================================================================
// Dependency Inversion: A camada de domínio/aplicação depende DESTA interface,
// não de implementações concretas (localStorage, Zustand, etc.).
// ============================================================================

import type { ProgressState } from '../../domain/models/index.js';

/**
 * Contrato para qualquer mecanismo de persistência de progresso.
 * 
 * Implementações:
 * - LocalStorageAdapter (standalone)
 * - ZustandAdapter (React/Nível 4)
 * - InMemoryAdapter (testes)
 */
export interface IStoragePort {
  /** Salva o estado completo de progresso */
  save(state: ProgressState): void;

  /** Recupera o estado salvo, ou null se não existir */
  load(courseId: string): ProgressState | null;

  /** Remove o estado salvo (reset) */
  clear(courseId: string): void;
}
