// server/routes/squadRoutes.ts

import { Router, Request, Response } from 'express';
import { squadService } from '../services/squadService.ts';
import { authService } from '../services/authService.ts';
import { requireAuth, requireRole, requireSquadOwnership } from '../middleware/auth.ts';
import { validate } from '../middleware/validate.ts';
import { createSquadSchema, getSquadParamsSchema, updateSquadSchema, deleteSquadParamsSchema } from '../schemas/squad.schema.ts';
import { classroomIdFromParentSchema } from '../schemas/common.schema.ts';

const router = Router({ mergeParams: true });

// Note: This router is expected to be mounted at /api/classrooms/:classroomId/squads
// and also standalone at /api/squads

// GET /api/classrooms/:classroomId/squads
router.get('/', requireAuth, requireRole(['TEACHER']), validate(classroomIdFromParentSchema), async (req: Request, res: Response) => {
  try {
    const { classroomId } = req.params;
    const list = await squadService.getSquadsByClassroom(classroomId as string);
    res.json({ success: true, data: list });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

// POST /api/classrooms/:classroomId/squads — TEACHER ONLY
router.post('/', requireAuth, requireRole(['TEACHER']), validate(createSquadSchema), async (req: Request, res: Response) => {
  try {
    const { classroomId } = req.params;
    const { nome, members } = req.body;
    const teacherId = (req as any).user?.id;
    
    // Create with teacher traceability + access code
    const { squad: newSquad, accessCode } = await squadService.createSquad(
      classroomId as string, nome, members, teacherId
    );
    
    res.status(201).json({ success: true, data: newSquad, accessCode });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/classrooms/:classroomId/squads/:squadId
router.put('/:squadId', requireAuth, requireRole(['TEACHER']), validate(updateSquadSchema), async (req: Request, res: Response) => {
  try {
    const { classroomId, squadId } = req.params;

    const { nome, members } = req.body;
    const updatedSquad = await squadService.updateSquad(classroomId as string, squadId as string, nome, members);
    
    res.json({ success: true, data: updatedSquad });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/classrooms/:classroomId/squads/:squadId
router.delete('/:squadId', requireAuth, requireRole(['TEACHER']), validate(deleteSquadParamsSchema), async (req: Request, res: Response) => {
  try {
    const { classroomId, squadId } = req.params;
    await squadService.deleteSquad(classroomId as string, squadId as string);
    res.json({ success: true, message: 'Bancada e Histórico Biográfico apagados com sucesso de Mongoose.' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/squads/:id (Mounted separately)
router.get('/standalone/:id', requireAuth, requireSquadOwnership, validate(getSquadParamsSchema), async (req: Request, res: Response) => {
  try {
    const squad = await squadService.getSquadById(req.params.id as string);
    res.json({ success: true, data: squad });
  } catch (error: unknown) {
    res.status(404).json({ success: false, message: (error as Error).message });
  }
});

export default router;
