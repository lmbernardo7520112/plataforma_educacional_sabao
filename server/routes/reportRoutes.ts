import { Router, Request, Response } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.ts';
import { reportService } from '../services/reportService.ts';
import { validate } from '../middleware/validate.ts';
import { squadIdParamSchema } from '../schemas/common.schema.ts';

const router = Router();

// Extração do Dossiê Acadêmico Unificado
router.get('/squads/:squadId', requireAuth, requireRole(['TEACHER']), validate(squadIdParamSchema), async (req: Request, res: Response) => {
  try {
    const squadId = req.params.squadId as string;
    const userRole = (req as any).user.role;
    const tokenSquadId = (req as any).user.squadId;

    // Proteção de Sigilo Confidencial (Evita Cola/Plágio entre bancadas concorrentes)
    if (userRole === 'SQUAD' && tokenSquadId !== squadId) {
       res.status(403).json({ 
         success: false, 
         message: 'Violação Acadêmica. Você não possui as Cátedras de Professor para visualizar um Extrato de uma banca alheia.' 
       });
       return;
    }

    const data = await reportService.getSquadDossier(squadId);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
