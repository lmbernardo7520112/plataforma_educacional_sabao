// ============================================================================
// EcoSabon — Curso Interativo | NullScormAdapter (Infrastructure)
// ============================================================================
// Strategy Pattern: No-op adapter usado quando não há LMS.
// Todas as chamadas são silenciosas — sem crash, sem side effects.
// ============================================================================

import type { IScormPort } from '../../application/ports/index.js';

/**
 * Adaptador SCORM nulo (no-op) para modo standalone.
 * Implementa a mesma interface que ScormApiAdapter, mas não faz nada.
 * Garante que o curso funciona identicamente com ou sem LMS.
 */
export class NullScormAdapter implements IScormPort {
  initialize(): boolean {
    return false;
  }

  isConnected(): boolean {
    return false;
  }

  setScore(_score: number): void {
    // No-op
  }

  setStatus(_status: 'completed' | 'incomplete' | 'passed' | 'failed'): void {
    // No-op
  }

  commit(): void {
    // No-op
  }

  terminate(): void {
    // No-op
  }
}
