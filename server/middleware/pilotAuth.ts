// server/middleware/pilotAuth.ts

import { Request, Response, NextFunction } from 'express';
import { isTeacherAllowedInPilot, isPilotModeEnabled } from '../config/pilot.ts';

/**
 * Express middleware to validate teacher pilot access on registration and login.
 * If PILOT_MODE is enabled, only allows emails defined in the allowlist.
 */
export const checkTeacherPilotAccess = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  
  if (!email || !isTeacherAllowedInPilot(email)) {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito ao piloto autorizado.',
      requestId: (req as unknown as { requestId?: string }).requestId,
    });
  }
  
  next();
};

/**
 * Express middleware to restrict student/squad login during the pilot phase.
 * Under PILOT_MODE, squad login is blocked unless PILOT_ALLOW_SQUAD_LOGIN is explicitly 'true'.
 */
export const checkSquadPilotAccess = (req: Request, res: Response, next: NextFunction) => {
  if (isPilotModeEnabled() && process.env.PILOT_ALLOW_SQUAD_LOGIN !== 'true') {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito ao piloto autorizado.',
      requestId: (req as unknown as { requestId?: string }).requestId,
    });
  }
  
  next();
};
