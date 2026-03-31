import { create } from 'zustand';

export type MissionStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED';

export interface Mission {
  id: number;
  title: string;
  theme: string;
  status: MissionStatus;
  evidenceUrl?: string; // Evidência fotográfica obrigatória do SDD
  xpEarned?: number;
}

interface JourneyState {
  classroomId: string | null;
  classroomName: string | null;
  squadId: string | null;
  squadName: string | null;
  members: string[];

  missions: Mission[];
  currentActiveMissionId: number;
  totalXP: number;
  waterSavedLiters: number; // Fator de Impacto mestre (1 litro de óleo = 25.000L salvos)
  
  // Ações
  setSquad: (classroomId: string, classroomName: string, squadId: string, squadName: string, members: string[]) => void;
  clearSession: () => void;

  completeMission: (missionId: number, evidenceUrl: string, xpEarned: number, oilRecycledLiters?: number) => void;
  unlockNextMission: () => void;
  resetJourney: () => void;
}

const INITIAL_MISSIONS: Mission[] = [
  { id: 1, title: 'O Inimigo Invisível', theme: 'Sustentabilidade', status: 'ACTIVE' },
  { id: 2, title: 'Vestindo o Jaleco', theme: 'Segurança', status: 'LOCKED' },
  { id: 3, title: 'Cálculo da Soda (Receita)', theme: 'Estequiometria', status: 'LOCKED' },
  { id: 4, title: 'Purificação do Óleo', theme: 'Separação', status: 'LOCKED' },
  { id: 5, title: 'O Despertar (Reactivo)', theme: 'Entalpia', status: 'LOCKED' },
  { id: 6, title: 'A Fusão (Trace)', theme: 'Saponificação', status: 'LOCKED' },
  { id: 7, title: 'Molde e Repouso', theme: 'Cristalização', status: 'LOCKED' },
  { id: 8, title: 'Auditoria de pH', theme: 'Qualidade Base', status: 'LOCKED' },
  { id: 9, title: 'Embaixadores da Água', theme: 'Culminância', status: 'LOCKED' },
];

export const useJourneyStore = create<JourneyState>((set, get) => ({
  classroomId: null,
  classroomName: null,
  squadId: null,
  squadName: null,
  members: [],

  missions: INITIAL_MISSIONS,
  currentActiveMissionId: 1,
  totalXP: 0,
  waterSavedLiters: 0,

  setSquad: (classroomId, classroomName, squadId, squadName, members) => {
    set({ classroomId, classroomName, squadId, squadName, members });
  },

  clearSession: () => {
    set({
      classroomId: null,
      classroomName: null,
      squadId: null,
      squadName: null,
      members: [],
      missions: INITIAL_MISSIONS,
      currentActiveMissionId: 1,
      totalXP: 0,
      waterSavedLiters: 0,
    });
  },

  completeMission: (missionId, evidenceUrl, xpEarned, oilRecycledLiters = 0) => {
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === missionId ? { ...m, status: 'COMPLETED', evidenceUrl, xpEarned } : m
      ),
      totalXP: state.totalXP + xpEarned,
      waterSavedLiters: state.waterSavedLiters + (oilRecycledLiters * 25000), // 25k L por 1L óleo
    }));
    get().unlockNextMission();
  },

  unlockNextMission: () => {
    set((state) => {
      const nextMissionId = state.currentActiveMissionId + 1;
      if (nextMissionId > 9) return state; // Fim da jornada

      return {
        currentActiveMissionId: nextMissionId,
        missions: state.missions.map((m) =>
          m.id === nextMissionId ? { ...m, status: 'ACTIVE' } : m
        ),
      };
    });
  },

  resetJourney: () => {
    set({
      missions: INITIAL_MISSIONS,
      currentActiveMissionId: 1,
      totalXP: 0,
      waterSavedLiters: 0,
    });
  },
}));
