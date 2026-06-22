// server/middleware/requestLogger.ts
// ============================================================================
// H3 — Minimal structured request logger with X-Request-Id
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import crypto from 'node:crypto';

/**
 * Attaches a unique X-Request-Id to every request and logs
 * method, path, status code, and duration on response finish.
 *
 * Does NOT log: passwords, JWT tokens, Authorization headers,
 * request bodies, or uploaded file contents.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  // Attach to request for downstream access
  (req as any).requestId = requestId;

  // Include in response header
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
      env: process.env.NODE_ENV || 'development',
    };

    // Use appropriate log level based on status code
    if (res.statusCode >= 500) {
      console.error('[REQ]', JSON.stringify(logEntry));
    } else if (res.statusCode >= 400) {
      console.warn('[REQ]', JSON.stringify(logEntry));
    } else {
      console.log('[REQ]', JSON.stringify(logEntry));
    }
  });

  next();
}
