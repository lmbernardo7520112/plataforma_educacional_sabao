// ============================================================================
// EcoSabon — Curso Interativo | LocalStorageAdapter (Infrastructure)
// ============================================================================
// Implementa IStoragePort usando window.localStorage.
// RF: RF-CUR-006 — Persistência de progresso entre sessões
// ============================================================================

import type { IStoragePort } from '../../application/ports/index.js';
import type { ProgressState } from '../../domain/models/index.js';

const STORAGE_PREFIX = 'ecosabon-curso-';

/**
 * Adaptador que persiste ProgressState em localStorage.
 * Usado no modo standalone (Nível 3).
 */
export class LocalStorageAdapter implements IStoragePort {

  save(state: ProgressState): void {
    const key = STORAGE_PREFIX + state.courseId;
    localStorage.setItem(key, JSON.stringify(state));
  }

  load(courseId: string): ProgressState | null {
    const key = STORAGE_PREFIX + courseId;
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as ProgressState;
    } catch {
      // Dados corrompidos — limpa e retorna null
      localStorage.removeItem(key);
      return null;
    }
  }

  clear(courseId: string): void {
    const key = STORAGE_PREFIX + courseId;
    localStorage.removeItem(key);
  }
}
