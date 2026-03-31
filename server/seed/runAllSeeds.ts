// server/seed/runAllSeeds.ts
// ============================================================
// Unified seed runner — connects once, runs all seeds in order
// Usage: npx tsx server/seed/runAllSeeds.ts
// ============================================================

import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

import mongoose from 'mongoose';

// Ensure all models are registered before any query
import '../models/init.ts';

// Import seed functions
import { seedTurmasAlunos } from './populateTurmasAlunos.ts';

async function main(): Promise<void> {
  try {
    const MONGO_URI =
      process.env.MONGO_URI ||
      process.env.DATABASE_URL ||
      'mongodb://localhost:27017/ecosabon_db';

    console.log('============================================================');
    console.log('🚀 EcoSabon — Unified Seed Runner');
    console.log('============================================================');
    console.log(`📦 Connecting to MongoDB: ${MONGO_URI}\n`);

    await mongoose.connect(MONGO_URI, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ Connected to MongoDB!\n');

    // ── Step 1: Create classrooms ────────────────────────
    console.log('============================================================');
    console.log('📌 STEP 1/1 — Creating classrooms from seed data');
    console.log('============================================================');
    await seedTurmasAlunos();

    // ── Done ─────────────────────────────────────────────
    console.log('\n============================================================');
    console.log('🎉 ALL SEEDS COMPLETED SUCCESSFULLY!');
    console.log('============================================================');
  } catch (err) {
    console.error('❌ Fatal seed error:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed.');
    process.exit(0);
  }
}

main();
