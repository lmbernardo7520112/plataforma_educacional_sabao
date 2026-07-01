// server/middleware/pilotReadonly.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Mock pilot config
vi.mock('../config/pilot.ts', () => ({
  isPilotPublicReadonly: vi.fn(),
  isPilotSquadLoginAllowed: vi.fn(),
}));

import { blockAnonymousMutationsInPilot } from './pilotReadonly.js';
import { isPilotPublicReadonly, isPilotSquadLoginAllowed } from '../config/pilot.js';

const mockIsPilotPublicReadonly = vi.mocked(isPilotPublicReadonly);
const mockIsPilotSquadLoginAllowed = vi.mocked(isPilotSquadLoginAllowed);

function createMockReqRes(method: string, path: string, authHeader?: string) {
  const req = {
    method,
    path,
    headers: {} as Record<string, string>,
  } as unknown as Request;
  
  if (authHeader) {
    req.headers.authorization = authHeader;
  }
  
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;
  
  const next = vi.fn() as NextFunction;
  
  return { req, res, next };
}

describe('blockAnonymousMutationsInPilot', () => {
  const originalEnv = { ...process.env };
  
  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.JWT_SECRET = 'test-secret-for-pilot-readonly';
  });
  
  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('should call next() when pilot readonly is disabled', () => {
    mockIsPilotPublicReadonly.mockReturnValue(false);
    const { req, res, next } = createMockReqRes('POST', '/api/classrooms/123/squads');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should allow GET requests without JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('GET', '/api/onboarding/classrooms');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should allow HEAD requests without JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('HEAD', '/api/onboarding/classrooms');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should allow teacher login POST without JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('POST', '/api/auth/teacher/login');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should allow teacher register POST without JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('POST', '/api/auth/teacher/register');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should allow squad login POST when squad login is enabled', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    mockIsPilotSquadLoginAllowed.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('POST', '/api/auth/squad/login');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should allow squad login-by-code POST when squad login is enabled', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    mockIsPilotSquadLoginAllowed.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('POST', '/api/auth/squad/login-by-code');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should block squad login POST when squad login is disabled', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    mockIsPilotSquadLoginAllowed.mockReturnValue(false);
    const { req, res, next } = createMockReqRes('POST', '/api/auth/squad/login');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(423);
  });

  it('should allow POST with valid JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const token = jwt.sign({ id: '123', role: 'TEACHER' }, 'test-secret-for-pilot-readonly');
    const { req, res, next } = createMockReqRes('POST', '/api/classrooms/123/squads', `Bearer ${token}`);
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).toHaveBeenCalled();
  });

  it('should block POST without JWT (anonymous visitor)', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('POST', '/api/classrooms/123/squads');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(423);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      code: 'PILOT_READONLY',
    }));
  });

  it('should block PUT without JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('PUT', '/api/classrooms/123/squads/456');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(423);
  });

  it('should block DELETE without JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('DELETE', '/api/classrooms/123/squads/456');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(423);
  });

  it('should block POST with invalid/expired JWT', () => {
    mockIsPilotPublicReadonly.mockReturnValue(true);
    const { req, res, next } = createMockReqRes('POST', '/api/classrooms/123/squads', 'Bearer invalid-token');
    
    blockAnonymousMutationsInPilot(req, res, next);
    
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(423);
  });
});
