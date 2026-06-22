import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Identidade Criptográfica Expirada ou Malformada. Operação barrada.' });
  }
};

export const requireRole = (allowedRoles: ('TEACHER' | 'SQUAD')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as DecodedToken | undefined;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, message: `Intrusão RBAC Bloqueada. A patente [${user?.role || 'Desconhecido'}] não possui privilégios de Cátedra para concluir a operação solicitada.` });
    }
    next();
  };
};
