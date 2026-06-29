// server/routes/onboardingRoutes.ts

import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { Classroom } from '../models/Classroom.ts';
import { Squad } from '../models/Squad.ts';
import { classroomService } from '../services/classroomService.ts';
import { validate } from '../middleware/validate.ts';
import { classroomIdParamSchema } from '../schemas/common.schema.ts';
import { isPilotModeEnabled } from '../config/pilot.ts';

const router = Router();

// Rate limiter específico para Onboarding Público
const onboardingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50, // limite flexível, mas protetor (50 requests por IP a cada 15 min)
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Limite de requisições de Onboarding atingido. Tente novamente em 15 minutos.' }
});

router.use(onboardingLimiter);

// Lista de nomes de turmas autorizados no Piloto Restrito
export const PILOT_ALLOWED_CLASSROOM_NAMES = (process.env.PILOT_PUBLIC_CLASSROOM_NAMES || '3ºANO A,3ºANO B')
  .split(',')
  .map(name => name.trim())
  .filter(Boolean);

/**
 * Handler: GET /api/onboarding/classrooms
 */
export const handleGetClassrooms = async (_req: Request, res: Response) => {
  try {
    const isPilot = isPilotModeEnabled();
    const query: Record<string, any> = { ativo: true };

    if (isPilot) {
      query.nome = { $in: PILOT_ALLOWED_CLASSROOM_NAMES };
    }

    const list = await Classroom.find(query)
      .select('_id nome ano')
      .limit(20)
      .sort({ nome: 1 })
      .lean();

    const publicClassroomsDTO = list.map((c: any) => ({
      _id: c._id.toString(),
      nome: c.nome,
      ano: c.ano
    }));

    res.json({ success: true, data: publicClassroomsDTO });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: 'Falha no motor de turmas públicas.' });
  }
};

/**
 * Handler: GET /api/onboarding/classrooms/:id
 */
export const handleGetClassroomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const classroom = await Classroom.findById(id).select('_id nome ano ativo').lean();

    if (!classroom || !classroom.ativo) {
      return res.status(404).json({ success: false, message: 'Turma não encontrada.' });
    }

    // Validação adicional de escopo piloto
    if (isPilotModeEnabled() && !PILOT_ALLOWED_CLASSROOM_NAMES.includes(classroom.nome)) {
      return res.status(403).json({ success: false, message: 'Acesso restrito ao piloto autorizado.' });
    }

    // Invoca service para carregar estudantes sintéticos originais
    const fullDetails = await classroomService.getClassroomWithStudents(id);

    // Mapeia para DTO de Onboarding Mínimo
    const classroomDetailsDTO = {
      _id: classroom._id.toString(),
      nome: classroom.nome,
      ano: classroom.ano,
      alunosOriginal: (fullDetails.alunosOriginal || []).map((aluno: any) => ({
        numero: String(aluno.numero),
        nome: String(aluno.nome)
      }))
    };

    res.json({ success: true, data: classroomDetailsDTO });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: 'Erro no carregamento dos estudantes sintéticos.' });
  }
};

/**
 * Handler: GET /api/onboarding/classrooms/:classroomId/squads
 */
export const handleGetSquads = async (req: Request, res: Response) => {
  try {
    const { classroomId } = req.params;
    
    const list = await Squad.find({ classroomId, ativo: true })
      .select('_id nome classroomId members')
      .limit(50)
      .sort({ nome: 1 })
      .lean();

    const publicSquadsDTO = list.map(s => ({
      _id: s._id.toString(),
      nome: s.nome,
      classroomId: s.classroomId.toString(),
      members: s.members || []
    }));

    res.json({ success: true, data: publicSquadsDTO });
  } catch (error: unknown) {
    res.status(500).json({ success: false, message: 'Erro ao catalogar diários da turma.' });
  }
};

// Declaração de rotas associando aos handlers
router.get('/classrooms', handleGetClassrooms);
router.get('/classrooms/:id', validate(classroomIdParamSchema), handleGetClassroomById);
router.get('/classrooms/:classroomId/squads', handleGetSquads);

export default router;
