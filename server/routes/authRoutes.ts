import { Router } from 'express';
import { authService } from '../services/authService.ts';

const router = Router();

// Endpoint Administrativo - Instalação da Escola
router.post('/teacher/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Campos Acadêmicos Insuficientes.' });
      return;
    }
    const data = await authService.createTeacher(name, email, password);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Endpoint Administrativo - Acesso Professor
router.post('/teacher/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Credenciais Omitidas.' });
      return;
    }
    const data = await authService.authenticateTeacher(email, password);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Endpoint Estudantil - Login da Bancada
router.post('/squad/login', async (req, res) => {
  try {
    const { squadId } = req.body;
    if (!squadId) {
      res.status(400).json({ success: false, message: 'Catraca bloqueada: Identificador Ausente.' });
      return;
    }
    
    // Devolve o token provisório de Sessão Aluno
    const data = await authService.authenticateSquad(squadId);
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

export default router;
