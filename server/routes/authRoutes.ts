import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authService } from '../services/authService.ts';
import { validate } from '../middleware/validate.ts';
import { teacherRegisterSchema, teacherLoginSchema, squadLoginSchema } from '../schemas/auth.schema.ts';
import { checkTeacherPilotAccess, checkSquadPilotAccess } from '../middleware/pilotAuth.ts';
import { isPilotModeEnabled } from '../config/pilot.ts';

const router = Router();

// Rate limiter for teacher login: 15 attempts per 15 minutes per IP
const teacherLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
});

// Rate limiter for squad code login: 10 attempts per 15 minutes per IP
// More restrictive to prevent brute-force of 8-char codes
const squadJoinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Muitas tentativas de acesso. Tente novamente em 15 minutos.' },
});

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
router.post('/teacher/login', teacherLoginLimiter, validate(teacherLoginSchema), checkTeacherPilotAccess, async (req, res) => {
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
  if (isPilotModeEnabled()) {
    return res.status(423).json({
      success: false,
      message: 'Este piloto opera em modo controlado. Acesso por ID legado bloqueado. Use o código de acesso fornecido pelo professor.',
      code: 'SQUAD_ID_LOGIN_BLOCKED',
    });
  }

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
// Generic error message prevents code enumeration
router.post('/squad/login-by-code', squadJoinLimiter, async (req, res) => {
  try {
    const { accessCode } = req.body;
    if (!accessCode || typeof accessCode !== 'string' || accessCode.trim().length < 4) {
      // Generic error — don't reveal validation details
      res.status(401).json({ success: false, message: 'Código de acesso inválido ou bancada inativa.' });
      return;
    }

    const data = await authService.authenticateSquadByAccessCode(accessCode.trim().toUpperCase());
    res.json({ success: true, data });
  } catch (error: any) {
    // Always return generic message — prevent enumeration
    res.status(401).json({ success: false, message: 'Código de acesso inválido ou bancada inativa.' });
  }
});

export default router;

