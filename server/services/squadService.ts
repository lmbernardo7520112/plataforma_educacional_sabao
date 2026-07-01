// server/services/squadService.ts

import { Squad, ISquad } from '../models/Squad.ts';
import { Classroom } from '../models/Classroom.ts';
import { JourneyState } from '../models/JourneyState.ts';

import crypto from 'node:crypto';

export class SquadService {
  /**
   * Generates a short, URL-safe, uppercase access code for a squad.
   */
  private generateAccessCode(): string {
    // 6-char uppercase alphanumeric (36^6 ≈ 2.2B combinations)
    return crypto.randomBytes(4).toString('base64url').slice(0, 6).toUpperCase();
  }

  /**
   * Consulta os grupos formados numa turma
   */
  async getSquadsByClassroom(classroomId: string) {
    return Squad.find({ classroomId, ativo: true })
      .sort({ nome: 1 })
      .lean();
  }

  /**
   * Cria um novo grupo na turma com código de acesso e rastreabilidade docente
   */
  async createSquad(
    classroomId: string,
    nome: string,
    members: string[],
    teacherId?: string
  ): Promise<{ squad: ISquad; accessCode: string }> {
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

    const accessCode = this.generateAccessCode();

    const newSquad = await Squad.create({
      classroomId,
      nome,
      members,
      ativo: true,
      accessCode,
      createdByTeacherId: teacherId || null,
    });

    return { squad: newSquad, accessCode };
  }

  /**
   * Detalhes de um grupo + turma (populated)
   */
  async getSquadById(id: string) {
    const squad = await Squad.findById(id).populate('classroomId', 'nome ano').lean();
    if (!squad) throw new Error('Grupo não encontrado');
    return squad;
  }

  /**
   * Refatoração Estrutural do Grupo (Editar Nomes/Alunos)
   */
  async updateSquad(classroomId: string, squadId: string, nome: string, members: string[]) {
    // Check de duplicidade de nome ignorando a atual
    const checkName = await Squad.findOne({
      classroomId,
      _id: { $ne: squadId },
      nome: { $regex: new RegExp(`^${nome}$`, 'i') },
    });
    if (checkName) throw new Error('Outra equipe já reservou essa nomenclatura teórica na Turma.');

    const squad = await Squad.findOneAndUpdate(
      { _id: squadId, classroomId },
      { $set: { nome, members } },
      { new: true }
    );
    if (!squad) throw new Error('Bancada Extinta ou Falha Referencial de Turma.');
    
    return squad;
  }

  /**
   * Extinção Global (Teacher Roles Only) operando Deleção Cascata Segura
   */
  async deleteSquad(classroomId: string, squadId: string) {
    const squad = await Squad.findOneAndDelete({ _id: squadId, classroomId });
    if (!squad) throw new Error('Ataque Negado: A bancada alvo do expurgo não atende aos parâmetros ou vazou do DB.');

    // Cascading Delete Mongoose: Se a bancada cair, as missões e diários biográficos evaporam pra não inflar custos do server
    await JourneyState.deleteMany({ squadId });
    
    return true;
  }
}

export const squadService = new SquadService();
