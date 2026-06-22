// server/schemas/common.schema.ts

import { z } from 'zod';

/**
 * Reusable schema for MongoDB ObjectId params.
 * Use via z.object({ params: mongoIdParam('paramName') })
 */
export const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

export const classroomIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(mongoIdRegex, 'ID de turma inválido.'),
  }),
});

export const squadIdParamSchema = z.object({
  params: z.object({
    squadId: z.string().regex(mongoIdRegex, 'ID de grupo inválido.'),
  }),
});

export const classroomIdFromParentSchema = z.object({
  params: z.object({
    classroomId: z.string().regex(mongoIdRegex, 'ID de turma inválido.'),
  }),
});
