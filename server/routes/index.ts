// server/routes/index.ts

import express from 'express';

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
// router.use('/api', classroomRoutes);
// router.use('/api', squadRoutes);
// router.use('/api', missionRoutes);
// router.use('/api', reportRoutes);

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
