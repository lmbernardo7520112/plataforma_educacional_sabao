// server/middleware/pilotAuth.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkTeacherPilotAccess, checkSquadPilotAccess } from './pilotAuth.ts';
import { Request, Response, NextFunction } from 'express';

function createMockReqRes(body: Record<string, unknown> = {}) {
  let statusCode = 0;
  let responseBody: unknown = null;

  const req = {
    body,
    headers: {},
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

  const next = vi.fn() as unknown as NextFunction;

  return {
    req,
    res,
    next,
    getStatus: () => statusCode,
    getBody: () => responseBody as Record<string, unknown>,
  };
}

describe('Pilot Access Middlewares', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('checkTeacherPilotAccess', () => {
    it('should call next() if PILOT_MODE is disabled', () => {
      process.env.PILOT_MODE = 'false';
      const { req, res, next, getStatus } = createMockReqRes({ email: 'random@example.com' });
      
      checkTeacherPilotAccess(req, res, next);
      
      expect(next).toHaveBeenCalledOnce();
      expect(getStatus()).toBe(0);
    });

    it('should call next() if PILOT_MODE is enabled and email is in allowlist', () => {
      process.env.PILOT_MODE = 'true';
      process.env.PILOT_ALLOWED_TEACHER_EMAILS = 'leonardo@example.com,nadja@example.com';
      const { req, res, next, getStatus } = createMockReqRes({ email: 'LEONARDO@example.com' });
      
      checkTeacherPilotAccess(req, res, next);
      
      expect(next).toHaveBeenCalledOnce();
      expect(getStatus()).toBe(0);
    });

    it('should return 403 if PILOT_MODE is enabled and email is not in allowlist', () => {
      process.env.PILOT_MODE = 'true';
      process.env.PILOT_ALLOWED_TEACHER_EMAILS = 'leonardo@example.com,nadja@example.com';
      const { req, res, next, getStatus, getBody } = createMockReqRes({ email: 'intruder@example.com' });
      
      checkTeacherPilotAccess(req, res, next);
      
      expect(next).not.toHaveBeenCalled();
      expect(getStatus()).toBe(403);
      expect(getBody().success).toBe(false);
      expect(getBody().message).toBe('Acesso restrito ao piloto autorizado.');
    });

    it('should return 403 if email is missing in request body under pilot mode', () => {
      process.env.PILOT_MODE = 'true';
      process.env.PILOT_ALLOWED_TEACHER_EMAILS = 'leonardo@example.com';
      const { req, res, next, getStatus } = createMockReqRes({});
      
      checkTeacherPilotAccess(req, res, next);
      
      expect(next).not.toHaveBeenCalled();
      expect(getStatus()).toBe(403);
    });
  });

  describe('checkSquadPilotAccess', () => {
    it('should call next() if PILOT_MODE is disabled', () => {
      process.env.PILOT_MODE = 'false';
      const { req, res, next, getStatus } = createMockReqRes({ squadId: 'squad-1' });
      
      checkSquadPilotAccess(req, res, next);
      
      expect(next).toHaveBeenCalledOnce();
      expect(getStatus()).toBe(0);
    });

    it('should return 403 if PILOT_MODE is enabled and squad login is not allowed', () => {
      process.env.PILOT_MODE = 'true';
      delete process.env.PILOT_ALLOW_SQUAD_LOGIN;
      const { req, res, next, getStatus, getBody } = createMockReqRes({ squadId: 'squad-1' });
      
      checkSquadPilotAccess(req, res, next);
      
      expect(next).not.toHaveBeenCalled();
      expect(getStatus()).toBe(403);
      expect(getBody().success).toBe(false);
      expect(getBody().message).toBe('Acesso restrito ao piloto autorizado.');
    });

    it('should call next() if PILOT_MODE is enabled and squad login is explicitly allowed', () => {
      process.env.PILOT_MODE = 'true';
      process.env.PILOT_ALLOW_SQUAD_LOGIN = 'true';
      const { req, res, next, getStatus } = createMockReqRes({ squadId: 'squad-1' });
      
      checkSquadPilotAccess(req, res, next);
      
      expect(next).toHaveBeenCalledOnce();
      expect(getStatus()).toBe(0);
    });
  });
});
