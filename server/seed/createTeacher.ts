import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authService } from '../services/authService.ts';

dotenv.config();

const run = async () => {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing.');
    process.exit(1);
  }

  await mongoose.connect(process.env.DATABASE_URL);
  
  try {
    const teacher = await authService.createTeacher('Doutor Leonardo', 'admin@ecosabon.com', '123456');
    console.log('✅ Credencial Administrativa Criada com Sucesso!');
    console.log('Login Institucional: admin@ecosabon.com');
    console.log('Senha Temporária: 123456');
  } catch (err: any) {
    if (err.message.includes('uso')) {
      console.log('⚠️ Reitoria já estabelecida. O Professor Administrador já existe no banco.');
    } else {
      console.error('❌ Erro inexperado ao criar Cátedra:', err);
    }
  }

  await mongoose.disconnect();
};

run();
