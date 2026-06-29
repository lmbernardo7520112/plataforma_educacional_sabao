// server/seed/restrictedPilotSeed.ts

import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';
import Classroom from '../models/Classroom.ts';
import { Teacher } from '../models/Teacher.ts';
import { Squad } from '../models/Squad.ts';
import bcrypt from 'bcryptjs';

interface SeedTeacher {
  name: string;
  email: string;
}

interface SeedClassroom {
  id: string;
  name: string;
  code: string;
}

interface SeedSquad {
  name: string;
  classroomId: string;
  students: string[];
}

interface RestrictedSeedData {
  teachers: SeedTeacher[];
  classrooms: SeedClassroom[];
  squads: SeedSquad[];
}

/**
 * Core restricted pilot seed logic.
 * Requires an active Mongoose connection.
 */
export async function seedRestrictedPilot(): Promise<void> {
  console.log('🚀 Iniciando seed de piloto restrito...');

  const jsonPath = path.resolve('./server/seed/restricted_pilot_data.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`❌ Arquivo não encontrado: ${jsonPath}`);
  }

  const data: RestrictedSeedData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const ano = new Date().getFullYear();

  // 1. Seed Teachers
  for (const t of data.teachers) {
    const existing = await Teacher.findOne({ email: t.email });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('SenhaPiloto123!', salt); // Default mock password
      await Teacher.create({
        name: t.name,
        email: t.email,
        passwordHash,
      });
      console.log(`✅ Professor cadastrado: ${t.name} (${t.email})`);
    } else {
      console.log(`⏭️ Professor já existe: ${t.email}`);
    }
  }

  // Map generated classrooms
  const classroomMap = new Map<string, mongoose.Types.ObjectId>();

  // 2. Seed Classrooms
  for (const c of data.classrooms) {
    let classroom = await Classroom.findOne({ nome: c.name, ano });
    if (!classroom) {
      classroom = await Classroom.create({
        nome: c.name,
        ano,
        ativo: true,
      });
      console.log(`✅ Turma criada: ${c.name}`);
    } else {
      console.log(`⏭️ Turma já existe: ${c.name}`);
    }
    classroomMap.set(c.id, classroom._id as mongoose.Types.ObjectId);
  }

  // 3. Seed Squads
  for (const s of data.squads) {
    const mongoClassroomId = classroomMap.get(s.classroomId);
    if (!mongoClassroomId) continue;

    const existing = await Squad.findOne({ nome: s.name, classroomId: mongoClassroomId });
    if (!existing) {
      await Squad.create({
        nome: s.name,
        classroomId: mongoClassroomId,
        members: s.students,
      });
      console.log(`✅ Bancada criada: ${s.name} com ${s.students.length} alunos`);
    } else {
      console.log(`⏭️ Bancada já existe: ${s.name}`);
    }
  }

  console.log('🎉 Seed de piloto restrito finalizado com sucesso!');
}

/**
 * Standalone execution runner
 */
async function run(): Promise<void> {
  try {
    const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/ecosabon_db';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado ao MongoDB');

    await seedRestrictedPilot();
  } catch (err) {
    console.error('❌ Erro no seed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Conexão encerrada com MongoDB.');
    process.exit(0);
  }
}

if (process.argv[1]?.includes('restrictedPilotSeed')) {
  run();
}
