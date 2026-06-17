// ============================================================================
// EcoSabon — Curso Interativo | Content Index
// ============================================================================
// Exporta o curso completo como estrutura tipada.
// 8 módulos, 24 lições, ~120 blocos interativos.
// ============================================================================

import type { Course } from '../domain/models/index.js';
import { module0 } from './modules/module0.js';
import { module1 } from './modules/module1.js';
import { module2 } from './modules/module2.js';
import { module3 } from './modules/module3.js';
import { module4 } from './modules/module4.js';
import { module5 } from './modules/module5.js';
import { module6 } from './modules/module6.js';
import { module7 } from './modules/module7.js';

/**
 * Curso completo do EcoSabon.
 * Fonte única de verdade para todo o conteúdo do e-learning.
 */
export const ecosabon: Course = {
  id: 'ecosabon-curso-v1',
  title: 'EcoSabon — Ciência, Sabão e Sustentabilidade',
  version: '1.0.0',
  modules: [module0, module1, module2, module3, module4, module5, module6, module7],
};
