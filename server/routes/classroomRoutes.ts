// server/routes/classroomRoutes.ts

import { Router, Request, Response } from 'express';
import { classroomService } from '../services/classroomService.ts';
import { requireAuth } from '../middleware/auth.ts';

const router = Router();

router.get('/', requireAuth, async (_req: Request, res: Response) => {
  try {
    const list = await classroomService.getActiveClassrooms();
    res.json({ success: true, data: list });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const details = await classroomService.getClassroomWithStudents(req.params.id as string);
    res.json({ success: true, data: details });
  } catch (error: unknown) {
    res.status(404).json({ success: false, message: (error as Error).message });
  }
});

export default router;
