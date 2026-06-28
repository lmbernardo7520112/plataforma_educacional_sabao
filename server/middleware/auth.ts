import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTeacherAllowedInPilot } from '../config/pilot.ts';

// JWT_SECRET is validated at server startup (server.ts).
// This getter provides a fail-safe in case the middleware is loaded in isolation.
function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required but not set.');
  }
  return secret;
}

export interface DecodedToken {
  id?: string;
  email?: string;
  squadId?: string;
  classroomId?: string;
  role: 'TEACHER' | 'SQUAD';
  iat?: number;
  exp?: number;
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Autenticação de Sessão Inválida. Bearer Token ausente.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getJWTSecret()) as DecodedToken;
    
    // Enforcement in Pilot Mode
    if (decoded.role === 'TEACHER' && decoded.email) {
      if (!isTeacherAllowedInPilot(decoded.email)) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Acesso restrito ao piloto autorizado.',
            requestId: (req as unknown as { requestId?: string }).requestId,
          },
        });
      }
    }

    (req as unknown as { user: DecodedToken }).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Identidade Criptográfica Expirada ou Malformada. Operação barrada.' });
  }
};

export const requireRole = (allowedRoles: ('TEACHER' | 'SQUAD')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as unknown as { user?: DecodedToken }).user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: `Intrusão RBAC Bloqueada. A patente [${user?.role || 'Desconhecido'}] não possui privilégios para esta operação.`,
          requestId: (req as unknown as { requestId?: string }).requestId,
        },
      });
    }
    next();
  };
};

/**
 * H4 — Ensures the authenticated squad can only access its own resources.
 * Teachers bypass this check (they can view any squad).
 * Reads squadId from req.params.squadId or req.params.id (standalone route).
 */
export const requireSquadOwnership = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as unknown as { user?: DecodedToken }).user;
  if (!user) {
    return res.status(401).json({
      error: {
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Autenticação necessária.',
        requestId: (req as unknown as { requestId?: string }).requestId,
      },
    });
  }

  // Teachers can access any squad's resources
  if (user.role === 'TEACHER') {
    return next();
  }

  // Squads can only access their own resources
  const paramSquadId = req.params.squadId || req.params.id;
  if (user.role === 'SQUAD' && user.squadId && paramSquadId && user.squadId.toString() === paramSquadId) {
    return next();
  }

  return res.status(403).json({
    error: {
      code: 'FORBIDDEN',
      message: 'Acesso negado. Esta bancada não pode acessar recursos de outra bancada.',
      requestId: (req as unknown as { requestId?: string }).requestId,
    },
  });
};
