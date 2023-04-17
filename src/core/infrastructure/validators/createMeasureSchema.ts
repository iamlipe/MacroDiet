import { z } from 'zod';

const createMeasureSchema = z.object({
  acronym: z.string().optional(),
  title: z.string(),
  type: z.enum(['mass', 'length']),
  multiple: z.number(),
});

export type CreateMesureForm = z.infer<typeof createMeasureSchema>;

export default createMeasureSchema;
