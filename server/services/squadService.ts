// server/services/squadService.ts

import { Squad, ISquad } from '../models/Squad.ts';
import { Classroom } from '../models/Classroom.ts';

export class SquadService {
  /**
   * Consulta os grupos formados numa turma
   */
  async getSquadsByClassroom(classroomId: string) {
    return Squad.find({ classroomId, ativo: true })
      .sort({ nome: 1 })
      .lean();
  }

  /**
   * Cria um novo grupo na turma
   */
  async createSquad(
    classroomId: string,
    nome: string,
    members: string[]
  ): Promise<ISquad> {
    const isValidId = await Classroom.exists({ _id: classroomId, ativo: true });
    if (!isValidId) {
      throw new Error('Turma informada não existe ou está inativa.');
    }

    const checkName = await Squad.findOne({
      classroomId,
      nome: { $regex: new RegExp(`^${nome}$`, 'i') },
    });
    if (checkName) {
      throw new Error('Já existe um grupo com este nome nesta turma.');
    }

    const newSquad = await Squad.create({
      classroomId,
      nome,
      members,
      ativo: true,
    });

    return newSquad;
  }

  /**
   * Detalhes de um grupo + turma (populated)
   */
  async getSquadById(id: string) {
    const squad = await Squad.findById(id).populate('classroomId', 'nome ano').lean();
    if (!squad) throw new Error('Grupo não encontrado');
    return squad;
  }
}

export const squadService = new SquadService();
