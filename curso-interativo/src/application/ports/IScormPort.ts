// ============================================================================
// EcoSabon — Curso Interativo | SCORM Port (Interface)
// ============================================================================
// Contrato para comunicação com LMS via SCORM 1.2 API.
// Em modo standalone, usa NullScormAdapter (no-op / Strategy Pattern).
// ============================================================================

/**
 * Contrato para adaptadores SCORM 1.2.
 * 
 * Implementações:
 * - ScormApiAdapter (LMS real — usa window.API)
 * - NullScormAdapter (standalone — no-op silencioso)
 */
export interface IScormPort {
  /** Tenta conectar ao LMS. Retorna true se API disponível. */
  initialize(): boolean;

  /** Verifica se a conexão com o LMS está ativa */
  isConnected(): boolean;

  /** Reporta a pontuação (0-100) ao LMS */
  setScore(score: number): void;

  /** Reporta o status da lição ao LMS */
  setStatus(status: 'completed' | 'incomplete' | 'passed' | 'failed'): void;

  /** Persiste os dados no LMS */
  commit(): void;

  /** Encerra a sessão SCORM */
  terminate(): void;
}
