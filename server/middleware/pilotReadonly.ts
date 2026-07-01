// server/middleware/pilotReadonly.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isPilotPublicReadonly, isPilotSquadLoginAllowed } from '../config/pilot.ts';

/**
 * Middleware that blocks anonymous (unauthenticated) write operations
 * (POST, PUT, PATCH, DELETE) when PILOT_PUBLIC_READONLY is active.
 *
 * Whitelisted paths (login endpoints) are always allowed.
 * Requests with a valid JWT pass through — downstream middlewares
 * (requireAuth, requireRole, requireSquadOwnership) enforce scoping.
 */
export function blockAnonymousMutationsInPilot(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!isPilotPublicReadonly()) {
    next();
    return;
  }

  // Read-only methods are always allowed
  const readOnlyMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (readOnlyMethods.includes(req.method)) {
    next();
    return;
  }

  // Whitelist: teacher login and register are always allowed
  if (req.path === '/api/auth/teacher/login' || req.path === '/api/auth/teacher/register') {
    next();
    return;
  }

  // Whitelist: squad login endpoints allowed if flag permits
  const squadLoginPaths = ['/api/auth/squad/login', '/api/auth/squad/login-by-code'];
  if (squadLoginPaths.includes(req.path) && isPilotSquadLoginAllowed()) {
    next();
    return;
  }

  // If request has a valid JWT, allow it through (downstream guards enforce scoping)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        jwt.verify(token, secret);
        next();
        return;
      }
    } catch {
      // Token invalid or expired — fall through to block
    }
  }

  // Block: anonymous mutation in pilot readonly mode
  res.status(423).json({
    success: false,
    message: 'Este piloto opera em modo controlado. Acesso de escrita requer autorização do professor.',
    code: 'PILOT_READONLY',
  });
}
