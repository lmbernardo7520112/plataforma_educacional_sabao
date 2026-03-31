// server/seed/populateTurmasAlunos.ts

import mongoose from 'mongoose';
import fs from 'node:fs';
import path from 'node:path';

import Classroom from '../models/Classroom.ts';

interface AlunoData {
  numero: string;
  nome: string;
}

interface TurmaData {
  nome_turma: string;
  alunos: AlunoData[];
}

interface SeedData {
  turmas: TurmaData[];
}

/**
 * Core seed logic — creates classrooms from JSON.
 * Expects mongoose to already be connected.
 */
export async function seedTurmasAlunos(): Promise<void> {
  console.log('🚀 Iniciando seed de turmas...\n');

  const jsonPath = path.resolve('./server/seed/turmas_alunos.json');
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`❌ Arquivo não encontrado: ${jsonPath}`);
  }

  const data: SeedData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const ano = new Date().getFullYear();

  for (const turmaData of data.turmas) {
    const { nome_turma } = turmaData;

    console.log(`\n🏫 Processando turma: ${nome_turma}`);

    let turma = await Classroom.findOne({ nome: nome_turma, ano });
    if (!turma) {
      turma = await Classroom.create({
        nome: nome_turma,
        ano,
        ativo: true,
      });
      console.log(`✅ Turma criada: ${nome_turma}`);
    } else {
      console.log(`⏭️ Turma já existe: ${nome_turma}`);
    }
  }

  console.log('\n🎉 Seed de turmas finalizado com sucesso!');
}

/**
 * Standalone execution
 */
async function run(): Promise<void> {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || 'mongodb://localhost:27017/ecosabon_db';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado ao MongoDB');

    await seedTurmasAlunos();
  } catch (err) {
    console.error('❌ Erro no seed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Conexão encerrada com MongoDB.');
    process.exit(0);
  }
}

if (process.argv[1]?.includes('populateTurmasAlunos')) {
  run();
}
