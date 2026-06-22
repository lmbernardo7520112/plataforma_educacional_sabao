// server/routes/squadRoutes.ts

import { Router, Request, Response } from 'express';
import { squadService } from '../services/squadService.ts';
import { authService } from '../services/authService.ts';
import { requireAuth, requireRole } from '../middleware/auth.ts';
import { validate } from '../middleware/validate.ts';
import { createSquadSchema, getSquadParamsSchema, updateSquadSchema, deleteSquadParamsSchema } from '../schemas/squad.schema.ts';

const router = Router({ mergeParams: true });

// Note: This router is expected to be mounted at /api/classrooms/:classroomId/squads
// and also standalone at /api/squads

// GET /api/classrooms/:classroomId/squads
router.get('/', requireAuth, async (req: Request, res: Response) => {
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
    
    // Create
    const newSquad = await squadService.createSquad(classroomId as string, nome, members);
    
    // Auto Login (Emite o JWT imediato para quem acabou de criar a tela, evitando atrito)
    const tokenData = await authService.authenticateSquad(newSquad._id.toString());
    
    res.status(201).json({ success: true, data: newSquad, token: tokenData.token });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/classrooms/:classroomId/squads/:squadId
router.put('/:squadId', requireAuth, validate(updateSquadSchema), async (req: Request, res: Response) => {
  try {
    const { classroomId, squadId } = req.params;
    const user = (req as any).user;

    // Proteção de Pertencimento (SQUAD só edita a si mesmo, TEACHER edita tudo)
    if (user.role === 'SQUAD' && user.squadId !== squadId) {
      res.status(403).json({ success: false, message: 'Operação Sabotadora Bloqueada. Esquadrões não podem mutar elencos rivais.' });
      return;
    }

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
router.get('/standalone/:id', requireAuth, validate(getSquadParamsSchema), async (req: Request, res: Response) => {
  try {
    const squad = await squadService.getSquadById(req.params.id as string);
    res.json({ success: true, data: squad });
  } catch (error: unknown) {
    res.status(404).json({ success: false, message: (error as Error).message });
  }
});

export default router;
