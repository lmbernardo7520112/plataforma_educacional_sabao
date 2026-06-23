// server/middleware/auth.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { requireAuth, requireRole, requireSquadOwnership, DecodedToken } from './auth.ts';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const TEST_SECRET = 'test-secret-h4';

// Mock env
beforeEach(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

function createMockReqRes(overrides: Record<string, unknown> = {}) {
  let statusCode = 0;
  let responseBody: unknown = null;

  const req = {
    headers: {},
    params: {},
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

  const next = vi.fn() as unknown as NextFunction;

  return { req, res, next, getStatus: () => statusCode, getBody: () => responseBody as Record<string, unknown> };
}

function makeToken(payload: Partial<DecodedToken>): string {
  return jwt.sign(payload, TEST_SECRET, { expiresIn: '1h' });
}

describe('requireAuth', () => {
  it('should return 401 without Authorization header', () => {
    const { req, res, next, getStatus, getBody } = createMockReqRes();
    requireAuth(req, res, next);
    expect(getStatus()).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 with invalid token', () => {
    const { req, res, next, getStatus } = createMockReqRes({
      headers: { authorization: 'Bearer invalid-token-xyz' },
    });
    requireAuth(req, res, next);
    expect(getStatus()).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() with valid token', () => {
    const token = makeToken({ id: 'teacher-1', role: 'TEACHER' });
    const { req, res, next } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
    });
    requireAuth(req, res, next);
    expect(next).toHaveBeenCalledOnce();
    expect((req as unknown as { user: DecodedToken }).user.role).toBe('TEACHER');
  });
});

describe('requireRole', () => {
  it('should return 403 for wrong role', () => {
    const token = makeToken({ squadId: 'squad-1', role: 'SQUAD' });
    const { req, res, next, getStatus } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
    });
    // Simulate requireAuth first
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    // Now test requireRole
    const middleware = requireRole(['TEACHER']);
    middleware(req, res, next);
    expect(getStatus()).toBe(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() for correct role', () => {
    const token = makeToken({ id: 'teacher-1', role: 'TEACHER' });
    const { req, res, next } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
    });
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    const middleware = requireRole(['TEACHER']);
    middleware(req, res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it('should return 403 without user on request', () => {
    const { req, res, next, getStatus } = createMockReqRes();
    const middleware = requireRole(['TEACHER']);
    middleware(req, res, next);
    expect(getStatus()).toBe(403);
  });
});

describe('requireSquadOwnership', () => {
  it('should allow teacher to access any squad', () => {
    const token = makeToken({ id: 'teacher-1', role: 'TEACHER' });
    const { req, res, next } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
      params: { squadId: 'any-squad-id' },
    });
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    requireSquadOwnership(req, res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it('should allow squad to access its own resources', () => {
    const token = makeToken({ squadId: 'squad-abc', classroomId: 'classroom-1', role: 'SQUAD' });
    const { req, res, next } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
      params: { squadId: 'squad-abc' },
    });
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    requireSquadOwnership(req, res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it('should deny squad from accessing another squad resources', () => {
    const token = makeToken({ squadId: 'squad-abc', classroomId: 'classroom-1', role: 'SQUAD' });
    const { req, res, next, getStatus, getBody } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
      params: { squadId: 'squad-xyz' },
    });
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    requireSquadOwnership(req, res, next);
    expect(getStatus()).toBe(403);
    expect(getBody()).toHaveProperty('error');
    expect((getBody().error as Record<string, unknown>).code).toBe('FORBIDDEN');
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 without authenticated user', () => {
    const { req, res, next, getStatus } = createMockReqRes({
      params: { squadId: 'squad-abc' },
    });
    requireSquadOwnership(req, res, next);
    expect(getStatus()).toBe(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should work with standalone route param (id instead of squadId)', () => {
    const token = makeToken({ squadId: 'squad-abc', classroomId: 'classroom-1', role: 'SQUAD' });
    const { req, res, next } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
      params: { id: 'squad-abc' },
    });
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    requireSquadOwnership(req, res, next);
    expect(next).toHaveBeenCalledOnce();
  });

  it('should deny squad with standalone id mismatch', () => {
    const token = makeToken({ squadId: 'squad-abc', classroomId: 'classroom-1', role: 'SQUAD' });
    const { req, res, next, getStatus } = createMockReqRes({
      headers: { authorization: `Bearer ${token}` },
      params: { id: 'squad-other' },
    });
    requireAuth(req, res, vi.fn() as unknown as NextFunction);
    requireSquadOwnership(req, res, next);
    expect(getStatus()).toBe(403);
  });
});
