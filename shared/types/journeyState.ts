// shared/types/journeyState.ts

export interface INumericInputs {
  oilMassGrams?: number;
  naohGrams?: number;
  startTemp?: number;
  endTemp?: number;
  phLevel?: number;
}

export interface IJourneyStateBase {
  squadId: string;
  missionId: number;
  status: 'PENDING' | 'COMPLETED';
  observation: string;
  numericInputs: INumericInputs;
  evidenceUrl: string;
  xpEarned: number;
}

export interface IJourneyStateResponse extends IJourneyStateBase {
  _id: string;
  completedAt: string;
}
