// server/routes/squadRoutes.ts

import { Router, Request, Response } from 'express';
import { squadService } from '../services/squadService.ts';
import { validate } from '../middleware/validate.ts';
import { createSquadSchema, getSquadParamsSchema } from '../schemas/squad.schema.ts';

const router = Router({ mergeParams: true });

// Note: This router is expected to be mounted at /api/classrooms/:classroomId/squads
// and also standalone at /api/squads

// GET /api/classrooms/:classroomId/squads
router.get('/', async (req: Request, res: Response) => {
  try {
    const { classroomId } = req.params;
    if (!classroomId) {
      res.status(400).json({ success: false, message: 'classroomId Missing' });
      return;
    }
    const list = await squadService.getSquadsByClassroom(classroomId as string);
    res.json({ success: true, data: list });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

// POST /api/classrooms/:classroomId/squads
router.post('/', validate(createSquadSchema), async (req: Request, res: Response) => {
  try {
    const { classroomId } = req.params;
    const { nome, members } = req.body;
    
    const newSquad = await squadService.createSquad(classroomId as string, nome, members);
    res.status(201).json({ success: true, data: newSquad });
  } catch (error: unknown) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
});

// GET /api/squads/:id (Mounted separately)
router.get('/standalone/:id', validate(getSquadParamsSchema), async (req: Request, res: Response) => {
  try {
    const squad = await squadService.getSquadById(req.params.id as string);
    res.json({ success: true, data: squad });
  } catch (error: unknown) {
    res.status(404).json({ success: false, message: (error as Error).message });
  }
});

export default router;
