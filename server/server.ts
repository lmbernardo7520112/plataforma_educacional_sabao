// server/server.ts

import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';

import basicRoutes from './routes/index.js';
import { connectDB } from './config/database.js';
import dbInit from './models/init.js';

// ==========================================================
// GLOBAL ERROR HANDLERS
// ==========================================================
process.on('uncaughtException', (err: Error) => {
  console.error('🚨 Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('🚨 Unhandled Rejection:', reason);
  console.error(promise);
  process.exit(1);
});

// ==========================================================
// ENVIRONMENT VARIABLES
// ==========================================================
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is missing in .env file.');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is missing in .env file. Server startup aborted.');
  process.exit(1);
}

// ==========================================================
// EXPRESS APP
// ==========================================================
const app = express();
const port = process.env.PORT || 3000;

app.enable('json spaces');
app.enable('strict routing');

// Security headers (best practice: helmet before any routes)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static assets
app.use('/uploads', express.static('uploads'));

// ==========================================================
// RATE LIMITING (H1 Hardening — basic abuse protection)
// ==========================================================
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // max 100 requests per windowMs per IP
  standardHeaders: true,     // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,      // Disable X-RateLimit-* headers
  message: { success: false, message: 'Limite de requisições excedido. Tente novamente em 15 minutos.' },
});
app.use('/api/', apiLimiter);

// ==========================================================
// ROUTES
// ==========================================================
app.use('/', basicRoutes);

// 404 — Route not found
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Page not found' });
});

// 500 — Internal error
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`💥 Application error: ${err.message}`);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
);

// ==========================================================
// START SERVER
// ==========================================================
const startServer = async () => {
  try {
    await connectDB();
    await dbInit();

    console.log('✅ MongoDB connected and models initialized successfully!');

    app.listen(port, () => {
      console.log(`🚀 EcoSabon API running at http://localhost:${port}`);
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`❌ Failed to start server: ${msg}`);
    process.exit(1);
  }
};

// ==========================================================
// ONLY START IF EXECUTED DIRECTLY
// ==========================================================
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  startServer();
}

export { app, startServer };
