// server/schemas/squad.schema.ts

import { z } from 'zod';

export const createSquadSchema = z.object({
  body: z.object({
    nome: z
      .string({
        required_error: 'O nome do grupo (bancada) é obrigatório.',
      })
      .min(3, 'O nome deve ter no mínimo 3 caracteres.')
      .max(50, 'O nome deve ter no máximo 50 caracteres.'),
    members: z
      .array(
        z.string().min(2, 'O nome do membro deve ter no mínimo 2 caracteres.')
      )
      .min(1, 'Um grupo precisa de pelo menos 1 membro.')
      .max(5, 'Um grupo pode ter no máximo 5 membros.'),
  }),
  params: z.object({
    classroomId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de turma inválido.'),
  }),
});

export const getSquadParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de grupo inválido.'),
  }),
});
