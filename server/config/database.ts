// server/config/database.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * MongoDB connection with event listeners for resilience.
 * Pattern: AcademiaFlow connectDB (validated best practice).
 */
export const connectDB = async (): Promise<void> => {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL not set in environment');
    }

    const conn = await mongoose.connect(DATABASE_URL, {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Retrying...');
    });

    mongoose.connection.on('reconnected', () => {
      console.info('🔁 MongoDB reconnected.');
    });

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🧹 MongoDB connection closed on app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error during MongoDB shutdown:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', (error as Error).message);
    process.exit(1);
  }
};
