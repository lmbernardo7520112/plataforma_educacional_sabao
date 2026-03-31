// server/routes/index.ts

import express from 'express';
import classroomRoutes from './classroomRoutes.ts';
import squadRoutes from './squadRoutes.ts';
import missionRoutes from './missionRoutes.ts';
import authRoutes from './authRoutes.ts';
import reportRoutes from './reportRoutes.ts';

const router = express.Router();

// ==========================================================
// 🌐 Health check routes
// ==========================================================
router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '✅ Welcome to EcoSabon API!',
    version: '0.2.0',
  });
});

router.get('/ping', (_req, res) => {
  res.status(200).send('pong');
});

// ==========================================================
// 🚀 API routes (will be added in Phase 2+)
// ==========================================================
router.use('/api/classrooms', classroomRoutes);
router.use('/api/classrooms/:classroomId/squads', squadRoutes); // Nested route for squads inside a classroom
router.use('/api/squads', squadRoutes); // Standalone GET squad

router.use('/api/squads/:squadId/missions', missionRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/report', reportRoutes);

// ==========================================================
// ⚠️ Fallback
// ==========================================================
router.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found. Please verify your API route.',
  });
});

export default router;
