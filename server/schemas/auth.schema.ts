// server/schemas/auth.schema.ts

import { z } from 'zod';

export const teacherRegisterSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'O nome é obrigatório.' })
      .min(2, 'O nome deve ter no mínimo 2 caracteres.')
      .max(100, 'O nome deve ter no máximo 100 caracteres.'),
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('Formato de e-mail inválido.'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(6, 'A senha deve ter no mínimo 6 caracteres.')
      .max(128, 'A senha deve ter no máximo 128 caracteres.'),
  }),
});

export const teacherLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('Formato de e-mail inválido.'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(1, 'A senha não pode ser vazia.'),
  }),
});

export const squadLoginSchema = z.object({
  body: z.object({
    squadId: z
      .string({ required_error: 'O ID da bancada é obrigatório.' })
      .regex(/^[0-9a-fA-F]{24}$/, 'ID de bancada inválido.'),
  }),
});
