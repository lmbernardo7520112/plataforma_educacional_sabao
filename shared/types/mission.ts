// shared/types/mission.ts

export type MissionStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED';

export interface IMissionDefinition {
  id: number;
  title: string;
  theme: string;
}

export interface IMissionState {
  id: number;
  title: string;
  theme: string;
  status: MissionStatus;
  evidenceUrl?: string;
  xpEarned?: number;
}
