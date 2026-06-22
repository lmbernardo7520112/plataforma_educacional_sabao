// server/middleware/errorHandler.test.ts

import { describe, it, expect, vi } from 'vitest';
import { errorHandler } from './errorHandler.ts';
import { ZodError, ZodIssue } from 'zod';
import { Request, Response, NextFunction } from 'express';

function createMockReqRes() {
  const req = { requestId: 'test-req-id-123' } as any as Request;
  let statusCode = 0;
  let responseBody: any = null;

  const res = {
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (body: any) => {
      responseBody = body;
    },
  } as any as Response;

  const next = vi.fn() as unknown as NextFunction;

  return { req, res, next, getStatus: () => statusCode, getBody: () => responseBody };
}

describe('errorHandler middleware', () => {
  it('should handle ZodError with 400 and structured response', () => {
    const { req, res, next, getStatus, getBody } = createMockReqRes();
    const issues: ZodIssue[] = [
      { code: 'invalid_type', expected: 'string', received: 'undefined', path: ['body', 'email'], message: 'Required' },
    ];
    const zodErr = new ZodError(issues);

    errorHandler(zodErr, req, res, next);

    expect(getStatus()).toBe(400);
    expect(getBody().error.code).toBe('VALIDATION_ERROR');
    expect(getBody().error.requestId).toBe('test-req-id-123');
    expect(getBody().error.details).toHaveLength(1);
    expect(getBody().error.details[0].field).toBe('body.email');
  });

  it('should handle CORS errors with 403', () => {
    const { req, res, next, getStatus, getBody } = createMockReqRes();
    const corsErr = new Error('CORS: Origin http://evil.com not allowed.');

    errorHandler(corsErr, req, res, next);

    expect(getStatus()).toBe(403);
    expect(getBody().error.code).toBe('FORBIDDEN');
  });

  it('should handle multer file size errors with 413', () => {
    const { req, res, next, getStatus, getBody } = createMockReqRes();
    const multerErr = new Error('File too large');

    errorHandler(multerErr, req, res, next);

    expect(getStatus()).toBe(413);
    expect(getBody().error.code).toBe('VALIDATION_ERROR');
  });

  it('should handle generic errors with 500', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { req, res, next, getStatus, getBody } = createMockReqRes();
    const genericErr = new Error('Something went wrong');

    errorHandler(genericErr, req, res, next);

    expect(getStatus()).toBe(500);
    expect(getBody().error.code).toBe('INTERNAL_ERROR');
    expect(getBody().error.requestId).toBe('test-req-id-123');
    vi.restoreAllMocks();
  });
});
