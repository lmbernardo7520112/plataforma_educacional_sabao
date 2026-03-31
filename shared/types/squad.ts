// shared/types/squad.ts

export interface ISquadBase {
  nome: string;
  classroomId: string;
  members: string[]; // max 5
}

export interface ISquadResponse extends ISquadBase {
  _id: string;
  ativo: boolean;
  criadoEm: string;
}
