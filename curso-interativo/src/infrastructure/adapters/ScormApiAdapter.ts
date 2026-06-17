// ============================================================================
// EcoSabon — Curso Interativo | ScormApiAdapter (Infrastructure)
// ============================================================================
// Implementa IScormPort usando a API SCORM 1.2 (window.API).
// RF: RF-CUR-008 — Exportável como pacote SCORM 1.2
// ============================================================================

import type { IScormPort } from '../../application/ports/index.js';

/**
 * Interface da API SCORM 1.2 injetada pelo LMS no window global.
 */
interface ScormApi {
  LMSInitialize(param: string): string;
  LMSSetValue(key: string, value: string): string;
  LMSCommit(param: string): string;
  LMSFinish(param: string): string;
  LMSGetLastError(): string;
}

/**
 * Adaptador SCORM 1.2 que se comunica com o LMS via window.API.
 * Usado quando o curso roda dentro de um LMS (Moodle, Canvas, etc.).
 */
export class ScormApiAdapter implements IScormPort {
  private api: ScormApi | null = null;
  private connected = false;

  initialize(): boolean {
    // SCORM 1.2 padrão: o LMS injeta a API no window.API
    const api = (globalThis as Record<string, unknown>).API as ScormApi | undefined;
    if (!api || typeof api.LMSInitialize !== 'function') {
      this.connected = false;
      return false;
    }

    this.api = api;
    const result = this.api.LMSInitialize('');
    this.connected = result === 'true';
    return this.connected;
  }

  isConnected(): boolean {
    return this.connected;
  }

  setScore(score: number): void {
    if (!this.api || !this.connected) return;
    this.api.LMSSetValue('cmi.core.score.raw', String(score));
  }

  setStatus(status: 'completed' | 'incomplete' | 'passed' | 'failed'): void {
    if (!this.api || !this.connected) return;
    this.api.LMSSetValue('cmi.core.lesson_status', status);
  }

  commit(): void {
    if (!this.api || !this.connected) return;
    this.api.LMSCommit('');
  }

  terminate(): void {
    if (!this.api || !this.connected) return;
    this.api.LMSFinish('');
    this.connected = false;
  }
}
