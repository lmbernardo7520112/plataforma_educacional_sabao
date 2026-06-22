// server/middleware/requestLogger.test.ts

import { describe, it, expect, vi } from 'vitest';
import { requestLogger } from './requestLogger.ts';
import { Request, Response, NextFunction } from 'express';

function createMockReqRes() {
  const finishCallbacks: Function[] = [];
  const req = {
    method: 'GET',
    originalUrl: '/api/test',
  } as any as Request;

  const headers: Record<string, string> = {};
  const res = {
    statusCode: 200,
    setHeader: (key: string, value: string) => { headers[key] = value; },
    on: (event: string, cb: Function) => {
      if (event === 'finish') finishCallbacks.push(cb);
    },
  } as any as Response;

  const next = vi.fn() as unknown as NextFunction;

  return { req, res, next, headers, finishCallbacks };
}

describe('requestLogger middleware', () => {
  it('should attach X-Request-Id header', () => {
    const { req, res, next, headers } = createMockReqRes();
    requestLogger(req, res, next);

    expect(headers['X-Request-Id']).toBeDefined();
    expect(headers['X-Request-Id']).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it('should attach requestId to req object', () => {
    const { req, res, next } = createMockReqRes();
    requestLogger(req, res, next);

    expect((req as any).requestId).toBeDefined();
    expect(typeof (req as any).requestId).toBe('string');
  });

  it('should call next()', () => {
    const { req, res, next } = createMockReqRes();
    requestLogger(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('should log on response finish', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { req, res, next, finishCallbacks } = createMockReqRes();
    requestLogger(req, res, next);

    // Simulate response finish
    finishCallbacks.forEach(cb => cb());

    expect(consoleSpy).toHaveBeenCalledOnce();
    const logArg = consoleSpy.mock.calls[0][1];
    const parsed = JSON.parse(logArg);
    expect(parsed).toHaveProperty('requestId');
    expect(parsed).toHaveProperty('method', 'GET');
    expect(parsed).toHaveProperty('path', '/api/test');
    expect(parsed).toHaveProperty('status', 200);
    expect(parsed).toHaveProperty('durationMs');
    expect(parsed).toHaveProperty('timestamp');

    consoleSpy.mockRestore();
  });

  it('should use console.error for 5xx status codes', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { req, res, next, finishCallbacks } = createMockReqRes();
    (res as any).statusCode = 500;
    requestLogger(req, res, next);

    finishCallbacks.forEach(cb => cb());

    expect(errorSpy).toHaveBeenCalledOnce();
    errorSpy.mockRestore();
  });

  it('should use console.warn for 4xx status codes', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { req, res, next, finishCallbacks } = createMockReqRes();
    (res as any).statusCode = 404;
    requestLogger(req, res, next);

    finishCallbacks.forEach(cb => cb());

    expect(warnSpy).toHaveBeenCalledOnce();
    warnSpy.mockRestore();
  });
});
