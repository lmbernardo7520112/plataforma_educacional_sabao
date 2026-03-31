import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Teacher } from '../models/Teacher.ts';
import { Squad } from '../models/Squad.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'ecosabon_master_key';

export class AuthService {
  async authenticateTeacher(email: string, passwordPlain: string) {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) throw new Error('Cátedra não reconhecida (E-mail sem contrato ativo).');

    const isValid = await bcrypt.compare(passwordPlain, teacher.passwordHash);
    if (!isValid) throw new Error('Assinatura Eletrônica (Senha) Incorreta.');

    const token = jwt.sign(
      { id: teacher._id, role: 'TEACHER' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return { token, user: { id: teacher._id, name: teacher.name, email: teacher.email } };
  }

  async createTeacher(name: string, email: string, passwordPlain: string) {
    const existing = await Teacher.findOne({ email });
    if (existing) throw new Error('Conselho já contém este Catedrático Registrado (E-mail em uso).');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordPlain, salt);

    const teacher = await Teacher.create({ name, email, passwordHash });
    return { id: teacher._id, name: teacher.name, email: teacher.email };
  }

  async authenticateSquad(squadId: string) {
    // Alunos possuem Single Sign-On direto clicando na Bancada para foco na UX de laboratório.
    // Mesmo sem senha, a geração do Token garante que o cliente Browser ficará amarrado às rotas limitadas daquele SquadID.
    const squad = await Squad.findById(squadId);
    if (!squad) throw new Error('Bancada Extinta, Órfã ou Não Encontrada.');
    
    const token = jwt.sign(
      { squadId: squad._id, classroomId: squad.classroomId, role: 'SQUAD' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, squad };
  }
}

export const authService = new AuthService();
