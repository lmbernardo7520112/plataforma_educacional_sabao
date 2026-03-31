// server/services/classroomService.ts

import { Classroom, IClassroom } from '../models/Classroom.ts';
import { Squad } from '../models/Squad.ts';
import fs from 'node:fs';
import path from 'node:path';

export class ClassroomService {
  /**
   * Pega todas as turmas ativas no MongoDB
   */
  async getActiveClassrooms() {
    return Classroom.find({ ativo: true })
      .sort({ ano: -1, nome: 1 })
      .lean();
  }

  /**
   * Pega uma turma pelo ID e retorna também a lista original de alunos do JSON
   */
  async getClassroomWithStudents(id: string): Promise<any> {
    const classroom = await Classroom.findById(id).lean();
    if (!classroom) {
      throw new Error('Turma não encontrada');
    }

    // Calcular a quantidade de grupos já formados
    const qtdSquads = await Squad.countDocuments({ classroomId: id, ativo: true });

    // Ler JSON para pegar a lista original de alunos da turma
    let alunos: { numero: string; nome: string }[] = [];
    try {
      const jsonPath = path.resolve('./server/seed/turmas_alunos.json');
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      const turmaData = data.turmas.find(
        (t: any) => t.nome_turma === classroom.nome
      );
      if (turmaData) {
        alunos = turmaData.alunos;
      }
    } catch (err) {
      console.warn('Could not read turmas_alunos.json:', err);
    }

    return {
      ...classroom,
      qtdSquads,
      alunosOriginal: alunos,
    };
  }
}

export const classroomService = new ClassroomService();
