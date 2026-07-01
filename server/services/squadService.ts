// server/services/squadService.ts

import { Squad, ISquad } from '../models/Squad.ts';
import { Classroom } from '../models/Classroom.ts';
import { JourneyState } from '../models/JourneyState.ts';

import crypto from 'node:crypto';

export class SquadService {
  /**
   * Generates a short, URL-safe, uppercase access code for a squad.
   * 8-char alphanumeric (36^8 ≈ 2.8 trillion combinations).
   */
  static generateAccessCode(): string {
    return crypto.randomBytes(6).toString('base64url').slice(0, 8).toUpperCase();
  }

  /**
   * One-way hash of the access code using SHA-256.
   * No salt needed for short codes — rate limiting compensates.
   */
  static hashAccessCode(code: string): string {
    return crypto.createHash('sha256').update(code.toUpperCase()).digest('hex');
  }

  /**
   * Verifies a plaintext access code against a stored hash.
   */
  static verifyAccessCode(code: string, hash: string): boolean {
    const candidateHash = SquadService.hashAccessCode(code);
    return crypto.timingSafeEqual(
      Buffer.from(candidateHash, 'hex'),
      Buffer.from(hash, 'hex'),
    );
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
   * Cria um novo grupo na turma com código de acesso (hash) e rastreabilidade docente.
   * Retorna o código plaintext UMA ÚNICA VEZ na resposta ao professor.
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

    const accessCode = SquadService.generateAccessCode();
    const accessCodeHash = SquadService.hashAccessCode(accessCode);

    const newSquad = await Squad.create({
      classroomId,
      nome,
      members,
      ativo: true,
      accessCodeHash,
      createdByTeacherId: teacherId || null,
    });

    // Return plaintext code ONCE to teacher — never stored or logged
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
