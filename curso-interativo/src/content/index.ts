// ============================================================================
// EcoSabon — Curso Interativo | Content Index
// ============================================================================
// Exporta o curso completo como estrutura tipada.
// Os módulos 1-7 serão adicionados progressivamente.
// ============================================================================

import type { Course } from '../domain/models/index.js';
import { module0 } from './modules/module0.js';

/**
 * Curso completo do EcoSabon.
 * Fonte única de verdade para todo o conteúdo do e-learning.
 */
export const ecosabon: Course = {
  id: 'ecosabon-curso-v1',
  title: 'EcoSabon — Ciência, Sabão e Sustentabilidade',
  version: '1.0.0',
  modules: [
    module0,
    // module1, module2, ... serão adicionados nos próximos commits
  ],
};
