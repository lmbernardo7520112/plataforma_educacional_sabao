// shared/types/classroom.ts

export interface IClassroomBase {
  nome: string;
  ano: number;
  ativo: boolean;
}

export interface IClassroomResponse extends IClassroomBase {
  _id: string;
  criadoEm: string;
  atualizadoEm: string;
  qtdSquads?: number;
}
