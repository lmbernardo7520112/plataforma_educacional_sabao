// server/routes/onboardingRoutes.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleGetClassrooms, handleGetClassroomById, handleGetSquads, PILOT_ALLOWED_CLASSROOM_NAMES } from './onboardingRoutes.ts';
import { Request, Response } from 'express';
import { Classroom } from '../models/Classroom.ts';
import { Squad } from '../models/Squad.ts';
import { classroomService } from '../services/classroomService.ts';
import * as pilotConfig from '../config/pilot.ts';

// Mock Models
vi.mock('../models/Classroom.ts', () => ({
  Classroom: {
    find: vi.fn(),
    findById: vi.fn(),
  }
}));

vi.mock('../models/Squad.ts', () => ({
  Squad: {
    find: vi.fn(),
  }
}));

vi.mock('../services/classroomService.ts', () => ({
  classroomService: {
    getClassroomWithStudents: vi.fn(),
  }
}));

function createMockReqRes(overrides: Record<string, unknown> = {}) {
  let statusCode = 200;
  let responseBody: unknown = null;

  const req = {
    params: {},
    query: {},
    headers: {},
    ...overrides,
  } as unknown as Request;

  const res = {
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (body: unknown) => {
      responseBody = body;
      return res;
    },
  } as unknown as Response;

  return { req, res, getStatus: () => statusCode, getBody: () => responseBody as Record<string, any> };
}

describe('Onboarding Public Hardening Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleGetClassrooms', () => {
    it('should return DTO classrooms list and filter pilot names if pilot mode is active', async () => {
      // Mock Pilot Mode to true
      const isPilotSpy = vi.spyOn(pilotConfig, 'isPilotModeEnabled').mockReturnValue(true);

      const mockQueryChain = {
        select: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([
          { _id: 'id-1', nome: '3ºANO A', ano: 2026, ativo: true, __v: 0, criadoEm: 'date-leak' },
          { _id: 'id-2', nome: '3ºANO B', ano: 2026, ativo: true, __v: 0 }
        ])
      };

      vi.mocked(Classroom.find).mockReturnValue(mockQueryChain as any);

      const { req, res, getStatus, getBody } = createMockReqRes();

      await handleGetClassrooms(req, res);

      expect(getStatus()).toBe(200);
      expect(getBody().success).toBe(true);
      expect(getBody().data).toHaveLength(2);
      
      // Valida DTO fields:
      const firstClassroom = getBody().data[0];
      expect(firstClassroom).toHaveProperty('_id');
      expect(firstClassroom).toHaveProperty('nome');
      expect(firstClassroom).toHaveProperty('ano');
      
      // Proibidos de vazar:
      expect(firstClassroom).not.toHaveProperty('__v');
      expect(firstClassroom).not.toHaveProperty('criadoEm');
      expect(firstClassroom).not.toHaveProperty('ativo');

      // Verifica chamada find contendo a filtragem do piloto
      expect(Classroom.find).toHaveBeenCalledWith({
        ativo: true,
        nome: { $in: PILOT_ALLOWED_CLASSROOM_NAMES }
      });

      isPilotSpy.mockRestore();
    });
  });

  describe('handleGetClassroomById', () => {
    it('should return public DTO details without exposing internal timestamps or whole teacher object', async () => {
      const isPilotSpy = vi.spyOn(pilotConfig, 'isPilotModeEnabled').mockReturnValue(true);

      const mockClassroom = {
        _id: 'class-1',
        nome: '3ºANO A',
        ano: 2026,
        ativo: true,
        criadoEm: 'leak',
        updatedAt: 'leak'
      };

      const mockQueryChain = {
        select: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(mockClassroom)
      };

      vi.mocked(Classroom.findById).mockReturnValue(mockQueryChain as any);
      vi.mocked(classroomService.getClassroomWithStudents).mockResolvedValue({
        alunosOriginal: [
          { numero: '01', nome: 'Estudante Mock 1', internalMeta: 'leak' }
        ]
      });

      const { req, res, getStatus, getBody } = createMockReqRes({
        params: { id: 'class-1' }
      });

      await handleGetClassroomById(req, res);

      expect(getStatus()).toBe(200);
      expect(getBody().data).toHaveProperty('_id', 'class-1');
      expect(getBody().data).toHaveProperty('nome', '3ºANO A');
      expect(getBody().data).toHaveProperty('ano', 2026);
      
      // Nomes de estudantes originais permitidos no onboarding:
      expect(getBody().data).toHaveProperty('alunosOriginal');
      expect(getBody().data.alunosOriginal[0]).toEqual({
        numero: '01',
        nome: 'Estudante Mock 1'
      });
      expect(getBody().data.alunosOriginal[0]).not.toHaveProperty('internalMeta');

      // Proibidos de vazar no DTO geral da Classroom:
      expect(getBody().data).not.toHaveProperty('criadoEm');
      expect(getBody().data).not.toHaveProperty('updatedAt');

      isPilotSpy.mockRestore();
    });

    it('should return 403 if PILOT_MODE is enabled and classroom name is not allowed', async () => {
      const isPilotSpy = vi.spyOn(pilotConfig, 'isPilotModeEnabled').mockReturnValue(true);

      const mockClassroom = {
        _id: 'class-unauthorized',
        nome: 'Outra Turma Qualquer',
        ano: 2026,
        ativo: true
      };

      const mockQueryChain = {
        select: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(mockClassroom)
      };

      vi.mocked(Classroom.findById).mockReturnValue(mockQueryChain as any);

      const { req, res, getStatus, getBody } = createMockReqRes({
        params: { id: 'class-unauthorized' }
      });

      await handleGetClassroomById(req, res);

      expect(getStatus()).toBe(403);
      expect(getBody().success).toBe(false);
      expect(getBody().message).toBe('Acesso restrito ao piloto autorizado.');

      isPilotSpy.mockRestore();
    });
  });

  describe('handleGetSquads', () => {
    it('should return only PublicSquadDTO fields', async () => {
      const mockQueryChain = {
        select: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([
          {
            _id: 'squad-1',
            nome: 'Bancada Alfa',
            classroomId: 'class-1',
            members: ['Estudante 1', 'Estudante 2'],
            journeyState: { currentMission: 5, secretMeta: 'leak' },
            createdAt: 'leak'
          }
        ])
      };

      vi.mocked(Squad.find).mockReturnValue(mockQueryChain as any);

      const { req, res, getStatus, getBody } = createMockReqRes({
        params: { classroomId: 'class-1' }
      });

      await handleGetSquads(req, res);

      expect(getStatus()).toBe(200);
      expect(getBody().success).toBe(true);
      expect(getBody().data).toHaveLength(1);
      
      const squadResult = getBody().data[0];
      expect(squadResult).toEqual({
        _id: 'squad-1',
        nome: 'Bancada Alfa',
        classroomId: 'class-1',
        members: ['Estudante 1', 'Estudante 2']
      });

      // Proibidos de vazar na listagem pública:
      expect(squadResult).not.toHaveProperty('journeyState');
      expect(squadResult).not.toHaveProperty('createdAt');
    });
  });
});
