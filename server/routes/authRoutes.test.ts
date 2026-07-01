// server/routes/authRoutes.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express, { Request, Response } from 'express';
import supertest from 'supertest';
import authRoutes from './authRoutes.ts';
import { authService } from '../services/authService.ts';
import * as pilotConfig from '../config/pilot.ts';

vi.mock('../services/authService.ts', () => ({
  authService: {
    authenticateSquad: vi.fn(),
    authenticateSquadByAccessCode: vi.fn(),
    authenticateTeacher: vi.fn(),
    createTeacher: vi.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Routes Integration - Student Access Hardening', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/squad/login', () => {
    it('should return 423 Locked when PILOT_MODE is active (legacy login by squadId blocked)', async () => {
      // Mock PILOT_MODE = true
      const isPilotSpy = vi.spyOn(pilotConfig, 'isPilotModeEnabled').mockReturnValue(true);
      process.env.PILOT_ALLOW_SQUAD_LOGIN = 'true';

      const response = await supertest(app)
        .post('/api/auth/squad/login')
        .send({ squadId: '60d5ec4931f6f52e2c56a3e2' });

      expect(response.status).toBe(423);
      expect(response.body.success).toBe(false);
      expect(response.body.code).toBe('SQUAD_ID_LOGIN_BLOCKED');
      expect(response.body.message).toContain('Acesso por ID legado bloqueado');
      expect(authService.authenticateSquad).not.toHaveBeenCalled();

      isPilotSpy.mockRestore();
    });

    it('should allow legacy squad login by squadId when PILOT_MODE is inactive', async () => {
      const isPilotSpy = vi.spyOn(pilotConfig, 'isPilotModeEnabled').mockReturnValue(false);
      vi.mocked(authService.authenticateSquad).mockResolvedValue({
        token: 'mock-squad-token',
        squad: { _id: '60d5ec4931f6f52e2c56a3e2', nome: 'Bancada Alfa' } as any
      });

      const response = await supertest(app)
        .post('/api/auth/squad/login')
        .send({ squadId: '60d5ec4931f6f52e2c56a3e2' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBe('mock-squad-token');
      expect(authService.authenticateSquad).toHaveBeenCalledWith('60d5ec4931f6f52e2c56a3e2');

      isPilotSpy.mockRestore();
    });
  });

  describe('POST /api/auth/squad/login-by-code', () => {
    it('should return token when accessCode is valid', async () => {
      vi.mocked(authService.authenticateSquadByAccessCode).mockResolvedValue({
        token: 'authenticated-squad-token',
        squad: { _id: 'squad-1', nome: 'Bancada Alfa', classroomId: 'class-1' } as any
      });

      const response = await supertest(app)
        .post('/api/auth/squad/login-by-code')
        .send({ accessCode: 'EEE8EF' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBe('authenticated-squad-token');
      expect(response.body.data.squad).toEqual({
        _id: 'squad-1',
        nome: 'Bancada Alfa',
        classroomId: 'class-1'
      });
      expect(authService.authenticateSquadByAccessCode).toHaveBeenCalledWith('EEE8EF');
    });

    it('should return 401 with generic message on invalid code length', async () => {
      const response = await supertest(app)
        .post('/api/auth/squad/login-by-code')
        .send({ accessCode: 'ABC' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Código de acesso inválido ou bancada inativa.');
      expect(authService.authenticateSquadByAccessCode).not.toHaveBeenCalled();
    });

    it('should return 401 with generic message on service validation failure (obscures db details)', async () => {
      vi.mocked(authService.authenticateSquadByAccessCode).mockRejectedValue(new Error('Internal DB failure'));

      const response = await supertest(app)
        .post('/api/auth/squad/login-by-code')
        .send({ accessCode: 'WRONGCODE' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Código de acesso inválido ou bancada inativa.');
    });
  });
});
