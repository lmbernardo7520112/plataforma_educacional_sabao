// server/middleware/validate.ts

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodEffects, ZodError } from 'zod';

type ReusableSchema = AnyZodObject | ZodEffects<AnyZodObject>;

/**
 * Generic Express middleware to validate request data against a Zod schema.
 * Parses headers, body, query, and params.
 */
export const validate = (schema: ReusableSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Coerce and validate
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Override request data with cleaned/coerced data
      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: 'error',
          message: 'Erro de validação de dados',
          errors: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
