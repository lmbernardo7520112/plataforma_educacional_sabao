import { z } from 'zod';

const scientificMethodSchema = z.object({
  hypothesis: z.string().min(10, 'A hipótese deve ter no mínimo 10 caracteres para ter valor dedutivo.').optional().or(z.literal('')),
  procedure: z.string().min(10, 'A descrição metodológica deve ter no mínimo 10 caracteres.').optional().or(z.literal('')),
  observations: z.string().min(10, 'Descreva cientificamente sua observação com pelo menos 10 caracteres.').optional().or(z.literal('')),
  conclusion: z.string().min(10, 'Conclusões "sim" ou "não" não são aceitas. Descreva no mínimo 10 caracteres.').optional().or(z.literal('')),
});

const numericInputsSchema = z.object({
  oilMassGrams: z.number().positive().optional(),
  naohGrams: z.number().positive().optional(),
  startTemp: z.number().optional(),
  endTemp: z.number().optional(),
  phLevel: z.number().min(0).max(14).optional(),
});

export const SubmitMissionSchema = z.object({
  body: z.object({
    missionId: z.preprocess((val) => Number(val), z.number().int().min(1).max(9)),
    scientificMethod: z.preprocess((val) => {
      if (typeof val === 'string') {
        try { return JSON.parse(val); } catch { return {}; }
      }
      return val || {};
    }, scientificMethodSchema),
    numericInputs: z.preprocess((val) => {
      if (typeof val === 'string' && val) {
        try { return JSON.parse(val); } catch { return undefined; }
      }
      return val;
    }, numericInputsSchema.optional()),
  })
});
