import { Router } from 'express';
import { authService } from '../services/authService.ts';
import { validate } from '../middleware/validate.ts';
import { teacherRegisterSchema, teacherLoginSchema, squadLoginSchema } from '../schemas/auth.schema.ts';
import { checkTeacherPilotAccess, checkSquadPilotAccess } from '../middleware/pilotAuth.ts';

const router = Router();

// Endpoint Administrativo - Instalação da Escola
router.post('/teacher/register', validate(teacherRegisterSchema), checkTeacherPilotAccess, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await authService.createTeacher(name, email, password);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Endpoint Administrativo - Acesso Professor
router.post('/teacher/login', validate(teacherLoginSchema), checkTeacherPilotAccess, async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.authenticateTeacher(email, password);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Endpoint Estudantil - Login da Bancada (legado por ID)
router.post('/squad/login', validate(squadLoginSchema), checkSquadPilotAccess, async (req, res) => {
  try {
    const { squadId } = req.body;
    
    // Devolve o token provisório de Sessão Aluno
    const data = await authService.authenticateSquad(squadId);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Endpoint Estudantil - Login por Código de Acesso (piloto controlado)
router.post('/squad/login-by-code', async (req, res) => {
  try {
    const { accessCode } = req.body;
    if (!accessCode || typeof accessCode !== 'string' || accessCode.trim().length < 4) {
      res.status(400).json({ success: false, message: 'Código de acesso inválido.' });
      return;
    }

    const data = await authService.authenticateSquadByAccessCode(accessCode.trim().toUpperCase());
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

export default router;
