// server/middleware/errorHandler.ts
// ============================================================================
// H3 — Standardized error response handler
// ============================================================================

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

/**
 * Error codes used across the API.
 */
export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_REQUIRED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

interface ApiErrorResponse {
  error: {
    code: ApiErrorCode;
    message: string;
    requestId?: string;
    details?: Array<{ field: string; message: string }>;
  };
}

/**
 * Central error handler middleware.
 * Must be registered AFTER all routes.
 *
 * Handles:
 * - ZodError → 400 VALIDATION_ERROR
 * - CORS errors → 403 FORBIDDEN
 * - Generic errors → 500 INTERNAL_ERROR
 *
 * Stack traces are only logged server-side, never sent to client.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const requestId = (req as any).requestId;

  // --- Zod validation errors ---
  if (err instanceof ZodError) {
    const response: ApiErrorResponse = {
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Erro de validação de dados',
        requestId,
        details: err.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
    };
    res.status(400).json(response);
    return;
  }

  // --- CORS errors ---
  if (err.message && err.message.startsWith('CORS:')) {
    const response: ApiErrorResponse = {
      error: {
        code: 'FORBIDDEN',
        message: err.message,
        requestId,
      },
    };
    res.status(403).json(response);
    return;
  }

  // --- Multer file size errors ---
  if (err.message && err.message.includes('File too large')) {
    const response: ApiErrorResponse = {
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Arquivo excede o tamanho máximo permitido (5MB).',
        requestId,
      },
    };
    res.status(413).json(response);
    return;
  }

  // --- Generic / unexpected errors ---
  // Log full stack server-side, return clean response to client
  console.error(`💥 [${requestId}] Application error: ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  const response: ApiErrorResponse = {
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'Erro interno do servidor.'
        : err.message,
      requestId,
    },
  };
  res.status(500).json(response);
}
