// shared/config/missions.ts

import type { IMissionDefinition } from '../types/mission.js';

/**
 * As 9 missões da jornada pedagógica do EcoSabon.
 * Single source of truth — consumido pelo client (UI) e server (validação).
 */
export const MISSION_DEFINITIONS: IMissionDefinition[] = [
  { id: 1, title: 'O Inimigo Invisível', theme: 'Sustentabilidade' },
  { id: 2, title: 'Vestindo o Jaleco', theme: 'Segurança' },
  { id: 3, title: 'Cálculo da Soda (Receita)', theme: 'Estequiometria' },
  { id: 4, title: 'Purificação do Óleo', theme: 'Separação' },
  { id: 5, title: 'O Despertar (Reactivo)', theme: 'Entalpia' },
  { id: 6, title: 'A Fusão (Trace)', theme: 'Saponificação' },
  { id: 7, title: 'Molde e Repouso', theme: 'Cristalização' },
  { id: 8, title: 'Auditoria de pH', theme: 'Qualidade Base' },
  { id: 9, title: 'Embaixadores da Água', theme: 'Culminância' },
];

export const TOTAL_MISSIONS = MISSION_DEFINITIONS.length;
