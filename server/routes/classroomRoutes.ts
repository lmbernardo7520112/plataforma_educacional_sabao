// server/routes/classroomRoutes.ts

import { Router, Request, Response } from 'express';
import { classroomService } from '../services/classroomService.ts';
import { requireAuth, requireRole } from '../middleware/auth.ts';
import { validate } from '../middleware/validate.ts';
import { classroomIdParamSchema } from '../schemas/common.schema.ts';

import { requireAuth, requireRole } from '../middleware/auth.ts';

const router = Router();

router.get('/', requireAuth, requireRole(['TEACHER']), async (_req: Request, res: Response) => {
  try {
    const list = await classroomService.getActiveClassrooms();
    res.json({ success: true, data: list });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

router.get('/:id', requireAuth, requireRole(['TEACHER']), validate(classroomIdParamSchema), async (req: Request, res: Response) => {
  try {
    const details = await classroomService.getClassroomWithStudents(req.params.id as string);
    res.json({ success: true, data: details });
  } catch (error: unknown) {
    res.status(404).json({ success: false, message: (error as Error).message });
  }
});

export default router;
